//region
import { Injectable } from '@angular/core';
import { AppState, selectTeamResponse, selectSelectedTeams } from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { ErrorService } from '../errors/error-service';
import { ProcessorService } from '../api/processor-service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Team } from '../../interfaces/response-interface';
import { UserService } from './user-service';
import { RequestOption } from '../../interfaces/request-interface';
import { WorkerService } from './worker-service';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/observable/of';
import { CW, QW, SW, TL } from '../config/character';
import { ProjectService } from './project-service';
import { SetSelectTeams } from '../../actions/action/team-action';
//endregion


@Injectable()
export class TeamService {

  subscriptions: Subscription[] = [];
  team$$: Subscription;

  characterHasTeam = [TL, CW, QW, SW];

  constructor(public store: Store<AppState>,
    public error: ErrorService,
    public process: ProcessorService,
    public userInfo: UserService,
    public project: ProjectService,
    public workerService: WorkerService) {
    this.handleError();
  }

  getTeams(): Observable<Team[]> {
    return this.store.select(selectTeamResponse).map(res => res.teams);
  }

  getTeamList(option: Observable<RequestOption> = Observable.empty()): void {
    const option$ = this.userInfo.getSid()
      .map(sid => ({ sid }))
      .combineLatest(option.defaultIfEmpty({}), (sid, option) => Object.assign(sid, option));

    const teamList$$ = this.process.teamListProcessor(option$);

    this.subscriptions.push(teamList$$);
  }

  getOwnTeam(): Observable<Team> {
    const character$ = this.userInfo.getUserCharacter()
      .map(char => this.characterHasTeam.indexOf(char) !== -1);

    const teamId$ = this.workerService.getOwnContract()
      .filter(value => !!value)
      .map(contract => contract.team_id);

    const team$ = this.getTeams()
      .zip(teamId$, (teams, id) => teams.find(team => team.id === id))
      .mergeMap(team => {
        if (!!team) return Observable.of(team);

        const option = this.project.getCurrentProject().map(project => ({ project_id: project.id }));

        this.getTeamList(option);

        return this.getTeams().mergeMap(teams => {
          if (!teams) return Observable.empty();
          return Observable.from(teams).first();
        });
      });

    return character$.mergeMap(isTeamCharacter => {
      if (isTeamCharacter) return team$;
      return Observable.of(null);
    })
  }

  getOwnTeams(): Observable<Team[]> {
    return this.getTeams().mergeMap(teams => {
      if (teams.length) return Observable.of(teams);

      const option = this.project.getCurrentProject().map(project => ({ project_id: project.id }));

      this.getTeamList(option);

      return this.getTeams();
    })
  }

  getSelectedTeams(): Observable<number[]> {
    return this.store.select(selectSelectedTeams)
  }

  setSelectTeams(ids: Observable<number>): void {
    ids.reduce((acc, cur) => {
      acc.push(cur);
      return acc;
    }, [])
    .subscribe(ids => this.store.dispatch(new SetSelectTeams(ids)));
  }

  private handleError() {
    const error$ = this.store.select(selectTeamResponse);

    this.team$$ = this.error.handleErrorInSpecific(error$, 'API_ERROR');
  }

  unSubscribe() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
