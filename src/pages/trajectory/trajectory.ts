import { HistoryTrajectoryWorkersComponent } from './../../components/history-trajectory-workers/history-trajectory-workers';
import { ConfigService } from './../../services/config/config-service';
import { AmapService } from './../../services/business/amap-service';
import { Map } from '../../interfaces/amap-interface';
import { Subscription } from 'rxjs/Subscription';
import { LocationService } from './../../services/business/location-service';
import { HistoryTrajectoryComponent } from './../../components/history-trajectory/history-trajectory';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { PlayUnit, PlayState } from '../../interfaces/location-interface';

declare var AMap: any;

@IonicPage()
@Component({
  selector: 'page-trajectory',
  templateUrl: 'trajectory.html',
})
export class TrajectoryPage {
  map: Map;

  subscriptions: Subscription[] = [];

  playStateSubject: Subject<number> = new Subject();

  rateSubject: Subject<number> = new Subject();

  playSubject: BehaviorSubject<PlayUnit[]> = new BehaviorSubject(null);

  rateButtonColor: Observable<number>;

  playButtonColor: Observable<number>;

  haveTrajectory: Observable<boolean>;

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

    this.launch();
  }

  launch() {
    const subscription = this.mapService.monitorHistoryLocationResponse();

    this.subscriptions.push(subscription);

    this.sendRequest();

    this.addOverlays();

    this.monitorPlay();
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
    const subscription = this.location.getHistoryLocationList(
      this.location.updateCondition().mergeMapTo(this.location.getTrajectoryAvailableOptions().take(1))
    );

    this.subscriptions.push(subscription);
  }

  /* =================================================Overlays================================================= */

  addOverlays() {

    const projectArea$$ = this.mapService.generateArea(this.map);

    const trajectory$$ = this.mapService.setTrajectory(this.map);

    const display$$ = this.location.toggleTrajectoryDisplayState();

    this.subscriptions = [...this.subscriptions, ...projectArea$$, trajectory$$, display$$];
  }

  /* ============================================Play related============================================= */

  monitorPlay() {
    this.subscriptions = [
      ...this.subscriptions,
      this.mapService.getPlayUnits(this.map).subscribe(this.playSubject),
      this.play(),
      this.stop(),
      this.pause(),
      this.resume(),
      this.location.updatePlayState(this.playStateSubject),
      this.location.updateRateState(this.rateSubject)
    ];

    this.getRateButtonColor();

    this.getPlayButtonColor();
  }

  getRate(): Observable<number> {
    return this.rateSubject.startWith(1);
  }

  play(): Subscription {
    return this.getPlayState(PlayState.play).subscribe(item => this.mapService.startPlay(item));
  }

  stop(): Subscription {
    return this.getPlayState(PlayState.stop).subscribe(item => this.mapService.stopPlay(item));
  }

  pause(): Subscription {
    return this.getPlayState(PlayState.pause).subscribe(item => item.moveMarker.pauseMove())
  }

  resume(): Subscription {
    return this.getPlayState(PlayState.resume).subscribe(item => item.moveMarker.resumeMove());
  }

  getPlayState(state: number): Observable<PlayUnit> {
    return this.location.getPlayState()
      .filter(item => item === state)
      .mergeMapTo(this.playSubject.filter(item => !!item)
        .mergeMap(units => Observable.from(units))
      );
  }

  /* ================================================Button color=========================================== */

  getRateButtonColor() {
    this.rateButtonColor = this.location.getPlayRate();
  }

  getPlayButtonColor() {
    this.playButtonColor = this.location.getPlayState();
  }

  /* ===============================================Config related========================================== */

  setCondition() {
    this.modalCtrl.create(HistoryTrajectoryComponent, { map: this.map }).present();
  }

  selectWorker(ev) {
    this.popover.create(HistoryTrajectoryWorkersComponent).present({ ev });
  }

  /* ===============================================Refuse clean============================================== */

  ionViewWillUnload() {
    this.config.showTabBar();

    this.location.updatePlayState(Observable.of(PlayState.stop));

    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
