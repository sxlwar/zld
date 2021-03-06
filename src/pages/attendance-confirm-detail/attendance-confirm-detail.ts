import { Component } from '@angular/core';
import { RequestOption } from 'interfaces/request-interface';
import { InfiniteScroll, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { AttendanceState } from './../../interfaces/attendance-interface';
import { AttendanceResult } from './../../interfaces/response-interface';
import { attendanceList } from './../../services/api/command';
import { AttendanceService } from './../../services/business/attendance-service';
import { attendanceConfirm } from './../../services/business/icon-service';
import { AttendanceStatisticDayItem } from './../../services/business/statistics-service';
import { PermissionService } from './../../services/config/permission-service';
import { attendanceRecordPage, MissionRoot } from './../pages';

@IonicPage()
@Component({
    selector: 'page-attendance-confirm-detail',
    templateUrl: 'attendance-confirm-detail.html',
})
export class AttendanceConfirmDetailPage implements BusinessPageModel{
    attendances: Observable<AttendanceResult[]>;

    subscriptions: Subscription[] = [];

    operatePermission: Observable<boolean>;

    actionSheet$$: Subscription;

    nextPage$: Subject<InfiniteScroll> = new Subject();

    selectedAttendanceState: number;

    haveMoreData: Observable<boolean>;

    count: number;

    statistic: AttendanceStatisticDayItem;

    confirm$: Subject<AttendanceResult[]> = new Subject();

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private attendance: AttendanceService,
        private permission: PermissionService
    ) {
        this.statistic = this.navParams.get('statistic');

        this.attendance.resetPage();
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    launch(): void {
        this.subscriptions = [
            this.attendance.getAttendances(this.getAttendanceOption()),

            this.attendance.getSelectedAttendanceState().subscribe(state => this.selectedAttendanceState = state),

            this.attendance.confirmAttendance(this.confirm$),

            ...this.attendance.getNextPage(this.nextPage$),

            this.attendance.handleAttendanceError(),

            this.attendance.handleAttendanceConfirmError(),
        ];
    }

    initialModel(): void {
        this.attendances = this.attendance.getAttendanceResultList().scan((acc, cur) => acc.concat(cur), []);

        this.haveMoreData = this.attendance.haveMoreData();

        this.operatePermission = this.permission.getOperatePermission(attendanceConfirm.icon, MissionRoot);
    }

    getAttendanceOption(): Observable<RequestOption> {
        const state = attendanceList.noMagicNumber.get(AttendanceState[0]).value;

        const { date, teamIds } = this.statistic;

        return Observable.of({ start_day: date, end_day: date, ...state, team_id: teamIds });
    }


    goToDetailPage(attendance: AttendanceResult): void {
        this.navCtrl.push(attendanceRecordPage, { attendance, rootName: MissionRoot, iconName: attendanceConfirm.icon }).then(() => { });
    }
    
    ionViewWillUnload() {
        this.subscriptions.forEach(item => item && item.unsubscribe());
    }
}
