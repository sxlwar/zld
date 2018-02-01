import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, ModalController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { LocationCardResponses } from '../../reducers/reducer/location-card-reducer';
import { AddLocationCardComponent } from './../../components/add-location-card/add-location-card';
import { ConditionOption } from './../../interfaces/order-interface';
import { LocationCard } from './../../interfaces/response-interface';
import { locationCard } from './../../services/business/icon-service';
import { LocationCardService } from './../../services/business/location-card-service';
import { ProjectService } from './../../services/business/project-service';
import { TeamService } from './../../services/business/team-service';
import { PermissionService } from './../../services/config/permission-service';
import { ProjectRoot } from './../pages';

@IonicPage()
@Component({
    selector: 'page-location-card',
    templateUrl: 'location-card.html',
})
export class LocationCardPage {

    subscriptions: Subscription[];

    canOperate: Observable<boolean>;

    cards: Observable<LocationCard[]>

    orderOptions: Observable<ConditionOption[]>;

    bindingStateOptions: Observable<ConditionOption[]>;

    deviceStateOptions: Observable<ConditionOption[]>;

    teamStateOptions: Observable<ConditionOption[]>;

    bindingStateOption: ConditionOption;

    orderOption: ConditionOption;

    deviceStateOption: ConditionOption;

    selectedTeam: ConditionOption;

    unbind$: Subject<LocationCard> = new Subject();

    delete$: Subject<LocationCard> = new Subject();

    constructor(
        private navParams: NavParams,
        private teamService: TeamService,
        private locationCard: LocationCardService,
        private permission: PermissionService,
        private translate: TranslateService,
        private project: ProjectService,
        private modalCtrl: ModalController
    ) {
    }

    ionViewCanEnter() {
        const { view, opt } = this.navParams.get('permission');

        return opt || view;
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.canOperate = this.permission.getOperatePermission(locationCard.icon, ProjectRoot);

        this.cards = this.locationCard.getLocationCardsByCondition();

        this.bindingStateOptions = this.locationCard.getBindingStateOptions();

        this.orderOptions = this.locationCard.getOrderOptions();

        this.deviceStateOptions = this.locationCard.getDeviceStateOptions();

        this.teamStateOptions = this.locationCard.getTeamStateOptions();
    }

    /* =============================================================Launch functions============================================ */

    launch(): void {
        this.subscriptions = [
            this.locationCard.getTeamStateOptions().filter(value => !value.length).mergeMapTo(this.updateTeamStateOptions()).subscribe(option => this.locationCard.updateTeamStateOptions(option)),

            this.teamService.getTeamList(this.teamService.getTeamStateOptions().filter(value => !value.length).mergeMapTo(this.project.getProjectId().map(project_id => ({ project_id })))),

            this.getLocationCardList(),

            //v1还传了location_card_id这个字段，但两个都解绑成功了。。。。。。。。。。。。。。
            this.locationCard.updateLocationCard(this.unbind$.map(card => ({ dev_id: card.dev_id }))),

            this.locationCard.deleteLocationCard(this.delete$.map(card => ({ location_card_id: card.id }))),

            this.teamService.handleError(),

            this.locationCard.handleQueryError(),

            this.locationCard.handleDeleteError(),

            this.locationCard.handleUpdateError(),
        ];
    }

    getLocationCardList(): Subscription {
        return this.locationCard.getLocationCardList(
            this.locationCard.getSelectedTeam()
                .map(team => team && team.condition || null)
                .distinctUntilChanged().map(team_id => team_id ? { team_id } : {})
        );
    }

    /**
     * @description  Update the list of available teams, a request is send first if the teamList api haven't been requested;
     */
    updateTeamStateOptions(): Observable<ConditionOption[]> {
        return this.teamService.getTeamStateOptions()
            .map(source => source.map(item => ({ condition: item.id, text: item.name, selected: false })))
            .withLatestFrom(
            this.translate.get('ALL').map(text => ({ condition: null, selected: true, text })),
            (options, head) => [head].concat(options)
            );
    }

    /* ===============================================Operate functions===================================================== */

    addCard(): void {
        this.modalCtrl.create(AddLocationCardComponent).present();
    }

    bindCard(card: LocationCard): void {
        this.modalCtrl.create(AddLocationCardComponent, { cardNumber: card.dev_id, id: card.id }).present();
    }

    /* ===============================================Condition related functions===================================================== */

    setBindCondition(): void {
        this.locationCard.updateBindingState(this.bindingStateOption);
    }

    setOrderCondition(): void {
        this.locationCard.updateOrderState(this.orderOption);
    }

    setDeviceCondition(): void {
        this.locationCard.updateDeviceState(this.deviceStateOption);
    }

    setSelectedTeam(): void {
        this.locationCard.updateSelectedTeam(this.selectedTeam);
    }

    ionViewWillUnload() {
        this.locationCard.resetOperateResponse(LocationCardResponses.deleteResponse);

        this.locationCard.resetOperateResponse(LocationCardResponses.updateResponse);

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
