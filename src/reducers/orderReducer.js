import { orderConstants } from "../constants";

const initialState = {
  order: [],
  orders: [],
  loading: false,
};

export function getOrders(state = initialState, action) {
  switch (action.type) {
    case orderConstants.GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.data.orders,
        sort: action.data.sort,
      };
    case orderConstants.GET_ORDERS_FAILURE:
      return {
        err: action.error,
      };
    default:
      return state;
  }
}

export function editOrderStatus(state = initialState, action) {
  switch (action.type) {
    case orderConstants.EDIT_ORDER_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.EDIT_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case orderConstants.EDIT_ORDER_STATUS_FAILURE:
      return {
        err: action.err,
        loading: false,
      };
    default:
      return state;
  }
}

export function editOrderPrice(state = initialState, action) {
  switch (action.type) {
    case orderConstants.EDIT_ORDER_PRICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.EDIT_ORDER_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case orderConstants.EDIT_ORDER_PRICE_FAILURE:
      return {
        err: action.err,
        loading: false,
      };
    default:
      return state;
  }
}

export function editOrderQuantity(state = initialState, action) {
  switch (action.type) {
    case orderConstants.EDIT_ORDER_QUANTITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.EDIT_ORDER_QUANTITY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case orderConstants.EDIT_ORDER_QUANTITY_FAILURE:
      return {
        err: action.err,
        loading: false,
      };
    default:
      return state;
  }
}

export function editProducOrder(state = initialState, action) {
  switch (action.type) {
    case orderConstants.EDIT_PRODUCT_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.EDIT_PRODUCT_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case orderConstants.EDIT_PRODUCT_ORDER_FAILURE:
      return {
        err: action.err,
        loading: false,
      };
    default:
      return state;
  }
}

export function cancelProductOrder(state = initialState, action) {
  switch (action.type) {
    case orderConstants.CANCEL_PRODUCT_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.CANCEL_PRODUCT_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case orderConstants.CANCEL_PRODUCT_ORDER_FAILURE:
      return {
        err: action.err,
        loading: false,
      };
    default:
      return state;
  }
}

export function addOrder(state = initialState, action) {
  switch (action.type) {
    case orderConstants.ADD_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case orderConstants.ADD_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.order,
      };
    case orderConstants.ADD_ORDER_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export function getOrderSms(state = initialState, action) {
  switch (action.type) {
    case orderConstants.GET_SETTING_SMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GET_SETTING_SMS_SUCCESS:
      const SMSTypes = {
        preSms: 1,
        postDeliverySms: 2,
        postCustomerSms: 3,
      };
      Object.keys(action.sms).map((keyitem) => {
        action.sms[keyitem].type = SMSTypes[keyitem];
      });

      return {
        ...state,
        loading: false,
        sms: action.sms,
      };
    case orderConstants.GET_SETTING_SMS_FAILURE:
      return {
        err: action.err,
        loading: false,
      };
    case orderConstants.EDIT_SETTING_SMS:
      return {
        ...state,
        loading: false,
        sms: action.sms,
      };
    default:
      return state;
  }
}

export function editOrderSms(state = initialState, action) {
  switch (action.type) {
    case orderConstants.EDIT_SETTING_SMS_REQUEST:
      return {
        ...state,
        params: action.params,
        loading: true,
      };
    case orderConstants.EDIT_SETTING_SMS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case orderConstants.EDIT_SETTING_SMS_FAILURE:
      return {
        err: action.err,
        loading: false,
      };
    default:
      return state;
  }
}

export function deliverySms(state = initialState, action) {
  switch (action.type) {
    case orderConstants.EDIT_SETTING_SMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.EDIT_SETTING_SMS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case orderConstants.EDIT_SETTING_SMS_FAILURE:
      return {
        err: action.err,
        loading: false,
      };
    default:
      return state;
  }
}

export function setOrdersFilter(state = {}, action) {
  switch (action.type) {
    case orderConstants.ADD_ORDER_FILTER:
      return {
        filter: action.filter,
      };
    default:
      return state;
  }
}

export function orderDetails(state = { loading: true }, action) {
  switch (action.type) {
    case orderConstants.GET_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case orderConstants.GET_ORDER_DETAILS_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export function getShareLinkOrder(state = {}, action) {
  switch (action.type) {
    case orderConstants.GET_ORDER_SHARE_LINK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GET_ORDER_SHARE_LINK_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case orderConstants.GET_ORDER_SHARE_LINK_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
export function confirmFinancial(state = {}, action) {
  switch (action.type) {
    case orderConstants.CONFIRM_FINANCIAL_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.CONFIRM_FINANCIAL_ORDER_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case orderConstants.CONFIRM_FINANCIAL_ORDER_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
export function uploadDoc(state = {}, action) {
  switch (action.type) {
    case orderConstants.UPLOAD_DOC_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.UPLOAD_DOC_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case orderConstants.UPLOAD_DOC_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export function showDoc(state = {}, action) {
  switch (action.type) {
    case orderConstants.SHOW_DOC_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.SHOW_DOC_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case orderConstants.SHOW_DOC_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export function editSaleOpportunitySellerStatus(state = {}, action) {
  switch (action.type) {
    case orderConstants.EDIT_SALE_OPPORTUNITY_SELLER_REQUEST:
      return {
        ...state,
        params: action.params,
        loading: true,
      };
    case orderConstants.EDIT_SALE_OPPORTUNITY_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case orderConstants.EDIT_SALE_OPPORTUNITY_SELLER_FAILURE:
      return {
        err: action.err,
        loading: false,
      };
    default:
      return state;
  }
}

export function supportOrder(state = initialState, action) {
  switch (action.type) {
    case orderConstants.GET_SUPPORT_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GET_SUPPORT_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case orderConstants.GET_SUPPORT_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.error,
      };
    case orderConstants.CLEAR_SUPPORT_ORDER:
      return {
        ...state,
        loading: false,
        data: [],
      };
    default:
      return state;
  }
}

export function addTrackingCode(state = initialState, action) {
  switch (action.type) {
    case orderConstants.ADD_ORDER_TRACKING_CODE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.ADD_ORDER_TRACKING_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case orderConstants.ADD_ORDER_TRACKING_CODE_FAILURE:
      return {
        loading: false,
        err: action.error,
      };
    case orderConstants.ADD_ORDER_TRACKING_CODE_CLEAR:
      return {
        loading: false,
        data: null,
        err: null,
      };

    default:
      return state;
  }
}

export function failSaleOpportunity(state = {}, action) {
  switch (action.type) {
    case orderConstants.FAIL_SALE_OPPORTUNITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.FAIL_SALE_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case orderConstants.FAIL_SALE_OPPORTUNITY_FAILURE:
      return {
        err: action.err,
        loading: false,
      };
    default:
      return state;
  }
}

export function getFailureReasons(state = {}, action) {
  switch (action.type) {
    case orderConstants.GET_FAIL_REASONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GET_FAIL_REASONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case orderConstants.GET_FAIL_REASONS_FAILURE:
      return {
        err: action.err,
        loading: false,
      };
    default:
      return state;
  }
}

export function editPriority(state = {}, action) {
  switch (action.type) {
    case orderConstants.EDIT_PRIORITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.EDIT_PRIORITY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case orderConstants.EDIT_PRIORITY_FAILURE:
      return {
        err: action.err,
        loading: false,
      };
    default:
      return state;
  }
}

export function editTrackingTime(state = {}, action) {
  switch (action.type) {
    case orderConstants.EDIT_TRACKING_TIME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.EDIT_TRACKING_TIME_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case orderConstants.EDIT_TRACKING_TIME_FAILURE:
      return {
        err: action.err,
        loading: false,
      };
    case orderConstants.EDIT_TRACKING_TIME_CLEAR:
      return {
        loading: false,
        err: null,
        data: [],
      };
    default:
      return state;
  }
}

export function getPaymentlink(state = { loading: false }, action) {
  switch (action.type) {
    case orderConstants.GET_PAYMENT_LINK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GET_PAYMENT_LINK_SUCCESS:
      return {
        loading: false,
        data: action.data,
      };
    case orderConstants.GET_PAYMENT_LINK_FAILURE:
      return {
        err: action.error,
        loading: false,
      };
    case orderConstants.GET_PAYMENT_LINK_CLEAR:
      return {
        err: null,
        data: null,
        loading: false,
      };
    default:
      return state;
  }
}
