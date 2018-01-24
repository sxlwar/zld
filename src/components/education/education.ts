import { Component, Input } from '@angular/core';
import { Education } from '../../interfaces/personal-interface';

@Component({
    selector: 'education',
    templateUrl: 'education.html'
})
export class EducationComponent {

    @Input() education: Education[] = [];

    constructor() {
    }

}
