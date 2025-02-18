import { useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const AddMember = () => {
    const queryClient = useQueryClient();

    const initialValues = {
        name: "",
        cost: "",
        no_of_data: "",
        no_of_subscription: "",
        payment_gateway: "paytm",
        domain_setup: false,
        subscriber_type: "franchise",
      };
      const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, action) => {
          submitHandler(values);
        },
      });


      const submitHandler=(data)=>{
        console.log(values)
      }
  return (
    <div className="subscription-form-wrap">
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col md="6" className="mb-2">
          <FormGroup className="common-formgroup">
            <Label> Name</Label>
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
              placeholder=" Name"
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
            <Input
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
              )}
          </FormGroup>
        </Col>
        {/* <Col md="6" className="mb-2">
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
        </Col> */}
        <Col md="6">
          <FormGroup className="common-formgroup">
            <Button
              className="btn btn-style1 px-4 py-2"
              type="submit"
              disabled={franchiseCreate?.isLoading}
            >
              {franchiseCreate?.isLoading ? <ButtonLoader /> : "Submit"}
            </Button>
            <Button
              className="btn btn-style1 px-4 py-2 mx-2"
              type="click"
              onClick={()=>setShowForm(false)}
              disabled={franchiseCreate?.isLoading}
            >
              Back
            </Button>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  </div>
  )
}

export default AddMember