import { Component, OnInit } from '@angular/core';
import { IonicPage, MenuController, NavController, Slides } from 'ionic-angular';
import { TutorialService } from '../../services/business/tutorial-service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/index-reducer'
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
    selector: 'page-tutorial',
    templateUrl: 'tutorial.html'
})
export class TutorialPage implements OnInit {
    slides: Observable<object[]>;
    showSkip: Observable<boolean>;
    dir: Observable<string>;
    slides$$: Subscription;

    constructor(public navCtrl: NavController,
        public menu: MenuController,
        private tutorial: TutorialService,
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

        this.slides$$ = this.tutorial.getSlides(keys, address);

        this.slides = this.store.select(fromRoot.selectTutorialSlides);

        this.showSkip = this.store.select(fromRoot.selectSkipState);

        this.dir = this.store.select(fromRoot.selectPlatformDirection);
    }

    startApp() {
        this.navCtrl.setRoot('WelcomePage', {}, {
            animate: true,
            direction: 'forward'
        }).then(() => {
            this.tutorial.resetSkipState();
        });
    }

    onSlideChangeStart(slides: Slides) {
        this.tutorial.slideChange(slides);
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidEnter() {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewWillLeave() {
        // enable the root left menu when leaving the tutorial page
        this.menu.enable(true);
        this.slides$$.unsubscribe();
    }

}
