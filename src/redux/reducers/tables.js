import { defaultState } from 'helpers/redux';
import $ from 'redux/types/tables';

export const tables = (prevState = defaultState, action) => {
  switch(action.type) {
    case $.FETCH_TABLE_REQUEST:
    case $.UPDATE_SHAPE_REQUEST:
    case $.CREATE_TABLE_REQUEST:
    case $.DELETE_TABLE_REQUEST:
    case $.UPDATE_TABLE_REQUEST:
    case $.FETCH_TABLE_SUCCESS:
    case $.DELETE_TABLE_SUCCESS:
    case $.UPDATE_TABLE_SUCCESS:
    case $.FETCH_TABLE_FAILURE:
    case $.CREATE_TABLE_FAILURE:
    case $.DELETE_TABLE_FAILURE:
    case $.UPDATE_TABLE_FAILURE:
      return {
        ...prevState,
        ...action.payload,
      };
    case $.CREATE_TABLE_SUCCESS:
      return {
        ...prevState,
        ...action.payload,
        data: [action.payload.data],
      };

    case $.UPDATE_FORM:
      var nextState = prevState;
      var tables = nextState.data.applicationObjects;
      tables[action.selectedTable]['forms'][action.selectedForm]['label'] = action.formLabel
      nextState.data.applicationObjects = tables;
      return { ...prevState, ...nextState}

    default:
      return prevState;
  }
};

export function selectedTable(
  state = {
    tableIndex: 0
  },
  action
){
  switch(action.type){
    case $.SELECTED_TABLE:
    
      return Object.assign({}, state, {
        tableIndex: action.tableIndex
      })
    default:
      return state;
  }
}

export function selectedForm(
  state = {
    formIndex: -1
  },
  action
){
  
  switch(action.type){
    case $.SELECTED_FORM:
      return Object.assign({}, state, {
        formIndex: action.formIndex
      })
    default:
      return state;
  }
}
