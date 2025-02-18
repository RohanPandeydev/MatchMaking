import React from "react";
import { IoClose } from "react-icons/io5";
import {
    Button,
    Col,
    Collapse,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    Row,
} from "reactstrap";
import { useFormik } from "formik";
import { initial } from "lodash";
import { useEffect } from "react";
import StaffServices from "../../../../services/StaffServices";
import Loader from "../../../../utils/Loader/Loader";
import NoActiveDataFound from "../../../../utils/NoActiveDataFound";
import { useMutation, useQuery } from "@tanstack/react-query";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import { ShareModelValidation } from "../../../../helper/ValidationHelper/Validation";
import ShareDataServices from "../../../../services/ShareDataServices";
import { useState } from "react";
import Swal from "sweetalert2";
import Select from 'react-select'
import profileUser from "../../../../assets/images/no-images-available.jpg";
import { MdVerified } from "react-icons/md";
import { GiQueenCrown } from "react-icons/gi";
import { FaTrash } from "react-icons/fa";
import DuplicateData from "./DuplicateData";
import { TfiShare } from "react-icons/tfi";
import { VscShare } from "react-icons/vsc";

const ShareDataModel = ({
    handleShareModel,
    toggleShareModel,
    handleCloseShareDataModel,
    brideandgroom,
    ShareDataOrganizationFranchiseMutation,
    shareType, setShareType,
    duplicateDataList,
    setDuplicateData, setBrideAndGroomId, setCheckBoxList, selectId, setSelectId, handleSelectId, setShowErr, showErr
}) => {
    const initialValues = {
        brideandgroom: brideandgroom,
        orgfranchiseId: "",
    };
    const handleShareType = (data) => {
        setShareType(data)

    }



    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: ShareModelValidation,
        onSubmit: (values) => {
            console.log(values, "Submit");
            if (!selectId && Object(selectId)?.keys?.length == 0) {
                setShowErr("Required")
                return
            }
            handleSubmit(values);
        },
    });
    // console.log(formik.errors, brideandgroom)

    const handleSubmit = (data) => {
        // console.log("Form data submitted:", JSON.parse(JSON.stringify(data)));

        if (brideandgroom?.length == 0) {
            Swal.fire({
                title: "Error",
                text: "Please try again later",
                icon: "error",
            });
            handleCloseShareDataModel();
            return;
        }

        const sendObj = brideandgroom?.map((each) => {
            return {
                brideandgroom: each?.id,
                tenant: Number(data?.orgfranchiseId),
            }
        })

        ShareDataOrganizationFranchiseMutation.mutate(sendObj);
        // formik.resetForm()
        // setSelectId({})
        // setShareType({})
    };
    // useEffect(() => {
    //     if (brideandgroom) {
    //         formik.setFieldValue("brideandgroom", brideandgroom);
    //         return;
    //     }

    //     return;
    // }, [brideandgroom]);

    const {
        data: organizationFranchiseList,
        isLoading: isLoadedOrganizationFracnhiseList,

    } = useQuery(
        ["share-data-org-franchise-share-model", shareType?.name],
        () => {
            return ShareDataServices?.getOrganizationFrachiseList(shareType?.type ? `account_type=${shareType?.type}` : "")
        },
        {
            enabled: (shareType?.hasOwnProperty("type") && !!shareType?.type || false),
            refetchOnWindowFocus: false,
            select: (data) => {
                // console.log("DataOrganization", data?.data);
                // StorageData.setData(data?.data?.data?.users);
                return data?.data;
            },
            onError: (err) => {
                if (err?.response?.status == 401) {
                    ValidateAuthenticationKey(
                        err?.response?.status,
                        "Your login session has expired. Please log in again."
                    );
                    return;
                }
                // Swal.fire({
                //     title: "Error",
                //     text: err?.response?.data?.message || err?.message,
                //     icon: "error",
                // });
            },
        }
    );



    useEffect(() => {
        if (brideandgroom?.length) {
            formik.setFieldValue("brideandgroom", brideandgroom)
            // setSelectId({})

        }
        if (brideandgroom?.length == 0) {
            setSelectId({})
        }
    }, [brideandgroom, brideandgroom?.length])

    const handleRemoveDuplicate = () => {
        const filterOut = brideandgroom?.filter((each) => {
            return !duplicateDataList?.some((ele) => ele?.data?.id == each?.id);
        });
        // console.log(filterOut, "filterOut")
        formik.setFieldValue("brideandgroom", filterOut)
        // filterOut?.length == 0 ? :handleCloseShareDataModel()
        setBrideAndGroomId(filterOut);
        setDuplicateData([]);
        if (filterOut?.length == 0) {
            handleCloseShareDataModel()
            setSelectId({})
            setCheckBoxList([])
        }
    }


    useEffect(() => {
        if (selectId) {
            formik.setFieldValue("orgfranchiseId", selectId?.value)
        }
    }, [selectId])

    return (
        <Modal
            size="xl"
            className="common-modal share-data-model"
            isOpen={toggleShareModel}
            toggle={handleShareModel}
        >
            <Button className="close-btn" onClick={handleCloseShareDataModel}>
                <IoClose />
            </Button>
            {duplicateDataList?.length ? <DuplicateData duplicateDataList={duplicateDataList} brideandgroom={brideandgroom} handleRemoveDuplicate={handleRemoveDuplicate} /> : <>
                <div className="p-3">
                    <div className="row justify-content-center">
                        <div className="col-12 mb-3">
                            <div className="modal-heading">
                                <h4>Share Data </h4>
                            </div>
                        </div>
                        <div className="col-6 col-lg-4">
                            <Button type="click" className={shareType && shareType?.type == "org" ? "share-data-to-btn active" : "share-data-to-btn"} onClick={() => handleShareType({ name: "Organization", type: 'org' })}>Organization
                                <span className="icon"><VscShare /></span></Button>
                        </div>
                        <div className="col-6 col-lg-4">
                            <Button type="click" className={shareType && shareType?.type == "franchise" ? "share-data-to-btn active" : "share-data-to-btn"} onClick={() => handleShareType({ name: "Franchise", type: 'franchise' })}> Franchise
                                <span className="icon"><VscShare /></span>
                            </Button>
                        </div>
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit}>

                    <ModalBody>

                        {shareType?.hasOwnProperty("type") ? <>
                            {
                                isLoadedOrganizationFracnhiseList ? (
                                    <ButtonLoader />
                                ) : organizationFranchiseList?.length === 0 ? (
                                    <NoActiveDataFound msg="No data found" />
                                ) : (
                                    <Row className="mt-2">
                                        <Col xs="12" md="12" lg="12">
                                            <FormGroup className="common-formgroup">
                                                <Label>{shareType?.name}</Label>
                                                {isLoadedOrganizationFracnhiseList ? <ButtonLoader /> : <Select
                                                    className="basic-single"
                                                    classNamePrefix="select"

                                                    isDisabled={isLoadedOrganizationFracnhiseList}
                                                    isLoading={isLoadedOrganizationFracnhiseList}
                                                    options={organizationFranchiseList?.map((each) => { return { label: each?.name, value: each?.id } })}
                                                    onChange={handleSelectId}
                                                    value={selectId}
                                                    placeholder="Select Data"
                                                />}
                                                {showErr && (
                                                    <p className="text-danger">{showErr}</p>
                                                )}
                                            </FormGroup>
                                        </Col>

                                        <Col xs="12" md="12" lg="12" className="text-end">
                                            {
                                                duplicateDataList?.length == brideandgroom?.length ? <Button type="click" onClick={handleCloseShareDataModel}>Close</Button> : <Button className="btn btn-style1" type="submit">
                                                    {ShareDataOrganizationFranchiseMutation?.isLoading ? (
                                                        <ButtonLoader />
                                                    ) : (
                                                        "Save"
                                                    )}
                                                </Button>
                                            }

                                        </Col>
                                    </Row>
                                )}</> : null}
                    </ModalBody>
                </form>
            </>}
        </Modal>
    );
};

export default ShareDataModel;
