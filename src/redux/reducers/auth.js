import $ from 'redux/types/auth';

import TokenService from 'services/token';

const defaultState = {
  isLoading: false,
  errorMessage: null,
  data: {
    token: TokenService.getToken(),
  },
};

export const auth = (prevState = defaultState, { type, payload }) => {
  switch(type) {
    case $.AUTH_REQUEST:
    case $.AUTH_FAILURE:
    case $.AUTH_SUCCESS:
      return {
        ...prevState,
        ...payload,
      };
    case $.LOGOUT:
      return defaultState
    default:
      return prevState;
  }
};
