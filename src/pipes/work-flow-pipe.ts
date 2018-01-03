import { TaskStatus } from './../interfaces/request-interface';
import { WorkerContractSimple } from './../interfaces/response-interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'names'
})
export class NamesPipe implements PipeTransform {
    transform(source: WorkerContractSimple[]): string {
        return source.map(item => item.worker__employee__realname).join(',');
    }
}

@Pipe({
    name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {
    transform(source: string): string {
        if (source === TaskStatus.processing) {
            return 'help-circle';
        } else {
            return 'checkmark-circle';
        }
    }
}

@Pipe({
    name: 'taskStatusColor'
})
export class TaskStatusColorPipe implements PipeTransform {
    transform(source: string): string {
        if (source === TaskStatus.processing) {
            return 'primary';
        } else {
            return 'secondary';
        }

    }
}

@Pipe({
    name: 'overtimePay'
})
export class OvertimePayPipe implements PipeTransform {
    transform(source: string): string {
        return `按${source}工资结算`;  // 懒的处理后台的SB字段了, 一直传你妈的中文。
    }
}