import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Wrapper from "../../../layouts/Wrapper";
import MasterServices from "../../../../services/MasterServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Complexion from "../../../../utils/JSON/Complexion";
import getValueBetweenMasterAndAdd from "../../../../utils/UrlParserDropdown";
import { useNavigate, useParams } from "react-router-dom";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import { MasterComplexion } from "../../../../helper/ValidationHelper/Validation";
import Select from 'react-select';

const AddCurrency = () => {
    const queryClient = useQueryClient();
    const url = getValueBetweenMasterAndAdd(window.location.href);
    const nav = useNavigate();
    const [ids, setIds] = useState("");
    const [currency, setCurrency] = useState({})

    const initialValues = {
        name: "",
    };
    const { id } = useParams();

    const [myId, setMyId] = useState("");

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: MasterComplexion,
        onSubmit: (values, action) => {
            submitHandler(values);
        },
    });

    const submitHandler = (data) => {
        // console.log(values);
        if (myId) {
            Update.mutate({
                name: currency?.country, description: JSON.stringify({ name: currency?.country?.replace(/\s+/g, "_"), symbol: currency.symbol }), category: ids,
                id: myId,
            });

            return;
        }
        AddCurrency.mutate({ name: currency?.country, description: JSON.stringify({ name: currency?.country?.replace(/\s+/g, "_"), symbol: currency.symbol }), category: ids });

    };
    const AddCurrency = useMutation(
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
                nav("/master/currency/");

                queryClient.refetchQueries("all-currency-list");
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
            nav("/master/currency/");

            queryClient.refetchQueries("all-currency-list");
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
        ["all-pageId-list-currency", url],
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
        ["get-by-id-currency", myId],
        () => MasterServices.getById({ id: myId }),
        {
            enabled: !!myId,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                console.log("Get By Id", data?.data); // Debugging logc
                const currencySymbol = data?.data?.description && JSON.parse(data?.data?.description)?.symbol && JSON.parse(data?.data?.description)?.symbol
                setCurrency({ label: `${data?.data?.name} (${currencySymbol})` || "", value: data?.data?.name, country: data?.data?.name, symbol: currencySymbol })
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
    const { data: currencyList, isLoading: isLoadingCurrency } = useQuery(
        ["get-currency-list"],
        () => MasterServices.getCurrencyList(),
        {
            refetchOnWindowFocus: false,
            select: (data) => {
                const result = data?.data.map(item => {
                    const country = item.name.common; // Extract common name
                    const currencyKey = Object.keys(item.currencies)[0]; // Get currency key
                    const symbol = item.currencies[currencyKey]?.symbol; // Get currency symbol

                    return { country, symbol }; // Return new object
                });
                console.log(result, "result")
                const uniqueSymbolsWithCountries = Array.from(
                    data?.data.reduce((map, item) => {
                        const country = item.name.common; // Extract country name
                        const currencyKey = Object.keys(item.currencies)[0]; // Get currency key
                        const symbol = item.currencies[currencyKey]?.symbol; // Get currency symbol

                        // Add to map if symbol is not already present
                        if (symbol && !map.has(symbol)) {
                            map.set(symbol, country);
                        }
                        return map;
                    }, new Map())
                ).map(([symbol, country]) => ({ symbol, country })); // Convert Map to array of objects

                return uniqueSymbolsWithCountries
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

    console.log(currencyList, "currencyList")
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


    const handleSelectCurrency = (e) => {
        setCurrency(e)
        formik.setFieldValue("name", e?.value)

    }
    return (
        <Wrapper>
            <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col md="6">
                        <FormGroup className="common-formgroup">
                            <Label>Currency</Label>
                            {isLoadingCurrency ? <ButtonLoader /> : <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={isLoadingCurrency}
                                isLoading={isLoadingCurrency}
                                onChange={handleSelectCurrency}
                                placeholder="Select currency"
                                value={currency}
                                isSearchable={true}
                                name=""
                                options={currencyList?.map((each) => {
                                    return {
                                        label: `${each?.country} (${each?.symbol})`,
                                        value: each?.country,
                                        country: each?.country,
                                        symbol: each?.symbol
                                    }
                                })}
                            />}
                            {/* <Input
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
                                <option value={""}>Please Select Currency</option>
                                {isLoadingCurrency ? <ButtonLoader /> : currencyList?.map((each, index) => {
                                    return (
                                        <option key={index} value={each?.symbol}>
                                            {each?.symbol}({each?.country})
                                        </option>
                                    );
                                })}
                            </Input> */}
                            {formik.errors.name && (
                                <p className="text-danger">{formik.errors.name}</p>
                            )}
                        </FormGroup>
                    </Col>

                    <Col md="12">
                        <FormGroup className="common-formgroup">
                            <Button
                                className="btn btn-style1 px-4 py-2"
                                type="submit"
                                disabled={AddCurrency?.isLoading || Update?.isLoading}
                            >
                                {AddCurrency?.isLoading || Update?.isLoading ? <ButtonLoader /> : "Submit"}
                            </Button>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </Wrapper>
    );
};

export default AddCurrency;
