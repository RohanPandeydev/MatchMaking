import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button, Col, Input, Row, Form, FormGroup, Label } from "reactstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SubscriptionServices from "../../../services/SubscriptionServices";
import Wrapper from "../../layouts/Wrapper";
import customContext from "../../../contexts/Context";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { SubscriptionCustomerForm } from "../../../helper/ValidationHelper/Validation";
import ButtonLoader from "../../../utils/Loader/ButtonLoader";
import ValidateAuthenticationKey from "../../../utils/ValidationAuthenticationKey";

const CustomerAdd = () => {
  const { userData } = customContext();
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState([]);
  const [myId, setMyId] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log("userData", userData);
  // const [isShow, setIsShow] = useState(false);
  const planobj = {
    name: "1 Month",
    duration: 30,
    amount: "100.00",
    // tenant: userData.id,
    // tenant_subscription: 0,
  };
  const durationobj = {
    30: "1 Month",
    90: "3 Month",
    180: "6 Month",
    0: "Till Marriage",
  };
  const [plan_list, set_plan_list] = useState([planobj]);

  const validatePlanList = (plan_list) => {
    const errors = plan_list.map((plan, index) => {
      if (!plan.amount || isNaN(plan.amount)) {
        return `Plan ${
          index + 1
        }: Amount must be a number and cannot be empty.`;
      }
      return null;
    });

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      call_contact_share: false,
      search_and_filter: false,
      expert_guidance: false,
      contact_views: "",
      spotlight: "",
    },
    validationSchema: SubscriptionCustomerForm,
    onSubmit: (values, action) => {
      console.log("values", values);
      submitHandler(values);
    },
  });

  // const [loader, setLoader] = useState(false);

  const submitHandler = (data) => {
    // console.log("data", data);
    mutation.mutate(data);
  };

  const handleSubmitPlan = () => {
    let check = validatePlanList(plan_list);
    console.log("check", check);

    const withoutNull = check?.filter((each) => each != null);
    if (withoutNull?.length > 0) {
      setErrors(check);

      return;
    }
    console.log("Done Validation", plan_list);
    plan_list.map((row) => {
      row.customer_subscription = data.data.id || myId;
      mutationPlan.mutate({ id: myId, data: row });
    });
  };

  const mutation = useMutation(
    (e) => SubscriptionServices.SubscriptionCustomerCreate(e),
    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);

        navigate("/subscription/customer/form/" + btoa(data?.data?.id));

        return;
      },
      onError: (err) => {
        console.log(err.response?.data?.error);
        return;
      },
    }
  );

  const mutationPlan = useMutation(
    (e) => SubscriptionServices.SubscriptionCustomerPlanCreate(e.id, e.data),
    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: " Successfully ",
          icon: "success",
        });
        // queryClient.invalidateQueries("subscription ")
        queryClient.refetchQueries("subscription-customer");
        navigate("/subscription/customer");

        return;
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.username[0] || err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );

  const handleChangePlan = function (i, event) {
    let planlist = [...plan_list];
    if (event.target.name == "duration") {
      planlist[i].duration = event.target.value;
      planlist[i].name = durationobj[event.target.value];
    } else if (event.target.name == "amount") {
      planlist[i].amount = event.target.value;
    }
    set_plan_list(planlist);
  };

  const handlePlanList = function (i, action) {
    let planlist = [...plan_list];
    if (action) {
      if (plan_list?.length > 10) return;
      let check = validatePlanList(plan_list);
      // console.log("check",check)
      // check=check?.filter((each)=>each!=null)

      // if (check?.length > 0) {
      //   setErrors(check);
      //   return;
      // }
      planlist.push(planobj);
    } else {
      planlist = plan_list.filter((r, n) => n != i);
    }
    set_plan_list(planlist);
  };

  const { data } = useQuery(
    ["list-by-id", myId],
    () => SubscriptionServices.getSubscriptionCustomerByDetails({ id: myId }),
    {
      enabled: !!myId,
      onSuccess: (data) => {
        console.log("=========", data?.data, "===========");

        formik.setFieldValue("name", data?.data?.name);
        formik.setFieldValue(
          "search_and_filter",
          data?.data?.search_and_filter
        );
        formik.setFieldValue("expert_guidance", data?.data?.expert_guidance);
        formik.setFieldValue("contact_views", data?.data?.contact_views);
        formik.setFieldValue("spotlight", data?.data?.spotlight);
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
      const decodeId = id && atob(id);
      // console.log("decodeId",!!id,id)

      id && setMyId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [id]);

  return (
    <>
      <Wrapper>
        <div className="subscription-body">
          <div className="common-db-head mb-4">
            <h4>Subscription Type</h4>
          </div>

          {
            <div className="subscription-form-wrap">
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md="12" className="mb-4">
                    <FormGroup className="common-formgroup">
                      <Label> Name </Label>
                      <Input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </FormGroup>
                    <span className={"text-danger"}>
                      {formik.touched.name && formik.errors.name}
                    </span>
                  </Col>
                  <Col md="6" className="mb-4">
                    <FormGroup className="common-formgroup">
                      <Label> Unlimited Calls & Contact Sharing </Label>
                      <div className="common-radio-content">
                        <div className="common-radio-box">
                          <Input
                            type="radio"
                            name="call_contact_share"
                            defaultChecked={
                              formik.values.call_contact_share == true
                            }
                            onClick={() =>
                              formik.setFieldValue("call_contact_share", true)
                            }
                          />
                          Yes
                        </div>
                        <div className="common-radio-box">
                          <Input
                            type="radio"
                            name="call_contact_share"
                            defaultChecked={
                              formik.values.call_contact_share == false
                            }
                            onClick={() =>
                              formik.setFieldValue("call_contact_share", false)
                            }
                          />
                          No
                        </div>
                      </div>
                    </FormGroup>
                    <span className={"text-danger"}>
                      {formik.touched.call_contact_share &&
                        formik.errors.call_contact_share}
                    </span>
                  </Col>
                  <Col md="6" className="mb-4">
                    <FormGroup className="common-formgroup">
                      <Label> Search & Filters </Label>
                      <div className="common-radio-content">
                        <div className="common-radio-box">
                          <Input
                            type="radio"
                            name="search_and_filter"
                            defaultChecked={
                              formik.values.search_and_filter == true
                            }
                            onClick={() =>
                              formik.setFieldValue("search_and_filter", true)
                            }
                          />
                          Yes
                        </div>
                        <div className="common-radio-box">
                          <Input
                            type="radio"
                            name="search_and_filter"
                            defaultChecked={
                              formik.values.search_and_filter == false
                            }
                            onClick={() =>
                              formik.setFieldValue("search_and_filter", false)
                            }
                          />
                          No
                        </div>
                      </div>
                    </FormGroup>
                    <span className={"text-danger"}>
                      {formik.touched.search_and_filter &&
                        formik.errors.search_and_filter}
                    </span>
                  </Col>
                  <Col md="6" className="mb-4">
                    <FormGroup className="common-formgroup">
                      <Label> Contact Views </Label>
                      <Input
                        type="text"
                        placeholder="Contact views"
                        name="contact_views"
                        value={formik.values.contact_views}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </FormGroup>
                    <span className={"text-danger"}>
                      {formik.touched.contact_views &&
                        formik.errors.contact_views}
                    </span>
                  </Col>
                  <Col md="6" className="mb-4">
                    <FormGroup className="common-formgroup">
                      <Label> Spotlight </Label>
                      <Input
                        type="text"
                        placeholder="Spotlight"
                        name="spotlight"
                        value={formik.values.spotlight}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </FormGroup>
                    <span className={"text-danger"}>
                      {formik.touched.spotlight && formik.errors.spotlight}
                    </span>
                  </Col>
                  <Col md="6" className="mb-4">
                    <FormGroup className="common-formgroup">
                      <Label> Call Experts & Get Guidance </Label>
                      <div className="common-radio-content">
                        <div className="common-radio-box">
                          <Input
                            type="radio"
                            name="expert_guidance"
                            defaultChecked={
                              formik.values.expert_guidance == true
                            }
                            onClick={() =>
                              formik.setFieldValue("expert_guidance", true)
                            }
                          />
                          Yes
                        </div>
                        <div className="common-radio-box">
                          <Input
                            type="radio"
                            name="expert_guidance"
                            defaultChecked={
                              formik.values.expert_guidance == false
                            }
                            onClick={() =>
                              formik.setFieldValue("expert_guidance", false)
                            }
                          />
                          No
                        </div>
                      </div>
                    </FormGroup>
                    <span className={"text-danger"}>
                      {formik.touched.expert_guidance &&
                        formik.errors.expert_guidance}
                    </span>
                  </Col>
                  <Col md="12">
                    <FormGroup className="common-formgroup">
                      <Button
                        type="submit"
                        disabled={!!myId}
                        className="btn btn-style1 px-4 py-2"
                      >
                        {" "}
                        Submit{" "}
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </div>
          }

          {!!myId && (
            <div className="subscription-form-lower">
              <Row>
                <Col xs="3" md="3" xxl="2">
                  <div className="subscription-form-left">
                    <h4>
                      <span>Pro</span> Plans
                    </h4>
                  </div>
                </Col>
                <Col xs="6" md="6" xxl="7">
                  {/* <div className="subscription-plans-desc">
                  <Input type="select">
                    <option value={"1 Month"}>1 Month</option>
                    <option value={"3 Month"}>3 Month</option>
                    <option value={"6 Month"}>6 Month</option>
                    <option value={"Till Marriage"}>Till Marriage</option>
                  </Input>
                  <div className="subscription-plans-value">
                    <span>25.00 CA$</span>
                  </div>
                  <Button className="btn btn-style1">
                    +
                  </Button>
                </div>
                <div className="subscription-plans-desc">
                  <Input type="select">
                    <option value={"1 Month"}>1 Month</option>
                    <option value={"3 Month"}>3 Month</option>
                    <option value={"6 Month"}>6 Month</option>
                    <option value={"Till Marriage"}>Till Marriage</option>
                  </Input>
                  <div className="subscription-plans-value">
                    <span>25.00 CA$</span>
                  </div>
                  <Button className="btn btn-style1">
                    +
                  </Button>
                  <Button className="btn btn-style2">
                    <RiDeleteBin6Line />
                  </Button>
                </div> */}

                  {plan_list.map((row, i) => {
                    return (
                      <div key={i} className="subscription-plans-desc">
                        <Input
                          type="select"
                          name="duration"
                          value={row.duration}
                          onChange={(e) => handleChangePlan(i, e)}
                        >
                          <option value={30}>1 Month</option>
                          <option value={90}>3 Month</option>
                          <option value={180}>6 Month</option>
                          <option value={0}>Till Marriage</option>
                        </Input>
                        <div className="subscription-plans-value">
                          {/* <span>25.00 CA$</span> */}
                          <Input
                            type="text"
                            placeholder="amount"
                            name="amount"
                            value={row.amount}
                            onChange={(e) => handleChangePlan(i, e)}
                          />
                          {errors[i] && (
                            <div className="error-message">{errors[i]}</div>
                          )}
                        </div>
                        {i + 1 == plan_list.length && plan_list?.length < 10 ? (
                          <Button
                            className="btn btn-style1"
                            onClick={() => handlePlanList(i, true)}
                          >
                            {" "}
                            +{" "}
                          </Button>
                        ) : null}
                        {plan_list.length > 1 ? (
                          <Button
                            className="btn btn-style2"
                            onClick={() => handlePlanList(i, false)}
                          >
                            <RiDeleteBin6Line />
                          </Button>
                        ) : null}
                      </div>
                    );
                  })}
                  <div className="subscription-plan-btn">
                    <Button
                      className="btn btn-style1 px-4 py-2"
                      disabled={mutation?.isLoading || mutationPlan?.isLoading}
                      onClick={handleSubmitPlan}
                    >
                      {mutation?.isLoading || mutationPlan?.isLoading ? (
                        <ButtonLoader />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default CustomerAdd;
