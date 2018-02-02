import { Component, Input } from '@angular/core';

import { WorkFlow } from './../../interfaces/response-interface';

@Component({
    selector: 'work-flow-attach',
    templateUrl: 'work-flow-attach.html',
})
export class WorkFlowAttachComponent {
    @Input() workFlow: WorkFlow;

    constructor() {
    }

}
