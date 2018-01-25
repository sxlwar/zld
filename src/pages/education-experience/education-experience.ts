import { LayoutService } from './../../services/utils/layout-service';
import { AddEducationComponent } from './../../components/add-education/add-education';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { PersonalService } from './../../services/business/personal-service';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController, ItemSliding, Item } from 'ionic-angular';
import { Education } from 'interfaces/response-interface';

@IonicPage()
@Component({
    selector: 'page-education-experience',
    templateUrl: 'education-experience.html',
})
export class EducationExperiencePage {

    subscriptions: Subscription[];

    educations: Observable<Education[]>;

    constructor(
        private navParams: NavParams,
        private personal: PersonalService,
        private modalCtrl: ModalController,
        private layout: LayoutService
    ) {
    }

    ionViewCanEnter() {
        const { view, opt } = this.navParams.get('permission');

        return opt || view;
    }

    ionViewDidLoad(): void {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.educations = this.personal.getOwnEducation();
    }

    launch() {
        this.subscriptions = [
            this.personal.getEducationList(),

            this.personal.handleEducationError(),

            this.personal.handleAddEducationError(),

            this.personal.handleDeleteEducationError(),

            this.personal.handleUpdateEducationError(),
        ];
    }

    addEducation(): void {
        const modal = this.modalCtrl.create(AddEducationComponent);

        modal.present();

        modal.onDidDismiss(data => data && this.subscriptions.push(this.personal.addEducation(Observable.of(data))));
    }

    updateEducation(target: Education): void {
        const modal = this.modalCtrl.create(AddEducationComponent, { form: target });

        modal.present();

        modal.onDidDismiss(data => data && this.subscriptions.push(this.personal.updateEducation(Observable.of({ ...data, id: target.id }))));
    }

    deleteEducation(target: Education): void {
        this.personal.deleteEducation(Observable.of(target.id));
    }

    openOption(itemSlide: ItemSliding, item: Item, event) {
        this.layout.openOption(itemSlide, item, event);
    }
    
    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());

        this.layout.activeItemSliding = null;
    }

}
