import { Component, Input , Output} from '@angular/core';
import { AttendanceInstant, AttendanceResult, Overtime } from '../../interfaces/response-interface';
import { EventEmitter } from 'events';
import { TimeService, Calendar } from '../../services/utils/time-service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class CalendarComponent implements OnInit{
  @Input() isMonth: boolean;

  @Input() attendanceRecords: AttendanceInstant[];

  @Input() attendanceResults: AttendanceResult[];

  @Input() overtimeRecords: Overtime[];

  @Output() showDetail = new EventEmitter();

  calendar: Calendar[];

  constructor(
    public timeService: TimeService
  ) {

  }

  ngOnInit() {
    this.calendar = this.timeService.createCalendar(new Date(), this.isMonth);
  }

}
