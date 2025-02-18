import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../../../layouts/Wrapper";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useFormik } from "formik";
import {
  StaffAdd,
  StaffUpdate,
} from "../../../../helper/ValidationHelper/Validation";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StaffServices from "../../../../services/StaffServices";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import staffimg from "../../../../assets/images/no-images-available.jpg";
import config from "../../../../../config";

const AddStaff = () => {
  const nav = useNavigate();
  const { id: detailsId } = useParams();
  const queryClient = useQueryClient();
  const [id, setId] = useState("");
  const allowedExtensionsImage = [".jpg", ".jpeg", ".png"];
  const [img, setImg] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const fileRef = useRef(null);
  const initialValues = {
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    department: "",
    phoneNumber: "",
    phone_code: "+91",
  };
  const [err, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: detailsId ? StaffUpdate : StaffAdd,
    onSubmit: (values, action) => {
      // console.log(values)
      handleSubmit(values);
    },
  });
  const { data: countryCode, isLoading: isCountryLoad } = useQuery(
    ["country-list"],
    () => StaffServices.countryWithCode(),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        // StorageData.setData(data?.data?.data?.users);
        return data;
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

  const { data: departmentList, isLoading: isDepartmentLoad } = useQuery(
    ["department-list-nopagination"],
    () => StaffServices.departmentsListWithoutPagination(),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        // console.log("Data Franchise ", data?.data);
        // StorageData.setData(data?.data?.data?.users);
        return data;
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

  const AddStaff = useMutation((data) => StaffServices.addStaff(data), {
    onSuccess: (data) => {
      // console.log("Data after submission organization", data?.data);
      // alert("Created Successfully")
      Swal.fire({
        title: "Successfull",
        text: "Created Successfully ",
        icon: "success",
      });
      handleBack();
    },
    onError: (err) => {
      console.log("Error response data:", err.response?.data);

      // Check for specific error messages or provide a generic message
      const msg =
        err.response?.data?.email[0] ||
        "An unexpected error occurred. Please try again.";

      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
      });

      return;
    },
  });
  const UpdateStaff = useMutation((data) => StaffServices.staffUpdateDetails(data), {
    onSuccess: (data) => {
      // console.log("Data after submission organization", data?.data);
      // alert("Created Successfully")
      Swal.fire({
        title: "Successfull",
        text: "Updated  Successfully ",
        icon: "success",
      });
      handleBack();
    },
    onError: (err) => {
      console.log("Error response data:", err.response?.data);

      // Check for specific error messages or provide a generic message
      const msg =
        err.response?.data?.email[0] ||
        "An unexpected error occurred. Please try again.";

      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
      });

      return;
    },
  });
  const handleSubmit = (data) => {

    const formData = new FormData();
    formData?.append("first_name", data?.first_name);
    formData?.append("last_name", data?.last_name);
    formData?.append("password", data?.password);
    formData?.append("email", data?.email);
    formData?.append("department", data?.department);
    formData?.append("phone", data?.phoneNumber);
    formData?.append("phone_code", data?.phone_code);
    formData?.append("is_staff", true);

    if (img) {
      formData.append("image_url", img);
    }
    if (detailsId) {
      formData?.append("id", id);
      formData.delete("password");
      formData?.append("is_staff", true);


      for (let [key, value] of formData) {
        console.log(key, value);
      }
      UpdateStaff?.mutate(formData);

      return;
    }

    AddStaff?.mutate(formData);
  };

  const handleBack = () => {
    queryClient.refetchQueries(["staff-list", 1]);
    nav("/staff");
  };
  const handleImage = (e) => {
    if (e?.target?.files?.length == 0) return;
    const isFileValid = validateFileImage(e?.target?.files[0]);
    // console.log("validateFileImage", isFileValid);
    if (!isFileValid?.isValid) {
      setError(isFileValid?.errorMessage);
      return;
    }
    setImg(e?.target?.files[0]);
    setShowImg(URL.createObjectURL(e?.target?.files[0]));
  };
  const validateFileImage = (file) => {
    const MAX_FILE_SIZE_MB = 2;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    let isValid = true;
    let errorMessage = "";

    const fileNameParts = file.name.split(".");
    const extension = `.${fileNameParts[
      fileNameParts.length - 1
    ].toLowerCase()}`;

    if (!allowedExtensionsImage.includes(extension)) {
      isValid = false;
      errorMessage = `Invalid file extension: ${extension}. Allowed extensions are: ${allowedExtensionsImage.join(
        ", "
      )}`;
    } else if (file.size > MAX_FILE_SIZE_BYTES) {
      isValid = false;
      errorMessage = `File size exceeds ${MAX_FILE_SIZE_MB} MB`;
    }

    return { isValid, errorMessage };
  };
  useEffect(() => {
    try {
      const decodeId = detailsId && atob(detailsId);

      detailsId && setId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [detailsId]);
  const { data: staffDetails, isLoading: isStaffLoad } = useQuery(
    ["staff-details", id],
    () => StaffServices.staffDetails({ id: id }),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const response = data?.data;
        console.log(response?.phone, "response");
        formik.setFieldValue("first_name", response?.user?.first_name);
        formik.setFieldValue("last_name", response?.user?.last_name);
        formik.setFieldValue("email", response?.user?.email);
        formik.setFieldValue("department", response?.department?.id);
        formik.setFieldValue("phoneNumber", response?.phone);
        formik.setFieldValue("phone_code", response?.phone_code);
        // if (response?.image_url) {
        //   setImg(response?.image_url);
        // }
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

  return (
    <Wrapper>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6" className="mb-2">
            <FormGroup className="common-formgroup">
              <Label> First Name *</Label>
              <Input
                className={
                  formik.touched.first_name && formik.errors.first_name
                    ? "is-invalid"
                    : ""
                }
                id=""
                name="first_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
                placeholder="|"
                type="text"
              />
              {formik.touched.first_name && formik.errors.first_name && (
                <div className="invalid-feedback">
                  {formik.errors.first_name}
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md="6" className="mb-2">
            <FormGroup className="common-formgroup">
              <Label> Last Name *</Label>
              <Input
                className={
                  formik.touched.last_name && formik.errors.last_name
                    ? "is-invalid"
                    : ""
                }
                id=""
                name="last_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
                placeholder="|"
                type="text"
              />
              {formik.touched.last_name && formik.errors.last_name && (
                <div className="invalid-feedback">
                  {formik.errors.last_name}
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md="6" className="mb-2">
            <FormGroup className="common-formgroup">
              <Label> Email *</Label>
              <Input
                className={
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }
                id=""
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="|"
                type="text"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </FormGroup>
          </Col>

          <Col md="6" className="mb-2">
            <FormGroup className="common-formgroup">
              <Label> Phone Number * </Label>
              <div className="input-group">
                <span className="input-group-text p-0" style={{ maxWidth: "150px", }}>
                  <Input
                    id=""
                    name="phone_code"
                    type="select"
                    value={formik.values.phone_code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isDepartmentLoad}
                    className={
                      formik.touched.phone_code && formik.errors.phone_code
                        ? "is-invalid"
                        : "border-0"
                    }
                  >
                    {isCountryLoad ? (
                      <ButtonLoader />
                    ) : (
                      countryCode?.data?.data?.length > 0 &&
                      countryCode?.data?.data?.map((each) => {
                        return (
                          <option value={each?.dial_code}>
                            {each?.dial_code}({each?.name || ""})
                          </option>
                        );
                      })
                    )}
                  </Input>
                </span>
                <Input
                  className={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                  placeholder="|"
                  type="text"
                />
              </div>
              {formik.touched.phone_code && (
                <p className="text-danger">{formik.errors.phone_code}</p>
              )}
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="invalid-feedback">
                  {formik.errors.phoneNumber}
                </div>
              )}
            </FormGroup>
          </Col>
          {/* <FormGroup className="common-formgroup">
              <Label> Phone Number *</Label>
              <Input
                className={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "is-invalid"
                    : ""
                }
                id=""
                name="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                placeholder="|"
                type="text"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="invalid-feedback">
                  {formik.errors.phoneNumber}
                </div>
              )}
            </FormGroup> */}

          {!detailsId && (
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label> Password *</Label>
                <Input
                  className={
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="|"
                  type="password"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                )}
              </FormGroup>
            </Col>
          )}
          <Col md="6">
            <FormGroup className="common-formgroup">
              <Label> Department * </Label>
              <Input
                id=""
                name="department"
                type="select"
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isDepartmentLoad}
                className={
                  formik.touched.department && formik.errors.department
                    ? "is-invalid"
                    : ""
                }
              >
                <option value={""}>Select Department</option>
                {isDepartmentLoad ? (
                  <ButtonLoader />
                ) : (
                  departmentList?.data?.length > 0 &&
                  departmentList?.data?.map((each) => {
                    return <option value={each?.id}>{each?.name || ""}</option>;
                  })
                )}
              </Input>
              {formik.touched.department && (
                <p className="text-danger">{formik.errors.department}</p>
              )}
            </FormGroup>
          </Col>
          <Col md="6" className="mb-2">
            <FormGroup className="common-formgroup staff-add-logo-wrap">
              <Label>Profile Image *</Label>
              <Input
                accept={allowedExtensionsImage}
                className={err && err ? "is-invalid" : ""}
                id=""
                name="file"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.address}
                placeholder="|"
                type="file"
                onChange={handleImage}
                ref={fileRef}
              />
              <img
                src={
                  showImg ||
                  (staffDetails?.data?.image_url &&
                    config.apiUrl + staffDetails?.data?.image_url) ||
                  staffimg
                }
                className="img-fluid staff-logo"
                height={100}
                width={100}
              />
              {err && <div className="invalid-feedback">{err}</div>}
            </FormGroup>
          </Col>
          <Col md="12" className="mb-2">
            <FormGroup className="common-formgroup">
              <Button
                className="btn btn-style1 px-4 py-2"
                type="submit"
                disabled={AddStaff?.isLoading || UpdateStaff?.isLoading}
              >
                {AddStaff?.isLoading ? <ButtonLoader /> : "Save"}
              </Button>

              <Button
                disabled={AddStaff?.isLoading || UpdateStaff?.isLoading}
                className="btn px-4 py-2 mx-2"
                onClick={handleBack}
              >
                Back
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default AddStaff;
