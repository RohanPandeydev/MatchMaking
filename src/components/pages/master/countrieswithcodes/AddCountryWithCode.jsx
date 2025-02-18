import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Wrapper from "../../../layouts/Wrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MasterServices from "../../../../services/MasterServices";
import Swal from "sweetalert2";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import { useNavigate, useParams } from "react-router-dom";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import getValueBetweenMasterAndAdd from "../../../../utils/UrlParserDropdown";
import { useEffect } from "react";
import { MasterCountryWithCode } from "../../../../helper/ValidationHelper/Validation";

const AddCountryWithCode = () => {
  const queryClient = useQueryClient();
  const url = getValueBetweenMasterAndAdd(window.location.href);
  const nav = useNavigate();
  const [ids, setIds] = useState("");
  const initialValues = {
    name: "",
    code: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: MasterCountryWithCode,
    onSubmit: (values, action) => {
      submitHandler(values);
    },
  });
  const { id } = useParams();
  const [myId, setMyId] = useState("");

  const submitHandler = (data) => {
    console.log(data);
    if (myId) {
      Update.mutate({
        name: data?.name,
        description: JSON.stringify({
          code: data?.code,
          name: data?.name?.replace(/\s+/g, "_"),
        }),
        category: ids,
        id: myId,
      });

      return;
    }
    AddCountryWithCode.mutate({
      name: data?.name,
      description: JSON.stringify({
        code: data?.code,
        name: data?.name?.replace(/\s+/g, "_"),
      }),
      category: ids,
    });
  };

  const AddCountryWithCode = useMutation(
    (formdata) => MasterServices.Add(formdata),
    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Added Successfully ",
          icon: "success",
        });

        formik.resetForm();
        nav("/master/countriescodes/");

        queryClient.refetchQueries("all-lang-list-countrywithcode");
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
    }
  );
  const { data: countryList, isLoading: isCountryLoaded } = useQuery(
    ["all-countries"],
    () => MasterServices.Langs(),
    {
      enabled: !!url,
      refetchOnWindowFocus: false,
      select: (data) => {
        // Extract country name and mobile code
        const countryWithCodes = data?.data?.map((country) => {
          const countryName = country.name.common;
          const callingCode = country.idd?.root
            ? `${country.idd.root}${
                country.idd.suffixes ? country.idd.suffixes[0] : ""
              }`
            : "N/A";
          return { countryName, callingCode };
        });
        return Array.from(countryWithCodes); // Sorting alphabetically
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
      nav("/master/countriescodes/");

      queryClient.refetchQueries("all-lang-list-countrywithcode");
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
    ["all-pageId-list-countrywithcode", url],
    () => MasterServices.getSideBarListingId(`name=${url}`),
    {
      enabled: !!url,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log("Languages API Data", data?.data); // Debugging log
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
    ["get-by-id-countrywithcode", myId],
    () => MasterServices.getById({ id: myId }),
    {
      enabled: !!myId,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log("Get By Id", data?.data); // Debugging log
        formik.setFieldValue("name", data?.data?.name);
        formik.setFieldValue("code", JSON.parse(data?.data?.description)?.code);
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
    if (!isCountryLoaded) {
      const findCode = countryList?.find(
        (ele) =>
          ele?.countryName?.toLowerCase() ==
          formik.values?.name?.toLocaleLowerCase()
      );
      formik.setFieldValue("code", findCode?.callingCode);
    }
  }, [formik.values.name]);

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
              <Label>Country</Label>
              <Input
                name="name"
                placeholder="|"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }
                type="select"
              >
                <option value={""}>Please Select Country</option>
                {isCountryLoaded ? (
                  <ButtonLoader />
                ) : (
                  countryList?.map((each, index) => {
                    return (
                      <option key={index} value={each?.countryName}>
                        {each?.countryName}
                      </option>
                    );
                  })
                )}
              </Input>
              {formik.touched.name && formik.errors.name && (
                <p className="text-danger">{formik.errors.name}</p>
              )}
            </FormGroup>
          </Col>
          <Col md="6" className="mb-2">
            <FormGroup className="common-formgroup">
              <Label>Phone Code</Label>
              <Input
                className={
                  formik.touched.code && formik.errors.code ? "is-invalid" : ""
                }
                id=""
                name="code"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code}
                placeholder="|"
                type="text"
                disabled
              />
            </FormGroup>
          </Col>

          <Col md="12">
            <FormGroup className="common-formgroup">
              <Button
                className="btn btn-style1 px-4 py-2"
                type="submit"
                disabled={AddCountryWithCode.isLoading || Update?.isLoading}
              >
                {AddCountryWithCode.isLoading || Update?.isLoading ? (
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

export default AddCountryWithCode;
