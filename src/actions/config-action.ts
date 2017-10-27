
import {Action} from '@ngrx/store';

export const SET_BACK_BUTTON_TEXT = 'SET_BACK_BUTTON_TEXT';

export const SET_PLATFORM_DIRECTION = 'SET_PLATFORM_DIRECTION';

export const GENERATE_RANDOM_CODE = 'GENERATE_RANDOM_CODE';

export class SetBackButtonTextAction implements Action{
  readonly type = SET_BACK_BUTTON_TEXT;

  constructor(public payload: string){
  }
}
export class SetPlatformDirectionAction implements Action {
  readonly type = SET_PLATFORM_DIRECTION;

  constructor(public payload: string) {
  }
}

export type Actions = SetBackButtonTextAction
  | SetPlatformDirectionAction;
