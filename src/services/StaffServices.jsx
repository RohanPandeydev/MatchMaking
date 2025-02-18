import axios from "axios";
import config from "../../config";
import HttpHeaders from "../helper/httphelper/HttpHeaders";

const StaffServices = {};

StaffServices.staffList = (data) => {

  return axios.get(
    `${config.apiUrl}/api/account/staffs/${data}`,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.commentList = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/comments/${data}`,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.staffListWithoutPagination = (data) => {
  if (data) {
    return axios.get(
      `${config.apiUrl}/api/account/staffs/list/${data}`,
      HttpHeaders.getAuthHeader()
    );
  }


  return axios.get(
    `${config.apiUrl}/api/account/staffs/list/`,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.staffListWithoutPaginationWithDepartmentFilter = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/staffs/list/${data}`,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.countryWithCode = (data) => {
  return axios.get(
    `https://countriesnow.space/api/v0.1/countries/codes`);
};
StaffServices.addStaff = (data) => {
  return axios.post(
    `${config.apiUrl}/api/account/staffs/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.addComment = (data) => {
  return axios.post(
    `${config.apiUrl}/api/account/comments/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.updateComment = (data) => {
  return axios.put(
    `${config.apiUrl}/api/account/comments/${data?.id}/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.deleteComment = (data) => {
  return axios.delete(
    `${config.apiUrl}/api/account/comments/${data?.id}`,

    HttpHeaders.getAuthHeader()
  );
};
StaffServices.staffDetails = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/staffs/${data?.id}/`,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.staffUpdate = (data) => {
  return axios.put(
    `${config.apiUrl}/api/account/staffs/${data?.id}/`, data,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.staffUpdateDetails = (data) => {
  return axios.put(
    `${config.apiUrl}/api/account/staffs/${data.get("id")}/`, data,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.departmentsList = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/departments/${data}`,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.departmentsDetails = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/departments/${data?.id}/`,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.departmentUpdate = (data) => {
  return axios.put(
    `${config.apiUrl}/api/account/departments/${data?.id}/`, data,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.departmentsListWithoutPagination = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/departments/all/`,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.addDepartment = (data) => {
  return axios.post(
    `${config.apiUrl}/api/account/departments/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.deleteDepartment = (data) => {
  return axios.delete(
    `${config.apiUrl}/api/account/departments/${data?.id}/`,

    HttpHeaders.getAuthHeader()
  );
};
StaffServices.deleteStaff = (data) => {
  return axios.delete(
    `${config.apiUrl}/api/account/staffs/${data?.id}/`,

    HttpHeaders.getAuthHeader()
  );
};

// Staff Management
StaffServices.role = (data) => {
  return axios.post(
    `${config.apiUrl}/api/account/roles/`, data,

    HttpHeaders.getAuthHeader()
  );
};
StaffServices.roleList = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/roles/${data}`,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.NoPaginationRoleList = () => {
  return axios.get(
    `${config.apiUrl}/api/account/roles/all/`,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.team = (data) => {
  return axios.post(
    `${config.apiUrl}/api/account/groups/`, data,

    HttpHeaders.getAuthHeader()
  );
};
StaffServices.teamList = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/groups/${data}`,
    HttpHeaders.getAuthHeader()
  );
};

StaffServices.addPermission = (data) => {
  return axios.post(
    `${config.apiUrl}/api/account/permissions/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
StaffServices.permissionListWithoutPagination = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/permissions/all/`,
    HttpHeaders.getAuthHeader()
  );
};

StaffServices.permissionList = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/permissions/${data}`,
    HttpHeaders.getAuthHeader()
  );
};

export default StaffServices;
