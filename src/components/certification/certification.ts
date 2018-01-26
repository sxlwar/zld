import { Certificate } from './../../interfaces/response-interface';
import { Component, Input } from '@angular/core';
import { ENV } from '@app/env';

@Component({
    selector: 'certification',
    templateUrl: 'certification.html'
})
export class CertificationComponent {

    @Input() certification: Certificate[] = [];

    prefix = `http://${ENV.DOMAIN}/media/`;

    constructor() {
    }

}
