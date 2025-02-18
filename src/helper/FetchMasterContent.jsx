import Swal from "sweetalert2";
import MasterServices from "../services/MasterServices";
import ValidateAuthenticationKey from "../utils/ValidationAuthenticationKey";
import { useQuery } from "@tanstack/react-query";

const useFetchMasterData = (url, queryKey) => {
  const { data, isLoading } = useQuery(
    [queryKey || "default-key"], // Using a default key if none is provided
    () => MasterServices.List(`category__name=${url}&is_disabled=false`),
    {
      enabled: !!url,
      refetchOnWindowFocus: false,
      select: (data) => data?.data, // Extract the required data directly
      onError: (err) => {
        console.error("Error fetching data:", err?.message);

        // Handle 401 error specifically
        if (err?.response?.status === 401) {
          ValidateAuthenticationKey(
            err?.response?.status,
            "Your login session has expired. Please log in again."
          );
          return;
        }

        // Show a generic error message for other errors
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );

  return { data, isLoading };
};

export default useFetchMasterData;
