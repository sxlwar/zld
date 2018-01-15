//region
import { Subscription } from 'rxjs/Subscription';
import { TeamService } from './../../services/business/team-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewController, NavParams } from 'ionic-angular';
import { Employer } from './../../interfaces/response-interface';
import { ProjectService } from './../../services/business/project-service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../../services/business/employer-service';
import { TL, QW } from '../../services/config/character';
import { teamNameValidator } from '../../validators/validators';
//endregion

interface Person {
    name: string;
    id: number;
    selected?: boolean;
}

@Component({
    selector: 'add-team',
    templateUrl: 'add-team.html'
})
export class AddTeamComponent implements OnInit {
    operateType = 'ADD_TEAM';

    projectName: Observable<string>;

    foremen: Observable<Person[]>

    qualityClerks: Observable<Person[]>;

    addTeamForm: FormGroup;

    subscriptions: Subscription[] = [];

    isUpdate = false;

    constructor(
        public project: ProjectService,
        public employer: EmployerService,
        public viewCtrl: ViewController,
        public fb: FormBuilder,
        public team: TeamService,
        public navParams: NavParams
    ) {
        const subscription = employer.getCompanyUserList();

        this.subscriptions.push(subscription);
    }

    ngOnInit() {
        this.checkType();

        this.createForm();

        this.projectName = this.project.getProjectName();

        this.foremen = this.getSpecificCharacters(this.employer.getSpecificRoles(TL));

        this.qualityClerks = this.getSpecificCharacters(this.employer.getSpecificRoles(QW));
    }

    checkType() {
        if (this.navParams.get('update')) {
            this.isUpdate = true;
            this.operateType = 'UPDATE_TEAM';
        };
    }

    createForm() {
        const name = this.isUpdate ? this.navParams.get('team').name : '';

        this.addTeamForm = this.fb.group({
            teamName: [name, teamNameValidator],
            foreman: '',
            qualityClerk: ''
        });
    }

    getSpecificCharacters(source: Observable<Employer[]>): Observable<Person[]> {
        return source
            .mergeMap(list => Observable.from(list)
                .map(({ user_id, realname }) => ({ id: user_id, name: realname }))
                .reduce((acc, cur) => {
                    acc.push(cur);
                    return acc;
                }, []))
    }

    confirmOperate() {
        if (this.isUpdate) {
            this.updateTeam();
        } else {
            this.addTeam();
        }
    }

    updateTeam() {
        this.team.updateTeam(this.addTeamForm.value, this.navParams.get('team').id);

        const subscription = this.team.getUpdateTeamResponse()
            .skip(1)
            .subscribe(_ => {
                this.team.updateTeamListAtLocal();
                this.dismiss();
            });

        this.subscriptions.push(subscription);
    }

    addTeam() {
        this.team.addTeam(this.addTeamForm.value);

        const subscription = this.team.getAddTeamResponse()
            .skip(1)
            .subscribe(_ => this.dismiss());

        this.subscriptions.push(subscription);
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
}
