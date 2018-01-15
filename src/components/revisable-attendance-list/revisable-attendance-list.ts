import { RequestOption } from 'interfaces/request-interface';
import { Subscription } from 'rxjs/Subscription';
import { Team, AttendanceResult } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { TeamService } from './../../services/business/team-service';
import { TimeService } from './../../services/utils/time-service';
import { AttendanceService } from './../../services/business/attendance-service';
import { ViewController, InfiniteScroll } from 'ionic-angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { attendanceList } from '../../services/api/command';
import { AttendanceState } from '../../interfaces/attendance-interface';

@Component({
    selector: 'revisable-attendance-list',
    templateUrl: 'revisable-attendance-list.html'
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

    constructor(
        public viewCtrl: ViewController,
        public attendance: AttendanceService,
        public timeService: TimeService,
        public teamService: TeamService
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
            this.attendance.handleAttendanceError()
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
        this.attendance.increasePage();

        this.page$$ && this.page$$.unsubscribe();

        this.page$$ = this.attendance.getAttendanceResultResponse().subscribe(_ => infiniteScroll.complete());
    }

    sortAttendanceBy(target: number) {
        this.attendance.switchSortType(target);
    }

    switchOrderType(order: string): void {
        this.attendance.switchOrderType(order);
    }

    setTeam(teams): void {
        const teamIds: Observable<number> = Observable.from(teams).map((team: Team) => team.id);

        this.teamService.setSelectTeams(teamIds);
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
