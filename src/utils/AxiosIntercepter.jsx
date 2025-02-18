import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Ensure SweetAlert is imported
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import customContext from "../contexts/Context";
import StorageData from "../helper/storagehelper/StorageData";
import AuthServices from "../services/AuthServices";
import UserServices from "../services/UserServices";
import config from "../../config";

const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(true); // Track token validity
  const userToken = StorageData.getRefreshToken(); // Get the user token from storage
  const location = window.location; // Get current location
  const { setUserData } = customContext();

  // The handleLogout function
  const handleLogout = () => {
    Swal.fire({
      title: "Error",
      text: "Your login session has expired. Please log in again.",
      icon: "error",
    });
    // Assume StorageData is a utility for handling localStorage or session data
    StorageData.removeData();
    window.location.replace("/login"); // Redirect to login page
  };

  // Mutation for refreshing the token
  const mutation = useMutation(
    (formData) => AuthServices.getNewToken(formData),
    {
      onSuccess: (data) => {
        if (data?.data?.access) {
          StorageData.setToken(data?.data?.access); // Save the new access token
          setIsTokenValid(true); // Mark token as valid
        } else {
          handleLogout(); // Token refresh failed, log out user
        }
      },
      onError: (err) => {
        console.log(err.message, "Intercepter");
        Swal.fire({
          title: "Error",
          text: "Session expired. Please log in again.",
          icon: "error",
        });
        handleLogout(); // Log out on error
      },
    }
  );

  // Axios response interceptor for token handling
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        // mutation.mutate({ refresh: userToken });
        console.log("response", response);

        return response;
      }, // Pass through successful responses
      (error) => {
        const requestUrl = error?.config?.url; // Get the request URL
        console.log(requestUrl, "=======");

        // Exclude /api/account/franchise/login/ from interceptor logic
        if (requestUrl === config.apiUrl + "/api/account/admin/login/") {
          return Promise.reject(error); // Do nothing, just pass through
        }

        if (error.response && error.response.status === 401) {
          console.log(error.response);
          // Check if the response has a specific error code indicating admin deactivation
          if (!error?.response?.data?.code.includes("token_not_valid")) {
            Swal.fire({
              title: "User Inactive",
              text: "Your account has been deactivated by the admin. Please contact support.",
              icon: "warning",
            });

            StorageData.removeData();

            setTimeout(() => {
              window.location.replace("/login");
            }, 1000);
          } else {
            // Call the mutation to refresh the token when token is invalid
            mutation.mutate({ refresh: userToken });
          }
        }

        return Promise.reject(error); // Reject the promise to handle other errors normally
      }
    );

    // Cleanup the interceptor on component unmount
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [userToken, mutation]);

  // Query to get user details and handle token expiration
  const { isLoading, isError, data, refetch } = useQuery(
    ["userdetails", userToken?._id, location.pathname],
    () => UserServices.getUserDetails(),
    {
      enabled: !!userToken,
      refetchOnWindowFocus: false, // Avoid unnecessary refetch
      onSuccess: (data) => {
        if (data?.data?.hasOwnProperty("user")) {
          // console.warn(data.data, "===========")

          StorageData.setData({
            staffId: data?.data?.id,
            staffCode: data?.data?.code,
            staffis_deleted: false,
            staffphone: data?.data?.phone || "8017827640",
            staffphone_code: data?.data?.phone_code || "+91",
            staffimage_url: data?.data?.image_url,
            ...data?.data?.user,
            department: data?.data?.department,
            permission: data?.data?.permission || [],
            role:data?.data?.role,
            group:data?.data?.group
          }); // Store user data
          setUserData({
            staffId: data?.data?.id,
            staffCode: data?.data?.code,
            staffis_deleted: false,
            staffphone: data?.data?.phone || "8017827640",
            staffphone_code: data?.data?.phone_code || "+91",
            staffimage_url: data?.data?.image_url,
            ...data?.data?.user,
            department: data?.data?.department,
            permission: data?.data?.permission || [],
            role:data?.data?.role,
            group:data?.data?.group
          }); // Store user data
          setIsTokenValid(true); // Mark token as valid
          return;
        }
        StorageData.setData(data?.data); // Store user data
        setUserData(data?.data); // Store user data
        setIsTokenValid(true); // Mark token as valid
      },
      onError: (err) => {
        if (
          err?.response?.status === 401 &&
          err?.response?.data?.code.includes("token_not_valid")
        ) {
          // If token expired but no admin deactivation, try refreshing the token
          mutation.mutate({ refresh: userToken });
        } else {
          // Show error message and log out for other errors
          Swal.fire({
            title: "Error",
            text: err?.response?.data?.message || err?.message,
            icon: "error",
          });
          handleLogout();
        }
      },
    }
  );

  return null; // No UI component needed
};

export default useAxiosInterceptor;
