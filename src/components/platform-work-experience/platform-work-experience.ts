import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { PlatformExperience } from '../../interfaces/personal-interface';

@Component({
    selector: 'platform-work-experience',
    templateUrl: 'platform-work-experience.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformWorkExperienceComponent {

    @Input() experience: PlatformExperience;

    constructor() {

    }

}
