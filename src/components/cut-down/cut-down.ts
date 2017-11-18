import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/range';

/**
 * Generated class for the CutDownComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cut-down',
  templateUrl: 'cut-down.html'
})
export class CutDownComponent implements OnInit {

  timer$: Observable<number>;

  @Output() request = new EventEmitter();

  timing$: Observable<boolean>;

  constructor() {
  }

  ngOnInit() {
    this.timer$ = this.request.switchMap(() => Observable.interval(1000).take(60).map(num => 59 - num));
    this.timing$ = this.timer$.map(value => value > 0);
  }
}
