

export interface LoginOptions {
  username: string;
  password: string;
  captcha_code?: string;
  rand_captcha_key?: string;
}

export interface RegisterOptions {
  username: string,
  password: string,
  code: string,
  captcha_code?: string,
  rand_captcha_key?: string
  real_name?: string,
  company_id?: number,
}



export type Options = LoginOptions & RegisterOptions;
