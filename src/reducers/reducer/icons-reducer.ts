import * as actions from '../../actions/action/icons-action';
import {PermissionResult} from '../../interfaces/permission-interface';

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


export function getIconReducer(state: State, path: string | string []): IconState {

  let result = null;

  if(Array.isArray(path)){
    const target = state[path[0]];

    result =  target.find(icon => icon.icon === path[1]);
  }

  if(typeof path === 'string'){

    for(let prop in state){
      if(!state.hasOwnProperty(prop)) continue;

      const target = state[prop];
      
      result = target.find(icon => icon.icon === path);

      if(result) break;
    }

  }

  return result;
}


export const getSpecificIcon = (path: string | string[]) => (state: State) => getIconReducer(state, path);