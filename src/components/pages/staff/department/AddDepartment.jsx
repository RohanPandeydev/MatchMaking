import React, { useMemo, useState } from "react";
import Wrapper from "../../../layouts/Wrapper";
import Permissions from "../staffpermission/Permission";
import { useEffect } from "react";
import { useFormik } from "formik";
import { DepartmentAdd } from "../../../../helper/ValidationHelper/Validation";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StaffServices from "../../../../services/StaffServices";
import Swal from "sweetalert2";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";

const AddDepartment = () => {
  const { id: detailsId } = useParams();
  const queryClient = useQueryClient();
  const [id, setId] = useState("");
  const nav = useNavigate();
  const initialValues = {
    name: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: DepartmentAdd,
    onSubmit: (values, action) => {
      handleSubmit(values);
    },
  });

  const { data: departmentDetails, isLoading: isDepartmentLoad } = useQuery(
    ["department-details", id],
    () => StaffServices.departmentsDetails({ id: id }),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const response = data?.data;
        console.log(response);
        formik.setFieldValue("name", response?.name);
        // Map permissions data to the checkboxesData structure
        // Assuming response.permissions contains the permission data
  

        // console.log(checkboxesData, "checkboxesData");

        // Set the checkboxesData data
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
  useEffect(() => {
    try {
      const decodeId = detailsId && atob(detailsId);

      detailsId && setId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [detailsId]);

  const handleSubmit = (data) => {
  
    const sendData = {
      name: data?.name,
     
    };
    if (detailsId) {
      sendData.id = id;
      UpdatedDepartment?.mutate(sendData);
      return;
    }
    AddDepartment.mutate(sendData);
  };

  
  const handleBack = () => {
    queryClient.refetchQueries(["department-list", 1]);
    nav("/department");
  };
  
 

  const AddDepartment = useMutation(
    (data) => StaffServices.addDepartment(data),
    {
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
          err.response?.data?.name ||
          "An unexpected error occurred. Please try again.";

        Swal.fire({
          title: "Error",
          text: msg,
          icon: "error",
        });

        return;
      },
    }
  );
  const UpdatedDepartment = useMutation(
    (data) => StaffServices.departmentUpdate(data),
    {
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
        const msg =
          err.response?.data?.name ||
          "An unexpected error occurred. Please try again.";

        Swal.fire({
          title: "Error",
          text: msg,
          icon: "error",
        });

        return;
      },
    }
  );
  return (
    <Wrapper>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6" className="mb-2">
            <FormGroup className="common-formgroup">
              <Label> Department Name *</Label>
              <Input
                className={
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }
                id=""
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="|"
                type="text"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </FormGroup>
          </Col>
         
          <Col md="12" className="mb-2">
            <FormGroup className="common-formgroup">
              <Button
                className="btn btn-style1 px-4 py-2"
                type="submit"
                disabled={
                  AddDepartment?.isLoading || UpdatedDepartment?.isLoading
                }
              >
                {AddDepartment?.isLoading || UpdatedDepartment?.isLoading ? (
                  <ButtonLoader />
                ) : (
                  "Save"
                )}
              </Button>

              <Button
                disabled={
                  AddDepartment?.isLoading || UpdatedDepartment?.isLoading
                }
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

export default AddDepartment;
