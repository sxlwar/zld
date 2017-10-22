
import {Actions as login} from './login-action';
import {Actions as config} from './config-action';
import {Actions as tutorial} from './tutorial-action';
import {Actions as userInfo} from './userInfo-action';
import {Actions as response} from './response-action';

export type Actions = login | config | tutorial | userInfo | response;
