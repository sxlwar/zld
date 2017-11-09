//region
import {Injectable} from '@angular/core';
import {HttpService} from './http-service';
import {Observable} from 'rxjs/Observable';
import {UploadImageOptions} from '../../interfaces/request-interface';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/index-reducer';
import {UploadAction, UploadCompleteAction} from '../../actions/upload-action';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
//endregion

@Injectable()
export class UploadService {

  constructor(private httpService: HttpService,
              private store: Store<AppState>) {
  }

  uploadImagesProcessor(source: Observable<UploadImageOptions>, command: string): Observable<any> {

    this.store.dispatch(new UploadAction());

    return source
      .reduce((acc, cur) => {
        acc.push(cur);
        return acc;
      }, [])
      .map(options => options.map((option) => this.httpService
        .upload(Observable
          .of(option)
          .map(partition => Object.assign(partition, {command}))
        ))
      )
      .mergeMap(imageObs => Observable.forkJoin(imageObs))
      .do(responses => {
        const payload = responses.map(response => JSON.parse(response.response));
        this.store.dispatch(new UploadCompleteAction(payload));
      });
  }
}
