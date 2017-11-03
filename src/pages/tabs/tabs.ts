import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MessageRoot, ProjectRoot, MissionRoot, MineRoot} from '../pages';

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

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.get(['MESSAGE', 'PROJECT', 'MISSION', 'MINE']).subscribe(values => {
      this.tab1Title = values['MESSAGE'];
      this.tab2Title = values['PROJECT'];
      this.tab3Title = values['MISSION'];
      this.tab4Title = values['MINE'];
    });
  }
}
