import { AddLocationCardComponent } from './../../components/add-location-card/add-location-card';
import { TranslateService } from '@ngx-translate/core';
import { ConditionOption } from './../../interfaces/order-interface';
import { LocationCard } from './../../interfaces/response-interface';
import { Subscription } from 'rxjs/Subscription';
import { ProjectRoot } from './../pages';
import { locationCard } from './../../services/business/icon-service';
import { Observable } from 'rxjs/Observable';
import { ProjectService } from './../../services/business/project-service';
import { PermissionService } from './../../services/config/permission-service';
import { LocationCardService } from './../../services/business/location-card-service';
import { TeamService } from './../../services/business/team-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public teamService: TeamService,
    public locationCard: LocationCardService,
    public permission: PermissionService,
    public translate: TranslateService,
    public project: ProjectService,
    public modalCtrl: ModalController
  ) {
  }

  ionViewCanEnter() {
    const { view, opt } = this.navParams.get('permission');

    const result = opt || view;

    result && this.launch();

    return opt || view;
  }

  ionViewDidLoad() {

    this.canOperate = this.permission.getOperatePermission(locationCard.icon, ProjectRoot);

    this.cards = this.locationCard.getLocationCardsByCondition();

    this.bindingStateOptions = this.locationCard.getBindingStateOptions();

    this.orderOptions = this.locationCard.getOrderOptions();

    this.deviceStateOptions = this.locationCard.getDeviceStateOptions();

    this.teamStateOptions = this.locationCard.getTeamStateOptions();
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  /* =============================================================Launch functions============================================ */

  launch() {
    this.subscriptions = this.locationCard.handleError(); // Must be initial error handle first.

    this.getLocationCardList();

    const subscription = this.locationCard.getTeamStateOptions().subscribe(options => !options.length && this.updateTeamStateOptions());

    this.subscriptions.push(subscription);
  }

  getLocationCardList(): void {
    const option = this.getOptions()
      .distinctUntilChanged()
      .map(team_id => team_id ? { team_id } : {})

    const subscription = this.locationCard.getLocationCardList(option);

    this.subscriptions.push(subscription);
  }

  /**
   * @description  Update the list of available teams, a request is send first if the teamList api haven't been requested;
   */
  updateTeamStateOptions(): void {
    const teams = this.teamService.getTeamStateOptions().map(source => source.map(item => ({ condition: item.id, text: item.name, selected: false })));

    const subscription = teams.subscribe(result => !result.length && this.teamService.getTeamList(this.project.getProjectId().map(project_id => ({ project_id }))));

    this.subscriptions.push(subscription);

    const option$$ = teams
      .withLatestFrom(this.translate.get('ALL').map(text => ({ condition: null, selected: true, text })))
      .map(([options, head]) => [head].concat(options))
      .subscribe(option => this.locationCard.updateTeamStateOptions(option))

    this.subscriptions.push(option$$);
  }

  /**
   * @description Get the option for teamList api. Only need one field named 'team_id' if user select to show list of the specific team.
   */
  getOptions(): Observable<number> {
    return this.locationCard.getSelectedTeam()
      .map(team => team && team.condition || null);
  }

  /* ===============================================Operate functions===================================================== */

  addCard(): void {
    this.modalCtrl.create(AddLocationCardComponent).present();
  }

  bindCard(card: LocationCard): void {
    const cardNumber = card.dev_id;

    this.modalCtrl.create(AddLocationCardComponent, { cardNumber, id: card.id }).present();
  }

  unbindCard(card: LocationCard): void {
    const { dev_id } = card;

    this.locationCard.updateLocationCard(Observable.of({ dev_id })); //v1还传了location_card_id这个字段，但两个都解绑成功了。。。。。。。。。。。。。。
  }

  deleteCard(card: LocationCard): void {
    this.locationCard.deleteLocationCard(Observable.of({ location_card_id: card.id }));
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
}
