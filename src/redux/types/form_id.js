import { createAsyncActionTypes } from 'helpers/reduxform_id';


export default Object.freeze({
    ...createAsyncActionTypes('FORM_ID', ['FETCH'])
  });
