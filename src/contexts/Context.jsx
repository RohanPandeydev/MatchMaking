import React from "react";
import { createContext, useContext, useState } from "react";
import StorageData from "../helper/storagehelper/StorageData";

const userContext = createContext();
const ContextWrapper = ({ children }) => {
  const myuserToken = StorageData.getToken();
  const myUserRefreshToken = StorageData.getRefreshToken();
  const myuserData = StorageData.getUserData();
  const [token, setToken] = useState(myuserToken ? myuserToken : "");
  const [chatDetails, setChatDetails] = useState("")
  const [refreshToken, setRefreshToken] = useState(
    myUserRefreshToken ? myUserRefreshToken : ""
  );
  const [userData, setUserData] = useState(
    myuserData != null ? myuserData : {}
  );

  const loggedInStaffId =(!myuserData?.is_superuser && myuserData?.staffId) || false

  return (
    <userContext.Provider
      value={{
        token,
        setToken,
        userData,
        setUserData,
        refreshToken,
        setRefreshToken,
        setChatDetails,
        chatDetails,
        loggedInStaffId

      }}
    >
      {children}
    </userContext.Provider>
  );
};

const customContext = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("You are using context out of the boundary");
  }
  return context;
};
export default customContext;
export { ContextWrapper };
