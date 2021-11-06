import { sellerConstants } from "../constants";

const initialState = {
  loading: false,
};

export function addSeller(state = initialState, action) {
  switch (action.type) {
    case sellerConstants.ADD_SELLER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case sellerConstants.ADD_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case sellerConstants.ADD_SELLER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case sellerConstants.ADD_SELLER_CLEAR:
      return {
        loading: false,
        data: [],
        error: null,
      };
    default:
      return state;
  }
}


export function getSeller(state = {}, action) {
  switch (action.type) {
    case sellerConstants.GET_SELLER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case sellerConstants.GET_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case sellerConstants.GET_SELLER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

