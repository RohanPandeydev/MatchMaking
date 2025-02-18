import React from 'react'
import Wrapper from '../../layouts/Wrapper'
import { Col, Row } from 'reactstrap'
import razorpayImg from "../../../assets/images/razorpay-img.png";
import paypalImg from "../../../assets/images/paypal-img.png";
import stripeImg from "../../../assets/images/stripe-img.png";
import { Link } from 'react-router-dom';
import { GoDotFill } from 'react-icons/go';
const PaasPaymentMethod = () => {
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
            <Row>
                <Col xs="12" md="4" lg="3" className="mb-3">
                    <Link to="/html/pass-payment-method-inner" className="payment-method-list">
                        <span className="payment-active"><GoDotFill /> Active</span>
                        <div className="payment-method-img">
                            <img className="img-fluid" src={stripeImg} alt="" />
                        </div>
                        <h5>Stripe</h5>
                    </Link>
                </Col>
                <Col xs="12" md="4" lg="3" className="mb-3">
                    <Link to="/html/pass-payment-method-inner" className="payment-method-list">
                        
                        <div className="payment-method-img">
                            <img className="img-fluid" src={razorpayImg} alt="" />
                        </div>
                        <h5>Razorpay</h5>
                    </Link>
                </Col>
                <Col xs="12" md="4" lg="3" className="mb-3">
                    <Link to="/html/pass-payment-method-inner" className="payment-method-list">
                        <div className="payment-method-img">
                            <img className="img-fluid" src={paypalImg} alt="" />
                        </div>
                        <h5>Paypal</h5>
                    </Link>
                </Col>
                
            </Row>
        </div>
      </div>
    </Wrapper>
  )
}

export default PaasPaymentMethod
