import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Generated class for the IconBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export interface Icon {
  text: string;
  icon: string;
}
@Component({
  selector: 'icon-bar',
  templateUrl: 'icon-bar.html'
})
export class IconBarComponent {

  @Input() icons: Icon[];

  @Output() goTo = new EventEmitter();


  constructor() {
  }

}
