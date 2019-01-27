import { createAsyncActionTypes } from 'helpers/redux';

export default Object.freeze({
  ...createAsyncActionTypes('SECTION', ['ADD', 'REMOVE', 'MOVE'], ['NODE']),
  ...createAsyncActionTypes('SECTION', ['FETCH', 'SAVE']),
  EDIT_PROPERTIES: 'EDIT_PROPERTIES',
});
