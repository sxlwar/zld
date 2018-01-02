import { ENV } from '@app/env';
import { WorkFlowStatus, RequestOption } from './../../interfaces/request-interface';
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
  imagePrefix = `http://${ENV.DOMAIN}/media/`;
  
  id: number;

  workFlow: Observable<WorkFlow>;

  leave: Observable<Leave>;

  subscriptions: Subscription[] = [];

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
      this.leaveService.getLeaveRecord(this.getOption())
    ];
  }

  getOption(): Observable<RequestOption> {
    return Observable.of({
      history_view: true,
      request_id: this.id,
      request_status: WorkFlowStatus.processing
    })
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

}
