import { TranslateService } from '@ngx-translate/core';
import { LocationService } from './location-service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ProjectService } from './project-service';
import { HistoryLocation, HistoryLocationListResponse } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { flattenDeep } from 'lodash';
import { Map, LngLat, ConvertorResult, Marker, MarkerOptions, SimpleMarker, Polygon, InfoWindow, BasicControl, MarkerClusterer, Polyline, PolylineOptions, MoveEvent } from '../../interfaces/amap-interface';
import { putInArray } from '../utils/util';
import { PlayUnit, PlayState } from './../../interfaces/location-interface';

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

const polylineConfig = {
    strokeColor: "#6b46e5",
    strokeOpacity: 1,
    strokeWeight: 2,
    strokeStyle: "solid"
}

const passedPolylineConfig = {
    strokeColor: "#FF0000",
    strokeWeight: 2
}

export const walkIconStyle = {
    src: './../../assets/svg/map_walk_icon.png',
    style: {
        width: '36px',
        height: '36px'
    }
}

export const walkIconLabelStyle = {
    style: {
        position: 'absolute',
        top: '-10px',
        left: '-3px',
        color: 'black'
    }
}

export const topPosition = -30;

export const rateSpeed = 100;

@Injectable()
export class AmapService {
    areaSubject: Subject<LngLat[]> = new Subject();

    markersSubject: Subject<HistoryLocationListResponse> = new Subject();

    constructor(
        private project: ProjectService,
        private location: LocationService,
        private translate: TranslateService
    ) {

    }

    monitorHistoryLocationResponse(): Subscription {
        return this.location.getHistoryLocationResponse().subscribe(this.markersSubject);
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
        const polygon = this.getPolygon(map);

        return [
            this.transformProjectAreaCoordinate(),
            this.setCenterToFirstArea(map),
            this.setPolygonOnMap(map, polygon),
            this.addClickForEveryPolygon(map, polygon)
        ];
    }

    transformProjectAreaCoordinate(): Subscription {
        return this.location.getProjectAreaResponse()
            .mergeMap(response => Observable.from(response.project_areas.map(item => item.polygons))
                .mergeMap(area => this.convertFrom(area as LngLat[], 'baidu'))
            )
            .subscribe(this.areaSubject);
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
        return this.getSimpleMarker(map, this.getMarkers())
            .zip(this.getMarkerInfoWindow())
            .map(([markers, infoWindows]) => {
                const result = markers.map((marker, index) => this.addClickForMarker(marker, infoWindows[index], map));

                return flattenDeep(result);
            });
    }

    addClickForMarker(marker: Marker, infoWindow: InfoWindow, map: Map): Marker {
        marker.on('click', () => infoWindow.open(map, marker.getPosition()));
        return marker;
    }

    getSimpleMarker(map: Map, source: Observable<LngLat[][]>): Observable<SimpleMarker[]> {
        return source
            .zip(this.getMarkerInformation())
            .mergeMap(([coordinates, { uname }]) => Observable.from(coordinates)
                .mergeMap(group => Observable.from(group).mergeMap(({ lng, lat }) => this.simpleMarker({ position: [lng, lat], content: uname, map })))
                .reduce(putInArray, [])
            );
    }

    getMarkerInformation(): Observable<HistoryLocation> {
        return this.markersSubject.mergeMap(res => Observable.from(res.data_loc_list.filter(item => !!item.loc_list.length)));
    }

    getMarkers(): Observable<LngLat[][]> {
        return this.markersSubject
            .mergeMap(res => Observable.from(res.data_loc_list.map(item => item.loc_list))
                .filter(item => item && !!item.length)
                .mergeMap(coordinates => this.convertFrom(coordinates, 'gps'))
                .reduce(putInArray, [])
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
            map.plugin(['AMap.MarkerClusterer'], () => resolve(new AMap.MarkerClusterer(map, markers, { gridSize: 10 })));
        });

        return Observable.fromPromise(promise);
    }

    /* =====================================================================Polyline functions ================================================== */

    updateTrajectory(map: Map): Subscription {
        return this.getPolyline(map)
            .zip(this.getStartAndEndMarkerForPolyline(map), this.getMoveMarkers(map))
            .map(([lines, startAndEnd, moveMarkers]) => lines.map((polyline, index) => {
                const [startMarker, endMarker] = startAndEnd[index];

                return { polyline, startMarker, endMarker, moveMarker: moveMarkers[index] };
            }))
            .subscribe(data => this.location.updateTrajectory(data));
    }

    getPolyline(map: Map): Observable<Polyline[]> {
        return this.getMarkers()
            .map(markers => markers.map(path => new AMap.Polyline({ map, path, ...polylineConfig })));
    }

    getStartAndEndMarkerForPolyline(map: Map): Observable<SimpleMarker[][]> {
        const markers = this.getMarkers().map(markers => markers.map(item => ([item[0], item[item.length - 1]])));

        return this.getSimpleMarker(map, markers)
            .zip(this.getMarkerInfoWindow())
            .mergeMap(([markers, infoWindows]) => Observable.from(markers.map((marker, index) => {
                (index % 2 === 0) && marker.setIconStyle('green');
                this.addClickForMarker(marker, infoWindows[index], map);
                return marker;
            }))
                .bufferCount(2)
                .reduce(putInArray, []));
    }

    getMoveMarkers(map: Map): Observable<SimpleMarker[]> {
        const markers = this.getMarkers().map(markers => markers.map(item => [item[0]]));

        return this.getSimpleMarker(map, markers)
            .zip(this.getMarkerInfoWindow())
            .map(([markers, infoWindows]) => {
                const result = flattenDeep(markers);

                result.forEach((item, index) => {
                    item.setIconStyle(walkIconStyle);
                    item.setIconLabel(walkIconLabelStyle);
                    item.hide();
                    this.addClickForMarker(item, infoWindows[index], map);
                })

                return result;
            });
    }

    polyline(config: PolylineOptions, onlyConfig: boolean): Polyline {
        const option = onlyConfig ? config : { ...config, ...polylineConfig };

        return new AMap.Polyline(option);
    }

    getPlayUnits(map: Map): Observable<PlayUnit[]> {
        return this.location.getTrajectories()
            .combineLatest(this.location.getPlayRate())
            .mergeMap(([trajectories, rate]) => Observable.from(trajectories)
                .map(trajectory => ({ path: trajectory.polyline.getPath(), moveMarker: trajectory.moveMarker, passedPolyline: new AMap.Polyline({ ...passedPolylineConfig, map }), rate: rate * rateSpeed }))
                .reduce(putInArray, [])
            );
    }

    startPlay(unit: PlayUnit): void {
        unit.moveMarker.show();

        unit.moveMarker.moveAlong(unit.path, unit.rate);

        unit.passedPolyline.show();

        this.watchMoving(unit);
    }

    watchMoving(unit: PlayUnit): void {
        unit.moveMarker.on('moving', (event: MoveEvent) => {
            unit.passedPolyline.setPath(event.passedPath);

            const last = unit.path[unit.path.length - 1];

            const current = unit.moveMarker.getPosition();

            if (last.lat === current.lat && last.lng === current.lng) {
                unit.moveMarker.hide();
                unit.passedPolyline.hide();
                this.location.updatePlayState(Observable.of(PlayState.stop))
            }
        });
    }

    stopPlay(unit: PlayUnit): void {
        unit.moveMarker.stopMove();
        unit.moveMarker.hide();
        unit.passedPolyline.hide();
    }

    clearPolyline(map: Map): Subscription {
        return this.location.getTrajectories()
            .subscribe(trajectories => trajectories.forEach(item => {
                map.remove(item.polyline);
                map.remove(item.startMarker);
                map.remove(item.endMarker);
                map.remove(item.moveMarker);
            }));
    }

    /* ===================================================================Clear overlays on map=================================================== */

    clearMarkers(source: Observable<Marker[]>, map: Map): Subscription {
        return source.subscribe(markers => map.remove(markers));
    }

    clearClusterer(source: Observable<MarkerClusterer>): Subscription {
        return source.subscribe(clusterter => clusterter.clearMarkers());
    }
}