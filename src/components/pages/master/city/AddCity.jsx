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
import { useNavigate, useParams } from "react-router-dom";
import {
  MasterCity,
  MasterCountries,
  MasterCountry,
  MasterState,
} from "../../../../helper/ValidationHelper/Validation";
import { TbFileImport } from "react-icons/tb";
import validateCsvFile from "../../../../utils/ValidateCsv";
import CSVFileUpload from "../../../../helper/CSVFileUpload";

const AddCity = () => {
  const file = "/samplecity.csv"

  const nav = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [myId, setMyId] = useState("");
  const [countryName, setCountryName] = useState("");

  const initialValues = {
    name: "",
    state: "",
    country: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: MasterCity,
    onSubmit: (values, action) => {
      submitHandler(values);
    },
  });

  const submitHandler = (data) => {
    if (myId) {
      Update.mutate({
        name: data?.name,
        state: data?.state,
        country: data?.country,
        id: myId,
      });

      return;
    }
    // console.log(values);
    AddCity.mutate({
      name: data?.name,
      state: data?.state,
      country: data?.country,
    });
  };

  const AddCity = useMutation((formdata) => MasterServices.AddCity(formdata), {
    onSuccess: (data) => {
      console.log("Data==>", data?.data);
      Swal.fire({
        title: "Successfull",
        text: "Added Successfully ",
        icon: "success",
      });

      formik.resetForm();
      nav("/master/city");

      queryClient.refetchQueries("all-city-list");
      return;
    },
    onError: (err) => {
      Swal.fire({
        title: "Error",
        text: err?.response?.data?.username[0] || err?.message,
        icon: "error",
      });
      return;
    },
  });

  const { data, isLoading } = useQuery(
    ["all-country-list-dropdown-city"],
    () => MasterServices.getCountryList(),
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
    ["all-state-list-city", countryName],
    () => MasterServices.getStateListByCountry({ country__name: countryName }),
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

  const Update = useMutation(
    (formdata) => MasterServices.getUpdateCity(formdata),
    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully ",
          icon: "success",
        });

        formik.resetForm();
        nav("/master/city");

        queryClient.refetchQueries("all-city-list");
        return;
      },
      onError: (err) => {
        console.log(err.response?.data?.username, "dsfhsdf");
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.iso3[0] || err?.message,
          icon: "error",
        });
        return;
      },
    }
  );

  const { } = useQuery(
    ["all-city-list-by-id", myId],
    () => MasterServices.getCityById({ id: myId }),
    {
      enabled: !!myId,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        formik.setFieldValue("country", data?.data?.country);
        formik.setFieldValue("state", data?.data?.state);
        formik.setFieldValue("name", data?.data?.name);

        // return data?.data;
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
  const handleCountryChange = (e) => {
    const selectedCountryId = e.target.value;
    const selectedCountry = data?.find((each) => each.id == selectedCountryId);
    console.log(selectedCountryId, selectedCountry);

    if (selectedCountry) {
      formik.setFieldValue("country", selectedCountryId); // Set ID in formik values
      setCountryName(selectedCountry.name); // Set name in `countryName` state
    }
  };

  const UploadBulkFile = useMutation(
    (formdata) => MasterServices.uploadCsvFileCity(formdata),
    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully ",
          icon: "success",
        });
        handleCloseImportCSVModel()
        nav("/master/city");

        return;
      },
      onError: (err) => {
        const errorArray = err?.response?.data; // Assuming it's like [{state_code: [...], name: [...]}]
        const extractedErrors = []; // Array to store all errors
        if (Array.isArray(errorArray)) {
          errorArray.forEach((errorObj) => {
            // Handle errorObj.data
            if (errorObj.data?.name) {
              extractedErrors.push(`${errorObj.data.name} already present in respective country and state`);
            }
        
            // Handle errorObj.name
            if (errorObj.name) {
              extractedErrors.push(`name: ${errorObj.name}`); // Construct message in key + value format
            }
          });
        }

        if (extractedErrors.length > 0) {
          // console.log(extractedErrors, "extractedErrors")
          // alert(extractedErrors.join("\n")); // Join and display each message on a new line
          Swal.fire({
            title: "Error",
            text: extractedErrors.join("\n") || err?.message,
            icon: "error",
          });
          return
        }
        // Display extracted errors or a fallback error message
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );

  // Import CSV modal 
  const [toggleImportCSVModel, setToggleImportCSVModel] = useState(false);
  const handleImportCSVModel = () => setToggleImportCSVModel(true);
  const handleCloseImportCSVModel = () => {
    setFileState(false)
    queryClient.refetchQueries("all-city-list");
    formik.resetForm()
    setToggleImportCSVModel(false)
  }

  const [fileState, setFileState] = useState({
    file: null,
    fileError: ''
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Validate the file
    if (validateCsvFile(file, fileState, setFileState)) {
      // File is valid, you can proceed with further processing
      setFileState(prevState => ({
        ...prevState,
        file: file
      }));
    }
  };



  const handleSubmit = () => {
    if (!formik.values.country || !formik.values.state) {
      Swal.fire({
        title: "Error",
        text: "Something Went wrong",
        icon: "error",
      });
      window.location.reload()

      return
    }
    if (fileState && fileState?.file) {
      const formdata = new FormData()
      formdata?.append("country", formik.values?.country)
      formdata?.append("state", formik.values?.state)
      formdata?.append("file", fileState?.file)
      UploadBulkFile?.mutate(formdata)
      return

    }
    Swal.fire({
      title: "Error",
      text: "Select File ",
      icon: "error",
    });



  }
  return (
    <Wrapper>
      <div className="align-items-center row">
        <Col xs="12" md="6">

        </Col>
        {(formik.values?.country && formik.values.state) && <Col xs="12" md="6" className="text-end">
          <Button className="btn btn-style1" onClick={handleImportCSVModel}>
            Import CSV <TbFileImport />
          </Button>
        </Col>}
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6">
            <FormGroup className="common-formgroup">
              <Label> Country * </Label>
              <Input
                id=""
                name="country"
                type="select"
                placeholder="|"
                disabled={isLoading}
                onChange={(e) => handleCountryChange(e)}
                value={formik.values?.country}
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
                    return <option value={each?.id}>{each?.name || ""}</option>;
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
                type="select"
                disabled={isLoadState}
                placeholder="|"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.state}
                className={
                  formik.touched.state && formik.errors.state
                    ? "is-invalid"
                    : ""
                }
              >
                <option value={""}>Select State</option>
                {isLoadState ? (
                  <ButtonLoader />
                ) : (
                  stateListDropdown?.length > 0 &&
                  stateListDropdown?.map((each) => {
                    return <option value={each?.id}>{each?.name || ""}</option>;
                  })
                )}
              </Input>
              {formik.touched.state && (
                <p className="text-danger">{formik.errors.state}</p>
              )}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup className="common-formgroup">
              <Label> Name * </Label>
              <Input
                id=""
                name="name"
                type="text"
                value={formik.values.name}
                placeholder="|"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }
              ></Input>
              {formik.touched.name && (
                <p className="text-danger">{formik.errors.name}</p>
              )}
            </FormGroup>
          </Col>

          <Col md="12">
            <FormGroup className="common-formgroup">
              <Button
                className="btn btn-style1 px-4 py-2"
                type="submit"
                disabled={AddCity?.isLoading || Update?.isLoading}
              >
                {AddCity?.isLoading || Update?.isLoading ? (
                  <ButtonLoader />
                ) : (
                  "Submit"
                )}
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <CSVFileUpload toggleImportCSVModel={toggleImportCSVModel} setToggleImportCSVModel={setToggleImportCSVModel} handleImportCSVModel={handleImportCSVModel}
        handleSubmit={handleSubmit} handleCloseImportCSVModel={handleCloseImportCSVModel} handleFileChange={handleFileChange} fileState={fileState} file={file} UploadBulkFile={UploadBulkFile} fileName="city" />
    </Wrapper>
  );
};

export default AddCity;
