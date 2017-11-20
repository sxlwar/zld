import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'badge' 
})
export class BadgePipe implements PipeTransform{
    transform(value: number): string {
        if(value > 99) return '99+';
        return '' + value;
    }
}
