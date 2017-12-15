import { HistoryTrajectoryWorkersComponent } from './../../components/history-trajectory-workers/history-trajectory-workers';
import { ConfigService } from './../../services/config/config-service';
import { AmapService } from './../../services/business/amap-service';
import { Map, SimpleMarker, Polyline, LngLat } from '../../interfaces/amap-interface';
import { Subscription } from 'rxjs/Subscription';
import { LocationService } from './../../services/business/location-service';
import { HistoryTrajectoryComponent } from './../../components/history-trajectory/history-trajectory';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { Subject, Observable } from 'rxjs';

declare var AMap: any;


interface PlayUnit {
  path: LngLat[];
  moveMarker: SimpleMarker;
}

@IonicPage()
@Component({
  selector: 'page-trajectory',
  templateUrl: 'trajectory.html',
})
export class TrajectoryPage {
  map: Map;

  subscriptions: Subscription[] = [];

  playSubject: Subject<number> = new Subject();

  rateSubject: Subject<number> = new Subject();

  polyline: Observable<Polyline[]>;

  moveMarkers: Observable<SimpleMarker[]>;

  haveTrajectory: Observable<boolean>;

  speedRate = 100;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public location: LocationService,
    public mapService: AmapService,
    public config: ConfigService,
    public popover: PopoverController
  ) {
  }

  ionViewCanEnter() {
    const { view, opt } = this.navParams.get('permission');

    const canEnter = opt || view;

    return canEnter;
  }

  ionViewDidLoad() {
    this.map = new AMap.Map('trajectory');

    this.config.hideTabBar();

    this.mapService.addControl(this.map);

    this.haveTrajectory = this.location.getHistoryLocationResponse()
      .map(response => !!response.data_loc_list.filter(item => item.loc_list.length).length)

    this.moveMarkers = this.mapService.getMoveMarkers(this.map);

    // this.moveMarkers.subscribe(markers => console.log(markers));

    this.launch();

    // this.location.getTrajectoryPlayWorkers().subscribe(item => item);
  }

  launch() {
    const subscription = this.mapService.monitorHistoryLocationResponse();

    this.subscriptions.push(subscription);

    this.sendRequest();

    this.addOverlays();

    this.monitorPlayState();
  }

  /* ===============================================Server request=========================================== */

  sendRequest() {
    this.getLocationList();

    this.getProjectAreaList();
  }

  getProjectAreaList(): void {
    const subscription = this.location.getProjectAreaList();

    this.subscriptions.push(subscription);
  }

  getLocationList(): void {
    this.location.updateCondition().next(true);

    const subscription = this.location.getHistoryLocationList(
      this.location.updateCondition().startWith(true).mergeMapTo(this.location.getTrajectoryAvailableOptions().take(1))
    );

    this.subscriptions.push(subscription);
  }

  /* =================================================Overlays================================================= */

  addOverlays() {
    this.getProjectArea();

    this.getPolyline();
  }

  getPolyline() {
    this.polyline = this.mapService.addPolylineOnMap(this.map);

    const startAndEndMarker$$ = this.mapService.addStartAndEndMarkerForPolyline(this.map);

    const polyline$$ = this.polyline.subscribe(polyline => polyline.forEach(item => item.setMap(this.map)));

    this.subscriptions = [...this.subscriptions, startAndEndMarker$$, polyline$$];
  }

  getProjectArea() {
    const subscriptions = this.mapService.generateArea(this.map);

    this.subscriptions = [...this.subscriptions, ...subscriptions];
  }

  /* ============================================Play related============================================= */

  monitorPlayState() {
    this.play();
  }

  getRate(): Observable<number> {
    return this.rateSubject.startWith(1);
  }

  getPlayState(): Observable<number> {
    return this.playSubject.startWith(0);
  }

  getPlayIndex(): Observable<number[]> {
    return this.location.getTrajectoryPlayWorkers()
      .zip(this.location.getHistoryLocationResponse().map(res => res.data_loc_list.filter(item => !!item.loc_list.length)))
      .map(([selectedUsers, users]) => selectedUsers.map(userId => users.findIndex(user => user.user_id === userId)))
  }

  play() {
    const subscription = this.playSubject.filter(item => item === 1)
      .mergeMapTo(
      this.getPlayUnits()
      // .do(v => console.log(v))
      // .combineLatest(this.getRate().do(v => console.log(v)))
      )
      .subscribe(v => console.log(v));
    // .subscribe(([trajectory, rate]) => {
    //   trajectory.forEach((item, index) => {
    //     item.moveMarker.moveAlone(item.path, rate * this.speedRate)
    //   });
    // });

    this.subscriptions.push(subscription);
  }

  stop() {

  }

  getPlayUnits(): Observable<PlayUnit[]> {
    const source = this.getPlayIndex()
      .combineLatest(this.polyline, this.moveMarkers)
      .map(([indexes, polyline, markers]) => {
        console.log(indexes, polyline, markers);

        return indexes.map(idx => ({ path: polyline[idx].getPath(), moveMarker: markers[idx] }))
      })

    source.subscribe(v => console.log(v));

    return source;
  }

  /* ===============================================Config related========================================== */

  setCondition() {
    this.modalCtrl.create(HistoryTrajectoryComponent).present();
  }

  selectWorker(ev) {
    this.popover.create(HistoryTrajectoryWorkersComponent).present({ ev });
  }

  /* ===============================================Refuse clean============================================== */

  ionViewWillUnload() {
    this.config.showTabBar();

    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
