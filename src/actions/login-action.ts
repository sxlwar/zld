import {Action} from '@ngrx/store';

export const SHOW_SPECIFIC_SLIDE = 'SHOW_SPECIFIC_SLIDE';

export const SHOW_SPECIFIC_INNER_SLIDE = 'SHOW_SPECIFIC_INNER_SLIDE';

export class ShowSpecificSlide implements Action {
  readonly type = SHOW_SPECIFIC_SLIDE;

  constructor(public payload: number) {
  }
}

export class ShowSpecificInnerSlide implements Action {
  readonly type = SHOW_SPECIFIC_INNER_SLIDE;

  constructor(public payload: number) {
  }
}

export type Actions = ShowSpecificSlide
  | ShowSpecificInnerSlide;
