import { UpdateFamilyInformationComponent } from './../../components/update-family-information/update-family-information';
import { MapperService } from './../../services/api/mapper-service';
import { AddressService } from './../../services/utils/address-service';
import { Subscription } from 'rxjs/Subscription';
import { Family } from './../../interfaces/personal-interface';
import { Observable } from 'rxjs/Observable';
import { PersonalService } from './../../services/business/personal-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-family-information',
    templateUrl: 'family-information.html',
})
export class FamilyInformationPage {

    family: Observable<Family>;

    subscriptions: Subscription[] = [];

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private personal: PersonalService,
        private modalCtrl: ModalController,
        private addressService: AddressService,
        private mapper: MapperService
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
            .mergeMap(res => this.addressService.getAddressCode(Observable.of(res.addressArea.split(' '))).map(res => res.join(' '))
                .zip(
                Observable.of(res),
                (addressArea, res) => ({ ...res, addressArea })
                )
            );
    }

    launch() {
        this.subscriptions = [
            this.personal.getHomeInfoList(),

            this.personal.handleHomeInfoError(),
        ];
    }

    updateHomeInfo(): void {
        this.subscriptions.push(
            this.family.take(1).subscribe(family => this.modalCtrl.create(UpdateFamilyInformationComponent, { family }).present())
        );
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
