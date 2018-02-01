import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { EmployerService } from '../../services/business/employer-service';
import { QW, TL } from '../../services/config/character';
import { putInArray } from '../../services/utils/util';
import { teamNameValidator } from '../../validators/validators';
import { Employer } from './../../interfaces/response-interface';
import { AddTeamFormModel } from './../../services/api/mapper-service';
import { ProjectService } from './../../services/business/project-service';
import { TeamService } from './../../services/business/team-service';

//region
//endregion

interface Person {
    name: string;
    id: number;
    selected?: boolean;
}

@Component({
    selector: 'add-team',
    templateUrl: 'add-team.html',
})
export class AddTeamComponent implements OnInit, OnDestroy {
    operateType = 'ADD_TEAM';

    projectName: Observable<string>;

    foremen: Observable<Person[]>

    qualityClerks: Observable<Person[]>;

    addTeamForm: FormGroup;

    subscriptions: Subscription[] = [];

    isUpdate = false;

    addTeam$: Subject<AddTeamFormModel> = new Subject();

    updateTeam$: Subject<AddTeamFormModel> = new Subject();

    constructor(
        private project: ProjectService,
        private employer: EmployerService,
        private viewCtrl: ViewController,
        private fb: FormBuilder,
        private team: TeamService,
        private navParams: NavParams
    ) {
        this.initialForm();
    }

    ngOnInit() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.projectName = this.project.getProjectName();

        this.foremen = this.getSpecificCharacters(this.employer.getSpecificRoles(TL));

        this.qualityClerks = this.getSpecificCharacters(this.employer.getSpecificRoles(QW));
    }

    launch(): void {
        const updateNotify = this.updateTeam$.zip(this.team.getUpdateTeamResponse().skip(1), (_1, _2) => true);

        const addNotify = this.addTeam$.zip(this.team.getAddTeamResponse().skip(1), (_1, _2) => true);

        this.subscriptions = [
            this.employer.getCompanyUserList(),

            this.team.addTeam(this.addTeam$),

            this.team.updateTeamListAtLocal(updateNotify),

            updateNotify.merge(addNotify).subscribe(_ => this.dismiss()),

            this.employer.handleError(),

            this.team.handleAddTeamError(),

            this.team.handleUpdateTeamError(),
        ];

        this.isUpdate && this.subscriptions.push(this.team.updateTeam(this.updateTeam$, this.navParams.get('team').id));
    }

    initialForm(): void {
        if (this.navParams.get('update')) {
            this.isUpdate = true;
            this.operateType = 'UPDATE_TEAM';
        };

        const name = this.isUpdate ? this.navParams.get('team').name : '';

        this.addTeamForm = this.fb.group({
            teamName: [name, teamNameValidator],
            foreman: '',
            qualityClerk: '',
        });
    }

    getSpecificCharacters(source: Observable<Employer[]>): Observable<Person[]> {
        return source
            .mergeMap(list => Observable.from(list)
                .map(({ user_id, realname }) => ({ id: user_id, name: realname }))
                .reduce(putInArray, [])
            );
    }

    confirmOperate() {
        if (this.isUpdate) {
            this.updateTeam$.next(this.addTeamForm.value);
        } else {
            this.addTeam$.next(this.addTeamForm.value);
        }
    }

    dismiss() {
        this.subscriptions.forEach(item => item.unsubscribe());

        this.viewCtrl.dismiss();
    }

    get teamName() {
        return this.addTeamForm.get('teamName');
    }

    get foreman() {
        return this.addTeamForm.get('foreman');
    }

    get qualityClerk() {
        return this.addTeamForm.get('qualityClerk');
    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
