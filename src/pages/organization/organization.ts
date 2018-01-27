import { Subject } from 'rxjs/Subject';
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
import { IonicPage, NavController, ModalController, ItemSliding, Item } from 'ionic-angular';
import { AddTeamComponent } from '../../components/add-team/add-team';
import { putInArray } from '../../services/utils/util';
import { LayoutService } from '../../services/utils/layout-service';

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
    foremanId: number;
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

    deleteTeam$: Subject<number> = new Subject();

    activeItemSliding: ItemSliding = null;

    constructor(
        private navCtrl: NavController,
        private team: TeamService,
        private projectService: ProjectService,
        private permission: PermissionService,
        private modalCtrl: ModalController,
        private translate: TranslateService,
        private tip: TipService,
        private layout: LayoutService
    ) {
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.canOperate = this.permission.getOperatePermission(organization.icon, ProjectRoot);

        this.teams = this.team.getOwnTeams()
            .mergeMap(teams => Observable.from(teams)
                .map(team => ({
                    name: team.name,
                    id: team.id,
                    qualityClerk: team.quality_manage__employee__realname,
                    foreman: team.leader__employee__realname,
                    qualityClerkId: team.quality_manage_id,
                    foremanId: team.leader_id
                }))
                .reduce(putInArray, [])
            )

        this.project = this.projectService.getCurrentProject()
            .map(project => ({
                id: project.id,
                projectManager: project.manager__employee__realname,
                labourManager: project.sub_contract__labour_manager__employee__realname,
                projectManagerId: project.manager_id,
                labourManagerId: project.sub_contract__labour_manager_id
            }));

    }

    launch(): void {
        this.subscriptions = [
            this.team.deleteTeam(this.deleteTeam$),
            this.projectService.handleError(),
            this.team.handelDeleteTeamError(),
            this.team.handleError(),
        ];
    }

    addTeam(): void {
        this.modalCtrl.create(AddTeamComponent).present();
    }

    updateTeam(team: TeamItem): void {
        this.modalCtrl.create(AddTeamComponent, { update: true, team }).present();
    }

    deleteTeam(team: TeamItem, event: Event): void {
        event.stopPropagation();

        const texts: Observable<ConfirmProp> = this.translate
            .get(['DELETE_TEAM', 'DELETE_TEAM_TIP', 'CANCEL_BUTTON', 'CONFIRM_BUTTON'])
            .map(res => ({
                title: res.DELETE_TEAM,
                message: res.DELETE_TEAM_TIP + team.name,
                cancelText: res.CANCEL_BUTTON,
                confirmText: res.CONFIRM_BUTTON
            }));

        const confirmFn = () => this.deleteTeam$.next(team.id);

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
            this.navSubscription = this.project.subscribe(project => this.navCtrl.push(personalPage, { userId: project[data] }).then(_ => { }));
        } else {
            this.navCtrl.push(personalPage, { userId: data.qualityClerkId });
        }
    }

    openOption(itemSlide: ItemSliding, item: Item, event) {
        this.layout.openOption(itemSlide, item, event);
    }

    ionViewDidLeave() {
        this.navSubscription && this.navSubscription.unsubscribe();

        this.layout.activeItemSliding = null;
    }

}
