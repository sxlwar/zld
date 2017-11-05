import {Action} from '@ngrx/store';
import {IconState, State} from '../reducers/icons-reducer';

export const CREATE_ICONS_BAR = 'CREATE_ICONS_BAR';

export class CreateIconsBarAction implements Action {
  readonly type = CREATE_ICONS_BAR;

  constructor(public payload: string) {
  }
}

export const GET_ICONS_BAR = 'GET_ICONS_BAR';

export class GetIconsBarAction implements Action {
  readonly type = GET_ICONS_BAR;

  constructor(public payload: string) {
  }
}

export const SET_PERMISSION = 'SET_PERMISSION';

export class SetPermissionAction implements Action {
  readonly type = SET_PERMISSION;

  constructor(public payload: IconState) {
  }
}

export const ADD_ICONS_BAR = 'ADD_ICONS_BAR';

export class AddIconsBarAction implements Action {
  readonly type = ADD_ICONS_BAR;

  constructor(public payload: State) {
  }
}


export type Actions = CreateIconsBarAction
  | AddIconsBarAction
  | GetIconsBarAction
  | SetPermissionAction;
