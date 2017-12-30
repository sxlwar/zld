import { Component, Input } from '@angular/core';

@Component({
  selector: 'subcontract-message',
  templateUrl: 'subcontract-message.html'
})
export class SubcontractMessageComponent {
  @Input() content: string[];

  constructor() {
  }

}
