import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MessageRoot, ProjectRoot, MissionRoot, MineRoot } from '../pages';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  MessageRoot: any = MessageRoot;
  ProjectRoot: any = ProjectRoot;
  MissionRoot: any = MissionRoot;
  MineRoot: any = MineRoot;

  messageTitle = " ";
  projectTitle = " ";
  missionTitle = " ";
  mineTitle = " ";

  constructor(
    public navCtrl: NavController,
    public translateService: TranslateService
  ) {
    translateService.get(['MESSAGE', 'PROJECT', 'MISSION', 'MINE']).subscribe(values => {
      this.messageTitle = values['MESSAGE'];
      this.projectTitle = values['PROJECT'];
      this.missionTitle = values['MISSION'];
      this.mineTitle = values['MINE'];
    });
  }
}
