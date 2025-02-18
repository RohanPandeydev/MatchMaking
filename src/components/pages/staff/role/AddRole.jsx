import React, { useEffect, useRef, useState } from "react";

import Wrapper from '../../../layouts/Wrapper';
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { StaffRole } from '../../../../helper/ValidationHelper/Validation';
import { useMutation } from "@tanstack/react-query";
import StaffServices from "../../../../services/StaffServices";
import Swal from "sweetalert2";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
const AddRole = () => {
  const nav = useNavigate();
  const { id: detailsId } = useParams();
  const [id, setId] = useState("");

  const initialValues = {
    role: "",

  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: StaffRole,
    onSubmit: (values, action) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (data) => {
    console.log(data, "===")
    AddRoleForm.mutate({ name: data.role })

  }


  const handleBack = () => {
    formik.resetForm()
    nav("/role");
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
  const AddRoleForm = useMutation((data) => StaffServices.role(data), {
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

  return (
    <Wrapper>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6" className="mb-2">
            <FormGroup className="common-formgroup">
              <Label> Role *</Label>
              <Input
                className={
                  formik.touched.role && formik.errors.role
                    ? "is-invalid"
                    : ""
                }
                id=""
                name="role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                placeholder="|"
                type="text"
              />
              {formik.touched.role && formik.errors.role && (
                <div className="invalid-feedback">
                  {formik.errors.role}
                </div>
              )}
            </FormGroup>
          </Col>

          <Col md="12" className="mb-2">
            <FormGroup className="common-formgroup">
              <Button
                className="btn btn-style1 px-4 py-2"
                type="submit"

              >
                {AddRoleForm?.isLoading ? <ButtonLoader /> : "Save"}
              </Button>

              <Button

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
  )
}

export default AddRole