import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'inOut'
})
export class InOutPipe implements PipeTransform {
    transform(value: number): string {
        if (value === 1) return 'IN';

        if (value === 2) return 'OUT';

        return 'CAN_NOT_READ';
    }
}