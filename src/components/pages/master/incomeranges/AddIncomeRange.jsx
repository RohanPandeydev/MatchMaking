import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Wrapper from "../../../layouts/Wrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MasterServices from "../../../../services/MasterServices";
import getValueBetweenMasterAndAdd from "../../../../utils/UrlParserDropdown";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import { MasterIncomeRange } from "../../../../helper/ValidationHelper/Validation";
import useFetchMasterSectionData from "../../../../helper/MasterSection";
import Select from 'react-select';

const AddIncomeRanges = () => {
  const queryClient = useQueryClient();
  const url = getValueBetweenMasterAndAdd(window.location.href);
  const nav = useNavigate();
  const { id } = useParams();
  const [myId, setMyId] = useState("");
  const [currency, setCurrency] = useState({})

  const [ids, setIds] = useState("");
  const initialValues = {
    startRange: "",
    endRange: "",
    currency: "",
  };
  const handleSelectCurrency = (e) => {
    console.log(e, "e-->")
    setCurrency(e)
    formik.setFieldValue("currency", e?.value)

  }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: MasterIncomeRange,
    onSubmit: (values, action) => {
      submitHandler(values);
    },
  });

  const submitHandler = (data) => {
    if (myId) {
      Update.mutate({
        name: data?.startRange,
        description: JSON.stringify({
          startRange: data?.startRange?.replace(/\s+/g, "_"),
          endRange: data?.endRange?.replace(/\s+/g, "_"),
          currency: currency?.country,
          symbol: currency?.symbol,
        }),
        category: ids,
        id: myId,
      });

      return;
    }
    // console.log(data);
    AddIncomeRange.mutate({
      name: data?.startRange,
      description: JSON.stringify({
        startRange: data?.startRange?.replace(/\s+/g, "_"),
        endRange: data?.endRange?.replace(/\s+/g, "_"),
        currency: currency?.country,
        symbol: currency?.symbol,
      }),
      category: ids,
    });
  };
  const AddIncomeRange = useMutation(
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
        nav("/master/incomeranges/");

        queryClient.refetchQueries("all-lang-list-income-range");
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
  const Update = useMutation((formdata) => MasterServices.Update(formdata), {
    onSuccess: (data) => {
      console.log("Data==>", data?.data);
      Swal.fire({
        title: "Successfull",
        text: "Updated Successfully ",
        icon: "success",
      });

      formik.resetForm();
      nav("/master/incomeranges/");

      queryClient.refetchQueries("all-lang-list-income-range");
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
    ["all-pageId-list-income-range", url],
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
    ["get-by-id-income", myId],
    () => MasterServices.getById({ id: myId }),
    {
      enabled: !!myId,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log("Get By Id", data?.data); // Debugging log
        formik.setFieldValue(
          "startRange",
          data?.data?.description &&
          JSON.parse(data?.data?.description).startRange
        );
        formik.setFieldValue(
          "endRange",
          data?.data?.description &&
          JSON.parse(data?.data?.description).endRange
        );
        formik.setFieldValue(
          "currency",
          data?.data?.description &&
          JSON.parse(data?.data?.description).currency
        );

        if (data?.data?.description &&
          JSON.parse(data?.data?.description)) {
          const description = JSON.parse(data.data.description);
          const symbol = description?.symbol || "";
          const currency = description?.currency || "";

          setCurrency({
            label: `${currency} (${symbol})`,
            value: currency,
            country: currency,
            symbol: symbol,
          });
        }

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


  const { data: currencyList, isLoading: isLoadCurrency } = useFetchMasterSectionData('currency', "all-currency-list-incomde range")

  return (
    <Wrapper>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6" className="mb-2">
            <FormGroup className="common-formgroup">
              <Label> Start Range</Label>
              <Input
                className={
                  formik.touched.startRange && formik.errors.startRange
                    ? "is-invalid"
                    : ""
                }
                id=""
                name="startRange"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startRange}
                placeholder="|"
                type="text"
              />
              {formik.touched.startRange && formik.errors.startRange && (
                <div className="invalid-feedback">
                  {formik.errors.startRange}
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md="6" className="mb-2">
            <FormGroup className="common-formgroup">
              <Label> End Range</Label>
              <Input
                className={
                  formik.touched.endRange && formik.errors.endRange
                    ? "is-invalid"
                    : ""
                }
                id=""
                name="endRange"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endRange}
                placeholder="|"
                type="text"
              />
              {formik.touched.endRange && formik.errors.endRange && (
                <div className="invalid-feedback">{formik.errors.endRange}</div>
              )}
            </FormGroup>
          </Col>
          <Col md="6" className="mb-2">
            <FormGroup className="common-formgroup">
              <Label> Currency</Label>

              {isLoadCurrency ? <ButtonLoader /> : <Select
                className="basic-single"
                classNamePrefix="select"
                isDisabled={isLoadCurrency}
                isLoading={isLoadCurrency}
                onChange={handleSelectCurrency}
                placeholder="Select currency"
                value={currency}
                isSearchable={true}
                defaultValue={"please selet currency"}
                name=""
                options={
                  currencyList?.map((each) => {
                    const description = each?.description ? JSON.parse(each.description) : {};
                    const symbol = description?.symbol || "";

                    return {
                      label: `${each?.name} (${symbol})`,
                      value: each?.name,
                      country: each?.name,
                      symbol: symbol,
                    };
                  })
                }
              />}

              {formik.errors.currency && (
                <div className="invalid-feedback">{formik.errors.currency}</div>
              )}
            </FormGroup>
          </Col>

          <Col md="12">
            <FormGroup className="common-formgroup">
              <Button
                className="btn btn-style1 px-4 py-2"
                type="submit"
                disabled={AddIncomeRange?.isLoading || Update?.isLoading}
              >
                {AddIncomeRange?.isLoading || Update?.isLoading ? (
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

export default AddIncomeRanges;
