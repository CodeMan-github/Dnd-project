import { createAsyncActionTypes } from 'helpers/redux';

export default createAsyncActionTypes('DYNAPP', ['FETCH', 'CREATE', 'UPDATE', 'DELETE']);