import { Pipe, PipeTransform } from '@angular/core';

import { degrees } from './../interfaces/request-interface';

@Pipe({
    name: 'degree',
})
export class DegreePipe implements PipeTransform {
    transform(value: number): string {
        return degrees[value - 1];
    }
}

export enum WorkTypeIcon {
    pile = 1,
    ordinary,
    concrete,
    bricklayer,
    plasterer,
    rebar,
    frame2,
    frame,
    electrician,
    weakElectrician,
    plumber,
    ventilator,
    decorator,
    woodworker,
    welder,
    waterproof,
    stonecutter,
    quarryman,
    rigger,
    signalman,
    disassembly,
    pitch,
    carve,
    greenman,
    woodworker2,
    plumber2,
    blender,
    cargoLift,
    lift,
    excavator,
    crane3,
    crane,
    crane2,
    pitch2,
    roadRoller,
    soilShifter,
    truck,
    blaster,
}

@Pipe({
    name: 'workType',
})
export class WorkTypePipe implements PipeTransform {
    transform(value: number): string {
       return  WorkTypeIcon[value];
    }
}
