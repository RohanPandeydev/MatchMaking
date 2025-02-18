import { useFormik } from 'formik'
import React from 'react'
import { Button, Col, FormGroup, Input, Label } from 'reactstrap'
import { EmailConfigurationValidation } from '../../../helper/ValidationHelper/Validation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import CampaignServices from '../../../services/CampaignServices';
import Swal from 'sweetalert2'
import ButtonLoader from '../../../utils/Loader/ButtonLoader'
import customContext from '../../../contexts/Context'
import { useState } from 'react'
import ValidateAuthenticationKey from '../../../utils/ValidationAuthenticationKey'

const EmailForm = () => {
    const [id, setId] = useState("")
    const queryClient = useQueryClient()

    const initialValues = {
        username: "",
        password: "",
        server: "",
        port: "",

    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: EmailConfigurationValidation,
        onSubmit: (value, action) => {
            handleSubmit(value)
        }

    })
    const handleSubmit = (data) => {
        console.log(data, id)
        if (id) {
            data.id = id
            EmailConfigurationUpdate.mutate(data)
            return
        }
        EmailConfiguration.mutate(data)


    }



    const EmailConfiguration = useMutation(
        (data) => CampaignServices.EmailConfiguration(data),
        {
            onSuccess: (data) => {
                Swal.fire({
                    title: "Succssfull",
                    text: "Added Successfully ",
                    icon: "success",
                });
                formik.resetForm();
                setId("")
                queryClient.refetchQueries(["email-config"])


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

    const EmailConfigurationUpdate = useMutation(
        (data) => CampaignServices.EmailConfigurationUpdate(data),
        {
            onSuccess: (data) => {
                Swal.fire({
                    title: "Succssfull",
                    text: "Updated Successfully ",
                    icon: "success",
                });
                formik.resetForm();
                setId("")
                queryClient.refetchQueries(["email-config"])

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
        ["email-config"],
        () => {

            let queryParams = [];

           


            const formattedQueryParams = queryParams.length ? '?' + queryParams.join('&') : '';


            return CampaignServices.EmailConfigurationFetchAll(formattedQueryParams)
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {

                // let { count, results } = data?.data
                const details = data?.data[0]
            
                if (data?.data?.length) {
                    formik.setFieldValue("username", details?.username)
                    formik.setFieldValue("password", details?.password)
                    formik.setFieldValue("server", details?.server)
                    formik.setFieldValue("port", details?.port)
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
                                User Name / Email
                            </Label>
                            <Input
                                id="exampleEmail"
                                placeholder="username / email"
                                type="text"
                                name="username"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}

                            />
                            {
                                formik.touched.username && <p className="text-danger">{formik.errors?.username}</p>
                            }
                        </FormGroup>
                        <FormGroup className='common-formgroup'>
                            <Label for="exampleEmail">
                                Password
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password} placeholder="password"
                                type="text"
                            />
                            {
                                formik.touched.password && <p className="text-danger">{formik.errors?.password}</p>
                            }
                        </FormGroup>
                        <FormGroup className='common-formgroup'>
                            <Label for="exampleEmail">
                                Server
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="server"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.server}
                                placeholder="server"
                                type="text"
                            />
                            {
                                formik.touched.server && <p className="text-danger">{formik.errors?.server}</p>
                            }
                        </FormGroup>
                        <FormGroup className='common-formgroup'>
                            <Label for="exampleEmail">
                                Port
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="port"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.port}

                                placeholder="port"
                                type="text"
                            />
                            {
                                formik.touched.port && <p className="text-danger">{formik.errors?.port}</p>
                            }
                        </FormGroup>
                        <FormGroup className='common-formgroup'>
                            <Button className='btn btn-style1' disabled={EmailConfiguration?.isLoading || EmailConfigurationUpdate?.isLoading}>{EmailConfiguration?.isLoading || EmailConfigurationUpdate?.isLoading ? <ButtonLoader /> : "Apply"}</Button>
                        </FormGroup>
                    </form>
                </div>
            </Col>

        </>
    )
}

export default EmailForm