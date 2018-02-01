import { Component, Input } from '@angular/core';
import { ENV } from '@app/env';

import { Certificate } from './../../interfaces/response-interface';

@Component({
    selector: 'certification',
    templateUrl: 'certification.html',
})
export class CertificationComponent {

    @Input() certification: Certificate[] = [];

    prefix = `http://${ENV.DOMAIN}/media/`;

    constructor() {
    }

}
