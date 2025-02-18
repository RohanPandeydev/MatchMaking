import React, { useEffect, useMemo, useState } from "react";
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
import { ResidenceForm } from "../../../../../helper/ValidationHelper/Validation";
import BridenGroomServices from "../../../../../services/BridenGroomServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../../../../utils/Loader/Loader";
import { useLocation } from "react-router-dom";
import ValidateAuthenticationKey from "../../../../../utils/ValidationAuthenticationKey";
import ButtonLoader from "../../../../../utils/Loader/ButtonLoader";
import MasterServices from "../../../../../services/MasterServices";
import { IsAccessibleMethodBMS } from "../../../../../guard/Rbac";

const Residence = ({
  setId,
  toggle,
  id,
  isFromDetails,
  allData,
  refetchData,
  setActiveTabName,
  setCurrentActiveTab,
  handleNavToDetails,
  ResidenceStatusListing,
  isResidenceLoad,
  isPhoneCodeLoad,
  PhoneCodeListing,
}) => {
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const queryClient = useQueryClient();

  let location = useLocation();
  let queryParams = new URLSearchParams(location.search);
  let idValue = queryParams.get("id");
  let tabValue = queryParams.get("tab");
  const initialValues = {
    country: "",
    state: "",
    city: "",
    residenceStatus: "",
    countryCode: "",
    phoneNumber: "",
    contactNumber: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ResidenceForm,
    onSubmit: (values, action) => {
      submitHandler(values);
    },
  });

  const handleCountryChange = (e) => {
    setCityName("");
    setStateName("");
    formik.setFieldValue("city", "");
    formik.setFieldValue("state", "");
    setCountryName(e.target.value);
    formik.setFieldValue("country", e?.target.value);
  };

  const handleStateChange = (e) => {
    setCityName("");
    formik.setFieldValue("city", "");

    setStateName(e.target.value);
    formik.setFieldValue("state", e?.target.value);
  };
  const handleCityName = (e) => {
    setCityName(e.target.value);
    formik.setFieldValue("city", e?.target.value);
  };

  const submitHandler = (values) => {
    console.log(values);
    const sendData = {
      country: values?.country,
      state: values?.state,
      city: values?.city,
      residence_status: values?.residenceStatus,
      phone_code: values?.countryCode,
      phone: values?.phoneNumber,
      id: id,
      tab_residence: true,
    };

    updateLeadResidenceMutationForm.mutate(sendData);
  };

  // Country State City
  const { data: countryList, isLoading: isCountryLoad } = useQuery(
    ["all-country-list-bridengroom"],
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

  const { data: stateListDropdown, isLoading: isLoadState } = useQuery(
    ["all-state-list-bride-n-groom", countryName],
    () =>
      MasterServices.getStateListByCountryWithFilter(
        `?is_disabled=false&country__iso3=${countryName}`
      ),
    {
      enabled: !!countryName,
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

  const { data: cityListDropdown, isLoading: isCityLaod } = useQuery(
    ["all-city-list-bride-n-groom", countryName, stateName],
    () =>
      MasterServices.getCityListByFilter(
        `?is_disabled=false&state__state_code=${stateName}&country__iso3=${countryName}`
      ),
    {
      enabled: !!countryName && !!stateName,
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
        // formik.resetForm()
        // setCurrentActiveTab(2)
        // setActiveTabName("residence")
        formik.resetForm();

        setId(data?.data?.id);

        queryClient.refetchQueries([
          "bridengroomdatabyid-main",
          data?.data?.id,
        ]);
        toggle("3", "physical");
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
      console.log("==========", allData);
      formik.setFieldValue("country", allData?.country || "");
      setCountryName(allData?.country || "");
      formik.setFieldValue("state", allData?.state || "");
      setStateName(allData?.state);
      formik.setFieldValue("city", allData?.city || "");
      setCityName(allData?.city || "");
      formik.setFieldValue("residenceStatus", allData?.residence_status || "");
      formik.setFieldValue("countryCode", allData?.phone_code || "+91");
      formik.setFieldValue("phoneNumber", allData?.phone || "");
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
        <TabPane tabId="2">
          <div className="profile-form-wrap">
            <form onSubmit={formik.handleSubmit}>
              <Row className="gx-5">
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Country * </Label>
                    <Input
                      id=""
                      name="country"
                      type="select"
                      value={countryName}
                      onChange={handleCountryChange}
                      className={
                        formik.touched.country && formik.errors.country
                          ? "is-invalid"
                          : ""
                      }
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
                    <Label> State * </Label>
                    <Input
                      id=""
                      name="state"
                      type="select"
                      value={stateName}
                      className={
                        formik.touched.state && formik.errors.state
                          ? "is-invalid"
                          : ""
                      }
                      disabled={!!!countryName}
                      onChange={handleStateChange}
                    >
                      <option value={""}>Select State</option>
                      {isLoadState ? (
                        <ButtonLoader />
                      ) : (
                        stateListDropdown?.length > 0 &&
                        stateListDropdown.map((state) => (
                          <option
                            key={state?.name}
                            value={state?.state_code || ""}
                          >
                            {state?.name || ""}
                          </option>
                        ))
                      )}
                    </Input>
                    {formik.touched.state && (
                      <p className="text-danger">{formik.errors.state}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> City * </Label>
                    <Input
                      id=""
                      name="city"
                      type="select"
                      value={cityName}
                      onChange={handleCityName}
                      disabled={!!!countryName || !!!stateName}
                      className={
                        formik.touched.country && formik.errors.country
                          ? "is-invalid"
                          : ""
                      }
                    >
                      <option value={""}>Select City</option>
                      {isCityLaod ? (
                        <ButtonLoader />
                      ) : (
                        cityListDropdown?.length > 0 &&
                        cityListDropdown.map((state) => (
                          <option key={state?.name} value={state?.name || ""}>
                            {state?.name || ""}
                          </option>
                        ))
                      )}
                    </Input>
                    {formik.touched.city && (
                      <p className="text-danger">{formik.errors.city}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Residence status </Label>
                    <Input
                      className={
                        formik.touched.residenceStatus &&
                          formik.errors.residenceStatus
                          ? "is-invalid"
                          : ""
                      }
                      id=""
                      name="residenceStatus"
                      value={formik.values.residenceStatus}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
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
                    {formik.touched.residenceStatus && (
                      <p className="text-danger">
                        {formik.errors.residenceStatus}
                      </p>
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
                      <Label> Mobile * </Label>
                      <Input
                        value={formik.values.countryCode}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        id=""
                        name="countryCode"
                        type="select"
                        className={
                          formik.touched.countryCode && formik.errors.countryCode
                            ? "is-invalid"
                            : ""
                        }
                      >
                        <option value={""}>Select Country Code</option>
                        {isPhoneCodeLoad ? (
                          <ButtonLoader />
                        ) : (
                          PhoneCodeListing?.length > 0 &&
                          PhoneCodeListing?.map((phoneCode) => {
                            return (
                              <option
                                value={
                                  phoneCode?.description
                                    ? JSON.parse(phoneCode?.description).code
                                    : phoneCode?.name
                                }
                              >
                                {phoneCode?.name} ({" "}
                                {phoneCode?.description &&
                                  JSON.parse(phoneCode?.description).code}
                                )
                              </option>
                            );
                          })
                        )}
                      </Input>
                      {formik.touched.countryCode && (
                        <p className="text-danger">{formik.errors.countryCode}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="common-formgroup">
                      <Label>Enter Your Phone Number </Label>
                      <Input
                        id=""
                        value={formik.values.phoneNumber}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name="phoneNumber"
                        className={
                          formik.touched.phoneNumber && formik.errors.phoneNumber
                            ? "is-invalid"
                            : ""
                        }
                        placeholder="|"
                        type="tel"
                      />
                      {formik.touched.phoneNumber && (
                        <p className="text-danger">{formik.errors.phoneNumber}</p>
                      )}
                    </FormGroup>
                  </Col>
                </IsAccessibleMethodBMS> : <>
                  <Col md="6">
                    <FormGroup className="common-formgroup">
                      <Label> Mobile * </Label>
                      <Input
                        value={formik.values.countryCode}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        id=""
                        name="countryCode"
                        type="select"
                        className={
                          formik.touched.countryCode && formik.errors.countryCode
                            ? "is-invalid"
                            : ""
                        }
                      >
                        <option value={""}>Select Country Code</option>
                        {isPhoneCodeLoad ? (
                          <ButtonLoader />
                        ) : (
                          PhoneCodeListing?.length > 0 &&
                          PhoneCodeListing?.map((phoneCode) => {
                            return (
                              <option
                                value={
                                  phoneCode?.description
                                    ? JSON.parse(phoneCode?.description).code
                                    : phoneCode?.name
                                }
                              >
                                {phoneCode?.name} ({" "}
                                {phoneCode?.description &&
                                  JSON.parse(phoneCode?.description).code}
                                )
                              </option>
                            );
                          })
                        )}
                      </Input>
                      {formik.touched.countryCode && (
                        <p className="text-danger">{formik.errors.countryCode}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="common-formgroup">
                      <Label>Enter Your Phone Number </Label>
                      <Input
                        id=""
                        value={formik.values.phoneNumber}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name="phoneNumber"
                        className={
                          formik.touched.phoneNumber && formik.errors.phoneNumber
                            ? "is-invalid"
                            : ""
                        }
                        placeholder="|"
                        type="tel"
                      />
                      {formik.touched.phoneNumber && (
                        <p className="text-danger">{formik.errors.phoneNumber}</p>
                      )}
                    </FormGroup>
                  </Col>
                </>}
                {/* <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label>Contact Number </Label>
                    <Input
                      id=""
                      name="contactNumber"
                      className={
                        formik.touched.contactNumber &&
                        formik.errors.contactNumber
                          ? "is-invalid"
                          : ""
                      }
                      value={formik.values.contactNumber}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="|"
                      type="tel"
                    />
                    {formik.touched.contactNumber && (
                      <p className="text-danger">
                        {formik.errors.contactNumber}
                      </p>
                    )}
                  </FormGroup>
                </Col> */}
                <Col xs="12" md="12" className="mt-4">
                  <FormGroup className="common-formgroup text-end">
                    {!isFromDetails && (
                      <Button
                        className="btn btn-outline-style1 px-5 py-2 me-2"
                        type="click"
                        onClick={() => {
                          toggle("1", "basic");
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

export default Residence;
