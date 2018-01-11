import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sex'
})
export class SexPipe implements PipeTransform {
    transform(value: number): string {
        return value === 0 ? 'FEMALE' : 'MALE';
    }
}