import * as actions from '../actions/userInfo-action';
import {RESET_USER_INFO, UPDATE_USER_INFO} from '../actions/userInfo-action';
import {UserInfo} from '../interfaces/response-interface';


export const initialState: UserInfo = {
  realname: '',
  sid: '',
  user_id: NaN,
  auth_pass: false,
  captcha: false,
  groups_list: [],
  face_image: ''
};


export function reducer(state = initialState, action: actions.Actions): UserInfo {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return Object.assign({}, action.payload);
    case RESET_USER_INFO:
      return initialState;
    default:
      return state;
  }
}

// export const getActiveIndexOfSlides = (state: State) => state.activeIndexOfSlides;

// export const getActiveIndexOfInnerSlides = (state: State) => state.activeIndexOfInnerSlides;


export const getRealname = (state: UserInfo) => state.realname;

export const getSid = (state: UserInfo) => state.sid;

export const getUserId = (state: UserInfo) => state.user_id;

export const getAuthPass = (state: UserInfo) => state.auth_pass;

export const getCaptcha = (state: UserInfo) => state.captcha;

export const getGroupList = (state: UserInfo) => state.groups_list;

export const getFaceImage = (state: UserInfo) => state.face_image;





