import { CraftService } from './../../services/business/craft-service';
import { Observable } from 'rxjs/Observable';
import { BasicInfoListResponse, BasicInformation,  PersonalId } from './../../interfaces/response-interface';
import { PersonalService } from './../../services/business/personal-service';
import { UserService } from './../../services/business/user-service';
import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Certification, Education, Family, PlatformExperience, CustomWorkExperience } from '../../interfaces/personal-interface';


@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {
  type = 'basic';
  
  workType = 'platform';

  subscriptions: Subscription[] = [];

  userId: number;

  basic: Observable<BasicInformation>;

  family: Observable<Family>;

  workExperience: Observable<CustomWorkExperience[]>;

  platformExperience: Observable<PlatformExperience[]>;

  certification: Observable<Certification[]>;

  personalIdInfo: Observable<PersonalId>;

  education: Observable<Education[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userInfo: UserService,
    public personal: PersonalService,
    public craft: CraftService
  ) {
    this.userId = this.navParams.get('userId') || this.userInfo.getUserId();
    this.personal.getBasicInfoList(Observable.of(this.userId));
  }

  ionViewDidLoad() {
    const source = this.personal.getBasicInfoResponse()
      .filter(value => !!value);

    this.getBasic(source);
    this.getHome(source);
    this.getWorkExperience(source);
    this.getPlatformExperience(source);
    this.getEducation(source);
    this.getPersonalId(source);
    this.getCertification(source);
  }

  /**
   * 以下所有的filter不能删，后台的数据结构不稳定，防止它不给返回需要的字段。
   */
  getBasic(source: Observable<BasicInfoListResponse>): void {
    this.basic = source
      .filter(data => !!data.basic_info)
      .map(data => data.basic_info);
  }

  getHome(source: Observable<BasicInfoListResponse>): void {
    this.family = source
      .filter(value => !!value.home_info && !!value.home_info.length)
      .mergeMap(data => Observable.from(data.home_info)
        .first()
        .map(res => this.personal.transformFamily(res))
      );
  }

  getWorkExperience(source: Observable<BasicInfoListResponse>): void {
    this.workExperience = source
      .filter(value => !!value.work_expr_info)
      .map(data => data.work_expr_info.map(item => this.personal.transformWorkExperience(item)));
  }

  getPlatformExperience(source: Observable<BasicInfoListResponse>): void {
    this.platformExperience = source
      .filter(value => !!value.platfrom_work_expr_info)
      .map(data => data.platfrom_work_expr_info.map(item => this.personal.transformPlatformWorkExperience(item)));
  }

  getPersonalId(source: Observable<BasicInfoListResponse>): void {
    this.personalIdInfo = source
      .filter(value => !!value.person_id_info && !!value.person_id_info.length)
      .mergeMap(data => Observable.from(data.person_id_info)
        .first()
      );
  }

  getCertification(source: Observable<BasicInfoListResponse>): void {
    this.certification = source
      .filter(value => !!value.work_cert_info)
      .combineLatest(
      this.craft.getWorkTypeList(),
      (source, type) => source.work_cert_info.map(element => this.personal.transformCertification(element, type)))
  }

  getEducation(source: Observable<BasicInfoListResponse>): void {
    this.education = source.map(data => data.edu_info.map(item => this.personal.transformEducation(item)));
  }

}
