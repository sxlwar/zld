import { Component, Input } from '@angular/core';

import { Certification } from './../../interfaces/personal-interface';

@Component({
    selector: 'certification',
    templateUrl: 'certification.html',
})
export class CertificationComponent {

    @Input() certification: Certification[] = [];

    constructor() {
    }

}
