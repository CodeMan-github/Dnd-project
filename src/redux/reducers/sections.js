import produce, { original } from 'immer';

import { uid } from 'helpers';
import { defaultState } from 'helpers/redux';
import { JSONToTree } from '../../helpers';

import $ from 'redux/types/sections';

const performModification = ({ path, index, payload }, modifier) => draft => {
  let current = draft.state.data;

  // Getting nested immer draft pointer
  path.forEach((index) => {
    current = current[index] || current.children[index];
  });

  // Getting original data chunk
  const originalChunk = original(current);

  // Perforiming immutable change
  if (Array.isArray(originalChunk)) {
    draft.state.data = modifier(originalChunk, index, payload);
  } else {
    current.children = modifier(originalChunk.children, index, payload);
  }
};

const addNode = (array, index, payload) => {
  const result = [...array];

  const addedNode = produce(
    payload,
    draft => {
      const { generatorOptions } = payload;
      if (generatorOptions) {
        const { columnCount, deleteProperties } = generatorOptions;

        // Id columnCount is set adding empty columns to newly added row
        if (columnCount) {
          draft.children = Array(columnCount)
            .fill(0)
            .map((v, index) => ({
              id: uid('new_'),
              properties: {},
              children: [],
            }));
        }

        // if requested deleting additional payload props
        if (deleteProperties) {
          deleteProperties.forEach(propName => {
            delete draft[propName];
          });
        }
      }

      delete draft.generatorOptions;
      draft.id = uid('new_');
    }
  );

  result.splice(index, 0, addedNode);

  return result;
};

const removeNode = (array, index) => array.filter((v,i) => i !== index);

const moveNode = (array, indexFrom, { indexTo }) => {
  const result = [...array];
  result.splice(indexTo, 0, result.splice(indexFrom, 1)[0]);
  return result;
};

export const sections = (prevState = {...defaultState, data: []}, { type, payload }) => {
  const draftState = { state: prevState };
  switch(type) {
    case $.ADD_SECTION_NODE:
      return produce(
        draftState,
        performModification(payload, addNode)
      ).state;
    case $.REMOVE_SECTION_NODE:
      return produce(
        draftState,
        performModification(payload, removeNode)
      ).state;
    case $.MOVE_SECTION_NODE:
      return produce(
        draftState,
        performModification(payload, moveNode)
      ).state;
    case $.EDIT_PROPERTIES:
      return produce(
          draftState,
          draft => {
            let current = draft.state.data;
            payload.path.forEach(pathId => {
              const originalData = original(current);
              const index = (originalData.children || originalData).findIndex(({ id }) => id === pathId);
              current = current[index] || current.children[index];
            });
            current.properties = payload.data;
          },    
        ).state;

    case $.FETCH_SECTION_REQUEST:
    case $.FETCH_SECTION_FAILURE:
    case $.SAVE_SECTION_REQUEST:
    case $.SAVE_SECTION_FAILURE:
      return {
        ...prevState,
        ...payload,
      };
    case $.FETCH_SECTION_SUCCESS:
    case $.SAVE_SECTION_SUCCESS:
      return {
        ...prevState,
        ...payload,
        data: JSONToTree(payload.data),
      };
    default:
      return prevState;
  }
};
