import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TutorialPage} from './tutorial';
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {platformDirectionReducer, showSkipReducer, slideReducer} from '../../reducers/slide-reducer';
import {SlideService} from '../../serveices/business/slide-service';

@NgModule({
  declarations: [
    TutorialPage,
  ],
  imports: [
    IonicPageModule.forChild(TutorialPage),
    TranslateModule.forChild(),
    StoreModule.forRoot({
      showSkip: showSkipReducer,
      welcomeSlides: slideReducer,
      platformDirection: platformDirectionReducer
    }),
  ],
  exports: [
    TutorialPage
  ],
  providers: [
    SlideService
  ]
})
export class TutorialPageModule { }
