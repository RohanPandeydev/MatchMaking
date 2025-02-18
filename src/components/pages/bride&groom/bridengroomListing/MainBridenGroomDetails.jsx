import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ApprovedCustomerDetails from "../approvedcustomer/ApprovedCustomerDetails";
import ViewLeadDetailsPage from "../leads/view/ViewLeadDetailsPage";

const MainBridenGroomDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const queryParameter = queryParams.get("details");
  const [isComeFrom, setIsComeFrom] = useState("");
  const { id } = useParams();
  useEffect(() => {
    try {
      const decodeQuery = queryParameter && atob(queryParameter);

      queryParameter && setIsComeFrom(() => decodeQuery || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [queryParameter]);

  if (isComeFrom == 'approve') return <ApprovedCustomerDetails id={id} />;
  return <ViewLeadDetailsPage id={id} />;
};

export default MainBridenGroomDetails;
