import React, { useEffect, useRef, useState } from "react";
// import profileUser from "../../../../../assets/images/no-images-available.jpg";
import profileUser from "../../../../../assets/images/no-images-available.jpg";

import uploadShadow from "../../../../../assets/images/upload-shadow-img.png";
import { LuMailOpen, LuPlus } from "react-icons/lu";
import { IoCallOutline, IoClose } from "react-icons/io5";
import {
  Button,
  Col,
  Collapse,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import { AiOutlineDislike, AiOutlineEdit, AiOutlineLike } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { HiMinus } from "react-icons/hi";
import Slider from "react-slick";
import { ImCrop } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import Wrapper from "../../../../layouts/Wrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BridenGroomServices from "../../../../../services/BridenGroomServices";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../../../utils/Loader/Loader";
import NoImageFound from "../../../../../utils/NoImageFound";
import config from "../../../../../../config";
import moment from "moment/moment";
import calculateAgeByDateOfBirth from "../../../../../utils/CalculateAge";
import extractTimeFromTimestamp from "../../../../../utils/ExtractTime";
import { MdVerified } from "react-icons/md";
import ValidateAuthenticationKey from "../../../../../utils/ValidationAuthenticationKey";
import VerifyModel from "./VerifyModel";
import { useFormik } from "formik";
import { VerifyModelForm } from "../../../../../helper/ValidationHelper/Validation";
import PopupDesign from "../../../html/PopupDesign";
import PermissionSets from "../../../../../guard/Method";
import useFetchMasterSectionData from "../../../../../helper/MasterSection";
import CommentModule from "../../../../../utils/CommentModule";
import StaffServices from "../../../../../services/StaffServices";
import ListingCommentModule from "../../../../../utils/ListingCommentModule";
import StorageData from "../../../../../helper/storagehelper/StorageData";
import { IsAccessibleMethodBMS } from "../../../../../guard/Rbac";
const ViewLeadDetailsPage = ({ id }) => {
  // update verify modal
  const [toggleVerifyModel, setToggleVerifyModel] = useState(false);
  // const { id } = useParams();
  const [myId, setMyId] = useState("");
  const [err, setError] = useState("");
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".bmp", ".gif"];
  const [isApproved, setIsApproved] = useState(true);
  const fileInputRef = useRef();
  const queryClient = useQueryClient();
  const urlToRedirect = "/bridengroom/customer/add";
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const handleVerifyModel = () => setToggleVerifyModel(!toggleVerifyModel);
  const [isPremium, setIsPremium] = useState(false);
  const { data: currencyList, isLoading: isLoadCurrency } = useFetchMasterSectionData('currency', "all-currency-list-details-brideandgroom")

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
    updateVerifyUser.mutate({
      id: myId,
      amount: parseFloat(data?.amount || 0),
      is_premium: isPremium,
      interest_type: data?.colorCode,
      is_approve: 1,
    });
  };

  const arr = [1, 2, 3, 4, 5, 6];




  const handleEditTab = (id, activeTabName) => {
    queryParams.set("id", btoa(id ? id : 1));
    queryParams.set("tab", btoa(activeTabName));
    queryParams.set("details", btoa(true));

    // Replace the current history entry with the updated query parameters
    navigate({
      pathname: urlToRedirect,
      search: queryParams.toString(),
    });
  };

  const [activeAccordion, setActiveAccordion] = useState(0);

  const toggleAccordion = (accordionIndex) => {
    if (activeAccordion === accordionIndex) {
      setActiveAccordion(null); // Close if already open
    } else {
      setActiveAccordion(accordionIndex); // Open the clicked one
    }
  };

  const { data: viewLeadData, isLoading: isLoadDetails } = useQuery(
    ["bridengroomdatabyid-details", myId],
    () => {
      return BridenGroomServices.getBridenGroomDetailsById({ id: myId });
    },
    {
      enabled: !!myId,
      refetchOnWindowFocus: false,
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

  const validateFile = (file) => {
    const MAX_FILE_SIZE_MB = 2;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    let isValid = true;
    let errorMessage = "";

    const fileNameParts = file.name.split(".");
    const extension = `.${fileNameParts[
      fileNameParts.length - 1
    ].toLowerCase()}`;

    if (!allowedExtensions.includes(extension)) {
      isValid = false;
      errorMessage = `Invalid file extension: ${extension}. Allowed extensions are: ${allowedExtensions.join(
        ", "
      )}`;
    } else if (file.size > MAX_FILE_SIZE_BYTES) {
      isValid = false;
      errorMessage = `File size exceeds ${MAX_FILE_SIZE_MB} MB`;
    }

    return { isValid, errorMessage };
  };

  const handleApproveImage = (bool, idx) => {
    setIsApproved(bool);
    updatePhoto.mutate({
      id: idx,
      is_approved: Number(bool),
    });
  };

  const handleImage = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;
    const isFileValid = validateFile(e?.target?.files[0]);
    console.log("validateFile", isFileValid);
    if (!isFileValid?.isValid) {
      // setError(isFileValid?.errorMessage);
      Swal.fire({
        title: "Error",
        text: isFileValid?.errorMessage || "Failed",
        icon: "error",
      });
      return;
    }

    const formData = new FormData();
    formData?.append("brideandgroom", myId);
    formData?.append("user", viewLeadData?.user?.id);
    formData?.append("is_approved", Number(isApproved || 1));
    formData?.append("upload_url", files[0]);
    formData?.append("tab_upload_photos", true);
    uploadPhoto.mutate(formData);
    fileInputRef.current.value = null;
  };
  const handleVerifyValue = (colorName) => {
    formik.setFieldValue("colorCode", colorName);
    // updateVerifyUser.mutate({
    //   id: myId,
    //   interest_type: colorName,
    //   is_approve: 1,
    //   amount:0
    // });
  };

  const handleCloseModel = () => {
    formik.resetForm();
    setIsPremium(false);
    setToggleVerifyModel(false);
  };

  const uploadPhoto = useMutation(
    (formdata) => BridenGroomServices.createbridenGroomLeadFormPhotos(formdata),

    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully ",
          icon: "success",
        });
        // queryClient.invalidateQueries(["bridengroomdatabyid-details", myId]);
        queryClient.refetchQueries(["bridengroomdatabyid-details", myId]);
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
  const updatePhoto = useMutation(
    (formdata) => BridenGroomServices.updatebridenGroomLeadFormPhotos(formdata),

    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        // Swal.fire({
        //   title: "Successfull",
        //   text: "Updated Successfully ",
        //   icon: "success",
        // });
        // queryClient.invalidateQueries(["bridengroomdatabyid-details", id]);
        queryClient.refetchQueries(["bridengroomdatabyid-details", myId]);
        // setId(data?.data?.id)
        // formik.resetForm();
        // setCurrentActiveTab(2)
        // setActiveTabName("residence")
        // toggle("6", "upload");
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

  const handleDeleteImage = (id) => {
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
        deleteUploadedImage.mutate({ id: id });
      }
    });
  };

  const deleteUploadedImage = useMutation(
    (formdata) => {
      return BridenGroomServices.deleteImageUpload(formdata);
    },
    {
      onSuccess: (data) => {
        // console.log("Data after submission organization", data?.data);
        // alert("Created Successfully")
        Swal.fire({
          title: "Successfull",
          text: "Deleted",
          icon: "success",
        });
        // queryClient.invalidateQueries("subscription-organization");
        queryClient.refetchQueries(["bridengroomdatabyid-details", myId]);
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

  const updateVerifyUser = useMutation(
    (formdata) => BridenGroomServices.updatebridenGroomLeadForm(formdata),

    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: `Successfully Approved`,
          icon: "success",
        });

        // setActiveTabName("residence")
        // handleCloseModel();
        // queryClient.invalidateQueries(["bridengroomdatabyid-details", id]);
        queryClient.refetchQueries(["bridengroomdatabyid-details", myId]);
        handleCloseModel();

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
    try {
      const decodeId = id && atob(id);
      console.log("decodeId", !!id, id);

      id && setMyId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [id]);

  const urlsplit = window.location.pathname.split("/").slice(0, 3).join("/");

  // console.log("viewLeadData", viewLeadData);





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

  const isFromMemberPanel = false

  return (
    <Wrapper>
      {isLoadDetails ? (
        <Loader />
      ) : viewLeadData && Object.keys(viewLeadData)?.length == 0 ? (
        <NoImageFound />
      ) : (
        <div className="profile-details-wrapper">
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

          <div className="profile-details-sidebar">
            <div className="profile-details-sidebar-innerwrap">
              <div className="profile-dtls-prof-info-wrap">
                <div className="profile-dtls-prof-img offline">
                  <div className="prof-img">
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
                </div>
                <div className="profile-dtls-prof-info">
                  <h3>
                    {" "}
                    {viewLeadData?.user?.first_name || ""}{" "}
                    {viewLeadData?.user?.last_name || ""}
                    {viewLeadData?.interest_type && (
                      <span
                        className={`verified-tag ${viewLeadData?.interest_type || "dark"
                          }-color`}
                      >
                        <MdVerified />
                      </span>
                    )}
                  </h3>
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
                  {!viewLeadData?.is_approve && (
                    <IsAccessibleMethodBMS
                      method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Verify)[0]}
                      route={window.location.pathname}
                      name={"Verify"}

                    >
                      <Button
                        className="btn btn-outline-style1"
                        onClick={handleVerifyModel}
                      >
                        Click To Verify
                      </Button>
                    </IsAccessibleMethodBMS>

                  )}
                </div>
              </div>
              <div className="profile-dtls-button-wrap">

                <PopupDesign />
              </div>
            </div>
          </div>

          {
            <div className="profile-details-body">
              {viewLeadData?.tab_partner_preferance && (
                <div className="profile-details-accordion-list">
                  <div className="profile-dtls-accordion-head">
                    <div className="left-heading">
                      <h4>Uploaded Pictures</h4>
                    </div>
                    <div className="toggle-btn">
                      <Button onClick={() => toggleAccordion(0)}>
                        {activeAccordion === 0 ? <HiMinus /> : <FiPlus />}
                      </Button>
                    </div>
                  </div>

                  {
                    <Collapse isOpen={activeAccordion === 0}>
                      <div className="profile-details-accordion-body upload-pictures-wrap">
                        <Slider {...UploadPicturesSlider}>
                          {arr?.map((each, index) => {
                            return (
                              <div className="upload-pictures-items">
                                {index < viewLeadData?.photos?.length ? (
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

                                    <Button className="blue-btn edit-btn">
                                      <AiOutlineEdit />
                                    </Button>
                                    <Button className="lemon-green-btn crop-btn">
                                      <ImCrop />
                                    </Button>
                                    <div className="approved-del-btn-wrap">

                                      <Button
                                        className={
                                          viewLeadData?.photos[index]
                                            ?.is_approved
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
                                          viewLeadData?.photos[index]
                                            ?.is_approved
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
                                        <AiOutlineLike />{" "}
                                        <span>Approved</span>
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

                                    </div>
                                  </div>
                                ) : (
                                  <div className="upload-image-box">
                                    <IsAccessibleMethodBMS
                                      method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Update)[0]}
                                      route={window.location.pathname}
                                      name={"Update"}

                                    >
                                      <Label
                                        htmlFor="upload-image"
                                        className="upload-image-choose-file"
                                      >
                                        <div className="add-photo-box">
                                          <img
                                            className="img-fluid"
                                            src={uploadShadow}
                                            alt=""
                                          />
                                        </div>
                                        <span className="choose-file-btn">
                                          <LuPlus />
                                        </span>

                                        <Input
                                          id="upload-image"
                                          accept={allowedExtensions}
                                          onChange={handleImage}
                                          ref={fileInputRef}
                                          type="file"
                                        />

                                      </Label>
                                    </IsAccessibleMethodBMS>

                                  </div>
                                )}
                              </div>
                            );
                          })}

                        </Slider>
                      </div>
                    </Collapse>
                  }
                </div>
              )}
              {/* 1 */}
              {/* Basic details */}

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
                    <Button onClick={() => toggleAccordion(1)}>
                      {activeAccordion === 1 ? <HiMinus /> : <FiPlus />}
                    </Button>
                  </div>
                </div>

                <Collapse isOpen={activeAccordion === 1}>
                  <div className="profile-details-accordion-body">
                    <Row>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Name
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={
                                `${viewLeadData?.user?.first_name} ${viewLeadData?.user?.last_name}` ||
                                "N/A"
                              }
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Description
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={`${viewLeadData?.description} ` || " N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Birth Place
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={`${viewLeadData?.birth_place} ` || " N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Birth Time
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={
                                `${extractTimeFromTimestamp(
                                  viewLeadData?.birth_time
                                )} ` || " N/A"
                              }
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              No Of Child
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={`${viewLeadData?.num_of_child} ` || " N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Children Living With Me
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={
                                `${viewLeadData?.living_with_me ? "Yes" : "No"
                                } ` || " N/A"
                              }
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              TalKing Head
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={viewLeadData?.taiking_head || "N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Gender
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={viewLeadData?.gender || "Other"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Marital Status
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={viewLeadData?.marital_status || "N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Age
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={`${moment(
                                viewLeadData?.date_of_birth
                              ).format("ll")} (${calculateAgeByDateOfBirth(
                                viewLeadData?.date_of_birth
                              )} yrs)`}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Residence{" "}
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={`${viewLeadData?.city || "N/A"},${viewLeadData?.state || "N/A"
                                },${viewLeadData?.country || "N/A"}`}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Height{" "}
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={viewLeadData?.hight + " Ft" || "N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Residence Status{" "}
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value="N/A"
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Weight{" "}
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={viewLeadData?.weight + " Kg" || "N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Mother Tongue{" "}
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={viewLeadData?.mother_tongue || "N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Religion{" "}
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={viewLeadData?.religion || "N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Gothra{" "}
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={viewLeadData?.gothra || "N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Manglik{" "}
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={
                                viewLeadData?.manglik ? "Yes" : "No" || "N/A"
                              }
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Education{" "}
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={viewLeadData?.education || "N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Caste{" "}
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={viewLeadData?.caste || "N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Education Detail{" "}
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={viewLeadData?.education_details || "N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Employed In{" "}
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={viewLeadData?.employed_in || "N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Occupation{" "}
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={viewLeadData?.occupation || "N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Annual Income{" "}
                            </span>
                            <Input
                              id=""
                              name=""
                              type="text"
                              placeholder="|"
                              value={viewLeadData?.annual_income || "N/A"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Collapse>
              </div>

              {/* 2 */}
              {/* Residence Details */}
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
                      <Button onClick={() => toggleAccordion(2)}>
                        {activeAccordion === 2 ? <HiMinus /> : <FiPlus />}
                      </Button>
                    </div>
                  </div>

                  <Collapse isOpen={activeAccordion === 2}>
                    <div className="profile-details-accordion-body">
                      <Row>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Country
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={`${viewLeadData?.country}` || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                State
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={`${viewLeadData?.state}` || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                City
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={`${viewLeadData?.city}` || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Residence Status
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={
                                  `${viewLeadData?.residence_status}` || "N/A"
                                }
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Country Code
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={`${viewLeadData?.phone_code}` || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <IsAccessibleMethodBMS
                          method={"credential"}
                          route={window.location.pathname}
                          name={"Read"}

                        >
                          <Col xs="12" xl="6">
                            <FormGroup className="common-formgroup">
                              <div className="input-group mb-3">
                                <span
                                  className="input-group-text"
                                  id="basic-addon1"
                                >
                                  Phone Number
                                </span>
                                <Input
                                  id=""
                                  name=""
                                  type="text"
                                  placeholder="|"
                                  value={`${viewLeadData?.phone}` || "N/A"}
                                />
                              </div>
                            </FormGroup>
                          </Col>
                        </IsAccessibleMethodBMS>
                      </Row>
                    </div>
                  </Collapse>
                </div>
              )}

              {/* 3 */}
              {/* Physical  Details */}
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
                      <Button onClick={() => toggleAccordion(3)}>
                        {activeAccordion === 3 ? <HiMinus /> : <FiPlus />}
                      </Button>
                    </div>
                  </div>

                  <Collapse isOpen={activeAccordion === 3}>
                    <div className="profile-details-accordion-body">
                      <Row>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Height
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={`${viewLeadData?.hight} Ft` || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Weight
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={`${viewLeadData?.weight} Kg` || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Complexion
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={`${viewLeadData?.complexion}` || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Body Type
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={`${viewLeadData?.body_type}` || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Smoking
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={`${viewLeadData?.smoking}` || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Drinking
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={`${viewLeadData?.drinking}` || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Diet
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={`${viewLeadData?.diet}` || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Collapse>
                </div>
              )}
              {/* 4 */}
              {/* Other  Details */}
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
                      <Button onClick={() => toggleAccordion(4)}>
                        {activeAccordion === 4 ? <HiMinus /> : <FiPlus />}
                      </Button>
                    </div>
                  </div>

                  <Collapse isOpen={activeAccordion === 4}>
                    <div className="profile-details-accordion-body">
                      <Row>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Father Name
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={viewLeadData?.father_name || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Profile Text
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={viewLeadData?.profile_text || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                No of Brothers
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={
                                  `${viewLeadData?.num_of_brother}` || "N/A"
                                }
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                No of Sisters
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={
                                  `${viewLeadData?.num_of_sister}` || "N/A"
                                }
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Body Type
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={`${viewLeadData?.body_type}` || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Collapse>
                </div>
              )}

              {/* 5 */}
              {/* Partner Preferance */}
              {viewLeadData?.tab_partner_preferance && (
                <div className="profile-details-accordion-list">
                  <div className="profile-dtls-accordion-head">
                    <div className="left-heading">
                      <h4>Partner Preference</h4>
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
                      <Button onClick={() => toggleAccordion(5)}>
                        {activeAccordion === 5 ? <HiMinus /> : <FiPlus />}
                      </Button>
                    </div>
                  </div>

                  <Collapse isOpen={activeAccordion == 5}>
                    <div className="profile-details-accordion-body">
                      <Row>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Looking For{" "}
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={viewLeadData?.looking_for || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Complexion{" "}
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={
                                  viewLeadData?.partner_complexion || "N/A"
                                }
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                MotherTongue{" "}
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={
                                  viewLeadData?.partner_mother_tongue || "N/A"
                                }
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Religion{" "}
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={viewLeadData?.partner_religion || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Caste{" "}
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={viewLeadData?.partner_caste || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Education{" "}
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={viewLeadData?.partner_education || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Annual Income{" "}
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={
                                  viewLeadData?.partner_annual_income || "N/A"
                                }
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Country{" "}
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={viewLeadData?.country || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Residance Status{" "}
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={
                                  viewLeadData?.partner_residence_status?.replace(
                                    "_",
                                    " "
                                  ) || "N/A"
                                }
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Age Preference{" "}
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={
                                  `${viewLeadData?.partner_age_min} Yrs to ${viewLeadData?.partner_age_max} Yrs ` ||
                                  "N/A"
                                }
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Gender{" "}
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={viewLeadData?.partner_gender || "N/A"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="6">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Height{" "}
                              </span>
                              <Input
                                id=""
                                name=""
                                type="text"
                                placeholder="|"
                                value={
                                  `${viewLeadData?.partner_hight_min} Ft to ${viewLeadData?.partner_hight_max} Ft ` ||
                                  "N/A"
                                }
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="12" xl="12">
                          <FormGroup className="common-formgroup">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                Marital Status{" "}
                              </span>
                              <Input
                                id=""
                                name=""
                                type="textarea"
                                placeholder="|"
                                value={
                                  viewLeadData?.partner_marital_status || "N/A"
                                }
                              />
                            </div>
                          </FormGroup>
                        </Col>

                        {/* <Col xs="12" lg="12">
                      <FormGroup className="common-formgroup">
                        <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            Religion{" "}
                          </span>
                          <Input
                            id=""
                            name=""
                            type="text"
                            placeholder="|"
                            value="Hindu, Muslim, Sikh, Jain, Buddhist, Christian, Sikh Amritdhari, No Religion"
                          />
                        </div>
                      </FormGroup>
                    </Col> */}
                        {/* <Col xs="12" lg="12">
                      <FormGroup className="common-formgroup">
                        <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            Country Living In{" "}
                          </span>
                          <Input
                            id=""
                            name=""
                            type="textarea"
                            placeholder="|"
                            rows="15"
                            value="Kamma, Khatri, Kokanastha Brahmin, Kori, Koshti, Kunbi, Kurmi, Kuruba, Leva Patil, Lingayat, Lohana, Maithil Brahmin, Malayalee Namboodiri, Malayalee Variar, Mali, Maharashtrian, Maharashtrian Brahmin, Maheshwari, Maratha, Maruthuvar, Mudaliar Senguntha, Mukulathur, Nadar, Nagar Brahmin, Nair Vaniya, Nagaralu, Padmashali, Patel Desai, Patel Kadva, Patel Leva, Naidu, Padmashali, Patel Desai, Patel Kadva, Patel Leva, Perika, Pillai, Prajapati, Punjabi Brahmin, Reddy, Saraswat Brahmins, Sahu, Scheduled Caste, Sepahia, Setti Balija, Sindhi, Somvanshi, Sonar, Sowrashtra, Sozhiya Vellalar, Sutar, Swarnakar, Thevar, Thiyya, Udayar, Vaidiki Brahmin, Vaishnav, Vaishnav Bhatia, Vaishnav Vania, Varshney, Vanniyakullak Shatriya, Vanniyar, Veerashaiva, Velethadathu Nair, Vellalar, Vellama, Vishwakarma, Viswabrahmin, Vokaliga, Vysya, Yadav, Thevar, Vaniya chettier, Vannar, Shia, Mansuri, Marthoma, Nadar, Syrian, Tonk Kshatriya, Labana, Ramdasia, Ramgharia, Saini, Paya kyun, Nai, Ravidasia, Walia, Sikh, Sunni, Nai, Patel, Prajapati, Rai Sikh Gujarati, Urdu, English, Punjabi, Malayalam, Kannada, French, Garhwali, Garo, Haryanvi, Kakbarak, Kanauji, Kashmiri, Persian, Rajasthani, Russian, Sanskrit, Santhali, Other, Hindi"
                          />
                        </div>
                      </FormGroup>
                    </Col> */}
                      </Row>
                    </div>
                  </Collapse>
                </div>
              )}
              <div className="view-comment-wrapper">
                <div className="view-comment-head">
                  <h3>Comments</h3>
                </div>

                <ListingCommentModule isFromMemberPanel={isFromMemberPanel} handleEditComment={handleEditComment} handleDeleteComment={handleDeleteComment} loggedInUserId={loggedInUserId} date={date} brideandgroom={myId} isDate={false} />
              </div>
            </div>
          }

        </div>
      )}



      {/* Add Comment modal */}
      <CommentModule loggedInUserId={loggedInUserId} isSuperUser={isSuperUser} AddCommentTab={AddCommentTab} toggleAddCommentTab={toggleAddCommentTab} date={date} toggleViewAddComment={toggleViewAddComment} handleViewAddComment={handleViewAddComment} handleResetDateFilter={handleResetDateFilter} handleSubmit={handleSubmitComment} setTextErr={setTextErr} text={text} textErr={textErr} setText={setText} handleEditorChange={handleEditorChange} CommentModuleApi={CommentModuleApi} UpdateComment={UpdateComment} handleEditComment={handleEditComment} handleDeleteComment={handleDeleteComment} editId={editId} brideandgroom={myId} />

      {/* model */}
      <VerifyModel
        formik={formik}
        isPremium={isPremium}
        setIsPremium={setIsPremium}
        handleCloseModel={handleCloseModel}
        setToggleVerifyModel={setToggleVerifyModel}
        toggleVerifyModel={toggleVerifyModel}
        handleVerifyModel={handleVerifyModel}
        updateVerifyUser={updateVerifyUser}
        handleVerifyValue={handleVerifyValue}

      />
    </Wrapper>
  );
};

export default ViewLeadDetailsPage;
