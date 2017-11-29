import { Family } from './../../interfaces/personal-interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'family-information',
  templateUrl: 'family-information.html'
})
export class FamilyInformationComponent {

  @Input() family: Family;

  constructor() {
  }

}
