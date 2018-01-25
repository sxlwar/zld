import { Subject } from 'rxjs/Subject';
import { AttendanceStatisticDayItem } from './../../services/business/statistics-service';
import { AttendanceState } from './../../interfaces/attendance-interface';
import { attendanceList } from './../../services/api/command';
import { RequestOption } from 'interfaces/request-interface';
import { attendanceRecordPage, MissionRoot } from './../pages';
import { attendanceConfirm } from './../../services/business/icon-service';
import { PermissionService } from './../../services/config/permission-service';
import { TimeService } from './../../services/utils/time-service';
import { Subscription } from 'rxjs/Subscription';
import { AttendanceResult } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { AttendanceService } from './../../services/business/attendance-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-attendance-confirm-detail',
    templateUrl: 'attendance-confirm-detail.html',
})
export class AttendanceConfirmDetailPage {
    attendances: Observable<AttendanceResult[]>;

    subscriptions: Subscription[] = [];

    operatePermission: Observable<boolean>;

    actionSheet$$: Subscription;

    page$$: Subscription;

    selectedAttendanceState: number;

    haveMoreData: Observable<boolean>;

    count: number;

    statistic: AttendanceStatisticDayItem;

    confirm$: Subject<AttendanceResult[]> = new Subject();

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public attendance: AttendanceService,
        public timeService: TimeService,
        public permission: PermissionService
    ) {
        this.statistic = this.navParams.get('statistic');

        this.attendance.resetPage();
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    launch() {
        this.subscriptions = [
            this.attendance.getAttendances(this.getAttendanceOption()),
            this.attendance.getSelectedAttendanceState().subscribe(state => this.selectedAttendanceState = state),
            this.attendance.confirmAttendance(this.confirm$),
            this.attendance.handleAttendanceError(),
            this.attendance.handleAttendanceError(),
        ];
    }

    initialModel() {
        this.attendances = this.attendance.getAttendanceResultList().scan((acc, cur) => acc.concat(cur), []);

        this.haveMoreData = this.attendance.getAttendanceResultMoreData();

        this.operatePermission = this.permission.getOperatePermission(attendanceConfirm.icon, MissionRoot);
    }

    getAttendanceOption(): Observable<RequestOption> {
        const state = attendanceList.noMagicNumber.get(AttendanceState[0]).value;

        const { date, teamIds } = this.statistic;

        return Observable.of({ start_day: date, end_day: date, ...state, team_id: teamIds });
    }

    getNextPage(infiniteScroll: InfiniteScroll): void {
        this.page$$ && this.page$$.unsubscribe();

        this.page$$ = this.attendance.getNextPage(infiniteScroll);
    }

    goToDetailPage(attendance: AttendanceResult): void {
        this.navCtrl.push(attendanceRecordPage, { attendance, rootName: MissionRoot, iconName: attendanceConfirm.icon }).then(() => { });
    }
    
    ionViewWillUnload() {
        this.subscriptions.forEach(item => item && item.unsubscribe());

        this.page$$ && this.page$$.unsubscribe();
    }
}
