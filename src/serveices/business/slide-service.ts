import {Platform, Slides} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {AddSlidesAction, HideSkipAction, SetPlatformDirection, ShowSkipAction} from '../../actions/slide-action';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/zip'
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/mergeAll';
import {zipObject, concat, assign} from 'lodash';
import {ShowSkip, Slide} from '../../interfaces/slide-interface';

@Injectable()
export class SlideService {
  constructor(
    private platform: Platform,
    public store: Store<ShowSkip | Slide>,
    private translate: TranslateService
  ) {
    store.dispatch(new SetPlatformDirection(platform.dir()));
  }

  slideChange(slides: Slides) {
    if (slides.isEnd()) {
      this.hideSkip();
    } else {
      this.showSkip();
    }
  }

  showSkip() {
    this.store.dispatch(new ShowSkipAction(null));
  }

  hideSkip() {
    this.store.dispatch(new HideSkipAction(null));
  }

  getSlides(keys: string[], images: string[]) {
    let translateResult = {};

    this.translate.get(keys).subscribe(result => translateResult = result);

    /**
     *There is a bug of typescript when use spread operator instead of apply method. https://github.com/Microsoft/TypeScript/issues/4130
     **/
    this.getKeyOfOverview(keys)
      .zip(this.getValueOfOverview(translateResult, keys))
      .map((ary: Array<Array<string>>, index: number) => assign({image: images[index]}, zipObject.apply(zipObject, ary)))
      .reduce((acc: Slide[], obj: Slide) => concat(acc, obj), [])
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
