import {Component, EventEmitter, Input, Output} from '@angular/core';
import 'rxjs/add/operator/scan'

/**
 * Generated class for the FuzzySearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fuzzy-search',
  templateUrl: 'fuzzy-search.html'
})
export class FuzzySearchComponent {

  @Input() selectType: string;

  @Input() items: any[];

  @Output() confirm = new EventEmitter();

  @Output() search = new EventEmitter();

  @Output() select = new EventEmitter();

  constructor() {
  }

}
