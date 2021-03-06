import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SetSelectTeamsAction } from '../../actions/action/team-action';
import { RequestOption } from '../../interfaces/request-interface';
import { Team } from '../../interfaces/response-interface';
import { AppState, selectSelectedTeams, selectTeamResponse } from '../../reducers/index-reducer';
import { ProcessorService } from '../api/processor-service';
import { CW, QW, SW, TL } from '../config/character';
import { ErrorService } from '../errors/error-service';
import { UpdateTeamAtLocalAction } from './../../actions/action/team-action';
import { TeamAddResponse, TeamDeleteResponse, TeamUpdateResponse } from './../../interfaces/response-interface';
import { selectAddTeamResponse, selectDeleteTeamResponse, selectUpdateTeamResponse } from './../../reducers/index-reducer';
import { AddTeamFormModel } from './../api/mapper-service';
import { EmployerService } from './employer-service';
import { ProjectService } from './project-service';
import { UserService } from './user-service';
import { WorkerService } from './worker-service';

@Injectable()
export class TeamService {

    characterHasTeam = [TL, CW, QW, SW];

    constructor(
        private store: Store<AppState>,
        private error: ErrorService,
        private process: ProcessorService,
        private userInfo: UserService,
        private project: ProjectService,
        private workerService: WorkerService,
        private employer: EmployerService
    ) {
    }

    /* ============================================================API request=============================================================== */

    getTeamList(option: Observable<RequestOption> = Observable.empty()): Subscription {
        return this.process.teamListProcessor(
            option.defaultIfEmpty({})
                .combineLatest(
                this.userInfo.getSid(),
                (option, sid) => ({ sid, ...option })
                )
        );
    }

    addTeam(form: Observable<AddTeamFormModel>): Subscription {
        return this.process.teamAddProcessor(
            form.map(form => this.process.addTeamForm(form))
                .withLatestFrom(
                this.userInfo.getSid(),
                this.project.getProjectId(),
                (option, sid, project_id) => ({ ...option, sid, project_id })
                )
        );
    }

    deleteTeam(teamId: Observable<number>): Subscription {
        return this.process.teamDeleteProcessor(
            teamId.withLatestFrom(
                this.userInfo.getSid(),
                (team_id, sid) => ({ team_id, sid })
            )
        );
    }

    updateTeam(form: Observable<AddTeamFormModel>, id: number): Subscription {
        return this.process.teamUpdateProcessor(
            form.map(form => this.process.updateTeamForm(form, id))
                .withLatestFrom(
                this.userInfo.getSid(),
                this.project.getProjectId(),
                (option, sid, project_id) => ({ ...option, sid, project_id })
                )
        );
    }

    updateTeamListAtLocal(notify: Observable<boolean>): Subscription {
        return notify.mergeMapTo(this.employer.getCompanyUsers())
            .subscribe(users => this.store.dispatch(new UpdateTeamAtLocalAction(users)));
    }

    /* ============================================================Data acquisition============================================================ */

    getTeams(): Observable<Team[]> {
        return this.store.select(selectTeamResponse).map(res => res.teams);
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
                if (!!team) {
                    return Observable.of(team);
                } else {
                    const subscription = this.getTeamList(this.project.getCurrentProject().map(project => ({ project_id: project.id })));

                    return this.getTeams()
                        .do(_ => subscription.unsubscribe())
                        .filter(value => !!value.length)
                        .mergeMap(teams => !teams.length ? Observable.of(null) : Observable.from(teams).first());
                }
            });

        return character$.mergeMap(isTeamCharacter => isTeamCharacter ? team$ : Observable.of(null));
    }

    getOwnTeams(): Observable<Team[]> {
        return this.getTeams().mergeMap(teams => {
            if (teams.length) {
                return Observable.of(teams);
            } else {
                const subscription = this.getTeamList(this.project.getCurrentProject().map(project => ({ project_id: project.id })));

                return this.getTeams()
                    .do(_ => subscription.unsubscribe())
                    .filter(value => !!value.length);
            }
        });
    }

    getSelectedTeams(): Observable<number[]> {
        return this.store.select(selectSelectedTeams)
    }

    getAddTeamResponse(): Observable<TeamAddResponse> {
        return this.store.select(selectAddTeamResponse);
    }

    getDeleteTeamResponse(): Observable<TeamDeleteResponse> {
        return this.store.select(selectDeleteTeamResponse);
    }

    getUpdateTeamResponse(): Observable<TeamUpdateResponse> {
        return this.store.select(selectUpdateTeamResponse);
    }

    getTeamStateOptions(): Observable<{ id: number; name: string }[]> {
        return this.getTeams().map(teams => teams.map(({ id, name }) => ({ id, name })));
    }

    getOwnTeamsContainsSelectedProp(): Observable<Team[]> {
        return this.getOwnTeams()
            .withLatestFrom(
            this.getSelectedTeams(),
            (teams, ids) => teams.map(team => ({ ...team, selected: ids.indexOf(team.id) !== -1 }))
            );
    }

    /* ======================================================Local state change============================================================= */

    setSelectTeams(ids: Observable<number[]>): Subscription {
        return ids.subscribe(ids => this.store.dispatch(new SetSelectTeamsAction(ids)));
    }

    /* ======================================================Error handle============================================================= */

    handleError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectTeamResponse));
    }

    handleAddTeamError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectAddTeamResponse));
    }

    handelDeleteTeamError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectDeleteTeamResponse));
    }

    handleUpdateTeamError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectUpdateTeamResponse));
    }
}
