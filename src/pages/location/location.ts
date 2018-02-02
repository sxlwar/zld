import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { HistoryLocationComponent } from '../../components/history-location/history-location';
import { Map, Marker, MarkerClusterer } from '../../interfaces/amap-interface';
import { BusinessPageModel } from '../../interfaces/core-interface';
import { LocationService } from '../../services/business/location-service';
import { AmapService } from './../../services/business/amap-service';
import { ConfigService } from './../../services/config/config-service';

declare var AMap: any;

@IonicPage()
@Component({
    selector: 'page-location',
    templateUrl: 'location.html',
})
export class LocationPage implements BusinessPageModel{

    map: Map;

    subscriptions: Subscription[] = [];

    markersSubject: Subject<Marker[]> = new Subject();

    clusterer: MarkerClusterer;

    markers: Marker[] = [];

    constructor(
        private navParams: NavParams,
        private location: LocationService,
        private modalCtrl: ModalController,
        private config: ConfigService,
        private mapService: AmapService
    ) {
    }

    ionViewCanEnter() {
        const { view, opt } = this.navParams.get('permission');

        return opt || view;
    }

    ionViewDidLoad() {
        this.config.hideTabBar();

        this.initialModel();

        this.launch();

        this.mapService.addControl(this.map);
    }

    initialModel(): void {
        this.map = new AMap.Map('locationMap');
    }

    launch(): void {
        this.subscriptions = [
            this.mapService.monitorHistoryLocationResponse(),

            this.location.getHistoryLocationList(
                this.location.updateCondition()
                    .startWith(true)
                    .mergeMapTo(this.location.getAvailableOptions().take(1))
            ),

            this.location.getProjectAreaList(),

            this.clearOverlays(),

            ...this.addOverlays(),

            ...this.location.handleError(),
        ];
    }

    addOverlays(): Subscription[] {
        return [
            this.getMarkers(),

            ...this.getProjectArea(),
        ];
    }

    clearOverlays(): Subscription {
        return this.location.updateCondition()
            .subscribe(_ => {
                this.map.remove(this.markers);
                this.clusterer && this.clusterer.clearMarkers();
            });
    }

    getMarkers(): Subscription {
        return this.mapService.addMarkersOnMap(this.map)
            .do(markers => this.markers = markers)
            .mergeMap(markers => this.mapService.markerClusterer(this.map, markers))
            .subscribe(clusterer => this.clusterer = clusterer);
    }

    getProjectArea(): Subscription[] {
        return this.mapService.generateArea(this.map);
    }

    setCondition(): void {
        this.modalCtrl.create(HistoryLocationComponent).present();
    }

    ionViewWillUnload() {
        this.config.showTabBar();

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
