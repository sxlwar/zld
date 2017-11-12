import {CertificateResponse} from '../../interfaces/response-interface';
import * as actions from '../../actions/action/certificate-action';

const initialState: CertificateResponse = {
  auth_pass: false
};

export function reducer(state = initialState, action: actions.Actions): CertificateResponse {
  switch (action.type) {
    case actions.CERTIFICATE:
      return state;

    case actions.CERTIFICATE_FAIL:
      return {...action.payload};

    case actions.CERTIFICATE_SUCCESS:
      return {...action.payload};

    default:
      return state;
  }
}

export const getAuthPass = (state: CertificateResponse) => state.auth_pass;
