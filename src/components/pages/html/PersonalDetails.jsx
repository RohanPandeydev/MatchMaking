import React from 'react'
import Wrapper from '../../layouts/Wrapper'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import PersonalDetailsPhoto from "../../../assets/images/personal-details-photo.png";

const PersonalDetails = () => {
  return (
    <Wrapper>
        <div className="saas-body personal-details-wrapper">
            <div className="saas-body-inner">
                <div className="personal-details-heading">
                    <Row className="align-items-center">
                        <Col xs="12" xl="6" className="mb-4">
                            <h3>Personal Details</h3>
                        </Col>
                        <Col xs="12" xl="6" className="mb-4">
                            <div className="personal-details-right-side">
                                <ul>
                                    <li>Subscription </li>
                                    <li><div className="subscription-name">Pro Light <IoMdCheckmarkCircle /></div></li>
                                    <li>20-06-2024</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col xs="12" xl="3" xxl="2" className="mb-4 mb-xl-0">
                        <div className="personal-photo-add">
                            
                            <Label className="add-photo-choose-file">
                                <div className="add-photo-box">
                                    <img className="img-fluid" src={PersonalDetailsPhoto} alt="" />
                                </div>
                                <h4>Add Photo</h4>
                                <Input type='file' />
                            </Label>
                            
                        </div>
                    </Col>
                    <Col xs="12" xl="9" xxl="10">
                        <Row>
                            <Col xs="12" lg="6" >
                            <FormGroup className="common-formgroup">
                                <Label> Gender* </Label>
                                <ul className="common-radio-btn mt-3">
                                    <li>
                                        <Input
                                            id="GenderFemale"
                                            name="Gender"
                                            type="radio"
                                        />
                                        <Label for="GenderFemale"> Female </Label>
                                    </li>
                                    <li>
                                        <Input
                                            id="GenderMale"
                                            name="Gender"
                                            type="radio"
                                        />
                                        <Label for="GenderMale"> Male </Label>
                                    </li>
                                    
                                </ul>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6" >
                                <FormGroup className="common-formgroup">
                                    <Label> Name </Label>
                                    <Input id="" name="" type="text" placeholder="|"/>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6" >
                                <FormGroup className="common-formgroup">
                                    <Label> Email </Label>
                                    <Input id="" name="" type="email" placeholder="|"/>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6" >
                                <FormGroup className="common-formgroup">
                                    <Label> Phone </Label>
                                    <Input id="" name="" type="text" placeholder="|"/>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6" >
                                <FormGroup className="common-formgroup">
                                    <Label> Country* </Label>
                                    <Input id="" name="" type="select" >
                                        <option>
                                        Canada
                                        </option>
                                        <option>
                                            1
                                        </option>
                                        <option>
                                            2
                                        </option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6" >
                                <FormGroup className="common-formgroup">
                                    <Label> City* </Label>
                                    <Input id="" name="" type="select" >
                                        <option>
                                        Montreal
                                        </option>
                                        <option>
                                            1
                                        </option>
                                        <option>
                                            2
                                        </option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup className="common-formgroup text-end">
                                    <Button className="btn btn-style1 px-4 py-2">Next</Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    </Wrapper>
  )
}

export default PersonalDetails
