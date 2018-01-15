import { Component, Input } from '@angular/core';
import { WorkerContractMessage } from '../../interfaces/response-interface';

@Component({
    selector: 'worker-contract-message',
    templateUrl: 'worker-contract-message.html'
})
export class WorkerContractMessageComponent {

    @Input() content: WorkerContractMessage;

    constructor() {
    }

}
