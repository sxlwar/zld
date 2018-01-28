import { ENV } from '@app/env';
import { editWorkerContractPage } from './../pages';
import { TimeService } from './../../services/utils/time-service';
import { ProjectService } from './../../services/business/project-service';
import { Subscription } from 'rxjs/Subscription';
import { WorkerService } from './../../services/business/worker-service';
import { WorkerContract, ContractTypeOfResponse, Project } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController } from 'ionic-angular';
import { chain } from 'lodash';

interface Contract {
    // partyA info
    partyA: string;
    project: string;
    team: string;
    launcher: string;

    //partyB info
    partyB: string;
    workType: string;

    // expire: string;
    expire: string;

    //pay 
    payType: string;
    payday: number;

    //attendance time
    attendanceTimeInterval: string;

    // comment
    comment: string;

    //attach
    attaches: string[];
}

interface Piece {
    unitPrice: number;
    pieceName: string;
    pieceLocation: string;
    pieceCount: number;
    standard: string;
}

interface PieceContract extends Contract {
    pieces: Piece[];
}

interface TimeContract extends Contract {
    job: string;
    unitPrice: number;
}

@IonicPage()
@Component({
    selector: 'page-worker-contract',
    templateUrl: 'worker-contract.html',
})
export class WorkerContractPage {
    contractId: number;

    source: WorkerContract;

    contract$: Observable<Contract>;

    subscriptions: Subscription[] = [];

    isTimerContract$: Observable<boolean>;

    prefix = `http://${ENV.DOMAIN}/media/`;

    constructor(
        private navParams: NavParams,
        private worker: WorkerService,
        private project: ProjectService,
        private time: TimeService,
        private modalCtrl: ModalController
    ) {
        this.contractId = this.navParams.get('contractId');
    }

    /**
     * If this page is launched by worker management page ,allow user enter directly.
     * If it is launched by mine page, user must have permission to view and modify at the same time before entering;
     */
    ionViewCanEnter() {
        if (!!this.contractId) {
            return true;
        } else {
            const { view, opt } = this.navParams.get('permission');

            return view && opt;
        }
    }

    ionViewDidLoad() {
        const contract = this.contractId ? this.getContractById(this.contractId) : this.getContractByUser();

        this.initialModel(contract);

        this.launch(contract);
    }

    initialModel(contract: Observable<WorkerContract>): void {
        this.contract$ = contract
            .withLatestFrom(
            this.project.getCurrentProject(),
            (contract, project) => contract.type === ContractTypeOfResponse.timer ? this.getTimerContract(contract, project) : this.getPiecerContract(contract, project)
            );

        this.isTimerContract$ = this.contract$.map(contract => contract.payType === ContractTypeOfResponse.timer);
    }

    launch(contract: Observable<WorkerContract>): void {
        this.subscriptions = [
            contract.subscribe(contract => this.source = contract),

            this.worker.handleError(),

            this.project.handleError(),
        ];
    }

    getContractById(id: number): Observable<WorkerContract> {
        return this.worker.getContractById(Observable.of(id)).filter(value => !!value);
    }

    getContractByUser(): Observable<WorkerContract> {
        return this.worker.getOwnContract(
            this.worker.getUnexpiredOption()
                .zip(
                this.worker.getCompleteStatusOption(),
                (option1, option2) => ({ ...option1, ...option2 })
                )
        )
            .filter(value => !!value);
    }

    getTimerContract(contract: WorkerContract, project: Project): TimeContract {
        const timePaySource = contract.work_time_pay[0];

        return {
            ...this.getCommonPart(contract, project),
            job: timePaySource.content,
            unitPrice: timePaySource.pay_mount
        };
    }

    getPiecerContract(contract: WorkerContract, project: Project): PieceContract {
        const pieces = contract.work_piece_pay.map(item => ({
            unitPrice: item.pay_mount,
            pieceName: item.name,
            pieceLocation: item.location,
            pieceCount: item.num,
            standard: item.standard
        }));

        return { ...this.getCommonPart(contract, project), pieces };
    }

    getCommonPart(contract: WorkerContract, project: Project): Contract {
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
            expire: contract.start_day + '-' + contract.finish_day,
            partyA: project.sub_contract__contracting__name,
            project: project.name,
            team: contract.team__name,
            launcher: contract.founder__employee__realname,
            partyB: contract.worker__employee__realname,
            workType: contract.worktype__name,
            payday: contract.pay_day,
            payType: contract.type,
            comment: contract.additional_content,
            attaches: contract.request_files
        }
    }

    editContract(): void {
        this.modalCtrl.create(editWorkerContractPage, { contract: this.source }).present();
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
