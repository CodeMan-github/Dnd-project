import { createAsyncAction} from 'helpers/redux';
import Fetch from 'helpers/fetch';

import $ from 'redux/types/tables';

export const fetchTables = () => createAsyncAction(
  Fetch.get({
    path: 'api/applications',
  }),
  $.FETCH_TABLE_REQUEST,
);

function changeTable(tableIndex){
  return {
    type:$.SELECTED_TABLE,
    tableIndex:tableIndex
  }
}

export function updateTableData(shapeId, formId){
  return{
    type:""
  }
}

export const updateShapeData = (shapeId, data, formId) => createAsyncAction(
  
  Fetch.put({
    path: `api/shape/${shapeId}/${formId}`,
    body: data,
  }),
  $.UPDATE_SHAPE_REQUEST,
);

export const addNewField = (field) => createAsyncAction(
  
 /*  Fetch.put({
    path: `api/shape/${shapeId}/${formId}`,
    body: data,
  }),
  $.UPDATE_SHAPE_REQUEST, */
);

function updateFormLabel(selectedTable, selectedForm, formLabel)
{
  return{
    type:$.UPDATE_FORM,
    selectedTable: selectedTable,
    selectedForm: selectedForm,
    formLabel: formLabel
  }
}

export function selectTable(tableIndex){
  return (dispatch) => {
    dispatch(selectForm(-1))
    dispatch(changeTable(tableIndex))
  }
}

export function selectForm(formIndex){
  return {
    type:$.SELECTED_FORM,
    formIndex:formIndex
  }
}

export function updateForm(formLabel){
  return (dispatch, getState) => {
    const state = getState()
    dispatch(updateFormLabel(state.selectedTable.tableIndex, state.selectedForm.formIndex, formLabel))
  }
}