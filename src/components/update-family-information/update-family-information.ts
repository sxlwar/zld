import { PersonalService } from './../../services/business/personal-service';
import { MapperService } from './../../services/api/mapper-service';
import { AddressService } from './../../services/utils/address-service';
import { HomeInfoUpdateOptions } from './../../interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Family } from './../../interfaces/personal-interface';
import { NavParams, ViewController } from 'ionic-angular';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'update-family-information',
    templateUrl: 'update-family-information.html'
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

            this.updateFamily.zip(this.personal.getHomeInfoUpdateSuccessResponse(), (_1, _2) => true).subscribe(_ => this.dismiss()),

            this.personal.handleHomeInfoError(),
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