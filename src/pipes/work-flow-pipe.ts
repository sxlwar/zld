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
            return 'danger';
        }

    }
}