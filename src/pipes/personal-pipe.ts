import { degrees } from './../interfaces/request-interface';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'degree'
})
export class DegreePipe implements PipeTransform {
    transform(value: number): string {
        return degrees[value - 1];
    }
}