import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Company} from '../../interfaces/response-interface';
import 'rxjs/add/operator/scan'
import {AppState} from '../../reducers/index-reducer';
import {Store} from '@ngrx/store';
import {SelectCompanyAction} from '../../actions/search-action';

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

  @Input() items: Company[];

  @Output() confirm = new EventEmitter();

  @Output() search = new EventEmitter();

  constructor(public store: Store<AppState>) {
  }

  setRadioResult(id: number) {
    this.store.dispatch(new SelectCompanyAction(Number(id)))
  }
}
