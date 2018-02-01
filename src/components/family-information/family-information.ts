import { Component, EventEmitter, Input, Output } from '@angular/core';

import { relationShip } from '../../interfaces/request-interface';
import { Family } from './../../interfaces/personal-interface';
import { addressAreaFormat } from './../../validators/validators';

@Component({
    selector: 'family-information',
    templateUrl: 'family-information.html',
})
export class FamilyInformationComponent {

    @Input() family: Family;

    @Input() disabled = true;

    @Output() updateHomeInfo: EventEmitter<Family> = new EventEmitter();

    relationShip = relationShip;

    constructor() {
    }

    updateAddress(address: string): void {
        if (addressAreaFormat.test(address)) {
            this.family.addressArea = address;
        } else {
            this.family.addressDetail = address;
        }
    }

}
