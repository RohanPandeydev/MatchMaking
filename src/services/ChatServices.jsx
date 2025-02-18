import axios from "axios";
import config from "../../config";
import HttpHeaders from "../helper/httphelper/HttpHeaders";

const ChatServices = {};

ChatServices.chatUserListing = (formdata) => {
    return axios.get(`${config.apiUrl}/api/chat/tenants${formdata}`, HttpHeaders.getAuthHeader())
};

ChatServices.chatUserDetails = (formdata) => {
    return axios.get(
        `${config.apiUrl}/api/${formdata?.type}/${formdata?.id}/`,
        HttpHeaders.getAuthHeader()
    );
};
ChatServices.fetchUserChat = (formdata) => {
    return axios.get(
        `${config.apiUrl}/api/chat/groupmessages/${formdata}`,
        HttpHeaders.getAuthHeader()
    );
};
ChatServices.chatMediaUpload = (formdata) => {
    return axios.post(`${config.apiUrl}/api/chat/groupmessages/`,formdata, HttpHeaders.getAuthHeader())
};


export default ChatServices;
