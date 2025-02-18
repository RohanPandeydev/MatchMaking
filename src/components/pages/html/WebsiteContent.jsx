import React, { useState } from 'react'
import Wrapper from '../../layouts/Wrapper'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import logo from "../../../assets/images/logo.png";
import BrideGroomImg from "../../../assets/images/bride-and-groom-list-img1.jpg";
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { IoMdCheckmark } from 'react-icons/io';
import { LiaEdit } from 'react-icons/lia';
import Slider from 'react-slick';
const WebsiteContent = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    var LandingSubscription = {
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
      <div className="saas-body">
        <div className="saas-body-inner">
            <div className="website-content-wrapper">
                <Row>
                    <Col xs="12" className="text-center mb-4">
                        <div className="logo">
                            <img className="img-fluid" src={logo} alt="" />
                        </div>
                    </Col>
                    <Col xs="12" className="mb-4">
                        <div className="add-banner-wrap">
                            <Label className="website-content-choose-file">
                                <b className="drag-drop-btn">
                                    <span className="icon">
                                        <BsFillPlusCircleFill />
                                    </span>
                                    <h4>Add Banner Here </h4>
                                </b>
                                <Input type='file' />
                            </Label>
                        </div>
                    </Col>
                    <Col lg="7" className="mb-4">
                        <div className="add-left-content-wrap">
                            <div className="add-left-content">
                                <h3>A Dream Elegant Wedding
                                Made Reality</h3>
                                <h4>Lorem ipsum dolor sit amet, consectetuer dolor sit</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis consectetur felis quis finibus. Fusce in pulvinar magna. Nunc non lobortis sem. In elementum nisl malesuada eros dignissim porta. Fusce vel tincidunt nisl.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis consectetur felis quis finibus. Fusce in pulvinar magna. Nunc non lobortis sem. In elementum nisl malesuada eros dignissim porta. Fusce vel tincidunt nisl.</p>
                            </div>
                            <Button className="add-left-content-btn" onClick={toggle}>
                                <h4>Add Text Here </h4><BsFillPlusCircleFill /> <LiaEdit />
                            </Button>
                        </div>
                    </Col>
                    <Col lg="5" className="mb-4">
                        <div className="add-right-img">
                            <Label className="website-content-choose-file">
                                <b className="drag-drop-btn">
                                    <span className="icon">
                                        <BsFillPlusCircleFill />
                                    </span>
                                    <h4>Add Image Here </h4>
                                </b>
                                <Input type='file' />
                            </Label>
                        </div>
                    </Col>
                    <Col xs="12" className="mt-5 mb-4 text-center">
                        <div className="website-content-title">
                            <h3>Bride and Groom List </h3>
                        </div>
                    </Col>
                    <Col xs="12" md="12" lg="6" xl="4" xxl="3" className="mb-4">
                        <div className="bride-groom-list">
                            <div className="bride-groom-img">
                                <img className="img-fluid" src={BrideGroomImg} alt="" />
                            </div>
                            <div className="bride-groom-content">
                                <div className="name">
                                    <h4>Jhon Joe</h4>
                                </div>
                                <div className="religion-caste">
                                    <p>Religion : <strong>Hindu</strong></p>
                                    <p>caste :  <strong>Brahmins</strong></p>
                                </div>
                                <div className="age-hight">
                                    <p>Age : <strong>32</strong></p>
                                    <p>Hight : <strong>5.6</strong></p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" md="12" lg="6" xl="4" xxl="3" className="mb-4">
                        <div className="bride-groom-list">
                            <div className="bride-groom-img">
                                <img className="img-fluid" src={BrideGroomImg} alt="" />
                            </div>
                            <div className="bride-groom-content">
                                <div className="name">
                                    <h4>Jhon Joe</h4>
                                </div>
                                <div className="religion-caste">
                                    <p>Religion : <strong>Hindu</strong></p>
                                    <p>caste :  <strong>Brahmins</strong></p>
                                </div>
                                <div className="age-hight">
                                    <p>Age : <strong>32</strong></p>
                                    <p>Hight : <strong>5.6</strong></p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" md="12" lg="6" xl="4" xxl="3" className="mb-4">
                        <div className="bride-groom-list">
                            <div className="bride-groom-img">
                                <img className="img-fluid" src={BrideGroomImg} alt="" />
                            </div>
                            <div className="bride-groom-content">
                                <div className="name">
                                    <h4>Jhon Joe</h4>
                                </div>
                                <div className="religion-caste">
                                    <p>Religion : <strong>Hindu</strong></p>
                                    <p>caste :  <strong>Brahmins</strong></p>
                                </div>
                                <div className="age-hight">
                                    <p>Age : <strong>32</strong></p>
                                    <p>Hight : <strong>5.6</strong></p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" md="12" lg="6" xl="4" xxl="3" className="mb-4">
                        <div className="bride-groom-list">
                            <div className="bride-groom-img">
                                <img className="img-fluid" src={BrideGroomImg} alt="" />
                            </div>
                            <div className="bride-groom-content">
                                <div className="name">
                                    <h4>Jhon Joe</h4>
                                </div>
                                <div className="religion-caste">
                                    <p>Religion : <strong>Hindu</strong></p>
                                    <p>caste :  <strong>Brahmins</strong></p>
                                </div>
                                <div className="age-hight">
                                    <p>Age : <strong>32</strong></p>
                                    <p>Hight : <strong>5.6</strong></p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" md="12" lg="6" xl="4" xxl="3" className="mb-4">
                        <div className="bride-groom-list">
                            <div className="bride-groom-img">
                                <img className="img-fluid" src={BrideGroomImg} alt="" />
                            </div>
                            <div className="bride-groom-content">
                                <div className="name">
                                    <h4>Jhon Joe</h4>
                                </div>
                                <div className="religion-caste">
                                    <p>Religion : <strong>Hindu</strong></p>
                                    <p>caste :  <strong>Brahmins</strong></p>
                                </div>
                                <div className="age-hight">
                                    <p>Age : <strong>32</strong></p>
                                    <p>Hight : <strong>5.6</strong></p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" md="12" lg="6" xl="4" xxl="3" className="mb-4">
                        <div className="bride-groom-list">
                            <div className="bride-groom-img">
                                <img className="img-fluid" src={BrideGroomImg} alt="" />
                            </div>
                            <div className="bride-groom-content">
                                <div className="name">
                                    <h4>Jhon Joe</h4>
                                </div>
                                <div className="religion-caste">
                                    <p>Religion : <strong>Hindu</strong></p>
                                    <p>caste :  <strong>Brahmins</strong></p>
                                </div>
                                <div className="age-hight">
                                    <p>Age : <strong>32</strong></p>
                                    <p>Hight : <strong>5.6</strong></p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" md="12" lg="6" xl="4" xxl="3" className="mb-4">
                        <div className="bride-groom-list">
                            <div className="bride-groom-img">
                                <img className="img-fluid" src={BrideGroomImg} alt="" />
                            </div>
                            <div className="bride-groom-content">
                                <div className="name">
                                    <h4>Jhon Joe</h4>
                                </div>
                                <div className="religion-caste">
                                    <p>Religion : <strong>Hindu</strong></p>
                                    <p>caste :  <strong>Brahmins</strong></p>
                                </div>
                                <div className="age-hight">
                                    <p>Age : <strong>32</strong></p>
                                    <p>Hight : <strong>5.6</strong></p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" md="12" lg="6" xl="4" xxl="3" className="mb-4">
                        <div className="bride-groom-list">
                            <div className="bride-groom-img">
                                <img className="img-fluid" src={BrideGroomImg} alt="" />
                            </div>
                            <div className="bride-groom-content">
                                <div className="name">
                                    <h4>Jhon Joe</h4>
                                </div>
                                <div className="religion-caste">
                                    <p>Religion : <strong>Hindu</strong></p>
                                    <p>caste :  <strong>Brahmins</strong></p>
                                </div>
                                <div className="age-hight">
                                    <p>Age : <strong>32</strong></p>
                                    <p>Hight : <strong>5.6</strong></p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" className="mt-5 mb-4 text-center">
                        <div className="website-content-title">
                            <h3>Subscription  </h3>
                        </div>
                    </Col>
                    <Col xs="12">
                        <div className="subscription-pricing-wrap">
                            {/* <Row>
                                <Col xs="12" md="12" lg="6" xl="4" className="mb-4">
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
                                        
                                    </div>
                                </Col>
                                <Col xs="12" md="12" lg="6" xl="4" className="mb-4">
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
                                        
                                    </div>
                                </Col>
                                <Col xs="12" md="12" lg="6" xl="4" className="mb-4">
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
                                        
                                    </div>
                                </Col>
                            </Row> */}

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
                                        
                                    </div>
                                </Col>
                                <Col xs="9" md="9" xxl="10" className="mb-5">
                                    <Slider {...LandingSubscription}>
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
                                                
                                            </div>
                                        </div>
                                        <div className="subscription-items">
                                            <div className="subscription-list-wrap active">
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
                                                
                                            </div>
                                        </div>
                                    </Slider>
                                </Col>

                                <Col xs="12" className="mt-4">
                                    <Row>
                                        <Col xs="12" md="6" lg="4" xl="3" className="mb-4">
                                            <div className="selected-subscription-list">
                                                <h3 className="pro-lite"><span>Pro Max</span></h3>
                                                <h4>6 Month</h4>
                                                <h5>600.00 CA$</h5>
                                            </div>
                                        </Col>
                                        <Col xs="12" md="6" lg="4" xl="3" className="mb-4">
                                            <div className="selected-subscription-list">
                                                <h3 className="pro-lite"><span>Pro Max</span></h3>
                                                <h4>6 Month</h4>
                                                <h5>600.00 CA$</h5>
                                            </div>
                                        </Col>
                                        <Col xs="12" md="6" lg="4" xl="3" className="mb-4">
                                            <div className="selected-subscription-list">
                                                <h3 className="pro-lite"><span>Pro Max</span></h3>
                                                <h4>6 Month</h4>
                                                <h5>600.00 CA$</h5>
                                            </div>
                                        </Col>
                                        <Col xs="12" md="6" lg="4" xl="3" className="mb-4">
                                            <div className="selected-subscription-list">
                                                <h3 className="pro-lite"><span>Pro Max</span></h3>
                                                <h4>6 Month</h4>
                                                <h5>600.00 CA$</h5>
                                            </div>
                                        </Col>
                                        <Col xs="12" md="6" lg="4" xl="3" className="mb-4">
                                            <div className="selected-subscription-list">
                                                <h3 className="pro-lite"><span>Pro Max</span></h3>
                                                <h4>6 Month</h4>
                                                <h5>600.00 CA$</h5>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                
                                
                            </Row>
                        </div>
                    </Col>
                    <Col xs="12" className="mt-5 mb-4 text-center">
                        <div className="copyright-text">
                            <h6>Copyright © 2024. All Rights Reserved.  </h6>
                        </div>
                    </Col>

                </Row>
            </div>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Text Here </ModalHeader>
        <ModalBody>
          <Form>
                <FormGroup className="common-formgroup">
                    <Label> Title </Label>
                    <Input id="" name="" placeholder="Title" type="text" />
                </FormGroup>
                <FormGroup className="common-formgroup">
                    <Label> Subtitle </Label>
                    <Input id="" name="" placeholder="Subtitle" type="text" />
                </FormGroup>
                <FormGroup className="common-formgroup">
                    <Label> Description </Label>
                    <Input id="exampleText" name="text" type="textarea" rows="5" />
                </FormGroup>
                <FormGroup className="common-formgroup">
                    <Button className="btn-style1"> Submit </Button>
                </FormGroup>
          </Form>
        </ModalBody>
        
      </Modal>
    </Wrapper>
  )
}

export default WebsiteContent
