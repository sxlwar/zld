import { editWorkerContractPage } from './../pages';
import { TimeService } from './../../services/utils/time-service';
import { ProjectService } from './../../services/business/project-service';
import { Subscription } from 'rxjs/Subscription';
import { WorkerService } from './../../services/business/worker-service';
import { WorkerContract, ContractTypeOfResponse, Project } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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

    source: WorkerContract;

    contract: Contract;

    subscriptions: Subscription[] = [];

    isTimerContract: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public worker: WorkerService,
        public project: ProjectService,
        public time: TimeService,
        public modalCtrl: ModalController
    ) {
    }

    /**
     * If this page is launched by worker management page ,allow user enter directly.
     * If it is launched by mine page, user must have permission to view and modify at the same time before entering;
     */
    ionViewCanEnter() {
        const id = this.navParams.get('contractId');

        if (!!id) {
            return true;
        } else {
            const { view, opt } = this.navParams.get('permission');

            return view && opt;
        }
    }

    ionViewDidLoad() {
        const id = this.navParams.get('contractId');

        if (id) {
            this.getContractById(id);
        } else {
            this.getContractByUser();
        }
    }

    getContractById(id: number) {
        const contract = this.worker.getContractById(Observable.of(id)).filter(value => !!value);

        this.subscriptions = [
            this.optimizeContract(contract),
            contract.subscribe(contract => this.source = contract),
        ];
    }

    getContractByUser() {
        const contract = this.worker.getOwnContract(
            this.worker.getUnexpiredOption()
                .zip(this.worker.getCompleteStatusOption(), (option1, option2) => ({ ...option1, ...option2 }))
        )
            .filter(value => !!value);

        this.subscriptions = [
            this.optimizeContract(contract),
            contract.subscribe(contract => this.source = contract),
        ];
    }

    optimizeContract(contract: Observable<WorkerContract>): Subscription {
        return contract
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

    editContract(): void {
        this.modalCtrl.create(editWorkerContractPage, { contract: this.source }).present();
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
