import { CustomWorkExperience } from './../../interfaces/personal-interface';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Generated class for the WorkExperienceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'work-experience',
  templateUrl: 'work-experience.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkExperienceComponent {

  @Input() experience: CustomWorkExperience;

  constructor() {
  }

}
