


import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'positiveInteger'
})
export class PositiveIntegerPipe implements PipeTransform{
  transform(value: number): number {
    return Math.abs(value);
  }
}
