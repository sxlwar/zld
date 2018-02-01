import { Pipe, PipeTransform } from '@angular/core';

import { ContractTypeOfResponse } from './../interfaces/response-interface';

@Pipe({
    name: 'workerContractType',
})
export class WorkerContractTypePipe implements PipeTransform {
    transform(type: string): string {
        return type === ContractTypeOfResponse.timer ? 'WORK_TIME_PAY' : 'WORK_PIECE_PAY';
    }
}
