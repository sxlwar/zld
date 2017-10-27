
export interface WsResponse {
  code: number;
  command: { path: string };
  data: any;
  msg: string;
  isError: boolean
  detail?: any;
}

//custom field
export interface ErrorMessage {
  errorMessage: string;
}

//login
export interface LoginResponse {
  realname: string;
  sid: string;
  user_id: number;
  auth_pass: boolean;
  captcha: boolean;
  groups_list: string[];
  face_image: string;
  errorMessage?: string;
}

//search company
export interface Company {
  name: string;
  id: number;
}

//phone verification code
export interface PhoneVerCodeResponse {
  captcha?: boolean;
  errorMessage?: string;
}

export interface RegisterResponse {
  user_id: number;
  errorMessage?: string;
}

//search worker
export interface WorkerResponse {
  user__username:	string
  user_id:	number
  realname:	string
  age:	number
  sex:	string
  cer_status:	number
  company__name:	string
  curraddr__province:	string
  curraddr__dist:	string
  userpersonal_idnum:	string
  curraddr__city:	string
  code:	number
}


export type ErrorResponse = LoginResponse
  | PhoneVerCodeResponse
  | RegisterResponse;
