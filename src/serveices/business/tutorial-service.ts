//region
import {Slides} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {AddSlidesAction, ToggleSkipAction} from '../../actions/tutorial-action';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/zip'
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/mergeAll';
import {zipObject} from 'lodash';
import {Slide} from '../../interfaces/tutorial-interface';
import {State} from '../../reducers/tutorial-reducer';
import {Subscription} from 'rxjs/Subscription';
//endregion

@Injectable()
export class TutorialService {
  constructor(
    public store: Store<State>,
    private translate: TranslateService
  ) {

  }

  slideChange(slides: Slides) {
    this.store.dispatch(new ToggleSkipAction(!slides.isEnd()));
  }

  resetSkipState(){
    this.store.dispatch(new ToggleSkipAction(true));
  }

  getSlides(keys: string[], images: string[]): Subscription{
    let translateResult = {};

    this.translate.get(keys).subscribe(result => translateResult = result);

    /**
     *There is a bug of typescript when use spread operator instead of apply method. https://github.com/Microsoft/TypeScript/issues/4130
     **/
    return this.getKeyOfOverview(keys)
      .zip(this.getValueOfOverview(translateResult, keys))
      .map((ary: Array<Array<string>>, index: number) => Object.assign({image: images[index]}, zipObject.apply(zipObject, ary)))
      .reduce((acc: Slide[], obj: Slide) => acc.concat([obj]), [])
      .subscribe((value: Slide[]) => this.store.dispatch(new AddSlidesAction(value)));
  }

  private getKeyOfOverview(keys: string[]): Observable<string[]> {
    return Observable
      .from(keys)
      .map(key => Observable.from(key.split('_')).last().map(item => item.toLowerCase()))
      .mergeAll()
      .bufferCount(2);
  }

  private getValueOfOverview(source: Object, keys: string[]): Observable<string[]> {
    return Observable
      .from(keys)
      .map(key => source[key])
      .bufferCount(2);
  }
}
