import React, { useEffect } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Wrapper from "../../layouts/Wrapper";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SubscriptionServices from "../../../services/SubscriptionServices";
import {
  franchiseForm,
  organizationForm,
} from "../../../helper/ValidationHelper/Validation";
import ButtonLoader from "../../../utils/Loader/ButtonLoader";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import config from "../../../../config";
import paymentplaceholder from "../../../assets/images/paymentplaceholder.png";
import ValidateAuthenticationKey from "../../../utils/ValidationAuthenticationKey";
import useFetchMasterData from "../../../helper/FetchMasterContent";
import MasterServices from "../../../services/MasterServices";

const FranchiseAdd = ({ setShowForm }) => {
  const queryClient = useQueryClient();
  const [selectPaymentList, setSelectPaymentList] = useState([]);
  const [selectPaymentListErr, setSelectPaymentListErr] = useState("");
  const [myId, setMyId] = useState("");
  const { id } = useParams();
  const nav = useNavigate();
  const [country, setCountry] = useState("")
  const [countryErr, setCountryErr] = useState("")
  const initialValues = {
    name: "",
    cost: "",
    no_of_data: "",
    no_of_subscription: "",
    // payment_gateway: "paytm",
    domain_setup: false,
    subscriber_type: "franchise",
    currency: "",
    discount: "0",
    country: "",
    discounttype: "flat"

  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: franchiseForm,
    onSubmit: (values, action) => {
      if (selectPaymentList?.length == 0) {
        setSelectPaymentListErr("Required");
        return;
      }
      submitHandler(values);
    },
  });
  const handlePaymentList = (data) => {
    setSelectPaymentListErr("")

    setSelectPaymentList(data);
  };


  const handleCountry = (e) => {
    setCountryErr("")
    setCountry(e)

    formik.setFieldValue("country", e?.value)
  }

  const submitHandler = (values) => {
    console.log("Organization", selectPaymentList);
    const arrofIds = selectPaymentList?.map((elem) => elem.value);
    values.payment_gateway = JSON.stringify(arrofIds);
    values.dis_type=values?.discounttype
    if (!country?.value) {
      setCountryErr("Required")
      return
    }
    if (!!myId) {
      values.id = myId;
      franchiseUpdate.mutate(values);

      return;
    }
    franchiseCreate.mutate(values);
  };
  const franchiseCreate = useMutation(
    (data) => SubscriptionServices.SubscriptionFranchiseCreate(data),
    {
      onSuccess: (data) => {
        // console.log("Data after submission organization", data?.data);
        formik.resetForm();
        Swal.fire({
          title: "Successfull",
          text: "Created Successfully ",
          icon: "success",
        });
        setSelectPaymentList([]);
        setCountry("")
        setCountryErr("")
        setSelectPaymentListErr("");
        formik.resetForm();
        //  setShowForm(false);
        // queryClient.invalidateQueries("subscription-organization");
        queryClient.refetchQueries("subscription-franchise");
        nav("/subscription/franchise");
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );
  const franchiseUpdate = useMutation(
    (data) => SubscriptionServices.SubscriptionFranchiseUpdate(data),
    {
      onSuccess: (data) => {
        // console.log("Data after submission organization", data?.data);
        formik.resetForm();
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully ",
          icon: "success",
        });
        setCountry("")
        setCountryErr("")
        setSelectPaymentList([]);
        setSelectPaymentListErr("");
        formik.resetForm();
        //  setShowForm(false);
        // queryClient.invalidateQueries("subscription-organization");
        queryClient.refetchQueries("subscription-franchise");
        nav("/subscription/franchise");
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
      },
    }
  );

  const handleBack = () => {
    formik.resetForm();
    setSelectPaymentList([]);
    setShowForm(false);
  };

  const {
    data: paymentGatewayList,
    isLoading: isLoadedPaymentGateway,
    isError,
    error,
    refetch,
  } = useQuery(
    ["payment-gateways"],
    () => SubscriptionServices.getPaymentGatewayList(),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        console.log("Data Franchise ", data?.data);
        // StorageData.setData(data?.data?.data?.users);
        return data?.data;
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
  const { data: organizationList, isLoading: isLoadedOrganizationList } =
    useQuery(
      ["subscription-franchise-details", myId],
      () =>
        SubscriptionServices.getSubscriptionOrganizationByDetails({ id: myId }),
      {
        enabled: !!myId,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {

          formik.setFieldValue("name", data?.data?.name);
          formik.setFieldValue("cost", data?.data?.cost);
          formik.setFieldValue("no_of_data", data?.data?.no_of_data);
          formik.setFieldValue("discounttype", data?.data?.dis_type);
          formik.setFieldValue("discount", data?.data?.discount);
          formik.setFieldValue(
            "no_of_subscription",
            data?.data?.no_of_subscription
          );
          formik.setFieldValue("domain_setup", data?.data?.domain_setup);

          if (data?.data?.payment_gateway?.length > 0) {
            const prefillPaymentGateway = data?.data?.payment_gateway?.map(
              (elem) => ({
                value: elem?.id,
                label: (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={
                        elem?.logo_img
                          ? `${config.apiUrl}${elem?.logo_img}`
                          : paymentplaceholder
                      }
                      alt={elem?.name}
                      style={{
                        width: "20px",
                        marginRight: "10px",
                      }}
                    />
                    {elem?.name}
                  </div>
                ),
              })
            );

            setSelectPaymentList(() => prefillPaymentGateway);
          }

          if (data?.data?.currency) {

            formik.setFieldValue("currency", data?.data?.currency?.id);

          }
          if (data?.data?.country) {

            setCountry({ value: data?.data?.country?.id, label: data?.data?.country?.name })
            formik.setFieldValue("country", data?.data?.country?.id || "");

            return
          }

          // StorageData.setData(data?.data?.data?.users);
          // return data?.data;
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
      // console.log("decodeId", !!editId, editId);
      const decodeId = id && atob(id);

      id && setMyId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [id]);



  const { data, isLoading } = useQuery(
    ["all-country-list-franchise"],
    () => {
      return MasterServices.getCountryList()
    },
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



  const { data: currencyList, isLoading: isCurrencyLoad } = useFetchMasterData(config.masterList[19], "all-currency-list-franchise")


  const discountTypeList = [{
    value: "flat", name: "Flat"
  }, {
    value: "percentage", name: "Percentage"
  }]


  useEffect(()=>{
    if(!!id){
      return
    }
    formik.setFieldValue("dicounttype","flat")
  },[])
  return (
    <Wrapper>
      <div className="subscription-form-wrap">
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>Plan Name</Label>
                <Input
                  className={
                    formik.touched.name && formik.errors.name
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  placeholder="Plan Name"
                  type="text"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                )}
              </FormGroup>
            </Col>
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>No. Of Data</Label>
                <Input
                  className={
                    formik.touched.no_of_data && formik.errors.no_of_data
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="no_of_data"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.no_of_data}
                  placeholder="No. Of Data"
                  type="number"
                  min={0}
                />
                {formik.touched.no_of_data && formik.errors.no_of_data && (
                  <div className="invalid-feedback">
                    {formik.errors.no_of_data}
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>Cost</Label>
                <Input
                  className={
                    formik.touched.cost && formik.errors.cost
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="cost"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cost}
                  placeholder="Cost"
                  type="text"
                  min={0}
                />
                {formik.touched.cost && formik.errors.cost && (
                  <div className="invalid-feedback">{formik.errors.cost}</div>
                )}
              </FormGroup>
            </Col>
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>Currency</Label>
                <Input
                  className={
                    formik.touched.currency && formik.errors.currency
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="currency"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.currency}
                  type="select"
                >
                  <option value={""}>select currency</option>
                  {
                    !isCurrencyLoad && currencyList?.map((each) => {

                      return <option value={each?.id}> {each?.name}{each.description && `(${JSON.parse(each.description)?.symbol && JSON.parse(each.description)?.symbol})` || "N/A"}</option>
                    })
                  }
                </Input>
                {formik.touched.currency && formik.errors.currency && (
                  <div className="invalid-feedback">
                    {formik.errors.currency}
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>No. Of Subscription</Label>
                <Input
                  className={
                    formik.touched.no_of_subscription &&
                    formik.errors.no_of_subscription
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="no_of_subscription"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.no_of_subscription}
                  placeholder="No. Of Subscription"
                  type="number"
                  min={0}
                />
                {formik.touched.no_of_subscription &&
                  formik.errors.no_of_subscription && (
                    <div className="invalid-feedback">
                      {formik.errors.no_of_subscription}
                    </div>
                  )}
              </FormGroup>
            </Col>
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>Payment Method</Label>
                {/* <Input
                  className={
                    formik.touched.payment_gateway &&
                    formik.errors.payment_gateway
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="payment_gateway"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.payment_gateway}
                  type="select"
                >
                  <option value={"paytm"}>Paytm</option>
                  <option value={"gpay"}>GPay</option>
                </Input>
                {formik.touched.payment_gateway &&
                  formik.errors.payment_gateway && (
                    <div className="invalid-feedback">
                      {formik.errors.payment_gateway}
                    </div>
                  )} */}
                {!isLoadedPaymentGateway && paymentGatewayList?.length > 0 && (
                  <Select
                    value={selectPaymentList}
                    onChange={handlePaymentList}
                    options={paymentGatewayList?.map((elem) => ({
                      value: elem?.id,
                      label: (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={
                              elem?.logo_img
                                ? `${elem?.logo_img}`
                                : paymentplaceholder
                            }
                            alt={elem?.name}
                            style={{
                              width: "20px",
                              marginRight: "10px",
                            }}
                          />
                          {elem?.name}
                        </div>
                      ),
                    }))}
                    placeholder="Select Payment Method"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={{
                      control: (provided) => ({ ...provided, width: "100%" }),
                    }}
                    isMulti
                  />
                )}
              </FormGroup>
              {selectPaymentListErr && (
                <p className="text-danger">{selectPaymentListErr}</p>
              )}
            </Col>
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>Country</Label>

                {!isLoading && data?.length > 0 && (
                  <Select
                    value={country}
                    onChange={handleCountry}
                    options={[{ value: "", label: "Please select country" }, ...data?.map((elem) => ({
                      value: elem?.id,
                      label: (
                        <div style={{ display: "flex", alignItems: "center" }}>

                          {elem?.name}
                        </div>
                      ),
                    }))]}
                    placeholder="Select Country"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={{
                      control: (provided) => ({ ...provided, width: "100%" }),
                    }}

                  />
                )}
              </FormGroup>
              {countryErr && (
                <p className="text-danger">{countryErr}</p>
              )}
            </Col>
            {country?.value && <><Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>Discount</Label>
                <Input
                  className={
                    formik.touched.discount && formik.errors.discount
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="discount"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.discount}
                  placeholder="Discount"
                  type="number"
                  min={0}
                />
                {formik.touched.discount && formik.errors.discount && (
                  <div className="invalid-feedback">
                    {formik.errors.discount}
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>Discount Type</Label>
                <Input
                  className={
                    formik.touched.discounttype && formik.errors.discounttype
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="discounttype"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.discounttype}
                  type="select"
                >
                  {
                    discountTypeList?.map((each) => {

                      return <option value={each?.value}> {each?.name}</option>
                    })
                  }
                </Input>
              </FormGroup>
            </Col>
            </>}

            <Col md="12" className="mb-2">
              <FormGroup className="common-formgroup">
                <Button
                  className="btn btn-style1 px-4 py-2"
                  type="submit"
                  disabled={
                    franchiseCreate?.isLoading || franchiseUpdate?.isLoading
                  }
                >
                  {franchiseCreate?.isLoading || franchiseUpdate?.isLoading ? (
                    <ButtonLoader />
                  ) : (
                    "Submit"
                  )}
                </Button>
                {/* <Button
                  className="btn btn-style1 px-4 py-2 mx-2"
                  type="click"
                  onClick={handleBack}
                  disabled={franchiseCreate?.isLoading}
                >
                  Back
                </Button> */}
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
    </Wrapper>
  );
};

export default FranchiseAdd;
