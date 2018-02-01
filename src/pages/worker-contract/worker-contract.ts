import { Component } from '@angular/core';
import { ENV } from '@app/env';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { chain } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { ContractTypeOfResponse, Project, WorkerContract } from './../../interfaces/response-interface';
import { LaunchService } from './../../services/business/launch-service';
import { ProjectService } from './../../services/business/project-service';
import { WorkerService } from './../../services/business/worker-service';
import { TimeService } from './../../services/utils/time-service';
import { editWorkerContractPage } from './../pages';


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

    terminate$: Subject<boolean> = new Subject();

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private worker: WorkerService,
        private project: ProjectService,
        private time: TimeService,
        private modalCtrl: ModalController,
        private launchService: LaunchService
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
        const contract = this.contractId
            ? this.worker.getContractByIdReactContractsChange(Observable.of(this.contractId)).filter(value => !!value)
            : this.getContractByUser();

        this.initialModel(contract);

        this.launch(contract);
    }

    initialModel(contract: Observable<WorkerContract>): void {
        this.contract$ = contract.withLatestFrom(
            this.project.getCurrentProject(),
            (contract, project) => contract.type === ContractTypeOfResponse.timer
                ? this.getTimerContract(contract, project)
                : this.getPiecerContract(contract, project)
        );

        this.isTimerContract$ = this.contract$.map(contract => contract.payType === ContractTypeOfResponse.timer);
    }

    launch(contract: Observable<WorkerContract>): void {
        this.subscriptions = [
            contract.subscribe(contract => (this.source = contract)),

            this.launchService.terminateWorkerContract(
                this.terminate$.mapTo({
                    date: this.time.getDateInfo(this.time.getYesterday()).fullDate,
                    contractId: this.contractId,
                    attach: [],
                })
            ),

            this.launchService.getSuccessResponseOfWorkerContractTermination().subscribe(_ => this.navCtrl.pop()),

            this.worker.handleError(),

            this.project.handleError(),

            this.launchService.handleAttendanceModifyError(),

            this.launchService.handleWorkerContractTerminationError(),
        ];
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
            unitPrice: timePaySource.pay_mount,
        };
    }

    getPiecerContract(contract: WorkerContract, project: Project): PieceContract {
        const pieces = contract.work_piece_pay.map(item => ({
            pieceCount: item.num,
            pieceLocation: item.location,
            pieceName: item.name,
            standard: item.standard,
            unitPrice: item.pay_mount,
        }));

        return { ...this.getCommonPart(contract, project), pieces };
    }

    getCommonPart(contract: WorkerContract, project: Project): Contract {
        const attendanceTimeInterval = chain([
            contract.afternoon_time_off_duty,
            contract.afternoon_time_on_duty,
            contract.morning_time_off_duty,
            contract.morning_time_on_duty,
        ])
            .compact()
            .map(this.time.withOutSecond)
            .chunk(2)
            .map(item => item.join('-'))
            .value()
            .join(' ');

        return {
            attaches: contract.request_files,
            attendanceTimeInterval,
            comment: contract.additional_content,
            expire: contract.start_day + '-' + contract.finish_day,
            launcher: contract.founder__employee__realname,
            partyA: project.sub_contract__contracting__name,
            partyB: contract.worker__employee__realname,
            payType: contract.type,
            payday: contract.pay_day,
            project: project.name,
            team: contract.team__name,
            workType: contract.worktype__name,
        };
    }

    editContract(): void {
        this.modalCtrl.create(editWorkerContractPage, { contract: this.source }).present();
    }

    ionViewWillUnload() {
        this.launchService.resetTerminateWorkerContractResponse();

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
