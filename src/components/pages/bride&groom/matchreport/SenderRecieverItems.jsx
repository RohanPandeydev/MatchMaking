import React from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { IoCallOutline } from 'react-icons/io5'
import { LuMailOpen } from 'react-icons/lu'
import { Button, Col, Progress, Row } from 'reactstrap'
import profileUser from "../../../../assets/images/no-images-available.jpg";
import config from '../../../../../config'
const SenderRecieverItems = ({ each, handleOffCanvas }) => {
    return (
        <div>
            <div className="match-profile-list">
                <div className="match-profile-img">
                    <img className="img-fluid" src={
                        each?.photos?.length > 0
                            ? `${each?.photos[0]?.upload_url}`
                            : profileUser
                    } alt="" />
                </div>
                <div className="match-profile-details">
                    <Row>
                        <Col md="12" lg="12" xl="2" className="mb-2 mb-xl-0">
                            <div className="match-profile-name-wrap">
                                <h3>
                                    {" "}
                                    {(each &&
                                        each?.user?.first_name) ||
                                        ""}{" "}
                                    {(each &&
                                        each?.user?.last_name) ||
                                        ""}{" "}
                                    <span className="verified-tag blue-color"></span>
                                </h3>
                                <div className="member-code">  {each?.code}</div>


                                {/* <h5>
                                    <div className="member-code">  {each?.total_score}</div>
                                </h5> */}
                                {/* <div className="match-profile-bar">
                                    <Progress value={each?.total_score || 0} />
                                    <h5>
                                        <span>{each?.total_score || 0}%</span> Match
                                    </h5>
                                </div> */}
                            </div>
                        </Col>
                        <Col md="12" lg="12" xl="6" className="mb-2 mb-xl-0">
                            <div className="match-profile-dtls-wrap">
                                <Row>
                                    <Col xs="12" xl="6" className="mb-1">
                                        <p>
                                            <span>Country :</span>{each?.country}
                                        </p>
                                    </Col>
                                    <Col xs="12" xl="6" className="mb-1">
                                        <p>
                                            <span>State :</span>{each?.state || ""}
                                        </p>
                                    </Col>
                                    <Col xs="12" xl="6" className="mb-1">
                                        <p>
                                            <span>City :</span> {each?.city || ""}
                                        </p>
                                    </Col>
                                    <Col xs="12" xl="6" className="mb-1">
                                        <p>
                                            <span>Marital Status :</span> {each?.marital_status || ""}
                                        </p>
                                    </Col>
                                    <Col xs="12" xl="6" className="mb-1">
                                        <p>
                                            <span>Religion :</span> {each?.religion || ""}
                                        </p>
                                    </Col>
                                    {/* <Col xs="12" xl="6" className="mb-1">
                <p>
                  <span>City :</span> Kolkata
                </p>
              </Col> */}
                                </Row>
                            </div>
                        </Col>
                        <Col md="12" lg="12" xl="4" className="mb-2 mb-xl-0">
                            <div className="match-profile-dtls-wrap match-profile-contact">
                                <div class="contact-list">
                                    <div class="icon">
                                        <LuMailOpen />
                                    </div>
                                    <div class="info">
                                        <p>
                                            {each &&
                                                each?.user?.email && (
                                                    <a
                                                        href={`mailto:${each?.user?.email}`}
                                                    >
                                                        {each?.user?.email || ""}
                                                    </a>
                                                )}
                                        </p>
                                    </div>
                                </div>
                                <div class="contact-list">
                                    <div class="icon">
                                        <IoCallOutline />
                                    </div>
                                    <div class="info">
                                        <p>
                                            {each &&
                                                each?.phone_code && (
                                                    <a
                                                        href={`tel:${each?.phone_code}${each?.phone}`}
                                                    >
                                                        {each?.phone_code}{" "}
                                                        {each?.phone}
                                                    </a>
                                                )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="view-details-btn">
                    <Button className="dark-blue-btn" onClick={(e) => handleOffCanvas(e, each)}>
                        {" "}
                        <AiOutlineEye />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SenderRecieverItems