//region
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Project} from '../../interfaces/response-interface';
import {
  AppState,
  selectErrorMessage,
  selectProjects,
  selectSelectedProject,
} from '../../reducers/index-reducer';
import {Store} from '@ngrx/store';
import {ProcessorService} from '../api/processor-service';
import {ErrorService} from '../errors/error-service';
import {Subscription} from 'rxjs/Subscription';
import {TimeService} from '../utils/time-service';
import {SelectProjectAction} from '../../actions/project-action';
//endregion

@Injectable()
export class ProjectService {

  subscriptions: Subscription[] = [];

  constructor(public store: Store<AppState>,
              public processor: ProcessorService,
              public error: ErrorService,
              public timeService: TimeService) {
    this.handleError();
  }

  /*====================================The main methods provided by the service===================================*/

  //FIXME No.2 在请求回来之前再次查询当前工程时仍然会发出请求，可以增加一个请求状态，在发请求前查看当前没有没进行的请求，想到好办法再解决。
  getCurrentProject(): Observable<Project> {
    return this.store.select(selectSelectedProject)
      .do(value => !value && this.getProjectList())
      .filter(value => !!value);
  }

  getProjectList() {
    const subscription = this.processor.projectListProcessor();

    this.subscriptions.push(subscription);
  }

  getUserAllProject(): Observable<Project[]> {
    return this.store.select(selectProjects)
  }

  getProjectName(): Observable<string> {
    return this.getCurrentProject()
      .map(project => project.name);
  }

  getProjectAddress(): Observable<string> {
    return this.getCurrentProject()
      .map(project => project.address__province + project.address__city + project.address__dist + project.address__detail);
  }

  getProjectExpiringDate(): Observable<number> {
    return this.getCurrentProject()
      .map(project => this.cutDownDays(project.prime_contract__plan_finish_day));
  }

  getProjectId(): Observable<number> {
    return this.getCurrentProject()
      .map(project => project.id);
  }

  switchProject(id: number) {
    this.store.dispatch(new SelectProjectAction(id));
  }

  /*================================================error handle===============================================*/

  private handleError() {
    const error$ = this.store.select(selectErrorMessage)
      .filter(msg => !!msg).map(errorMessage => ({errorMessage}));

    const projectError$$ = this.error.handleErrorInSpecific(error$, 'API_ERROR');

    this.subscriptions.push(projectError$$);
  }

  /*============================================service private methods==========================================*/

  private cutDownDays(date: string): number {
    if (!date) return NaN;
    const end = new Date(date);
    const now = new Date();
    return this.timeService.countDownDays(now, end);
  }

  /*============================================refuse clean====================================================*/

  unSubscribe() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
