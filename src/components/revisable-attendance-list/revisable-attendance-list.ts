import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestOption } from 'interfaces/request-interface';
import { InfiniteScroll, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { AttendanceState } from '../../interfaces/attendance-interface';
import { attendanceList } from '../../services/api/command';
import { AttendanceResult, Team } from './../../interfaces/response-interface';
import { AttendanceService } from './../../services/business/attendance-service';
import { TeamService } from './../../services/business/team-service';
import { TimeService } from './../../services/utils/time-service';

@Component({
    selector: 'revisable-attendance-list',
    templateUrl: 'revisable-attendance-list.html',
})
export class RevisableAttendanceListComponent implements OnInit, OnDestroy {
    startDate: string;

    endDate: string;

    today: string;

    teams: Observable<Team[]>;

    attendances: Observable<AttendanceResult[]>;

    subscriptions: Subscription[] = [];

    page$$: Subscription;

    haveMoreData: Observable<boolean>;

    count: Observable<number>;

    setTeam$: Subject<Team[]> = new Subject();

    constructor(
        private viewCtrl: ViewController,
        private attendance: AttendanceService,
        private timeService: TimeService,
        private teamService: TeamService
    ) {
    }

    ngOnInit() {
        this.initialModel();

        this.launch();
    }

    launch() {
        this.subscriptions = [
            this.attendance.getAttendances(this.getAttendanceOption()),

            this.getDate(),

            this.teamService.getSelectedTeams().subscribe(_ => this.attendance.resetAttendance()),

            this.teamService.setSelectTeams(this.setTeam$.map(teams => teams.map(item => item.id))),

            this.teamService.handleError(),

            this.attendance.handleAttendanceError(),
        ];
    }

    initialModel() {

        this.today = this.timeService.getDate(new Date(), true);

        this.attendances = this.attendance.getWrappedAttendanceResultList();

        this.teams = this.teamService.getOwnTeams().withLatestFrom(this.teamService.getSelectedTeams(), (teams, ids) => teams.map(team => ({ ...team, selected: ids.indexOf(team.id) !== -1 })));

        this.haveMoreData = this.attendance.getAttendanceResultMoreData();

        this.count = this.attendance.getWrappedAttendanceCount();
    }

    getDate(): Subscription {
        return this.attendance.getSelectedDate()
            .subscribe(data => {
                this.startDate = this.timeService.getDate(data.start, true);
                this.endDate = this.timeService.getDate(data.end, true);
            });
    }

    getAttendanceOption(): Observable<RequestOption> {
        return this.teamService.getSelectedTeams()
            .combineLatest(
            this.attendance.getSelectedDate().map(data => ({ start_day: this.timeService.getDate(data.start, true), end_day: this.timeService.getDate(data.end, true) })),
            Observable.of(attendanceList.noMagicNumber.get(AttendanceState[0]).value),
            (ids, date, queryType) => ({ ...date, team_id: ids, ...queryType })
            );
    }

    /* ========================================================Attendance operation========================================================= */

    setDate(type: string) {
        const data = type === 'start' ? this.startDate : this.endDate;

        this.attendance.setDate(type, data);

        this.attendance.resetAttendance();
    }

    updateSelectedAttendanceState(state: string): void {
        this.attendance.setSelectedAttendanceState(Number(state));

        this.attendance.resetAttendance();
    }

    getNextPage(infiniteScroll: InfiniteScroll): void {
        this.page$$ && this.page$$.unsubscribe();

        this.page$$ = this.attendance.getNextPage(infiniteScroll);
    }

    sortAttendanceBy(target: number) {
        this.attendance.switchSortType(target);
    }

    switchOrderType(order: string): void {
        this.attendance.switchOrderType(order);
    }

    audit(attendances: AttendanceResult[]): void {
        this.attendance.addAttendancesToModify(attendances);

        this.dismiss();
    }

    dismiss(): void {
        this.viewCtrl.dismiss();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => item && item.unsubscribe());

        this.page$$ && this.page$$.unsubscribe();

        this.attendance.resetAttendance();
    }
}
