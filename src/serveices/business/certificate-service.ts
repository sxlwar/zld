import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AppState,
  getCertificate,
  selectCertificateResult,
  selectRealname,
  selectSid
} from '../../reducers/index-reducer';
import {Observable} from 'rxjs/Observable';
import {CertificateFormModel} from '../api/mapper-service';
import {ProcessorService} from '../api/processor-service';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/zip';
import {CertificateOptions, UploadImageOptions} from '../../interfaces/request-interface';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/withLatestFrom';
import {ErrorService} from '../errors/error-service';

@Injectable()
export class CertificateService {
  subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>,
              private process: ProcessorService,
              private errorService: ErrorService) {
  }

  get certificateResult(): Observable<boolean> {
    const certificateInfo$ = this.store.select(getCertificate);

    const subscription = this.errorService.handleErrorInSpecific(certificateInfo$, 'CER_CERTIFICATE_FAIL');

    this.subscriptions.push(subscription);

    return this.store.select(selectCertificateResult);
  }

  getRealname(): Observable<string> {
    return this.store.select(selectRealname);
  }

  certificate(source: CertificateFormModel): void {

    const sid$ = this.store.select(selectSid);

    const {realname, num, imageface, imageback} = this.process.certificateForm(source);

    const upload$ = Observable.of(
      {type: 'imageback', file: imageface},
      {type: 'imageface', file: imageback}
    ).withLatestFrom(
      sid$,
      (option, sid) => Object.assign(option, {sid})
    ) as Observable<UploadImageOptions>;

    const option$ = Observable.zip(
      sid$,
      Observable.of({realname, num}),
      (sid, other) => (Object.assign({sid}, other))
    ) as Observable<CertificateOptions>;

    const certificate$$ = this.process.certificateProcessor(option$, upload$);

    this.subscriptions.push(certificate$$);
  }

  unSubscribe() {
    this.subscriptions.forEach(unSub => unSub.unsubscribe());
  }
}
