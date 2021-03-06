import { Pipe, PipeTransform } from '@angular/core';

import { AttendanceState } from './../interfaces/response-interface';

@Pipe({
    name: 'attendanceState',
})
export class AttendanceStatePipe implements PipeTransform {
    transform(value: number): string {
        return AttendanceState[value];
    }
}

export enum AttendanceStateIcon {
    'help-circle',
    'checkmark-circle',
    time,
}

@Pipe({
    name: 'attendanceStateIcon',
})
export class AttendanceStateIconPipe implements PipeTransform {
    transform(value: number): string {
        return AttendanceStateIcon[value];
    }
}
