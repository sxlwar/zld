import {Action} from '@ngrx/store';
import {State} from '../../reducers/reducer/icons-reducer';

export const ADD_ICONS_BAR = 'ADD_ICONS_BAR';

export class AddIconsBarAction implements Action {
  readonly type = ADD_ICONS_BAR;

  constructor(public payload: State) {
  }
}

export type Actions = AddIconsBarAction;
