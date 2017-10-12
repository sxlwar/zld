import {Action} from '@ngrx/store';

export const ADD_SLIDES = 'ADD_SLIDES';
export const ADD_SLIDE = 'ADD_SLIDE';
export const DELETE_SLIDE = 'DELETE_SLIDE';

export const SHOW_SKIP = 'SHOW_SKIP';
export const HIDE_SKIP = 'HIDE_SKIP';

export const SET_PLATFORM_DIRECTION = 'SET_PLATFORM_DIRECTION';

export class ShowSkipAction implements Action {
  readonly type = SHOW_SKIP;

  constructor(public payload: any) {
  };
}

export class HideSkipAction implements Action {
  readonly type = HIDE_SKIP;

  constructor(public payload: any) {
  };
}


export class AddSlideAction implements Action {
  readonly type = ADD_SLIDE;

  constructor(public payload: any) {
  };
}

export class DeleteSlideAction implements Action {
  readonly type = DELETE_SLIDE;

  constructor(public payload: any) {
  };
}

export class AddSlidesAction implements Action {
  readonly type = ADD_SLIDES;

  constructor(public payload: object[]) {
  };
}

export class SetPlatformDirection implements Action {
  readonly type = SET_PLATFORM_DIRECTION;

  constructor(public payload: string) {
  }
}

export type Actions =
  AddSlidesAction
  | AddSlideAction
  | DeleteSlideAction
  | ShowSkipAction
  | HideSkipAction
  | SetPlatformDirection;
