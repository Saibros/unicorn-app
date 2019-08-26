import { useReducer } from 'react';
import { mockApiCall } from './apimock';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isFetching: true,
        isError: false,
        isFetched: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isFetching: false,
        isError: false,
        isFetched: true,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isFetching: false,
        isError: true,
        isFetched: false,
      };
    default:
      throw new Error();
  }
};

const useApiReducer = initial => useReducer(reducer, {
  isFetching: false,
  isError: false,
  isFetched: false,
  data: initial,
});

export const useApi = (apiEndpoint) => {
  const [state, dispatch] = useApiReducer({});
  const makeCall = async ({ endpoint = apiEndpoint, data = {}, didCancel = false } = {}) => {
    dispatch({ type: 'FETCH_INIT' });
    try {
      const result = await mockApiCall(endpoint, data);
      if (!didCancel) {
        dispatch({ type: 'FETCH_SUCCESS', payload: result });
      }
      return Promise.resolve({ isError: false, payload: result });
    } catch {
      if (!didCancel) {
        dispatch({ type: 'FETCH_FAILURE' });
      }
      return Promise.resolve({ isError: true, payload: {} });
    }
  };
  return [state, makeCall];
};
