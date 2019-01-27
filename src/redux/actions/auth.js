import { createAsyncAction } from 'helpers/redux';
import Fetch from 'helpers/fetch';

import $ from 'redux/types/auth';

import TokenService from 'services/token';

export const sendAuthData = authData => createAsyncAction(
  Fetch.post({
    path: `api/auth`,
    body: authData,
  }),
  $.AUTH_REQUEST,
  {
    successCallback: response => TokenService.setToken(response.token),
    failureCallback: TokenService.removeToken,
  }
);

export const logout = () => {
  TokenService.removeToken();
  return {
    type: $.LOGOUT,
  };
};
