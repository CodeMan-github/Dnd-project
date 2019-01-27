import { createAsyncActionTypes } from 'helpers/redux';

export default Object.freeze({
  ...createAsyncActionTypes('AUTH'),
  LOGOUT: 'LOGOUT',
});
