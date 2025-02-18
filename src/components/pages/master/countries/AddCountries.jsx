import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Wrapper from "../../../layouts/Wrapper";
import MasterServices from "../../../../services/MasterServices";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import getValueBetweenMasterAndAdd from "../../../../utils/UrlParserDropdown";
import { useNavigate } from "react-router-dom";
import { MasterCountries } from "../../../../helper/ValidationHelper/Validation";

const AddCountries = () => {
  
  const url = getValueBetweenMasterAndAdd(window.location.href);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const nav = useNavigate();
  const [ids, setIds] = useState("");
  const queryClient = useQueryClient();
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const initialValues = {
    country: "",
    state: "",
    city: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: MasterCountries,
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

  const submitHandler = (data) => {
    // console.log(values);
    AddCountries.mutate({
      name: data?.country,
      description: JSON.stringify({  name: data?.country,state: data?.state, city: data?.city }),
      category: ids,
    });
  };

  const { data, isLoading } = useQuery(
    ["all-countries-master"],
    () => MasterServices.country(),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.data?.data;
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

  // console.log("datadatadata",data?.length)
  // const stateListMutation = useMutation(
  //   (data) => MasterServices.stateList(data),
  //   {
  //     onSuccess: (data) => {
  //       // console.log(data?.data, "stateListMutation");
  //       return data?.data;
  //     },
  //     onError: (err) => {
  //       console.log("Error response data:", err.response?.data);

  //       // Check for specific error messages or provide a generic message
  //       const msg =
  //         err.response?.data?.username?.[0] ||
  //         err.response?.data?.host?.[0] ||
  //         "An unexpected error occurred. Please try again.";

  //       Swal.fire({
  //         title: "Error",
  //         text: msg,
  //         icon: "error",
  //       });

  //       return;
  //     },
  //   }
  // );
  // const cityListMutation = useMutation(
  //   (data) => MasterServices.cityList(data),
  //   {
  //     select: (data) => {},
  //     onError: (err) => {
  //       console.log("Error response data:", err.response?.data);

  //       // Check for specific error messages or provide a generic message
  //       const msg =
  //         err.response?.data?.username?.[0] ||
  //         err.response?.data?.host?.[0] ||
  //         "An unexpected error occurred. Please try again.";

  //       Swal.fire({
  //         title: "Error",
  //         text: msg,
  //         icon: "error",
  //       });

  //       return;
  //     },
  //   }
  // );

  const AddCountries = useMutation((formdata) => MasterServices.Add(formdata), {
    onSuccess: (data) => {
      console.log("Data==>", data?.data);
      Swal.fire({
        title: "Successfull",
        text: "Added Successfully ",
        icon: "success",
      });

      formik.resetForm();
      nav("/master/countries/");

      queryClient.refetchQueries("all-country-list");
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
  });

  const { data: PageId, isLoading: isPage } = useQuery(
    ["all-pageId-list-countries", url],
    () => MasterServices.getSideBarListingId(`name=${url}`),
    {
      enabled: !!url,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        // console.log("Languages API Data", data?.data); // Debugging log
        setIds(data?.data[0]?.id);
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
  // useEffect(() => {
  //   const fetchStates = async () => {
  //     if (!countryName) {
  //       setStateList([]); // Clear stateList if no country is selected
  //       return;
  //     }

  //     try {
  //       const response = await stateListMutation.mutateAsync({
  //         country: countryName,
  //       });

  //       if (response.data?.data?.length === 0) {
  //         setStateList([]); // No states found, set an empty array
  //       } else {
  //         setStateList(response.data?.data?.states || []); // Set the states list
  //       }
  //     } catch (error) {
  //       console.error("Error fetching states:", error);
  //       setStateList([]); // In case of error, set an empty array
  //     }
  //   };

  //   fetchStates();
  // }, [countryName]);
  // useEffect(() => {
  //   const fetchStates = async () => {
  //     if (!stateName) {
  //       setCityList([]); // Clear stateList if no country is selected
  //       return;
  //     }

  //     try {
  //       const response = await cityListMutation.mutateAsync({
  //         country: countryName,
  //         state: stateName,
  //       });

  //       if (response.data?.data?.length === 0) {
  //         setCityList([]); // No states found, set an empty array
  //       } else {
  //         setCityList(response.data?.data || []); // Set the states list
  //       }
  //     } catch (error) {
  //       console.error("Error fetching states:", error);
  //       setCityList([]); // In case of error, set an empty array
  //     }
  //   };

  //   fetchStates();
  // }, [stateName]);



  return (
    <Wrapper>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6">
            <FormGroup className="common-formgroup">
              <Label> Country * </Label>
              <Input
                id=""
                name="country"
                type="select"
                value={countryName}
                disabled={isLoading}
                onChange={handleCountryChange}
                className={
                  formik.touched.country && formik.errors.country
                    ? "is-invalid"
                    : ""
                }
              >
                <option value={""}>Select Country</option>
                {isLoading ? (
                  <ButtonLoader />
                ) : (
                  data?.length > 0 &&
                  data?.map((each) => {
                    return (
                      <option value={each?.name}>{each?.name || ""}</option>
                    );
                  })
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
                type="text"
                value={stateName}
                // disabled={stateListMutation?.isLoading || !!!countryName}
                className={
                  formik.touched.state && formik.errors.state
                    ? "is-invalid"
                    : ""
                }
                onChange={handleStateChange}
              >
                {/* <option value={""}>Select State</option>
                {stateListMutation?.isLoading ? (
                  <ButtonLoader />
                ) : stateList?.length == 0 ? (
                  <option value={""}> No state found</option>
                ) : (
                  stateList?.map((each) => {
                    return <option value={each?.name}>{each?.name}</option>;
                  })
                )} */}
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
                type="text"
                value={cityName}
                onChange={handleCityName}
                // disabled={
                //   cityListMutation?.isLoading || !!!stateName || !!!countryName
                // }
                className={
                  formik.touched.country && formik.errors.country
                    ? "is-invalid"
                    : ""
                }
              >
                {/* <option value={""}>Select City</option>
                {cityListMutation?.isLoading ? (
                  <ButtonLoader />
                ) : cityList?.length == 0 ? (
                  <option value={""}> No city found</option>
                ) : (
                  cityList?.map((each) => {
                    return <option value={each || ""}>{each || ""}</option>;
                  })
                )} */}
              </Input>
              {formik.touched.city && (
                <p className="text-danger">{formik.errors.city}</p>
              )}
            </FormGroup>
          </Col>

          <Col md="12">
            <FormGroup className="common-formgroup">
              <Button
                className="btn btn-style1 px-4 py-2"
                type="submit"
                disabled={AddCountries?.isLoading}
              >
                {AddCountries?.isLoading ? <ButtonLoader /> : "Submit"}
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default AddCountries;
