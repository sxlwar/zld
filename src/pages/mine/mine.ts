//region
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as icon from '../../serveices/business/icon-service';
import {IconService} from '../../serveices/business/icon-service';
import {Observable} from 'rxjs/Observable';
import {IconState} from '../../reducers/icons-reducer';
import {ProjectService} from '../../serveices/business/project-service';
import {UserService} from '../../serveices/business/user-service';
import {CraftService} from '../../serveices/business/craft-service';
import {TeamService} from '../../serveices/business/team-service';
//endregion

/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const icons = [
  icon.myAttendance,
  icon.salary,
  icon.bankCard,
  icon.certificate,
  icon.workContract,
  icon.personalInfo,
  icon.familyInfo,
  icon.workInfo,
  icon.educationInfo
];

interface Setting {
  icon: string;
  name: string;
}

const setting: Setting[] = [
  {icon: 'settings', name: 'ACCOUNT_CONFIG'},
  {icon: 'call', name: 'SERVICE_TELEPHONE'},
  {icon: 'document', name: 'VERSION_INTRODUCTION'},
];

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {

  icons: Observable<IconState[]>;

  settings = setting;

  character: Observable<string>;

  realname: Observable<string>;

  projectName: Observable<string>;

  account: Observable<string>;

  team: Observable<string>;

  workType: Observable<string>;

  faceImage: Observable<string>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userInfo: UserService,
              public workTypeService: CraftService,
              public projectService: ProjectService,
              public teamService: TeamService,
              public iconService: IconService) {
  }

  ionViewDidLoad() {
    this.icons = this.iconService.getIcons('mine', icons);

    this.realname = this.userInfo.getRealname();

    this.character = this.userInfo.getUserCharater();

    this.account = this.userInfo.getAccount();

    this.faceImage = this.userInfo.getFaceImage();

    this.projectName = this.projectService.getProjectName();

    this.workType = this.workTypeService.getOwnWorkType()
      .mergeMap(types => Observable.from(types).first().map(workType => workType.name));

    this.team = this.teamService.getOwnTeam().map(team => {
      if(team) return team.name;
      return '';
    });
  }

  goTo(item) {
    console.log(item);
  }

  // noinspection JSUnusedGlobalSymbols
  ionViewWillLeave() {
    this.workTypeService.unSubscribe();
  }
}
