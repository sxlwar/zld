import { ProcessIdOptions } from './../../interfaces/request-interface';
import { MissionRoot, overtimeDetailPage } from './../pages';
import { overtime } from './../../services/business/icon-service';
import { MissionListItem, AuditTarget, WorkFlowPageType } from './../../interfaces/mission-interface';
import { Observable } from 'rxjs/Observable';
import { StatisticsService } from './../../services/business/statistics-service';
import { Subscription } from 'rxjs/Subscription';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, InfiniteScroll } from 'ionic-angular';
import { PermissionService } from '../../services/config/permission-service';

@IonicPage()
@Component({
  selector: 'page-overtime',
  templateUrl: 'overtime.html',
})
export class OvertimePage {

  subscriptions: Subscription[] = [];

  total: Observable<number>;

  list: Observable<MissionListItem[]>;

  operate: Observable<boolean>;

  haveMoreData: Observable<boolean>;

  page$$: Subscription;

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

  initialModel(): void {
    this.total = this.workFlow.getCount();

    this.list = this.workFlow.getList();

    this.haveMoreData = this.workFlow.haveMoreData(this.workFlow.getOvertimePage());

    this.operate = this.permission.getOperatePermission(overtime.icon, MissionRoot)
  }

  launch(): void {
    this.subscriptions = [
      this.workFlow.getSpecificWorkFlowList(
        Observable.of({ process_id: ProcessIdOptions.overtime, ...this.workFlow.getPendingOption() }),
        this.workFlow.getOvertimePage()
      ),
      this.statistic.updateWorkFlowStatisticAtLocal(ProcessIdOptions.overtime, this.workFlow.getTaskUpdateSuccessCount())
    ];
  }

  audit(target: AuditTarget): void {
    const { comment, ids, approve } = target;

    this.workFlow.updateMultiTask(Observable.of({ approve: Number(approve), id: ids, comment }));
  }

  getNextPage(infiniteScroll: InfiniteScroll): void {
    this.page$$ && this.page$$.unsubscribe();

    this.page$$ = this.workFlow.getNextPage(infiniteScroll, WorkFlowPageType.overtimePage);
  }

  goToNextPage(target: MissionListItem): void {
    this.navCtrl.push(overtimeDetailPage, { id: target.id }).then(() => { });
  }

  ionViewWillUnload() {
    this.workFlow.resetWorkFlowResponse();

    this.page$$ && this.page$$.unsubscribe();
    
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
