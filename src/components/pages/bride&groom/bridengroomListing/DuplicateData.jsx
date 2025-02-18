import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { GiQueenCrown } from 'react-icons/gi'
import { MdVerified } from 'react-icons/md'
import { Button, Col, Row } from 'reactstrap'
import profileUser from "../../../../assets/images/no-images-available.jpg";
import config from '../../../../../config'
import { RiDeleteBin6Line } from 'react-icons/ri'

const DuplicateData = ({ duplicateDataList, brideandgroom, handleRemoveDuplicate }) => {
    return (
        <> <Row>
            <div className="col-12 mb-3 mt-3 text-center">
                <div className="modal-heading">
                    <h4>
                        {
                            duplicateDataList?.length == brideandgroom?.length ? (brideandgroom?.length == 1 ? "Duplicate Data Found" : "All Data  is Duplicate Found") : "Duplicate Data Found"
                        }
                    </h4>
                </div>
            </div>
            {
                duplicateDataList?.length && duplicateDataList?.map((each) => {
                    each = each?.data
                    return <Col
                        xs="12"
                        md="6"
                        lg="4"
                        xl="3"
                        className="mb-4"
                    >

                        <div className="share-profile-list">
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
                    </Col >
                })
            }
                <Col xs="12" className="text-end">
                    <Button className="btn btn-outline-style1" onClick={() => handleRemoveDuplicate()}>
                        Delete All
                    </Button>
                </Col>
            </Row></>
    )
}

export default DuplicateData