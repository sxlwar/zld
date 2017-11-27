//region
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../interfaces/response-interface';
import {
  AppState,
  selectErrorMessage,
  selectProjects,
  selectSelectedProject,
} from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { ProcessorService } from '../api/processor-service';
import { ErrorService } from '../errors/error-service';
import { Subscription } from 'rxjs/Subscription';
import { TimeService } from '../utils/time-service';
import { SelectProjectAction } from '../../actions/action/project-action';
//endregion

@Injectable()
export class ProjectService {
  subscriptions: Subscription[] = [];
  project$$: Subscription;

  constructor(
    public store: Store<AppState>,
    public processor: ProcessorService,
    public error: ErrorService,
    public timeService: TimeService
  ) {
    this.handleError();
  }

  /*====================================The main methods provided by the service===================================*/

  getCurrentProject(): Observable<Project> {
    const currentProject = this.store.select(selectSelectedProject);

    const subscription = currentProject.subscribe(value => !value && this.getProjectList());

    this.subscriptions.push(subscription);

    return currentProject.filter(value => !!value);
  }

  getProjectList() {
    const subscription = this.processor.projectListProcessor();

    this.subscriptions.push(subscription);
  }

  getUserAllProject(): Observable<Project[]> {
    return this.store.select(selectProjects);
  }

  getProjectName(): Observable<string> {
    return this.store.select(selectSelectedProject)
      .do(project => !project && this.getProjectList())
      .filter(value => !!value)
      .map(project => project.name);
  }

  getProjectAddress(project: Project): string {
    return project.address__province + project.address__city + project.address__dist + project.address__detail;
  }

  getProjectExpiringDate(project: Project): number {
    return this.cutDownDays(project.prime_contract__plan_finish_day);
  }


  getProjectId(): Observable<number> {
    return this.getCurrentProject().map(project => project.id);
  }

  switchProject(id: number) {
    this.store.dispatch(new SelectProjectAction(id));
  }

  getProjectPrimeCompanyId() {
    return this.getCurrentProject().map(project => project.prime_contract__first_contracting_id);
  }

  /*================================================error handle===============================================*/

  private handleError() {
    const error$ = this.store.select(selectErrorMessage)
      .filter(msg => !!msg).map(errorMessage => ({ errorMessage }));

    this.project$$ = this.error.handleErrorInSpecific(error$, 'API_ERROR');
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
