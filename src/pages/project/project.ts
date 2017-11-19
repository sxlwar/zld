//region
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
//endregion

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

  currentProject: Observable<Project>;

  name: Observable<string>;

  address: Observable<string>;

  remainDays: Observable<number>;

  isExpired: Observable<boolean>;

  workerCount: Observable<number>;

  haveMultipleProject: Observable<boolean>;

  projects: Observable<Project[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public iconService: IconService,
    public popoverCtrl: PopoverController,
    public projectService: ProjectService,
    public workerService: WorkerService
  ) {
    this.projectService.getProjectList();
  }

  ionViewDidLoad() {
    
    this.icons = this.iconService.getIcons(ProjectRoot, icons);

    this.currentProject = this.projectService.getCurrentProject();

    this.projects = this.projectService.getUserAllProject();

    this.name = this.currentProject.map(project => project.name);

    this.address = this.currentProject.map(project => this.projectService.getProjectAddress(project));

    this.remainDays = this.currentProject.map(project => this.projectService.getProjectExpiringDate(project));

    this.isExpired = this.remainDays.map(num => num < 0);

    this.haveMultipleProject = this.projects.map(value => value.length > 1);
  }

  // noinspection JSUnusedGlobalSymbols
  ionViewWillEnter() {
    this.workerCount = this.workerService.getWorkerCount(this.createOption());
  }

  createOption(): Observable<{ [key: string]: string | number }> {
    return Observable.of({ request_status: '完成', limit: 1 })
      .zip(
      this.currentProject.map(project => ({ project_id: project.id })),
      (status, id) => Object.assign(id, status)
      );
  }

  switchProject($event) {

    const popover = this.popoverCtrl.create(ProjectListComponent, { option: this.createOption() });

    popover.present({
      ev: $event
    }).then(() => {
    });
  }

  goTo(item) {
    if (!item.page) return;
    this.navCtrl.push(item.page).then(() => { });
  }

  // noinspection JSUnusedGlobalSymbols
  ionViewWillUnload() {
    this.iconService.unSubscribe();
    this.projectService.unSubscribe();
    this.workerService.unSubscribe();
  }
}
