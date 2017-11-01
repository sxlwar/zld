import {Action} from '@ngrx/store';
import {CertificateOptions} from '../interfaces/request-interface';
import {CertificateResponse} from '../interfaces/response-interface';

export const CERTIFICATE = 'CERTIFICATE';

export class CertificateAction implements Action {
  readonly type = CERTIFICATE;

  constructor(public payload: CertificateOptions) {
  }
}

export const CERTIFICATE_FAIL = 'CERTIFICATE_FAIL';

export class CertificateFailAction implements Action {
  readonly type = CERTIFICATE_FAIL;

  constructor(public payload: CertificateResponse) {
  }
}

export const CERTIFICATE_SUCCESS = 'CERTIFICATE_SUCCESS';

export class CertificateSuccessAction implements Action {
  readonly type = CERTIFICATE_SUCCESS;

  constructor(public payload: CertificateResponse) {
  }
}

export type Actions = CertificateAction
  | CertificateFailAction
  | CertificateSuccessAction;
