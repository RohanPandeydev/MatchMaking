import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, Row, Table } from "reactstrap";
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
} from "../../../../helper/ValidationHelper/Validation";
import { TbFileImport } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import CSVFileUpload from "../../../../helper/CSVFileUpload";
import validateCsvFile from "../../../../utils/ValidateCsv";
import { isArray } from "lodash";


const AddCountry = () => {
  const file = "/samplecountries.csv"
  const nav = useNavigate();
  const queryClient = useQueryClient();
  // const [file,setFile]=useState(false)
  const { id } = useParams();
  const [myId, setMyId] = useState("");

  const initialValues = {
    country: "",
    iso: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: MasterCountry,
    onSubmit: (values, action) => {
      submitHandler(values);
    },
  });

  const submitHandler = (data) => {
    // console.log(values);
    if (myId) {
      Update.mutate({
        name: data?.country,
        iso3: data?.iso?.toLowerCase(),
        id: myId,
      });

      return;
    }
    AddCountry.mutate({
      name: data?.country,
      iso3: data?.iso?.toLowerCase(),
    });
  };

  const AddCountry = useMutation(
    (formdata) => MasterServices.AddCountry(formdata),
    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Added Successfully ",
          icon: "success",
        });

        formik.resetForm();
        nav("/master/country");

        queryClient.refetchQueries("all-country-list");
        return;
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.iso3[0] || err?.message,
          icon: "error",
        });
        return;
      },
    }
  );
  const { data, isLoading } = useQuery(
    ["all-country-list-by-id", myId],
    () => MasterServices.getCountryById({ id: myId }),
    {
      enabled: !!myId,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        formik.setFieldValue("country", data?.data?.name);
        formik.setFieldValue("iso", data?.data?.iso3);

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

  const Update = useMutation(
    (formdata) => MasterServices.getUpdateCountry(formdata),
    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully ",
          icon: "success",
        });

        formik.resetForm();
        nav("/master/country");

        queryClient.refetchQueries("all-country-list");
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
  const UploadBulkFile = useMutation(
    (formdata) => MasterServices.uploadCsvFileCountry(formdata),
    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully ",
          icon: "success",
        });
        handleCloseImportCSVModel()
        nav("/master/country");

        return;
      },
      onError: (err) => {
        console.log(err.response, "dsfhsdf");
        const isArrayError = isArray(err?.response?.data)
        console.log(isArrayError, err?.response?.data, "isArrayError")
        const errorArray = err?.response?.data; // Assuming it's like [{iso3:["you have abc already exist"]}]
        const extractedErrors = []; // Blank array to store all iso3 values

        if (Array.isArray(errorArray)) {
          errorArray.forEach(errorObj => {
            if (errorObj.iso3) {
              extractedErrors.push(...errorObj.iso3); // Spread and add all iso3 values
            }
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
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
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

  // Import CSV modal 
  const [toggleImportCSVModel, setToggleImportCSVModel] = useState(false);
  const handleImportCSVModel = () => setToggleImportCSVModel(true);
  const handleCloseImportCSVModel = () => {
    setFileState(false)

    queryClient.refetchQueries("all-country-list");
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
    console.log(fileState)
    if (fileState && fileState?.file) {
      const formdata = new FormData()
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
      <div className="common-db-head mb-4">
        <div className="align-items-center row">
          <Col xs="12" md="6">

          </Col>
          <Col xs="12" md="6" className="text-end">
            <Button className="btn btn-style1" onClick={handleImportCSVModel}>
              Import CSV <TbFileImport />
            </Button>
          </Col>
        </div>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6">
            <FormGroup className="common-formgroup">
              <Label> Country * </Label>
              <Input
                id=""
                name="country"
                type="text"
                placeholder="|"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.country && formik.errors.country
                    ? "is-invalid"
                    : ""
                }
              ></Input>
              {formik.touched.country && (
                <p className="text-danger">{formik.errors.country}</p>
              )}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup className="common-formgroup">
              <Label> Country Iso3 Code * </Label>
              <Input
                id=""
                name="iso"
                type="text"
                placeholder="|"
                value={formik.values.iso}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.iso && formik.errors.iso ? "is-invalid" : ""
                }
              ></Input>
              {formik.touched.iso && (
                <p className="text-danger">{formik.errors.iso}</p>
              )}
            </FormGroup>
          </Col>

          <Col md="12">
            <FormGroup className="common-formgroup">
              <Button
                className="btn btn-style1 px-4 py-2"
                type="submit"
                disabled={AddCountry?.isLoading || Update?.isLoading}
              >
                {AddCountry?.isLoading || Update?.isLoading ? (
                  <ButtonLoader />
                ) : (
                  "Submit"
                )}
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      {/* <div className="common-db-head mb-4">
        <div className="align-items-center row">
          <Col xs="12" md="12" className="mb-4">
            <h4>Import History </h4>
          </Col>
          <Col xs="12">
            <div className="common-table">
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <FormGroup className="mb-0 mb-sm-0">
                        <Input id="select-all" type="checkbox" />
                      </FormGroup>
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Subscription</th>
                    <th>Domain Name</th>
                    <th></th>
                    <th></th>
                  </tr>
                  <tr>
                    <br />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <FormGroup className="mb-0 mb-sm-0">
                        <Input id="select-all" type="checkbox" />
                      </FormGroup>
                    </td>
                    <td>
                      Praveen Bommannavar
                    </td>
                    <td>praveen@gmail.com</td>
                    <td>+1 12356 24569</td>
                    <td>Canada</td>
                    <td>Gold Plan</td>
                    <td>www.matrimony.com</td>
                    <td>
                      <Button className="dark-blue-btn tb-edit">
                        <LiaEdit />
                      </Button>
                    </td>
                    <td>
                      <Button className="btn-outline-style1 tb-del">
                        <RiDeleteBin6Line />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormGroup className="mb-0 mb-sm-0">
                        <Input id="select-all" type="checkbox" />
                      </FormGroup>
                    </td>
                    <td>
                      Praveen Bommannavar
                    </td>
                    <td>praveen@gmail.com</td>
                    <td>+1 12356 24569</td>
                    <td>Canada</td>
                    <td>Gold Plan</td>
                    <td>www.matrimony.com</td>
                    <td>
                      <Button className="dark-blue-btn tb-edit">
                        <LiaEdit />
                      </Button>
                    </td>
                    <td>
                      <Button className="btn-outline-style1 tb-del">
                        <RiDeleteBin6Line />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormGroup className="mb-0 mb-sm-0">
                        <Input id="select-all" type="checkbox" />
                      </FormGroup>
                    </td>
                    <td>
                      Praveen Bommannavar
                    </td>
                    <td>praveen@gmail.com</td>
                    <td>+1 12356 24569</td>
                    <td>Canada</td>
                    <td>Gold Plan</td>
                    <td>www.matrimony.com</td>
                    <td>
                      <Button className="dark-blue-btn tb-edit">
                        <LiaEdit />
                      </Button>
                    </td>
                    <td>
                      <Button className="btn-outline-style1 tb-del">
                        <RiDeleteBin6Line />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormGroup className="mb-0 mb-sm-0">
                        <Input id="select-all" type="checkbox" />
                      </FormGroup>
                    </td>
                    <td>
                      Praveen Bommannavar
                    </td>
                    <td>praveen@gmail.com</td>
                    <td>+1 12356 24569</td>
                    <td>Canada</td>
                    <td>Gold Plan</td>
                    <td>www.matrimony.com</td>
                    <td>
                      <Button className="dark-blue-btn tb-edit">
                        <LiaEdit />
                      </Button>
                    </td>
                    <td>
                      <Button className="btn-outline-style1 tb-del">
                        <RiDeleteBin6Line />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormGroup className="mb-0 mb-sm-0">
                        <Input id="select-all" type="checkbox" />
                      </FormGroup>
                    </td>
                    <td>
                      Praveen Bommannavar
                    </td>
                    <td>praveen@gmail.com</td>
                    <td>+1 12356 24569</td>
                    <td>Canada</td>
                    <td>Gold Plan</td>
                    <td>www.matrimony.com</td>
                    <td>
                      <Button className="dark-blue-btn tb-edit">
                        <LiaEdit />
                      </Button>
                    </td>
                    <td>
                      <Button className="btn-outline-style1 tb-del">
                        <RiDeleteBin6Line />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormGroup className="mb-0 mb-sm-0">
                        <Input id="select-all" type="checkbox" />
                      </FormGroup>
                    </td>
                    <td>
                      Praveen Bommannavar
                    </td>
                    <td>praveen@gmail.com</td>
                    <td>+1 12356 24569</td>
                    <td>Canada</td>
                    <td>Gold Plan</td>
                    <td>www.matrimony.com</td>
                    <td>
                      <Button className="dark-blue-btn tb-edit">
                        <LiaEdit />
                      </Button>
                    </td>
                    <td>
                      <Button className="btn-outline-style1 tb-del">
                        <RiDeleteBin6Line />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormGroup className="mb-0 mb-sm-0">
                        <Input id="select-all" type="checkbox" />
                      </FormGroup>
                    </td>
                    <td>
                      Praveen Bommannavar
                    </td>
                    <td>praveen@gmail.com</td>
                    <td>+1 12356 24569</td>
                    <td>Canada</td>
                    <td>Gold Plan</td>
                    <td>www.matrimony.com</td>
                    <td>
                      <Button className="dark-blue-btn tb-edit">
                        <LiaEdit />
                      </Button>
                    </td>
                    <td>
                      <Button className="btn-outline-style1 tb-del">
                        <RiDeleteBin6Line />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </div>
      </div> */}

      <CSVFileUpload toggleImportCSVModel={toggleImportCSVModel} setToggleImportCSVModel={setToggleImportCSVModel} handleImportCSVModel={handleImportCSVModel}
        handleSubmit={handleSubmit} handleCloseImportCSVModel={handleCloseImportCSVModel} handleFileChange={handleFileChange} fileState={fileState} file={file} UploadBulkFile={UploadBulkFile} fileName={"country"} />

    </Wrapper>
  );
};

export default AddCountry;
