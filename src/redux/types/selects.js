import { createAsyncActionTypes } from 'helpers/reduxSelect';


export default Object.freeze({
    ...createAsyncActionTypes('SELECT', ['FETCH'])
  });

