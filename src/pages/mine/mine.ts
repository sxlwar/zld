//region
import { MineRoot } from './../pages';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as icon from '../../services/business/icon-service';
import { IconService } from '../../services/business/icon-service';
import { Observable } from 'rxjs/Observable';
import { IconState } from '../../reducers/reducer/icons-reducer';
import { ProjectService } from '../../services/business/project-service';
import { UserService } from '../../services/business/user-service';
import { CraftService } from '../../services/business/craft-service';
import { TeamService } from '../../services/business/team-service';
//endregion

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
  { icon: 'settings', name: 'ACCOUNT_CONFIG' },
  { icon: 'call', name: 'SERVICE_TELEPHONE' },
  { icon: 'document', name: 'VERSION_INTRODUCTION' },
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userInfo: UserService,
    public workTypeService: CraftService,
    public projectService: ProjectService,
    public teamService: TeamService,
    public iconService: IconService
  ) {
  }

  ionViewDidLoad() {
    this.icons = this.iconService.getIcons(MineRoot, icons);

    this.realname = this.userInfo.getRealname();

    this.character = this.userInfo.getUserCharacter();

    this.account = this.userInfo.getAccount();

    this.faceImage = this.userInfo.getFaceImage();

    this.projectName = this.projectService.getProjectName();

    //TODO: 在获取自己的工种和班组时都要去拿自己的合同，如果store中没有当前用户的合同，这个地方会发出两次请求去查合同。
    this.workType = this.workTypeService.getOwnWorkType()
      .mergeMap(types => Observable.from(types).first().map(workType => workType.name));

    this.team = this.teamService.getOwnTeam().map(team => team && team.name || '');
  }

  goTo(item) {
    this.navCtrl.push(item.page, item).then(() => { });
  }

  ionViewWillLeave() {
    this.workTypeService.unSubscribe();
  }
}
