import React from "react";
import { createContext, useContext, useState } from "react";
import StorageData from "../helper/storagehelper/StorageData";

const chatContext = createContext();
const ChatContextWrapper = ({ children }) => {
    // const myuserToken = StorageData.getToken();
    // const myUserRefreshToken = StorageData.getRefreshToken();
    // const myuserData = StorageData.getUserData();
    const [socketContext, setSocketContext] = useState(false)
    const [socketUserListing,setSocketUserListing]=useState([])


    return (
        <chatContext.Provider
            value={{
                socketContext, setSocketContext,socketUserListing,setSocketUserListing
            }}
        >
            {children}
        </chatContext.Provider>
    );
};

const WebSocketcustomContext = () => {
    const context = useContext(chatContext);
    if (!context) {
        throw new Error("You are using context out of the boundary");
    }
    return context;
};
export default WebSocketcustomContext;
export { ChatContextWrapper };
