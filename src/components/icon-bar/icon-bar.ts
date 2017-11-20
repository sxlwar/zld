import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { IconState } from '../../reducers/reducer/icons-reducer';

@Component({
  selector: 'icon-bar',
  templateUrl: 'icon-bar.html'
})
export class IconBarComponent implements OnChanges {

  @Input() icons: IconState[];

  @Output() goTo = new EventEmitter();

  constructor() {
  }

  ngOnChanges($event) {
    console.log('icon bar value changed', $event);
  }

}
