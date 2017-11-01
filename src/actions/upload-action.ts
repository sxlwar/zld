import {Action} from '@ngrx/store';
import {UploadImageOptions} from '../interfaces/request-interface';

export const UPLOAD = 'UPLOAD';

export class UploadAction implements Action {
  readonly type = UPLOAD;

  constructor(public payload: UploadImageOptions) {
  }
}

export const UPLOAD_COMPLETE = "UPLOAD_COMPLETE";

export class UploadCompleteAction implements Action {
  readonly type = UPLOAD_COMPLETE;

  constructor(public payload: any) {
  }
}

export const UPLOAD_FAIL = 'UPLOAD_FAIL';

export class UploadFailAction implements Action {
  readonly type = UPLOAD_FAIL;

  constructor(public payload: any) {
  }
}

export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';

export class UploadSuccessAction implements Action {
  readonly type = UPLOAD_SUCCESS;

  constructor(public payload: any) {
  }
}

export type Actions = UploadAction
  | UploadCompleteAction
  | UploadFailAction
  | UploadSuccessAction;
