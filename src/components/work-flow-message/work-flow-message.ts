import { Component, Input } from '@angular/core';
import { WorkFlowContentMessage } from '../../interfaces/response-interface';

@Component({
  selector: 'work-flow-message',
  templateUrl: 'work-flow-message.html'
})
export class WorkFlowMessageComponent {
  @Input() content: WorkFlowContentMessage;
  
  @Input() time: string;
  
  constructor() {
  }

}
