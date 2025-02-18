import { useFormik } from "formik";
import React from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Wrapper from "../../../layouts/Wrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MasterServices from "../../../../services/MasterServices";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import Swal from "sweetalert2";
import { MasterLang } from "../../../../helper/ValidationHelper/Validation";
import { useNavigate, useParams } from "react-router-dom";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import { useState } from "react";
import getValueBetweenMasterAndAdd from "../../../../utils/UrlParserDropdown";
import { useEffect } from "react";

const AddLanguage = () => {
  const queryClient = useQueryClient();
  const url = getValueBetweenMasterAndAdd(window.location.href);
  const nav = useNavigate();
  const { id } = useParams();
  const [ids, setIds] = useState("");
  const initialValues = {
    lang: "",
    code: "",
  };
  const [myId, setMyId] = useState("");
  const formik = useFormik({
    initialValues,
    validationSchema: MasterLang,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  const submitHandler = (data) => {
    if (myId) {
      Update.mutate({
        name: data?.lang,
        description: JSON.stringify(data?.lang?.replace(/\s+/g, "_")),
        category: ids,
        id: myId,
      });

      return;
    }
    AddLang.mutate({
      name: data?.lang,
      description: JSON.stringify(data?.lang?.replace(/\s+/g, "_")),
      category: ids,
    });
  };

  const AddLang = useMutation((formdata) => MasterServices.Add(formdata), {
    onSuccess: (data) => {
      console.log("Data==>", data?.data);
      Swal.fire({
        title: "Successfull",
        text: "Added Successfully ",
        icon: "success",
      });

      formik.resetForm();
      nav("/master/languages/");

      queryClient.refetchQueries("all-lang-lists");
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
      nav("/master/languages/");

      queryClient.refetchQueries("all-lang-lists");
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
    ["all-pageId-list", url],
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
    ["get-by-id-lang", myId],
    () => MasterServices.getById({ id: myId }),
    {
      enabled: !!myId,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log("Get By Id", data?.data); // Debugging log
        formik.setFieldValue("lang", data?.data?.name);
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
  return (
    <Wrapper>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6">
            <FormGroup className="common-formgroup">
              <Label>Language</Label>
              <Input
                name="lang"
                placeholder="|"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lang}
                className={
                  formik.touched.lang && formik.errors.lang ? "is-invalid" : ""
                }
                type="text"
              >
                {/* <option value={""}>Please Select Lang</option>
                {!isLoading &&
                  data?.map((each, index) => {
                    return (
                      <option key={index} value={each}>
                        {each}
                      </option>
                    );
                  })} */}
              </Input>
              {formik.touched.lang && formik.errors.lang && (
                <p className="text-danger">{formik.errors.lang}</p>
              )}
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup className="common-formgroup">
              <Button
                className="btn btn-style1 px-4 py-2"
                type="submit"
                disabled={AddLang?.isLoading || Update?.isLoading}
              >
                {AddLang?.isLoading || Update?.isLoading ? (
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

export default AddLanguage;
