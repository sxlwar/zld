//region
import { TipService, ConfirmProp } from './../../services/tip-service';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { PermissionService } from './../../services/config/permission-service';
import { ProjectRoot, teamMembersPage, personalPage } from './../pages';
import { organization } from './../../services/business/icon-service';
import { ProjectService } from './../../services/business/project-service';
import { Observable } from 'rxjs/Observable';
import { TeamService } from './../../services/business/team-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { EmployerService } from '../../services/business/employer-service';
import { AddTeamComponent } from '../../components/add-team/add-team';
import { putInArray } from '../../services/utils/util';
//endregion

export interface ProjectSimple {
    id: number;
    projectManager: string;
    labourManager: string;
    projectManagerId: number;
    labourManagerId: number;
}

export interface TeamItem {
    name: string;
    id: number;
    qualityClerk: string;
    foreman: string;
    qualityClerkId: number;
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

    subscriptions: Subscription[] = [];

    navSubscription: Subscription;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public team: TeamService,
        public employer: EmployerService,
        public projectService: ProjectService,
        public permission: PermissionService,
        public modalCtrl: ModalController,
        public alertCtrl: AlertController,
        public translate: TranslateService,
        public tip: TipService
    ) {
    }

    ionViewDidLoad() {

        this.canOperate = this.permission.getOperatePermission(organization.icon, ProjectRoot);

        this.teams = this.team.getOwnTeams()
            .mergeMap(teams => Observable.from(teams)
                .map(team => ({ name: team.name, id: team.id, qualityClerk: team.quality_manage__employee__realname, foreman: team.leader__employee__realname, qualityClerkId: team.quality_manage_id }))
                .reduce(putInArray, [])
            )

        this.project = this.projectService.getCurrentProject()
            .map(project => ({
                id: project.id,
                projectManager: project.manager__employee__realname,
                labourManager: project.sub_contract__labour_manager__employee__realname,
                projectManagerId: project.manager_id,
                labourManagerId: project.sub_contract__labour_manager_id
            }))
    }

    addTeam(): void {
        const addTeamModal = this.modalCtrl.create(AddTeamComponent);

        addTeamModal.present();
    }

    updateTeam(team: TeamItem): void {
        const addTeamModal = this.modalCtrl.create(AddTeamComponent, { update: true, team });

        addTeamModal.present();
    }

    deleteTeam(team: TeamItem): void {
        const texts: Observable<ConfirmProp> = this.translate
            .get(['DELETE_TEAM', 'DELETE_TEAM_TIP', 'CANCEL_BUTTON', 'CONFIRM_BUTTON'])
            .map(res => ({
                title: res.DELETE_TEAM,
                message: res.DELETE_TEAM_TIP + team.name,
                cancelText: res.CANCEL_BUTTON,
                confirmText: res.CONFIRM_BUTTON
            }));

        const confirmFn = () => this.team.deleteTeam(team.id);

        const subscription = this.tip.showConfirmProp(texts, confirmFn);

        this.subscriptions.push(subscription);
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }

    goToNextPage(team: TeamItem): void {
        this.navCtrl.push(teamMembersPage, { team }).then(_ => { });
    }

    goToPersonalInfoPage(data: string | TeamItem): void {
        if (typeof data === 'string') {
            this.navSubscription = this.project.subscribe(project => {
                this.navCtrl.push(personalPage, { userId: project[data] }).then(_ => { });
            });
        } else {
            this.navCtrl.push(personalPage, { userId: data.qualityClerkId });
        }
    }

    ionViewDidLeave() {
        this.navSubscription && this.navSubscription.unsubscribe();
    }

}
