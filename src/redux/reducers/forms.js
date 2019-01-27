import { defaultFormState } from 'helpers/redux';

import $ from 'redux/types/forms';

export const forms = (prevState = defaultFormState, { type, payload }) => {
  switch(type) {
    case $.FETCH_FORM_REQUEST:
    case $.CREATE_FORM_REQUEST:
    case $.DELETE_FORM_REQUEST:
    case $.UPDATE_FORM_REQUEST:
    case $.FETCH_FORM_SUCCESS:
    case $.DELETE_FORM_SUCCESS:
    case $.UPDATE_FORM_SUCCESS:
    case $.FETCH_FORM_FAILURE:
    case $.CREATE_FORM_FAILURE:
    case $.DELETE_FORM_FAILURE:
    case $.UPDATE_FORM_FAILURE:
      return {
        ...prevState,
        ...payload,
      };
    case $.CREATE_FORM_SUCCESS:
      return {
        ...prevState,
        ...payload,
        data: [payload.data],
      };
    default:
      return prevState;
  }
};
