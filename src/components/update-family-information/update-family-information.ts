import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { Family } from './../../interfaces/personal-interface';
import { HomeInfoUpdateOptions } from './../../interfaces/request-interface';
import { MapperService } from './../../services/api/mapper-service';
import { PersonalService } from './../../services/business/personal-service';
import { AddressService } from './../../services/utils/address-service';

@Component({
    selector: 'update-family-information',
    templateUrl: 'update-family-information.html',
})
export class UpdateFamilyInformationComponent implements OnInit, OnDestroy {

    family: Family;

    updateFamily: Subject<Family> = new Subject();

    subscriptions: Subscription[] = [];

    constructor(
        private navParams: NavParams,
        private address: AddressService,
        private mapper: MapperService,
        private personal: PersonalService,
        private viewCtrl: ViewController
    ) {
    }

    ngOnInit() {
        this.family = <Family>this.navParams.get('family');

        this.subscriptions = [
            this.personal.updateHomeInfo(this.getOption()),

            this.updateFamily.zip(this.personal.getHomeInfoUpdateSuccessResponse()).subscribe(_ => this.dismiss()),

            this.personal.handleUpdateHomeInfoError(),
        ];
    }

    getOption(): Observable<HomeInfoUpdateOptions> {
        return this.updateFamily
            .filter(value => !!value)
            .mergeMap(item => this.address.getAddressName(Observable.of(item.addressArea.split(' ')))
                .map(res => this.mapper.transformFamilyOptions({ ...item, addressArea: res.join(' ') }))
            );
    }

    dismiss(): void {
        this.viewCtrl.dismiss();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
