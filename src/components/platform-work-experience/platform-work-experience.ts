import { Component } from '@angular/core';

/**
 * Generated class for the PlatformWorkExperienceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'platform-work-experience',
  templateUrl: 'platform-work-experience.html'
})
export class PlatformWorkExperienceComponent {

  text: string;

  constructor() {
    console.log('Hello PlatformWorkExperienceComponent Component');
    this.text = 'Hello World';
  }

}
