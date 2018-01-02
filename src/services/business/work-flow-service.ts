import { MissionListItem } from './../../interfaces/mission-interface';
import { MultiTaskUpdateOptions } from './../../interfaces/request-interface';
import { IncreasePageAction } from './../../actions/action/work-flow-action';
import { Command } from './../api/command';
import { RequestOption, WorkFlowListOptions, SpecificWorkFlowState } from '../../interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { WorkFlowAggregation, WorkFlow } from './../../interfaces/response-interface';
import { ProcessorService } from './../api/processor-service';
import { UserService } from './user-service';
import { Store } from '@ngrx/store';
import { AppState, selectWorkFlowStatisticsResponse, selectWorkFlowLimit, selectLeavePage, selectOvertimePage, selectPieceAuditPage, selectAttendanceModifyPage, selectWorkFlowListResponse, selectMultiTaskUpdateResponse, selectMultiTaskUpdateOptions, selectTaskUpdateResponse } from './../../reducers/index-reducer';
import { Subscription } from 'rxjs/Subscription';
import { Injectable } from "@angular/core";
import { ErrorService } from '../../services/errors/error-service';
import { ResetWorkFlowResponseAction } from '../../actions/action/work-flow-action';

@Injectable()
export class WorkFlowService {
    constructor(
        public store: Store<AppState>,
        public userInfo: UserService,
        public error: ErrorService,
        public processor: ProcessorService,
        public command: Command
    ) {
    }

    /* ====================================================Data acquisition====================================================== */

    getWorkFlowStatistics(): Observable<WorkFlowAggregation[]> {
        return this.store.select(selectWorkFlowStatisticsResponse)
            .filter(value => !!value)
            .map(res => res.request_aggregation);
    }

    getLimit(): Observable<number> {
        return this.store.select(selectWorkFlowLimit);
    }

    getLeavePage(): Observable<number> {
        return this.store.select(selectLeavePage);
    }

    getOvertimePage(): Observable<number> {
        return this.store.select(selectOvertimePage)
    }

    getPieceAuditPage(): Observable<number> {
        return this.store.select(selectPieceAuditPage);
    }

    getAttendanceModifyPage(): Observable<number> {
        return this.store.select(selectAttendanceModifyPage);
    }

    getPendingOption(): RequestOption {
        return this.command.workFlowList.noMagicNumber.get(SpecificWorkFlowState.pending).value as RequestOption;
    }

    getList(): Observable<MissionListItem[]> {
        return this.store.select(selectWorkFlowListResponse)
            .filter(value => !!value)
            .map(res => res.request.map(item => ({
                selected: false,
                title: item.title,
                requester: item.requester__employee__realname,
                createTime: item.create_time,
                taskId: item.task[item.task.length - 1].id,
                isRequester: item.task[item.task.length - 1].user_id === item.requester_id,
                id: item.id
            })));
    }

    getCount(): Observable<number> {
        return this.store.select(selectWorkFlowListResponse)
            .filter(value => !!value)
            .map(res => res.count);
    }

    getWorkFlowResponseComplete(): Observable<boolean> {
        return this.store.select(selectWorkFlowListResponse)
            .filter(value => !!value)
            .mapTo(true);
    }

    haveMoreData(page: Observable<number>): Observable<boolean> {
        return this.getCount()
            .distinctUntilChanged()
            .combineLatest(page.distinctUntilChanged(), this.getLimit(), (count, page, limit) => page * limit < count);
    }

    getTaskUpdateSuccessCount(): Observable<number> {
        const multiUpdate: Observable<number> = this.store.select(selectMultiTaskUpdateResponse)
            .filter(value => !!value)
            .mergeMapTo(this.store.select(selectMultiTaskUpdateOptions).map(res => res.id.length))
            .do(v => console.log(v))

        const singleUpdate: Observable<number> = this.store.select(selectTaskUpdateResponse).filter(value => !!value).mapTo(1).do(v => console.log(v));

        return multiUpdate.merge(singleUpdate);
    }

    getWorkFlow(id: number): Observable<WorkFlow> {
        return this.store.select(selectWorkFlowListResponse)
            .filter(value => !!value)
            .map(source => source.request.find(item => item.id === id));
    }

    /* =====================================================Request methods===================================================== */

    getWorkFlowStatistic(): Subscription {
        return this.processor.workFlowStatisticsProcessor(this.userInfo.getSid().map(sid => ({ sid })));
    }

    private getWorkFlowList(option: Observable<WorkFlowListOptions>): Subscription {
        return this.processor.workFlowListProcessor(option.withLatestFrom(this.userInfo.getSid(), (option, sid) => ({ ...option, sid })));
    }

    getSpecificWorkFlowList(option: Observable<RequestOption>, page: Observable<number>): Subscription {
        return this.getWorkFlowList(
            option.combineLatest(
                this.getLimit(),
                page,
                (option, limit, page) => ({ ...option, limit, page })) as Observable<WorkFlowListOptions>
        );
    }

    updateMultiTask(option: Observable<RequestOption>): Subscription {
        return this.processor.multiTaskUpdateProcessor(option.withLatestFrom(this.userInfo.getSid(), (option, sid) => ({ ...option, sid })) as Observable<MultiTaskUpdateOptions>);
    }

    /* =====================================================Local action======================================================== */

    resetWorkFlowResponse() {
        this.store.dispatch(new ResetWorkFlowResponseAction());
    }

    increasePage(page: string) {
        this.store.dispatch(new IncreasePageAction(page));
    }

    /* =====================================================Refuse clean======================================================== */

    handleError(): Subscription[] {
        return [
            this.handleStatisticsError()
        ];
    }

    handleStatisticsError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectWorkFlowStatisticsResponse), 'APP_ERROR');
    }
}