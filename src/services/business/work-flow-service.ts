import { ProjectService } from './project-service';
import { processIdToIcon } from './icon-service';
import { WorkFlowAuditComponent } from './../../components/work-flow-audit/work-flow-audit';
import { InfiniteScroll, ModalController } from 'ionic-angular';
import { MissionListItem, AuditTarget } from './../../interfaces/mission-interface';
import { MultiTaskUpdateOptions, WorkFlowStatus } from './../../interfaces/request-interface';
import { IncreasePageAction, ResetPageAction, SetScreeningConditionAction, ResetTaskUpdateResponseAction } from './../../actions/action/work-flow-action';
import { Command } from './../api/command';
import { RequestOption, WorkFlowListOptions } from '../../interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { WorkFlowAggregation, WorkFlow, MultiTaskUpdateResponse } from './../../interfaces/response-interface';
import { ProcessorService } from './../api/processor-service';
import { UserService } from './user-service';
import { Store } from '@ngrx/store';
import { AppState, selectWorkFlowStatisticsResponse, selectWorkFlowLimit, selectLeavePage, selectOvertimePage, selectPieceAuditPage, selectAttendanceModifyPage, selectWorkFlowListResponse, selectMultiTaskUpdateResponse, selectMultiTaskUpdateOptions, selectTaskUpdateResponse, selectIStartedPage, selectICompletedPage, selectScreeningCondition, selectPayrollPage, selectProjectPayBillFlowListResponse } from './../../reducers/index-reducer';
import { Subscription } from 'rxjs/Subscription';
import { Injectable } from "@angular/core";
import { ErrorService } from '../../services/errors/error-service';
import { ResetWorkFlowResponseAction } from '../../actions/action/work-flow-action';

@Injectable()
export class WorkFlowService {
    constructor(
        private store: Store<AppState>,
        private userInfo: UserService,
        private error: ErrorService,
        private processor: ProcessorService,
        private command: Command,
        private modalCtrl: ModalController,
        private project: ProjectService
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

    getIStartedPage(): Observable<number> {
        return this.store.select(selectIStartedPage);
    }

    getICompletedPage(): Observable<number> {
        return this.store.select(selectICompletedPage);
    }

    getPayrollPage(): Observable<number> {
        return this.store.select(selectPayrollPage);
    }

    getWorkFlowStateOption(state: string): RequestOption {
        return this.command.workFlowList.noMagicNumber.get(state).value as RequestOption;
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
                id: item.id,
                processId: item.process_id,
                status: item.status,
                icon: processIdToIcon[item.process_id]
            })));
    }

    getCount(): Observable<number> {
        return this.store.select(selectWorkFlowListResponse)
            .filter(value => !!value)
            .map(res => res.count);
    }

    haveMoreData(page: Observable<number>): Observable<boolean> {
        return this.getCount()
            .distinctUntilChanged()
            .combineLatest(page.distinctUntilChanged(), this.getLimit(), (count, page, limit) => page * limit < count);
    }

    getTaskUpdateSuccessCount(): Observable<number> {
        const multiUpdate: Observable<number> = this.getTaskUpdateResponse()
            .mergeMapTo(this.store.select(selectMultiTaskUpdateOptions).map(res => res.id.length))

        const singleUpdate: Observable<number> = this.store.select(selectTaskUpdateResponse).filter(value => !!value).mapTo(1);

        return multiUpdate.merge(singleUpdate);
    }

    getWorkFlow(id: number): Observable<WorkFlow> {
        return this.store.select(selectWorkFlowListResponse)
            .filter(value => !!value)
            .map(source => source.request.find(item => item.id === id));
    }

    getNextPage(infiniteScroll: InfiniteScroll, page: string): Subscription {
        this.increasePage(page);

        return this.store.select(selectWorkFlowListResponse)
            .filter(value => !!value)
            .skip(1)
            .subscribe(_ => infiniteScroll.complete());
    }

    isAuditButtonVisibility(status: string, permission: Observable<boolean>): Observable<boolean> {
        return permission.map(permission => permission && status === WorkFlowStatus.processing);
    }

    getScreeningCondition(): Observable<string> {
        return this.store.select(selectScreeningCondition);
    }

    getTaskUpdateResponse(): Observable<MultiTaskUpdateResponse> {
        return this.store.select(selectMultiTaskUpdateResponse).filter(value => !!value);
    }

    getTaskUpdateSuccessResponse(): Observable<boolean> {
        return this.getTaskUpdateResponse()
            .filter(res => !res.errorMessage)
            .mapTo(true);
    }

    /* =====================================================Request methods===================================================== */

    getWorkFlowStatistic(): Subscription {
        return this.processor.workFlowStatisticsProcessor(
            this.userInfo.getSid().map(sid => ({ sid }))
        );
    }

    private getWorkFlowList(option: Observable<WorkFlowListOptions>): Subscription {
        return this.processor.workFlowListProcessor(
            option.withLatestFrom(
                this.userInfo.getSid(), (option, sid) => ({ ...option, sid })
            )
        );
    }

    getSpecificWorkFlowList(option: Observable<RequestOption>, page: Observable<number>): Subscription {
        return this.getWorkFlowList(
            option.combineLatest(
                this.getLimit(),
                page,
                (option, limit, page) => ({ ...option, limit, page }) as WorkFlowListOptions
            )
        );
    }

    updateMultiTask(option: Observable<RequestOption>): Subscription {
        return this.processor.multiTaskUpdateProcessor(
            option.withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid }) as MultiTaskUpdateOptions)
        );
    }

    getProjectPayBillFlowList(): Subscription {
        return this.processor.projectPayBillFlowListProcessor(
            this.project.getProjectId()
                .zip(
                this.userInfo.getSid(),
                (project_id, sid) => ({ project_id, sid })
                )
        );
    }

    /* =====================================================Local action======================================================== */

    resetWorkFlowResponse(): void {
        this.store.dispatch(new ResetWorkFlowResponseAction());
    }

    resetPage(page: string): void {
        this.store.dispatch(new ResetPageAction(page));
    }

    increasePage(page: string) {
        this.store.dispatch(new IncreasePageAction(page));
    }

    auditTask(id: number): Subscription {
        return this.getList()
            .map(source => source.filter(item => item.id === id))
            .take(1)
            .subscribe(list => {
                const modal = this.modalCtrl.create(WorkFlowAuditComponent, { list });

                modal.present();

                modal.onDidDismiss((data: AuditTarget) => data && this.updateMultiTask(Observable.of({ approve: Number(data.approve), id: data.ids, comment: data.comment })));
            });
    }

    setScreeningCondition(condition: string): void {
        this.store.dispatch(new SetScreeningConditionAction(condition));
    }

    resetTaskUpdateResponse(): void {
        this.store.dispatch(new ResetTaskUpdateResponseAction());
    }

    /* =====================================================Refuse clean======================================================== */

    handleStatisticsError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectWorkFlowStatisticsResponse), 'APP_ERROR');
    }

    handleWorkFlowError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectWorkFlowListResponse), 'API_ERROR');
    }

    handleProjectPayBillFlowError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectProjectPayBillFlowListResponse), 'API_ERROR');
    }

    handleUpdateError(): Subscription {
        return this.error.handleErrorInSpecific(this.getTaskUpdateResponse(), 'API_ERROR');
    }
}