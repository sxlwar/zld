import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TutorialPage} from './tutorial';
import {TranslateModule} from '@ngx-translate/core';
import {TutorialService} from '../../serveices/business/tutorial-service';

@NgModule({
  declarations: [
    TutorialPage,
  ],
  imports: [
    IonicPageModule.forChild(TutorialPage),
    TranslateModule.forChild()
  ],
  exports: [
    TutorialPage
  ],
  providers: [
    TutorialService
  ]
})
export class TutorialPageModule { }
