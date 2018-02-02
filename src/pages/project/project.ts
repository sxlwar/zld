import 'rxjs/add/observable/of';
import 'rxjs/add/operator/zip';

import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ProjectListComponent } from '../../components/project-list/project-list';
import { BusinessPageModel } from '../../interfaces/core-interface';
import { Project } from '../../interfaces/response-interface';
import { ProjectRoot } from '../../pages/pages';
import { IconState } from '../../reducers/reducer/icons-reducer';
import * as icon from '../../services/business/icon-service';
import { ProjectService } from '../../services/business/project-service';
import { WorkerService } from '../../services/business/worker-service';

const icons = [
    icon.attendance,
    icon.payroll,
    icon.organization,
    icon.workerManager,
    icon.workPiece,
    icon.location,
    icon.trajectory,
    icon.attendanceMachine,
    icon.locationCard,
    icon.attendanceCard,
    icon.locationAttendanceRecord,
];

@IonicPage()
@Component({
    selector: 'page-project',
    templateUrl: 'project.html',
})
export class ProjectPage implements BusinessPageModel {

    icons: Observable<IconState[]>;

    currentProject: Observable<Project>;

    name: Observable<string>;

    address: Observable<string>;

    remainDays: Observable<number>;

    isExpired: Observable<boolean>;

    workerCount: Observable<number>;

    haveMultipleProject: Observable<boolean>;

    projects: Observable<Project[]>;

    subscriptions: Subscription[] = [];

    worker$$: Subscription;

    constructor(
        private navCtrl: NavController,
        private iconService: icon.IconService,
        private popoverCtrl: PopoverController,
        private projectService: ProjectService,
        private workerService: WorkerService
    ) {
    }

    ionViewDidLoad() {
        this.initialModel();
        
        this.launch();
    }

    ionViewWillEnter() {
        this.worker$$ = this.workerService.getWorkerContractsOfCurrentProject();
    }

    launch(): void {
        this.subscriptions = [
            this.iconService.addRootModuleIcons(ProjectRoot, icons),

            this.workerService.handleError(),

            this.projectService.handleError(),
        ];
    }

    initialModel(): void {
        this.icons = this.iconService.selectIcons(ProjectRoot);

        this.currentProject = this.projectService.getCurrentProject();

        this.projects = this.projectService.getUserAllProject();

        this.name = this.currentProject.map(project => project.name);

        this.address = this.currentProject.map(project => this.projectService.getProjectAddress(project));

        this.remainDays = this.currentProject.map(project => this.projectService.getProjectExpiringDate(project));

        this.isExpired = this.remainDays.map(num => num < 0);

        this.haveMultipleProject = this.projects.filter(value => !!value).map(value => value.length > 1);

        this.workerCount = this.workerService.getWorkerCount();
    }

    switchProject(ev: Event) {
        this.popoverCtrl.create(ProjectListComponent).present({ ev }).then(() => { });
    }

    goTo(item) {
        !!item.page && this.navCtrl.push(item.page, item).then(() => { });
    }

    ionViewDidLeave() {
        this.worker$$.unsubscribe();
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
