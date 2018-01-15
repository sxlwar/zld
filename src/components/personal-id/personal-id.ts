import { PersonalId } from './../../interfaces/response-interface';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the PersonalIdComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'personal-id',
    templateUrl: 'personal-id.html'
})
export class PersonalIdComponent {

    @Input() PersonalId: PersonalId;

    constructor() {
    }

}
