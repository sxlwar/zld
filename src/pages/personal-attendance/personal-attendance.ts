import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { AttendanceDate } from '../../interfaces/attendance-interface';
import { BusinessPageModel } from '../../interfaces/core-interface';
import { AttendanceInstant, AttendanceResult, Overtime } from '../../interfaces/response-interface';
import { UserService } from '../../services/business/user-service';
import { TimeService } from '../../services/utils/time-service';
import { myAttendance } from './../../services/business/icon-service';
import { attendanceRecordPage, MineRoot } from './../pages';

export interface AttendanceUnionData {
    attendances: AttendanceResult[];
    records: AttendanceInstant[];
    overtimes: Overtime[];
}
export interface Statistics {
    attendanceTime: number;
    workTime: number;
    overtimeTime: number;
}

@IonicPage()
@Component({
    selector: 'page-personal-attendance',
    templateUrl: 'personal-attendance.html',
})
export class PersonalAttendancePage implements BusinessPageModel {

    date = new Date();

    isMonth = true;

    yearMonth: string;

    subscriptions: Subscription[] = [];

    detail$: Subject<AttendanceDate> = new Subject();

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private time: TimeService,
        private userInfo: UserService
    ) {
        this.yearMonth = time.getDateInfo(this.date).dateWithoutDay;
    }

    ionViewCanEnter() {
        return this.navParams.get('permission').view;
    }

    ionViewDidLoad() {
        this.launch();
    }

    launch(): void {
        this.subscriptions = [
            this.detail$.filter(date => date.isNormalAttendance)
                .map(date => this.time.getDate(date, true))
                .withLatestFrom(
                this.userInfo.getUserId(),
                (day, workerId) => ({ day, workerId, rootName: MineRoot, iconName: myAttendance.icon })
                )
                .subscribe(data => this.navCtrl.push(attendanceRecordPage, data).then(() => { })),
        ];
    }

    initialModel(): void {

    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
