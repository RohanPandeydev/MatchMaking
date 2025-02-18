


import axios from "axios"
import config from "../../config"
import HttpHeaders from '../helper/httphelper/HttpHeaders'


const SubscriptionServices = {}

SubscriptionServices.getSubscriptionOrganizationList = (type) => {
    
    return axios.get(`${config.apiUrl}/api/account/subscriptions/${type}`,HttpHeaders.getAuthHeader())
}
SubscriptionServices.getSubscriptionCustomerList = (type) => {
    
    return axios.get(`${config.apiUrl}/api/account/customer/subscription`,HttpHeaders.getAuthHeader())
}
SubscriptionServices.getSubscriptionFranchiseByDetails = (data) => {
    
    return axios.get(`${config.apiUrl}/api/account/subscriptions/${data?.id}/`,HttpHeaders.getAuthHeader())
}

SubscriptionServices.getSubscriptionOrganizationByDetails = (data) => {
    if(!data?.id){
        return []
    }
    
  return axios.get(`${config.apiUrl}/api/account/subscriptions/${data?.id}/`,HttpHeaders.getAuthHeader())
}
SubscriptionServices.subscriptionDeleteOrganizationPkg = (data) => {
    
    return axios.delete(`${config.apiUrl}/api/account/subscriptions/${data?.id}/`,HttpHeaders.getAuthHeader())
}
SubscriptionServices.SubscriptionOrganizationCreate = (data) => {
    
    return axios.post(`${config.apiUrl}/api/account/subscriptions/`,data,HttpHeaders.getAuthHeader())
}
SubscriptionServices.SubscriptionOrganizationUpdate = (data) => {
    
    return axios.put(`${config.apiUrl}/api/account/subscriptions/${data?.id}/`,data,HttpHeaders.getAuthHeader())
}
SubscriptionServices.getSubscriptionCustomerByDetails = (data) => {
    
    return axios.get(`${config.apiUrl}/api/account/customer/subscription/${data?.id}/`,HttpHeaders.getAuthHeader())
}
SubscriptionServices.SubscriptionCustomerCreate = (data) => {
    
    return axios.post(`${config.apiUrl}/api/account/customer/subscription`,data,HttpHeaders.getAuthHeader())
}
SubscriptionServices.SubscriptionCustomerPlanCreate= (id, data) => {
    // console.log("data",data)
    return axios.post(`${config.apiUrl}/api/account/customer/subscription/${id}/plan`,data,HttpHeaders.getAuthHeader())
}
SubscriptionServices.SubscriptionFranchiseUpdate = (data) => {
    
    return axios.put(`${config.apiUrl}/api/account/subscriptions/${data?.id}/`,data,HttpHeaders.getAuthHeader())
}
SubscriptionServices.getSubscriptionFranchiseList = (type) => {
    
    return axios.get(`${config.apiUrl}/api/account/subscriptions/${type}`,HttpHeaders.getAuthHeader())
}
SubscriptionServices.SubscriptionFranchiseCreate = (data) => {
    
    return axios.post(`${config.apiUrl}/api/account/subscriptions/`,data,HttpHeaders.getAuthHeader())
}
SubscriptionServices.subscriptionDeleteFranchisePkg = (data) => {
    
    return axios.delete(`${config.apiUrl}/api/account/subscriptions/${data?.id}/`,HttpHeaders.getAuthHeader())
}

// Payment Gateway
SubscriptionServices.getPaymentGatewayList = () => {
    
    return axios.get(`${config.apiUrl}/api/account/paymentgatewaycategory/`,HttpHeaders.getAuthHeader())
}

export default SubscriptionServices;