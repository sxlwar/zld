import {Component, OnInit} from '@angular/core';
import {IonicPage, MenuController, NavController, Slides} from 'ionic-angular';
import {SlideService} from '../../serveices/business/tutorial-service';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers/index-reducer'

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage implements OnInit {
  slides: Observable<object[]>;
  showSkip: Observable<boolean>;
  dir: Observable<string>;

  constructor(public navCtrl: NavController,
              public menu: MenuController,
              private slideService: SlideService,
              public store: Store<fromRoot.AppState>) {
  }

  ngOnInit() {
    const keys = ['TUTORIAL_SLIDE1_TITLE',
      'TUTORIAL_SLIDE1_DESCRIPTION',
      'TUTORIAL_SLIDE2_TITLE',
      'TUTORIAL_SLIDE2_DESCRIPTION',
      'TUTORIAL_SLIDE3_TITLE',
      'TUTORIAL_SLIDE3_DESCRIPTION',
      'TUTORIAL_SLIDE4_TITLE',
      'TUTORIAL_SLIDE4_BUTTON'
    ];
    const address = ['assets/img/ica-slidebox-img-1.png', 'assets/img/ica-slidebox-img-2.png', 'assets/img/ica-slidebox-img-3.png', 'assets/img/ica-slidebox-img-4.png'];

    this.slideService.getSlides(keys, address);

    this.slides = this.store.select(fromRoot.selectWelcomeSlides);

    this.showSkip = this.store.select(fromRoot.selectSkipState);

    this.dir = this.store.select(fromRoot.selectPlatformDirection);
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    }).then(() => {
      this.slideService.resetSkipState();
    });
  }

  onSlideChangeStart(slides: Slides) {
    this.slideService.slideChange(slides);
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
