import { OvertimeService } from './../../services/business/overtime-service';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { Subscription } from 'rxjs/Subscription';
import { WorkFlow, Overtime } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-overtime-detail',
  templateUrl: 'overtime-detail.html',
})
export class OvertimeDetailPage {

  id: number;

  workFlow: Observable<WorkFlow>;

  overtime: Observable<Overtime>;

  subscriptions: Subscription[] = [];

  audit$$: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public workFlowService: WorkFlowService,
    public overtimeService: OvertimeService,
    public modalCtrl: ModalController
  ) {
    this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    this.initialModel();

    this.launch();
  }

  initialModel() {
    this.workFlow = this.workFlowService.getWorkFlow(this.id);

    this.overtime = this.overtimeService.getOvertimeRecords().map(res => res[0]);
  }

  launch() {
    this.subscriptions = [
      this.overtimeService.getOvertimeRecordList(this.overtimeService.getProcessingRecordOptions(this.id)),
      this.overtimeService.handleError(),
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
