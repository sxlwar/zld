import { Component, Input } from '@angular/core';
import { AttendanceMessage } from '../../interfaces/response-interface';

@Component({
  selector: 'attendance-message',
  templateUrl: 'attendance-message.html'
})
export class AttendanceMessageComponent {
  @Input() content: AttendanceMessage;

  constructor() {
  }

}