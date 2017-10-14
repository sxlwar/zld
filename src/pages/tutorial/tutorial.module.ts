import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TutorialPage} from './tutorial';
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {SlideService} from '../../serveices/business/tutorial-service';
// import {reducers} from '../../reducers/index-reducer';

@NgModule({
  declarations: [
    TutorialPage,
  ],
  imports: [
    IonicPageModule.forChild(TutorialPage),
    TranslateModule.forChild(),
    // StoreModule.forRoot(reducers),
  ],
  exports: [
    TutorialPage
  ],
  providers: [
    SlideService
  ]
})
export class TutorialPageModule { }
