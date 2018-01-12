import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'priceUnit'
})
export class PriceUnitPipe implements PipeTransform {
    constructor(
        public translate: TranslateService
    ){

    }

    transform(value: number, type: string): Observable<string> {
        if(!value) return;
        
        const map = {
            timer: 'TIME_PAY_UNIT',
            piecer: 'PIECE_PAY_UNIT'
        }
    
        return this.translate.get(map[type]).map(unit => value + unit);

    }
}