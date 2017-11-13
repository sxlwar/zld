//region
import { Injectable } from '@angular/core';
import {
  AppState,
  selectAttendanceDatePeriod,
  selectAttendanceLimit,
  selectAttendanceList,
  selectAttendancePage,
  selectAttendanceResponse,
  selectAttendanceAllSelected
} from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { ProcessorService } from '../api/processor-service';
import { ErrorService } from '../errors/error-service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AttendanceResult } from '../../interfaces/response-interface';
import { RequestOption } from '../../interfaces/request-interface';
import 'rxjs/add/observable/empty'
import { DatePeriod } from '../../reducers/reducer/attendance-reducer';
import { SetAttendanceEndDateAction, SetAttendanceStartDateAction, AddSelectedAttendanceAction, RemoveSelectedAttendanceAction, ToggleAllSelectedAction } from '../../actions/action/attendance-actions';
import { UserService } from '../../serveices/business/user-service';

//endregion

@Injectable()
export class AttendanceService {
  subscriptions: Subscription[] = [];

  constructor(public store: Store<AppState>,
    public processor: ProcessorService,
    public userInfo: UserService,
    public error: ErrorService
  ) {
    this.handleError();
  }

  getAttendanceResultList(option: Observable<RequestOption>): Observable<AttendanceResult[]> {
    this.getAttendances(option);

    return this.store.select(selectAttendanceList);
  }

  getAttendances(option: Observable<RequestOption> = Observable.empty()): void {
    const sid = this.userInfo.getSid();

    const page = this.store.select(selectAttendancePage);

    const limit = this.store.select(selectAttendanceLimit);

    const params = sid.zip(
      page,
      limit,
      option,
      (sid, limit, page, option) => ({ sid, page, limit, ...option })
    );

    const subscription = this.processor.attendanceListProcessor(params);

    this.subscriptions.push(subscription);
  }

  getSelectedDate(): Observable<DatePeriod> {
    return this.store.select(selectAttendanceDatePeriod);
  }

  setDate(type: string, data: string): void {
    if (type === 'start') {
      this.store.dispatch(new SetAttendanceStartDateAction(data));
    }
    this.store.dispatch(new SetAttendanceEndDateAction(data));
  }

  toggleSelected(att:AttendanceResult) {
    if(att.selected){
      this.store.dispatch(new AddSelectedAttendanceAction(att.id));
    }else {
      this.store.dispatch(new RemoveSelectedAttendanceAction(att.id));
    }
  }

  getAllSelected(): Observable<boolean> {
    return this.store.select(selectAttendanceAllSelected);
  }

  toggleAllSelected(isSelected: boolean) {
    this.store.dispatch(new ToggleAllSelectedAction(isSelected));
  }

  handleError() {
    const error = this.store.select(selectAttendanceResponse);

    const subscription = this.error.handleErrorInSpecific(error, 'API_ERROR');

    this.subscriptions.push(subscription);
  }

  unSubscribe() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
