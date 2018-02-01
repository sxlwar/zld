import { Component, Input } from '@angular/core';
import { ENV } from '@app/env';

import { WorkFlow } from './../../interfaces/response-interface';

@Component({
    selector: 'work-flow-attach',
    templateUrl: 'work-flow-attach.html',
})
export class WorkFlowAttachComponent {
    @Input() workFlow: WorkFlow;

    imagePrefix = `http://${ENV.DOMAIN}/media/`;

    constructor() {
    }

}
