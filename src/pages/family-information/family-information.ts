import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { UpdateFamilyInformationComponent } from './../../components/update-family-information/update-family-information';
import { Family } from './../../interfaces/personal-interface';
import { PersonalService } from './../../services/business/personal-service';
import { AddressService } from './../../services/utils/address-service';

@IonicPage()
@Component({
    selector: 'page-family-information',
    templateUrl: 'family-information.html',
})
export class FamilyInformationPage {

    family: Observable<Family>;

    subscriptions: Subscription[] = [];

    update$: Subject<boolean> = new Subject();

    constructor(
        private navParams: NavParams,
        private personal: PersonalService,
        private modalCtrl: ModalController,
        private addressService: AddressService
    ) {
    }

    ionViewCanEnter() {
        const { view, opt } = this.navParams.get('permission');

        return opt || view;
    }

    ionViewDidLoad() {
        this.initialData();

        this.launch();
    }

    initialData() {
        this.family = this.personal.getOwnFamily()
            .mergeMap(res => this.addressService.getAddressCode(Observable.of(res.addressArea.split(' ')))
                .map(res => res.join(' '))
                .zip(
                Observable.of(res),
                (addressArea, res) => ({ ...res, addressArea })
                )
            );
    }

    launch() {
        this.subscriptions = [
            this.personal.getHomeInfoList(),

            this.update$.withLatestFrom(this.family, (_, family) => family)
                .subscribe(family => this.modalCtrl.create(UpdateFamilyInformationComponent, { family }).present()),

            this.personal.handleHomeInfoError(),
        ];
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
