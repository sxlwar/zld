import { Subscription } from 'rxjs/Subscription';
import { MapperService } from './../../services/api/mapper-service';
import { PlatformExperience, CustomWorkExperience } from './../../interfaces/personal-interface';
import { Observable } from 'rxjs/Observable';
import { PersonalService } from './../../services/business/personal-service';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController } from 'ionic-angular';
import { AddWorkExperienceComponent } from '../../components/add-work-experience/add-work-experience';

@IonicPage()
@Component({
    selector: 'page-work-experience',
    templateUrl: 'work-experience.html',
})
export class WorkExperiencePage {

    type = 'platform';

    platformWorkExperience: Observable<PlatformExperience[]>;

    customWorkExperience: Observable<CustomWorkExperience[]>;

    subscriptions: Subscription[] = [];

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

            this.personal.handleWorkExperienceError(),

            this.personal.handlePlatformWorkExperienceError(),

            this.personal.handleAddWorkExperienceError(),

            this.personal.handleUpdateWorkExperienceError(),
        ];
    }

    updateWorkExperience(target: CustomWorkExperience): void {
        const modal = this.modalCtrl.create(AddWorkExperienceComponent, { form: target });

        modal.present();

        modal.onDidDismiss((data) => this.personal.updateWorkExperience(Observable.of({ ...data, id: target.id })));
    }

    deleteWorkExperience(target: CustomWorkExperience): void {
        this.personal.deleteWorkExperience(Observable.of(target.id));
    }

    addWorkExperience() {
        const modal = this.modalCtrl.create(AddWorkExperienceComponent);

        modal.present();

        modal.onDidDismiss((data) => this.personal.addWorkExperience(Observable.of(data)));
    }

    ionViewWillUnload(){
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
