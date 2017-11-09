import {Injectable} from '@angular/core';
import {AppState, selectTeamResponse} from '../../reducers/index-reducer';
import {Store} from '@ngrx/store';
import {ErrorService} from '../errors/error-service';
import {ProcessorService} from '../api/processor-service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Team} from '../../interfaces/response-interface';
import {UserService} from './user-service';
import {TeamListOptions} from '../../interfaces/request-interface';
import {WorkerService} from './worker-service';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/observable/of';
import {SW, QW, TL, CW} from '../config/character';


@Injectable()
export class TeamService {

  subscriptions: Subscription[] = [];

  characterHasTeam = [TL, CW, QW, SW];

  constructor(public store: Store<AppState>,
              public error: ErrorService,
              public process: ProcessorService,
              public userInfo: UserService,
              public workerService: WorkerService) {
    this.handleError();
  }

  getTeams(): Observable<Team[]> {
    return this.store.select(selectTeamResponse).map(res => res.teams);
  }

  getTeamList(option: Observable<TeamListOptions> = Observable.empty()): void {
    const option$ = this.userInfo.getSid()
      .map(sid => ({sid}))
      .combineLatest(option.defaultIfEmpty({}), (sid, option) => Object.assign(sid, option));

    const teamList$$ = this.process.teamListProcessor(option$);

    this.subscriptions.push(teamList$$);
  }

  getOwnTeam(): Observable<Team> {
    const character$ = this.userInfo.getUserCharater()
      .map(char => this.characterHasTeam.indexOf(char) !== -1);

    const teamId$ = this.workerService.getOwnContract()
      .filter(value => !!value)
      .map(contract => contract.team_id);

    const team$ = this.getTeams()
      .zip(teamId$, (teams, id) => teams.find(team => team.id === id))
      .mergeMap(team => {
        if (!!team) return Observable.of(team);

        this.getTeamList();

        return this.getTeams().mergeMap(teams => {
          if(!teams) return Observable.empty();
          return Observable.from(teams).first();
        });
      });

    return character$.mergeMap(isTeamCharacter => {
      if(isTeamCharacter) return team$;
      return Observable.of(null);
    })
  }

  private handleError() {
    const error$ = this.store.select(selectTeamResponse);

    const subscription = this.error.handleErrorInSpecific(error$, 'API_ERROR');

    this.subscriptions.push(subscription);
  }

  unSubscribe() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
