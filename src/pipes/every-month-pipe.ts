import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'everyMonth'
})
export class EveryMonthPipe implements PipeTransform {
    transform(value: number): string {
        return '每月' + value + '号';
    }
}