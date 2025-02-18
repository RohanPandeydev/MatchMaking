import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import MasterServices from "../services/MasterServices";

const useDeleteMasterContent = (refetchKey) => {
  const queryClient = useQueryClient();

  return useMutation(
    (formdata) => MasterServices.DeleteMasterContent(formdata),
    {
      onSuccess: () => {
        Swal.fire({
          title: "Successful",
          text: "Deleted",
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
    }
  );
};

export default useDeleteMasterContent;
