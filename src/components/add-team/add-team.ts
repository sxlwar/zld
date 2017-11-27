import { Subscription } from 'rxjs/Subscription';
import { TeamService } from './../../services/business/team-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { Employer } from './../../interfaces/response-interface';
import { ProjectService } from './../../services/business/project-service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../../services/business/employer-service';
import { TL, QW } from '../../services/config/character';
import { teamNameValidator } from '../../validators/validators';

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

  projectName: Observable<string>;

  foremen: Observable<Person[]>

  qualityClerks: Observable<Person[]>;

  addTeamForm: FormGroup;

  addTeam$$: Subscription;

  constructor(
    public project: ProjectService,
    public employer: EmployerService,
    public viewCtrl: ViewController,
    public fb: FormBuilder,
    public team: TeamService
  ) {
    employer.getCompanyUserList();
  }

  ngOnInit() {
    this.createForm();

    this.projectName = this.project.getProjectName();

    this.foremen = this.getSpecificCharacters(this.employer.getSpecificRoles(TL));

    this.qualityClerks = this.getSpecificCharacters(this.employer.getSpecificRoles(QW));
  }

  createForm() {
    this.addTeamForm = this.fb.group({
      teamName: ['', teamNameValidator],
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

  addTeam() {
    this.team.addTeam(this.addTeamForm.value);

    this.addTeam$$ = this.team.getAddTeamResponse()
      .skip(1)
      .subscribe(_ => this.dismiss());
  }

  dismiss() {
    this.addTeam$$ && this.addTeam$$.unsubscribe();
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
