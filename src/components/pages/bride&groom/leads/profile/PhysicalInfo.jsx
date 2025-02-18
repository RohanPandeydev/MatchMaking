import { useFormik } from "formik";
import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { PhysicalInfoForm } from "../../../../../helper/ValidationHelper/Validation";
import Swal from "sweetalert2";
import BridenGroomServices from "../../../../../services/BridenGroomServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../../../utils/Loader/Loader";
import { useLocation } from "react-router-dom";
import ValidateAuthenticationKey from "../../../../../utils/ValidationAuthenticationKey";
import ButtonLoader from "../../../../../utils/Loader/ButtonLoader";
import heightOptions from "../../../../../utils/JSON/Height";
import weightOptions from "../../../../../utils/JSON/Weight";

const PhysicalInfo = ({
  setId,
  toggle,
  id,
  isFromDetails,
  allData,
  refetchData,
  setActiveTabName,
  setCurrentActiveTab,
  handleNavToDetails,
  ComplexionListing,
  isComplexionLoad,
  BodyListing,
  isBodyLoad,
  DietListing,
  isDietLoad,
}) => {
  let location = useLocation();
  let queryParams = new URLSearchParams(location.search);
  let idValue = queryParams.get("id");
  let tabValue = queryParams.get("tab");
  const queryClient = useQueryClient();
  // const heightOptions = [
  //   { id: 1, height: "4 ft 0 in", value: 4.0 },
  //   { id: 2, height: "4 ft 1 in", value: 4.1 },
  //   { id: 3, height: "4 ft 2 in", value: 4.2 },
  //   { id: 4, height: "4 ft 3 in", value: 4.3 },
  //   { id: 5, height: "4 ft 4 in", value: 4.4 },
  //   { id: 6, height: "4 ft 5 in", value: 4.5 },
  //   { id: 7, height: "4 ft 6 in", value: 4.6 },
  //   { id: 8, height: "4 ft 7 in", value: 4.7 },
  //   { id: 9, height: "4 ft 8 in", value: 4.8 },
  //   { id: 10, height: "4 ft 9 in", value: 4.9 },
  //   { id: 11, height: "4 ft 10 in", value: 4.1 },
  //   { id: 12, height: "4 ft 11 in", value: 4.11 },
  //   { id: 13, height: "5 ft 0 in", value: 5.0 },
  //   { id: 14, height: "5 ft 1 in", value: 5.1 },
  //   { id: 15, height: "5 ft 2 in", value: 5.2 },
  //   { id: 16, height: "5 ft 3 in", value: 5.3 },
  //   { id: 17, height: "5 ft 4 in", value: 5.4 },
  //   { id: 18, height: "5 ft 5 in", value: 5.5 },
  //   { id: 19, height: "5 ft 6 in", value: 5.6 },
  //   { id: 20, height: "5 ft 7 in", value: 5.7 },
  //   { id: 21, height: "5 ft 8 in", value: 5.8 },
  //   { id: 22, height: "5 ft 9 in", value: 5.9 },
  //   { id: 23, height: "5 ft 10 in", value: 5.1 },
  //   { id: 24, height: "5 ft 11 in", value: 5.11 },
  //   { id: 25, height: "6 ft 0 in", value: 6.0 },
  //   { id: 26, height: "6 ft 1 in", value: 6.1 },
  //   { id: 27, height: "6 ft 2 in", value: 6.2 },
  //   { id: 28, height: "6 ft 3 in", value: 6.3 },
  //   { id: 29, height: "6 ft 4 in", value: 6.4 },
  //   { id: 30, height: "6 ft 5 in", value: 6.5 },
  //   { id: 31, height: "6 ft 6 in", value: 6.6 },
  //   { id: 32, height: "6 ft 7 in", value: 6.7 },
  //   { id: 33, height: "6 ft 8 in", value: 6.8 },
  //   { id: 34, height: "6 ft 9 in", value: 6.9 },
  //   { id: 35, height: "6 ft 10 in", value: 6.1 },
  //   { id: 36, height: "6 ft 11 in", value: 6.11 },
  //   { id: 37, height: "7 ft 0 in", value: 7.0 },
  // ];

  // const weightOptions = [
  //   { id: 1, weight: "40 kg", value: 40 },
  //   { id: 2, weight: "41 kg", value: 41 },
  //   { id: 3, weight: "42 kg", value: 42 },
  //   { id: 4, weight: "43 kg", value: 43 },
  //   { id: 5, weight: "44 kg", value: 44 },
  //   { id: 6, weight: "45 kg", value: 45 },
  //   { id: 7, weight: "46 kg", value: 46 },
  //   { id: 8, weight: "47 kg", value: 47 },
  //   { id: 9, weight: "48 kg", value: 48 },
  //   { id: 10, weight: "49 kg", value: 49 },
  //   { id: 11, weight: "50 kg", value: 50 },
  //   { id: 12, weight: "51 kg", value: 51 },
  //   { id: 13, weight: "52 kg", value: 52 },
  //   { id: 14, weight: "53 kg", value: 53 },
  //   { id: 15, weight: "54 kg", value: 54 },
  //   { id: 16, weight: "55 kg", value: 55 },
  //   { id: 17, weight: "56 kg", value: 56 },
  //   { id: 18, weight: "57 kg", value: 57 },
  //   { id: 19, weight: "58 kg", value: 58 },
  //   { id: 20, weight: "59 kg", value: 59 },
  //   { id: 21, weight: "60 kg", value: 60 },
  //   { id: 22, weight: "61 kg", value: 61 },
  //   { id: 23, weight: "62 kg", value: 62 },
  //   { id: 24, weight: "63 kg", value: 63 },
  //   { id: 25, weight: "64 kg", value: 64 },
  //   { id: 26, weight: "65 kg", value: 65 },
  //   { id: 27, weight: "66 kg", value: 66 },
  //   { id: 28, weight: "67 kg", value: 67 },
  //   { id: 29, weight: "68 kg", value: 68 },
  //   { id: 30, weight: "69 kg", value: 69 },
  //   { id: 31, weight: "70 kg", value: 70 },
  //   { id: 32, weight: "71 kg", value: 71 },
  //   { id: 33, weight: "72 kg", value: 72 },
  //   { id: 34, weight: "73 kg", value: 73 },
  //   { id: 35, weight: "74 kg", value: 74 },
  //   { id: 36, weight: "75 kg", value: 75 },
  //   { id: 37, weight: "76 kg", value: 76 },
  //   { id: 38, weight: "77 kg", value: 77 },
  //   { id: 39, weight: "78 kg", value: 78 },
  //   { id: 40, weight: "79 kg", value: 79 },
  //   { id: 41, weight: "80 kg", value: 80 },
  //   { id: 42, weight: "81 kg", value: 81 },
  //   { id: 43, weight: "82 kg", value: 82 },
  //   { id: 44, weight: "83 kg", value: 83 },
  //   { id: 45, weight: "84 kg", value: 84 },
  //   { id: 46, weight: "85 kg", value: 85 },
  //   { id: 47, weight: "86 kg", value: 86 },
  //   { id: 48, weight: "87 kg", value: 87 },
  //   { id: 49, weight: "88 kg", value: 88 },
  //   { id: 50, weight: "89 kg", value: 89 },
  //   { id: 51, weight: "90 kg", value: 90 },
  //   { id: 52, weight: "91 kg", value: 91 },
  //   { id: 53, weight: "92 kg", value: 92 },
  //   { id: 54, weight: "93 kg", value: 93 },
  //   { id: 55, weight: "94 kg", value: 94 },
  //   { id: 56, weight: "95 kg", value: 95 },
  //   { id: 57, weight: "96 kg", value: 96 },
  //   { id: 58, weight: "97 kg", value: 97 },
  //   { id: 59, weight: "98 kg", value: 98 },
  //   { id: 60, weight: "99 kg", value: 99 },
  //   { id: 61, weight: "100 kg", value: 100 },
  //   { id: 62, weight: "101 kg", value: 101 },
  //   { id: 63, weight: "102 kg", value: 102 },
  //   { id: 64, weight: "103 kg", value: 103 },
  //   { id: 65, weight: "104 kg", value: 104 },
  //   { id: 66, weight: "105 kg", value: 105 },
  //   { id: 67, weight: "106 kg", value: 106 },
  //   { id: 68, weight: "107 kg", value: 107 },
  //   { id: 69, weight: "108 kg", value: 108 },
  //   { id: 70, weight: "109 kg", value: 109 },
  //   { id: 71, weight: "110 kg", value: 110 },
  // ];


  const initialValues = {
    height: "",
    weight: "",
    complexion: "",
    bodyType: "",
    diet: "",
    smoking: "no",
    drinking: "yes",
    id: id,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: PhysicalInfoForm,
    onSubmit: (values, action) => {
      submitHandler(values);
    },
  });

  const submitHandler = (values) => {
    console.log(values);
    // "hight": "4.00",
    // "weight": 0,
    // "complexion": "",
    // "body_type": null,
    // "smoking": null,
    // "drinking": null,
    // "diet": null,
    const sendData = {
      hight: values?.height,
      weight: values?.weight,
      complexion: values.complexion,
      body_type: values?.bodyType,
      smoking: values?.smoking,
      drinking: values?.drinking,
      diet: values?.diet,
      id: id,
      tab_physical_info: true,
    };
    updateLeadResidenceMutationForm.mutate(sendData);
  };

  const updateLeadResidenceMutationForm = useMutation(
    (formdata) => BridenGroomServices.updatebridenGroomLeadForm(formdata),

    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully ",
          icon: "success",
        });
        // setId(data?.data?.id)
        // formik.resetForm()
        // setCurrentActiveTab(2)
        // setActiveTabName("residence")
        setId(data?.data?.id);
        formik.resetForm();
        queryClient.refetchQueries([
          "bridengroomdatabyid-main",
          data?.data?.id,
        ]);
        if (isFromDetails) return handleNavToDetails();

        toggle("4", "other");
        return;
      },
      onError: (err) => {
        console.log(err.response?.data);
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
        return;
      },
    }
  );

  // const { data } = useQuery(
  //   ["bridengroomdatabyid-physical", id],
  //   () => {
  //     return BridenGroomServices.getBridenGroomDetailsById({ id: id });
  //   },
  //   {
  //     enabled: !!id,
  //     onSuccess: (data) => {
  //       formik.setFieldValue(
  //         "height",
  //         data?.data?.hight && parseFloat(data?.data?.hight)
  //       );
  //       formik.setFieldValue(
  //         "weight",
  //         data?.data?.weight ? data?.data?.weight : ""
  //       );
  //       formik.setFieldValue("complexion", data?.data?.complexion || "");
  //       formik.setFieldValue("bodyType", data?.data?.body_type || "");
  //       formik.setFieldValue("smoking", data?.data?.smoking || "no");
  //       formik.setFieldValue("drinking", data?.data?.drinking || "yes");
  //       formik.setFieldValue("diet", data?.data?.diet || "");
  //       formik.setFieldValue("id", data?.data?.id);
  //     },
  //     onError: (err) => {
  //       if (err?.response?.status == 401) {
  //         ValidateAuthenticationKey(
  //           err?.response?.status,
  //           "Your login session has expired. Please log in again."
  //         );
  //         return;
  //       }
  //       Swal.fire({
  //         title: "Error",
  //         text: err?.response?.data?.message || err?.message,
  //         icon: "error",
  //       });
  //     },
  //   }
  // );

  useEffect(() => {
    try {
      const decodeId = idValue && atob(idValue);
      console.log("decodeId", !!idValue, idValue);

      idValue && setId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [idValue]);

  useEffect(() => {
    if (Object.keys(allData).length > 0 && !!id) {
      formik.setFieldValue(
        "height",
        allData?.hight && parseFloat(allData?.hight)
      );
      formik.setFieldValue("weight", allData?.weight ? allData?.weight : "");
      formik.setFieldValue("complexion", allData?.complexion || "");
      formik.setFieldValue("bodyType", allData?.body_type);
      formik.setFieldValue("smoking", allData?.smoking || "no");
      formik.setFieldValue("drinking", allData?.drinking || "yes");
      formik.setFieldValue("diet", allData?.diet || "");
      formik.setFieldValue("id", allData?.id);
    }
  }, [refetchData, id]);
  return (
    <>
      {!id ? (
        <p className="text-danger">Please fill basic details first</p>
      ) : updateLeadResidenceMutationForm?.isLoading ? (
        <Loader />
      ) : (
        <TabPane tabId="3">
          <div className="profile-form-wrap">
            <form onSubmit={formik.handleSubmit}>
              <Row className="gx-5">
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Height * </Label>
                    <Input
                      id=""
                      name="height"
                      value={formik.values.height}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="select"
                      className={
                        formik.touched.height && formik.errors.height
                          ? "is-invalid"
                          : ""
                      }
                    >
                      <option value={""}>Select Height</option>
                      {heightOptions?.map((each) => {
                        return (
                          <option value={each?.value}>{each?.height}</option>
                        );
                      })}
                    </Input>
                    {formik.touched.height && (
                      <p className="text-danger">{formik.errors.height}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Weight * </Label>
                    <Input
                      id=""
                      name="weight"
                      value={formik.values.weight}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="select"
                      className={
                        formik.touched.weight && formik.errors.weight
                          ? "is-invalid"
                          : ""
                      }
                    >
                      <option value={""}>Select Weight</option>
                      {weightOptions?.map((each) => {
                        return (
                          <option value={each?.value}>{each?.weight}</option>
                        );
                      })}
                    </Input>
                    {formik.touched.weight && (
                      <p className="text-danger">{formik.errors.weight}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Complexion </Label>
                    <Input
                      id=""
                      name="complexion"
                      value={formik.values.complexion}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="select"
                      className={
                        formik.touched.complexion && formik.errors.complexion
                          ? "is-invalid"
                          : ""
                      }
                    >
                      <option value={""}>Select Complexion</option>
                      {isComplexionLoad ? (
                        <ButtonLoader />
                      ) : (
                        ComplexionListing?.length > 0 &&
                        ComplexionListing.map((complexion) => (
                          <option
                            key={complexion?.name}
                            value={
                              complexion.description &&
                              JSON.parse(complexion.description)
                            }
                          >
                            {complexion?.name || ""}
                          </option>
                        ))
                      )}
                    </Input>
                    {formik.touched.complexion && (
                      <p className="text-danger">{formik.errors.complexion}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Body Type </Label>
                    <Input
                      id=""
                      name="bodyType"
                      value={formik.values.bodyType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="select"
                      className={
                        formik.touched.bodyType && formik.errors.bodyType
                          ? "is-invalid"
                          : ""
                      }
                    >
                      <option value={""}>Select Body Type</option>
                      {isBodyLoad ? (
                        <ButtonLoader />
                      ) : (
                        BodyListing?.length > 0 &&
                        BodyListing.map((body) => (
                          <option
                            key={body?.name}
                            value={
                              body.description && JSON.parse(body.description)
                            }
                          >
                            {body?.name || ""}
                          </option>
                        ))
                      )}
                    </Input>
                    {formik.touched.bodyType && (
                      <p className="text-danger">{formik.errors.bodyType}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label> Smoking </Label>
                    <ul className="common-radio-btn mt-3">
                      <li>
                        <Input
                          id="SmokingYes"
                          checked={formik.values.smoking == "yes"}
                          onClick={() => formik.setFieldValue("smoking", "yes")}
                          name="Smoking"
                          type="radio"
                        />
                        <Label for="SmokingYes"> Yes </Label>
                      </li>
                      <li>
                        <Input
                          id="SmokingNo"
                          checked={formik.values.smoking == "no"}
                          onClick={() => formik.setFieldValue("smoking", "no")}
                          name="Smoking"
                          type="radio"
                        />
                        <Label for="SmokingNo"> No </Label>
                      </li>
                      <li>
                        <Input
                          id="SmokingOccasionally"
                          checked={formik.values.smoking == "occasionally"}
                          onClick={() =>
                            formik.setFieldValue("smoking", "occasionally")
                          }
                          name="Smoking"
                          type="radio"
                        />
                        <Label for="SmokingOccasionally"> Occasionally </Label>
                      </li>
                    </ul>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label>Drinking </Label>
                    <ul className="common-radio-btn mt-3">
                      <li>
                        <Input
                          id="DrinkingYes"
                          checked={formik.values.drinking == "no"}
                          onClick={() => formik.setFieldValue("drinking", "no")}
                          name="Drinking"
                          type="radio"
                        />
                        <Label for="DrinkingYes"> No </Label>
                      </li>
                      <li>
                        <Input
                          id="DrinkingNo"
                          checked={formik.values.drinking == "yes"}
                          onClick={() =>
                            formik.setFieldValue("drinking", "yes")
                          }
                          name="Drinking"
                          type="radio"
                        />
                        <Label for="DrinkingNo"> Yes </Label>
                      </li>
                      <li>
                        <Input
                          id="DrinkingOccasionally"
                          checked={formik.values.drinking == "occasionally"}
                          onClick={() =>
                            formik.setFieldValue("drinking", "occasionally")
                          }
                          name="Drinking"
                          type="radio"
                        />
                        <Label for="DrinkingOccasionally"> Occasionally </Label>
                      </li>
                    </ul>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="common-formgroup">
                    <Label>Diet </Label>
                    <Input
                      id=""
                      name="diet"
                      value={formik.values.diet}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="select"
                      className={
                        formik.touched.diet && formik.errors.diet
                          ? "is-invalid"
                          : ""
                      }
                    >
                      <option value={""}>Select Diet</option>
                      {isDietLoad ? (
                        <ButtonLoader />
                      ) : (
                        DietListing?.length > 0 &&
                        DietListing.map((diet) => (
                          <option
                            key={diet?.name}
                            value={
                              diet.description && JSON.parse(diet.description)
                            }
                          >
                            {diet?.name || ""}
                          </option>
                        ))
                      )}
                    </Input>
                    {formik.touched.diet && (
                      <p className="text-danger">{formik.errors.diet}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col xs="12" md="12" className="mt-4">
                  <FormGroup className="common-formgroup text-end">
                    {!isFromDetails && (
                      <Button
                        className="btn btn-outline-style1 px-5 py-2 me-2"
                        type="click"
                        onClick={() => {
                          toggle("2", "residence");
                        }}
                      >
                        {" "}
                        Back{" "}
                      </Button>
                    )}
                    <Button
                      className="btn btn-style1 px-5 py-2"
                      type="submit"
                      disabled={updateLeadResidenceMutationForm?.isLoading}
                    >
                      {" "}
                      {isFromDetails ? "Save" : "Next"}{" "}
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </form>
          </div>
        </TabPane>
      )}
    </>
  );
};

export default PhysicalInfo;
