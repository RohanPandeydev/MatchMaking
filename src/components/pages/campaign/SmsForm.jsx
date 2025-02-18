import React from 'react'
import { useFormik } from 'formik'
import { Button, Col, FormGroup, Input, Label } from 'reactstrap'
import { SmsConfigurationValidation } from '../../../helper/ValidationHelper/Validation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import CampaignServices from '../../../services/CampaignServices'
import Swal from 'sweetalert2'
import customContext from '../../../contexts/Context'
import { useState } from 'react'
import ValidateAuthenticationKey from '../../../utils/ValidationAuthenticationKey'
const SmsForm = () => {
    const [id, setId] = useState("")
    const queryClient = useQueryClient()

    const initialValues = {
        account_sid: "",
        auth_token: "",
        phone_number: "",

    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SmsConfigurationValidation,
        onSubmit: (value, action) => {
            handleSubmit(value)
        }

    })
    const handleSubmit = (data) => {
        console.log(data, id)
        if (id) {
            data.id = id
            SmsConfigurationUpdate.mutate(data)
            return
        }
        SmsConfiguration.mutate(data)


    }



    const SmsConfiguration = useMutation(
        (data) => CampaignServices.SmsConfiguration(data),
        {
            onSuccess: (data) => {
                Swal.fire({
                    title: "Succssfull",
                    text: "Added Successfully ",
                    icon: "success",
                });
                formik.resetForm();
                setId("")
                queryClient.refetchQueries(["sms-config"])


            },
            onError: (err) => {
                const msg = !!err.response?.data?.tenant[0]
                    ? err.response?.data?.tenant[0]
                    : err?.response?.data?.host[0];

                Swal.fire({
                    title: "Error",
                    text: msg || err?.message,
                    icon: "error",
                });
                return;
            },
        }
    );

    const SmsConfigurationUpdate = useMutation(
        (data) => CampaignServices.SmsConfigurationUpdate(data),
        {
            onSuccess: (data) => {
                Swal.fire({
                    title: "Succssfull",
                    text: "Updated Successfully ",
                    icon: "success",
                });
                formik.resetForm();
                setId("")
                queryClient.refetchQueries(["sms-config"])

            },
            onError: (err) => {
                const msg = !!err.response?.data?.detail
                    ? err.response?.data?.detail
                    : err?.response?.data?.host[0];

                Swal.fire({
                    title: "Error",
                    text: msg || err?.message,
                    icon: "error",
                });
                return;
            },
        }
    );


    const {
        data: Emaildetails,
        isLoading: isEmailLoad,
        isError,
        error,
        refetch,
    } = useQuery(
        ["sms-config"],
        () => {

            let queryParams = [];



            const formattedQueryParams = queryParams.length ? '?' + queryParams.join('&') : '';


            return CampaignServices.SmsConfigurationFetchAll(formattedQueryParams)
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {

                const details = data?.data[0]

                if (data?.data?.length) {
                    formik.setFieldValue("account_sid", details?.account_sid)
                    formik.setFieldValue("auth_token", details?.auth_token)
                    formik.setFieldValue("phone_number", details?.phone_number)
                    setId(details?.id)

                    return
                }
                setId("")

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

    return (
        <>
            <Col xs="12" md="7">
                <div className='email-templete-left-wrap'>
                    <form onSubmit={formik.handleSubmit}>

                        <FormGroup className='common-formgroup'>
                            <Label for="exampleEmail">
                                Account Sid
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="account_sid"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.account_sid}
                                placeholder="account sid"
                                type="text"
                            />
                            {
                                formik.touched.account_sid && <p className="text-danger">{formik.errors?.account_sid}</p>
                            }
                        </FormGroup>
                        <FormGroup className='common-formgroup'>
                            <Label for="exampleEmail">
                                Auth Token
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="auth_token"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.auth_token}
                                placeholder="auth token"
                                type="text"
                            />
                            {
                                formik.touched.auth_token && <p className="text-danger">{formik.errors?.auth_token}</p>
                            }
                        </FormGroup>
                        <FormGroup className='common-formgroup'>
                            <Label for="exampleEmail">
                                Phone Number
                            </Label>
                            <Input
                                id="exampleEmail"
                                placeholder="phone number"
                                type="text"
                                name="phone_number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone_number}
                            />
                            {
                                formik.touched.phone_number && <p className="text-danger">{formik.errors?.phone_number}</p>
                            }
                        </FormGroup>

                        <FormGroup className='common-formgroup'>
                            <Button type="submit" className='btn btn-style1'>Apply</Button>
                        </FormGroup>
                    </form>

                </div>
            </Col>

        </>
    )
}

export default SmsForm