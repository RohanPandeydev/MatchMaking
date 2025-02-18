import axios from "axios";
import config from "../../config";
import HttpHeaders from "../helper/httphelper/HttpHeaders";

const CampaignServices = {};

CampaignServices.EmailConfiguration = (formdata) => {
    return axios.post(`${config.apiUrl}/api/account/email/config/`, formdata, HttpHeaders.getAuthHeader())
};
CampaignServices.EmailConfigurationUpdate = (formdata) => {
    return axios.put(`${config.apiUrl}/api/account/email/config/${formdata?.id}/`, formdata, HttpHeaders.getAuthHeader())
};
CampaignServices.EmailConfigurationFetchAll = (formdata) => {
    return axios.get(`${config.apiUrl}/api/account/email/config/${formdata}`, HttpHeaders.getAuthHeader())
};
CampaignServices.SmsConfiguration = (formdata) => {
    return axios.post(`${config.apiUrl}/api/account/sms/config/`, formdata, HttpHeaders.getAuthHeader())
};
CampaignServices.SmsConfigurationUpdate = (formdata) => {
    return axios.put(`${config.apiUrl}/api/account/sms/config/${formdata?.id}/`, formdata, HttpHeaders.getAuthHeader())
};
CampaignServices.SmsConfigurationFetchAll = (formdata) => {
    return axios.get(`${config.apiUrl}/api/account/sms/config/${formdata}`, HttpHeaders.getAuthHeader())
};

// Template 

CampaignServices.EmailTemplate = (formdata) => {
    return axios.post(`${config.apiUrl}/api/account/email/template/`, formdata, HttpHeaders.getAuthHeader())
};
CampaignServices.EmailTemplateUpdate = (formdata) => {
    return axios.put(`${config.apiUrl}/api/account/email/template/${formdata.id}/`, formdata, HttpHeaders.getAuthHeader())
};
CampaignServices.EmailTemplateList = (formdata) => {
    return axios.get(`${config.apiUrl}/api/account/email/template/${formdata}`, HttpHeaders.getAuthHeader())
};
CampaignServices.DeleteEmailTemplate = (formdata) => {
    return axios.delete(`${config.apiUrl}/api/account/email/template/${formdata.id}/`, HttpHeaders.getAuthHeader())
};
CampaignServices.SmsTemplate = (formdata) => {
    return axios.post(`${config.apiUrl}/api/account/sms/template/`, formdata, HttpHeaders.getAuthHeader())
};
CampaignServices.SmsTemplateUpdate = (formdata) => {
    return axios.put(`${config.apiUrl}/api/account/sms/template/${formdata.id}/`, formdata, HttpHeaders.getAuthHeader())
};
CampaignServices.SmsTemplateList = (formdata) => {
    return axios.get(`${config.apiUrl}/api/account/sms/template/${formdata}`, HttpHeaders.getAuthHeader())
};
CampaignServices.DeleteSmsTemplate = (formdata) => {
    return axios.delete(`${config.apiUrl}/api/account/sms/template/${formdata.id}/`, HttpHeaders.getAuthHeader())
};
// Campaign Create Bride and groom
CampaignServices.EmailCampaignBrideandgroom = (formdata) => {
    return axios.post(`${config.apiUrl}/api/account/brideandgroom/email/campaign/`, formdata, HttpHeaders.getAuthHeader())
};
CampaignServices.EmailCampaignSendBrideandgroom = (formdata) => {
    return axios.get(`${config.apiUrl}/api/account/brideandgroom/email/campaign/${formdata?.id}/send/`, HttpHeaders.getAuthHeader())
};
CampaignServices.EmailCampaignListBrideandgroom = (formdata = null) => {
    return axios.get(`${config.apiUrl}/api/account/brideandgroom/email/campaign/${formdata}`, HttpHeaders.getAuthHeader())
};
CampaignServices.SmsCampaignBrideandgroom = (formdata) => {
    return axios.post(`${config.apiUrl}/api/account/brideandgroom/sms/campaign/`, formdata, HttpHeaders.getAuthHeader())
};
CampaignServices.SmsCampaignSendBrideandgroom = (formdata) => {
    return axios.get(`${config.apiUrl}/api/account/brideandgroom/sms/campaign/${formdata?.id}/send/`, HttpHeaders.getAuthHeader())
};
CampaignServices.SmsCampaignListBrideandgroom = (formdata = null) => {
    return axios.get(`${config.apiUrl}/api/account/brideandgroom/sms/campaign/${formdata}`, HttpHeaders.getAuthHeader())
};

// Campaign Create Tenant
CampaignServices.EmailCampaignTenant = (formdata) => {
    return axios.post(`${config.apiUrl}/api/account/tenant/email/campaign/`, formdata, HttpHeaders.getAuthHeader())
};
CampaignServices.EmailCampaignSendTenant = (formdata) => {
    return axios.get(`${config.apiUrl}/api/account/tenant/email/campaign/${formdata?.id}/send/`, HttpHeaders.getAuthHeader())
};
CampaignServices.EmailCampaignListTenant = (formdata = null) => {
    return axios.get(`${config.apiUrl}/api/account/tenant/email/campaign/${formdata}`, HttpHeaders.getAuthHeader())
};
CampaignServices.SmsCampaignTenant = (formdata) => {
    return axios.post(`${config.apiUrl}/api/account/tenant/sms/campaign/`, formdata, HttpHeaders.getAuthHeader())
};
CampaignServices.SmsCampaignSendTenant = (formdata) => {
    return axios.get(`${config.apiUrl}/api/account/tenant/sms/campaign/${formdata?.id}/send/`, HttpHeaders.getAuthHeader())
};
CampaignServices.SmsCampaignListTenant = (formdata = null) => {
    return axios.get(`${config.apiUrl}/api/account/tenant/sms/campaign/${formdata}`, HttpHeaders.getAuthHeader())
};




CampaignServices.getFranchiseMemberList = (type) => {
    return axios.get(
        `${config.apiUrl}/api/account/franchise/${type}`,
        HttpHeaders.getAuthHeader()
    );
};
CampaignServices.getOrganizationMemberList = (type) => {
    return axios.get(
        `${config.apiUrl}/api/organizations/v2/list/${type}`,
        HttpHeaders.getAuthHeader()
    );
};
CampaignServices.getBrideandGroomList = (data) => {
    return axios.get(
        `${config.apiUrl}/api/account/brideandgrooms/${data}`,
        HttpHeaders.getAuthHeader()
    );
};
export default CampaignServices;
