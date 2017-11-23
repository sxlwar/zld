//region
import { ShowSpecificAttendanceStatisticsByTeam, ShowSpecificAttendanceStatisticsByDate } from './../../actions/action/statistics-action';
import { Store } from '@ngrx/store';
import { AppState, selectAttendanceStatisticList } from './../../reducers/index-reducer';
import { WorkFlowService } from './work-flow-service';
import { WorkFlowAggregation } from './../../interfaces/response-interface';
import { Injectable } from "@angular/core";
import { AttendanceService } from "../../services/business/attendance-service";
import { AttendanceStatistics } from "../../interfaces/response-interface";
import { Observable } from "rxjs/Observable";
import { values, isEmpty, toPairs, filter, orderBy } from 'lodash';
//endregion

export interface AttendanceStatisticDayItem {
    date: string;
    count: number;
    teams: string[];
<<<<<<< HEAD
    teamIds: number[];
=======
>>>>>>> 3fe9fa80b230ba4d5ad22c88e69fb1f23bd5d408
}

export interface AttendanceConfirmStatisticByTeam {
    teamName: string;
    count: number;
}

export interface AttendanceConfirmStatisticByDay {
    date: string;
    count: number;
}

export interface AttendanceStatisticTeamItem {
    dates: string[];
    teamName: string;
<<<<<<< HEAD
    teamId: number;
=======
>>>>>>> 3fe9fa80b230ba4d5ad22c88e69fb1f23bd5d408
}

@Injectable()
export class StatisticsService {

    constructor(
        public store: Store<AppState>,
        public attendance: AttendanceService,
        public workFlow: WorkFlowService
    ) {
    }

    getAttendanceResultStatistics(key: string): Observable<number> {
        return this.attendance.getAttendanceStatistics()
            .mergeMap(item => Observable.from(item)
                .mergeMap(item => this.countAttendanceStatus(item, key).reduce(this.accumulator))
                .reduce(this.accumulator)
            );
    }

    countAttendanceStatus(source: AttendanceStatistics, key: string): Observable<number> {
        return Observable.from(values(source.confirm_status))
            .filter(item => !!item[key])
            .map(item => item[key])
            .reduce(this.accumulator, 0);
    }

    getWorkFlowStatistics(): Observable<WorkFlowAggregation[]> {
        return this.workFlow.getWorkFlowStatistics();
    }

    getAttendanceStatisticsByTeam(key: string): Observable<AttendanceConfirmStatisticByTeam[]> {
        return this.attendance.getAttendanceStatistics()
            .switchMap(statistics => Observable.from(statistics)
                .mergeMap(item => this.countAttendanceStatus(item, key).map(count => ({ teamName: item.team_name, count })))
                .filter(item => !!item.count)
                .reduce(this.accumulatorToArray, [])
            );
    }

    getAttendanceConfirmByDay(key: string): Observable<AttendanceConfirmStatisticByDay[]> {
        return this.getAttendanceByDay(this.attendance.getAttendanceStatistics(), key);
    }

    getAttendanceByDay(source: Observable<AttendanceStatistics[]>, key: string): Observable<AttendanceConfirmStatisticByDay[]> {
        return source.map(data => data.filter(item => !isEmpty(item.confirm_status)))
            .switchMap(statistics => Observable.from(statistics)
                .mergeMap(item => this.transformAttendanceConfirmStatus(item, key))
                .groupBy(data => data.date)
                .mergeMap(group => group.reduce(this.accumulatorKey('count')))
                .filter(item => !!item.count)
                .reduce(this.accumulatorToArray, [])
            );
    }

    transformAttendanceConfirmStatus(sourceData: AttendanceStatistics, key: string): Observable<AttendanceConfirmStatisticByDay> {
        const source = toPairs(sourceData.confirm_status);

        return Observable.from(source).map(item => {
            const [date, data] = item;

            const count = data[key];

            return { date, count }
        })
    }

    showAttendanceByTeams(teams: string[]): void {
        this.store.dispatch(new ShowSpecificAttendanceStatisticsByTeam(teams));
    }

    showAttendanceByDates(days: string[]): void {
        this.store.dispatch(new ShowSpecificAttendanceStatisticsByDate(days));
    }

    getAttendanceItemOf(key: string): Observable<AttendanceStatisticDayItem[]> {
        const source = this.store.select(selectAttendanceStatisticList);

<<<<<<< HEAD
        const list: Observable<AttendanceStatisticDayItem[]> = this.getAttendanceByDay(source, key).map(data => data.map(item => Object.assign(item, {teams: [],teamIds:[]})));
=======
        const list: Observable<AttendanceStatisticDayItem[]> = this.getAttendanceByDay(source, key).map(data => data.map(item => Object.assign(item, {teams: []})));
>>>>>>> 3fe9fa80b230ba4d5ad22c88e69fb1f23bd5d408

        const teamWithDates: Observable<AttendanceStatisticTeamItem[]> = source.map(data => {
            let result: AttendanceStatistics[] = data.filter(item => !isEmpty(item.confirm_status));

            return result.map(item => {
                const status = filter(toPairs(item.confirm_status), ([date, value]) => value[key]);

                const dates = status.map(([date, value]) => date);

                const teamName = item.team_name;

<<<<<<< HEAD
                const teamId = item.team_id;

                return { teamName, dates, teamId };
=======
                return { teamName, dates };
>>>>>>> 3fe9fa80b230ba4d5ad22c88e69fb1f23bd5d408
            });
        });

        //TODO: 需要个好的算法解决嵌套，并且能一次性拿到本次更新后的值。
        return list.withLatestFrom(teamWithDates)
            .map(([result, teamInfo]) => {
                result.forEach(res => {
<<<<<<< HEAD
                    teamInfo.forEach(item => {
                        if(item.dates.indexOf(res.date) !== -1) {
                            res.teams.push(item.teamName)
                            res.teamIds.push(item.teamId);
                        }
                    })
=======
                    teamInfo.forEach(item => (item.dates.indexOf(res.date) !== -1) && res.teams.push(item.teamName))
>>>>>>> 3fe9fa80b230ba4d5ad22c88e69fb1f23bd5d408
                })

                return orderBy(result, ['date'], ['desc']);
            });
    }

    private accumulator(num1: number, num2: number): number {
        return num1 + num2;
    }

    private accumulatorToArray<T>(acc: T[], cur: T): T[] {
        acc.push(cur);

        return acc;
    }

    private accumulatorKey(key: string) {
        return <T>(acc: T, cur: T): T => {
            acc[key] += cur[key]
            return acc;
        }
    }
}