import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IonicPage, MenuController, NavController, Slides } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../../reducers/index-reducer';
import { TutorialService } from '../../services/business/tutorial-service';

@IonicPage()
@Component({
    selector: 'page-tutorial',
    templateUrl: 'tutorial.html',
})
export class TutorialPage implements OnInit {
    slides: Observable<object[]>;

    showSkip: Observable<boolean>;

    dir: Observable<string>;

    slides$$: Subscription;

    constructor(
        private navCtrl: NavController,
        private menu: MenuController,
        private tutorial: TutorialService,
        private store: Store<fromRoot.AppState>
    ) {
    }

    ngOnInit() {
        const keys = ['TUTORIAL_SLIDE1_TITLE',
            'TUTORIAL_SLIDE1_DESCRIPTION',
            'TUTORIAL_SLIDE2_TITLE',
            'TUTORIAL_SLIDE2_DESCRIPTION',
            'TUTORIAL_SLIDE3_TITLE',
            'TUTORIAL_SLIDE3_DESCRIPTION',
            'TUTORIAL_SLIDE4_TITLE',
            'TUTORIAL_SLIDE4_BUTTON',
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
            direction: 'forward',
        }).then(() => {
            this.tutorial.resetSkipState();
        });
    }

    onSlideChangeStart(slides: Slides) {
        this.tutorial.slideChange(slides);
    }

    ionViewDidEnter() {
        this.menu.enable(false);
    }

    ionViewWillLeave() {
        this.menu.enable(true);

        this.slides$$.unsubscribe();
    }

}
