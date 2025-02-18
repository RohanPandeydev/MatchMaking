import secureLocalStorage from "react-secure-storage";
import config from "../../../config";

class StorageData {
  setToken(data) {
    secureLocalStorage.setItem(config.localStorageUserToken, data);
  }
  setRefreshToken(data) {
    secureLocalStorage.setItem(config.localStorageUserRefreshToken, data);
  }
  setData(data) {
    secureLocalStorage.setItem(
      config?.localStorageUserDetails,
      JSON.stringify(data)
    );
  }
  getToken() {
    return secureLocalStorage.getItem(config.localStorageUserToken);
  }
  getRefreshToken() {
    return secureLocalStorage.getItem(config.localStorageUserRefreshToken);
  }

  getUserData() {
    return JSON.parse(
      secureLocalStorage.getItem(config?.localStorageUserDetails)
    );
  }
  removeData() {
    secureLocalStorage.removeItem(config?.localStorageUserRefreshToken);
    secureLocalStorage.removeItem(config?.localStorageUserDetails);
    secureLocalStorage.removeItem(config.localStorageUserToken);
    return;
  }
}

export default StorageData = new StorageData();
