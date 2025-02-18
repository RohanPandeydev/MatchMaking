import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import MasterServices from "../services/MasterServices";

const useUpdateContent = (refetchKey) => {
  const queryClient = useQueryClient();

  return useMutation((formdata) => MasterServices.Update(formdata), {
    onSuccess: () => {
      Swal.fire({
        title: "Successful",
        text: "Successfull Updated",
        icon: "success",
      });

      queryClient.refetchQueries(refetchKey);
    },
    onError: (err) => {
      Swal.fire({
        title: "Error",
        text: err?.response?.data?.error || err?.message,
        icon: "error",
      });
    },
  });
};

export default useUpdateContent;
