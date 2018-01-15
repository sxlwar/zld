import { Component, Input } from '@angular/core';

@Component({
    selector: 'salary-message',
    templateUrl: 'salary-message.html'
})
export class SalaryMessageComponent {
    @Input() content: string;

    constructor() {
    }

}
