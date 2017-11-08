import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import * as icon from '../../serveices/business/icon-service';
import {IconService} from '../../serveices/business/icon-service';
import {IconState} from '../../reducers/icons-reducer';
import {Observable} from 'rxjs/Observable';
import {ProjectService} from '../../serveices/business/project-service';
import {WorkerService} from '../../serveices/business/worker-service';
import 'rxjs/add/operator/zip';
import 'rxjs/add/observable/of';
import {Project} from '../../interfaces/response-interface';
import {ProjectListComponent} from '../../components/project-list/project-list';

/**
 * Generated class for the ProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  icon.attendanceCard
];

@IonicPage()
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {

  icons: Observable<IconState[]>;

  name: Observable<string>;

  address: Observable<string>;

  remainDays: Observable<number>;

  isExpired: Observable<boolean>;

  workerCount: Observable<number>;

  haveMultipleProject: Observable<boolean>;

  projects: Observable<Project[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public iconService: IconService,
              public popoverCtrl: PopoverController,
              public projectService: ProjectService,
              public workerService: WorkerService) {
    this.projectService.getProjectList();
  }

  ionViewDidLoad() {

    this.icons = this.iconService.getIcons('project', icons);

    this.name = this.projectService.getProjectName();

    this.address = this.projectService.getProjectAddress();

    this.remainDays = this.projectService.getProjectExpiringDate();

    this.isExpired = this.remainDays.map(num => num < 0);

    this.workerCount = this.workerService.getWorkerCount(this.createOption());

    this.projects = this.projectService.getUserAllProject();

    this.haveMultipleProject = this.projects.map(value => value.length > 1);
  }

  createOption(): Observable<object> {
    return Observable.of({request_status: '完成'})
      .zip(
        this.projectService.getProjectId().map(project_id => ({project_id})),
        (status, id) => Object.assign(id, status)
      );
  }

  switchProject($event) {

    const popover = this.popoverCtrl.create(ProjectListComponent, {option: this.createOption()});

    popover.present({
      ev: $event
    }).then(() => {
    });
  }

  goTo(item) {
    console.log(item);
  }

  // noinspection JSUnusedGlobalSymbols
  ionViewWillUnload() {
    this.iconService.unSubscribe();
    this.projectService.unSubscribe();
    this.workerService.unSubscribe();
  }
}
