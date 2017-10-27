import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Generated class for the ImageVerificationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'image-verification',
  templateUrl: 'image-verification.html'
})
export class ImageVerificationComponent {

  @Input() src: string;
  @Output() update = new EventEmitter();

  constructor() {
  }
}
