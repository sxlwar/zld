import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../serveices/api/http-service';
import {ResponseAction} from '../interfaces/response-interface';
import {
  CERTIFICATE,
  CertificateAction,
  CertificateFailAction,
  CertificateSuccessAction
} from '../actions/certificate-action';
import {WebsocketService} from '../serveices/api/websocket-service';
import {Command} from '../serveices/api/command';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/reduce';
import {Injectable} from '@angular/core';

@Injectable()
export class UploadEffect {
  // @Effect()
  // uploadImage$: Observable<ResponseAction> = this.actions$
  //   .ofType(UPLOAD)
  //   .mergeMap((action: UploadAction) => this.http
  //     .upload(Observable
  //       .of(action.payload)
  //       .map(partition => Object.assign(partition, {command: this.command.uploadPersonalIdImage}))
  //     )
  //     .map((result: FileUploadResult) => {
  //       const response = JSON.parse(result.response);
  //       return result.responseCode === 200 && response.code === 1000;
  //     })
  //   )
  //   .map(res => {
  //     console.log(res);
  //     if (res) {
  //       return new UploadSuccessAction({uploading: false, uploadedState: true})
  //     } else {
  //       return new UploadFailAction({uploading: false, uploadedState: false})
  //     }
  //   });

  @Effect()
  certificate$: Observable<ResponseAction> = this.actions$
    .ofType(CERTIFICATE)
    .mergeMap((action: CertificateAction) => {
        console.log(action);
        return this.ws
          .send(this.command.updatePersonalIdImage(action.payload))
          .takeUntil(this.actions$.ofType(CERTIFICATE))
          .map(msg => msg.isError ? new CertificateFailAction(msg.data) : new CertificateSuccessAction(msg.data))
          .catch(error => of(error))
      }
    );

  constructor(public actions$: Actions,
              public http: HttpService,
              public ws: WebsocketService,
              public command: Command) {
  }
}


