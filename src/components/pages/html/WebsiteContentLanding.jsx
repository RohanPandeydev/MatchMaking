import React from 'react'
import Slider from "react-slick";
import logo from "../../../assets/images/logo.png";
import LandingBannerImg from "../../../assets/images/landing-banner-img.png";
import AboutRightImg from "../../../assets/images/about-right-img1.jpg";
import BrideGroomImg from "../../../assets/images/bride-and-groom-list-img1.jpg";
import { Button, Col, Container, Row } from 'reactstrap';
import { IoClose } from 'react-icons/io5';
import { IoMdCheckmark } from 'react-icons/io';
import { AiOutlineFileSearch } from 'react-icons/ai';

const WebsiteContentLanding = () => {

    var LandingSubscription = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        centerMode: false,
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
    <>
      <header className="landing-header-wrapper">
        <Container fluid>
            <Row>
                <Col xs="12">
                    <div className="landing-logo-wrap">
                        <img className="img-fluid" src={logo} alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
      </header>
      <section className="banner-wrapper">
        <Container fluid>
            <Row>
                <Col xs="12">
                    <div className="banner-img">
                        <img src={LandingBannerImg} alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
      </section>
      <section className="about-wrapper">
        <Container>
            <Row className="align-items-center">
                <Col lg="7">
                    <div className="about-left-content">
                        <h3>A Dream Elegant Wedding <br/>
                        Made Reality</h3>
                        <h5>Lorem ipsum dolor sit amet, consectetuer dolor sit</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis consectetur felis quis finibus. Fusce in pulvinar magna. Nunc non lobortis sem. In elementum nisl malesuada eros dignissim porta. Fusce vel tincidunt nisl.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis consectetur felis quis finibus. Fusce in pulvinar magna. Nunc non lobortis sem. In elementum nisl malesuada eros dignissim porta. Fusce vel tincidunt nisl.</p>
                    </div>
                </Col>
                <Col lg="5">
                    <div className="about-right-img">
                        <img className="img-fluid" src={AboutRightImg} alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
      </section>
      <section className="bride-groom-wrapper">
        <Container>
            <Row>
                <Col xs="12" className="mb-4">
                    <div className="landing-title text-center">
                        <h3>Bride and Groom List </h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis consectetur <br/> felis quis finibus. Fusce in pulvinar magna</p>
                    </div>
                </Col>
                <Col xs="12" sm="6" lg="4" xl="4" className="mb-4">
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
                <Col xs="12" sm="6" lg="4" xl="4" className="mb-4">
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
                <Col xs="12" sm="6" lg="4" xl="4" className="mb-4">
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
                <Col xs="12" sm="6" lg="4" xl="4" className="mb-4">
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
                <Col xs="12" sm="6" lg="4" xl="4" className="mb-4">
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
                <Col xs="12" sm="6" lg="4" xl="4" className="mb-4">
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
            </Row>
            <Row>
                <Col xs="12" lg="6" className="offset-lg-3">
                    <div className="no-data-wrap">
                        <div className="no-data-img">
                            <AiOutlineFileSearch />
                        </div>
                        <h3>There is no active data found</h3>
                    </div>
                </Col>
            </Row>
        </Container>
      </section>
      <section className="landing-subscription-wrapper">
        <Container>
            <Row>
                <Col xs="12" className="mb-4">
                    <div className="landing-title text-center">
                        <h3>Subscription </h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis consectetur <br/> felis quis finibus. Fusce in pulvinar magna</p>
                    </div>
                </Col>
                <Col xs="12">
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
                                    {/* <div className="subscription-items">
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
                                    </div> */}
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
            </Row>
            <Row>
                <Col xs="12" lg="6" className="offset-lg-3">
                    <div className="no-data-wrap">
                        <div className="no-data-img">
                            <AiOutlineFileSearch />
                        </div>
                        <h3>There is no active data found</h3>
                    </div>
                </Col>
            </Row>
        </Container>
      </section>
      <section className="landing-copyright-wrap">
        <Container>
            <Row>
                <Col xs="12" className="text-center">
                    <div className="copyright-text">
                        <p>Copyright © 2024. All Rights Reserved.</p>
                    </div>
                </Col>
            </Row>
        </Container>
      </section>
    </>
  )
}

export default WebsiteContentLanding
