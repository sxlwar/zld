import { WorkerContractListResponse } from './../../interfaces/response-interface';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ProjectService } from './../../services/business/project-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AttendanceCardService } from './../../services/business/attendance-card-service';
import { WorkerService } from './../../services/business/worker-service';
import { ViewController, NavParams } from 'ionic-angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { cardNumberValidator } from '../../validators/validators';

export interface Worker {
  name: string;
  userId: number;
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
      this.text = 'BIND_ATTENDANCE_CARD';
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
        this.addAttendanceCardForm.patchValue({ selectedWorker: { value: '', required: false } });
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
      .subscribe(value => this.worker.getWorkerContracts(this.getOption()));

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
  getWorkers() {
    this.workers = this.worker.getAllWorkerContracts()
      .map(res => res.map(item => ({ name: item.worker__employee__realname, userId: item.worker_id })))
      .combineLatest(this.card.getCards().map(cards => cards.filter(item => !!item.user_id).map(item => item.user_id)))
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
      .subscribe(response => infiniteScroll.complete());
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
    const  cardNumber  = this.navParams.get('cardNumber');

    const { userId, name } = this.boundWorker;

    this.card.updateAttendanceCard(Observable.of({ ic_card_num: cardNumber, user_id: userId, userName: name }));
  }

  /**
   * @method addCard
   * @description Execute addition action.
   */
  addCard() {
    const { cardNumber, bind } = this.addAttendanceCardForm.value;

    const option = bind ? { cardNumber, userId: this.boundWorker.userId, userName: this.boundWorker.name } : { cardNumber };

    this.card.addAttendanceCard(option);
  }

  dismiss() {
    this.viewCtrl.dismiss();
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
