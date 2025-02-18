import React from 'react'
import Wrapper from '../../layouts/Wrapper'
import { Button, Col, FormGroup, Input, Row } from 'reactstrap'
import { IoCallOutline, IoImagesOutline, IoLocationOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { LuMailOpen } from 'react-icons/lu'
import { FiPlus } from 'react-icons/fi'
import { FaRegComments } from 'react-icons/fa'
import { AiOutlineEdit } from 'react-icons/ai'
import { BiMessageDetail } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import profileUser from "../../../assets/images/no-images-available.jpg";
import { TbGenderFemale } from 'react-icons/tb'

const ApprovedCustomer = () => {
  return (
    <Wrapper>
      <div className="approved-customer-wrapper">


            <div className="view-profile-list">
                <div className="view-profile-content">
                    <div className="profile-img-wrap">
                        <div className="checkbox">
                        <FormGroup>
                            <Input id="select-all" type="checkbox" />
                        </FormGroup>
                        </div>
                        <div className="profile-img-box online">
                            <div className="profile-img">
                                <img className="img-fluid" src={profileUser} alt="" />
                                <div className="profile-hover">
                                    <Link to="/"><IoImagesOutline /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-details-wrap">
                        <div className="profile-details-top">
                            <Row>
                                <Col md="12" lg="12" xl="12" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-name-wrap">
                                        <h3>Praveen Bommannavar</h3>
                                        <h5>NMGH245903</h5>
                                        <div className="interest mt-4">
                                            <span className="interest-name">Interest </span> <span className="interest-color orange">Orange</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-contact-wrap">
                                        <div className="contact-list">
                                            <div className="icon">
                                                <TbGenderFemale />
                                            </div>
                                            <div className="info">
                                                <p>Male</p>
                                            </div>
                                        </div>
                                        <div className="contact-list">
                                            <div className="icon">
                                                <IoLocationOutline />
                                            </div>
                                            <div className="info">
                                                <p>Aland Islands</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-contact-wrap">
                                        <div className="contact-list">
                                            <div className="icon">
                                                <LuMailOpen />
                                            </div>
                                            <div className="info">
                                                <p><a href="mailto:praveen@gmail.com">praveen@gmail.com</a></p>
                                            </div>
                                        </div>
                                        <div className="contact-list">
                                            <div className="icon">
                                                <IoCallOutline />
                                            </div>
                                            <div className="info">
                                                <p><a href="tel:+1 9568 2356">+1 9568 2356</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-status-wrap">
                                        <p><span>Registerd On :</span> June 16, 2021 12:28 AM</p>
                                        <p><span>Next Followup Date :</span> N/A</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="profile-button-wrap">
                        <ul>
                            <li>
                                <Button className="btn dark-blue-btn"> <FiPlus /></Button>
                            </li>
                            <li>
                                <Button className="btn yellow-btn"> <FaRegComments /></Button>
                            </li>
                            <li>
                                <Button className="btn light-green-btn"> <AiOutlineEdit /> </Button>
                            </li>
                            <li>
                                <Button className="btn blue-btn"> <BiMessageDetail /> </Button>
                            </li>
                            <li>
                                <Button className="btn btn-outline-style1"> <RiDeleteBin6Line /> </Button>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
            <div className="view-profile-list">
                <div className="view-profile-content">
                    <div className="profile-img-wrap">
                        <div className="checkbox">
                        <FormGroup>
                            <Input id="select-all" type="checkbox" />
                        </FormGroup>
                        </div>
                        <div className="profile-img-box online">
                            <div className="profile-img">
                                <img className="img-fluid" src={profileUser} alt="" />
                                <div className="profile-hover">
                                    <Link to="/"><IoImagesOutline /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-details-wrap">
                        <div className="profile-details-top">
                            <Row>
                                <Col md="12" lg="12" xl="12" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-name-wrap">
                                        <h3>Praveen Bommannavar</h3>
                                        <h5>NMGH245903</h5>
                                        <div className="interest mt-4">
                                            <span className="interest-name">Interest </span> <span className="interest-color blue">Blue</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-contact-wrap">
                                        <div className="contact-list">
                                            <div className="icon">
                                                <TbGenderFemale />
                                            </div>
                                            <div className="info">
                                                <p>Male</p>
                                            </div>
                                        </div>
                                        <div className="contact-list">
                                            <div className="icon">
                                                <IoLocationOutline />
                                            </div>
                                            <div className="info">
                                                <p>Aland Islands</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-contact-wrap">
                                        <div className="contact-list">
                                            <div className="icon">
                                                <LuMailOpen />
                                            </div>
                                            <div className="info">
                                                <p><a href="mailto:praveen@gmail.com">praveen@gmail.com</a></p>
                                            </div>
                                        </div>
                                        <div className="contact-list">
                                            <div className="icon">
                                                <IoCallOutline />
                                            </div>
                                            <div className="info">
                                                <p><a href="tel:+1 9568 2356">+1 9568 2356</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-status-wrap">
                                        <p><span>Registerd On :</span> June 16, 2021 12:28 AM</p>
                                        <p><span>Next Followup Date :</span> N/A</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="profile-button-wrap">
                        <ul>
                            <li>
                                <Button className="btn dark-blue-btn"> <FiPlus /></Button>
                            </li>
                            <li>
                                <Button className="btn yellow-btn"> <FaRegComments /></Button>
                            </li>
                            <li>
                                <Button className="btn light-green-btn"> <AiOutlineEdit /> </Button>
                            </li>
                            <li>
                                <Button className="btn blue-btn"> <BiMessageDetail /> </Button>
                            </li>
                            <li>
                                <Button className="btn btn-outline-style1"> <RiDeleteBin6Line /> </Button>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
            <div className="view-profile-list">
                <div className="view-profile-content">
                    <div className="profile-img-wrap">
                        <div className="checkbox">
                        <FormGroup>
                            <Input id="select-all" type="checkbox" />
                        </FormGroup>
                        </div>
                        <div className="profile-img-box online">
                            <div className="profile-img">
                                <img className="img-fluid" src={profileUser} alt="" />
                                <div className="profile-hover">
                                    <Link to="/"><IoImagesOutline /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-details-wrap">
                        <div className="profile-details-top">
                            <Row>
                                <Col md="12" lg="12" xl="12" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-name-wrap">
                                        <h3>Praveen Bommannavar</h3>
                                        <h5>NMGH245903</h5>
                                        <div className="interest mt-4">
                                            <span className="interest-name">Interest </span> <span className="interest-color red">Red</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-contact-wrap">
                                        <div className="contact-list">
                                            <div className="icon">
                                                <TbGenderFemale />
                                            </div>
                                            <div className="info">
                                                <p>Male</p>
                                            </div>
                                        </div>
                                        <div className="contact-list">
                                            <div className="icon">
                                                <IoLocationOutline />
                                            </div>
                                            <div className="info">
                                                <p>Aland Islands</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-contact-wrap">
                                        <div className="contact-list">
                                            <div className="icon">
                                                <LuMailOpen />
                                            </div>
                                            <div className="info">
                                                <p><a href="mailto:praveen@gmail.com">praveen@gmail.com</a></p>
                                            </div>
                                        </div>
                                        <div className="contact-list">
                                            <div className="icon">
                                                <IoCallOutline />
                                            </div>
                                            <div className="info">
                                                <p><a href="tel:+1 9568 2356">+1 9568 2356</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-status-wrap">
                                        <p><span>Registerd On :</span> June 16, 2021 12:28 AM</p>
                                        <p><span>Next Followup Date :</span> N/A</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="profile-button-wrap">
                        <ul>
                            <li>
                                <Button className="btn dark-blue-btn"> <FiPlus /></Button>
                            </li>
                            <li>
                                <Button className="btn yellow-btn"> <FaRegComments /></Button>
                            </li>
                            <li>
                                <Button className="btn light-green-btn"> <AiOutlineEdit /> </Button>
                            </li>
                            <li>
                                <Button className="btn blue-btn"> <BiMessageDetail /> </Button>
                            </li>
                            <li>
                                <Button className="btn btn-outline-style1"> <RiDeleteBin6Line /> </Button>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
            <div className="view-profile-list">
                <div className="view-profile-content">
                    <div className="profile-img-wrap">
                        <div className="checkbox">
                        <FormGroup>
                            <Input id="select-all" type="checkbox" />
                        </FormGroup>
                        </div>
                        <div className="profile-img-box online">
                            <div className="profile-img">
                                <img className="img-fluid" src={profileUser} alt="" />
                                <div className="profile-hover">
                                    <Link to="/"><IoImagesOutline /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-details-wrap">
                        <div className="profile-details-top">
                            <Row>
                                <Col md="12" lg="12" xl="12" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-name-wrap">
                                        <h3>Praveen Bommannavar</h3>
                                        <h5>NMGH245903</h5>
                                        <div className="interest mt-4">
                                            <span className="interest-name">Interest </span> <span className="interest-color green">Green</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-contact-wrap">
                                        <div className="contact-list">
                                            <div className="icon">
                                                <TbGenderFemale />
                                            </div>
                                            <div className="info">
                                                <p>Male</p>
                                            </div>
                                        </div>
                                        <div className="contact-list">
                                            <div className="icon">
                                                <IoLocationOutline />
                                            </div>
                                            <div className="info">
                                                <p>Aland Islands</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-contact-wrap">
                                        <div className="contact-list">
                                            <div className="icon">
                                                <LuMailOpen />
                                            </div>
                                            <div className="info">
                                                <p><a href="mailto:praveen@gmail.com">praveen@gmail.com</a></p>
                                            </div>
                                        </div>
                                        <div className="contact-list">
                                            <div className="icon">
                                                <IoCallOutline />
                                            </div>
                                            <div className="info">
                                                <p><a href="tel:+1 9568 2356">+1 9568 2356</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-status-wrap">
                                        <p><span>Registerd On :</span> June 16, 2021 12:28 AM</p>
                                        <p><span>Next Followup Date :</span> N/A</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="profile-button-wrap">
                        <ul>
                            <li>
                                <Button className="btn dark-blue-btn"> <FiPlus /></Button>
                            </li>
                            <li>
                                <Button className="btn yellow-btn"> <FaRegComments /></Button>
                            </li>
                            <li>
                                <Button className="btn light-green-btn"> <AiOutlineEdit /> </Button>
                            </li>
                            <li>
                                <Button className="btn blue-btn"> <BiMessageDetail /> </Button>
                            </li>
                            <li>
                                <Button className="btn btn-outline-style1"> <RiDeleteBin6Line /> </Button>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
      </div>
    </Wrapper>
  )
}

export default ApprovedCustomer
