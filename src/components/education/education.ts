import { Education } from './../../interfaces/response-interface';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the EducationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'education',
    templateUrl: 'education.html'
})
export class EducationComponent {

    @Input() education: Education[] = [];

    constructor() {
    }

}
