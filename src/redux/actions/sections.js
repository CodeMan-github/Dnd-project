import { createAsyncAction } from 'helpers/redux';
import Fetch from 'helpers/fetch';

import $ from 'redux/types/sections';

export const addNode = (path, index, payload) => ({
  type: $.ADD_SECTION_NODE,
  payload: {
    path,
    index,
    payload,
  },
});

export const removeNode = (path, index) => ({
  type: $.REMOVE_SECTION_NODE,
  payload: {
    path,
    index,
  },
});

export const moveNode = (path, indexFrom, indexTo) => ({
  type: $.MOVE_SECTION_NODE,
  payload: {
    path,
    index: indexFrom,
    payload: { indexTo },
  },
});

export const editProperties = (path, data) => ({
  type: $.EDIT_PROPERTIES,
  payload: { path, data },
});

export const fetchSections = (formId) => createAsyncAction(
  Fetch.get({
    path: `api/forms/${formId}/sections`,
  }),
  $.FETCH_SECTION_REQUEST,
);

export const saveSections = (formId, data) => createAsyncAction(
  //console.log("data to save", data, " - form id", formId)
  Fetch.put({
    path: `api/forms/${formId}/sections`,
    body: data,
  }),
  $.SAVE_SECTION_REQUEST,
);
