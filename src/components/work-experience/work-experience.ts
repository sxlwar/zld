import { Component } from '@angular/core';

/**
 * Generated class for the WorkExperienceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'work-experience',
  templateUrl: 'work-experience.html'
})
export class WorkExperienceComponent {

  text: string;

  constructor() {
    console.log('Hello WorkExperienceComponent Component');
    this.text = 'Hello World';
  }

}
