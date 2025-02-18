import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Wrapper from "../../../layouts/Wrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MasterServices from "../../../../services/MasterServices";
import Swal from "sweetalert2";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import getValueBetweenMasterAndAdd from "../../../../utils/UrlParserDropdown";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import { useNavigate, useParams } from "react-router-dom";
import createdBy from "../../../../utils/JSON/CreateBy";
import { MasterCreateBy } from "../../../../helper/ValidationHelper/Validation";
import { update } from "lodash";

const AddCreateBy = () => {
  const queryClient = useQueryClient();
  const url = getValueBetweenMasterAndAdd(window.location.href);
  const [ids, setIds] = useState("");
  const nav = useNavigate();
  const { id } = useParams();

  const [myId, setMyId] = useState("");
  const initialValues = {
    name: "",
    value: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: MasterCreateBy,
    onSubmit: (values, action) => {
      submitHandler(values);
    },
  });

  const submitHandler = (data) => {
    if (myId) {
      Update.mutate({
        name: data?.name,
        category: ids,
        description: JSON.stringify(data?.name?.replace(/\s+/g, "_")),
        id: myId,
      });
      return;
    }
    AddCreateBy?.mutate({
      name: data?.name,
      category: ids,
      description: JSON.stringify(data?.name?.replace(/\s+/g, "_")),
    });
  };
  const AddCreateBy = useMutation((formdata) => MasterServices.Add(formdata), {
    onSuccess: (data) => {
      console.log("Data==>", data?.data);
      Swal.fire({
        title: "Successfull",
        text: "Added Successfully ",
        icon: "success",
      });

      formik.resetForm();
      nav("/master/createdBy");

      queryClient.refetchQueries("all-createby-list");
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
    ["all-pageId-list-create", url],
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

  const { data, isLoading } = useQuery(
    ["get-by-id-create", myId],
    () => MasterServices.getById({ id: myId }),
    {
      enabled: !!myId,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log("Get By Id", data?.data); // Debugging log
        formik.setFieldValue("name", data?.data?.name);
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
  const Update = useMutation((formdata) => MasterServices.Update(formdata), {
    onSuccess: (data) => {
      console.log("Data==>", data?.data);
      Swal.fire({
        title: "Successfull",
        text: "Updated Successfully ",
        icon: "success",
      });

      formik.resetForm();
      nav("/master/createdBy");

      queryClient.refetchQueries("all-createby-list");
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
  return (
    <Wrapper>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6">
            <FormGroup className="common-formgroup">
              <Label>Create By</Label>
              <Input
                name="name"
                placeholder="|"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }
                type="text"
              >
                {/* <option value={""}>Please Select Create By</option> */}
                {/* {createdBy?.map((each, index) => {
                    return (
                      <option key={index} value={each?.value}>
                        {each?.name}
                      </option>
                    );
                  })} */}
              </Input>
              {formik.touched.name && formik.errors.name && (
                <p className="text-danger">{formik.errors.name}</p>
              )}
            </FormGroup>
          </Col>
          {/* <Col md="6" className="mb-2">
          <FormGroup className="common-formgroup">
            <Label> Value</Label>
            <Input
              className={
                formik.touched.value && formik.errors.value
                  ? "is-invalid"
                  : ""
              }
              id=""
              name="value"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.value}
              placeholder="Value"
              type="text"
            />
            {formik.touched.value && formik.errors.value && (
              <div className="invalid-feedback">{formik.errors.value}</div>
            )}
          </FormGroup>
        </Col> */}

          <Col md="12">
            <FormGroup className="common-formgroup">
              <Button
                className="btn btn-style1 px-4 py-2"
                type="submit"
                disabled={AddCreateBy?.isLoading || Update?.isLoading}
              >
                {AddCreateBy?.isLoading || Update?.isLoading ? (
                  <ButtonLoader />
                ) : (
                  "Submit"
                )}
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default AddCreateBy;
