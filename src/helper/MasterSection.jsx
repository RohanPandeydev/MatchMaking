import Swal from "sweetalert2";
import MasterServices from "../services/MasterServices";
import ValidateAuthenticationKey from "../utils/ValidationAuthenticationKey";
import { useQuery } from "@tanstack/react-query";

const useFetchMasterSectionData = (url, queryKey, paramschange) => {
    const { data, isLoading } = useQuery(
        [queryKey || "default-key", paramschange], // Using a default key if none is provided
        () => {
         let   queryParams = `category__name=${url}&ordering=created_at`
            queryParams += paramschange&&`&search=${paramschange}`
            return MasterServices.List(queryParams)
        },
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

export default useFetchMasterSectionData;
