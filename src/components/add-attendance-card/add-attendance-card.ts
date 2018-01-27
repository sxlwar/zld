import { RequestOption } from '../../interfaces/request-interface';
import { AddAttendanceCardFormModel } from './../../services/api/mapper-service';
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
import { AttendanceCardResponses } from '../../reducers/reducer/attendance-card-reducer';

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

    switchState: Subject<boolean> = new Subject();

    isUpdate: boolean;

    add$: Subject<AddAttendanceCardFormModel> = new Subject();

    bind$: Subject<RequestOption> = new Subject();

    constructor(
        private viewCtrl: ViewController,
        private worker: WorkerService,
        private fb: FormBuilder,
        private card: AttendanceCardService,
        private project: ProjectService,
        private navParams: NavParams
    ) {
        worker.resetPage();

        card.resetAttendanceCardOperateResponse(AttendanceCardResponses.updateResponse);
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
        this.workers = this.worker.getAllWorkerContracts()
            .map(res => res.map(item => ({ name: item.worker__employee__realname, userId: item.worker_id, teamName: item.team__name, workTypeId: item.worktype_id })))
            .combineLatest(
            this.card.getCards().map(cards => cards.filter(item => !!item.user_id).map(item => item.user_id)),
            (workers, boundIds) => workers.filter(item => boundIds.indexOf(item.userId) === -1)
            );

        this.haveMoreData = this.worker.getHaveMoreData();
    }

    launch(): void {
        this.subscriptions = [
            this.clearSelectedWorkWhenSwitchClose(),

            this.worker.getWorkerContracts(this.switchState.filter(isOpen => isOpen).take(1).mergeMapTo(this.getOption())),

            this.card.addAttendanceCard(this.add$),

            this.card.updateAttendanceCard(this.bind$),

            this.card.getAddAttendanceCardResponse().merge(this.card.getUpdateAttendanceCardResponse()).filter(res => !res.errorMessage).subscribe(_ => this.dismiss()),

            this.worker.handleError(),

            this.card.handleAddError(),

            // this.card.handleUpdateError(), This error have been handled in attendance-cart.ts;
        ];
    }

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

    clearSelectedWorkWhenSwitchClose(): Subscription {
        return this.switchState.filter(value => !value)
            .subscribe(_ => {
                this.boundWorker = null;

                this.addAttendanceCardForm.patchValue({ selectedWorker: { value: '', required: false } });
            });
    }

    createForm(number = '') {
        this.addAttendanceCardForm = this.fb.group({
            cardNumber: [{ value: number, disabled: this.isUpdate }, cardNumberValidator],
            bind: { value: this.checked, disabled: this.isUpdate },
            selectedWorker: ''
        });
    }

    getNextPage(infiniteScroll: InfiniteScroll) {
        this.worker$$ && this.worker$$.unsubscribe();

        this.worker$$ = this.worker.getNextPage(infiniteScroll);
    }

    getOption() {
        return this.worker.getCompleteStatusOption()
            .zip(
            this.worker.getUnexpiredOption(),
            this.project.getProjectId().map(project_id => ({ project_id })),
            (option1, option2, option3) => ({ ...option1, ...option2, ...option3 })
            );
    }

    execution() {
        if (this.isUpdate) {
            this.bindCard();
        } else {
            this.addCard();
        }
    }

    bindCard() {
        const cardNumber = this.navParams.get('cardNumber');

        const { userId, name } = this.boundWorker;

        this.bind$.next({ ic_card_num: cardNumber, user_id: userId, userName: name });
    }

    addCard() {
        const { cardNumber, bind } = this.addAttendanceCardForm.value;

        const option = bind ? { cardNumber, userId: this.boundWorker.userId, userName: this.boundWorker.name } : { cardNumber };

        this.add$.next(option);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    ngOnDestroy() {
        this.card.resetAttendanceCardOperateResponse(AttendanceCardResponses.addResponse);

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
