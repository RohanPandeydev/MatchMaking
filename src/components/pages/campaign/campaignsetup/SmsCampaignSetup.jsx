

import React from 'react'
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Modal, ModalBody, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import ValidateAuthenticationKey from '../../../../utils/ValidationAuthenticationKey';
import CampaignServices from '../../../../services/CampaignServices'
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ButtonLoader from '../../../../utils/Loader/ButtonLoader';
import Select from 'react-select'
import { useFormik } from 'formik';
import parse from 'html-react-parser'
import { EmailCampaignSetupValidation, SmsCampaignSetupValidation } from '../../../../helper/ValidationHelper/Validation';
import Swal from 'sweetalert2';
import PermissionSets from '../../../../guard/Method';
import { IsAccessibleMethod } from '../../../../guard/Rbac';
const SmsCampaignSetup = ({ isSelectAll, setCurrentPage, setCheckBoxList, checkboxList, currentSelectedTab }) => {
    const [template, setTemplate] = useState("")
    const [templateErr, setTemplateErr] = useState("")
    const initialValues = {

        subject: "",
        template: ""

    }


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SmsCampaignSetupValidation,
        onSubmit: (value, action) => {
            handleSubmit(value)
        }
    })


    const handleSubmit = (data) => {
        if (!isSelectAll && checkboxList.length == 0) {
            Swal.fire({
                title: "Error",
                text: "At least select one bride and groom",
                icon: "error",
            });


            return
        }
        if (!template?.value) {
            setTemplateErr("Template Required")
            return
        }

        const brideandgroomIds = []
        checkboxList.map((each) => {
            brideandgroomIds.push(each.id)
        })
        const sendObj = { ...data }
        if (!isSelectAll) {
            sendObj.recipients = brideandgroomIds
        }
        sendObj.send_to_all = Number(isSelectAll)
        SmsCampaignCreate.mutate(sendObj)
    }


    const SmsCampaignCreate = useMutation(
        (data) => {
            if (currentSelectedTab == "brideandgroom") {
                return CampaignServices.SmsCampaignBrideandgroom(data)
            }
            else if (currentSelectedTab == "organization" || currentSelectedTab == "franchise") {
                return CampaignServices.SmsCampaignTenant(data)
            }
        },
        {
            onSuccess: (data) => {
                Swal.fire({
                    title: "Succssfull",
                    text: "Added Successfully ",
                    icon: "success",
                });
                Swal.fire({
                    title: "Are you sure you want to start the campaign?",
                    text: "Starting the campaign will send emails to the selected recipients. You can also save it as a draft to review later.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, start campaign",
                    cancelButtonText: "Save as draft",
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Proceed with sending the campaign
                        SmsCampaignSend.mutate({ id: data?.data?.id });
                    } else {
                        // Handle saving as draft
                        formik.resetForm();
                        setCurrentPage(1);
                        setCheckBoxList([]);
                        setTemplateErr("");
                        setTemplate("");
                    }
                });


                // setId("")


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



    const {
        data: SmsTemplate,
        isLoading: isSmsTemplateLoad,
        isError,
        error,
        refetch,
    } = useQuery(
        ["sms-campaignsetup-template"],
        () => {

            let queryParams = [];



            const formattedQueryParams = queryParams.length ? '?' + queryParams.join('&') : '';


            return CampaignServices.SmsTemplateList(formattedQueryParams)
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {




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


    const SmsCampaignSend = useMutation(
        (data) => {
            if (currentSelectedTab == "brideandgroom") {
                return CampaignServices.SmsCampaignSendBrideandgroom(data)
            }
            else if (currentSelectedTab == "organization" || currentSelectedTab == "franchise") {
                return CampaignServices.SmsCampaignSendTenant(data)
            }
        },
        {
            onSuccess: (data) => {
                Swal.fire({
                    title: "Succssfull",
                    text: "Send Successfully ",
                    icon: "success",
                });
                formik.resetForm();
                setCurrentPage(1)
                setCheckBoxList([])
                setTemplateErr("")
                setTemplate("")

                // setId("")
                // queryClient.refetchQueries(["email-config", loggedInUserTenantId])


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



    const handleSelectTemplate = (e) => {
        setTemplate(e)
        formik.setFieldValue("template", e.value)
    }


    return (
        <>


            <form onSubmit={formik.handleSubmit}>
                <FormGroup className='common-formgroup'>
                    <Label for="exampleEmail">
                        Sms Title
                    </Label>
                    <Input
                        id="exampleEmail"
                        name="subject"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}


                        value={formik.values.subject}
                        placeholder="Sms Title"
                        type="text"
                    />
                    {
                        formik.touched.subject && <p className="text-danger">{formik.errors?.subject}</p>
                    }
                </FormGroup>
                <FormGroup className='common-formgroup'>
                    <Label for="">
                        Select Template
                    </Label>
                    {isSmsTemplateLoad ? <ButtonLoader /> : <Select
                        className={
                            templateErr && templateErr
                                ? "basic-single  is-invalid"
                                : "basic-single "
                        }
                        classNamePrefix="select"
                        isDisabled={isSmsTemplateLoad}
                        isLoading={isSmsTemplateLoad}
                        onChange={handleSelectTemplate}
                        placeholder="Select template"
                        value={template}
                        isSearchable={true}
                        name=""
                        options={[
                            { value: "", label: "Please select template" }, // Empty option for placeholder or default selection
                            ...SmsTemplate?.data.map((each) => {

                                return {
                                    label: `${each?.title}`.trim(), // Add fallback for empty fields
                                    value: each?.id || "", // Ensure a valid value is always provided
                                    body: each?.body
                                };
                            }),
                        ]}
                    />}
                    {
                        templateErr && <p className="text-danger">{templateErr}</p>
                    }
                </FormGroup>
                <div className='campaign-body-wrap'>
                    {template?.body && <FormGroup className='common-formgroup'>
                        <Label for="exampleEmail">
                            Template View
                        </Label>
                        {parse(template.body)}

                    </FormGroup>}
                    <FormGroup className='common-formgroup text-end'>
                        <IsAccessibleMethod
                            method={Object.keys(PermissionSets.Campign.Email_SMS_Configuration.Update)[0]}
                            route={window.location.pathname}

                        >
                            <Button disabled={SmsCampaignCreate?.isLoading || SmsCampaignSend?.isLoading} type='submit' className='btn btn-style1'>{SmsCampaignCreate?.isLoading || SmsCampaignSend?.isLoading ? <ButtonLoader /> : "Create Campaign"}</Button></IsAccessibleMethod>
                    </FormGroup>
                </div>
            </form>
        </>
    )
}

export default SmsCampaignSetup