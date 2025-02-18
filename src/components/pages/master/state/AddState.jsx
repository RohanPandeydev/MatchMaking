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
  MasterCountries,
  MasterCountry,
  MasterState,
} from "../../../../helper/ValidationHelper/Validation";
import CSVFileUpload from "../../../../helper/CSVFileUpload";
import { TbFileImport } from "react-icons/tb";
import validateCsvFile from "../../../../utils/ValidateCsv";

const AddState = () => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [myId, setMyId] = useState("");
  const file = "/samplestate.csv"

  const initialValues = {
    country: "",
    name: "",
    state_code: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: MasterState,
    onSubmit: (values, action) => {
      submitHandler(values);
    },
  });

  const submitHandler = (data) => {
    // console.log(values);
    if (myId) {
      Update.mutate({
        name: data?.name,
        state_code: data?.state_code?.toLowerCase(),
        country: data?.country,
        id: myId,
      });

      return;
    }
    AddState.mutate({
      name: data?.name,
      state_code: data?.state_code?.toLowerCase(),
      country: data?.country,
    });
  };

  const AddState = useMutation(
    (formdata) => MasterServices.AddState(formdata),
    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Added Successfully ",
          icon: "success",
        });

        formik.resetForm();

        queryClient.refetchQueries("all-state-list");
        return;
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.state_code[0] || err?.message,
          icon: "error",
        });
        return;
      },
    }
  );

  const { data, isLoading } = useQuery(
    ["all-country-list-dropdown"],
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
  const { } = useQuery(
    ["all-state-by-id", myId],
    () => MasterServices.getStateById({ id: myId }),
    {
      enabled: !!myId,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        formik.setFieldValue("country", data?.data?.country);
        formik.setFieldValue("name", data?.data?.name);
        formik.setFieldValue("state_code", data?.data?.state_code);

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
          text: err?.response?.data?.state_code[0] || err?.message,
          icon: "error",
        });
      },
    }
  );
  const Update = useMutation(
    (formdata) => MasterServices.getUpdateState(formdata),
    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully ",
          icon: "success",
        });

        formik.resetForm();
        nav("/master/state");

        queryClient.refetchQueries("all-state-list");
        return;
      },
      onError: (err) => {
        console.log(err.response?.data?.username, "dsfhsdf");
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.state_code[0] || err?.message,
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



  const UploadBulkFile = useMutation(
    (formdata) => MasterServices.uploadCsvFileState(formdata),
    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Uploaded Successfully ",
          icon: "success",
        });
        handleCloseImportCSVModel()
        nav("/master/state");


        return;
      },
      onError: (err) => {
        const errorArray = err?.response?.data; // Assuming it's like [{state_code: [...], name: [...]}]
        const extractedErrors = []; // Array to store all errors
      
        if (Array.isArray(errorArray)) {
          errorArray.forEach(errorObj => {
            // Dynamically extract values for known keys
            ['state_code', 'name'].forEach(key => {
              if (errorObj[key]) {
                extractedErrors.push(...errorObj[key]); // Spread and add all values
              }
            });
          });
        }
      
        console.log("Extracted Errors:", extractedErrors);
      
        // Display extracted errors or a fallback error message
        Swal.fire({
          title: "Error",
          text: extractedErrors.length > 0 
            ? extractedErrors.join("\n") 
            : err?.response?.data?.message || err?.message || "An unknown error occurred.",
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
    queryClient.refetchQueries("all-state-list");
    setToggleImportCSVModel(false)
    formik.resetForm()
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
    if (!formik.values.country) {
      Swal.fire({
        title: "Error",
        text: "Something Went wrong",
        icon: "error",
      });
      window.location.reload()

      return
    }
    // console.log(fileState)
    if (fileState && fileState?.file) {
      const formdata = new FormData()
      formdata?.append("file", fileState?.file)
      formdata?.append("country", formik.values.country)
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
        {formik.values.country && <Col xs="12" md="6" className="text-end">
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                name="name"
                placeholder="|"
                type="text"
                value={formik.values.name}
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
          <Col md="6">
            <FormGroup className="common-formgroup">
              <Label> State Code * </Label>
              <Input
                id=""
                name="state_code"
                placeholder="|"
                type="text"
                value={formik.values.state_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.state_code && formik.errors.state_code
                    ? "is-invalid"
                    : ""
                }
              ></Input>
              {formik.touched.state_code && (
                <p className="text-danger">{formik.errors.state_code}</p>
              )}
            </FormGroup>
          </Col>

          <Col md="12">
            <FormGroup className="common-formgroup">
              <Button
                className="btn btn-style1 px-4 py-2"
                type="submit"
                disabled={AddState?.isLoading || Update?.isLoading}
              >
                {(AddState?.isLoading || Update?.isLoading) ? <ButtonLoader /> : "Submit"}
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <CSVFileUpload toggleImportCSVModel={toggleImportCSVModel} setToggleImportCSVModel={setToggleImportCSVModel} handleImportCSVModel={handleImportCSVModel}
        handleSubmit={handleSubmit} handleCloseImportCSVModel={handleCloseImportCSVModel} handleFileChange={handleFileChange} fileState={fileState} file={file} UploadBulkFile={UploadBulkFile} fileName={"state"} />
    </Wrapper>
  );
};

export default AddState;
