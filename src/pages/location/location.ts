import { Subject } from 'rxjs/Subject';
import { AmapService } from './../../services/business/amap-service';
import { Subscription } from 'rxjs/Subscription';
import { ConfigService } from './../../services/config/config-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LocationService } from '../../services/business/location-service';
import { HistoryLocationComponent } from '../../components/history-location/history-location';
import { Map, MarkerClusterer, Marker } from '../../interfaces/amap-interface';

declare var AMap: any;

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  map: Map;

  subscriptions: Subscription[];

  markersSubject: Subject<Marker[]> = new Subject();

  clusterer: MarkerClusterer;

  markers: Marker[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public location: LocationService,
    public modalCtrl: ModalController,
    public config: ConfigService,
    public mapService: AmapService
  ) {
  }

  ionViewCanEnter() {
    const { view, opt } = this.navParams.get('permission');

    const result = opt || view;

    return result;
  }

  ionViewDidLoad() {
    this.map = new AMap.Map('locationMap');

    this.config.hideTabBar();

    this.launch();

    this.addOverlays();

    this.clearOverlays();

    this.mapService.addControl(this.map);
  }

  ionViewWillUnload() {
    this.config.showTabBar();

    this.subscriptions.forEach(item => item.unsubscribe());
  }

  launch() {
    this.subscriptions = this.location.handleError();

    const subscription = this.mapService.monitorHistoryLocationResponse();

    this.subscriptions.push(subscription);

    this.getLocationList();

    this.getProjectAreaList();
  }

  addOverlays() {
    this.getMarkers();

    this.getProjectArea();
  }

  clearOverlays() {
    const subscription = this.location.updateCondition()
      .subscribe(_ => {
        this.map.remove(this.markers);
        this.clusterer && this.clusterer.clearMarkers();
      });

    this.subscriptions.push(subscription);
  }

  getMarkers() {
    const markers = this.mapService.addMarkersOnMap(this.map)

    const subscription = markers.subscribe(markers => {
      this.markers = markers;
      this.getClusterer(markers);
    });

    this.subscriptions.push(subscription);
  }

  getClusterer(markers) {
    const subscription = this.mapService.markerClusterer(this.map, markers).subscribe(clusterer => this.clusterer = clusterer);

    this.subscriptions.push(subscription);
  }

  getProjectArea() {
    const subscriptions = this.mapService.generateArea(this.map);

    this.subscriptions = [...this.subscriptions, ...subscriptions];
  }

  /* ====================================================================Request operate================================================== */

  getLocationList(): void {
    this.location.updateCondition().next(true);

    const subscription = this.location.getHistoryLocationList(
      this.location.updateCondition().startWith(true).mergeMapTo(this.location.getAvailableOptions().take(1))
    );

    this.subscriptions.push(subscription);
  }

  getProjectAreaList(): void {
    const subscription = this.location.getProjectAreaList();

    this.subscriptions.push(subscription);
  }

  setCondition() {
    this.modalCtrl.create(HistoryLocationComponent).present();
  }
}