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
  console.log("into sellerService -> getSellers");

  const requestOptions = {
    headers: authHeader(),
  };

  if (!filter.company) filter.company = " ";
  if (!filter.phone) filter.phone = " ";
  if (!filter.mobile) filter.mobile = " ";
  if (!filter.address) filter.address = " ";

  return axios
    .get(
      `${baseRoute}/seller/${encodeURI(filter.company)}/${encodeURI(
        filter.phone
      )}/${encodeURI(filter.mobile)}/${encodeURI(filter.address)}`,
      requestOptions
    )
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