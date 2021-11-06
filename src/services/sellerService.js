import axios from "axios";
import { SERVER_URL } from "../config";
import { authHeader, handleResponse, handleError } from "../helpers";

let baseRoute = SERVER_URL;

axios.interceptors.request.use((request) => {
  console.log("Starting Request", request);
  return request;
});

export const sellerService = {
  addSeller,
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
