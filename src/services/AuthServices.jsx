import axios from "axios";
import config from "../../config";
import HttpHeaders from "../helper/httphelper/HttpHeaders";

const AuthServices = {};

AuthServices.loginAdmin = (formdata) => {
  return axios.post(`${config.apiUrl}/api/account/admin/login/`, formdata);
};
AuthServices.getNewToken = (formdata) => {
  return axios.post(`${config.apiUrl}/api/account/token/refresh/`, formdata);
};
AuthServices.create = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/auth/register`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};

AuthServices.forgotPassword = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/auth/forgetpassword`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
AuthServices.verifyOtp = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/auth/verifyotp`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
AuthServices.resetPassword = (formdata) => {
  return axios.put(
    `${config.apiUrl}/api/auth/resetPassword`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};

export default AuthServices;
