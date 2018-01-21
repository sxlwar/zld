import { RequestOption } from '../../interfaces/request-interface';
import { AddAttendanceCardFormModel } from './../../services/api/mapper-service';
import { WorkerContractListResponse } from './../../interfaces/response-interface';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ProjectService } from './../../services/business/project-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AttendanceCardService } from './../../services/business/attendance-card-service';
import { WorkerService } from './../../services/business/worker-service';
import { ViewController, NavParams, InfiniteScroll } from 'ionic-angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { cardNumberValidator } from '../../validators/validators';

export interface Worker {
    name: string;
    userId: number;
    teamName: string;
    workTypeId: number;
}

@Component({
    selector: 'add-attendance-card',
    templateUrl: 'add-attendance-card.html'
})
export class AddAttendanceCardComponent implements OnInit, OnDestroy {

    text = 'ADD_ATTENDANCE_CARD';

    addAttendanceCardForm: FormGroup;

    checked = false;

    workers: Observable<Worker[]>;

    haveMoreData: Observable<boolean>;

    boundWorker: Worker;

    worker$$: Subscription;

    subscriptions: Subscription[] = [];

    switchState = new Subject();

    response: Observable<WorkerContractListResponse>;

    isUpdate: boolean;

    add$: Subject<AddAttendanceCardFormModel> = new Subject();

    bind$: Subject<RequestOption> = new Subject();

    constructor(
        public viewCtrl: ViewController,
        public worker: WorkerService,
        public fb: FormBuilder,
        public card: AttendanceCardService,
        public project: ProjectService,
        public navParams: NavParams
    ) {
        this.worker.resetPage();
    }

    ngOnInit() {
        this.initialModel();

        this.launch();

        //We need to put this step in the final stage, 
        //because we may need to notify the processing program to perform corresponding actions when checking parameters, 
        //so we must ensure that all the processors are initialized.
        this.checkNavParams();
    }

    initialModel(): void {
        this.response = this.worker.getWorkerContractResponse();

        this.workers = this.getWorkers();

        this.haveMoreData = this.response.map(response => !!response.worker_contract.length).skip(1);
    }

    launch(): void {
        this.subscriptions = [
            this.clearSelectedWorkWhenSwitchClose(),
            this.getWorkerContractList(),
            this.card.addAttendanceCard(this.add$),
            this.card.updateAttendanceCard(this.bind$),
            this.worker.handleError(),
            ...this.card.handleError(),
        ];
    }

    /**
     * @method checkNavParams
     * @description Check whether the cardNumber param is  passed in, display binding function if passed in or addition function if not.
     */
    checkNavParams() {
        const cardNumber = this.navParams.get('cardNumber');

        this.isUpdate = !!cardNumber;

        if (this.isUpdate) {
            this.text = 'BIND_ATTENDANCE_CARD';
            this.checked = true;
            this.switchState.next(true);
        }

        this.createForm(cardNumber);
    }

    /**
     * @method clearSelectedWorkWhenSwitchClose
     * @description Reset boundWorker filed and selectedWorker filed when the switch closed;
     */
    clearSelectedWorkWhenSwitchClose(): Subscription {
        return this.switchState.filter(value => !value)
            .subscribe(_ => {
                this.boundWorker = null;
                this.addAttendanceCardForm.patchValue({ selectedWorker: { value: '', required: false } });
            });
    }

    /**
     * @method getWorkerContractList
     * @description In the two case, you need to get the data. 
     * First, when user first opens the switch, the second is when the user drop-down to get the rest of the data.
     */
    getWorkerContractList(): Subscription {
        const page = this.worker.getCurrentPage();

        const initialOpenSwitch = this.switchState
            .combineLatest(page)
            .map(([state, page]) => state && page === 1)
            .filter(isFirstOpen => isFirstOpen)
            .distinctUntilChanged();

        const getRestData = page
            .skip(1)
            .distinctUntilChanged()
            .combineLatest(this.worker.getLimit(), this.response.map(item => item.count).distinctUntilChanged())
            .filter(([page, limit, count]) => Math.ceil(count / limit) + 1 >= page);


        return this.worker.getWorkerContracts(initialOpenSwitch.merge(getRestData).mergeMapTo(this.getOption()));
    }

    /**
     * @method createForm 
     * @param number 
     * @description Initialize form.
     */
    createForm(number = '') {
        this.addAttendanceCardForm = this.fb.group({
            cardNumber: [{ value: number, disabled: this.isUpdate }, cardNumberValidator],
            bind: { value: this.checked, disabled: this.isUpdate },
            selectedWorker: ''
        });
    }

    /**
     * @method getWorkers
     * @description Get works without binding card.
     */
    getWorkers(): Observable<Worker[]> {
        return this.worker.getAllWorkerContracts()
            .map(res => res.map(item => ({ name: item.worker__employee__realname, userId: item.worker_id, teamName:item.team__name, workTypeId: item.worktype_id })))
            .combineLatest(this.card.getCards().map(cards => cards.filter(item => !!item.user_id).map(item => item.user_id)))
            .map(([workers, boundIds]) => workers.filter(item => boundIds.indexOf(item.userId) === -1));
    }

    /**
     * @method getNextPage 
     * @param infiniteScroll - Ionic scroll instance
     * @description Drop-down to get rest workers.
     */
    getNextPage(infiniteScroll: InfiniteScroll) {
        this.worker$$ && this.worker$$.unsubscribe();

        this.worker$$ = this.worker.getNextPage(infiniteScroll);
    }

    /**
     * @method getOption
     * @description Worker contract list api request options;
     */
    getOption() {
        return this.worker.getCompleteStatusOption()
            .zip(
            this.worker.getUnexpiredOption(),
            this.project.getProjectId().map(project_id => ({ project_id })),
            (option1, option2, option3) => ({ ...option1, ...option2, ...option3 })
            );
    }

    /**
     * @method execution
     * @description Determine which action should be execute when button clicked.
     */
    execution() {
        if (this.isUpdate) {
            this.bindCard();
        } else {
            this.addCard();
        }
        this.viewCtrl.dismiss();
    }

    /**
     * @method bindCard
     * @description Execute binding action.
     */
    bindCard() {
        const cardNumber = this.navParams.get('cardNumber');

        const { userId, name } = this.boundWorker;

        this.bind$.next({ ic_card_num: cardNumber, user_id: userId, userName: name });
    }

    /**
     * @method addCard
     * @description Execute addition action.
     */
    addCard() {
        const { cardNumber, bind } = this.addAttendanceCardForm.value;

        const option = bind ? { cardNumber, userId: this.boundWorker.userId, userName: this.boundWorker.name } : { cardNumber };

        this.add$.next(option);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => item.unsubscribe());

        this.worker$$ && this.worker$$.unsubscribe();
    }

    /* ===============================================Shortcut methods for templates==================================================== */

    get cardNumber() {
        return this.addAttendanceCardForm.get('cardNumber');
    }

    get bind() {
        return this.addAttendanceCardForm.get('bind');
    }

    get selectedWorker() {
        return this.addAttendanceCardForm.get('selectedWorker');
    }
}
