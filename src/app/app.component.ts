import { tabsPage } from './../pages/pages';
import { GroupListService } from './../services/business/group-list-service';
import { TranslateService } from '@ngx-translate/core';
import { TipService } from './../services/tip-service';
import { Subscription } from 'rxjs/Subscription';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { FirstRunPage, PAGES, Page } from '../pages/pages';
import { ConfigService } from '../services/config/config-service';
import { ENV } from '@app/env';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';

console.log(ENV.DOMAIN);

@Component({
    templateUrl: './app.component.html'
})
export class MyApp {

    rootPage = FirstRunPage;

    @ViewChild(Nav) nav: Nav;

    pages: Page[] = PAGES;

    subscriptions: Subscription[] = [];

    readonly androidMinVersion = '6.0.0';

    readonly iOSMinVersion = '8.0';

    private isAndroid: Boolean;

    private isIos: Boolean;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private configService: ConfigService,
        private keyboard: Keyboard,
        private netWork: Network,
        private tip: TipService,
        private device: Device,
        private translate: TranslateService,
        private groupList: GroupListService
    ) {
        this.configService.init();

        this.isAndroid = this.platform.is('android');

        this.isIos = this.platform.is('ios');
    }

    /**
     * @ionViewDidLoad
     * Ionic life cycle event, ionic implements 8 life cycle hooks. 6 about them are run time related, the other are permission related.
     * */
    ionViewDidLoad() {
        console.log('app component loaded...');

        this.platform.ready().then(() => {

            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();

            this.splashScreen.hide();

            this.isIos && this.keyboard.disableScroll(true);

            this.isAndroid && this.platform.registerBackButtonAction(this.registerBackButton, 101);

            this.launch();
        });
    }

    launch(): void {
        this.checkSystemVersion();

        this.subscriptions = [
            this.checkNetWorkState(),
            this.groupList.attemptLogin(),
            this.groupList.getGroupListResponse().subscribe(_ => this.nav.setRoot(tabsPage)),
            this.groupList.handleError(),
        ];
    }

    checkNetWorkState(): Subscription {
        return this.netWork.onDisconnect()
            .withLatestFrom(
            this.translate.get('OFF_LINE'),
            (_, msg) => msg
            )
            .subscribe(msg => this.tip.showTip(msg, 10000));
    }

    checkSystemVersion(): void {
        let dVersion = this.device.version.split(".");

        let rVersion = undefined;

        if (this.isIos) {
            rVersion = this.iOSMinVersion.split('.');
        }

        if (this.isAndroid) {
            rVersion = this.androidMinVersion.split('.');
        }

        if (!rVersion) {
            const ary = new Array(dVersion.length);

            try {
                ary.forEach((item, idx) => {
                    +rVersion[idx] > +dVersion[idx] && new Error('1');
                    +rVersion[idx] < +dVersion[idx] && new Error('0');
                })
            } catch (error) {
                if (Boolean(error.message)) {
                    const exist = () => this.platform.exitApp();

                    if (this.isIos) {
                        const subscription = this.tip.alert(this.translate.get('LOW_VERSION_IOS'), exist);

                        this.subscriptions.push(subscription);
                    }

                    if (this.isAndroid) {
                        const subscription = this.tip.alert(this.translate.get('LOW_VERSION_ANDROID'), exist);

                        this.subscriptions.push(subscription);
                    }
                }
            }
        }
    }

    registerBackButton(event: Event): void {
        event.preventDefault();

        this.keyboard.close();

        if (this.nav.canGoBack()) {
            this.nav.pop();
        } else {
            this.platform.exitApp();
        }
    }

    /**
     * @description This method is unused at current time, it is used for the menu component;
     */
    openPage(page: Page): void {

        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}

/**
 * Fix keyboard height.
 * */
let coordinateY;

let offsetY;

function tapCoordinates(event) {
    const viewPortHeight = window.innerHeight;
    
    coordinateY = event.touches[0].clientY;

    offsetY = (viewPortHeight - coordinateY);
}

function keyboardShowHandler(event) {
    const keyboardHeight = event.keyboardHeight;

    const bodyMove = <HTMLElement>document.querySelector("ion-app");

    const bodyMoveStyle = bodyMove.style;

    const compensationHeight = 60; 

    if (offsetY < keyboardHeight + compensationHeight) {
        bodyMoveStyle.bottom = (keyboardHeight - offsetY + compensationHeight) + "px";

        bodyMoveStyle.top = "initial";
    }
}

function keyboardHideHandler() {
    const removeStyles = <HTMLElement>document.querySelector("ion-app");

    removeStyles.removeAttribute("style");
}

window.addEventListener('native.keyboardshow', keyboardShowHandler);

window.addEventListener('native.keyboardhide', keyboardHideHandler);

window.addEventListener('touchstart', tapCoordinates);
