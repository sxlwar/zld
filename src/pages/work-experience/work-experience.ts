import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { AddWorkExperienceComponent } from '../../components/add-work-experience/add-work-experience';
import { BusinessPageModel } from '../../interfaces/core-interface';
import { CustomWorkExperience, PlatformExperience } from './../../interfaces/personal-interface';
import { MapperService, WorkExperienceFormModel, WorkExperienceUpdateFormModel } from './../../services/api/mapper-service';
import { PersonalService } from './../../services/business/personal-service';

@IonicPage()
@Component({
    selector: 'page-work-experience',
    templateUrl: 'work-experience.html',
})
export class WorkExperiencePage implements BusinessPageModel {

    type = 'platform';

    platformWorkExperience: Observable<PlatformExperience[]>;

    customWorkExperience: Observable<CustomWorkExperience[]>;

    subscriptions: Subscription[] = [];

    update$: Subject<WorkExperienceUpdateFormModel> = new Subject();

    add$: Subject<WorkExperienceFormModel> = new Subject();

    delete$: Subject<CustomWorkExperience> = new Subject();

    constructor(
        private navParams: NavParams,
        private personal: PersonalService,
        private modalCtrl: ModalController,
        private mapper: MapperService
    ) {
    }

    ionViewCanEnter() {
        const { view, opt } = this.navParams.get('permission');

        return view || opt;
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.platformWorkExperience = this.personal.getOwnPlatformExperience().map(result => result.map(item => this.mapper.transformPlatformWorkExperience(item)));

        this.customWorkExperience = this.personal.getOwnWorkExperience().map(result => result.map(item => this.mapper.transformWorkExperience(item)));
    }

    launch(): void {
        this.subscriptions = [
            this.personal.getWorkExperienceList(),

            this.personal.getPlatformWorkExperienceList(),

            this.personal.updateWorkExperience(this.update$),

            this.personal.addWorkExperience(this.add$),

            this.personal.deleteWorkExperience(this.delete$.map(item => item.id)),

            this.personal.handleWorkExperienceError(),

            this.personal.handlePlatformWorkExperienceError(),

            this.personal.handleAddWorkExperienceError(),

            this.personal.handleUpdateWorkExperienceError(),
        ];
    }

    updateWorkExperience(target: CustomWorkExperience): void {
        const modal = this.modalCtrl.create(AddWorkExperienceComponent, { form: target });

        modal.present();

        modal.onDidDismiss((data: WorkExperienceFormModel) => !!data && this.update$.next({ ...data, id: target.id }));
    }

    addWorkExperience() {
        const modal = this.modalCtrl.create(AddWorkExperienceComponent);

        modal.present();

        modal.onDidDismiss((data: WorkExperienceFormModel) => !!data && this.add$.next(data));
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
