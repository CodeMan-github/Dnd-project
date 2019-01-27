import { createAsyncActionTypes } from 'helpers/redux';

export default createAsyncActionTypes('FORM', ['FETCH', 'CREATE', 'UPDATE', 'DELETE']);
