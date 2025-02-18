import React, { useState } from "react";
import {
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Button,
  Row,
} from "reactstrap";
import logo from "../../assets/images/logo.png";
import login_couple from "../../assets/images/login-couple-img.png";
import { LuUser } from "react-icons/lu";
import { BiKey } from "react-icons/bi";
import { useFormik } from "formik";
import { LoginForm } from "../../helper/ValidationHelper/Validation";
import StorageData from "../../helper/storagehelper/StorageData";
import { useMutation } from "@tanstack/react-query";
import AuthServices from "../../services/AuthServices";
import Loader from "../../utils/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const location = useLocation();
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: LoginForm,
    onSubmit: (values, action) => {
      submitHandler(values);
    },
  });

  const [loader, setLoader] = useState(false);

  const submitHandler = (data) => {
    console.log("data", data);
    mutation.mutate(data);
  };

  const mutation = useMutation(
    (formdata) => AuthServices.loginAdmin(formdata),

    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        StorageData.setToken(data?.data?.access);
        StorageData.setRefreshToken(data?.data?.refresh);
        // alert("Logged In Successfully");
        setLoader(true);
        window.location.replace(location?.state?.path || "/");
        return;
      },
      onError: (err) => {
        setLoader(false);
        console.log(err.response?.data?.error);
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
        return;
      },
    }
  );
  return (
    <>
      <section className="login-wrapper">
        {mutation.isLoading || loader ? (
          <Loader />
        ) : (
          <Container fluid>
            <Row>
              <Col md="6" className="p-0">
                <div className="login-left-wrap">
                  <div className="login-logo">
                    <img className="img-fluid" src={logo} alt="" />
                  </div>
                  <div className="login-couple-img">
                    <img className="img-fluid" src={login_couple} alt="" />
                  </div>
                </div>
              </Col>
              <Col md="6" className="p-0">
                <div className="login-from-wrap">
                  <div className="login-form">
                    <h3>Sign in</h3>
                    <form onSubmit={formik.handleSubmit}>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <LuUser />
                        </InputGroupText>
                        <Input
                          placeholder="User Name"
                          name="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="new-username"
                          className={
                            formik.touched.username && formik.errors.username
                              ? "is-invalid"
                              : ""
                          }
                        />
                      </InputGroup>
                      {/* {formik.touched.username && (
                          <p className="text-danger">{formik.errors.username}</p>
                        )} */}
                      <InputGroup className="mb-5">
                        <InputGroupText>
                          <BiKey />
                        </InputGroupText>
                        <Input
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="new-password"
                          className={
                            formik.touched.password && formik.errors.password
                              ? "is-invalid"
                              : ""
                          }
                        />
                      </InputGroup>
                      {/* {formik.touched.password && (
                          <p className="text-danger">{formik.errors.password}</p>
                        )} */}
                      <div className="submit-login mb-3">
                        <Button
                          type="submit"
                          className="btn btn-style1"
                          disabled={
                            formik.values.password && formik.values.username
                              ? false
                              : true
                          }
                        >
                          {" "}
                          Sign in{" "}
                        </Button>
                      </div>
                      {/* <div className="dont-account text-center">
                                      <p>Don't have an account?  <Link to="/">Sign up here</Link></p>
                                  </div> */}
                    </form>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </section>
    </>
  );
};

export default Login;
