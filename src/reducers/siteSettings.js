import { GET_SITE_SETTINGS } from '../actions/siteSettings';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  result: {},
};

export const siteSettings = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${GET_SITE_SETTINGS}_PENDING`:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case `${GET_SITE_SETTINGS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        result: action.result,
      };
    case `${GET_SITE_SETTINGS}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
};
