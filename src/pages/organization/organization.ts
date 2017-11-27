import { PermissionService } from './../../services/config/permission-service';
import { ProjectRoot } from './../pages';
import { organization } from './../../services/business/icon-service';
import { ProjectService } from './../../services/business/project-service';
import { Observable } from 'rxjs/Observable';
import { TeamService } from './../../services/business/team-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EmployerService } from '../../services/business/employer-service';
import { AddTeamComponent } from '../../components/add-team/add-team';

interface ProjectSimple {
  id: number;
  projectManager: string;
  labourManager: string;
}

interface TeamItem {
  name: string;
  id: number;
  qualityClerk: string;
  foreman: string;
}

@IonicPage()
@Component({
  selector: 'page-organization',
  templateUrl: 'organization.html',
})
export class OrganizationPage {
  canOperate: Observable<boolean>;

  teams: Observable<TeamItem[]>;

  project: Observable<ProjectSimple>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public team: TeamService,
    public employer: EmployerService,
    public projectService: ProjectService,
    public permission: PermissionService,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {

    this.canOperate = this.permission.getOperatePermission(organization.icon, ProjectRoot);

    this.teams = this.team.getOwnTeams()
      .mergeMap(teams => Observable.from(teams)
        .map(team => ({ name: team.name, id: team.id, qualityClerk: team.quality_manage__employee__realname, foreman: team.leader__employee__realname }))
        .reduce((acc, cur) => {
          acc.push(cur);
          return acc;
        }, [])
      )

    this.project = this.projectService.getCurrentProject()
      .map(project => ({id: project.id, projectManager: project.manager__employee__realname, labourManager: project.sub_contract__labour_manager__employee__realname}))
  }

  addTeam(): void {
    const addTeamModal = this.modalCtrl.create(AddTeamComponent);
    addTeamModal.present();
  }

}
