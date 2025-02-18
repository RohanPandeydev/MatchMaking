import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import profileUser from "../../../../assets/images/no-images-available.jpg";
import Wrapper from "../../../layouts/Wrapper";
import MemberServices from "../../../../services/MemberServices";
import Swal from "sweetalert2";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../utils/Loader/Loader";
import config from "../../../../../config";
import BridenGroomList from "../BridenGroomList";
import BridenGroomServices from "../../../../services/BridenGroomServices";
import moment from "moment";
import NoActiveDataFound from "../../../../utils/NoActiveDataFound";
import { FcAndroidOs } from "react-icons/fc";
import { FaAppStoreIos } from "react-icons/fa";
import { SiPostman } from "react-icons/si";
import StaffServices from "../../../../services/StaffServices";
import ListingCommentModule from "../../../../utils/ListingCommentModule";
import CommentModule from "../../../../utils/CommentModule";
import StorageData from "../../../../helper/storagehelper/StorageData";
import PermissionSets from "../../../../guard/Method";
import { IsAccessibleMethodBMS } from "../../../../guard/Rbac";

const ViewFranchiseDetails = () => {
  const { id: franchiseId } = useParams();
  const [id, setId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  // Extract initial page from query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = useState(initialPage);

  const { data: franchise_details, isLoadFranchiseDetails } = useQuery(
    ["franichise-details", id],
    () => {
      return MemberServices.getFranchiseMemberDetails(id);
    },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      select: (data) => {
        console.log(data.data, "Franchise Details Data");
        return data?.data;
      },
      onError: (err) => {
        if (err?.response?.status == 401) {
          ValidateAuthenticationKey(
            err?.response?.status,
            "Your login session has expired. Please log in again."
          );
          return;
        }
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );

  const { data, isLoading: isLoadingData } = useQuery(
    ["bridengroomdata-listing-list-by-id-franchise", pageNumber, id],
    () =>
      BridenGroomServices.getBridenGroomByOrgFranchiseId(
        `?page=${pageNumber}&is_approve=${1}&tenant=${id}`
      ),
    {
      enabled: !!id,
      onSuccess: (data) => {
        const total = Math.ceil(data?.data?.count / 10);
        // setTotalPages(total);
      },
      onError: (err) => {
        if (err?.response?.status == 401) {
          ValidateAuthenticationKey(
            err?.response?.status,
            "Your login session has expired. Please log in again."
          );
          return;
        }
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );

  useEffect(() => {
    try {
      const decodeId = franchiseId && atob(franchiseId);

      franchiseId && setId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [franchiseId]);
  useEffect(() => {
    setPageNumber(initialPage);
  }, [initialPage]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // resetTimer()
        deleteBridenGroom.mutate({ id: id });
      }
    });
  };
  const deleteBridenGroom = useMutation(
    (formdata) => {
      return BridenGroomServices.deleteBridenGroom(formdata);
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          title: "Successfull",
          text: "Deleted",
          icon: "success",
        });
        // queryClient.invalidateQueries("subscription-organization");
        queryClient.refetchQueries([
          "bridengroomdata-listing-list-by-id-franchise",
          pageNumber,
        ]);
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
        // alert(err?.response?.data?.error || err?.message);
      },
    }
  );

  const { data: membershipData, isLoadMemberShipData } = useQuery(
    ["member-ship-data", id],
    () => {
      return MemberServices.getMemberShipData(`tenant=${id}`);
    },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      select: (data) => {
        console.log(data.data, "Franchise Details Data");
        return data?.data;
      },
      onError: (err) => {
        if (err?.response?.status == 401) {
          ValidateAuthenticationKey(
            err?.response?.status,
            "Your login session has expired. Please log in again."
          );
          return;
        }
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );

  useEffect(() => {
    try {
      const decodeId = franchiseId && atob(franchiseId);

      franchiseId && setId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [franchiseId]);



  // View Comment modal

  const loggedInUserId = StorageData.getUserData()?.staffId
  const isSuperUser = StorageData.getUserData()?.is_superuser
  const [toggleViewAddComment, setToggleViewAddComment] = useState(false);
  const today = moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(today)
  const [text, setText] = useState("");
  const [textErr, setTextErr] = useState("");
  const [editId, setEditId] = useState("")
  const [activityId, setActivityId] = useState("")
  const [AddCommentTab, setAddCommentTab] = useState(0);


  const handleDateFilter = (e) => {
    setDate(e?.target?.value)
  }

  const handleResetDateFilter = () => {
    setDate(today)
  }
  const handleViewAddComment = () => {
    queryClient.invalidateQueries("comment-listing");

    setToggleViewAddComment(!toggleViewAddComment)
  };
  const handleCloseAddComment = () => {
    setToggleViewAddComment(false)
    setAddCommentTab(0)
    setEditId("")
    setText("")
    setTextErr("")
    setActivityId("")
    queryClient.invalidateQueries("comment-listing");
    queryClient.refetchQueries(["comment-listing", 1]);

  }

  // horizontal tab
  const toggleAddCommentTab = (id) => {
    if (AddCommentTab != id) {
      setAddCommentTab(id);
      id != 0 && setActivityId(id)
    }
  };


  const handleEditorChange = (e) => {
    setText(e.htmlValue);
  };




  const handleSubmit = () => {
    if (!!!text) {
      setTextErr("Required");
      return;
    }
    if (!activityId) {

      Swal.fire({
        title: "Error",
        text: "Activity required",
        icon: "error",
      });
      return;
    }

    const sendObj = {
      content: text,
      categoryoption: activityId,
      tenant: id,
      is_admin: false,
      masterstaff: null
    }
    if (loggedInUserId) {
      sendObj.masterstaff = loggedInUserId;
    } else {
      sendObj.is_admin = true;
    }
    if (editId) {
      sendObj.id = editId
      sendObj.categoryoption = activityId,
        UpdateComment?.mutate(sendObj)
      return
    }
    CommentModuleApi.mutate(sendObj)
  }






  const UpdateComment = useMutation(
    (formdata) => {
      return StaffServices.updateComment(formdata);
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          title: "Successfull",
          text: editId ? "Comment updated" : "Comment added ",
          icon: "success",
        });
        handleCloseAddComment()
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
        // alert(err?.response?.data?.error || err?.message);
      },
    }
  );
  const CommentDelete = useMutation(
    (formdata) => {
      return StaffServices.deleteComment(formdata);
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          title: "Successfull",
          text: "Comment deleted ",
          icon: "success",
        });

        handleCloseAddComment()
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
        // alert(err?.response?.data?.error || err?.message);
      },
    }
  );


  const CommentModuleApi = useMutation(
    (formdata) => {
      return StaffServices.addComment(formdata);
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          title: "Successfull",
          text: editId ? "Comment updated" : "Comment added ",
          icon: "success",
        });
        handleCloseAddComment()
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
        // alert(err?.response?.data?.error || err?.message);
      },
    }
  );

  const handleDeleteComment = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // resetTimer()
        CommentDelete.mutate({ id: id });
      }
    });

  }

  const handleEditComment = (each) => {
    console.log(toggleAddCommentTab)
    !toggleViewAddComment && setToggleViewAddComment(true)
    setEditId(each?.id)
    setActivityId(each?.categoryoption?.id)
    setAddCommentTab(each?.categoryoption?.id)
    setText(each?.content)
  }







  return (
    <Wrapper>
      <div className="common-db-head mb-4">
        <Row className="align-items-center">
          <Col md="6">
            {/* <h4>Subscription</h4> */}
          </Col>
          <IsAccessibleMethodBMS
            method={Object.keys(PermissionSets.member.Member.Comment)[0]}
            route={window.location.pathname}
            name={"Comment"}

          >
            <Col md="6">
              <div className="text-end">
                <Button className="btn green-btn text-dark" onClick={handleViewAddComment}>Add Comment</Button>
              </div>
            </Col>
          </IsAccessibleMethodBMS>
        </Row>
      </div>
      {isLoadFranchiseDetails ? (
        <Loader />
      ) : (
        <div className="member-org-details-wrapper">
          <Row>
            <Col lg="6" className="mb-3">
              <div className="org-profile-details-wrap mb-4">
                <div className="member-org-profile-name-wrap">
                  <div className="profile-dtls-prof-img offline">
                    <div className="prof-img">
                      <img
                        src={
                          (franchise_details?.image_url &&
                            `${config.apiUrl}${franchise_details?.image_url}`) ||
                          profileUser
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="profile-dtls-prof-info">
                    <h3> {franchise_details?.name || ""}</h3>
                    {/* <h5>NMGH245903</h5> */}
                  </div>
                  <div className="member-code">{franchise_details?.code || "N/A"}</div>
                </div>
                <div className="member-org-profile-info-wrap">
                  <IsAccessibleMethodBMS
                    method={Object.keys(PermissionSets.member.Member.Credential)[0]}
                    route={window.location.pathname}
                    name={"Credential"}

                  >
                    <p>
                      <span>Email Id :</span>{" "}
                      {franchise_details?.user?.email || ""}
                    </p>
                    <p>
                      <span>Phone Number :</span>{" "}
                      {franchise_details?.phone || ""}
                    </p>
                    <p>
                      <span>Occupation :</span> Teacher
                    </p>
                    <p>
                      <span>Country :</span> {franchise_details?.country || ""}
                    </p>
                    <p>
                      <span>State :</span> {franchise_details?.state || ""}
                    </p>
                    <p>
                      <span>City :</span> {franchise_details?.city || ""}
                    </p>
                    <p>
                      <span>Address :</span> {franchise_details?.address || ""}
                    </p>
                  </IsAccessibleMethodBMS>
                  <p>
                    <span>Apps :</span>
                    {franchise_details?.apps && JSON.parse(franchise_details?.apps)?.android && <FcAndroidOs /> || ""}
                    {franchise_details?.apps && JSON.parse(franchise_details?.apps)?.ios && <FaAppStoreIos /> || ""}
                    {franchise_details?.apps && JSON.parse(franchise_details?.apps)?.api && <SiPostman /> || ""}
                  </p>
                  <IsAccessibleMethodBMS
                    method={Object.keys(PermissionSets.member.Member.Subscription)[0]}
                    route={window.location.pathname}
                    name={"Subscription"}

                  >
                    <p>
                      <span>Active Subscription :</span>{" "}
                      {franchise_details?.subscription?.name || "N/A"} (
                      {franchise_details?.subscription?.cost || "0"} ca$)
                    </p>
                    <p>
                      <span>No Of Subscriptions Purchased :</span>{" "}
                      {franchise_details?.subscription_count || 0}
                    </p>
                    <p>
                      <span>Balance:</span> {franchise_details?.balance || 0}
                    </p>
                  </IsAccessibleMethodBMS>
                  <p>
                    <span>No Of Bride n Groom Shared:</span>{" "}
                    {franchise_details?.brideandgroom_count || 0}
                  </p>
                  <p>
                    <span>Registration number:</span>{" "}
                    {franchise_details?.registration_num || 0}
                  </p>
                  <p>
                    <span>Verification number:</span>{" "}
                    {franchise_details?.verification_num || 0}
                  </p>
                </div>
              </div>
              {/* <div className="org-profile-location-wrap">
                <div className="title">
                  <h4>Location</h4>
                </div>
                <div className="org-profile-location-info-wrap">
                  <p>
                    <span>Country :</span> Sweden
                  </p>
                  <p>
                    <span>City :</span> Solna
                  </p>
                  <p>
                    <span>Region :</span> Stockholm
                  </p>
                </div>
              </div> */}
              <div className="org-profile-activity-wrap">
                <div className="activity-heading">
                  <h4>
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        fill="currentColor"
                        width="1em"
                        height="1em"
                        viewBox="0 0 28.102 26.303"
                      >
                        <g
                          id="noun-transaction-7128728"
                          transform="translate(-1.984 -5.051)"
                        >
                          <path
                            id="Path_13815"
                            data-name="Path 13815"
                            d="M25.993,6.517a2.62,2.62,0,0,0-1.857.77l0,0a2.623,2.623,0,0,0-.77,1.857v3.641h5.259V9.147a2.62,2.62,0,0,0-.77-1.857l0,0a2.623,2.623,0,0,0-1.857-.77ZM13.537,17.639a.732.732,0,1,1,0-1.463h5.745a.732.732,0,1,1,0,1.463Zm0-3.306a.732.732,0,1,1,0-1.463h5.745a.732.732,0,1,1,0,1.463Zm0-3.306a.732.732,0,1,1,0-1.463h5.745a.732.732,0,1,1,0,1.463ZM10.932,27.485a.732.732,0,1,1,0-1.463h1.637l1.086-1.907a.729.729,0,0,1,1.269,0l.28.493.72-1.265a.729.729,0,0,1,1.34.174l.445,1.679h1.574a.732.732,0,1,1,0,1.463H17.146a.734.734,0,0,1-.705-.546l-.131-.5-.47.825a.729.729,0,0,1-1.269,0l-.28-.493-.634,1.114a.732.732,0,0,1-.663.423h-2.06ZM6.065,25.672a.732.732,0,0,1,0-1.463H9.345a.732.732,0,1,1,0,1.463Zm0-4.729a.732.732,0,1,1,0-1.463H19.282a.732.732,0,1,1,0,1.463ZM7.153,9.533a.732.732,0,0,1,1.463,0v.1a2.372,2.372,0,0,1,1.632,2.248.732.732,0,0,1-1.463,0,.9.9,0,0,0-1.512-.665l-.026.027A.908.908,0,0,0,7.22,12.5l.027.026a.9.9,0,0,0,.638.263,2.355,2.355,0,0,1,1.669.693l0,0A2.357,2.357,0,0,1,9.6,16.772l-.043.047a2.368,2.368,0,0,1-.94.577v.1a.732.732,0,0,1-1.463,0v-.1a2.368,2.368,0,0,1-1.632-2.25.732.732,0,0,1,1.463,0,.9.9,0,0,0,1.539.637l.027-.026a.9.9,0,0,0-.665-1.512,2.361,2.361,0,0,1-1.672-.693l-.043-.047a2.361,2.361,0,0,1,.043-3.3l.047-.043a2.381,2.381,0,0,1,.893-.534v-.1Zm16.21,4.715V30.623a.732.732,0,0,1-.732.732H2.716a.732.732,0,0,1-.732-.732V9.145A4.106,4.106,0,0,1,6.078,5.051H25.994a4.083,4.083,0,0,1,2.889,1.2l0,0a4.085,4.085,0,0,1,1.2,2.889v4.372a.732.732,0,0,1-.732.732Zm-.5-7.734H6.077A2.638,2.638,0,0,0,3.448,9.143V29.89H21.9V9.143a4.067,4.067,0,0,1,.966-2.63Z"
                            transform="translate(0)"
                          />
                        </g>
                      </svg>
                    </span>
                    Transaction
                  </h4>
                </div>
                <div className="profile-activity-wrap">
                  <div className="profile-activity-list">
                    <h4>
                      #3659 15 July, 2024 - <strong>20.00 Ca$</strong>{" "}
                      <span className="green-btn ms-2">Completed</span>
                    </h4>
                    <p>Pro Light Subscription</p>
                  </div>
                  <div className="profile-activity-list">
                    <h4>
                      #3658 15 July, 2024 - 20.00 Ca${" "}
                      <span className="green-btn ms-2">Completed</span>
                    </h4>
                    <p>Pro Max Subscription</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="6" className="mb-3">
              <div className="org-profile-activity-wrap">
                <div className="activity-title">
                  <h4>Comments</h4>
                </div>

                <ListingCommentModule handleEditComment={handleEditComment} handleDeleteComment={handleDeleteComment} loggedInUserId={loggedInUserId} date={date} tenant={id} isDate={false} />

                <div className="activity-heading">
                  <h4>
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        fill="currentColor"
                        width="1em"
                        height="1em"
                        viewBox="0 0 28.28 32.361"
                      >
                        <g
                          id="noun-member-7020663"
                          transform="translate(-9.05 -3)"
                        >
                          <path
                            id="Path_13813"
                            data-name="Path 13813"
                            d="M23.191,7.14a5.5,5.5,0,0,1,1.664,10.744A10.644,10.644,0,0,1,33.7,26.766a.506.506,0,0,1-1,.151,9.627,9.627,0,0,0-19.027,0,.506.506,0,0,1-1-.151,10.644,10.644,0,0,1,8.848-8.883A5.49,5.49,0,0,1,19.3,16.529l-.028-.03a5.5,5.5,0,0,1,3.916-9.361ZM17.2,30.78H14.431A4.889,4.889,0,0,1,9.55,25.9V8.381A4.889,4.889,0,0,1,14.431,3.5H31.95A4.868,4.868,0,0,1,35.4,4.932l.028.03a4.862,4.862,0,0,1,1.4,3.419V25.9A4.866,4.866,0,0,1,35.4,29.346l0,0a4.869,4.869,0,0,1-3.445,1.431H29.185a6.444,6.444,0,0,1-1.44,2.195l0,0a6.43,6.43,0,0,1-9.1,0l0,0A6.429,6.429,0,0,1,17.2,30.779Zm12.289-1.012h2.462A3.875,3.875,0,0,0,35.818,25.9V8.381a3.862,3.862,0,0,0-1.111-2.71l-.025-.024a3.859,3.859,0,0,0-2.733-1.136H14.431a3.877,3.877,0,0,0-3.869,3.869V25.9a3.877,3.877,0,0,0,3.869,3.869h2.462a6.438,6.438,0,1,1,12.595,0Zm-8.836-.838a.506.506,0,1,1,0-1.012h2.034V25.885a.506.506,0,0,1,1.012,0v2.034H25.73a.506.506,0,1,1,0,1.012H23.7v2.034a.506.506,0,1,1-1.012,0V28.931Zm6.377-4.345a5.434,5.434,0,1,0,1.587,3.84,5.411,5.411,0,0,0-1.587-3.84Zm-.664-15.12a4.489,4.489,0,0,0-6.372,6.324l.025.024a4.488,4.488,0,0,0,6.347-6.348Z"
                            transform="translate(0 0)"
                            strokeWidth="1"
                          />
                        </g>
                      </svg>
                    </span>
                    Memberships
                  </h4>
                </div>
                <div className="profile-activity-wrap">
                  <div className="profile-activity-wrap">
                    <IsAccessibleMethodBMS
                      method={Object.keys(PermissionSets.member.Member.Subscription)[0]}
                      route={window.location.pathname}
                      name={"Subscription"}

                    >
                      {isLoadMemberShipData ? (
                        <Loader />
                      ) : membershipData?.length == 0 ? (
                        <NoActiveDataFound msg="no Membership available" />
                      ) : (
                        membershipData?.map((each) => {
                          return (
                            <div className="profile-activity-list">
                              <h4>
                                {each?.subscription?.name || ""} (
                                {each?.is_active ? "Active" : "Expired"})
                                <span
                                  className={
                                    each?.status == "active"
                                      ? "green-btn ms-2"
                                      : "orange-btn ms-2"
                                  }
                                >
                                  {each?.status || ""}
                                </span>
                              </h4>
                              <p>
                                Start Date :{" "}
                                {moment(each?.createdAt).format("ll")}
                              </p>
                            </div>
                          );
                        })
                      )}
                    </IsAccessibleMethodBMS>
                  </div>
                </div>
                <div className="activity-heading">
                  <h4>
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        fill="currentColor"
                        width="1em"
                        height="1em"
                        viewBox="0 0 29.839 25.9"
                      >
                        <g
                          id="noun-subscription-4970876"
                          transform="translate(0.15 0.15)"
                        >
                          <path
                            id="Path_13241"
                            data-name="Path 13241"
                            d="M32.759,33.729l-3.4-1.961a1.477,1.477,0,0,0-2.215,1.279v3.922a1.478,1.478,0,0,0,2.215,1.279l3.4-1.961h0a1.477,1.477,0,0,0,0-2.558Zm-3.643,2.387V33.9l1.92,1.108Z"
                            transform="translate(-15.06 -19.008)"
                            strokeWidth="0.3"
                          />
                          <path
                            id="Path_13242"
                            data-name="Path 13242"
                            d="M31.866,20.422H8.235a2.957,2.957,0,0,0-2.954,2.954V36.668a2.957,2.957,0,0,0,2.954,2.954H31.866a2.957,2.957,0,0,0,2.954-2.954V23.376A2.957,2.957,0,0,0,31.866,20.422Zm.984,16.246a.986.986,0,0,1-.984.984H8.235a.986.986,0,0,1-.984-.984V23.376a.986.986,0,0,1,.984-.984H31.866a.986.986,0,0,1,.984.984Z"
                            transform="translate(-5.281 -14.022)"
                            strokeWidth="0.3"
                          />
                          <path
                            id="Path_13243"
                            data-name="Path 13243"
                            d="M12.5,16.6H33.177a.984.984,0,1,0,0-1.969H12.5a.984.984,0,1,0,0,1.969Z"
                            transform="translate(-8.07 -11.433)"
                            strokeWidth="0.3"
                          />
                          <path
                            id="Path_13244"
                            data-name="Path 13244"
                            d="M18.734,10.813H32.519a.984.984,0,0,0,0-1.969H18.734a.984.984,0,1,0,0,1.969Z"
                            transform="translate(-10.858 -8.844)"
                            strokeWidth="0.3"
                          />
                        </g>
                      </svg>
                    </span>
                    No. Of Subscription
                  </h4>
                </div>
                <div className="profile-activity-wrap">
                  <div className="profile-activity-list">
                    <h4>
                      #3659 15 July, 2024{" "}
                      <span className="green-btn ms-2">Active</span>
                    </h4>
                    <h5>
                      <span>Pro Light Subscription</span>
                    </h5>
                    <p><strong>No. Of Data :</strong> 10</p>
                    <p><strong>Start Date :</strong> 15 September, 2024</p>
                    <p><strong>Next Payment :</strong> 20 October, 2025</p>
                  </div>
                  <hr />

                </div>

              </div>
            </Col>




            {/* Add Comment modal */}
            <CommentModule loggedInUserId={loggedInUserId} isSuperUser={isSuperUser} AddCommentTab={AddCommentTab} toggleAddCommentTab={toggleAddCommentTab} date={date} toggleViewAddComment={toggleViewAddComment} handleViewAddComment={handleViewAddComment} handleResetDateFilter={handleResetDateFilter} handleSubmit={handleSubmit} setTextErr={setTextErr} text={text} textErr={textErr} setText={setText} handleEditorChange={handleEditorChange} CommentModuleApi={CommentModuleApi} UpdateComment={UpdateComment} handleEditComment={handleEditComment} tenant={id} handleDeleteComment={handleDeleteComment} editId={editId} />

            {/* Bride n Groom List  */}

            <BridenGroomList
              isLoadingData={isLoadingData}
              data={data}
              navigate={navigate}
              handleDelete={handleDelete}
            />
          </Row>
        </div>
      )}
    </Wrapper>
  );
};

export default ViewFranchiseDetails;
