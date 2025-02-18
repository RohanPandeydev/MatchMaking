import axios from "axios";
import config from "../../config";
import HttpHeaders from "../helper/httphelper/HttpHeaders";

const BridenGroomServices = {};

BridenGroomServices.createbridenGroomLeadForm = (data) => {
  return axios.post(
    `${config.apiUrl}/api/account/brideandgrooms/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.assignbrideandgroom = (data) => {
  return axios.post(
    `${config.apiUrl}/api/account/staff/sharedata/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.assignstafftotenant = (data) => {
  return axios.post(
    `${config.apiUrl}/api/account/staff/tenant/sharedata/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};

BridenGroomServices.updatebridenGroomLeadForm = (data) => {
  return axios.put(
    `${config.apiUrl}/api/account/brideandgrooms/${data?.id}/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.createbridenGroomLeadFormPhotos = (data) => {
  return axios.post(
    `${config.apiUrl}/api/account/photos/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.deleteImageUpload = (data) => {
  return axios.delete(
    `${config.apiUrl}/api/account/photos/${data?.id}`,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.updatebridenGroomLeadFormPhotos = (data) => {
  return axios.put(
    `${config.apiUrl}/api/account/photos/${data?.id}/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.getBridenGroomDetailsById = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/brideandgrooms/${data?.id}/`,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.getBridenGroomAlls = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/brideandgrooms/${data}`,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.getBridenGroomAlls = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/brideandgrooms/${data}`,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.getMatchedBridenGroom = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/matchreport/brideandgrooms/${data}`,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.getSender_ReceiverMatchReport = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/brideandgrooms/requests/${data}`,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.getBridenGroomByOrgFranchiseId = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/sharedata/${data}`,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.getBridenGroomPhotoDetailsById = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/photos/${data?.id}/`,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.getBridenGroomShareDataById = (type) => {
  return axios.get(
    `${config.apiUrl}/api/account/sharedata/${type}`,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.getPersonalizedBrideAndGroomListing = (type) => {
  return axios.get(
    `${config.apiUrl}/api/account/staff/sharedata/${type}`,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.deleteBridenGroom = (data) => {
  return axios.delete(
    `${config.apiUrl}/api/account/brideandgrooms/${data?.id}/`,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.multiDeleteBridenGroom = (data) => {
  return axios.delete(`${config.apiUrl}/api/account/brideandgrooms/`, {
    ...HttpHeaders.getAuthHeader(), // Spread the headers object here
    data: data, // Attach the data to the request
  });
};
// Request List

BridenGroomServices.getBridenGroomRequestList = (data) => {
  return axios.get(
    `${config.apiUrl}/api/account/brideandgroomlogs/${data}`,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.updateRequestLog = (data) => {
  return axios.put(
    `${config.apiUrl}/api/account/brideandgroomlogs/${data?.id}/`,
    data,
    HttpHeaders.getAuthHeader()
  );
};
BridenGroomServices.deleteBridenGroomRequestLog = (data) => {
  return axios.delete(
    `${config.apiUrl}/api/account/brideandgroomlogs/${data?.id}/`,
    HttpHeaders.getAuthHeader()
  );
};



// Story 
BridenGroomServices.getStory = (data) => {

  return axios.get(`${config.apiUrl}/api/account/brideandgrooms/stories/${data}`, HttpHeaders.getAuthHeader())

}
BridenGroomServices.deleteStory = (data) => {
  return axios.delete(`${config.apiUrl}/api/account/brideandgroom/story/${data.id}/`, HttpHeaders.getAuthHeader())

}

export default BridenGroomServices;
