import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import * as icon from '../../services/business/icon-service';
import { IconService } from '../../services/business/icon-service';
import { IconState } from '../../reducers/reducer/icons-reducer';
import { Observable } from 'rxjs/Observable';
import { ProjectService } from '../../services/business/project-service';
import { WorkerService } from '../../services/business/worker-service';
import 'rxjs/add/operator/zip';
import 'rxjs/add/observable/of';
import { Project } from '../../interfaces/response-interface';
import { ProjectListComponent } from '../../components/project-list/project-list';
import { ProjectRoot } from '../../pages/pages';

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
    icon.locationAttendanceRecord
];

@IonicPage()
@Component({
    selector: 'page-project',
    templateUrl: 'project.html',
})
export class ProjectPage {

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

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public iconService: IconService,
        public popoverCtrl: PopoverController,
        public projectService: ProjectService,
        public workerService: WorkerService
    ) {
    }

    ionViewDidLoad() {
        this.initialModel();
    }

    ionViewWillEnter() {
        this.launch();
    }

    launch(): void {
        this.subscriptions = [
            this.iconService.addRootModuleIcons(ProjectRoot, icons),
            this.workerService.getWorkerContractsOfCurrentProject(),
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

        this.haveMultipleProject = this.projects.map(value => value.length > 1);

        this.workerCount = this.workerService.getWorkerCount();
    }
    
    switchProject($event) {
        this.popoverCtrl.create(ProjectListComponent).present({ ev: $event }).then(() => { });
    }

    goTo(item) {
        !!item.page && this.navCtrl.push(item.page, item).then(() => { });
    }

    ionViewDidLeave() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }

    ionViewWillUnload() {
    }
}
