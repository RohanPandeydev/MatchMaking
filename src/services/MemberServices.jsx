import axios from "axios";
import config from "../../config";
import HttpHeaders from "../helper/httphelper/HttpHeaders";

const MemberServices = {};

MemberServices.createFranchiseMember = (data) => {
  return axios.post(
    `${config.apiUrl}/api/account/franchise/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.updateFranchiseMember = (data) => {
  const id = typeof data.get === "function" ? data.get("id") : data.id;
  return axios.put(
    `${config.apiUrl}/api/account/franchise/${id}/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.getMemberShipData = (type) => {
  return axios.get(
    `${config.apiUrl}/api/account/memberships/?${type}`,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.getFranchiseMemberList = (type) => {
  return axios.get(
    `${config.apiUrl}/api/account/franchise/${type}`,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.getFranchiseMemberDetails = (id) => {
  return axios.get(
    `${config.apiUrl}/api/account/franchise/${id}`,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.createOrganizationMember = (data) => {
  return axios.post(
    `${config.apiUrl}/api/organizations/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.getOrganizationMemberList = (type) => {
  return axios.get(
    `${config.apiUrl}/api/organizations/v2/list/${type}`,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.getOrganizationMemberDetails = (id) => {
  return axios.get(
    `${config.apiUrl}/api/organizations/${id}/`,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.updateOrganizationMemberDetails = (id, data) => {
  return axios.put(
    `${config.apiUrl}/api/organizations/${id}/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.ConversionFranchiseToOrganization = (data) => {
  return axios.put(
    `${config.apiUrl}/api/organizations/${data?.id}/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.ConversionOrganizationToFranchise = (data) => {
  return axios.put(
    `${config.apiUrl}/api/account/franchise/${data?.id}/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.multiSelectOrganizationAction = (data) => {
  return axios.put(
    `${config.apiUrl}/api/organizations/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.multiSelectOrganizationDelete = (data) => {
  return axios.delete(`${config.apiUrl}/api/organizations/`, {
    ...HttpHeaders.getAuthHeader(), // Spread the headers object here
    data: data, // Attach the data to the request
  });
};
MemberServices.multiSelectFranchiseDelete = (data) => {
  return axios.delete(`${config.apiUrl}/api/account/franchise/`, {
    ...HttpHeaders.getAuthHeader(), // Spread the headers object here
    data: data, // Attach the data to the request
  });
};

MemberServices.multiSelectFranchiseAction = (data) => {
  return axios.put(
    `${config.apiUrl}/api/account/franchise/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.deleteFranchise = (id) => {
  return axios.delete(
    `${config.apiUrl}/api/account/franchise/${id}/`,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.deleteOrganization = (id) => {
  return axios.delete(
    `${config.apiUrl}/api/organizations/${id}/`,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.statusChangeUserFranchise = (data) => {
  return axios.put(
    `${config.apiUrl}/api/account/users/${data?.id}/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
MemberServices.statusChangeUserOrganization = (data) => {
  return axios.put(
    `${config.apiUrl}/api/account/users/${data?.id}/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};

export default MemberServices;
