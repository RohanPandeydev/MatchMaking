// import { toast } from 'react-toastify'

import Swal from "sweetalert2";
import StorageData from "../helper/storagehelper/StorageData";

const ValidateAuthenticationKey = (statusCode, msg) => {
  if (statusCode === 401) {
    // toast.error(msg, { delay: 10 })
    Swal.fire({
      title: "Error",
      text: msg,
      icon: "error",
    });
    StorageData.removeData();
    setTimeout(() => {
      return window.location.replace("/login");
    }, 700);
  }

  return;
};

export default ValidateAuthenticationKey;
