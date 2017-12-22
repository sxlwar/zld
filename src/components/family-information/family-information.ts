import { addressAreaFormat } from './../../validators/validators';
import { Family } from './../../interfaces/personal-interface';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { relationShip } from '../../interfaces/request-interface';

@Component({
  selector: 'family-information',
  templateUrl: 'family-information.html'
})
export class FamilyInformationComponent {

  @Input() family: Family;

  @Input() disabled = true;

  @Output() updateHomeInfo: EventEmitter<Family> = new EventEmitter();
  
  marriage: number;

  relationShip = relationShip;

  constructor() {
  }

  updateAddress(address:string): void {
    if(addressAreaFormat.test(address)) {
      this.family.addressArea = address;
    }else {
      this.family.addressDetail = address;
    }
  }

}
