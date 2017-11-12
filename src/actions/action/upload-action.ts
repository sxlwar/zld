import {Action} from '@ngrx/store';

export const UPLOAD = 'UPLOAD';

export class UploadAction implements Action {
  readonly type = UPLOAD;

  constructor() {
  }
}

export const UPLOAD_COMPLETE = "UPLOAD_COMPLETE";

export class UploadCompleteAction implements Action {
  readonly type = UPLOAD_COMPLETE;

  constructor(public payload: any[]) {
  }
}

export type Actions = UploadAction
  | UploadCompleteAction;
