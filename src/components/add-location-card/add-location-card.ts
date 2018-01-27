import { RequestOption } from './../../interfaces/request-interface';
import { ProjectService } from './../../services/business/project-service';
import { Subscription } from 'rxjs/Subscription';
import { cardNumberValidator } from '../../validators/validators';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationCardService } from './../../services/business/location-card-service';
import { WorkerService } from './../../services/business/worker-service';
import { NavParams, ViewController, InfiniteScroll } from 'ionic-angular';
import { Component } from '@angular/core';
import { LocationCardResponses } from '../../reducers/reducer/location-card-reducer';
import { AddLocationCardFormModel } from '../../services/api/mapper-service';

interface Worker {
    userId: number;
    name: string;
    teamName: string;
    workTypeId: number;
}

@Component({
    selector: 'add-location-card',
    templateUrl: 'add-location-card.html'
})
export class AddLocationCardComponent {

    subscriptions: Subscription[] = [];

    text = 'ADD_LOCATION_CARD';

    workers: Observable<Worker[]>;

    haveMoreData: Observable<boolean>;

    switchState: Subject<boolean> = new Subject();

    boundWorker: Worker;

    addLocationCardForm: FormGroup;

    isUpdate: boolean;

    checked: boolean;

    worker$$: Subscription;

    bind$: Subject<RequestOption> = new Subject();

    add$: Subject<AddLocationCardFormModel> = new Subject();

    constructor(
        private navParams: NavParams,
        private worker: WorkerService,
        private locationCard: LocationCardService,
        private viewCtrl: ViewController,
        private fb: FormBuilder,
        private project: ProjectService
    ) {
        worker.resetPage();

        locationCard.resetOperateResponse(LocationCardResponses.updateResponse);
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
            .map(res => res.map(item => ({ name: item.worker__employee__realname, userId: item.worker_id, workTypeId: item.worktype_id, teamName: item.team__name })))
            .combineLatest(
            this.locationCard.getLocationCards().map(cards => cards.filter(item => !!item.user_id).map(item => item.user_id)),
            (workers, boundIds) => workers.filter(item => boundIds.indexOf(item.userId) === -1)
            );

        this.haveMoreData = this.worker.getHaveMoreData();
    }

    launch(): void {
        this.subscriptions = [
            this.clearSelectedWorkWhenSwitchClose(),

            this.worker.getWorkerContracts(this.switchState
                .filter(isOpen => isOpen)
                .take(1).mergeMapTo(this.getOption())),

            this.locationCard.getAddLocationCardResponse()
                .merge(this.locationCard.getUpdateLocationCardResponse())
                .filter(res => !res.errorMessage)
                .subscribe(_ => this.dismiss()),

            this.locationCard.addLocationCard(this.add$),

            this.locationCard.updateLocationCard(this.bind$), // This error handled in location-card.ts

            this.worker.handleError(),

            this.locationCard.handleAddError(),
        ];
    }

    checkNavParams(): void {
        const cardNumber = this.navParams.get('cardNumber');

        this.isUpdate = !!cardNumber;

        if (this.isUpdate) {
            this.text = 'BIND_LOCATION_CARD';
            this.checked = true;
            this.switchState.next(true);
        } else {
            // nothing to do 
        }

        this.createForm(cardNumber);
    }

    clearSelectedWorkWhenSwitchClose(): Subscription {
        return this.switchState.filter(value => !value)
            .subscribe(_ => {
                this.boundWorker = null;

                this.addLocationCardForm.patchValue({ selectedWorker: { value: '', required: false } });
            });
    }

    createForm(number = ''): void {
        this.addLocationCardForm = this.fb.group({
            cardNumber: [{ value: number, disabled: this.isUpdate }, cardNumberValidator],
            bind: { value: this.checked, disabled: this.isUpdate },
            selectedWorker: ''
        });
    }

    getNextPage(infiniteScroll: InfiniteScroll): void {
        this.worker$$ && this.worker$$.unsubscribe();

        this.worker$$ = this.worker.getNextPage(infiniteScroll);
    }

    getOption(): Observable<RequestOption> {
        return this.worker.getCompleteStatusOption()
            .zip(
            this.worker.getUnexpiredOption(),
            this.project.getProjectId().map(project_id => ({ project_id })),
            this.worker.getNoLocationCardWorker(),
            (option1, option2, option3, option4) => ({ ...option1, ...option2, ...option3, ...option4 })
            );
    }

    execution(): void {
        if (this.isUpdate) {
            this.bindCard();
        } else {
            this.addCard();
        }
    }

    bindCard(): void {
        const cardNumber = this.navParams.get('cardNumber');

        const id = this.navParams.get('id');

        const { userId, name } = this.boundWorker;

        this.bind$.next({ dev_id: cardNumber, user_id: userId, location_card_id: id, userName: name });
    }

    addCard(): void {
        const { cardNumber, bind } = this.addLocationCardForm.value;

        this.add$.next(
            bind ? { cardNumber, userId: this.boundWorker.userId, userName: this.boundWorker.name }
                : { cardNumber }
        );
    }

    dismiss(): void {
        this.viewCtrl.dismiss();
    }

    ngOnDestroy() {
        this.locationCard.resetOperateResponse(LocationCardResponses.addResponse);

        this.subscriptions.forEach(item => item.unsubscribe());

        this.worker$$ && this.worker$$.unsubscribe();
    }

    /* ===============================================Shortcut methods for templates==================================================== */

    get cardNumber() {
        return this.addLocationCardForm.get('cardNumber');
    }

    get bind() {
        return this.addLocationCardForm.get('bind');
    }

    get selectedWorker() {
        return this.addLocationCardForm.get('selectedWorker');
    }

}
