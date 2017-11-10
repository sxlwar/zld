import * as actions from '../actions/icons-action';
import {PermissionResult} from '../interfaces/permission-interface';

export interface IconState {
  text: string;
  icon: string;
  color: string;
  permission: PermissionResult;
  page: string;
}

export interface State {
  [name: string]: IconState[]
}

export const initialState: State = {};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type){
    case actions.ADD_ICONS_BAR:
      return {...state, ...action.payload};

    default:
      return state;
  }
}
