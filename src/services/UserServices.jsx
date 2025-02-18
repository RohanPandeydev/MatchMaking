import axios from "axios";
import config from "../../config";
import HttpHeaders from "../helper/httphelper/HttpHeaders";

const UserServices = {};

UserServices.getUserDetails = () => {
  return axios.get(
    `${config.apiUrl}/api/account/me/`,
    HttpHeaders.getAuthHeader()
  );
};

export default UserServices;
