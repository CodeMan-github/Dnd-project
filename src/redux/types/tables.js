import { createAsyncActionTypes } from 'helpers/redux';
// Async Action Types
const tableAsyncActions = createAsyncActionTypes('TABLE', ['FETCH'])
const tableSyncActions = {
    SELECTED_TABLE: 'SELECTED_TABLE',
    SELECTED_FORM: 'SELECTED_FORM',
    UPDATE_FORM: 'UPDATE_FORM',
    UPDATE_SHAPE_REQUEST: 'UPDATE_SHAPE_REQUEST'
}

export default Object.assign({}, tableAsyncActions, tableSyncActions);
