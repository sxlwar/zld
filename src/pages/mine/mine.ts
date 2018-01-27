import { QRLoginService } from './../../services/business/qr-login-service';
import { Subscription } from 'rxjs/Subscription';
import { LogoutService } from './../../services/business/logout-service';
import { personalInfo } from './../../services/business/icon-service';
import { MineRoot, personalInformationPage, welcomePage } from './../pages';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { IconService } from '../../services/business/icon-service';
import { Observable } from 'rxjs/Observable';
import { IconState } from '../../reducers/reducer/icons-reducer';
import { ProjectService } from '../../services/business/project-service';
import { UserService } from '../../services/business/user-service';
import { CraftService } from '../../services/business/craft-service';
import { TeamService } from '../../services/business/team-service';
import { App } from 'ionic-angular';
import * as icon from '../../services/business/icon-service';
import * as pages from '../../pages/pages';

const icons = [
    icon.myAttendance,
    icon.salary,
    icon.bankCard,
    icon.certificate,
    icon.workerContract,
    icon.personalInfo,
    icon.familyInfo,
    icon.workInfo,
    icon.educationInfo
];

interface Setting {
    icon: string;
    name: string;
    page: string;
}

const setting: Setting[] = [
    { icon: 'settings', name: 'RESET_RESET_PASSWORD', page: pages.resetPasswordPage },
    { icon: 'phone-portrait', name: 'CHANGE_ACCOUNT', page: pages.accountChangePage },
    { icon: 'call', name: 'CONTACT_US', page: pages.contactPage },
    { icon: 'document', name: 'VERSION_INTRODUCTION', page: pages.versionPage },
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

    name: Observable<string>;

    projectName: Observable<string>;

    account: Observable<string>;

    team: Observable<string>;

    workType: Observable<string>;

    faceImage: Observable<string>;

    subscriptions: Subscription[] = [];

    QRLoginOptions: Subscription[];

    constructor(
        private navCtrl: NavController,
        private userInfo: UserService,
        private workTypeService: CraftService,
        private projectService: ProjectService,
        private teamService: TeamService,
        private iconService: IconService,
        private logoutService: LogoutService,
        private app: App,
        private scan: QRLoginService
    ) {
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel() {
        this.icons = this.iconService.selectIcons(MineRoot);

        this.name = this.userInfo.getRealName();

        this.character = this.userInfo.getUserCharacter();

        this.account = this.userInfo.getAccount();

        this.faceImage = this.userInfo.getFaceImage();

        this.projectName = this.projectService.getProjectName();

        //TODO: 在获取自己的工种和班组时都要去拿自己的合同，如果store中没有当前用户的合同，这个地方会发出两次请求去查合同。
        this.workType = this.workTypeService.getOwnWorkType()
            .filter(value => !!value.length)
            .mergeMap(types => Observable.from(types).first().map(workType => workType.name));

        this.team = this.teamService.getOwnTeam().map(team => team && team.name || '');
    }

    launch(): void {
        this.subscriptions = [
            this.iconService.addRootModuleIcons(MineRoot, icons),
            this.logoutService.getLogout().subscribe(_ => this.resetValuesAfterLogout())
        ];
    }

    goTo(item: IconState | Setting): void {
        this.navCtrl.push(item.page, item).then(() => { });
    }

    showPersonalInformation(): void {
        this.navCtrl.push(personalInformationPage, personalInfo).then(() => { });
    }

    ionViewWillLeave() {
        this.scan.resetQRCode();
    }

    logout(): void {
        this.logoutService.logout();
    }

    resetValuesAfterLogout(): void {
        this.app.getRootNav().setRoot(welcomePage);

        this.userInfo.resetSid();

        this.logoutService.resetResponse();
    }

    scanToLogin(): void {
        this.QRLoginOptions && this.QRLoginOptions.forEach(item => item.unsubscribe());

        this.QRLoginOptions = this.scan.scanToLogin();
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());

        this.QRLoginOptions && this.QRLoginOptions.forEach(item => item.unsubscribe());
    }
}
