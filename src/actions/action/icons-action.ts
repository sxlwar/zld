import { Action } from '@ngrx/store';
import { State } from '../../reducers/reducer/icons-reducer';
import { Badge } from '../../interfaces/icon-interface';

export const ADD_ICONS_BAR = 'ADD_ICONS_BAR';

export class AddIconsBarAction implements Action {
  readonly type = ADD_ICONS_BAR;

  constructor(public payload: State) {
  }
}

export const ADD_BADGE = 'ADD_BADGE';

export class AddBadgeAction implements Action {
  readonly type = ADD_BADGE;

  constructor(public payload: Badge) {}
}

export type Actions = AddIconsBarAction
 | AddBadgeAction;
