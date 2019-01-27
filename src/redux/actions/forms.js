import { createAsyncAction } from 'helpers/redux';
import Fetch from 'helpers/fetch';

import $ from 'redux/types/forms';

export const fetchForms = (id) => createAsyncAction(
  Fetch.get({
    path: `api/forms/${id}`,
  }),
  $.FETCH_FORM_REQUEST,
);

export const createForm = data => createAsyncAction(
  Fetch.post({
    path: 'api/forms',
    body: data,
  }),
  $.CREATE_FORM_REQUEST,
);
