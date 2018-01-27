import { putInArray } from '../utils/util';
import { Subscription } from 'rxjs/Subscription';
import { ShowSpecificAttendanceStatisticsByTeam, ShowSpecificAttendanceStatisticsByDate, UpdateSpecificWorkFlowStatisticAtLocalAction } from './../../actions/action/statistics-action';
import { Store } from '@ngrx/store';
import { AppState, selectAttendanceStatisticList, selectAttendanceStatistics } from './../../reducers/index-reducer';
import { Injectable } from "@angular/core";
import { AttendanceStatistics } from "../../interfaces/response-interface";
import { Observable } from "rxjs/Observable";
import { values, isEmpty, toPairs, filter, orderBy } from 'lodash';

export interface AttendanceStatisticDayItem {
    date: string;
    count: number;
    teams: string[];
    teamIds: number[];
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
    teamId: number;
}

@Injectable()
export class StatisticsService {

    constructor(
        private store: Store<AppState>
    ) {
    }

    getAttendanceResultStatistics(key: string): Observable<number> {
        return this.store.select(selectAttendanceStatisticList)
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

    getAttendanceStatisticsByTeam(key: string): Observable<AttendanceConfirmStatisticByTeam[]> {
        return this.store.select(selectAttendanceStatistics)
            .switchMap(statistics => Observable.from(statistics)
                .mergeMap(item => this.countAttendanceStatus(item, key).map(count => ({ teamName: item.team_name, count })))
                .filter(item => !!item.count)
                .reduce(putInArray, [])
            );
    }

    getAttendanceConfirmByDay(key: string): Observable<AttendanceConfirmStatisticByDay[]> {
        return this.getAttendanceByDay(this.store.select(selectAttendanceStatistics), key);
    }

    getAttendanceByDay(source: Observable<AttendanceStatistics[]>, key: string): Observable<AttendanceConfirmStatisticByDay[]> {
        return source.map(data => data.filter(item => !isEmpty(item.confirm_status)))
            .switchMap(statistics => Observable.from(statistics)
                .mergeMap(item => this.transformAttendanceConfirmStatus(item, key))
                .groupBy(data => data.date)
                .mergeMap(group => group.reduce(this.accumulatorKey('count')))
                .filter(item => !!item.count)
                .reduce(putInArray, [])
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

    updateWorkFlowStatisticAtLocal(processId: string, count: Observable<number>): Subscription {
        return count.subscribe(count => {
            this.store.dispatch(new UpdateSpecificWorkFlowStatisticAtLocalAction({ processId, count }));
        })
    }

    getAttendanceItemOf(key: string): Observable<AttendanceStatisticDayItem[]> {
        const source = this.store.select(selectAttendanceStatisticList);

        const list: Observable<AttendanceStatisticDayItem[]> = this.getAttendanceByDay(source, key).map(data => data.map(item => Object.assign(item, { teams: [], teamIds: [] })));

        const teamWithDates: Observable<AttendanceStatisticTeamItem[]> = source.map(data => {
            let result: AttendanceStatistics[] = data.filter(item => !isEmpty(item.confirm_status));

            return result.map(item => {
                const status = filter(toPairs(item.confirm_status), ([date, value]) => value[key]);

                return { teamName: item.team_name, dates: status.map(([date, value]) => date), teamId: item.team_id };
            });
        });

        //TODO: 需要个好的算法解决嵌套，并且能一次性拿到本次更新后的值。
        return list.withLatestFrom(teamWithDates)
            .map(([result, teamInfo]) => {
                result.forEach(res => {
                    teamInfo.forEach(item => {
                        if (item.dates.indexOf(res.date) !== -1) {
                            res.teams.push(item.teamName)
                            res.teamIds.push(item.teamId);
                        }
                    })
                })

                return orderBy(result, ['date'], ['desc']);
            });
    }

    private accumulator(num1: number, num2: number): number {
        return num1 + num2;
    }

    private accumulatorKey(key: string) {
        return <T>(acc: T, cur: T): T => {
            acc[key] += cur[key]
            return acc;
        }
    }
}