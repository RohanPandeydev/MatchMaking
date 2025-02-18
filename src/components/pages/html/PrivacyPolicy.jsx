import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import logo from "../../../assets/images/logo.png";
const PrivacyPolicy = () => {
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
      <section className="cms-template-wrapper">
        <Container>
            <Row>
                <Col xs="12">
                    <div className="cms-content-part">
                        <h3>Privacy Policy</h3>
                        <p>Our Privacy Policy was last updated on 25-09-2024</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.</p>
                        <h4>Interpretation and Definitions</h4>
                        <h5>Interpretation</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.</p>
                        <h5>Definitions</h5>

                        <p>For the purposes of this Privacy Policy:</p>
                        <ul>
                        <li><strong>"Account"</strong> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</li>
                        <li><strong>"Business"</strong>, Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</li>
                        <li><strong>Duis aute irure dolor</strong> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
                        <li><strong>Duis aute irure dolor</strong> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
                        </ul>
                        <h4>Collecting and Using Your Personal Data</h4>
                        <h5>Types of Data Collected</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <h4>CCPA Privacy Policy</h4>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <ol>
                        <li><strong>cillum:</strong> dolore eu</li>
                        <li><strong>Excepteur:</strong> sint occaecat</li>
                        <li><strong>officia:</strong> deserunt mollit</li>
                        <li><strong>cillum:</strong> dolore eu</li>
                        <li><strong>Excepteur:</strong> sint occaecat</li>
                        <li><strong>officia:</strong> deserunt mollit</li>
                        </ol>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </Col>
            </Row>
        </Container>
      </section>
      <section className="landing-copyright-wrap">
        <Container>
            <Row>
                <Col xs="12" lg="6" className="text-center text-lg-start order-2 order-lg-1">
                    <div className="copyright-text">
                        <p>Copyright © 2024. All Rights Reserved.</p>
                    </div>
                </Col>
                <Col xs="12" lg="6" className="order-1 order-lg-2">
                    <div className="copyright-menu">
                        <ul>
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#">Terms & Conditions</a>
                            </li>
                            <li>
                                <a href="#">Subscription</a>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
      </section>
    </>
  )
}

export default PrivacyPolicy
