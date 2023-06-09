import axios from "axios";
import { SERVER_URL } from "../config";
import { authHeader } from "../helpers";
import { handleResponse, handleError } from "../helpers";

let baseRoute = SERVER_URL;

axios.interceptors.request.use((request) => {
  console.log("Starting Request", request);
  return request;
});

export const orderService = {
  getOrders,
  addOrder,
  editOrderStatus,
  getOrderSms,
  editOrderSms,
  sendDeliverySms,
  editOrderPrice,
  editOrderQuantity,
  cancelProductOrder,
  editProductOrder,
  orderDetails,
  getShareLinkOrder,
  confirmFinancial,
  uploadDoc,
  showDoc,
  editSaleOpportunitySellerStatus,
  orderSupport,
  addTrackingCode,
  failSaleOpportunity,
  getFailureReasons,
  editPriority,
  editTrackingTime,
  getPaymentlink,
};

function getOrders(
  ordersStatus = "0",
  mobile = "0",
  customerPhoneNumber = "0",
  customerName = "0",
  customerCompany = "0",
  sellerMobile = "0",
  sellerFamily = "0",
  startDate = "1900-01-01T05:42:13.845Z",
  endDate = "1900-01-01T05:42:13.845Z",
  startTrackingTime = "1900-01-01T05:42:13.845Z",
  endTrackingTime = "1900-01-01T05:42:13.845Z",
  sort = "0"
) {
  console.log("into orderService");
  const requestOptions = {
    headers: authHeader(),
  };
  return axios
    .get(
      `${baseRoute}/order/${ordersStatus}/${mobile}/${customerPhoneNumber}/${encodeURI(
        customerName
      )}/${encodeURI(customerCompany)}/${sellerMobile}/${encodeURI(
        sellerFamily
      )}/${encodeURI(startDate)}/${encodeURI(endDate)}/${encodeURI(
        startTrackingTime
      )}/${encodeURI(endTrackingTime)}/${encodeURI(sort)}`,
      requestOptions
    )
    .then((res) => {
      console.log("res.user >> ");
      console.log(res.data.data);
      return res.data;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function editOrderStatus(orderId, status) {
  console.log("into orderService");

  const requestOptions = {
    headers: authHeader(),
    body: { orderId, status },
  };

  return axios
    .put(`${baseRoute}/order/status`, requestOptions.body, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res.user >> ");
      console.log(res.data);
      return handleResponse(res);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function editOrderPrice(orderId, productId, price) {
  console.log("into orderService");

  const requestOptions = {
    headers: authHeader(),
    body: { orderId, productId, price },
  };

  return axios
    .put(`${baseRoute}/order/product/price`, requestOptions.body, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res.user >> ");
      console.log(res.data);
      return handleResponse(res);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function editOrderQuantity(orderId, productId, quantity) {
  console.log("into orderService");

  const requestOptions = {
    headers: authHeader(),
    body: { orderId, productId, quantity },
  };

  return axios
    .put(`${baseRoute}/order/product/quantity`, requestOptions.body, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res.user >> ");
      console.log(res.data);
      return handleResponse(res);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function editProductOrder(params) {
  console.log("into orderService");
  const requestOptions = {
    headers: authHeader(),
    body: { ...params },
  };

  return axios
    .put(`${baseRoute}/order/product`, requestOptions.body, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res.user >> ");
      console.log(res.data);
      return handleResponse(res);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function cancelProductOrder(orderId, productId) {
  console.log("into orderService");

  const requestOptions = {
    headers: authHeader(),
  };
  return axios
    .delete(`${baseRoute}/order/product`, {
      data: { orderId, productId },
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res.user >> ");
      console.log(res.data);
      return handleResponse(res);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function addOrder(products, info, seller, notes, force, reminderInfo) {
  console.log("into orderService");

  let address, duration, mobile;
  if (info.address) address = info.address;
  if (info.duration) duration = info.duration;
  if (info.guestMobile) mobile = info.guestMobile;
  let customer = {
    family: info.family,
    phoneNumber: info.mobile,
    company: info.company,
  };

  const requestOptions = {
    headers: authHeader(),
    body: {
      products,
      customer,
      seller,
      mobile,
      duration,
      address,
      notes,
      force,
      reminder: reminderInfo,
      priority: info.priority || 0,
    },
  };
  return axios
    .post(`${baseRoute}/order`, requestOptions.body, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res.user >> ");
      console.log(res.data);
      return handleResponse(res);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function getOrderSms() {
  console.log("into orderService");

  const requestOptions = {
    headers: authHeader(),
    body: {},
  };

  return axios
    .get(`${baseRoute}/settings/order/sms`, { headers: requestOptions.headers })
    .then((res) => {
      console.log("res.user >> ");
      console.log(res.data);
      return handleResponse(res);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function editOrderSms(params) {
  console.log("into orderService");

  const requestOptions = {
    headers: authHeader(),
    body: params,
  };
  console.log(params);
  return axios
    .put(`${baseRoute}/settings/order/sms`, requestOptions.body, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res >>");
      console.log(res.data);
      return handleResponse(res);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function sendDeliverySms(params) {
  console.log("into orderService");

  const requestOptions = {
    headers: authHeader(),
    body: params,
  };

  return axios
    .post(`${baseRoute}/order/delivery/sms`, requestOptions.body, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res >>");
      console.log(res.data);
      return handleResponse(res);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function orderDetails(params) {
  console.log("into orderService (orderDetails)");

  const requestOptions = {
    headers: authHeader(),
  };

  return axios
    .get(`${baseRoute}/order/details/${params.orderId}/${params.keyLink}`, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res >>");
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function getShareLinkOrder(params) {
  console.log("into orderService (getShareLinkOrder)");

  const requestOptions = {
    headers: authHeader(),
    body: { ...params },
  };

  return axios
    .post(`${baseRoute}/order/details/sharelink`, requestOptions.body, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res >>");
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function confirmFinancial(orderId) {
  console.log("into orderService (confirmFinancial)");

  const requestOptions = {
    headers: authHeader(),
    body: orderId,
  };

  return axios
    .put(`${baseRoute}/order/financial/confirm `, requestOptions.body, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res >>");
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function uploadDoc(data) {
  console.log("into orderService (uploadDoc)");

  const requestOptions = {
    headers: authHeader(),
    body: data,
  };

  return axios
    .post(`${baseRoute}/order/doc`, requestOptions.body, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res >>");
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function showDoc(data) {
  console.log("into orderService (uploadDoc)");

  const requestOptions = {
    headers: authHeader(),
  };

  return axios
    .get(`${baseRoute}/order/doc/${data.orderId}`, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res >>");
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function editSaleOpportunitySellerStatus(data) {
  console.log("into orderService (editSaleOpportunitySellerStatus)");

  const requestOptions = {
    headers: authHeader(),
  };

  return axios
    .put(`${baseRoute}/order/seller/status`, data, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res >>");
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function orderSupport(param) {
  console.log("into orderService (orderSupport)");

  const requestOptions = {
    headers: authHeader(),
  };
  return axios
    .get(`${baseRoute}/order/${param.type}/${encodeURI(param.value)}`, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res >>");
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function addTrackingCode(data) {
  console.log("into orderService (addTrackingCode)");

  const requestOptions = {
    headers: authHeader(),
  };

  return axios
    .post(`${baseRoute}/order/trackingcode`, data, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res >>");
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function failSaleOpportunity(data) {
  console.log("into orderService (failSaleOpportunity)");

  const requestOptions = {
    headers: authHeader(),
  };

  return axios
    .delete(`${baseRoute}/order/opportunity`, {
      data,
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res >>");
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function getFailureReasons(data) {
  console.log("into orderService (getFailureReasons)");

  const requestOptions = {
    headers: authHeader(),
  };

  return axios
    .get(`${baseRoute}/order/failurereasons`, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res >>");
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function editPriority(data) {
  console.log("into orderService (editPriority)");

  const requestOptions = {
    headers: authHeader(),
  };

  return axios
    .put(`${baseRoute}/order/priority`, data, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res >>");
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function editTrackingTime(data) {
  console.log("into orderService (editTrackingTime)");

  const requestOptions = {
    headers: authHeader(),
  };

  return axios
    .put(`${baseRoute}/order/trackingTime`, data, {
      headers: requestOptions.headers,
    })
    .then((res) => {
      console.log("res >>");
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function getPaymentlink(params) {
  console.log("into orderService (editTrackingTime)");
  return axios
    .get(`${baseRoute}/order/payment/${params.orderId}/${params.keylink}`)
    .then((res) => {
      console.log("res >>");
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}
