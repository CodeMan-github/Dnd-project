export const defaultState = {
    isLoading: false,
    errorMessage: null,
  };
  
  export const createAsyncActionSelect = (promise, type) => dispatch => {
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
            selects: result,
          },
        });
      })
      .catch(error => {
        dispatch({
          type: `${cleanType}_FAILURE`,
          payload: {
            isLoading: false,
            errorMessage: `${error}`,
          },
        });
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
  