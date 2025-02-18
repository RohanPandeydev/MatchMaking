import { useFormik } from "formik";
import React from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Wrapper from "../../../layouts/Wrapper";

const AddWeight = () => {
  const initialValues = {
    name: "",
    value: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, action) => {
      submitHandler(values);
    },
  });

  const submitHandler = (data) => {
    console.log(values);
  };

  return (
    <Wrapper>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6" className="mb-2">
            <FormGroup className="common-formgroup">
              <Label> Name</Label>
              <Input
                className={
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
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
                placeholder="value"
                type="text"
              />
              {formik.touched.value && formik.errors.value && (
                <div className="invalid-feedback">{formik.errors.value}</div>
              )}
            </FormGroup>
          </Col>

          <Col md="12">
            <FormGroup className="common-formgroup">
              <Button className="btn btn-style1 px-4 py-2" type="submit">
                Submit
              </Button>
              <Button className="btn btn-style1 px-4 py-2 mx-2" type="click">
                Back
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default AddWeight;
