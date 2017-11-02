import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AppState,
  getCertificate,
  selectCertificateResult,
  selectRealname,
  selectSid, selectUploadResult
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

  /*===============================================No side Effect===================================================*/
  /**
   * @method certificateResult realname
   * @description Give the components information that they want to know.
   * */
  get certificateResult(): Observable<boolean> {
    const certificateInfo$ = this.store.select(getCertificate);

    const certificateSubscription = this.errorService.handleErrorInSpecific(certificateInfo$, 'CER_CERTIFICATE_FAIL');

    this.subscriptions.push(certificateSubscription);

    this.monitorUploadResult();

    return this.store.select(selectCertificateResult);
  }

  get realname(): Observable<string> {
    return this.store.select(selectRealname);
  }

  /**
   * @description
   * Monitor the result of upload images and handle error when upload fail.
   * */
  private monitorUploadResult(): void {
    const errorMessage = this.store.select(selectUploadResult)
      .mergeMap(data => Observable
        .from(data)
        .filter(data => data.code !== 1000)
        .map(data => data.msg)
        .distinctUntilChanged()
        .reduce((acc, cur) => {
          acc.errorMessage += cur;
          return acc;
        }, {errorMessage: ''})
      );

    const uploadSubscription = this.errorService.handleErrorInSpecific(errorMessage, 'UPLOAD_FAIL_TIP');

    this.subscriptions.push(uploadSubscription);
  }

  /*===============================================Side Effect===================================================*/

  /**
   * @description
   * Handle the certification event from UI. The form's data is converted into two parts,
   * part of which is used to upload the image, and the other part is used when the authentication interface is called
   * */
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

  /*=============================================refuse cleaning====================================================*/

  unSubscribe() {
    this.subscriptions.forEach(unSub => unSub.unsubscribe());
  }
}
