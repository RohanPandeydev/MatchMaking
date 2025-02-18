import React, { useState } from 'react'
import Wrapper from '../../layouts/Wrapper'
import { Button, Col, Collapse, Row } from 'reactstrap'
import { LuMailOpen } from 'react-icons/lu'
import { AiOutlineEdit } from 'react-icons/ai'
import profileUser from "../../../assets/images/no-images-available.jpg";
import { IoCallOutline } from 'react-icons/io5'
import { FiPlus } from 'react-icons/fi'
import { HiMinus } from 'react-icons/hi'

const ApprovedCustomerView = () => {

    const [activeaccordionIndex,setActiveAccordianIndex]=useState(1)

    const handleAccordianToggle=(accordionIndex)=>{
        if (activeaccordionIndex === accordionIndex) {
            setActiveAccordianIndex(null); // Close if already open
          } else {
            setActiveAccordianIndex(accordionIndex); // Open the clicked one
          }
    }

  return (
    <Wrapper>
      <div className="approved-customer-view-wrapper">
        <div className="common-db-head mb-4">
            <Row className="align-items-center">
                <Col xl="4" xxl="3">
                    <Button className="btn green-btn px-3 py-2 me-2 mb-2 text-dark">Add Ticket</Button>
                    <Button className="btn btn-outline-style1 px-3 py-2 me-2 mb-2 text-dark">Add Ticket</Button>
                </Col>
                <Col xl="5" xxl="4">
                    <Button className="btn green-btn px-3 py-2 me-2 mb-2 text-dark">Add Comment </Button>
                    <Button className="btn btn-outline-style1 px-3 py-2 me-2 mb-2 text-dark">View Comment </Button>
                </Col>
                <Col xl="3" xxl="3">
                    <Button className="btn dark-blue-btn px-3 py-2 me-2 mb-2"><LuMailOpen /> </Button>
                    <Button className="btn orange-btn px-3 py-2 me-2 mb-2"><AiOutlineEdit /></Button>
                </Col>
            </Row>
        </div>
        <Row>
            <Col xl="4" xxl="4" className="mb-4">
                <div className="approved-customer-left-details">
                    <div className="approved-customer-profile-info">
                        <div className="profile-img">
                            <img className="img-fluid" src={profileUser} alt="" />
                        </div>
                        <div className="approved-customer-profile-details-info">
                            <h3>Praveen Bommannavar</h3>
                            <h5>NMGH245903</h5>
                            <p><LuMailOpen /> <a href="mailto:praveen@gmail.com">praveen@gmail.com</a></p>
                            <p><IoCallOutline /> <a href="tel:+1 9568 2356">+1 9568 2356</a></p>
                        </div>
                    </div>
                    <div className="registerd-followup-date-wrap">
                        <p><strong>Registerd On :</strong> June 16, 2021     12:28 AM</p>
                        <p><strong>Next Followup Date :</strong> N/A</p>
                    </div>
                </div>
            </Col>
            <Col xl="8" xxl="8">
                <div className="profile-details-accordion-list">
                    <div className="profile-dtls-accordion-head">
                        <div className="left-heading">
                            <h4>Basic Infomation</h4>
                        </div>
                        <div className="toggle-btn">
                        <Button onClick={() => handleAccordianToggle(1)}>
                            {
                                activeaccordionIndex==1?<span className="minus"><HiMinus /></span>:<span className="plus"><FiPlus  /></span>
                            
                            }
                        </Button>
                        </div>
                    </div>
                    
                    <Collapse isOpen={activeaccordionIndex === 1}
                        >
                        <div className="profile-details-accordion-body">
                            <Row>
                                <Col lg="6" xl="6">
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Name :</span> Praveen Bommannavar</h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Gender :</span> Male</h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Country:</span> Aland Islands</h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Interest:</span> <Button className="orange px-3 py-0">Orange</Button></h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Assign Date:</span> N/A</h4>
                                    </div>
                                    
                                </Col>
                                <Col lg="6" xl="6">
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Is Registerd:</span> No</h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Phone:</span> +1 9568 2356</h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Phone2:</span> +1 9568 2356</h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Phone3:</span> +1 9568 2356</h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Phone4:</span> +1 9568 2356</h4>
                                    </div>
                                    
                                </Col>
                            </Row>
                        </div>
                    </Collapse>
                </div>

                <div className="profile-details-accordion-list">
                    <div className="profile-dtls-accordion-head">
                        <div className="left-heading">
                            <h4>View Comments</h4>
                        </div>
                        <div className="toggle-btn">
                        <Button onClick={() => handleAccordianToggle(2)}>
                            {
                                activeaccordionIndex==2?<span className="minus"><HiMinus /></span>:<span className="plus"><FiPlus  /></span>
                            }
                        </Button>
                        </div>
                    </div>
                    
                    <Collapse isOpen={activeaccordionIndex === 2} >
                        <div className="profile-details-accordion-body">
                            <Row>
                                <Col lg="6" xl="6">
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Name :</span> Praveen Bommannavar</h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Gender :</span> Male</h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Country:</span> Aland Islands</h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Interest:</span> <Button className="orange px-3 py-0">Orange</Button></h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Assign Date:</span> N/A</h4>
                                    </div>
                                    
                                </Col>
                                <Col lg="6" xl="6">
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Is Registerd:</span> No</h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Phone:</span> +1 9568 2356</h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Phone2:</span> +1 9568 2356</h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Phone3:</span> +1 9568 2356</h4>
                                    </div>
                                    <div className="approved-customer-view-info-list">
                                        <h4><span>Phone4:</span> +1 9568 2356</h4>
                                    </div>
                                    
                                </Col>
                            </Row>
                        </div>
                    </Collapse>
                </div>
                <div className="mt-5">
                    <Button className="btn btn-style1 px-5 py-3 fs-5">Back</Button>
                </div>
            </Col>
        </Row>
      </div>
    </Wrapper>
  )
}

export default ApprovedCustomerView
