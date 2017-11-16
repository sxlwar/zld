import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {ProjectService} from '../../services/business/project-service';
import {Project} from '../../interfaces/response-interface';
import {Observable} from 'rxjs/Observable';
import {WorkerService} from '../../services/business/worker-service';

/**
 * Generated class for the ProjectListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'project-list',
  templateUrl: 'project-list.html'
})
export class ProjectListComponent {

  projects: Observable<Project[]>;

  constructor(public viewCtrl: ViewController,
              public workerService: WorkerService,
              public projectService: ProjectService,
              public navParam: NavParams
  ) {
    this.projects = projectService.getUserAllProject();
  }

  close(project) {

    this.projectService.switchProject(project.id);

    const option = this.navParam.get('option');

    this.workerService.getWorkerCount(option);

    this.viewCtrl.dismiss().then(() => {});
  }

}
