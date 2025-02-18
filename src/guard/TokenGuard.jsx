import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import StorageData from "../helper/storagehelper/StorageData";
import UserServices from "../services/UserServices";
import AuthServices from "../services/AuthServices";
import Loader from "../utils/Loader/Loader";
import customContext from "../contexts/Context";

const TokenGuard = ({ children }) => {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const userToken = StorageData.getRefreshToken();
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken, setUserData } = customContext();

  const mutation = useMutation(
    (formData) => AuthServices.getNewToken(formData),
    {
      onSuccess: (data) => {
        if (data?.data?.access) {
          StorageData.setToken(data?.data?.access);
          setToken(data?.data?.access);

          setIsTokenValid(true); // Token is now valid
        } else {
          handleLogout();
        }
      },
      onError: () => {
        Swal.fire({
          title: "Error",
          text: "Session expired. Please log in again.",
          icon: "error",
        });
        handleLogout();
      },
    }
  );

  const { isLoading, isError, data, refetch } = useQuery(
    ["userdetails", userToken?._id, location.pathname],
    () => UserServices.getUserDetails(),
    {
      enabled: !!userToken,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        StorageData.setData(data?.data);
        setUserData(data?.data);
        setIsTokenValid(true); // User details are valid, token is valid
      },
      onError: (err) => {
        if (err?.response?.status === 401) {
          mutation.mutate({ refresh: userToken });
          return;
        } else {
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

  const handleLogout = () => {
    Swal.fire({
      title: "Error",
      text: " Your login session has expired. Please log in again.",
      icon: "error",
    });
    StorageData.removeData();
    navigate("/login");
  };

  // While loading the token validation, display a loading screen
  if (isLoading || !isTokenValid) return <Loader />;
  if (isError) return navigate("/login");

  // Once token is valid, render the children (e.g., Dashboard)
  return <>{children}</>;
};

export default TokenGuard;
