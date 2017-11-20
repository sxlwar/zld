import * as actions from '../../actions/action/icons-action';
import { PermissionResult } from '../../interfaces/permission-interface';

export interface IconState {
  text: string;
  icon: string;
  color: string;
  permission: PermissionResult;
  page: string;
  badge?: number;
}

export interface State {
  [name: string]: IconState[]
}

export const initialState: State = {};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ADD_ICONS_BAR:
      return { ...state, ...action.payload };

    case actions.ADD_BADGE: {
      const { count, path } = action.payload;

      const [root, name] = path;

      const index = state[root].findIndex(icon => icon.icon === name);

      state[root][index] = Object.assign({}, state[root][index], {badge: count});
    
      return state;
    }

    default:
      return state;
  }
}


export function getIconReducer(state: State, path: string | string[]): IconState {

  let result = null;

  if (Array.isArray(path)) {
    const [root, name] = path;

    result = state[root].find(icon => icon.icon === name);
  }

  if (typeof path === 'string') {

    for (let prop in state) {
      if (!state.hasOwnProperty(prop)) continue;

      const target = state[prop];

      result = target.find(icon => icon.icon === path);

      if (result) break;
    }
  }

  return result;
}

export function updateIconReducer(state: IconState[], iconName: string, count: number): IconState[] {
  return state.map(icon => {
    if(icon.icon === iconName) icon.badge = count;
    return icon;
  })
  
}

export const getSpecificIcon = (path: string | string[]) => (state: State) => getIconReducer(state, path);