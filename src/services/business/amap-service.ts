import { TranslateService } from '@ngx-translate/core';
import { LocationService } from './location-service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ProjectService } from './project-service';
import { HistoryLocation, HistoryLocationListResponse } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { flattenDeep } from 'lodash';
import { Map, LngLat, ConvertorResult, Size, Marker, MarkerOptions, SimpleMarker, Polygon, InfoWindow, IconOptions, Icon, BasicControl, MarkerClusterer } from '../../interfaces/amap-interface';
import { putInArray, ReduceFn } from '../utils/util';

declare var AMap: any;

declare var AMapUI: any;

const defaultZoomLever = 15;

const polygonConfig = {
    strokeColor: "#e42112",
    strokeWeight: 3,
    strokeOpacity: 0.2,
    fillColor: "#33cd5f",
    fillOpacity: 0.35
}

const polyline = {
    strokeColor: "#6b46e5",
    strokeOpacity: 1,
    strokeWeight: 2,
    strokeStyle: "solid"
}

export const topPosition = -30;

@Injectable()
export class AmapService {
    areaSubject: Subject<LngLat[]> = new Subject();

    markersSubject: Subject<HistoryLocationListResponse> = new Subject();

    constructor(
        public project: ProjectService,
        public location: LocationService,
        public translate: TranslateService
    ) {
        
    }

    monitorHistoryLocationResponse(): Subscription {
        return this.location.getHistoryLocationResponse().subscribe(this.markersSubject);
    }

    size(width: number, height: number): Size {
        return new AMap.Size(width, height);
    }

    lngLat(lng: number, lat: number): LngLat {
        return new AMap.LngLat(lng, lat);
    }

    marker(config: MarkerOptions): Marker { //TODO: 检查调用更新申明文件
        return new AMap.Marker(config);
    }

    simpleMarker(config: MarkerOptions): Observable<SimpleMarker> {
        const markerConfig = {
            map: config.map,
            position: config.position,
            iconStyle: "red",
            iconLabel: {
                innerHTML: "<div class='locationIcon'>" + config.content + "</div>",
                style: {
                    color: "white",
                    fontSize: "12px",
                    marginTop: "2px",
                    whiteSpace: "nowarp"
                }
            }
        }

        const promise: Promise<SimpleMarker> = new Promise(resolve => {
            AMapUI.loadUI(["overlay/SimpleMarker"], SimpleMarker => {
                resolve(new SimpleMarker(markerConfig));
            });
        });

        return Observable.fromPromise(promise);
    }

    polyline(config, onlyConfig) {
        // const polylineConfig = onlyConfig ? config : _.assign(config, CONFIG.mapConfig.polyline);
        // return new AMap.Polyline(polylineConfig);
    }

    icon(config: IconOptions): Icon {
        return new AMap.Icon(config);
    }

    addControl(map: Map) {
        AMapUI.loadUI(["control/BasicControl"], (basicControl: BasicControl) => {
            map.addControl(new basicControl.Zoom({ position: "lb" }));
        });
    }

    generateInfoWindowContent(title: string, content: string): string {
        return "<b>" + title + "</b><br/>" + content;
    }

    /**
     * @description Transform coordinates to AMap's coordinates.
     */
    convertFrom(source: LngLat[], coordinateType: string): Observable<LngLat[]> {
        return Observable.fromPromise(new Promise(resolve => {
            AMap.convertFrom(source.map(item => ([item.lng, item.lat])), coordinateType, (status: string, result: ConvertorResult) => {
                if (status === 'complete') resolve(result.locations);
            });
        }));
    }

    /* =====================================================Project area functions========================================================== */

    /**
     * FIXME:偷懒了，没有像V1中那样，打平-转换-折叠，有空再搞吧。
     */
    generateArea(map: Map): Subscription[] {
        const transformedLngLats$$ = this.location.getProjectAreaResponse()
            .mergeMap(response => Observable.from(response.project_areas.map(item => item.polygons))
                .mergeMap(area => this.convertFrom(area as LngLat[], 'baidu'))
            ).subscribe(this.areaSubject);

        const center$$ = this.setCenterToFirstArea(map);

        const polygon = this.getPolygon(map);

        const polygon$$ = this.setPolygonOnMap(map, polygon);

        const event$$ = this.addClickForEveryPolygon(map, polygon);

        return [transformedLngLats$$, center$$, polygon$$, event$$];
    }

    getPolygon(map: Map): Observable<Polygon> {
        return this.areaSubject.map(path => new AMap.Polygon({ path, map, ...polygonConfig }));
    }

    setPolygonOnMap(map: Map, polygons: Observable<Polygon>): Subscription {
        return polygons.subscribe(polygon => polygon.setMap(map));
    }

    addClickForEveryPolygon(map: Map, polygons: Observable<Polygon>): Subscription {
        const projectName = this.project.getProjectName();

        const areaName = this.location.getProjectAreaResponse().mergeMap(res => Observable.from(res.project_areas.map(item => item.name)));

        return this.areaSubject
            .zip(areaName, polygons)
            .combineLatest(projectName)
            .subscribe(([[coordinates, area, polygon], project]) => {
                polygon.on('click', () => {
                    const infoWindow = new AMap.InfoWindow({ content: this.generateInfoWindowContent(project, area) });

                    infoWindow.open(map, coordinates[0]);
                });
            });
    }

    setCenterToFirstArea(map: Map): Subscription {
        return this.areaSubject.first().subscribe(coordinates => map.setZoomAndCenter(defaultZoomLever, coordinates[0]));
    }

    /* ============================================================Marker functions ======================================================== */

    addMarkersOnMap(map: Map): Observable<Marker[]> {
        const simpleMarker = this.getSimpleMarker(map);

        const infoWindow = this.getMarkerInfoWindow();

        return simpleMarker.zip(infoWindow)
            .map(([markers, infoWindows]) => {
                const result = markers.map((marker, index) => this.addClickForMarker(marker, infoWindows[index], map));

                return flattenDeep(result);
            });
    }

    addClickForMarker(marker: Marker, infoWindow: InfoWindow, map: Map): Marker {
        marker.on('click', () => infoWindow.open(map, marker.getPosition()));
        return marker;
    }
    
    getSimpleMarker(map: Map): Observable<SimpleMarker[]> {
        const putSimpleMarkerInArray: ReduceFn<SimpleMarker> = putInArray;

        return this.getMarker()
            .zip(this.getMarkerInformation())
            .mergeMap(([coordinates, { uname }]) => Observable.from(coordinates)
                .mergeMap(group => Observable.from(group).mergeMap(({ lng, lat }) => this.simpleMarker({ position: [lng, lat], content: `<div class="locationIcon">${uname}</div>`, map })))
                .reduce(putSimpleMarkerInArray, [])
            );
    }

    getMarkerInformation(): Observable<HistoryLocation> {
        return this.markersSubject.mergeMap(res => Observable.from(res.data_loc_list.filter(item => !!item.loc_list.length)));
    }

    getMarker(): Observable<LngLat[][]> {
        const putLngLatInArray: ReduceFn<LngLat[]> = putInArray;

        return this.markersSubject
            .mergeMap(res => Observable.from(res.data_loc_list.map(item => item.loc_list))
                .filter(item => item && !!item.length)
                .mergeMap(coordinates => this.convertFrom(coordinates, 'gps'))
                .reduce(putLngLatInArray, [])
                .filter(res => !!res.length)
            );
    }

    getMarkerInfoWindow(): Observable<InfoWindow[]> {
        return this.getMarkerInformation()
            .combineLatest(this.translate.get(['NAME', 'TEAM', 'ELECTRICITY', 'TIME']), this.project.getProjectName(), (marker, label, project) => marker.loc_list.map(item => {
                const { battery, time } = item;

                const content = `
                <div>${label.NAME}: ${marker.uname}</div>
                <div>${label.TEAM}: ${marker.team_name}</div>
                <div>${label.ELECTRICITY}: ${battery}</div>
                <div>${label.TIME}: ${time}</div>
                `
                return this.generateInfoWindowContent(project, content);
            }))
            .map(contents => contents.map(content => new AMap.InfoWindow({ content, offset: new AMap.Pixel(0, topPosition) })));
    }


    markerClusterer(map, markers: Marker[]): Observable<MarkerClusterer> {
        const promise: Promise<MarkerClusterer> = new Promise(resolve => {
            map.plugin(['AMap.MarkerClusterer'], () => resolve(new AMap.MarkerClusterer(map, markers, { gridSize: 10 })))
        });

        return Observable.fromPromise(promise);
    }

    /* ===================================================================Clear overlays on map=================================================== */
    
     clearMarkers(source: Observable<Marker[]>, map: Map): Subscription {
        return source.subscribe(markers => map.remove(markers));
    }

    clearClusterer(source: Observable<MarkerClusterer>): Subscription {
        return source.subscribe(clusterter => clusterter.clearMarkers());
    }

    
}