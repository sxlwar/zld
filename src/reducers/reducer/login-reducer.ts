import * as actions from '../../actions/action/login-action';
import { LOGIN, SHOW_SPECIFIC_INNER_SLIDE, SHOW_SPECIFIC_SLIDE, UPDATE_RANDOM_CODE } from '../../actions/action/login-action';
import { LoginOptions } from '../../interfaces/request-interface';
import { ENV } from '@app/env';
import { RegisterResponse, LoginResponse, ResetPasswordResponse, PhoneVerCodeResponse } from '../../interfaces/response-interface';

export interface State {
    activeIndexOfSlides: number
    activeIndexOfInnerSlides: number,
    loginForm: LoginOptions,
    loginVerificationImage: string,
    randomCode: string;
}

/*=================================================UI state=======================================================*/

export const initialSate: State = {
    activeIndexOfSlides: 0,
    activeIndexOfInnerSlides: 0,
    loginForm: {  //FIXME These data have security hidden dangers and should not be preserved.
        username: '',
        password: '',
        captcha_code: '',
        rand_captcha_key: ''
    },
    loginVerificationImage: '',
    randomCode: '00000'
};

export function reducer(state = initialSate, action: actions.Actions): State {
    switch (action.type) {
        case SHOW_SPECIFIC_SLIDE:
            return Object.assign({}, state, { activeIndexOfSlides: action.payload });

        case SHOW_SPECIFIC_INNER_SLIDE:
            return Object.assign({}, state, { activeIndexOfInnerSlides: action.payload });

        case LOGIN:
            return Object.assign({}, state, { loginForm: action.payload });

        case UPDATE_RANDOM_CODE:
            return Object.assign({}, state, {
                randomCode: action.payload,
                loginVerificationImage: `http://${ENV.DOMAIN}/check_captcha/${action.payload}`
            });

        default:
            return state;
    }
}

export const getActiveIndexOfSlides = (state: State) => state.activeIndexOfSlides;

export const getActiveIndexOfInnerSlides = (state: State) => state.activeIndexOfInnerSlides;

export const getLoginForm = (state: State) => state.loginForm;

export const getLoginVerificationImage = (state: State) => state.loginVerificationImage;

export const getRandomCode = (state: State) => state.randomCode;


/*=====================================================login api response==========================================*/

export const initialLoginResponse: LoginResponse = {
    realname: '',
    sid: '',
    user_id: NaN,
    auth_pass: false,
    captcha: false,
    groups_list: [],
    face_image: ''
};

export function userInfoReducer(state = initialLoginResponse, action: actions.Actions): LoginResponse {
    switch (action.type) {
        case actions.LOGIN_SUCCESS:
            return { ...action.payload };

        case actions.LOGIN_FAIL:
            return { ...initialLoginResponse, ...action.payload };

        case actions.RESET_SID:
            return { ...state, sid: '' };

        default:
            return state;
    }
}

export const getRealName = (state: LoginResponse) => state.realname;

export const getSid = (state: LoginResponse) => state.sid;

export const getUserId = (state: LoginResponse) => state.user_id;

export const getAuthPass = (state: LoginResponse) => state.auth_pass;

export const getCaptcha = (state: LoginResponse) => state.captcha;

export const getGroupList = (state: LoginResponse) => state.groups_list;

export const getFaceImage = (state: LoginResponse) => state.face_image;


/*================================================Register api response============================================*/

export const initialRegisterState: RegisterResponse = {
    user_id: NaN
};

export function registerReducer(state = initialRegisterState, action: actions.Actions) {
    switch (action.type) {
        case actions.REGISTER_SUCCESS:
            return { ...action.payload };

        case actions.REGISTER_FAIL:
            return { ...action.payload, ...initialRegisterState };

        default:
            return state;

    }
}

export const getRegisterUserId = (state: RegisterResponse) => state.user_id;

/*================================================Reset password response============================================*/

export const initialResetPasswordState: ResetPasswordResponse = {
    user_id: NaN
};

export function resetPasswordReducer(state = initialResetPasswordState, action: actions.Actions) {
    switch (action.type) {
        case actions.RESET_PASSWORD_FAIL:
            return { ...action.payload };

        case actions.RESET_PASSWORD_SUCCESS:
            return { ...action.payload, ...initialResetPasswordState };

        default:
            return state;
    }
}

export const getResetPasswordUserId = (state: ResetPasswordResponse) => state.user_id;


/*===========================================Register phone verification code=====================================*/

export const initialPhoneVerCode: PhoneVerCodeResponse = {
    captcha: false
};

export function registerPhoneVerReducer(state = initialPhoneVerCode, action: actions.Actions) {
    switch (action.type) {
        case actions.PHONE_VERIFICATION_CODE_FAIL:
            const captcha = action.payload.captcha || false;
            return Object.assign({}, action.payload, { captcha });

        case actions.PHONE_VERIFICATION_CODE_SUCCESS:
        default:
            return state;
    }
}

export const getRegisterPhoneVerCaptcha = (state: PhoneVerCodeResponse) => state.captcha;

/*===========================================Reset phone verification code=====================================*/


export const initialResetPhoneVerCode: PhoneVerCodeResponse = {
    captcha: false
};

export function resetPwdPhoneVerReducer(state = initialResetPhoneVerCode, action: actions.Actions) {
    switch (action.type) {
        case actions.RESET_PHONE_VERIFICATION_CODE_FAIL:
            const captcha = action.payload.captcha || false;
            return Object.assign({}, action.payload, { captcha });

        case actions.RESET_PHONE_VERIFICATION_CODE_SUCCESS:
        default:
            return state;
    }
}

export const getResetPhoneVerCaptcha = (state: PhoneVerCodeResponse) => state.captcha;
