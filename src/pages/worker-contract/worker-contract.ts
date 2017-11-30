import { TimeService } from './../../services/utils/time-service';
import { ProjectService } from './../../services/business/project-service';
import { Subscription } from 'rxjs/Subscription';
import { WorkerService } from './../../services/business/worker-service';
import { WorkerContract, ContractTypeOfResponse, Project } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { chain } from 'lodash';

interface Contract {
  partyA: string;
  partyB: string;
  expire: string;
  payType: string;
  attendanceTimeInterval?: string;
  unitPrice?: number;
  overTimeUnitPrice?: number;
  payday?: number;
  pieceName?: string;
  pieceLocation?: string;
  pieceCount?: number;
}

@IonicPage()
@Component({
  selector: 'page-worker-contract',
  templateUrl: 'worker-contract.html',
})
export class WorkerContractPage {
  contract: Contract;

  subscription: Subscription;

  isTimerContract: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public worker: WorkerService,
    public project: ProjectService,
    public time: TimeService
  ) {
  }

  ionViewDidLoad() {
    const id = this.navParams.get('contractId');

    this.subscription = this.worker.getContractById(Observable.of(id))
      .filter(value => !!value)
      .zip(this.project.getCurrentProject())
      .subscribe(([contract, project]) => {
        this.isTimerContract = contract.type === ContractTypeOfResponse.timer;

        if (this.isTimerContract) {
          this.contract = this.getTimerContract(contract, project);
        } else {
          this.contract = this.getPiecerContract(contract, project);
        }

      });
  }

  getTimerContract(contract: WorkerContract, project: Project): Contract {
    const timePaySource = contract.work_time_pay[0];

    const attendanceTimeInterval = chain([
      contract.morning_time_on_duty,
      contract.morning_time_off_duty,
      contract.afternoon_time_on_duty,
      contract.afternoon_time_off_duty
    ])
      .compact()
      .map(this.time.withOutSecond)
      .chunk(2)
      .map(item => item.join('-'))
      .value()
      .join(' ');

    return {
      attendanceTimeInterval, 
      partyA: project.sub_contract__contracting__name,
      partyB: contract.worker__employee__realname,
      expire: contract.start_day + '~' + contract.finish_day,
      payType: contract.type,
      unitPrice: timePaySource.pay_mount,
      overTimeUnitPrice: timePaySource.overtime_pay_mount,
      payday: contract.pay_day
    };
  }

  getPiecerContract(contract: WorkerContract, project: Project): Contract {
    const piecePaySource = contract.work_piece_pay[0];

    return {
      partyA: project.sub_contract__contracting__name,
      partyB: contract.worker__employee__realname,
      expire: contract.start_day + '-' + contract.finish_day,
      payType: contract.type,
      pieceName: piecePaySource.name,
      pieceLocation: piecePaySource.location,
      pieceCount: piecePaySource.num,
      unitPrice: piecePaySource.pay_mount
    };
  }

  ionViewWillUnload() {
    this.subscription.unsubscribe();
  }
}
