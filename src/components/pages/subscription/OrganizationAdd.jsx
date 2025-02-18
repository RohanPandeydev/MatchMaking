import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Wrapper from "../../layouts/Wrapper";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SubscriptionServices from "../../../services/SubscriptionServices";
import { organizationForm } from "../../../helper/ValidationHelper/Validation";
import ButtonLoader from "../../../utils/Loader/ButtonLoader";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import paymentplaceholder from "../../../assets/images/paymentplaceholder.png";
import ValidateAuthenticationKey from "../../../utils/ValidationAuthenticationKey";
import config from "../../../../config";
import MasterServices from "../../../services/MasterServices";
import useFetchMasterSectionData from "../../../helper/MasterSection";
import useFetchMasterData from "../../../helper/FetchMasterContent";

const OrganizationAdd = ({ }) => {
  const queryClient = useQueryClient();
  const [myId, setMyId] = useState("");
  const { id } = useParams();
  const [selectPaymentList, setSelectPaymentList] = useState([]);
  const [selectPaymentListErr, setSelectPaymentListErr] = useState("");
  const [country, setCountry] = useState("")
  const [countryErr, setCountryErr] = useState("")



  const handleCountry = (e) => {
    setCountryErr("")
    setCountry(e)

    formik.setFieldValue("country", e?.value)
  }


  const initialValues = {
    name: "",
    cost: "",
    no_of_data: "",
    no_of_subscription: "",
    // payment_gateway: "paytm",
    domain_setup: true,
    subscriber_type: "org",
    currency: "",
    discount: "0",
    country: "",
    discounttype: "flat"
  };
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: organizationForm,

    onSubmit: (values, action) => {
      if (selectPaymentList?.length == 0) {
        setSelectPaymentListErr("Required");
        return;
      }
      submitHandler(values);
    },
  });

  const submitHandler = (values) => {
    console.log("Organization", values);
    const arrofIds = selectPaymentList?.map((elem) => elem.value);
    values.payment_gateway = JSON.stringify(arrofIds);
    values.dis_type=values?.discounttype


    if (!country?.value) {
      setCountryErr("Required")
      return
    }
    if (!!myId) {
      values.id = myId;
      organizationUpdate.mutate(values);
      return;
    }
    organizationCreate.mutate(values);
  };

  const organizationCreate = useMutation(
    (data) => SubscriptionServices.SubscriptionOrganizationCreate(data),
    {
      onSuccess: (data) => {
        // console.log("Data after submission organization", data?.data);
        formik.resetForm();
        // alert("Created Successfully")
        Swal.fire({
          title: "Successfull",
          text: "Created Successfully ",
          icon: "success",
        });
        setSelectPaymentList([]);
        setCountry("")
        setCountryErr("")
        setSelectPaymentListErr("");
        // setShowForm(false);
        queryClient.refetchQueries("subscription-organization");
        nav("/subscription/organization");
        // queryClient.invalidateQueries("subscription-organization");
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.response?.data?.message || err?.message,
          icon: "error",
        });
        // alert(err?.response?.data?.error || err?.message);
      },
    }
  );
  const organizationUpdate = useMutation(
    (data) => SubscriptionServices.SubscriptionOrganizationUpdate(data),
    {
      onSuccess: (data) => {
        // console.log("Data after submission organization", data?.data);
        formik.resetForm();

        // alert("Created Successfully")
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully ",
          icon: "success",
        });
        setCountry("")
        setCountryErr("")
        setSelectPaymentList([]);
        setSelectPaymentListErr("");
        // setShowForm(false);
        queryClient.refetchQueries("subscription-organization");
        nav("/subscription/organization");
        // queryClient.invalidateQueries("subscription-organization");
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
        // alert(err?.response?.data?.error || err?.message);
      },
    }
  );

  const { data: organizationList, isLoading: isLoadedOrganizationList } =
    useQuery(
      ["subscription-organization-details", myId],
      () =>
        SubscriptionServices.getSubscriptionOrganizationByDetails({ id: myId }),
      {
        enabled: !!myId,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
          console.log("DataOrganization", data?.data);
          // name: "",
          // cost: "",
          // no_of_data: "",
          // no_of_subscription: "",
          // // payment_gateway: "paytm",
          // domain_setup: true,
          // subscriber_type: "org",
          formik.setFieldValue("name", data?.data?.name);
          formik.setFieldValue("cost", data?.data?.cost);
          formik.setFieldValue("no_of_data", data?.data?.no_of_data);
          formik.setFieldValue("discounttype", data?.data?.dis_type);
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

            formik.setFieldValue("country", data?.data?.country?.id);
            setCountry({ value: data?.data?.country?.id, label: data?.data?.country?.name })

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
  const handlePaymentList = (data) => {
    setSelectPaymentListErr("")
    setSelectPaymentList(data);
  };

  const {
    data: paymentGatewayList,
    isLoading: isLoadedPaymentGateway,
    isError,
    error,
    refetch,
  } = useQuery(
    ["payment-gateways-org"],
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
  const handleBack = () => {
    formik.resetForm();
    setShowForm(false);
  };

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
    ["all-country-list-org"],
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



  const { data: currencyList, isLoading: isCurrencyLoad } = useFetchMasterData(config.masterList[19], "all-currency-list-org")


  const discountTypeList = [{
    value: "flat", name: "Flat"
  }, {
    value: "discount", name: "Discount"
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

            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>Domain Setup</Label>
                <Input
                  className={
                    formik.touched.domain_setup && formik.errors.domain_setup
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="domain_setup"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.domain_setup}
                  type="select"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Input>
                {formik.touched.domain_setup && formik.errors.domain_setup && (
                  <div className="invalid-feedback">
                    {formik.errors.domain_setup}
                  </div>
                )}
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup className="common-formgroup">
                <Button
                  className="btn btn-style1 px-4 py-2"
                  type="submit"
                  disabled={
                    organizationCreate?.isLoading ||
                    organizationUpdate?.isLoading
                  }
                >
                  {organizationCreate?.isLoading ||
                    organizationUpdate?.isLoading ? (
                    <ButtonLoader />
                  ) : (
                    "Submit"
                  )}
                </Button>
                {/* <Button
                  className="btn btn-style1 px-4 py-2 mx-2"
                  type="click"
                  onClick={handleBack}
                  disabled={organizationCreate?.isLoading}
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

export default OrganizationAdd;
