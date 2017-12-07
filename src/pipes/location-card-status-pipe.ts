import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
    name: 'locationCardStatus'
})
export class LocationCardStatusPipe implements PipeTransform {
    transform(value: number): string {
        if(value === 0) return 'OFFLINE';
        return 'ONLINE';
    }
}