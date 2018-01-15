import { Subscription } from 'rxjs/Subscription';
import { Component, OnDestroy } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ProjectService } from '../../services/business/project-service';
import { Project } from '../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { WorkerService } from '../../services/business/worker-service';

@Component({
    selector: 'project-list',
    templateUrl: 'project-list.html'
})
export class ProjectListComponent implements OnDestroy {

    projects: Observable<Project[]>;

    subscription: Subscription;

    constructor(
        public viewCtrl: ViewController,
        public workerService: WorkerService,
        public projectService: ProjectService,
        public navParam: NavParams
    ) {
        this.projects = projectService.getUserAllProject();
    }

    close(project) {
        this.projectService.switchProject(project.id);

        this.subscription = this.workerService.getWorkerContractsOfCurrentProject();

        this.viewCtrl.dismiss().then(() => { });
    }

    ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
    }

}
