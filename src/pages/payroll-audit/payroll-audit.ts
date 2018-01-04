import { ProjectBillService } from './../../services/business/project-bill-service';
import { Observable } from 'rxjs/Observable';
import { ProcessIdOptions, SpecificWorkFlowState } from './../../interfaces/request-interface';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-payroll-audit',
  templateUrl: 'payroll-audit.html',
})
export class PayrollAuditPage {

  subscriptions: Subscription[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public workFlow: WorkFlowService,
    public projectPayBill: ProjectBillService
  ) {
  }

  ionViewCanEnter(){
    const { view, opt } = this.navParams.get('permission');

    return opt || view;
  }

  ionViewDidLoad() {
    this.initialModel();

    this.launch();
  }

  initialModel(): void {
    // const res = this.workFlow.getPayrollList(this.projectPayBill.getProjectPayBills())
  }

  launch(): void {
    this.subscriptions = [
      this.workFlow.getSpecificWorkFlowList(
        Observable.of({ process_id: ProcessIdOptions.projectPayFlow,...this.workFlow.getWorkFlowStateOption(SpecificWorkFlowState.pending)}),
        this.workFlow.getPayrollPage()
      ),
      this.workFlow.getProjectPayBillFlowList(),
      this.projectPayBill.getProjectBillList(),
      this.workFlow.handleWorkFlowError(),
      this.workFlow.handleProjectPayBillFlowError(),
      this.projectPayBill.handleError()
    ];
  }
  
  ionViewWillUnload(){
    this.subscriptions.forEach(item => item.unsubscribe());
  }

}
