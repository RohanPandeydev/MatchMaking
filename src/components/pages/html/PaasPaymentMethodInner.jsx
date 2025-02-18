import React from 'react'
import Wrapper from '../../layouts/Wrapper'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import razorpayImg from "../../../assets/images/razorpay-img.png";
import stripeImg from "../../../assets/images/stripe-img.png";

const PaasPaymentMethodInner = () => {
  return (
    <Wrapper>
        <div className="saas-body payment-method-wrapper">
            <div className="common-db-head mb-2">
                <Row className="align-items-center">
                    <Col md="6">
                        <h2>Payment Method </h2>
                    </Col>
                </Row>
            </div>
            <div className="saas-body-inner pb-5">
                <div className="payment-method-active-form-wrap">
                    <Row>
                        <Col md="6" lg="5">
                            <div className="payment-method-left-img">
                                <img className="img-fluid" src={stripeImg} alt="" />
                            </div>
                        </Col>
                        <Col md="6" lg="7">
                            <div className="payment-method-active-form">
                                <FormGroup className="common-formgroup">
                                    <Label> Key </Label>
                                    <Input id="" name="" type="text" placeholder="|"/>
                                </FormGroup>
                                <FormGroup className="common-formgroup">
                                    <Label> Secret Key </Label>
                                    <Input id="" name="" type="text" placeholder="|"/>
                                </FormGroup>
                                <FormGroup className="common-formgroup">
                                    <Button className="btn btn-style1 px-4 py-2">Activate </Button>
                                </FormGroup>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    </Wrapper>
  )
}

export default PaasPaymentMethodInner
