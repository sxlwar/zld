import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InfiniteScroll } from 'ionic-angular';

import { AttendanceState } from './../../interfaces/attendance-interface';
import { AttendanceResult } from './../../interfaces/response-interface';

@Component({
    selector: 'attendance-list',
    templateUrl: 'attendance-list.html',
})
export class AttendanceListComponent {

    @Input() list: AttendanceResult[] = [];

    @Input() total: number;

    @Input() operate = false;

    @Input() haveMoreData = true;

    @Input() operateButtonText = 'MODIFY_ATTENDANCE';

    @Output() showDetail: EventEmitter<AttendanceResult> = new EventEmitter();

    @Output() getNextPage: EventEmitter<InfiniteScroll> = new EventEmitter();

    @Output() audit: EventEmitter<AttendanceResult[]> = new EventEmitter();

    allSelected = false

    constructor() {

    }

    checkAllSelectedFlag(isSelected: boolean) {
        if (!isSelected) {
            this.allSelected = false;
        } else {
            this.allSelected = this.list.every(item => item.selected);
        }
    }

    toggleAllSelected(isSelected: boolean) {
        this.list.forEach(item => {
            if (item.confirm === AttendanceState.unconfirmed) {
                item.selected = isSelected
            }
        });
    }

    operateAttendance() {
        this.list.some(item => item.selected) && this.audit.next(this.list.filter(item => item.selected));
    }
}
