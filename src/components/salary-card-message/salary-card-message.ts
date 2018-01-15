import { Component, Input } from '@angular/core';

@Component({
    selector: 'salary-card-message',
    templateUrl: 'salary-card-message.html'
})
export class SalaryCardMessageComponent {
    @Input() content: string;

    constructor() {
    }

}
