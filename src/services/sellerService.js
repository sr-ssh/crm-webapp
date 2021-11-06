import axios from "axios";
import { SERVER_URL } from "../config";
import { authHeader, handleError } from "../helpers";

let baseRoute = SERVER_URL;

export const sellerService = {
  addSeller,
  getSeller,
  getSellers
};

function addSeller(params) {
  console.log("into sellerService -> addSeller");

  const requestOptions = {
    headers: authHeader(),
    body: params,
  };
  return axios
    .post(`${baseRoute}/seller`, requestOptions.body, { headers: requestOptions.headers })
    .then((res) => {
      console.log("response add Seller =>>>> ");
      console.log(res);
      return res.data;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function getSeller(params) {
  console.log("into sellerService -> getSeller");

  const requestOptions = {
    headers: authHeader()
  };

  return axios
    .get(`${baseRoute}/seller/${encodeURI(params)}`, requestOptions)
    .then((res) => {
      console.log("response get Seller =>>>> ");
      console.log(res);
      return res.data;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}

function getSellers(filter = {}) {
  console.log("into sellerService -> getSeller");

  const requestOptions = {
    headers: authHeader()
  };

  if (filter.customerName === "") filter.customerName = " ";
  if (filter.customerMobile === "") filter.customerMobile = "0";
  if (filter.startDate === "") filter.startDate = "1900-01-01T05:42:13.845Z";
  if (filter.endDate === "") filter.endDate = "1900-01-01T05:42:13.845Z";
  if (filter.status === "") filter.status = " ";

  return axios
    .get(`${baseRoute}/seller/${encodeURI(filter.company)}/${encodeURI(filter.phone)}`, requestOptions)
    .then((res) => {
      console.log("response get Seller =>>>> ");
      console.log(res);
      return res.data;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        handleError(error.response.status);
      }
    });
}
