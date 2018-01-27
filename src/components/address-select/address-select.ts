import { TipService } from './../../services/tip-service';
import { AddressColumn, Column, AddressService } from './../../services/utils/address-service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'address-select',
    templateUrl: 'address-select.html'
})
export class AddressSelectComponent {
    @Input() addressDetail: string;

    @Input() disabled = false;

    @Input() selectedArea: string;

    @Output() addressChange: Subject<string> = new EventEmitter();

    address: Observable<AddressColumn<Column>[]>;

    constructor(
        private addressService: AddressService,
        private tip: TipService
    ) {
        this.address = this.addressService.address;
    }

    modifyAddress() {
        const alert = this.tip.modifyAddressDetail();

        alert.present();

        alert.onDidDismiss(data => {
            if (data.detail) {
                this.addressChange.next(data.detail);
                this.addressDetail = data.detail;
            }
        });
    }

}
