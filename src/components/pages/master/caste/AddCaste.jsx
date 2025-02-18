import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Wrapper from "../../../layouts/Wrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getValueBetweenMasterAndAdd from "../../../../utils/UrlParserDropdown";
import { useNavigate, useParams } from "react-router-dom";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import Swal from "sweetalert2";
import MasterServices from "../../../../services/MasterServices";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import castes from "../../../../utils/JSON/Caste";
import { MasterCaste } from "../../../../helper/ValidationHelper/Validation";
import useFetchMasterSectionData from "../../../../helper/MasterSection";

const AddCaste = () => {
  const queryClient = useQueryClient();
  const url = getValueBetweenMasterAndAdd(window.location.href);
  const nav = useNavigate();
  const [ids, setIds] = useState("");
  const initialValues = {
    name: "",
    religion: ""
  };
  const { id } = useParams();

  const [myId, setMyId] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: MasterCaste,
    onSubmit: (values, action) => {
      submitHandler(values);
    },
  });

  const submitHandler = (data) => {
    if (myId) {
      Update.mutate({
        name: data?.name,
        description: JSON.stringify({ religion: data?.religion?.replace(/\s+/g, "_"), name: data?.name?.replace(/\s+/g, "_") }),
        category: ids,
        id: myId,
      });

      return;
    }
    AddCaste.mutate({
      name: data?.name,
      description: JSON.stringify({ religion: data?.religion?.replace(/\s+/g, "_"), name: data?.name?.replace(/\s+/g, "_") }),
      category: ids,
    });
  };

  const AddCaste = useMutation((formdata) => MasterServices.Add(formdata), {
    onSuccess: (data) => {
      console.log("Data==>", data?.data);
      Swal.fire({
        title: "Successfull",
        text: "Added Successfully ",
        icon: "success",
      });

      formik.resetForm();
      nav("/master/castes");

      queryClient.refetchQueries("all-list-caste");
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
  const Update = useMutation((formdata) => MasterServices.Update(formdata), {
    onSuccess: (data) => {
      console.log("Data==>", data?.data);
      Swal.fire({
        title: "Successfull",
        text: "Updated Successfully ",
        icon: "success",
      });

      formik.resetForm();
      nav("/master/castes");

      queryClient.refetchQueries("all-list-caste");
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
    ["all-pageId-list-caste", url],
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
    ["get-by-id-caste", myId],
    () => MasterServices.getById({ id: myId }),
    {
      enabled: !!myId,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log("Get By Id", data?.data); // Debugging log
        formik.setFieldValue("name", data?.data?.name);
        const description = JSON.parse(data?.data?.description)?.religion || ""
        formik.setFieldValue("name", data?.data?.name);
        formik.setFieldValue("religion", description);
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

  const { data: religionListing, isLoading: isReligionLoad } = useFetchMasterSectionData('religions', "all-lang-list-religion-caste", "")

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
              <Label>Religion</Label>
              <Input
                id=""
                type="select"
                name="religion"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.religion}
                disabled={isReligionLoad}
                className={
                  formik.touched.religion && formik.errors.religion
                    ? "is-invalid"
                    : ""
                }
              >
                <option value={""}>Select Religion</option>
                {isReligionLoad ? (
                  <ButtonLoader />
                ) : (
                  religionListing?.length > 0 &&
                  religionListing.map((religion) => (
                    <option
                      key={religion?.name}
                      value={
                        religion?.description
                          ? JSON.parse(religion?.description)
                          : religion?.name
                      }
                    >
                      {religion?.name || ""}
                    </option>
                  ))
                )}
              </Input>
              {formik.touched.religion && formik.errors.religion && (
                <p className="text-danger">{formik.errors.religion}</p>
              )}
              <Label>Caste</Label>
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
                {/* <option value={""}>Please Select Caste</option>
                {castes?.map((each, index) => {
                  return (
                    <option key={index} value={each?.name}>
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

          <Col md="12">
            <FormGroup className="common-formgroup">
              <Button
                className="btn btn-style1 px-4 py-2"
                type="submit"
                disabled={AddCaste?.isLoading || Update?.isLoading}
              >
                {AddCaste?.isLoading || Update?.isLoading ? (
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

export default AddCaste;
