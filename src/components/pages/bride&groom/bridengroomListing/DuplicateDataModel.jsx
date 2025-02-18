import React from "react";
import { IoClose, IoImagesOutline } from "react-icons/io5";
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
import { GiQueenCrown } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
import config from "../../../../../config";
import profileUser from "../../../../assets/images/no-images-available.jpg";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const DuplicateDataModel = ({
    handleDuplicateModelData,
    setToggleDuplicateDataModel,
    toogleDuplicateDataModel,
    duplicateDataList, handleCloseDuplicateDataModel, handleCheckedUser, checkboxList, setCheckBoxList

}) => {


    const handleRemoveDuplicate = (id) => {
        console.log(id,)
        const filterOut = checkboxList?.filter((each) => {
            return each?.brideandgroom != id
        })
        setCheckBoxList(filterOut)




    }


    // console.log(duplicateData, toogleDuplicateDataModel, "duplicateDataduplicateData")


    return (
        <Modal
            size="lg"
            className="common-modal"
            isOpen={toogleDuplicateDataModel}
            toggle={handleDuplicateModelData}
        >

            < >
                <Button className="close-btn" onClick={handleCloseDuplicateDataModel}>
                    <IoClose />
                </Button>
                <ModalBody>
                    <Row>
                        {
                            duplicateDataList?.length && duplicateDataList?.map((each) => {
                                each = each?.data
                                return <Col
                                    md="12"
                                    lg="12"
                                    xl="4"
                                    xxl="4"
                                    className="mb-3 mb-xxl-0"
                                >

                                    <div className="profile-name-wrap">
                                        <div className="profile-img">
                                            <img
                                                className="img-fluid"
                                                src={
                                                    each?.photos?.length > 0
                                                        ? `${config.apiUrl}${each?.photos[0]?.upload_url}`
                                                        : profileUser
                                                }
                                                alt=""
                                            />

                                        </div>
                                        <h3>

                                            {each?.user?.first_name || ""}{" "}
                                            {each?.user?.last_name || ""}
                                            {each?.is_premium && (
                                                <span
                                                    className="premium-tag"
                                                    style={{
                                                        color: "#ea8c21",
                                                        fontSize: "20px",
                                                    }}
                                                >
                                                    {" "}
                                                    <GiQueenCrown />
                                                </span>
                                            )}
                                            {each?.is_approve && (
                                                <span
                                                    className="premium-tag"
                                                    style={{
                                                        color: "#ea8c21",
                                                        fontSize: "20px",
                                                    }}
                                                >
                                                    {" "}
                                                    <MdVerified />
                                                </span>
                                            )}
                                        </h3>

                                        <h5>
                                            <div className="member-code">
                                                {" "}
                                                {each?.code || "N/A"}
                                            </div>

                                        </h5>
                                    </div>
                                    <Button className="" onClick={() => handleRemoveDuplicate(each?.id)}>
                                        <FaTrash />
                                    </Button>

                                </Col >
                            })
                        }


                    </Row >






                </ModalBody>
            </>
        </Modal>
    );
};

export default DuplicateDataModel;
