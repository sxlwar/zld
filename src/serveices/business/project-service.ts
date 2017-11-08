import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Project} from '../../interfaces/response-interface';
import {
  AppState, getProject, selectCurrentProjects,
  selectSelectedProject,
} from '../../reducers/index-reducer';
import {Store} from '@ngrx/store';
import {ProcessorService} from '../api/processor-service';
import {ErrorService} from '../errors/error-service';
import {Subscription} from 'rxjs/Subscription';
import {TimeService} from '../utils/time-service';
import {SelectProjectAction} from '../../actions/project-action';

@Injectable()
export class ProjectService {
  subscriptions: Subscription[] = [];

  constructor(public store: Store<AppState>,
              public processor: ProcessorService,
              public error: ErrorService,
              public timeService: TimeService) {
  }

  getCurrentProject(): Observable<Project> {
    return this.store.select(selectSelectedProject).filter(value => !!value);
  }

  getProjectList() {
    const subscription = this.processor.projectListProcessor();

    this.subscriptions.push(subscription);
  }

  getUserAllProject(): Observable<Project[]> {
    const projects$ =  this.store.select(getProject);

    const projectError$$ = this.error.handleErrorInSpecific(projects$, 'API_ERROR');

    this.subscriptions.push(projectError$$);

    return projects$.map(data => data.projects);
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
    return this.getCurrentProject().map(project => project.id);
  }

  switchProject(id: number) {
    this.store.dispatch(new SelectProjectAction(id));
  }

  cutDownDays(date: string): number {
    if (!date) return NaN;
    const end = new Date(date);
    const now = new Date();
    return this.timeService.countDownDays(now, end);
  }

  unSubscribe() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
