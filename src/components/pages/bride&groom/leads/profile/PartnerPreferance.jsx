import React, { useEffect, useState } from "react";
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
import countries from "../../../../../utils/CountryList";
import { useFormik } from "formik";
import { PartnerPreferanceForm } from "../../../../../helper/ValidationHelper/Validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BridenGroomServices from "../../../../../services/BridenGroomServices";
import Swal from "sweetalert2";
import Loader from "../../../../../utils/Loader/Loader";
import { useLocation } from "react-router-dom";
import ValidateAuthenticationKey from "../../../../../utils/ValidationAuthenticationKey";
import ButtonLoader from "../../../../../utils/Loader/ButtonLoader";
import MasterServices from "../../../../../services/MasterServices";
import heightOptions from "../../../../../utils/JSON/Height";

const PartnerPreferance = ({
  setId,
  toggle,
  id,
  isFromDetails,
  allData,
  refetchData,
  setActiveTabName,
  setCurrentActiveTab,
  handleNavToDetails,
  LookingForListing,
  isLookingForLoad,
  ComplexionListing,
  isComplexionLoad,
  AgeListing,
  isAgeLoad,
  LanguageListing,
  isLanguageLoaded,
  ReligionsListing,
  isReligionLoad,
  CasteListing,
  isCasteLoad,
  IncomeRangeListing,
  isIncomeLoad,
  EducationQualification,
  isEducationLoad,
  ResidenceStatusListing,
  isResidenceLoad,
}) => {
  let location = useLocation();
  let queryParams = new URLSearchParams(location.search);
  let idValue = queryParams.get("id");
  let tabValue = queryParams.get("tab");
  const queryClient = useQueryClient();

  // const heightOptions = [
  //   { id: 1, height: "4 ft 0 in", value: 4.0 },
  //   { id: 2, height: "4 ft 1 in", value: 4.1 },
  //   { id: 3, height: "4 ft 2 in", value: 4.2 },
  //   { id: 4, height: "4 ft 3 in", value: 4.3 },
  //   { id: 5, height: "4 ft 4 in", value: 4.4 },
  //   { id: 6, height: "4 ft 5 in", value: 4.5 },
  //   { id: 7, height: "4 ft 6 in", value: 4.6 },
  //   { id: 8, height: "4 ft 7 in", value: 4.7 },
  //   { id: 9, height: "4 ft 8 in", value: 4.8 },
  //   { id: 10, height: "4 ft 9 in", value: 4.9 },
  //   { id: 11, height: "4 ft 10 in", value: 4.1 },
  //   { id: 12, height: "4 ft 11 in", value: 4.11 },
  //   { id: 13, height: "5 ft 0 in", value: 5.0 },
  //   { id: 14, height: "5 ft 1 in", value: 5.1 },
  //   { id: 15, height: "5 ft 2 in", value: 5.2 },
  //   { id: 16, height: "5 ft 3 in", value: 5.3 },
  //   { id: 17, height: "5 ft 4 in", value: 5.4 },
  //   { id: 18, height: "5 ft 5 in", value: 5.5 },
  //   { id: 19, height: "5 ft 6 in", value: 5.6 },
  //   { id: 20, height: "5 ft 7 in", value: 5.7 },
  //   { id: 21, height: "5 ft 8 in", value: 5.8 },
  //   { id: 22, height: "5 ft 9 in", value: 5.9 },
  //   { id: 23, height: "5 ft 10 in", value: 5.1 },
  //   { id: 24, height: "5 ft 11 in", value: 5.11 },
  //   { id: 25, height: "6 ft 0 in", value: 6.0 },
  //   { id: 26, height: "6 ft 1 in", value: 6.1 },
  //   { id: 27, height: "6 ft 2 in", value: 6.2 },
  //   { id: 28, height: "6 ft 3 in", value: 6.3 },
  //   { id: 29, height: "6 ft 4 in", value: 6.4 },
  //   { id: 30, height: "6 ft 5 in", value: 6.5 },
  //   { id: 31, height: "6 ft 6 in", value: 6.6 },
  //   { id: 32, height: "6 ft 7 in", value: 6.7 },
  //   { id: 33, height: "6 ft 8 in", value: 6.8 },
  //   { id: 34, height: "6 ft 9 in", value: 6.9 },
  //   { id: 35, height: "6 ft 10 in", value: 6.1 },
  //   { id: 36, height: "6 ft 11 in", value: 6.11 },
  //   { id: 37, height: "7 ft 0 in", value: 7.0 },
  // ];


  const initialValues = {
    lookingFor: "",
    complexion: "",
    fromAge: "",
    toAge: "",
    fromHeight: "",
    toHeight: "",
    mothertongue: "",
    religion: "",
    caste: "",
    education: "",
    annualIncome: "",
    country: "",
    residanceStatus: "",
    maritalStatus: "unmarried",
    gender: "male",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: PartnerPreferanceForm,
    onSubmit: (values, action) => {
      submitHandler(values);
    },
  });

  const submitHandler = (values) => {
    console.log(values, "========");

    const sendData = {
      looking_for: values?.lookingFor,
      partner_complexion: values?.complexion,
      partner_age_min: values?.fromAge,
      partner_age_max: values?.toAge,
      partner_hight_min: values?.fromHeight,
      partner_hight_max: values?.toHeight,
      partner_mother_tongue: values.mothertongue,
      partner_religion: values?.religion,
      partner_caste: values?.caste,
      partner_education: values?.education,
      partner_annual_income: values?.annualIncome,
      partner_country: values?.country,
      partner_residence_status: values?.residanceStatus,
      partner_gender: values?.gender,
      partner_marital_status: values?.maritalStatus,
      id: id,
      tab_partner_preferance: true,
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

        if (isFromDetails) return handleNavToDetails();
        formik.resetForm();
        setId(data?.data?.id);
        queryClient.refetchQueries([
          "bridengroomdatabyid-main",
          data?.data?.id,
        ]);

        toggle("6", "upload");
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
      console.log("Body ======", allData?.partner_hight_min);

      formik.setFieldValue("lookingFor", allData?.looking_for || "");
      formik.setFieldValue("complexion", allData?.partner_complexion || "");
      formik.setFieldValue("fromAge", allData?.partner_age_min || "");
      formik.setFieldValue("toAge", allData?.partner_age_max || "");

      formik.setFieldValue(
        "mothertongue",
        allData?.partner_mother_tongue || ""
      );
      formik.setFieldValue("religion", allData?.partner_religion || "");
      // formik.setFieldValue("caste", allData?.partner_caste || "");
      formik.setFieldValue("education", allData?.partner_education || "");
      formik.setFieldValue(
        "annualIncome",
        allData?.partner_annual_income || ""
      );
      formik.setFieldValue("country", allData?.partner_country || "");
      formik.setFieldValue(
        "residanceStatus",
        allData?.partner_residence_status || ""
      );
      formik.setFieldValue("gender", allData?.partner_gender || "");
      formik.setFieldValue(
        "maritalStatus",
        allData?.partner_marital_status || ""
      );
      formik.setFieldValue("id", allData?.id);
      formik.setFieldValue(
        "fromHeight",
        !!parseFloat(allData?.partner_hight_min)
          ? parseFloat(allData?.partner_hight_min)
          : ""
      );
      formik.setFieldValue(
        "toHeight",
        !!parseFloat(allData?.partner_hight_max)
          ? parseFloat(allData?.partner_hight_max)
          : ""
      );
    }
  }, [refetchData, id]);

  const { data: countryList, isLoading: isCountryLoad } = useQuery(
    ["all-country-list-bridengroom-partner"],
    () => MasterServices.getCountryListByFilter(`?is_disabled=false`),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.data;
        // console.log("Languages API Data", data?.data); // Debugging log
      },
      onError: (err) => {
        console.error("Error fetching languages", err?.message); // Debugging log
        if (err?.response?.status === 401) {
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


  const [casteListingData, setCasteListingData] = useState([])
  useEffect(() => {
    if (formik.values?.religion) {
      const filteredCasteList = CasteListing?.filter((each) => {
        const descReligion = each?.description ? JSON.parse(each.description)?.religion : null;
        return descReligion === formik.values.religion;
      });
      const findPrefillValue = filteredCasteList?.find((each) => {
        const descCaste = each?.description ? JSON.parse(each.description)?.name : null;
        return allData?.partner_caste == descCaste

      })
      console.log(findPrefillValue, allData?.partner_caste, filteredCasteList, "findPrefillValue")
      const valuetoset = findPrefillValue?.description ? JSON.parse(findPrefillValue.description)?.name : null;
      setCasteListingData(filteredCasteList);

      formik.setFieldValue("caste", valuetoset || "")


      // console.log(filteredCasteList,"=============",formik.values?.religion,CasteListing)
    }
  }, [formik.values.religion]);
  return (
    <>
      {!id ? (
        <p className="text-danger">Please fill basic details first</p>
      ) : updateLeadResidenceMutationForm?.isLoading ? (
        <Loader />
      ) : (
        <TabPane tabId="5">
          <div className="profile-form-wrap">
            <form onSubmit={formik.handleSubmit}>
              <Row className="gx-5">
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Looking For * </Label>
                    <Input
                      id=""
                      className={
                        formik.touched.profileText && formik.errors.profileText
                          ? "is-invalid"
                          : ""
                      }
                      name="lookingFor"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lookingFor}
                      type="select"
                    >
                      <option value={""}>Select Looking For</option>
                      {isLookingForLoad ? (
                        <ButtonLoader />
                      ) : (
                        LookingForListing?.length > 0 &&
                        LookingForListing?.map((looking) => {
                          return (
                            <option
                              value={
                                looking?.description
                                  ? JSON.parse(looking?.description)
                                  : looking?.name
                              }
                            >
                              {looking?.name}
                            </option>
                          );
                        })
                      )}
                    </Input>
                    {formik.touched.lookingFor && (
                      <p className="text-danger">{formik.errors.lookingFor}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Partner Complexion </Label>
                    <Input
                      id=""
                      className={
                        formik.touched.complexion && formik.errors.complexion
                          ? "is-invalid"
                          : ""
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.complexion}
                      name="complexion"
                      type="select"
                    >
                      <option value={""}>Select Option</option>
                      {isComplexionLoad ? (
                        <ButtonLoader />
                      ) : (
                        ComplexionListing?.length > 0 &&
                        ComplexionListing.map((complexion) => (
                          <option
                            key={complexion?.name}
                            value={
                              complexion.description &&
                              JSON.parse(complexion.description)
                            }
                          >
                            {complexion?.name || ""}
                          </option>
                        ))
                      )}
                    </Input>
                    {formik.touched.complexion && (
                      <p className="text-danger">{formik.errors.complexion}</p>
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
                          id="GenderFemale"
                          value={"female"}
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
                      <li>
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
                      </li>
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
                    <Label> Partner From Age * </Label>
                    <Input
                      id=""
                      className={
                        formik.touched.fromAge && formik.errors.fromAge
                          ? "is-invalid"
                          : ""
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fromAge}
                      name="fromAge"
                      type="select"
                    >
                      <option value={""}>Select Age</option>
                      {isAgeLoad ? (
                        <ButtonLoader />
                      ) : (
                        AgeListing?.length > 0 &&
                        AgeListing.map((age) => (
                          <option
                            key={age?.name}
                            value={
                              age.description && JSON.parse(age.description)
                            }
                          >
                            {age?.name || ""}
                          </option>
                        ))
                      )}
                    </Input>
                    {formik.touched.fromAge && (
                      <p className="text-danger">{formik.errors.fromAge}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Partner To Age * </Label>
                    <Input
                      id=""
                      name="toAge"
                      className={
                        formik.touched.toAge && formik.errors.toAge
                          ? "is-invalid"
                          : ""
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.toAge}
                      type="select"
                    >
                      <option value={""}>Select Age</option>
                      {isAgeLoad ? (
                        <ButtonLoader />
                      ) : (
                        AgeListing?.length > 0 &&
                        AgeListing.map((age) => (
                          <option
                            key={age?.name}
                            value={
                              age.description && JSON.parse(age.description)
                            }
                          >
                            {age?.name || ""}
                          </option>
                        ))
                      )}
                    </Input>
                    {formik.touched.toAge && (
                      <p className="text-danger">{formik.errors.toAge}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Partner From Height * </Label>
                    <Input
                      id=""
                      className={
                        formik.touched.fromHeight && formik.errors.fromHeight
                          ? "is-invalid"
                          : ""
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fromHeight}
                      name="fromHeight"
                      type="select"
                    >
                      <option value={""}>Select Height</option>
                      {heightOptions?.map((each) => {
                        return (
                          <option value={each?.value}>{each?.height}</option>
                        );
                      })}
                    </Input>
                    {formik.touched.fromHeight && (
                      <p className="text-danger">{formik.errors.fromHeight}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Partner To Height * </Label>
                    <Input
                      id=""
                      className={
                        formik.touched.toHeight && formik.errors.toHeight
                          ? "is-invalid"
                          : ""
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.toHeight}
                      name="toHeight"
                      type="select"
                    >
                      <option value={""}>Select Height</option>
                      {heightOptions?.map((each) => {
                        return (
                          <option value={each?.value}>{each?.height}</option>
                        );
                      })}
                    </Input>
                    {formik.touched.toHeight && (
                      <p className="text-danger">{formik.errors.toHeight}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Partner Mothertongue * </Label>
                    <Input
                      id=""
                      name="mothertongue"
                      className={
                        formik.touched.mothertongue &&
                          formik.errors.mothertongue
                          ? "is-invalid"
                          : ""
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mothertongue}
                      type="select"
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
                    </Input>
                    {formik.touched.mothertongue && (
                      <p className="text-danger">
                        {formik.errors.mothertongue}
                      </p>
                    )}
                  </FormGroup>
                </Col>
                <Col xs="12" className="mb-4 mt-5">
                  <div className="form-title">
                    <h4>
                      <span>Religious Preferences</span>
                    </h4>
                  </div>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Partner Religion * </Label>
                    <Input
                      id=""
                      className={
                        formik.touched.religion && formik.errors.religion
                          ? "is-invalid"
                          : ""
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.religion}
                      name="religion"
                      type="select"
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
                    <Label> Partner Caste * </Label>
                    <Input
                      id=""
                      className={
                        formik.touched.caste && formik.errors.caste
                          ? "is-invalid"
                          : ""
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.caste}
                      disabled={!!!formik.values.religion}
                      name="caste"
                      type="select"
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
                      )}{" "}
                    </Input>
                    {formik.touched.caste && (
                      <p className="text-danger">{formik.errors.caste}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col xs="12" className="mb-4 mt-5">
                  <div className="form-title">
                    <h4>
                      <span>Education / Occupation Preferences</span>
                    </h4>
                  </div>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Partner Education * </Label>
                    <Input
                      id=""
                      name="education"
                      className={
                        formik.touched.education && formik.errors.education
                          ? "is-invalid"
                          : ""
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.education}
                      type="select"
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
                    <Label> Partner Annual Income </Label>
                    <Input
                      id=""
                      onChange={formik.handleChange}
                      className={
                        formik.touched.annualIncome &&
                          formik.errors.annualIncome
                          ? "is-invalid"
                          : ""
                      }
                      onBlur={formik.handleBlur}
                      value={formik.values.annualIncome}
                      name="annualIncome"
                      type="select"
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
                                  ? `${JSON.parse(incomeRange?.description)?.startRange} - ${JSON.parse(incomeRange?.description)?.endRange}`
                                  : incomeRange?.name
                              }
                            >
                              {incomeRange?.description
                                ? JSON.parse(incomeRange?.description)
                                  ?.startRange +
                                JSON.parse(incomeRange?.description)
                                  ?.symbol + " - " +
                                JSON.parse(incomeRange?.description)?.endRange + JSON.parse(incomeRange?.description)
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
                <Col xs="12" className="mb-4 mt-5">
                  <div className="form-title">
                    <h4>
                      <span>Location Preferences</span>
                    </h4>
                  </div>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Partner Country * </Label>
                    <Input
                      id=""
                      onChange={formik.handleChange}
                      className={
                        formik.touched.country && formik.errors.country
                          ? "is-invalid"
                          : ""
                      }
                      onBlur={formik.handleBlur}
                      value={formik.values.country}
                      name="country"
                      type="select"
                    >
                      <option value={""}>Select Country</option>
                      {isCountryLoad ? (
                        <ButtonLoader />
                      ) : (
                        countryList?.length > 0 &&
                        countryList.map((country) => (
                          <option
                            key={country?.name}
                            value={country?.iso3 || ""}
                          >
                            {country?.name || ""}
                          </option>
                        ))
                      )}
                    </Input>
                    {formik.touched.country && (
                      <p className="text-danger">{formik.errors.country}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Partner Residence Status </Label>
                    <Input
                      id=""
                      name="residanceStatus"
                      onChange={formik.handleChange}
                      className={
                        formik.touched.residanceStatus &&
                          formik.errors.residanceStatus
                          ? "is-invalid"
                          : ""
                      }
                      onBlur={formik.handleBlur}
                      value={formik.values.residanceStatus}
                      type="select"
                    >
                      <option value={""}>Select Residence status</option>
                      {isResidenceLoad ? (
                        <ButtonLoader />
                      ) : (
                        ResidenceStatusListing?.length > 0 &&
                        ResidenceStatusListing?.map((residence) => {
                          return (
                            <option
                              value={
                                residence?.description
                                  ? JSON.parse(residence?.description)
                                  : residence?.name
                              }
                            >
                              {residence?.name}
                            </option>
                          );
                        })
                      )}
                    </Input>
                    {formik.touched.residanceStatus && (
                      <p className="text-danger">
                        {formik.errors.residanceStatus}
                      </p>
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
                          toggle("4", "other");
                        }}
                      >
                        {" "}
                        Back{" "}
                      </Button>
                    )}
                    <Button
                      disabled={updateLeadResidenceMutationForm?.isLoading}
                      className="btn btn-style1 px-5 py-2"
                      type="submit"
                    >
                      {" "}
                      {isFromDetails ? "Save" : "Next"}{" "}
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </form>
          </div>
        </TabPane>
      )}
    </>
  );
};

export default PartnerPreferance;
