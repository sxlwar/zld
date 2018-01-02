import { StatisticsService } from './../../services/business/statistics-service';
import { leave } from './../../services/business/icon-service';
import { MissionRoot, leaveDetailPage } from './../pages';
import { PermissionService } from './../../services/config/permission-service';
import { AuditTarget, WorkFlowPageType } from './../../interfaces/mission-interface';
import { ProcessIdOptions } from './../../interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, InfiniteScroll } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public workFlow: WorkFlowService,
    public modalCtrl: ModalController,
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

  initialModel() {
    this.total = this.workFlow.getCount();

    this.list = this.workFlow.getList();

    this.haveMoreData = this.workFlow.haveMoreData(this.workFlow.getLeavePage());

    this.operate = this.permission.getOperatePermission(leave.icon, MissionRoot)
  }

  launch() {
    this.subscriptions = [
      this.workFlow.getSpecificWorkFlowList(
        Observable.of({ process_id: ProcessIdOptions.leave, ...this.workFlow.getPendingOption() }),
        this.workFlow.getLeavePage()
      ),
      this.statistic.updateWorkFlowStatisticAtLocal(ProcessIdOptions.leave, this.workFlow.getTaskUpdateSuccessCount())
    ];
  }

  audit(target: AuditTarget): void {
    const { comment, ids, approve } = target;

    this.workFlow.updateMultiTask(Observable.of({ approve: Number(approve), id: ids, comment }));
  }

  getNextPage(infiniteScroll: InfiniteScroll) {
    this.workFlow.increasePage(WorkFlowPageType.leavePage);

    const leave$$ = this.workFlow.getWorkFlowResponseComplete().subscribe(_ => {
      infiniteScroll.complete();
      leave$$.unsubscribe();
    });
  }

  goToNextPage(target: MissionListItem): void {
    this.navCtrl.push(leaveDetailPage, { id: target.id }).then(() => {});
  }

  ionViewWillUnload() {
    this.workFlow.resetWorkFlowResponse();

    this.subscriptions.forEach(item => item.unsubscribe());
  }

}
