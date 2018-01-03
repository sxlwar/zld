import { LeaveService } from './../../services/business/leave-service';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { Subscription } from 'rxjs/Subscription';
import { Leave, WorkFlow } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-leave-detail',
  templateUrl: 'leave-detail.html',
})
export class LeaveDetailPage {

  id: number;

  workFlow: Observable<WorkFlow>;

  leave: Observable<Leave>;

  subscriptions: Subscription[] = [];

  audit$$: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public workFlowService: WorkFlowService,
    public leaveService: LeaveService
  ) {
    this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    this.initialModel();

    this.launch();
  }

  initialModel() {
    this.workFlow = this.workFlowService.getWorkFlow(this.id);

    this.leave = this.leaveService.getLeaveRecordLists().map(res => res[0]);
  }

  launch() {
    this.subscriptions = [
      this.leaveService.getLeaveRecord(this.leaveService.getProcessingRecordOptions(this.id)),
      this.leaveService.handleError()
    ];
  }

  audit() {
    this.audit$$ && this.audit$$.unsubscribe();

    this.audit$$ = this.workFlowService.auditTask(this.id);
  }

  ionViewWillUnload() {
    this.audit$$ && this.audit$$.unsubscribe();

    this.subscriptions.forEach(item => item.unsubscribe());
  }

}
