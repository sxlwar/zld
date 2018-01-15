import { Certificate } from './../../interfaces/response-interface';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'certification',
    templateUrl: 'certification.html'
})
export class CertificationComponent {

    @Input() certification: Certificate[] = [];

    constructor() {
    }

}
