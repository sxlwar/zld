import { HomeInfoUpdateOptions } from './../../interfaces/request-interface';
import { MapperService } from './../../services/api/mapper-service';
import { Subject } from 'rxjs/Subject';
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

    updateFamily: Subject<Family> = new Subject();

    subscriptions: Subscription[] = [];

    disabled = true;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public personal: PersonalService,
        public modalCtrl: ModalController,
        public addressService: AddressService,
        public mapper: MapperService
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
                .zip(Observable.of(res), (addressArea, res) => ({ ...res, addressArea }))
            );
    }

    launch() {
        this.subscriptions = [
            this.personal.getHomeInfoList(),
            this.personal.updateHomeInfo(this.getOption())
        ]
    }

    getOption(): Observable<HomeInfoUpdateOptions> {
        return this.updateFamily
            .filter(value => !!value)
            .mergeMap(item =>
                this.addressService.getAddressName(
                    Observable.of(item.addressArea.split(' '))
                )
                    .map(res => this.mapper.transformFamilyOptions({ ...item, addressArea: res.join(' ') }))
            );
    }

}
