//region
import { Injectable } from '@angular/core';
import { AppState, selectAttendanceList, selectAttendanceResponse, selectAttendanceDatePeriod } from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { ProcessorService } from '../api/processor-service';
import { ErrorService } from '../errors/error-service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AttendanceResult } from '../../interfaces/response-interface';
import { AttendanceResultListOptions, RequestOption } from '../../interfaces/request-interface';
import 'rxjs/add/observable/empty'
import { DatePeriod } from '../../reducers/reducer/attendance-reducer';
import { SetAttendanceStartDate, SetAttendanceEndDate } from '../../actions/action/attendance-actions';
//endregion

@Injectable()
export class AttendanceService {
  subscriptions: Subscription[] = [];

  constructor(public store: Store<AppState>,
    public processor: ProcessorService,
    public error: ErrorService) {
    this.handleError();
  }

  getAttendanceResultList(option: Observable<RequestOption>): Observable<AttendanceResult[]> {
    return this.store.select(selectAttendanceList);
  }

  getAttendanceResult(option: Observable<AttendanceResultListOptions> = Observable.empty()): void {

  }

  getSelectedDate(): Observable<DatePeriod> {
    return this.store.select(selectAttendanceDatePeriod);
  }

  setDate(type: string, data: string): void {
    if (type === 'start') {
      this.store.dispatch(new SetAttendanceStartDate(data));
    }
    this.store.dispatch(new SetAttendanceEndDate(data));
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
