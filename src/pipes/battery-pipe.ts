import { PipeTransform, Pipe } from '@angular/core';

const warningValue = 20;

@Pipe({
    name: 'battery'
})
export class BatteryPipe implements PipeTransform {
    transform(value: number): string {
        if (value > warningValue) return `linear-gradient(to right, #32db64 ${value}%,white ${value}%)`;
        return `linear-gradient(to right, #f53d3d ${value}%,white ${value}%)`;
    }
}

@Pipe({
    name: 'percentBattery'
})
export class PercentBatteryPipe implements PipeTransform {
    transform(value: number): string {
        if (!value) return '0';
        return value + '%'
    }
}

@Pipe({
    name: 'isLowPower'
})
export class IsLowPowerPipe implements PipeTransform {
    transform(value: number): boolean {
        return value < warningValue;
    }
}