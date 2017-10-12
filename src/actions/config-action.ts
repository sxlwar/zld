
import {Action} from '@ngrx/store';

export const SET_BACK_BUTTON_TEXT = 'SET_BACK_BUTTON_TEXT';

export class SetBackButtonText implements Action{
  readonly type = SET_BACK_BUTTON_TEXT;

  constructor(public payload: string){
  }
}

export type Actions = SetBackButtonText;
