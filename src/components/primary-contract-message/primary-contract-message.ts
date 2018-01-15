import { Component, Input } from '@angular/core';

@Component({
    selector: 'primary-contract-message',
    templateUrl: 'primary-contract-message.html'
})
export class PrimaryContractMessageComponent {
    @Input() content: string[];

    constructor() {
    }

}
