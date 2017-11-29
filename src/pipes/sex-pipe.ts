import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sex'
})
export class SexPipe implements PipeTransform {
    transform(value: number): string {
        if (value === 0) return 'FEMALE';
        return 'MALE';
    }
}