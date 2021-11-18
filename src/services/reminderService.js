import axios from "axios";
import { SERVER_URL } from "../config";
import { authHeader , handleError } from "../helpers";

let baseRoute = SERVER_URL;

export const reminderService = {
  getReminders,
  addReminder,
};

function getReminders() {
  console.log("into reminderService");

  const requestOptions = {
    headers: authHeader(),
  };

  return axios
    .get(`${baseRoute}/reminder`, requestOptions)
    .then((res) => {
      console.log("res.customers >> ");
      console.log(res.data.data);
      return res.data;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      }
    });
}

function addReminder(param) {
  console.log("into reminderService (addReminder)");

  const requestOptions = {
    headers: authHeader(),
  };

  return axios
    .post(`${baseRoute}/reminder`, param, { headers: requestOptions.headers })
    .then((res) => {
      console.log("res.customers >> ");
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
