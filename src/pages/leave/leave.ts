import { StatisticsService } from './../../services/business/statistics-service';
import { leave } from './../../services/business/icon-service';
import { MissionRoot, leaveDetailPage, applyLeavePage } from './../pages';
import { PermissionService } from './../../services/config/permission-service';
import { AuditTarget, WorkFlowPageType } from './../../interfaces/mission-interface';
import { ProcessIdOptions, SpecificWorkFlowState } from './../../interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { MissionListItem } from '../../interfaces/mission-interface';

@IonicPage()
@Component({
  selector: 'page-leave',
  templateUrl: 'leave.html',
})
export class LeavePage {

  total: Observable<number>;

  list: Observable<MissionListItem[]>;

  operate: Observable<boolean>;

  haveMoreData: Observable<boolean>;

  subscriptions: Subscription[] = [];

  page$$: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public workFlow: WorkFlowService,
    public permission: PermissionService,
    public statistic: StatisticsService
  ) {
  }

  ionViewCanEnter() {
    const { view, opt } = this.navParams.get('permission');

    return opt || view;
  }

  ionViewDidLoad() {
    this.initialModel();

    this.launch();
  }

  initialModel(): void {
    this.total = this.workFlow.getCount();

    this.list = this.workFlow.getList();

    this.haveMoreData = this.workFlow.haveMoreData(this.workFlow.getLeavePage());

    this.operate = this.permission.getOperatePermission(leave.icon, MissionRoot)
  }

  launch(): void {
    this.subscriptions = [
      this.workFlow.getSpecificWorkFlowList(
        Observable.of({ process_id: ProcessIdOptions.leave, ...this.workFlow.getWorkFlowStateOption(SpecificWorkFlowState.pending) }),
        this.workFlow.getLeavePage()
      ),
      this.statistic.updateWorkFlowStatisticAtLocal(ProcessIdOptions.leave, this.workFlow.getTaskUpdateSuccessCount()),
      this.workFlow.handleWorkFlowError()
    ];
  }

  audit(target: AuditTarget): void {
    const { comment, ids, approve } = target;

    this.workFlow.updateMultiTask(Observable.of({ approve: Number(approve), id: ids, comment }));
  }

  getNextPage(infiniteScroll: InfiniteScroll) {
    this.page$$ && this.page$$.unsubscribe();

    this.page$$ = this.workFlow.getNextPage(infiniteScroll, WorkFlowPageType.leavePage);
  }

  goToNextPage(target: MissionListItem): void {
    this.navCtrl.push(leaveDetailPage, { id: target.id, status: target.status }).then(() => {});
  }

  applyLeave(): void {
    this.navCtrl.push(applyLeavePage).then(() => { });
  }

  ionViewWillUnload() {
    this.workFlow.resetWorkFlowResponse();

    this.workFlow.resetPage(WorkFlowPageType.leavePage);
    
    this.page$$ && this.page$$.unsubscribe();
    
    this.subscriptions.forEach(item => item.unsubscribe());
  }

}
