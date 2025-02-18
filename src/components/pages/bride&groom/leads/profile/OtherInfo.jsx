import { useFormik } from "formik";
import React, { useEffect } from "react";
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
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { OtherInfoForm } from "../../../../../helper/ValidationHelper/Validation";
import Swal from "sweetalert2";
import BridenGroomServices from "../../../../../services/BridenGroomServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../../../utils/Loader/Loader";
import { useLocation } from "react-router-dom";
import ValidateAuthenticationKey from "../../../../../utils/ValidationAuthenticationKey";
import ButtonLoader from "../../../../../utils/Loader/ButtonLoader";

const OtherInfo = ({
  setId,
  toggle,
  id,
  isFromDetails,
  allData,
  refetchData,
  setActiveTabName,
  setCurrentActiveTab,
  handleNavToDetails,
  NoOfChild,
  isNoOfChildrenLoad,
}) => {
  let location = useLocation();
  let queryParams = new URLSearchParams(location.search);
  const queryClient = useQueryClient();
  let idValue = queryParams.get("id");
  let tabValue = queryParams.get("tab");

 

  const initialValues = {
    profileText: "",
    fatherName: "",
    bodyType: "",
    brothers: "",
    sisters: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: OtherInfoForm,
    onSubmit: (values, action) => {
      submitHandler(values);
    },
  });
  const submitHandler = (values) => {
    console.log(values);
    const sendData = {
      id: id,
      father_name: values?.fatherName,
      profile_text: values.profileText,
      num_of_brother: values.brothers,
      num_of_sister: values.sisters,
      tab_other_info: true,
      // body_type: values.bodyType,
    };
    updateLeadResidenceMutationForm.mutate(sendData);
  };
  const updateLeadResidenceMutationForm = useMutation(
    (formdata) => BridenGroomServices.updatebridenGroomLeadForm(formdata),

    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully ",
          icon: "success",
        });
        // setId(data?.data?.id)
        // formik.resetForm();
        // setCurrentActiveTab(2)
        // setActiveTabName("residence")
        if (isFromDetails) return handleNavToDetails();
        setId(data?.data?.id);
        formik.resetForm();
        queryClient.refetchQueries([
          "bridengroomdatabyid-main",
          data?.data?.id,
        ]);

        toggle("5", "partner");
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

  // const { data } = useQuery(
  //   ["bridengroomdatabyid-other", id],
  //   () => {
  //     return BridenGroomServices.getBridenGroomDetailsById({ id: id });
  //   },
  //   {
  //     enabled: !!id,
  //     onSuccess: (data) => {
  //       formik.setFieldValue("fatherName", data?.data?.father_name || "");
  //       formik.setFieldValue("profileText", data?.data?.profile_text || "");
  //       formik.setFieldValue("brothers", data?.data?.num_of_brother || "");
  //       formik.setFieldValue("sisters", data?.data?.num_of_sister || "");
  //       formik.setFieldValue("bodyType", data?.data?.body_type || "");
  //       formik.setFieldValue("id", data?.data?.id);
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
    if (Object.keys(allData).length > 0 && !!id) {
      formik.setFieldValue("fatherName", allData?.father_name || "");
      formik.setFieldValue("profileText", allData?.profile_text || "");
      formik.setFieldValue("brothers", String(allData?.num_of_brother) || "");
      formik.setFieldValue("sisters", String(allData?.num_of_sister) || "");
      formik.setFieldValue("bodyType", allData?.body_type || "");
      formik.setFieldValue("id", allData?.id);
    }
  }, [refetchData, id]);
  return (
    <>
      {!id ? (
        <p className="text-danger">Please fill basic details first</p>
      ) : updateLeadResidenceMutationForm?.isLoading ? (
        <Loader />
      ) : (
        <TabPane tabId="4">
          <form onSubmit={formik.handleSubmit}>
            <div className="profile-form-wrap">
              <Row className="gx-5">
                <Col md="12">
                  <FormGroup className="common-formgroup">
                    <Label> Profile Text * </Label>
                    <Input
                      className={
                        formik.touched.profileText && formik.errors.profileText
                          ? "is-invalid"
                          : ""
                      }
                      id=""
                      name="profileText"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.profileText}
                      placeholder="|"
                      type="textarea"
                      rows="5"
                    />
                    <span>{formik?.values?.profileText?.length}/200</span>
                    {formik.touched.profileText && (
                      <p className="text-danger">{formik.errors.profileText}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col xs="12" className="mb-4 mt-5">
                  <div className="form-title">
                    <h4>
                      <span>Family Details</span>
                    </h4>
                  </div>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Father Name </Label>
                    <Input
                      id=""
                      className={
                        formik.touched.fatherName && formik.errors.fatherName
                          ? "is-invalid"
                          : ""
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fatherName}
                      name="fatherName"
                      placeholder="|"
                      type="text"
                    />
                    {formik.touched.fatherName && (
                      <p className="text-danger">{formik.errors.fatherName}</p>
                    )}
                  </FormGroup>
                </Col>
                {/* <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Body Type </Label>
                    <Input
                      id=""
                      name="bodyType"
                      className={
                        formik.touched.bodyType && formik.errors.bodyType
                          ? "is-invalid"
                          : ""
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.bodyType}
                      type="select"
                    >
                      <option value={""}>Select Body Type</option>
                      {bodyTypeOptions?.map((each) => {
                        return (
                          <option value={each.bodyType}>
                            {each?.bodyType}
                          </option>
                        );
                      })}
                    </Input>
                    {formik.touched.bodyType && (
                      <p className="text-danger">{formik.errors.bodyType}</p>
                    )}
                  </FormGroup>
                </Col> */}
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Total Brother </Label>
                    <Input
                      id=""
                      name="brothers"
                      className={
                        formik.touched.brothers && formik.errors.brothers
                          ? "is-invalid"
                          : ""
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.brothers}
                      type="select"
                    >
                      <option value={""}>Select Brother</option>
                      {isNoOfChildrenLoad ? (
                        <ButtonLoader />
                      ) : (
                        NoOfChild?.length > 0 &&
                        NoOfChild?.map((child) => {
                          return (
                            <option
                              value={
                                child?.description
                                  ? JSON.parse(child?.description)
                                  : child?.name
                              }
                            >
                              {child?.name}
                            </option>
                          );
                        })
                      )}
                    </Input>
                    {formik.touched.brothers && (
                      <p className="text-danger">{formik.errors.brothers}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Total Sisters </Label>
                    <Input
                      id=""
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.sisters}
                      className={
                        formik.touched.brothers && formik.errors.brothers
                          ? "is-invalid"
                          : ""
                      }
                      name="sisters"
                      type="select"
                    >
                      <option value={""}>Select Sister</option>
                      {isNoOfChildrenLoad ? (
                        <ButtonLoader />
                      ) : (
                        NoOfChild?.length > 0 &&
                        NoOfChild?.map((child) => {
                          return (
                            <option
                              value={
                                child?.description
                                  ? JSON.parse(child?.description)
                                  : child?.name
                              }
                            >
                              {child?.name}
                            </option>
                          );
                        })
                      )}
                    </Input>
                    {formik.touched.sisters && (
                      <p className="text-danger">{formik.errors.sisters}</p>
                    )}
                  </FormGroup>
                </Col>

                <Col xs="12" md="12" className="mt-4">
                  <FormGroup className="common-formgroup text-end">
                    {!isFromDetails && (
                      <Button
                        className="btn btn-outline-style1 px-5 py-2 me-2"
                        type="click"
                        onClick={() => {
                          toggle("3", "physical");
                        }}
                      >
                        {" "}
                        Back{" "}
                      </Button>
                    )}
                    <Button
                      className="btn btn-style1 px-5 py-2"
                      type="submit"
                      disabled={updateLeadResidenceMutationForm?.isLoading}
                    >
                      {" "}
                      {isFromDetails ? "Save" : "Next"}{" "}
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </form>
        </TabPane>
      )}
    </>
  );
};

export default OtherInfo;
