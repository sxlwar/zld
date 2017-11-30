import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'priceUnit'
})
export class PriceUnitPipe implements PipeTransform {
    transform(value: number, type: string): string {
        const result = type === 'timer' ? ' 元/小时': ' 元/件';
        
        return value + result;
    }
}