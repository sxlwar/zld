import { Component, Input } from '@angular/core';

import { WorkFlow } from './../../interfaces/response-interface';

@Component({
    selector: 'work-flow-time-line',
    templateUrl: 'work-flow-time-line.html',
})
export class WorkFlowTimeLineComponent {
    @Input() workFlow: WorkFlow;

    constructor() {

    }

}
