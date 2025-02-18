import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Wrapper from "../../../layouts/Wrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MasterServices from "../../../../services/MasterServices";
import Swal from "sweetalert2";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import getValueBetweenMasterAndAdd from "../../../../utils/UrlParserDropdown";
import { useNavigate, useParams } from "react-router-dom";
import Diet from "../../../../utils/JSON/Diet";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import { MasterDiet, MasterGiftCardCategory } from "../../../../helper/ValidationHelper/Validation";

const AddGiftCardCategory = () => {
    const queryClient = useQueryClient();
    const url = getValueBetweenMasterAndAdd(window.location.href);
    const nav = useNavigate();
    const [ids, setIds] = useState("");
    const initialValues = {
        name: "",
    };
    const { id } = useParams();
    const [myId, setMyId] = useState("");


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: MasterGiftCardCategory,
        onSubmit: (values, action) => {
            submitHandler(values);
        },
    });

    const submitHandler = (data) => {
        if (myId) {
            Update.mutate({
                name: data?.name, description: JSON.stringify(data?.name?.replace(/\s+/g, "_")), category: ids,
                id: myId,
            });

            return;
        }
        AddGiftCardCategory.mutate({ name: data?.name, description: JSON.stringify(data?.name?.replace(/\s+/g, "_")), category: ids });
    };

    const AddGiftCardCategory = useMutation((formdata) => MasterServices.Add(formdata), {
        onSuccess: (data) => {
            console.log("Data==>", data?.data);
            Swal.fire({
                title: "Successfull",
                text: "Added Successfully ",
                icon: "success",
            });

            formik.resetForm();
            nav("/master/giftcardcategory");

            queryClient.refetchQueries("all-giftcard-category-list");
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
            nav("/master/giftcardcategory");

            queryClient.refetchQueries("all-giftcard-category-list");
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
        ["all-pageId-list-diet", url],
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
        ["get-by-id-gift-category", myId],
        () => MasterServices.getById({ id: myId }),
        {
            enabled: !!myId,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                console.log("Get By Id", data?.data); // Debugging log
                formik.setFieldValue("name", data?.data?.name);
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
                            <Label>Category Name</Label>
                            <Input
                                name="name"
                                placeholder="|"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className={
                                    formik.touched.name && formik.errors.name ? "is-invalid" : ""
                                }
                                type="text"
                            >
                                {/* <option value={""}>Please Select Diet</option>
                {Diet?.map((each, index) => {
                  return (
                    <option key={index} value={each?.diet}>
                      {each?.diet}
                    </option>
                  );
                })} */}
                            </Input>
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-danger">{formik.errors.name}</p>
                            )}
                        </FormGroup>
                    </Col>

                    <Col md="12">
                        <FormGroup className="common-formgroup">
                            <Button
                                className="btn btn-style1 px-4 py-2"
                                type="submit"
                                disabled={AddGiftCardCategory?.isLoading}
                            >
                                {AddGiftCardCategory?.isLoading ? <ButtonLoader /> : "Submit"}
                            </Button>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </Wrapper>
    );
};

export default AddGiftCardCategory;
