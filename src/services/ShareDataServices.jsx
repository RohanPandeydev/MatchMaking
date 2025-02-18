
import axios from "axios"
import config from "../../config"
import HttpHeaders from '../helper/httphelper/HttpHeaders'


const ShareDataServices = {}

ShareDataServices.getShareDataGroomList = (data) => {
    return axios.get(`${config.apiUrl}/api/account/brideandgrooms/${data}`, HttpHeaders.getAuthHeader())
}

ShareDataServices.getFranchiseList = (data) => {
    if(data){
        let query=`account_type=franchise&${data}`

        return axios.get(`${config.apiUrl}/api/account/tenant?${query}`, HttpHeaders.getAuthHeader())
    }
    return axios.get(`${config.apiUrl}/api/account/tenant?account_type=franchise`, HttpHeaders.getAuthHeader())
}

ShareDataServices.getOrganizationList = (data) => {
    if(data){
        let query=`account_type=org&${data}`

        return axios.get(`${config.apiUrl}/api/account/tenant?${query}`, HttpHeaders.getAuthHeader())
    }
    return axios.get(`${config.apiUrl}/api/account/tenant?account_type=org`, HttpHeaders.getAuthHeader())
    // return axios.get(`${config.apiUrl}/api/organizations/list`, HttpHeaders.getAuthHeader())
}

ShareDataServices.getOrganizationFrachiseList = (type) => {
    if (!type) {
        return []
    }
    return axios.get(`${config.apiUrl}/api/account/tenant?${type}`, HttpHeaders.getAuthHeader())
    // return axios.get(`${config.apiUrl}/api/organizations/list`, HttpHeaders.getAuthHeader())
}

ShareDataServices.ShareDataCreate = (data) => {

    return axios.post(`${config.apiUrl}/api/account/sharedata/`, data, HttpHeaders.getAuthHeader())
}



export default ShareDataServices;