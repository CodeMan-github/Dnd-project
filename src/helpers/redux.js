export const defaultState = {
  isLoading: false,
  errorMessage: null,
};
export const defaultFormState = {
  isLoading: false,
  errorMessage: null,
  data:{
    label: ""
  }
};
export const defaultTableState = {
  isLoading: false,
  errorMessage: null,
  data:{
  }
};

export const createAsyncAction = (promise, type, options = {}) => dispatch => {
  dispatch({
    type,
    payload: {
      isLoading: true,
      errorMessage: null,
    },
  });



  const cleanType = type.replace('_REQUEST', '');

  return promise
    .then(result => {
      dispatch({
        type: `${cleanType}_SUCCESS`,
        payload: {
          isLoading: false,
          errorMessage: null,
          data: result,
        },
      });
      if (options.successCallback) {
        options.successCallback(result);
      }
    })
    .catch(error => {
      dispatch({
        type: `${cleanType}_FAILURE`,
        payload: {
          isLoading: false,
          errorMessage: `${error}`,
        },
      });
      if (options.failureCallback) {
        options.failureCallback(error);
      }
    });
};

export const createAsyncActionTypes = (
  name,
  prefixes = [],
  suffixes = ['REQUEST', 'SUCCESS', 'FAILURE']
) => Object.freeze(
  prefixes.length
    ? prefixes.reduce((acc, prefix) => {
      suffixes.forEach(suffix => {
        const action = `${prefix}_${name}_${suffix}`;
        acc[action] = action;
      });
      return acc;
    }, {})
    : suffixes.map(suffix => `${name}_${suffix}`).reduce((acc, value) => {
      acc[value] = value;
      return acc;
    }, {})
);

export const createMapStateToProps = (keys = []) => state => keys.reduce((acc, key) => {
 
  acc[key] = state[key];
  return acc;
}, {});
