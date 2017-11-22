import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconState } from '../../reducers/reducer/icons-reducer';

@Component({
  selector: 'icon-bar',
  templateUrl: 'icon-bar.html'
})
export class IconBarComponent {

  @Input() icons: IconState[];

  @Output() goTo = new EventEmitter();

  constructor() {
  }

}
