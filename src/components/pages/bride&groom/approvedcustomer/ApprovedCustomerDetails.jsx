import React, { useEffect, useState } from "react";
import { Button, Col, Collapse, Row, Label } from "reactstrap";
import { LuMailOpen } from "react-icons/lu";
// import profileUser from "../../../../assets/images/no-images-available.jpg";
import profileUser from "../../../../assets/images/no-images-available.jpg";

import { IoCallOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { HiMinus } from "react-icons/hi";
import Wrapper from "../../../layouts/Wrapper";
import config from "../../../../../config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BridenGroomServices from "../../../../services/BridenGroomServices";
import Swal from "sweetalert2";
import Loader from "../../../../utils/Loader/Loader";
import NoImageFound from "../../../../utils/NoImageFound";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { ImCrop } from "react-icons/im";
import { AiOutlineDislike, AiOutlineEdit, AiOutlineLike } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import moment from "moment";
import calculateAgeByDateOfBirth from "../../../../utils/CalculateAge";
import extractTimeFromTimestamp from "../../../../utils/ExtractTime";
import { MdVerified } from "react-icons/md";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import VerifyModel from "../leads/view/VerifyModel";
import { useFormik } from "formik";
import { VerifyModelForm } from "../../../../helper/ValidationHelper/Validation";
import { GiQueenCrown } from "react-icons/gi";
import PermissionSets from "../../../../guard/Method";
import ListingCommentModule from "../../../../utils/ListingCommentModule";
import CommentModule from "../../../../utils/CommentModule";
import StaffServices from "../../../../services/StaffServices";
import StorageData from "../../../../helper/storagehelper/StorageData";
import { IsAccessibleMethodBMS } from "../../../../guard/Rbac";

const ApprovedCustomerDetails = ({ id }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [toggleVerifyModel, setToggleVerifyModel] = useState(false);
  const queryClient = useQueryClient();
  const handleVerifyModel = () => setToggleVerifyModel(!toggleVerifyModel);
  const urlsplit = window.location.pathname.split("/").slice(0, 3).join("/");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlToRedirect = "/bridengroom/customer/add";


  var UploadPicturesSlider = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1850,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const nav = useNavigate();

  const [activeaccordionIndex, setActiveAccordianIndex] = useState(0);
  // const { id } = useParams();

  const [myId, setMyId] = useState("");

  const handleAccordianToggle = (accordionIndex) => {
    if (activeaccordionIndex === accordionIndex) {
      setActiveAccordianIndex(null); // Close if already open
    } else {
      setActiveAccordianIndex(accordionIndex); // Open the clicked one
    }
  };

  const { data: viewLeadData, isLoading: isLoadDetails } = useQuery(
    ["bridengroomdatabyid-details-approved", myId],
    () => {
      return BridenGroomServices.getBridenGroomDetailsById({ id: myId });
    },
    {
      enabled: !!myId,
      refetchOnWindowFocus: true,
      select: (data) => {
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
  const handleVerifyValue = (colorName) => {
    formik.setFieldValue("colorCode", colorName);
  };

  const initialValues = {
    amount: "",
    colorCode: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: VerifyModelForm,
    onSubmit: (values, action) => {
      console.log("Values", values);
      handleSubmit(values);
    },
  });
  const handleSubmit = (data) => {
    console.log(data, "----");
    updateUserStatus.mutate({
      id: myId,
      amount: parseFloat(data?.amount || 0),
      is_premium: isPremium,
      interest_type: data?.colorCode,
    });
  };

  const handleCloseModel = () => {
    setToggleVerifyModel(false);
  };

  const handleEditTab = (id, activeTabName) => {
    queryParams.set("id", btoa(id ? id : 1));
    queryParams.set("tab", btoa(activeTabName));
    queryParams.set("details", btoa(true));

    // Replace the current history entry with the updated query parameters
    nav({
      pathname: urlToRedirect,
      search: queryParams.toString(),
    });
  };

  const updateUserStatus = useMutation(
    (formdata) => BridenGroomServices.updatebridenGroomLeadForm(formdata),

    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully",
          icon: "success",
        });

        // setActiveTabName("residence")
        // handleCloseModel();
        handleCloseModel();

        queryClient.refetchQueries([
          "bridengroomdatabyid-details-approved",
          myId,
        ]);

        return;
      },
      onError: (err) => {
        console.log(err.response?.data);
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
        return;
      },
    }
  );

  useEffect(() => {
    console.log("viewLeadData", viewLeadData);
    if (!!viewLeadData && Object.keys(viewLeadData).length > 0) {
      viewLeadData.interest_type &&
        formik.setFieldValue("colorCode", viewLeadData.interest_type);
      viewLeadData.amount &&
        formik.setFieldValue("amount", viewLeadData.amount);
      setIsPremium(viewLeadData?.is_premium);
    }
  }, [isLoadDetails]);

  useEffect(() => {
    try {
      const decodeId = id && atob(id);
      console.log("decodeId", !!id, id);

      id && setMyId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [id]);



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




  const handleSubmitComment = () => {
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
      masterbrideandgroom: myId,
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
  const isFromMemberPanel = false;



  return (
    <Wrapper>
      {isLoadDetails ? (
        <Loader />
      ) : viewLeadData && Object.keys(viewLeadData)?.length == 0 ? (
        <NoImageFound />
      ) : (
        <div className="approved-customer-view-wrapper">
          <div className="common-db-head mb-4">
            <Row className="align-items-center">
              <Col md="6"></Col>
              <IsAccessibleMethodBMS
                method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Share)[0]}
                route={window.location.pathname}
                name={"Share"}

              >
                <Col md="6">

                  <div className="text-end">
                    <Button className="btn green-btn text-dark" onClick={handleViewAddComment}>Add Comment</Button>
                  </div>
                </Col>
              </IsAccessibleMethodBMS>
            </Row>
          </div>
          <Row>
            <Col xl="4" xxl="4" className="mb-4">
              <div className="approved-customer-left-details">
                <div className="approved-customer-profile-info">
                  <div className="profile-img">
                    <img
                      className="img-fluid"
                      src={
                        viewLeadData?.photos?.length > 0
                          ? `${config.apiUrl}${viewLeadData?.photos[0]?.upload_url}`
                          : profileUser
                      }
                      alt=""
                    />
                  </div>
                  <div className="approved-customer-profile-details-info">
                    <h3>
                      {viewLeadData?.user?.first_name || ""}{" "}
                      {viewLeadData?.user?.last_name || ""}
                      <span
                        className={`verified-tag ${viewLeadData?.interest_type || "dark"
                          }-color`}
                      >
                        <MdVerified />
                      </span>
                      {viewLeadData?.is_premium && (
                        <span
                          className="premium-tag"
                          style={{ color: "#ea8c21", fontSize: "20px" }}
                        >
                          {" "}
                          <GiQueenCrown />
                        </span>
                      )}
                    </h3>
                    <h5>
                      {" "}
                      {(viewLeadData?.amount && "C$ " + viewLeadData?.amount) ||
                        ""}
                    </h5>
                    {/* <h5>NMGH245903</h5> */}
                    <IsAccessibleMethodBMS
                          method={"credential"}
                          route={window.location.pathname}
                          name={"Read"}

                        >
                    <p>
                      <LuMailOpen />{" "}
                      <a href={`mailto:${viewLeadData?.user?.email}`}>
                        {viewLeadData?.user?.email || ""}
                      </a>
                    </p>
                    <p>
                      <IoCallOutline />{" "}
                      <a
                        href={`tel:${viewLeadData?.phone_code}${viewLeadData?.phone}`}
                      >
                        {viewLeadData?.phone_code} {viewLeadData?.phone}
                      </a>
                    </p>
                    </IsAccessibleMethodBMS>
                  </div>
                </div>
                <div className="registerd-followup-date-wrap">
                  <p>
                    <strong>Registerd On :</strong>{" "}
                    {moment(viewLeadData?.createdAt).format("ll")}
                  </p>
                  <p>
                    <strong>Next Followup Date :</strong> N/A
                  </p>
                  {viewLeadData?.is_approve && (
                    <IsAccessibleMethodBMS
                      method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Verify)[0]}
                      route={window.location.pathname}
                      name={"Verify"}

                    >
                      <Button
                        className="btn btn-outline-style1"
                        onClick={handleVerifyModel}
                      >
                        Change
                      </Button>
                    </IsAccessibleMethodBMS>
                  )}
                </div>
              </div>

              <div className="view-comment-wrapper mt-3">
                <div className="view-comment-head">
                  <h3>Comments</h3>
                </div>

                <ListingCommentModule isFromMemberPanel={isFromMemberPanel} handleEditComment={handleEditComment} handleDeleteComment={handleDeleteComment} loggedInUserId={loggedInUserId} date={date} brideandgroom={myId} isDate={false} />

              </div>
            </Col>

            <Col xl="8" xxl="8">
              {/* 6 Other Photos */}
              {viewLeadData?.tab_partner_preferance && (
                <div className="profile-details-accordion-list">
                  <div className="profile-dtls-accordion-head">
                    <div className="left-heading">
                      <h4>Uploaded Pictures</h4>
                    </div>
                    <div className="toggle-btn">
                      <Button onClick={() => handleAccordianToggle(0)}>
                        {activeaccordionIndex === 0 ? <HiMinus /> : <FiPlus />}
                      </Button>
                    </div>
                  </div>

                  {
                    <Collapse isOpen={activeaccordionIndex === 0}>
                      <div className="profile-details-accordion-body upload-pictures-wrap">
                        <Slider {...UploadPicturesSlider}>
                          {viewLeadData?.photos?.length > 0 &&
                            viewLeadData?.photos?.map((each, index) => {
                              return (
                                <div className="upload-pictures-items">
                                  <div className="upload-image-box">
                                    <div className="upload-img">
                                      <img
                                        className="img-fluid"
                                        src={
                                          viewLeadData?.photos?.length > 0
                                            ? `${config.apiUrl}${viewLeadData?.photos[index]?.upload_url}`
                                            : profileUser
                                        }
                                        alt=""
                                      />
                                    </div>
                                    {/* <Button className="blue-btn edit-btn">
                                <AiOutlineEdit />
                              </Button>
                              <Button className="lemon-green-btn crop-btn">
                                <ImCrop />
                              </Button>
                              <div className="approved-del-btn-wrap">
                                <Button
                                  className={
                                    viewLeadData?.photos[index]?.is_approved
                                      ? "orange-btn dislike-btn"
                                      : "orange-btn dislike-btn active"
                                  }
                                  onClick={() =>
                                    handleApproveImage(
                                      false,
                                      viewLeadData?.photos[index]?.id
                                    )
                                  }
                                >
                                  <AiOutlineDislike />
                                </Button>
                                <Button
                                  className={
                                    viewLeadData?.photos[index]?.is_approved
                                      ? "green-btn like-btn active"
                                      : "green-btn like-btn "
                                  }
                                  onClick={() =>
                                    handleApproveImage(
                                      true,
                                      viewLeadData?.photos[index]?.id
                                    )
                                  }
                                >
                                  <AiOutlineLike /> <span>Approved</span>
                                </Button>
                                <Button
                                  className="btn-outline-style1 delete-btn"
                                  onClick={() =>
                                    handleDeleteImage(
                                      viewLeadData?.photos[index]?.id
                                    )
                                  }
                                >
                                  <RiDeleteBin6Line />
                                </Button>
                              </div> */}
                                  </div>
                                </div>
                              );
                            })}

                        </Slider>
                      </div>
                    </Collapse>
                  }
                </div>
              )}
              {/* 1 Basic Details */}
              <div className="profile-details-accordion-list">
                <div className="profile-dtls-accordion-head">
                  <div className="left-heading">
                    <h4>Basic Infomation</h4>
                    <IsAccessibleMethodBMS
                      method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Update)[0]}
                      route={window.location.pathname}
                      name={"Update"}

                    >
                      <Button
                        className="edit-btn"
                        onClick={() => handleEditTab(viewLeadData?.id, "basic")}
                      >
                        {" "}
                        <AiOutlineEdit /> Edit
                      </Button>
                    </IsAccessibleMethodBMS>
                  </div>
                  <div className="toggle-btn">
                    <Button onClick={() => handleAccordianToggle(1)}>
                      {activeaccordionIndex == 1 ? (
                        <span className="minus">
                          <HiMinus />
                        </span>
                      ) : (
                        <span className="plus">
                          <FiPlus />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>

                <Collapse isOpen={activeaccordionIndex === 1}>
                  <div className="profile-details-accordion-body">
                    <Row>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Description :</span>
                            {viewLeadData?.description || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Name :</span>
                            {`${viewLeadData?.user?.first_name} ${viewLeadData?.user?.last_name}` ||
                              "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Birth Place :</span>
                            {viewLeadData?.birth_place || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Birth Time :</span>
                            {extractTimeFromTimestamp(
                              viewLeadData?.birth_time
                            ) || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Gender :</span> {viewLeadData?.gender || ""}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Country:</span>{" "}
                            {viewLeadData?.country || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>State:</span> {viewLeadData?.state || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>City:</span> {viewLeadData?.city || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Age:</span>{" "}
                            {`${calculateAgeByDateOfBirth(
                              viewLeadData?.date_of_birth
                            )} yrs`}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Interest:</span>

                            <Button
                              className={
                                viewLeadData?.interest_type
                                  ? " px-3 py-0 text-capitalize " +
                                  viewLeadData?.interest_type
                                  : "orange px-3 py-0 text-capitalize  "
                              }
                            >
                              {" "}
                              {viewLeadData?.interest_type || ""}
                            </Button>
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span> No Of Child:</span>{" "}
                            {String(viewLeadData?.num_of_child) || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Children Living With Me:</span>{" "}
                            {`${viewLeadData?.living_with_me ? "Yes" : "No"
                              } ` || " N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span> TalKing Head:</span>
                            {viewLeadData?.taiking_head || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span> Marital Status:</span>
                            {viewLeadData?.marital_status || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span> Height:</span>
                            {viewLeadData?.hight + " Ft" || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span> Weight:</span>
                            {viewLeadData?.weight + " Kg" || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span> Mother Tongue:</span>
                            {viewLeadData?.mother_tongue || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span> Religion:</span>
                            {viewLeadData?.religion || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span> Gothra:</span>
                            {viewLeadData?.gothra || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span> Manglik:</span>
                            {viewLeadData?.manglik ? "Yes" : "No" || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span> Education:</span>
                            {viewLeadData?.education || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span> Caste:</span>
                            {viewLeadData?.caste || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span> Education Detail:</span>
                            {viewLeadData?.education_details || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span> Employed In:</span>
                            {viewLeadData?.employed_in || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span> Occupation:</span>
                            {viewLeadData?.occupation || "N/A"}
                          </h4>
                        </div>
                      </Col>
                      {/*                       
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Assign Date:</span> N/A
                          </h4>
                        </div> */}

                      {/* <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Is Registerd:</span> No
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone:</span> +1 9568 2356
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone2:</span> +1 9568 2356
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone3:</span> +1 9568 2356
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone4:</span> +1 9568 2356
                          </h4>
                        </div>
                      </Col> */}
                    </Row>
                  </div>
                </Collapse>
              </div>
              {/* 2 Residance Details */}
              {viewLeadData?.tab_residence && (
                <div className="profile-details-accordion-list">
                  <div className="profile-dtls-accordion-head">
                    <div className="left-heading">
                      <h4>Residance Infomation</h4>
                      <IsAccessibleMethodBMS
                        method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Update)[0]}
                        route={window.location.pathname}
                        name={"Update"}

                      >
                        <Button
                          className="edit-btn"
                          onClick={() =>
                            handleEditTab(viewLeadData?.id, "residence")
                          }
                        >
                          {" "}
                          <AiOutlineEdit /> Edit
                        </Button>
                      </IsAccessibleMethodBMS>
                    </div>
                    <div className="toggle-btn">
                      <Button onClick={() => handleAccordianToggle(2)}>
                        {activeaccordionIndex == 2 ? (
                          <span className="minus">
                            <HiMinus />
                          </span>
                        ) : (
                          <span className="plus">
                            <FiPlus />
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>

                  <Collapse isOpen={activeaccordionIndex === 2}>
                    <div className="profile-details-accordion-body">
                      <Row>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>State :</span>
                              {viewLeadData?.state || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>City :</span> {viewLeadData?.city || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span> Residence Status:</span>{" "}
                              {viewLeadData?.residence_status || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <IsAccessibleMethodBMS
                          method={"credential"}
                          route={window.location.pathname}
                          name={"Read"}

                        >
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span> Country Code:</span>{" "}
                                {viewLeadData?.phone_code || "N/A"}
                              </h4>
                            </div>
                          </Col>

                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span> Phone Number:</span>{" "}
                                {viewLeadData?.phone || "N/A"}
                              </h4>
                            </div>
                          </Col>
                        </IsAccessibleMethodBMS>
                        {/* <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Is Registerd:</span> No
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone:</span> +1 9568 2356
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone2:</span> +1 9568 2356
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone3:</span> +1 9568 2356
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone4:</span> +1 9568 2356
                          </h4>
                        </div>
                      </Col> */}
                      </Row>
                    </div>
                  </Collapse>
                </div>
              )}
              {/* 3 Physical Details */}
              {viewLeadData?.tab_physical_info && (
                <div className="profile-details-accordion-list">
                  <div className="profile-dtls-accordion-head">
                    <div className="left-heading">
                      <h4>Physical Infomation</h4>
                      <IsAccessibleMethodBMS
                        method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Update)[0]}
                        route={window.location.pathname}
                        name={"Update"}

                      >
                        <Button
                          className="edit-btn"
                          onClick={() =>
                            handleEditTab(viewLeadData?.id, "physical")
                          }
                        >
                          {" "}
                          <AiOutlineEdit /> Edit
                        </Button>
                      </IsAccessibleMethodBMS>
                    </div>
                    <div className="toggle-btn">
                      <Button onClick={() => handleAccordianToggle(3)}>
                        {activeaccordionIndex == 3 ? (
                          <span className="minus">
                            <HiMinus />
                          </span>
                        ) : (
                          <span className="plus">
                            <FiPlus />
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>

                  <Collapse isOpen={activeaccordionIndex === 3}>
                    <div className="profile-details-accordion-body">
                      <Row>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Height :</span>
                              {viewLeadData?.hight + " Ft" || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Weight :</span>
                              {viewLeadData?.weight + "Kg" || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Complexion :</span>
                              {viewLeadData?.complexion || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Body Type :</span>
                              {viewLeadData?.body_type || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Smoking :</span>
                              {viewLeadData?.smoking || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Drinking :</span>
                              {viewLeadData?.drinking || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Diet :</span>
                              {viewLeadData?.diet || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        {/* <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Is Registerd:</span> No
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone:</span> +1 9568 2356
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone2:</span> +1 9568 2356
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone3:</span> +1 9568 2356
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone4:</span> +1 9568 2356
                          </h4>
                        </div>
                      </Col> */}
                      </Row>
                    </div>
                  </Collapse>
                </div>
              )}
              {/* 4 Other Details */}
              {viewLeadData?.tab_other_info && (
                <div className="profile-details-accordion-list">
                  <div className="profile-dtls-accordion-head">
                    <div className="left-heading">
                      <h4>Other Infomation</h4>
                      <IsAccessibleMethodBMS
                        method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Update)[0]}
                        route={window.location.pathname}
                        name={"Update"}

                      >
                        <Button
                          className="edit-btn"
                          onClick={() =>
                            handleEditTab(viewLeadData?.id, "other")
                          }
                        >
                          {" "}
                          <AiOutlineEdit /> Edit
                        </Button>
                      </IsAccessibleMethodBMS>
                    </div>
                    <div className="toggle-btn">
                      <Button onClick={() => handleAccordianToggle(4)}>
                        {activeaccordionIndex == 4 ? (
                          <span className="minus">
                            <HiMinus />
                          </span>
                        ) : (
                          <span className="plus">
                            <FiPlus />
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>

                  <Collapse isOpen={activeaccordionIndex === 4}>
                    <div className="profile-details-accordion-body">
                      <Row>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Father Name :</span>{" "}
                              {viewLeadData?.father_name || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span> Profile Text :</span>{" "}
                              {viewLeadData?.profile_text || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span> No of Brothers :</span>{" "}
                              {String(viewLeadData?.num_of_brother) || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span> No of Sisters :</span>{" "}
                              {String(viewLeadData?.num_of_sister) || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span> Body Type:</span>{" "}
                              {String(viewLeadData?.body_type) || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        {/* <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Is Registerd:</span> No
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone:</span> +1 9568 2356
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone2:</span> +1 9568 2356
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone3:</span> +1 9568 2356
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone4:</span> +1 9568 2356
                          </h4>
                        </div>
                      </Col> */}
                      </Row>
                    </div>
                  </Collapse>
                </div>
              )}
              {/* 5 Partner Preferance Details */}
              {viewLeadData?.tab_partner_preferance && (
                <div className="profile-details-accordion-list">
                  <div className="profile-dtls-accordion-head">
                    <div className="left-heading">
                      <h4>Partner Preferance Infomation</h4>
                      <IsAccessibleMethodBMS
                        method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Update)[0]}
                        route={window.location.pathname}
                        name={"Update"}

                      >
                        <Button
                          className="edit-btn"
                          onClick={() =>
                            handleEditTab(viewLeadData?.id, "partner")
                          }
                        >
                          {" "}
                          <AiOutlineEdit /> Edit
                        </Button>
                      </IsAccessibleMethodBMS>
                    </div>
                    <div className="toggle-btn">
                      <Button onClick={() => handleAccordianToggle(5)}>
                        {activeaccordionIndex == 5 ? (
                          <span className="minus">
                            <HiMinus />
                          </span>
                        ) : (
                          <span className="plus">
                            <FiPlus />
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>

                  <Collapse isOpen={activeaccordionIndex === 5}>
                    <div className="profile-details-accordion-body">
                      <Row>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Looking For :</span>{" "}
                              {viewLeadData?.looking_for || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Complexion :</span>{" "}
                              {viewLeadData?.partner_complexion || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>MotherTongue :</span>{" "}
                              {viewLeadData?.partner_mother_tongue || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        {/* <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>MotherTongue :</span>{" "}
                              {viewLeadData?.partner_mother_tongue || "N/A"}
                            </h4>
                          </div>
                        </Col> */}
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Religion :</span>{" "}
                              {viewLeadData?.partner_religion || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Caste :</span>{" "}
                              {viewLeadData?.partner_caste || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Education :</span>{" "}
                              {viewLeadData?.partner_education || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Annual Income :</span>{" "}
                              {viewLeadData?.partner_annual_income || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Country :</span>{" "}
                              {viewLeadData?.country || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Residance Status :</span>{" "}
                              {viewLeadData?.partner_residence_status || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Age Preference :</span>{" "}
                              {`${viewLeadData?.partner_age_min} Yrs to ${viewLeadData?.partner_age_max} Yrs ` ||
                                "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Gender :</span>{" "}
                              {viewLeadData?.partner_gender || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span>Height :</span>{" "}
                              {`${viewLeadData?.partner_hight_min} Ft to ${viewLeadData?.partner_hight_max} Ft ` ||
                                "N/A"}
                            </h4>
                          </div>
                        </Col>
                        <Col lg="6" xl="6">
                          <div className="approved-customer-view-info-list">
                            <h4>
                              <span> Marital Status :</span>{" "}
                              {viewLeadData?.partner_marital_status || "N/A"}
                            </h4>
                          </div>
                        </Col>
                        {/* <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Gender :</span> Male
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Country:</span> Aland Islands
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Interest:</span>{" "}
                            <Button className="orange px-3 py-0">Orange</Button>
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Assign Date:</span> N/A
                          </h4>
                        </div> */}

                        {/* <Col lg="6" xl="6">
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Is Registerd:</span> No
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone:</span> +1 9568 2356
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone2:</span> +1 9568 2356
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone3:</span> +1 9568 2356
                          </h4>
                        </div>
                        <div className="approved-customer-view-info-list">
                          <h4>
                            <span>Phone4:</span> +1 9568 2356
                          </h4>
                        </div>
                      </Col> */}
                      </Row>
                    </div>
                  </Collapse>
                </div>
              )}





              <div className="mt-5">
                <Button
                  className="btn btn-style1 px-3 py-2 fs-5"
                  onClick={() => nav(-1)}
                >
                  Back
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}

      {/* Add Comment modal */}
      <CommentModule loggedInUserId={loggedInUserId} isSuperUser={isSuperUser} AddCommentTab={AddCommentTab} toggleAddCommentTab={toggleAddCommentTab} date={date} toggleViewAddComment={toggleViewAddComment} handleViewAddComment={handleViewAddComment} handleResetDateFilter={handleResetDateFilter} handleSubmit={handleSubmitComment} setTextErr={setTextErr} text={text} textErr={textErr} setText={setText} handleEditorChange={handleEditorChange} CommentModuleApi={CommentModuleApi} UpdateComment={UpdateComment} handleEditComment={handleEditComment} handleDeleteComment={handleDeleteComment} editId={editId} brideandgroom={myId} />
      {/* Verify Model */}
      <VerifyModel
        formik={formik}
        isPremium={isPremium}
        setIsPremium={setIsPremium}
        handleCloseModel={handleCloseModel}
        setToggleVerifyModel={setToggleVerifyModel}
        toggleVerifyModel={toggleVerifyModel}
        handleVerifyModel={handleVerifyModel}
        updateVerifyUser={updateUserStatus}
        handleVerifyValue={handleVerifyValue}
      />
    </Wrapper>
  );
};

export default ApprovedCustomerDetails;
