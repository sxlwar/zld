import { CustomWorkExperience } from './../../interfaces/personal-interface';
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'work-experience',
    templateUrl: 'work-experience.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkExperienceComponent {

    @Input() experience: CustomWorkExperience[];

    @Output() updateExperience: EventEmitter<CustomWorkExperience> = new EventEmitter();

    @Output() deleteExperience: EventEmitter<CustomWorkExperience> = new EventEmitter();

    constructor() {
    }

}
