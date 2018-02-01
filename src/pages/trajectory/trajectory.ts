import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, PopoverController } from 'ionic-angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

import { Map } from '../../interfaces/amap-interface';
import { PlayState, PlayUnit, TrajectoryInfo } from '../../interfaces/location-interface';
import { HistoryTrajectoryWorkersComponent } from './../../components/history-trajectory-workers/history-trajectory-workers';
import { HistoryTrajectoryComponent } from './../../components/history-trajectory/history-trajectory';
import { AmapService } from './../../services/business/amap-service';
import { LocationService } from './../../services/business/location-service';
import { ConfigService } from './../../services/config/config-service';

declare var AMap: any;

@IonicPage()
@Component({
    selector: 'page-trajectory',
    templateUrl: 'trajectory.html',
})
export class TrajectoryPage {

    subscriptions: Subscription[] = [];

    playStateSubject: Subject<number> = new Subject();

    rateSubject: Subject<number> = new Subject();

    playSubject: BehaviorSubject<PlayUnit[]> = new BehaviorSubject(null);

    map: Map;

    rateButtonColor: Observable<number>;

    playButtonColor: Observable<number>;

    haveTrajectory: Observable<boolean>;

    trajectoryInfo: Observable<TrajectoryInfo>;

    constructor(
        private navParams: NavParams,
        private modalCtrl: ModalController,
        private location: LocationService,
        private mapService: AmapService,
        private config: ConfigService,
        private popover: PopoverController
    ) {
    }

    ionViewCanEnter() {
        const { view, opt } = this.navParams.get('permission');

        const canEnter = opt || view;

        return canEnter;
    }

    ionViewDidLoad() {
        this.config.hideTabBar();

        this.initialMap();

        this.launch();
    }

    initialMap(): void {
        this.map = new AMap.Map('trajectory');

        this.mapService.addControl(this.map);

        this.trajectoryInfo = this.location.getTrajectoryInformation();

        this.playButtonColor = this.location.getPlayState();

        this.rateButtonColor = this.location.getPlayRate();

        this.haveTrajectory = this.location.getHistoryLocationResponse()
            .map(response => !!response.data_loc_list.filter(item => item.loc_list.length).length);
    }

    launch(): void {
        this.subscriptions = [
            this.mapService.monitorHistoryLocationResponse(),

            ...this.sendRequest(),

            ...this.addOverlays(),

            ...this.monitorPlay(),
        ];
    }

    /* ===============================================Server request=========================================== */

    /**
     * @description Get project area list and history location list;
     */
    sendRequest(): Subscription[] {
        return [
            this.location.getProjectAreaList(),

            this.getLocationList(),
        ];
    }

    getLocationList(): Subscription {
        this.location.updateCondition().next(true);

        return this.location.getHistoryLocationList(
            this.location.updateCondition()
                .startWith(true)
                .mergeMapTo(this.location.getTrajectoryAvailableOptions().take(1))
        );
    }

    /**
     * @description Add overlays on current map. Include project areas and trajectories that used selected.
     */
    addOverlays(): Subscription[] {
        return [
            ...this.mapService.generateArea(this.map),

            this.mapService.updateTrajectory(this.map),

            this.location.toggleTrajectoryDisplayState(),
        ];
    }

    /* ============================================Play related============================================= */

    monitorPlay(): Subscription[] {
        return [
            this.mapService.getPlayUnits(this.map).subscribe(this.playSubject),

            this.play(),

            this.stop(),

            this.pause(),

            this.resume(),

            this.location.updatePlayState(this.playStateSubject),

            this.location.updateRateState(this.rateSubject),
        ];
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

    /**
     * @param state Play state need to handle.
     * @description Get the stream that you need to listen to for each play control button. 
     * With the help of behavior subject, although each flow is different, the elements propagating in the flow are the same,
     * but are transmitted to different listeners based on different playback states.
     */
    getPlayState(state: number): Observable<PlayUnit> {
        return this.location.getPlayState()
            .filter(item => item === state)
            .mergeMapTo(this.playSubject.filter(item => !!item)
                .mergeMap(units => Observable.from(units))
            );
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

        this.map.destroy();

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
