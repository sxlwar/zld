import { ProjectService } from './../../services/business/project-service';
import { Subscription } from 'rxjs/Subscription';
import { cardNumberValidator } from '../../validators/validators';
import { Subject } from 'rxjs/Subject';
import { WorkerContractListResponse } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationCardService } from './../../services/business/location-card-service';
import { WorkerService } from './../../services/business/worker-service';
import { NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

interface Worker {
  userId: number;
  name: string;
}

@Component({
  selector: 'add-location-card',
  templateUrl: 'add-location-card.html'
})
export class AddLocationCardComponent {

  subscriptions: Subscription[] = [];

  text = 'ADD_LOCATION_CARD';

  response: Observable<WorkerContractListResponse>;

  workers: Observable<Worker[]>;

  haveMoreData: Observable<boolean>;

  switchState = new Subject();

  boundWorker: Worker;

  addLocationCardForm: FormGroup;

  isUpdate: boolean;

  checked: boolean;

  worker$$: Subscription;

  constructor(
    public navParams: NavParams,
    public worker: WorkerService,
    public locationCard: LocationCardService,
    public viewCtrl: ViewController,
    public fb: FormBuilder,
    public project: ProjectService
  ) {
    worker.resetPage();
  }

  ngOnInit() {
    this.response = this.worker.getWorkerContractResponse();

    this.getWorkers();

    this.getHaveMoreData();

    this.clearSelectedWorkWhenSwitchClose();

    this.getWorkerContractList();

    //We need to put this step in the final stage, 
    //because we may need to notify the processing program to perform corresponding actions when checking parameters, 
    //so we must ensure that all the processors are initialized.
    this.checkNavParams();
  }

  /**
   * @method checkNavParams
   * @description Check whether the cardNumber param is  passed in, display binding function if passed in or addition function if not.
   */
  checkNavParams() {
    const cardNumber = this.navParams.get('cardNumber');

    this.isUpdate = !!cardNumber;

    if (this.isUpdate) {
      this.text = 'BIND_LOCATION_CARD';
      this.checked = true;
      this.switchState.next(true);
    }

    this.createForm(cardNumber);
  }

  /**
   * @method getHaveMoreData
   * @description Initialize haveMoreData field.
   */
  getHaveMoreData() {
    this.haveMoreData = this.response.map(response => !!response.worker_contract.length)
      .skip(1)
  }

  /**
   * @method clearSelectedWorkWhenSwitchClose
   * @description Reset boundWorker filed and selectedWorker filed when the switch closed;
   */
  clearSelectedWorkWhenSwitchClose() {
    const subscription = this.switchState.filter(value => !value)
      .subscribe(_ => {
        this.boundWorker = null;
        this.addLocationCardForm.patchValue({ selectedWorker: { value: '', required: false } });
      });

    this.subscriptions.push(subscription);
  }

  /**
   * @method getWorkerContractList
   * @description In the two case, you need to get the data. 
   * First, when user first opens the switch, the second is when the user drop-down to get the rest of the data.
   */
  getWorkerContractList() {
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

    const subscription = initialOpenSwitch
      .merge(getRestData)
      .subscribe(_ => this.worker.getWorkerContracts(this.getOption()));

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());

    this.worker$$ && this.worker$$.unsubscribe();
  }

  /**
   * @method createForm 
   * @param number 
   * @description Initialize form.
   */
  createForm(number = '') {
    this.addLocationCardForm = this.fb.group({
      cardNumber: [{ value: number, disabled: this.isUpdate }, cardNumberValidator],
      bind: { value: this.checked, disabled: this.isUpdate },
      selectedWorker: ''
    });
  }

  /**
   * @method getWorkers
   * @description Get works without binding card.
   */
  getWorkers() {
    this.workers = this.worker.getAllWorkerContracts()
      .map(res => res.map(item => ({ name: item.worker__employee__realname, userId: item.worker_id })))
      .combineLatest(this.locationCard.getLocationCards().map(cards => cards.filter(item => !!item.user_id).map(item => item.user_id)))
      .map(([workers, boundIds]) => workers.filter(item => boundIds.indexOf(item.userId) === -1));
  }

  /**
   * @method getNextPage 
   * @param infiniteScroll - Ionic scroll instance
   * @description Drop-down to get rest workers.
   */
  getNextPage(infiniteScroll) {
    this.worker.incrementPage();

    this.worker$$ && this.worker$$.unsubscribe();

    this.worker$$ = this.worker.getWorkerContractResponse()
      .subscribe(response => infiniteScroll.complete())
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
      this.worker.getNoLocationCardWorker(),
      (option1, option2, option3, option4) => ({ ...option1, ...option2, ...option3, ...option4 })
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

    const id = this.navParams.get('id');

    const { userId, name } = this.boundWorker;

    const subscription = this.locationCard.updateLocationCard(Observable.of({ dev_id: cardNumber, user_id: userId, location_card_id: id, userName: name }));

    this.subscriptions.push(subscription);
  }

  /**
   * @method addCard
   * @description Execute addition action.
   */
  addCard() {
    const { cardNumber, bind } = this.addLocationCardForm.value;

    const option = bind ? { dev_id: cardNumber, user_id: this.boundWorker.userId, userName: this.boundWorker.name } : { dev_id: cardNumber };

    const subscription = this.locationCard.addLocationCard(Observable.of(option));

    this.subscriptions.push(subscription);
  }

  dismiss() {
    this.viewCtrl.dismiss();
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
