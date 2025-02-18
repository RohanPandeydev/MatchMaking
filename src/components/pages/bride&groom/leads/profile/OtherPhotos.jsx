import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import UploadPlaceholder from "../../../../../assets/images/uploading-placeholder-img.png";
import { FiUpload } from "react-icons/fi";
import Swal from "sweetalert2";
import BridenGroomServices from "../../../../../services/BridenGroomServices";
import Loader from "../../../../../utils/Loader/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import config from "../../../../../../config";
import { useLocation, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import moment from "moment/moment";
import ValidateAuthenticationKey from "../../../../../utils/ValidationAuthenticationKey";

const OtherPhotos = ({
  setId,
  toggle,
  id,
  isFromDetails,
  createRequestLog,
  allData,
  refetchData,
  setActiveTabName,
  setCurrentActiveTab,
  isLoadingPhoto,
  handleNavToDetails,
}) => {
  const nav = useNavigate();

  let location = useLocation();
  let queryParams = new URLSearchParams(location.search);
  let idValue = queryParams.get("id");
  let tabValue = queryParams.get("tab");
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".bmp", ".gif"];
  const [allImages, setAllImages] = useState([]);
  const [imageData, setImageData] = useState([]);

  const fileInputRef = useRef();
  const [isApproved, setIsApproved] = useState(true);
  const queryClient = useQueryClient();
  const handleApproveImage = (bool, idx) => {
    setIsApproved(bool);
    updateLeadResidenceMutationFormPhoto.mutate({
      id: idx,
      is_approved: Number(bool),
    });
  };

  const handleImage = (e) => {
    if (!isLoadingPhoto && allData?.length >= 6) {
      Swal.fire({
        title: "Error",
        text: "Maximum 6 files can be uploaded",
        icon: "error",
      });

      return;
    }
    const files = e.target.files;
    if (files.length === 0) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024).toFixed(2), // size in KB
    }));
    const formData = new FormData();
    formData?.append("brideandgroom", id);
    formData?.append("user", allData?.user?.id);
    formData?.append("is_approved", Number(isApproved));
    formData?.append("upload_url", files[0]);
    formData?.append("tab_upload_photos", true);
    createLeadResidenceMutationForm.mutate(formData);
    setAllImages((prevImages) => [...prevImages, ...newImages]);
    fileInputRef.current.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    queryClient.refetchQueries(["bridengroomdatabyid-details", id]);
    if (isFromDetails) return handleNavToDetails();

    nav("/bridengroom/customer/" + btoa(id));
  };

  const createLeadResidenceMutationForm = useMutation(
    (formdata) => BridenGroomServices.createbridenGroomLeadFormPhotos(formdata),

    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully ",
          icon: "success",
        });
        queryClient.refetchQueries(["bridengroomdatabyid-main", id]);

        // setId(data?.data?.id)
        // formik.resetForm();
        // setCurrentActiveTab(2)
        // setActiveTabName("residence")
        // toggle("6", "upload");
        return;
      },
      onError: (err) => {
        console.log(err.message);
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
        return;
      },
    }
  );
  const updateLeadResidenceMutationFormPhoto = useMutation(
    (formdata) => BridenGroomServices.updatebridenGroomLeadFormPhotos(formdata),

    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        // Swal.fire({
        //   title: "Successfull",
        //   text: "Updated Successfully ",
        //   icon: "success",
        // });
        queryClient.refetchQueries(["bridengroomdatabyid-main", id]);

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
        queryClient.refetchQueries(["bridengroomdatabyid-main", id]);
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

  // const { data: allImagesData, isLoadingPhoto } = useQuery(
  //   ["bridengroomdatabyid", id],
  //   () => {
  //     return BridenGroomServices.getBridenGroomDetailsById({ id: id });
  //   },
  //   {
  //     enabled: !!id,
  //     onSuccess: (data) => {
  //       console.log(data?.data, "Get Details");
  //     },
  //     onError: (err) => {
  //       if (err?.response?.status == 401) {
  //         ValidateAuthenticationKey(
  //           err?.response?.status,
  //           "Your login session has expired. Please log in again."
  //         );
  //         return;
  //       }
  //       Swal.fire({
  //         title: "Error",
  //         text: err?.response?.data?.message || err?.message,
  //         icon: "error",
  //       });
  //     },
  //   }
  // );

  useEffect(() => {
    try {
      const decodeId = idValue && atob(idValue);
      console.log("decodeId", !!idValue, idValue);

      idValue && setId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [idValue]);
  useEffect(() => {
    try {
      const decodeId = idValue && atob(idValue);
      console.log("decodeId", !!idValue, idValue);

      idValue && setId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [idValue]);

  useEffect(() => {
    if (Object.keys(allData).length > 0 && !!id) {
      setImageData(() => allData?.photos);
    }
  }, [refetchData, id]);

  return (
    <>
      {createLeadResidenceMutationForm?.isLoading ? (
        <Loader />
      ) : (
        <TabPane tabId="6">
          <div className="profile-form-wrap">
            <Row className="gx-5">
              <Col md="4" lg="4">
                <div className="upload-photos-left-wrap">
                  <label className="profile-input-choose-file">
                    <b className="drag-drop-btn">
                      <span className="icon">
                        <FiUpload />
                      </span>
                      <h4>Drag File To Upload</h4>
                      <h6>Allowed File type gif | jpg | png | jpeg | bmp.</h6>
                    </b>
                    <div className="documents-upload-btn">
                      <span className="btn btn-style1 px-3 py-3">
                        Choose File
                      </span>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImage}
                      accept={allowedExtensions}
                      className="fileInput"
                      multiple=""
                    />
                  </label>
                </div>
              </Col>
              <Col md="8" lg="8">
                <div className="uploading-wrap">
                  <h4 className="h4 mb-3">Uploading</h4>
                  {!isLoadingPhoto &&
                    imageData?.length > 0 &&
                    imageData?.map((image, index) => (
                      <div className="uploading-photo-list" key={index}>
                        <div className="uploading-photo">
                          <img
                            className="img-fluid"
                            src={config.apiUrl + image.upload_url}
                            alt={image.upload_url}
                          />
                        </div>
                        <div className="uploading-size">
                          <h4>{image?.name}</h4>
                          <Progress value={100} />{" "}
                          {/* Adjust the value dynamically if needed */}
                          <h6>{image?.name}</h6>
                          <div className="size">
                            {moment(image?.created_at).format("ll")}{" "}
                          </div>
                        </div>
                        <div className="uploading-radio">
                          <ul className="common-radio-btn">
                            <li>
                              <Input
                                id={`Approved-${index}`}
                                name={`Status-${index}`}
                                type="radio"
                                onClick={() =>
                                  handleApproveImage(true, image?.id)
                                }
                                checked={image?.is_approved}
                              />
                              <Label for={`Approved-${index}`}>APPROVED</Label>
                            </li>
                            <li>
                              <Input
                                id={`UnApproved-${index}`}
                                name={`Status-${index}`}
                                type="radio"
                                checked={
                                  image?.is_approved == false ? true : false
                                }
                                onClick={() =>
                                  handleApproveImage(false, image?.id)
                                }
                              />
                              <Label for={`UnApproved-${index}`}>
                                UNAPPROVED
                              </Label>
                            </li>
                          </ul>
                        </div>
                        <div className="del-upload-photo">
                          <Button
                            className="btn-outline-style1"
                            onClick={() => handleDeleteImage(image?.id)}
                          >
                            <RiDeleteBin6Line />
                          </Button>
                        </div>
                      </div>
                    ))}

                  {/* <div className="uploading-photo-list">
                                        <div className="uploading-photo">
                                            <img className="img-fluid" src={UploadPlaceholder} />
                                        </div>
                                        <div className="uploading-size">
                                            <h4>Photo1</h4>
                                            <Progress value={100} />
                                            <h6>E:\SBinfowaves\matchmaking</h6>
                                            <div className="size">1mb</div>
                                        </div>
                                        <div className="uploading-radio">
                                            <ul className="common-radio-btn">
                                                <li>
                                                    <Input id="Photo2Approved" name="Photo2Status" type="radio" />
                                                    <Label for="Photo2Approved">  APPROVED </Label>
                                                </li>
                                                <li>
                                                    <Input id="Photo2UnApproved" name="Photo2Status" type="radio" />
                                                    <Label for="Photo2UnApproved"> UNAPPROVED </Label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="uploading-photo-list">
                                        <div className="uploading-photo">
                                            <img className="img-fluid" src={UploadPlaceholder} />
                                        </div>
                                        <div className="uploading-size">
                                            <h4>Photo1</h4>
                                            <Progress value={30} />
                                            <h6>E:\SBinfowaves\matchmaking</h6>
                                            <div className="size">720kb</div>
                                        </div>
                                        <div className="uploading-radio">
                                            <ul className="common-radio-btn">
                                                <li>
                                                    <Input id="Photo3Approved" name="Photo3Status" type="radio" />
                                                    <Label for="Photo3Approved">  APPROVED </Label>
                                                </li>
                                                <li>
                                                    <Input id="Photo3UnApproved" name="Photo3Status" type="radio" />
                                                    <Label for="Photo3UnApproved"> UNAPPROVED </Label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div> */}
                </div>
              </Col>
              <Col xs="12" md="12" className="mt-4">
                <FormGroup className="common-formgroup text-end">
                  {!isFromDetails && (
                    <Button
                      className="btn btn-outline-style1 px-5 py-2 me-2"
                      onClick={() => {
                        toggle("5", "partner");
                      }}
                    >
                      {" "}
                      Back{" "}
                    </Button>
                  )}
                  <Button
                    className="btn btn-style1 px-5 py-2"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={createLeadResidenceMutationForm?.isLoading}
                  >
                    {" "}
                    {isFromDetails ? "Save" : "Next"}{" "}
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </TabPane>
      )}
    </>
  );
};

export default OtherPhotos;
