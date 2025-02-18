import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Row, TabPane } from "reactstrap";
import { LeadAddForm } from "../../../../../helper/ValidationHelper/Validation";
import Generatepass from "../../../../../utils/GeneratePassword";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BridenGroomServices from "../../../../../services/BridenGroomServices";
import Swal from "sweetalert2";
import convertToISO from "../../../../../utils/ConvertIso";
import Loader from "../../../../../utils/Loader/Loader";
import extractTimeFromTimestamp from "../../../../../utils/ExtractTime";
import { useLocation } from "react-router-dom";
import ValidateAuthenticationKey from "../../../../../utils/ValidationAuthenticationKey";
import ButtonLoader from "../../../../../utils/Loader/ButtonLoader";
import { IsAccessibleMethodBMS } from "../../../../../guard/Rbac";

const BasicDetails = ({
  setId,
  toggle,
  id,
  isFromDetails,
  allData,
  refetchData,
  handleNavToDetails,
  LanguageListing,
  isLanguageLoaded,
  NoOfChild,
  isNoOfChildrenLoad,
  ProfileCreateByListing,
  isProfileCreateByLoad,
  ReligionsListing,
  isReligionLoad,
  CasteListing,
  isCasteLoad,
  EducationQualification,
  isEducationLoad,
  ManglikStatusListing,
  isManglikLoad,
  EmployeeInListing,
  isEmpLoad,
  OccupationListing,
  isOccupationLoad,
  IncomeRangeListing,
  isIncomeLoad,
}) => {
  let location = useLocation();
  const queryClient = useQueryClient();
  let queryParams = new URLSearchParams(location.search);
  let idValue = queryParams.get("id");
  const initialValues = {
    description: "",
    gender: "male",
    keyword: "",
    firstName: "",
    lastName: "",
    email: "",
    password: Generatepass(),
    validEmail: true,
    priority: true,
    maritalStatus: "unmarried",
    noOfChildren: 0,
    childrenLivingStatus: true,
    motherTongue: "",
    dob: "",
    birthPlace: "",
    birthTime: "",
    profileCreatedBy: "self",
    talkingHead: "",
    religion: "",
    caste: "",
    manglik: "No",
    gothra: "",
    education: "",
    educationDetails: "",
    occupation: "",
    employedIn: "",
    annualIncome: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LeadAddForm,
    onSubmit: (values, action) => {
      // console.log(values);
      submitHandler(values);
    },
  });
  const today = new Date().toISOString().split("T")[0];

  const submitHandler = (data) => {
    const sendData = {
      id: id,
      user: {
        email: data?.email,
        first_name: data?.firstName,
        last_name: data?.lastName,
        password: data?.password,
      },
      is_valid_email: data?.validEmail,
      is_priority: data?.priority,
      gender: data?.gender,
      marital_status: data?.maritalStatus,
      num_of_child: data?.noOfChildren,
      living_with_me: data?.childrenLivingStatus,
      mother_tongue: data?.motherTongue,
      date_of_birth: data?.dob,
      birth_place: data?.birthPlace,
      birth_time: convertToISO(data?.dob, data?.birthTime),
      profile_create_by: data?.profileCreatedBy,
      taiking_head: data?.talkingHead,
      description: data?.description,
      religion: data?.religion,
      caste: data?.caste,
      manglik: data?.manglik,
      gothra: data?.gothra,
      education: data?.education,
      education_details: data?.educationDetails,
      occupation: data?.occupation,
      employed_in: data?.employedIn,
      annual_income: data?.annualIncome,
      tab_basic_details: true,
    };
    if (!!id) {
      sendData.user.email = allData?.user?.email;
      delete sendData.user.password;
      console.log(sendData);
      updateLeadBasicMutationForm.mutate(sendData);
      return;
    }
    // console.log(data,"datadatadatadatadata")
    leadBasicMutationForm.mutate(sendData);
  };

  const leadBasicMutationForm = useMutation(
    (formdata) => BridenGroomServices.createbridenGroomLeadForm(formdata),

    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Created  Successfully ",
          icon: "success",
        });
        // setId(data?.data?.id);
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
        toggle("2", "residence");
        return;
      },
      onError: (err) => {
        console.log(err.response?.data?.user, "frehfeiruhueru---");
        Swal.fire({
          title: "Error",
          text: err.response?.data?.user?.username[0] || err?.message,
          icon: "error",
        });
        return;
      },
    }
  );

  const updateLeadBasicMutationForm = useMutation(
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
        formik.resetForm();
        setId(data?.data?.id);
        queryClient.refetchQueries([
          "bridengroomdatabyid-main",
          data?.data?.id,
        ]);
        toggle("2", "residence");
        return;
      },
      onError: (err) => {
        console.log(err.response?.data?.username, "dsfhsdf");
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.username[0] || err?.message,
          icon: "error",
        });
        return;
      },
    }
  );

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
      formik.setFieldValue("description", allData?.description || "");
      formik.setFieldValue("gender", allData?.gender || "male");
      formik.setFieldValue("keyword", allData?.keyword || "");
      formik.setFieldValue("firstName", allData?.user?.first_name || "");
      formik.setFieldValue("lastName", allData?.user?.last_name || "");
      formik.setFieldValue("email", allData?.user?.email || "");
      formik.setFieldValue("validEmail", allData?.is_valid_email || "");
      formik.setFieldValue("birthPlace", allData?.birth_place || "");
      formik.setFieldValue("priority", allData?.is_priority || false);
      formik.setFieldValue("maritalStatus", allData?.marital_status || false);
      formik.setFieldValue("noOfChildren", allData?.num_of_child || 0);
      formik.setFieldValue(
        "childrenLivingStatus",
        allData?.living_with_me | false
      );
      formik.setFieldValue("motherTongue", allData?.mother_tongue || "");
      formik.setFieldValue(
        "profileCreatedBy",
        allData?.profile_create_by || "self"
      );
      formik.setFieldValue("talkingHead", allData?.taiking_head || "");
      formik.setFieldValue("religion", allData?.religion || "");
      formik.setFieldValue("gothra", allData?.gothra || "");
      formik.setFieldValue("education", allData?.education || "");
      formik.setFieldValue(
        "educationDetails",
        allData?.education_details || ""
      );
      formik.setFieldValue("occupation", allData?.occupation || "");
      formik.setFieldValue("employedIn", allData?.employed_in || "");
      formik.setFieldValue("annualIncome", allData?.annual_income || "");
      formik.setFieldValue("dob", allData?.date_of_birth || "");
      formik.setFieldValue(
        "birthTime",
        extractTimeFromTimestamp(allData?.birth_time)
      );
      formik.setFieldValue("manglik", allData?.manglik);
    }
  }, [refetchData, id]);

  console.log(formik.errors)

  const [casteListingData, setCasteListingData] = useState([])
  useEffect(() => {
    if (isCasteLoad) return
    // setCasteListing(casteListing)
  }, [isCasteLoad])

  useEffect(() => {
    if (formik.values?.religion) {
      const filteredCasteList = CasteListing?.filter((each) => {
        const descReligion = each?.description ? JSON.parse(each.description)?.religion : null;
        return descReligion === formik.values.religion;
      });
      const findPrefillValue = filteredCasteList?.find((each) => {
        const descCaste = each?.description ? JSON.parse(each.description)?.name : null;
        return allData?.caste == descCaste

      })
      const valuetoset = findPrefillValue?.description ? JSON.parse(findPrefillValue.description)?.name : null;
      setCasteListingData(filteredCasteList);

      formik.setFieldValue("caste", valuetoset || "")


      // console.log(filteredCasteList,"=============",formik.values?.religion,CasteListing)
    }
  }, [formik.values.religion]);
  // useEffect(() => {

  //   formik.setFieldValue("caste", "");

  // }, [formik.values.religion])
  return (
    <>
      <TabPane tabId="1">
        <div className="profile-form-wrap">
          {leadBasicMutationForm?.isLoading ? (
            <Loader />
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <Row className="gx-5">
                {/* <Col md="6">
              <FormGroup className="common-formgroup">
                <Label> Title </Label>
                <Input id="" name="" placeholder="|" type="text" />
              </FormGroup>
            </Col> */}
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Description </Label>
                    <Input
                      id=""
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="|"
                      type="text"
                      className={
                        formik.touched.description && formik.errors.description
                          ? "is-invalid"
                          : ""
                      }
                    />
                    {formik.touched.description && (
                      <p className="text-danger">{formik.errors.description}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Gender* </Label>
                    <ul className="common-radio-btn mt-3">
                      <li>
                        <Input
                          id="GenderMale"
                          value={"male"}
                          checked={formik.values.gender == "male"}
                          onClick={() => formik.setFieldValue("gender", "male")}
                          name="Gender"
                          type="radio"
                        />
                        <Label for="GenderMale"> Male </Label>
                      </li>
                      <li>
                        <Input
                          value={"female"}
                          id="GenderFemale"
                          checked={formik.values.gender == "female"}
                          onClick={() =>
                            formik.setFieldValue("gender", "female")
                          }
                          name="Gender"
                          type="radio"
                        />
                        <Label for="GenderFemale"> Female </Label>
                      </li>
                    </ul>
                  </FormGroup>
                </Col>
                {/* <Col md="6">
              <FormGroup className="common-formgroup">
                <Label> Keyword </Label>
                <Input
                  id=""
                  name="keyword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.keyword}
                  placeholder="|"
                  type="text"
                  className={
                    formik.touched.keyword && formik.errors.keyword
                      ? "is-invalid"
                      : ""
                  }
                />
                {
                  formik.touched.keyword && <p className="text-danger">{formik.errors.keyword}</p>
                }
                
              </FormGroup>
            </Col> */}
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Enter First Name* </Label>
                    <Input
                      id=""
                      name="firstName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                      placeholder="|"
                      type="text"
                      className={
                        formik.touched.firstName && formik.errors.firstName
                          ? "is-invalid"
                          : ""
                      }
                    />
                    {formik.touched.firstName && (
                      <p className="text-danger">{formik.errors.firstName}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Enter Last Name * </Label>
                    <Input
                      id=""
                      name="lastName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                      placeholder="|"
                      type="text"
                      className={
                        formik.touched.lastName && formik.errors.lastName
                          ? "is-invalid"
                          : ""
                      }
                    />
                    {formik.touched.lastName && (
                      <p className="text-danger">{formik.errors.lastName}</p>
                    )}
                  </FormGroup>
                </Col>
                {!!id ? <IsAccessibleMethodBMS
                  method={"credential"}
                  route={window.location.pathname}
                  name={"Update"}

                >
                  <Col md="6">
                    <FormGroup className="common-formgroup">
                      <Label> Enter Your Email Id * </Label>
                      <Input
                        id=""
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        placeholder="|"
                        disabled={!!id}
                        type="text"
                        className={
                          formik.touched.email && formik.errors.email
                            ? "is-invalid"
                            : ""
                        }
                      />
                      {formik.touched.email && (
                        <p className="text-danger">{formik.errors.email}</p>
                      )}
                    </FormGroup>
                  </Col>
                </IsAccessibleMethodBMS> : <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Enter Your Email Id * </Label>
                    <Input
                      id=""
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      placeholder="|"
                      disabled={!!id}
                      type="text"
                      className={
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }
                    />
                    {formik.touched.email && (
                      <p className="text-danger">{formik.errors.email}</p>
                    )}
                  </FormGroup>
                </Col>}
                {/* <Col md="6">
              <FormGroup className="common-formgroup">
                <Label> Create a Password </Label>
                <Input
                  id=""
                  name=""
                  placeholder="Please leave password blank for not update"
                  type="text"
                />
              </FormGroup>
            </Col> */}
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Is Genuine Email </Label>
                    <ul className="common-radio-btn mt-3">
                      <li>
                        <Input
                          id="GenuineEmailYes"
                          name="GenuineEmail"
                          type="radio"
                          checked={formik.values.validEmail == true}
                          onClick={() =>
                            formik.setFieldValue("validEmail", true)
                          }
                        />
                        <Label for="GenuineEmailYes"> Yes </Label>
                      </li>
                      <li>
                        <Input
                          id="GenuineEmailNo"
                          name="GenuineEmail"
                          type="radio"
                          checked={formik.values.validEmail == false}
                          onClick={() =>
                            formik.setFieldValue("validEmail", false)
                          }
                        />
                        <Label for="GenuineEmailNo"> No </Label>
                      </li>
                    </ul>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Priority </Label>
                    <ul className="common-radio-btn mt-3">
                      <li>
                        <Input
                          id="PriorityYes"
                          name="Priority"
                          type="radio"
                          checked={formik.values.priority == true}
                          onClick={() => formik.setFieldValue("priority", true)}
                        />
                        <Label for="PriorityYes"> Yes </Label>
                      </li>
                      <li>
                        <Input
                          id="PriorityNo"
                          checked={formik.values.priority == false}
                          onClick={() =>
                            formik.setFieldValue("priority", false)
                          }
                          name="Priority"
                          type="radio"
                        />
                        <Label for="PriorityNo"> No </Label>
                      </li>
                    </ul>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Marital Status * </Label>
                    <ul className="common-radio-btn mt-3">
                      <li>
                        <Input
                          id="MaritalStatusUnmarried"
                          name="MaritalStatus"
                          type="radio"
                          checked={formik.values.maritalStatus == "unmarried"}
                          onClick={() =>
                            formik.setFieldValue("maritalStatus", "unmarried")
                          }
                        />
                        <Label for="MaritalStatusUnmarried"> Unmarried </Label>
                      </li>
                      <li>
                        <Input
                          id="MaritalStatusWidow"
                          name="MaritalStatus"
                          type="radio"
                          checked={
                            formik.values.maritalStatus == "widow_widower"
                          }
                          onClick={() =>
                            formik.setFieldValue(
                              "maritalStatus",
                              "widow_widower"
                            )
                          }
                        />
                        <Label for="MaritalStatusWidow"> Widow/Widower </Label>
                      </li>
                      {/* <li>
                        <Input
                          id="MaritalStatusSeparated"
                          name="MaritalStatus"
                          type="radio"
                          checked={formik.values.maritalStatus == "separated"}
                          onClick={() =>
                            formik.setFieldValue("maritalStatus", "separated")
                          }
                        />
                        <Label for="MaritalStatusSeparated"> Separated </Label>
                      </li> */}
                      <li>
                        <Input
                          id="MaritalStatusDivorcee"
                          name="MaritalStatus"
                          type="radio"
                          checked={formik.values.maritalStatus == "divorcee"}
                          onClick={() =>
                            formik.setFieldValue("maritalStatus", "divorcee")
                          }
                        />
                        <Label for="MaritalStatusDivorcee"> Divorcee </Label>
                      </li>
                    </ul>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> No. of children * </Label>
                    <Input
                      id=""
                      name="noOfChildren"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.noOfChildren}
                      disabled={
                        formik.values.maritalStatus == "unmarried"
                          ? true
                          : false
                      }
                      className={
                        formik.touched.noOfChildren &&
                          formik.errors.noOfChildren
                          ? "is-invalid"
                          : ""
                      }
                      type="select"
                    >
                      <option>Select Number of Child</option>
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
                    {formik.touched.noOfChildren && (
                      <p className="text-danger">
                        {formik.errors.noOfChildren}
                      </p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Children Living Status * </Label>
                    <ul className="common-radio-btn mt-3">
                      <li>
                        <Input
                          id="MaritalStatusWithMe"
                          name="MaritalStatusLiving"
                          type="radio"
                          checked={formik.values.childrenLivingStatus == true}
                          onClick={() =>
                            formik.setFieldValue("childrenLivingStatus", true)
                          }
                        />
                        <Label for="MaritalStatusWithMe">
                          {" "}
                          Living with me{" "}
                        </Label>
                      </li>
                      <li>
                        <Input
                          id="MaritalStatusNot"
                          name="MaritalStatusLiving"
                          type="radio"
                          checked={formik.values.childrenLivingStatus == false}
                          onClick={() =>
                            formik.setFieldValue("childrenLivingStatus", false)
                          }
                        />
                        <Label for="MaritalStatusNot">
                          {" "}
                          Not living with me{" "}
                        </Label>
                      </li>
                    </ul>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Mother Tongue * </Label>
                    <Input
                      id=""
                      name="motherTongue"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.motherTongue}
                      type="select"
                      className={
                        formik.touched.motherTongue &&
                          formik.errors.motherTongue
                          ? "is-invalid"
                          : ""
                      }
                    >
                      <option>Select Mother Tongue</option>
                      {isLanguageLoaded ? (
                        <ButtonLoader />
                      ) : (
                        LanguageListing?.length > 0 &&
                        LanguageListing?.map((lang) => {
                          return (
                            <option
                              value={
                                lang?.description
                                  ? JSON.parse(lang?.description)
                                  : lang?.name
                              }
                            >
                              {lang?.name}
                            </option>
                          );
                        })
                      )}
                      {/* {languages?.map((each) => {
                        return <option value={each?.name}>{each?.name}</option>;
                      })} */}
                    </Input>
                    {formik.touched.motherTongue && (
                      <p className="text-danger">
                        {formik.errors.motherTongue}
                      </p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Date of Birth * </Label>
                    <Input
                      id=""
                      name="dob"
                      value={formik.values.dob}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder=""
                      type="date"
                      max={today} // Disable future dates
                      className={
                        formik.touched.dob && formik.errors.dob
                          ? "is-invalid"
                          : ""
                      }
                    />
                    {formik.touched.dob && (
                      <p className="text-danger">{formik.errors.dob}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Birth Place </Label>
                    <Input
                      id=""
                      name="birthPlace"
                      value={formik.values.birthPlace}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="|"
                      type="text"
                      className={
                        formik.touched.birthPlace && formik.errors.birthPlace
                          ? "is-invalid"
                          : ""
                      }
                    />
                    {formik.touched.birthPlace && (
                      <p className="text-danger">{formik.errors.birthPlace}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Birth Time </Label>
                    <Input
                      id=""
                      value={formik.values.birthTime}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="birthTime"
                      placeholder=""
                      type="time"
                      className={
                        formik.touched.birthTime && formik.errors.birthTime
                          ? "is-invalid"
                          : ""
                      }
                    />
                    {formik.touched.birthTime && (
                      <p className="text-danger">{formik.errors.birthTime}</p>
                    )}
                  </FormGroup>
                </Col>
                {!idValue && (
                  <Col md="6">
                    <FormGroup className="common-formgroup">
                      <Label> Create a Password </Label>
                      <Input
                        id=""
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={!!id}
                        className={
                          formik.touched.password && formik.errors.password
                            ? "is-invalid"
                            : ""
                        }
                        placeholder="Please leave password blank for not update"
                        type="text"
                      />
                      {formik.touched.password && (
                        <p className="text-danger">{formik.errors.password}</p>
                      )}
                    </FormGroup>
                  </Col>
                )}
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Profile Created By </Label>
                    <Input
                      id=""
                      name="profileCreatedBy"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.profileCreatedBy}
                      className={
                        formik.touched.profileCreatedBy &&
                          formik.errors.profileCreatedBy
                          ? "is-invalid"
                          : ""
                      }
                      type="select"
                    >
                      {/* <option value={"self"}>Self</option> */}
                      {isProfileCreateByLoad ? (
                        <ButtonLoader />
                      ) : (
                        ProfileCreateByListing?.length > 0 &&
                        ProfileCreateByListing?.map((create) => {
                          return (
                            <option
                              value={
                                create?.description
                                  ? JSON.parse(create?.description)
                                  : create?.name
                              }
                            >
                              {create?.name}
                            </option>
                          );
                        })
                      )}
                    </Input>
                    {formik.touched.profileCreatedBy && (
                      <p className="text-danger">
                        {formik.errors.profileCreatedBy}
                      </p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Talking Head </Label>
                    <Input
                      id=""
                      name="talkingHead"
                      value={formik.values.talkingHead}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Talking Head"
                      type="text"
                      className={
                        formik.touched.talkingHead && formik.errors.talkingHead
                          ? "is-invalid"
                          : ""
                      }
                    />
                    {formik.touched.talkingHead && (
                      <p className="text-danger">{formik.errors.talkingHead}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col xs="12" className="mb-4 mt-5">
                  <div className="form-title">
                    <h4>
                      <span>Religious Information</span>
                    </h4>
                  </div>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Religion * </Label>
                    <Input
                      id=""
                      name="religion"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.religion}
                      type="select"
                      className={
                        formik.touched.religion && formik.errors.religion
                          ? "is-invalid"
                          : ""
                      }
                    >
                      <option value={""}>Select Religion </option>
                      {isReligionLoad ? (
                        <ButtonLoader />
                      ) : (
                        ReligionsListing?.length > 0 &&
                        ReligionsListing?.map((religion) => {
                          return (
                            <option
                              value={
                                religion?.description
                                  ? JSON.parse(religion?.description)
                                  : religion?.name
                              }
                            >
                              {religion?.name}
                            </option>
                          );
                        })
                      )}
                    </Input>

                    {formik.touched.religion && (
                      <p className="text-danger">{formik.errors.religion}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Caste * </Label>
                    <Input
                      id=""
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.caste}
                      name="caste"
                      type="select"
                      disabled={!!!formik.values.religion}
                      className={
                        formik.touched.caste && formik.errors.caste
                          ? "is-invalid"
                          : ""
                      }
                    >
                      <option value={""}>Select Caste</option>
                      {isCasteLoad ? (
                        <ButtonLoader />
                      ) : (
                        casteListingData?.length > 0 &&
                        casteListingData?.map((caste) => {
                          return (
                            <option
                              value={
                                caste?.description
                                  ? JSON.parse(caste?.description)?.name || caste?.name
                                  : caste?.name
                              }
                            >
                              {caste?.name}
                            </option>
                          );
                        })
                      )}
                    </Input>
                    {formik.touched.caste && (
                      <p className="text-danger">{formik.errors.caste}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Manglik </Label>
                    <Input
                      id=""
                      name="manglik"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.manglik}
                      type="select"
                      className={
                        formik.touched.manglik && formik.errors.manglik
                          ? "is-invalid"
                          : ""
                      }
                    >
                      <option>Select Manglik</option>
                      {isManglikLoad ? (
                        <ButtonLoader />
                      ) : (
                        ManglikStatusListing?.length > 0 &&
                        ManglikStatusListing?.map((manglik) => {
                          return (
                            <option
                              value={
                                manglik?.description
                                  ? JSON.parse(manglik?.description)
                                  : manglik?.name
                              }
                            >
                              {manglik?.name}
                            </option>
                          );
                        })
                      )}
                    </Input>
                    {formik.touched.manglik && (
                      <p className="text-danger">{formik.errors.manglik}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Gothra </Label>
                    <Input
                      id=""
                      name="gothra"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.gothra}
                      placeholder="|"
                      type="text"
                      className={
                        formik.touched.gothra && formik.errors.gothra
                          ? "is-invalid"
                          : ""
                      }
                    />
                    {formik.touched.gothra && (
                      <p className="text-danger">{formik.errors.gothra}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col xs="12" className="mb-4 mt-5">
                  <div className="form-title">
                    <h4>
                      <span>Education / Occupation Details</span>
                    </h4>
                  </div>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Education * </Label>
                    <Input
                      id=""
                      name="education"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.education}
                      type="select"
                      className={
                        formik.touched.education && formik.errors.education
                          ? "is-invalid"
                          : ""
                      }
                    >
                      <option value={""}>Select Education</option>
                      {isEducationLoad ? (
                        <ButtonLoader />
                      ) : (
                        EducationQualification?.length > 0 &&
                        EducationQualification?.map((education) => {
                          return (
                            <option
                              value={
                                education?.description
                                  ? JSON.parse(education?.description)?.name
                                  : education?.name
                              }
                            >
                              {education?.name}
                            </option>
                          );
                        })
                      )}
                    </Input>
                    {formik.touched.education && (
                      <p className="text-danger">{formik.errors.education}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Education Detail * </Label>
                    <Input
                      id=""
                      name="educationDetails"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.educationDetails}
                      placeholder="|"
                      type="text"
                      className={
                        formik.touched.educationDetails &&
                          formik.errors.educationDetails
                          ? "is-invalid"
                          : ""
                      }
                    />
                    {formik.touched.educationDetails && (
                      <p className="text-danger">
                        {formik.errors.educationDetails}
                      </p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Occupation * </Label>
                    <Input
                      id=""
                      name="occupation"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.occupation}
                      type="select"
                      className={
                        formik.touched.occupation && formik.errors.occupation
                          ? "is-invalid"
                          : ""
                      }
                    >
                      <option>Select Occupation</option>

                      {isOccupationLoad ? (
                        <ButtonLoader />
                      ) : (
                        OccupationListing?.length > 0 &&
                        OccupationListing?.map((occupation) => {
                          return (
                            <option
                              value={
                                occupation?.description
                                  ? JSON.parse(occupation?.description)
                                  : occupation?.name
                              }
                            >
                              {occupation?.name}
                            </option>
                          );
                        })
                      )}
                    </Input>
                    {formik.touched.occupation && (
                      <p className="text-danger">{formik.errors.occupation}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Employed In * </Label>
                    <Input
                      id=""
                      name="employedIn"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.employedIn}
                      type="select"
                      className={
                        formik.touched.employedIn && formik.errors.employedIn
                          ? "is-invalid"
                          : ""
                      }
                    >
                      <option>Select Employed In</option>
                      {isEmpLoad ? (
                        <ButtonLoader />
                      ) : (
                        EmployeeInListing?.length > 0 &&
                        EmployeeInListing?.map((empIn) => {
                          return (
                            <option
                              value={
                                empIn?.description
                                  ? JSON.parse(empIn?.description)
                                  : empIn?.name
                              }
                            >
                              {empIn?.name}
                            </option>
                          );
                        })
                      )}
                    </Input>
                    {formik.touched.employedIn && (
                      <p className="text-danger">{formik.errors.employedIn}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Annual Income * </Label>
                    <Input
                      id=""
                      name="annualIncome"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.annualIncome}
                      type="select"
                      className={
                        formik.touched.annualIncome &&
                          formik.errors.annualIncome
                          ? "is-invalid"
                          : ""
                      }
                    >
                      <option value={""}>Select Annual Income</option>

                      {isIncomeLoad ? (
                        <ButtonLoader />
                      ) : (
                        IncomeRangeListing?.length > 0 &&
                        IncomeRangeListing?.map((incomeRange) => {
                          return (
                            <option
                              value={
                                incomeRange?.description
                                  ? `${JSON.parse(incomeRange?.description)
                                    ?.startRange
                                  } - ${JSON.parse(incomeRange?.description)
                                    ?.endRange
                                  }`
                                  : incomeRange?.name
                              }
                            >
                              {incomeRange?.description
                                ? JSON.parse(incomeRange?.description)
                                  ?.startRange +
                                JSON.parse(incomeRange?.description)
                                  ?.symbol + " - " +
                                JSON.parse(incomeRange?.description)
                                  ?.endRange +
                                JSON.parse(incomeRange?.description)
                                  ?.symbol
                                : incomeRange?.name}
                            </option>
                          );
                        })
                      )}
                    </Input>
                    {formik.touched.annualIncome && (
                      <p className="text-danger">
                        {formik.errors.annualIncome}
                      </p>
                    )}
                  </FormGroup>
                </Col>
                <Col xs="12" md="12" className="mt-4">
                  <FormGroup className="common-formgroup text-end">
                    <Button
                      className="btn btn-style1 px-5 py-2"
                      type="submit"
                    // onClick={() => {
                    //   toggle("2");
                    // }}
                    >
                      {" "}
                      {isFromDetails ? "Save" : "Next"}{" "}
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </form>
          )}
        </div>
      </TabPane>
    </>
  );
};

export default BasicDetails;
