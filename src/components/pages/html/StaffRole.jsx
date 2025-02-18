import React from 'react'
import Wrapper from '../../layouts/Wrapper'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { FiPlus } from 'react-icons/fi'
import { LiaEdit } from 'react-icons/lia'

const StaffRole = () => {
  return (
    <Wrapper>
        <div className="common-db-head all-staff-head mb-3">
            <Row>
                <Col xs="12" lg="6" className="mb-3 mb-lg-0">
                    <ul className="common-head-list">
                        <li>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                                <Label for="select-all">Select All</Label>
                            </FormGroup>
                        </li>
                        <li className="delete-btn">
                            <Button className="btn btn-outline-style1">
                                <RiDeleteBin6Line />
                            </Button>
                        </li>
                        <li className="like-btn">
                            <Button className="btn green-btn">
                                <AiOutlineLike />
                            </Button>
                        </li>
                        <li className="dislike-btn">
                            <Button className="btn btn-outline-style1">
                                <AiOutlineDislike />
                            </Button>
                        </li>
                    </ul>
                </Col>
                <Col xs="12" lg="6">
                    <ul className="common-head-list justify-content-lg-end">
                        <li>
                            <Input id="" name="" type="select">
                                <option>Select Interest</option>
                                <option>Paid (168)</option>
                                <option>Featured (0)</option>
                                <option>All (374)</option>
                            </Input>
                        </li>
                        <li>
                            <Button className="btn btn-style1">
                                Add <FiPlus />
                            </Button>
                        </li>
                        
                    </ul>
                </Col>
            </Row>
        </div>

        <div className="staff-role-list">
            <div className="staff-role-head">
                <Row>
                    <Col xs="12" lg="6">
                        <div className="staff-role-checkbox">
                            <FormGroup className="mb-0 mb-lg-0">
                                <Input id="Marketing" type="checkbox" />
                                <Label htmlFor="Marketing">BPO Marketing ( Marketing )</Label>
                            </FormGroup>
                        </div>
                    </Col>
                    <Col xs="12" lg="6">
                        <div className="staff-role-button">
                            <ul className="justify-content-lg-end">
                                <li>
                                    <Button className="btn blue-btn"> <LiaEdit /> <span>Edit Staff Role</span></Button>
                                </li>
                                <li>
                                    <Button className="btn green-btn"> <AiOutlineLike /> <span>Edit Staff Role</span></Button>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="staff-role-details-wrap">
                <Row>
                    <Col xs="12" lg="6" xl="4" className="mb-4">
                        <div className="staff-details-list-wrap">
                            <div className="staff-details-list">
                                <div className="name">
                                Add Member:
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                View Member:  
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Edit Member:
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Add Email Template: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                View Contact:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Add comment to customer:  
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Appointment:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Attendance:   
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                User To Admin Message: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Blog:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Show Staff Detail:   
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Credit Limit:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Auto Match:  
                                </div>
                                <div className="info">
                                N/A
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Photos:
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Video:  
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Horoscope:
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Express interest and message:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" lg="6" xl="4" className="mb-4">
                        <div className="staff-details-list-wrap">
                            <div className="staff-details-list">
                                <div className="name">
                                View Customer:
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Customer Activity: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Sales Report: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Print Profile:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                View Email:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Amritsar Appointment:  
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Conset Form: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Coupon:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Membership Plan:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Email and SMS: 
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Quick Email: 
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Ematch: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Exclusive Member: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Matrimony Data: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Priotity:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Whatsapp Message: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            
                        </div>
                    </Col>
                    <Col xs="12" lg="6" xl="4" className="mb-4">
                        <div className="staff-details-list-wrap">
                            <div className="staff-details-list">
                                <div className="name">
                                Edit Membership Plan:Manage Succss
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Story:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Delete Member:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Add comment to member:
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Renew Memberhip:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Inactive To Active: 
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Active To Inactive: 
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Active To Paid: 
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Paid To Featured:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Suspend Member:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Match Making Mail:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Ematch Edit:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Site Map:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Review Rating:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Personalize Service: 
                                </div>
                                <div className="info">
                                Own
                                </div>
                            </div>
                                                        
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

        <div className="staff-role-list">
            <div className="staff-role-head">
                <Row>
                    <Col xs="12" lg="6">
                        <div className="staff-role-checkbox">
                            <FormGroup className="mb-0 mb-lg-0">
                                <Input id="Marketing" type="checkbox" />
                                <Label htmlFor="Marketing">BPO Marketing ( Marketing )</Label>
                            </FormGroup>
                        </div>
                    </Col>
                    <Col xs="12" lg="6">
                        <div className="staff-role-button">
                            <ul className="justify-content-lg-end">
                                <li>
                                    <Button className="btn blue-btn"> <LiaEdit /> <span>Edit Staff Role</span></Button>
                                </li>
                                <li>
                                    <Button className="btn green-btn"> <AiOutlineLike /> <span>Edit Staff Role</span></Button>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="staff-role-details-wrap">
                <Row>
                    <Col xs="12" lg="6" xl="4" className="mb-4">
                        <div className="staff-details-list-wrap">
                            <div className="staff-details-list">
                                <div className="name">
                                Add Member:
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                View Member:  
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Edit Member:
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Add Email Template: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                View Contact:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Add comment to customer:  
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Appointment:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Attendance:   
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                User To Admin Message: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Blog:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Show Staff Detail:   
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Credit Limit:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Auto Match:  
                                </div>
                                <div className="info">
                                N/A
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Photos:
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Video:  
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Horoscope:
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Express interest and message:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" lg="6" xl="4" className="mb-4">
                        <div className="staff-details-list-wrap">
                            <div className="staff-details-list">
                                <div className="name">
                                View Customer:
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Customer Activity: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Sales Report: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Print Profile:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                View Email:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Amritsar Appointment:  
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Conset Form: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Coupon:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Membership Plan:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Email and SMS: 
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Quick Email: 
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Ematch: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Exclusive Member: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Matrimony Data: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Priotity:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Whatsapp Message: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            
                        </div>
                    </Col>
                    <Col xs="12" lg="6" xl="4" className="mb-4">
                        <div className="staff-details-list-wrap">
                            <div className="staff-details-list">
                                <div className="name">
                                Edit Membership Plan:Manage Succss
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Story:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Delete Member:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Add comment to member:
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Renew Memberhip:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Inactive To Active: 
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Active To Inactive: 
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Active To Paid: 
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Paid To Featured:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Suspend Member:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Match Making Mail:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Ematch Edit:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Site Map:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Review Rating:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Personalize Service: 
                                </div>
                                <div className="info">
                                Own
                                </div>
                            </div>
                                                        
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

        <div className="staff-role-list">
            <div className="staff-role-head">
                <Row>
                    <Col xs="12" lg="6">
                        <div className="staff-role-checkbox">
                            <FormGroup className="mb-0 mb-lg-0">
                                <Input id="Marketing" type="checkbox" />
                                <Label htmlFor="Marketing">BPO Marketing ( Marketing )</Label>
                            </FormGroup>
                        </div>
                    </Col>
                    <Col xs="12" lg="6">
                        <div className="staff-role-button">
                            <ul className="justify-content-lg-end">
                                <li>
                                    <Button className="btn blue-btn"> <LiaEdit /> <span>Edit Staff Role</span></Button>
                                </li>
                                <li>
                                    <Button className="btn green-btn"> <AiOutlineLike /> <span>Edit Staff Role</span></Button>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="staff-role-details-wrap">
                <Row>
                    <Col xs="12" lg="6" xl="4" className="mb-4">
                        <div className="staff-details-list-wrap">
                            <div className="staff-details-list">
                                <div className="name">
                                Add Member:
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                View Member:  
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Edit Member:
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Add Email Template: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                View Contact:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Add comment to customer:  
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Appointment:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Attendance:   
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                User To Admin Message: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Blog:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Show Staff Detail:   
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Credit Limit:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Auto Match:  
                                </div>
                                <div className="info">
                                N/A
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Photos:
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Video:  
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Horoscope:
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Express interest and message:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" lg="6" xl="4" className="mb-4">
                        <div className="staff-details-list-wrap">
                            <div className="staff-details-list">
                                <div className="name">
                                View Customer:
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Customer Activity: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Sales Report: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Print Profile:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                View Email:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Amritsar Appointment:  
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Conset Form: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Coupon:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Membership Plan:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Email and SMS: 
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Quick Email: 
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Ematch: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Exclusive Member: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Matrimony Data: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Priotity:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Whatsapp Message: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            
                        </div>
                    </Col>
                    <Col xs="12" lg="6" xl="4" className="mb-4">
                        <div className="staff-details-list-wrap">
                            <div className="staff-details-list">
                                <div className="name">
                                Edit Membership Plan:Manage Succss
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Story:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Delete Member:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Add comment to member:
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Renew Memberhip:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Inactive To Active: 
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Active To Inactive: 
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Active To Paid: 
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Paid To Featured:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Suspend Member:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Match Making Mail:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Ematch Edit:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Site Map:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Review Rating:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Personalize Service: 
                                </div>
                                <div className="info">
                                Own
                                </div>
                            </div>
                                                        
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </Wrapper>
  )
}

export default StaffRole
