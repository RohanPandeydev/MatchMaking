import React from 'react'
import Slider from "react-slick";
import { Button, Col, Row, Table } from 'reactstrap'
import { IoClose } from 'react-icons/io5'
import { IoMdCheckmark } from 'react-icons/io'
import { GoPlus } from 'react-icons/go'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import Wrapper from '../../layouts/Wrapper'
import { useNavigate } from 'react-router-dom'

const Subscription = () => {
    var Subscription = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        
        responsive: [
          {
            breakpoint: 1250,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };
  return (
    
    <Wrapper>
        <div className="common-db-head mb-4">
            <Row className="align-items-center">
                <Col md="6">
                    <h4>Subscription</h4>
                </Col>
                <Col md="6" className="text-end">
                    <Button className="btn btn-style1" >Add +</Button>
                </Col>
            </Row>
        </div>
        <div className="subscription-pricing-wrap">
            <Row>
                <Col xs="3" md="3" xxl="2">
                    <div className="subscription-left-wrap">
                        <div className="cost-row">

                        </div>
                        <div className="compare-item-row">
                            <h4>No. Of Data</h4>
                        </div>
                        <div className="compare-item-row">
                            <h4>No. Of <br/>
                            Subscription </h4>
                        </div>
                        <div className="compare-item-row">
                            <h4>Payment  Method </h4>
                        </div>
                        <div className="compare-item-row">
                            <h4>Domain Setup </h4>
                        </div>
                        <div className="subscription-btn-wrap">
                            
                        </div>
                    </div>
                </Col>
                <Col xs="9" md="9" xxl="10" className="mb-5">
                    <Slider {...Subscription}>
                        <div className="subscription-items">
                            <div className="subscription-list-wrap">
                                <div className="cost-row">
                                    <h3 className="subscription-name pro-lite"><span>Pro Lite</span></h3>
                                    <h4 className="subscription-price">20.00 ca$</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4>10,000</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4>5</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4>paytm</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4><IoClose /></h4>
                                </div>
                                <div className="subscription-btn-wrap">
                                    <ul className="pricing-button">
                                        <li className="subc-add">
                                            <Button className="subc-add-btn"> <span className="text">Add Subscription</span> <span className="icon"><GoPlus /></span></Button>
                                        </li>
                                        <li className="subc-edit">
                                            <Button className="subc-edit-btn"><FiEdit /></Button>
                                        </li>
                                        <li className="subc-del">
                                            <Button className="subc-del-btn"> <RiDeleteBin6Line /></Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="subscription-items">
                            <div className="subscription-list-wrap">
                                <div className="cost-row">
                                    <h3 className="subscription-name pro"><span>Pro </span></h3>
                                    <h4 className="subscription-price">40.00 ca$</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4>20,000</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4>18</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4>paytm</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4> <IoMdCheckmark /></h4>
                                </div>
                                <div className="subscription-btn-wrap">
                                    <ul className="pricing-button">
                                        <li className="subc-add">
                                            <Button className="subc-add-btn"> <span className="text">Add Subscription</span> <span className="icon"><GoPlus /></span></Button>
                                        </li>
                                        <li className="subc-edit">
                                            <Button className="subc-edit-btn"><FiEdit /></Button>
                                        </li>
                                        <li className="subc-del">
                                            <Button className="subc-del-btn"> <RiDeleteBin6Line /></Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="subscription-items">
                            <div className="subscription-list-wrap">
                                <div className="cost-row">
                                    <h3 className="subscription-name pro-max"><span>Pro Max</span></h3>
                                    <h4 className="subscription-price">40.00 ca$</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4>30,000</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4>35</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4>paytm</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4> <IoMdCheckmark /></h4>
                                </div>
                                <div className="subscription-btn-wrap">
                                    <ul className="pricing-button">
                                        <li className="subc-add">
                                            <Button className="subc-add-btn"> <span className="text">Add Subscription</span> <span className="icon"><GoPlus /></span></Button>
                                        </li>
                                        <li className="subc-edit">
                                            <Button className="subc-edit-btn"><FiEdit /></Button>
                                        </li>
                                        <li className="subc-del">
                                            <Button className="subc-del-btn"> <RiDeleteBin6Line /></Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="subscription-items">
                            <div className="subscription-list-wrap">
                                <div className="cost-row">
                                    <h3 className="subscription-name pro-max"><span>Pro Max</span></h3>
                                    <h4 className="subscription-price">40.00 ca$</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4>30,000</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4>35</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4>paytm</h4>
                                </div>
                                <div className="compare-item-row">
                                    <h4> <IoMdCheckmark /></h4>
                                </div>
                                <div className="subscription-btn-wrap">
                                    <ul className="pricing-button">
                                        <li className="subc-add">
                                            <Button className="subc-add-btn"> <span className="text">Add Subscription</span> <span className="icon"><GoPlus /></span></Button>
                                        </li>
                                        <li className="subc-edit">
                                            <Button className="subc-edit-btn"><FiEdit /></Button>
                                        </li>
                                        <li className="subc-del">
                                            <Button className="subc-del-btn"> <RiDeleteBin6Line /></Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Slider>
                    
                </Col>
            </Row>

            
        </div>
    </Wrapper>
  )
}

export default Subscription
