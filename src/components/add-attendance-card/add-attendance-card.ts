import { WorkerContractListResponse } from './../../interfaces/response-interface';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ProjectService } from './../../services/business/project-service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AttendanceCardService } from './../../services/business/attendance-card-service';
import { WorkerService } from './../../services/business/worker-service';
import { ViewController } from 'ionic-angular';
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

  addAttendanceCardForm: FormGroup;

  checked = false;

  workers: Observable<Worker[]>;

  haveMoreData: Observable<boolean>;

  boundWorker: Worker;

  worker$$: Subscription;

  subscriptions: Subscription[] = [];

  switchState = new Subject();

  response: Observable<WorkerContractListResponse>;

  constructor(
    public viewCtrl: ViewController,
    public worker: WorkerService,
    public fb: FormBuilder,
    public card: AttendanceCardService,
    public project: ProjectService
  ) {
    this.createForm();
    this.worker.resetPage();
  }

  ngOnInit() {
    this.getWorkers();

    this.response = this.worker.getWorkerContractResponse();

    this.haveMoreData = this.response.map(response => !!response.worker_contract.length).takeWhile(res => !res);

    this.haveMoreData.subscribe(v => console.log(v));

    const subscription = this.switchState.filter(value => !value)
      .subscribe(_ => this.boundWorker = null);

    this.subscriptions.push(subscription);

    this.getWorkerContractList();
  }

  /**
   * @description In the two case, you need to get the data. 
   * First, when user first opens the switch, the second is when the user drop-down to get the rest of the data.
   */
  getWorkerContractList() {
    const page = this.worker.getCurrentPage();

    const initialOpenSwitch = this.switchState.combineLatest(page)
      .filter((state, page) => state && page === 1);

    const getRestData = page.skip(1)
      .distinctUntilChanged()
      .combineLatest(this.worker.getLimit(), this.response.map(item => item.count))
      .filter(([page, limit, count]) => Math.ceil(count / limit) + 1 >= page);

    const subscription = initialOpenSwitch.merge(getRestData)
      .subscribe(_ => this.worker.getWorkerContracts(this.getOption()));

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());

    this.worker$$ && this.worker$$.unsubscribe();
  }

  createForm() {
    this.addAttendanceCardForm = this.fb.group({
      cardNumber: ['', cardNumberValidator],
      bind: this.checked,
      selectedWorker: ''
    });
  }

  getWorkers() {
    this.workers = this.worker.getAllWorkerContracts()
      .map(res => res.map(item => ({ name: item.worker__employee__realname, userId: item.worker_id })))
      .combineLatest(this.card.getCards().map(cards => cards.filter(item => !!item.user_id).map(item => item.user_id)))
      .map(([workers, boundIds]) => workers.filter(item => boundIds.indexOf(item.userId) === -1));
  }

  getNextPage(infiniteScroll) {
    this.worker.incrementPage();

    this.worker$$ && this.worker$$.unsubscribe();

    this.worker$$ = this.worker.getWorkerContractResponse()
      .subscribe(response => infiniteScroll.complete())
  }

  getOption() {
    return this.worker.getCompleteStatusOption()
      .zip(
      this.worker.getUnexpiredOption(),
      this.project.getProjectId().map(project_id => ({ project_id })),
      (option1, option2, option3) => ({ ...option1, ...option2, ...option3 })
      );
  }

  addCard() {
    const { cardNumber, bind } = this.addAttendanceCardForm.value;

    const option = bind ? { cardNumber, userId: this.boundWorker.userId, userName: this.boundWorker.name } : { cardNumber };

    this.card.addAttendanceCard(option);

    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

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
