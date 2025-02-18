import React, { useState } from "react";
import Wrapper from "../../layouts/Wrapper";
import {
  Button,
  Col,
  Nav,
  NavItem,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Progress,
  Row,
  NavLink as NavLinkReact,
  TabContent,
  TabPane,
  Collapse,
  Table,
} from "reactstrap";
import profileUser from "../../../assets/images/no-images-available.jpg";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FiMail, FiPlus } from "react-icons/fi";
import { LiaStarOfLifeSolid } from "react-icons/lia";
import { GrLocationPin } from "react-icons/gr";
import { AiOutlineEye } from "react-icons/ai";
import { LuMailOpen } from "react-icons/lu";
import classnames from "classnames";
import { HiMinus } from "react-icons/hi";

const MatchReport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const toggleOffcanvas = () => {
    setIsOpen(!isOpen);
  };
  const tabs = [
    {
      id: 1,

      name: "Profile Match",
    },
    {
      id: 2,

      name: "Send Request",
    },
    {
      id: 3,

      name: "Received Request",
    },
  ];
  const toggleTab = (tab, name) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const [activeaccordionIndex, setActiveAccordianIndex] = useState(0);
  // const { id } = useParams();

  const [myId, setMyId] = useState("");

  const handleAccordianToggle = (accordionIndex) => {
    if (activeaccordionIndex === accordionIndex) {
      setActiveAccordianIndex(null); // Close if already open
    } else {
      setActiveAccordianIndex(accordionIndex); // Open the clicked one
    }
  };
  return (
    <Wrapper>
      <div className="match-report-wrapper">
        <div className="match-report-profile-wrap mb-4">
          <Row>
            <Col xs="12" lg="2" className="mb-2 mb-lg-0">
              <div className="match-report-profile-img">
                <img className="img-fluid" src={profileUser} alt="" />
              </div>
            </Col>
            <Col xs="12" lg="10">
              <div className="match-report-profile-details">
                <Row>
                  <Col xs="12" md="6" lg="4" xl="3" className="mb-3">
                    <div className="match-report-profile-dtls-list">
                      <div className="icon">
                        <FaUser />
                      </div>
                      <div className="details">
                        Praveen Bommannavar <br /> ID: SMORG0705E
                      </div>
                    </div>
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="3" className="mb-3">
                    <div className="match-report-profile-dtls-list">
                      <div className="icon">
                        <MdDateRange />
                      </div>
                      <div className="details">Jan 8, 2002 (22 yrs)</div>
                    </div>
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="3" className="mb-3">
                    <div className="match-report-profile-dtls-list">
                      <div className="icon">
                        <FaUsers />
                      </div>
                      <div className="details">unmarried</div>
                    </div>
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="3" className="mb-3">
                    <div className="match-report-profile-dtls-list">
                      <div className="icon">
                        <IoCallOutline />
                      </div>
                      <div className="details">
                        <a href="tel:7854126300">7854126300</a>
                      </div>
                    </div>
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="3" className="mb-3">
                    <div className="match-report-profile-dtls-list">
                      <div className="icon">
                        <FiMail />
                      </div>
                      <div className="details">
                        <a href="mailto:nameauth1000@gmail.com">
                          nameauth1000@gmail.com
                        </a>
                      </div>
                    </div>
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="3" className="mb-3">
                    <div className="match-report-profile-dtls-list">
                      <div className="icon">
                        <LiaStarOfLifeSolid />
                      </div>
                      <div className="details">Hindu</div>
                    </div>
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="3" className="mb-3">
                    <div className="match-report-profile-dtls-list">
                      <div className="icon">
                        <GrLocationPin />
                      </div>
                      <div className="details">United States</div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" lg="4" xl="3" className="mb-3">
                    <div className="match-profile-count-wrap">
                      <div className="info">
                        <h4>Profile Match</h4>
                      </div>
                      <div className="count">30</div>
                    </div>
                  </Col>
                  <Col xs="12" lg="4" xl="3" className="mb-3">
                    <div className="match-profile-count-wrap">
                      <div className="info">
                        <h4>Send Request</h4>
                      </div>
                      <div className="count">18</div>
                    </div>
                  </Col>
                  <Col xs="12" lg="4" xl="3" className="mb-3">
                    <div className="match-profile-count-wrap">
                      <div className="info">
                        <h4>Received Request</h4>
                      </div>
                      <div className="count">12</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>

        <div className="common-db-head mb-4">
          <div className="align-items-center row">
            <div className="col-md-6">
              <h4>Match Report</h4>
            </div>
          </div>
        </div>

        <div className="view-profile-tab-wrap match-profile-tab-wrap mb-3">
          <Nav tabs>
            {tabs?.map((ele) => {
              return (
                <NavItem>
                  <NavLinkReact
                    className={classnames({
                      active: activeTab === ele?.id,
                    })}
                    onClick={() => toggleTab(ele?.id, ele?.name)}
                  >
                    {ele?.name}
                  </NavLinkReact>
                </NavItem>
              );
            })}
          </Nav>
        </div>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={1}>
            <div className="match-profile-list">
              <div className="match-profile-img">
                <img className="img-fluid" src={profileUser} alt="" />
              </div>
              <div className="match-profile-details">
                <Row>
                  <Col md="12" lg="12" xl="2" className="mb-2 mb-xl-0">
                    <div className="match-profile-name-wrap">
                      <h3>
                        {" "}
                        Bipasha{" "}
                        <span className="verified-tag blue-color"></span>
                      </h3>

                      <h5>
                        <div className="member-code">SMORG0705E</div>
                      </h5>
                      <div className="match-profile-bar">
                        <Progress value={70} />
                        <h5>
                          <span>70%</span> Match
                        </h5>
                      </div>
                    </div>
                  </Col>
                  <Col md="12" lg="12" xl="6" className="mb-2 mb-xl-0">
                    <div className="match-profile-dtls-wrap">
                      <Row>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>Country :</span>India
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>State :</span> WB
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>City :</span> Kolkata
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>Marital Status :</span> unmarried
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>Religion :</span> hinduism
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>City :</span> Kolkata
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col md="12" lg="12" xl="4" className="mb-2 mb-xl-0">
                    <div className="match-profile-dtls-wrap match-profile-contact">
                      <div class="contact-list">
                        <div class="icon">
                          <LuMailOpen />
                        </div>
                        <div class="info">
                          <p>
                            <a href="mailto:nameauth1000@gmail.com">
                              nameauth1000@gmail.com
                            </a>
                          </p>
                        </div>
                      </div>
                      <div class="contact-list">
                        <div class="icon">
                          <IoCallOutline />
                        </div>
                        <div class="info">
                          <p>
                            <a href="tel:7854126300">7854126300</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="view-details-btn">
                <Button className="dark-blue-btn" onClick={toggleOffcanvas}>
                  {" "}
                  <AiOutlineEye />
                </Button>
              </div>
            </div>
            <div className="match-profile-list">
              <div className="match-profile-img">
                <img className="img-fluid" src={profileUser} alt="" />
              </div>
              <div className="match-profile-details">
                <Row>
                  <Col md="12" lg="12" xl="2" className="mb-2 mb-xl-0">
                    <div className="match-profile-name-wrap">
                      <h3>
                        {" "}
                        Bipasha{" "}
                        <span className="verified-tag blue-color"></span>
                      </h3>

                      <h5>
                        <div className="member-code">SMORG0705E</div>
                      </h5>
                      <div className="match-profile-bar">
                        <Progress value={70} />
                        <h5>
                          <span>70%</span> Match
                        </h5>
                      </div>
                    </div>
                  </Col>
                  <Col md="12" lg="12" xl="6" className="mb-2 mb-xl-0">
                    <div className="match-profile-dtls-wrap">
                      <Row>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>Country :</span>India
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>State :</span> WB
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>City :</span> Kolkata
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>Marital Status :</span> unmarried
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>Religion :</span> hinduism
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>City :</span> Kolkata
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col md="12" lg="12" xl="4" className="mb-2 mb-xl-0">
                    <div className="match-profile-dtls-wrap match-profile-contact">
                      <div class="contact-list">
                        <div class="icon">
                          <LuMailOpen />
                        </div>
                        <div class="info">
                          <p>
                            <a href="mailto:nameauth1000@gmail.com">
                              nameauth1000@gmail.com
                            </a>
                          </p>
                        </div>
                      </div>
                      <div class="contact-list">
                        <div class="icon">
                          <IoCallOutline />
                        </div>
                        <div class="info">
                          <p>
                            <a href="tel:7854126300">7854126300</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="view-details-btn">
                <Button className="dark-blue-btn" onClick={toggleOffcanvas}>
                  {" "}
                  <AiOutlineEye />
                </Button>
              </div>
            </div>
            <div className="match-profile-list">
              <div className="match-profile-img">
                <img className="img-fluid" src={profileUser} alt="" />
              </div>
              <div className="match-profile-details">
                <Row>
                  <Col md="12" lg="12" xl="2" className="mb-2 mb-xl-0">
                    <div className="match-profile-name-wrap">
                      <h3>
                        {" "}
                        Bipasha{" "}
                        <span className="verified-tag blue-color"></span>
                      </h3>

                      <h5>
                        <div className="member-code">SMORG0705E</div>
                      </h5>
                      <div className="match-profile-bar">
                        <Progress value={90} />
                        <h5>
                          <span>90%</span> Match
                        </h5>
                      </div>
                    </div>
                  </Col>
                  <Col md="12" lg="12" xl="6" className="mb-2 mb-xl-0">
                    <div className="match-profile-dtls-wrap">
                      <Row>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>Country :</span>India
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>State :</span> WB
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>City :</span> Kolkata
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>Marital Status :</span> unmarried
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>Religion :</span> hinduism
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>City :</span> Kolkata
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col md="12" lg="12" xl="4" className="mb-2 mb-xl-0">
                    <div className="match-profile-dtls-wrap match-profile-contact">
                      <div class="contact-list">
                        <div class="icon">
                          <LuMailOpen />
                        </div>
                        <div class="info">
                          <p>
                            <a href="mailto:nameauth1000@gmail.com">
                              nameauth1000@gmail.com
                            </a>
                          </p>
                        </div>
                      </div>
                      <div class="contact-list">
                        <div class="icon">
                          <IoCallOutline />
                        </div>
                        <div class="info">
                          <p>
                            <a href="tel:7854126300">7854126300</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="view-details-btn">
                <Button className="dark-blue-btn" onClick={toggleOffcanvas}>
                  {" "}
                  <AiOutlineEye />
                </Button>
              </div>
            </div>
          </TabPane>
          <TabPane tabId={2}>
            <div className="match-profile-list">
              <div className="match-profile-img">
                <img className="img-fluid" src={profileUser} alt="" />
              </div>
              <div className="match-profile-details">
                <Row>
                  <Col md="12" lg="12" xl="2" className="mb-2 mb-xl-0">
                    <div className="match-profile-name-wrap">
                      <h3>
                        {" "}
                        Bipasha{" "}
                        <span className="verified-tag blue-color"></span>
                      </h3>

                      <h5>
                        <div className="member-code">SMORG0705E</div>
                      </h5>
                      <div className="match-profile-bar">
                        <Progress value={70} />
                        <h5>
                          <span>70%</span> Match
                        </h5>
                      </div>
                    </div>
                  </Col>
                  <Col md="12" lg="12" xl="6" className="mb-2 mb-xl-0">
                    <div className="match-profile-dtls-wrap">
                      <Row>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>Country :</span>India
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>State :</span> WB
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>City :</span> Kolkata
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>Marital Status :</span> unmarried
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>Religion :</span> hinduism
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>City :</span> Kolkata
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col md="12" lg="12" xl="4" className="mb-2 mb-xl-0">
                    <div className="match-profile-dtls-wrap match-profile-contact">
                      <div class="contact-list">
                        <div class="icon">
                          <LuMailOpen />
                        </div>
                        <div class="info">
                          <p>
                            <a href="mailto:nameauth1000@gmail.com">
                              nameauth1000@gmail.com
                            </a>
                          </p>
                        </div>
                      </div>
                      <div class="contact-list">
                        <div class="icon">
                          <IoCallOutline />
                        </div>
                        <div class="info">
                          <p>
                            <a href="tel:7854126300">7854126300</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="view-details-btn">
                <Button className="dark-blue-btn" onClick={toggleOffcanvas}>
                  {" "}
                  <AiOutlineEye />
                </Button>
              </div>
            </div>
          </TabPane>
          <TabPane tabId={3}>
            <div className="match-profile-list">
              <div className="match-profile-img">
                <img className="img-fluid" src={profileUser} alt="" />
              </div>
              <div className="match-profile-details">
                <Row>
                  <Col md="12" lg="12" xl="2" className="mb-2 mb-xl-0">
                    <div className="match-profile-name-wrap">
                      <h3>
                        {" "}
                        Bipasha{" "}
                        <span className="verified-tag blue-color"></span>
                      </h3>

                      <h5>
                        <div className="member-code">SMORG0705E</div>
                      </h5>
                      <div className="match-profile-bar">
                        <Progress value={70} />
                        <h5>
                          <span>70%</span> Match
                        </h5>
                      </div>
                    </div>
                  </Col>
                  <Col md="12" lg="12" xl="6" className="mb-2 mb-xl-0">
                    <div className="match-profile-dtls-wrap">
                      <Row>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>Country :</span>India
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>State :</span> WB
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>City :</span> Kolkata
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>Marital Status :</span> unmarried
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>Religion :</span> hinduism
                          </p>
                        </Col>
                        <Col xs="12" xl="6" className="mb-1">
                          <p>
                            <span>City :</span> Kolkata
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col md="12" lg="12" xl="4" className="mb-2 mb-xl-0">
                    <div className="match-profile-dtls-wrap match-profile-contact">
                      <div class="contact-list">
                        <div class="icon">
                          <LuMailOpen />
                        </div>
                        <div class="info">
                          <p>
                            <a href="mailto:nameauth1000@gmail.com">
                              nameauth1000@gmail.com
                            </a>
                          </p>
                        </div>
                      </div>
                      <div class="contact-list">
                        <div class="icon">
                          <IoCallOutline />
                        </div>
                        <div class="info">
                          <p>
                            <a href="tel:7854126300">7854126300</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="view-details-btn">
                <Button className="dark-blue-btn" onClick={toggleOffcanvas}>
                  {" "}
                  <AiOutlineEye />
                </Button>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>

      <div>
        <Offcanvas
          className="view-match-profile-offcanvas-wrapper"
          isOpen={isOpen}
          toggle={toggleOffcanvas}
          direction="end"
        >
          <OffcanvasHeader toggle={toggleOffcanvas}>
            Match Report
          </OffcanvasHeader>
          <OffcanvasBody>
            <div className="view-match-profile-details-wrap">
              <Row>
                <Col xs="12" lg="2" className="mb-3">
                  <div className="match-profile-wrap">
                    <div className="match-profile-img">
                      <img className="img-fluid" src={profileUser} alt="" />
                    </div>

                    <h5>
                      <LuMailOpen />{" "}
                      <a href="mailto:nameauth1000@gmail.com">
                        {" "}
                        nameauth1000@gmail.com{" "}
                      </a>
                    </h5>
                    <h5>
                      <IoCallOutline /> <a href="tel:7854126300">7854126300</a>
                    </h5>
                  </div>
                </Col>
                <Col xs="12" lg="10">
                  <div className="profile-details-accordion-list">
                    <div className="profile-dtls-accordion-head">
                      <div className="left-heading">
                        <h4>Partner Preferance Infomation</h4>
                      </div>
                      <div className="toggle-btn">
                        <Button onClick={() => handleAccordianToggle(1)}>
                          {activeaccordionIndex == 5 ? (
                            <span className="minus">
                              <HiMinus />
                            </span>
                          ) : (
                            <span className="plus">
                              <FiPlus />
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>

                    <Collapse isOpen={activeaccordionIndex === 1}>
                      <div className="profile-details-accordion-body">
                        <Row>
                          <Col xl="6">
                            <div className="view-match-details">
                              <div className="common-table">
                                <Table responsive>
                                  <thead>
                                    <tr>
                                      <th></th>
                                      <th>Partner </th>
                                      <th>Your Preferance</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Looking For :</td>
                                      <td>
                                        <span>
                                          Networking
                                        </span>
                                      </td>
                                      <td>
                                        <span className="match">
                                          Networking
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Complexion :</td>
                                      <td>
                                        <span>
                                        Light
                                        </span>
                                      </td>
                                      <td>
                                        <span className="unmatch">
                                        Fair
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>MotherTongue :</td>
                                      <td>
                                        <span>
                                        Tamil
                                        </span>
                                      </td>
                                      <td>
                                        <span className="unmatch">
                                          Hindi
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Religion :</td>
                                      <td>
                                        <span>
                                          Hinduism
                                        </span>
                                      </td>
                                      <td>
                                        <span className="match">
                                          Hinduism
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Caste :</td>
                                      <td>
                                        <span>
                                        Kshatriya
                                        </span>
                                      </td>
                                      <td>
                                        <span className="match">
                                            Kshatriya
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Education :</td>
                                      <td>
                                        <span>
                                        Higher Secondary Education
                                        </span>
                                      </td>
                                      <td>
                                        <span className="unmatch">
                                        Secondary Education
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                            </div>
                          </Col>
                          <Col xl="6">
                            <div className="view-match-details">
                              <div className="common-table">
                                <Table responsive>
                                  <thead>
                                    <tr>
                                      <th></th>
                                      <th>Partner </th>
                                      <th>Your Preferance</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Annual Income :</td>
                                      <td>
                                        <span>
                                          Networking
                                        </span>
                                      </td>
                                      <td>
                                        <span className="match">
                                          Networking
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Country :</td>
                                      <td>
                                        <span>
                                        India
                                        </span>
                                      </td>
                                      <td>
                                        <span className="match">
                                        India
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Residance Status :</td>
                                      <td>
                                        <span>
                                        Citizen
                                        </span>
                                      </td>
                                      <td>
                                        <span className="unmatch">
                                        Citizen
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Age Preference :</td>
                                      <td>
                                        <span>
                                        19 Yrs to 23 Yrs 
                                        </span>
                                      </td>
                                      <td>
                                        <span className="match">
                                          20 Yrs
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Gender :</td>
                                      <td>
                                        <span>
                                        female
                                        </span>
                                      </td>
                                      <td>
                                        <span className="match">
                                        female
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Height :</td>
                                      <td>
                                        <span>
                                        4.90 Ft to 5.00 Ft 
                                        </span>
                                      </td>
                                      <td>
                                        <span className="unmatch">
                                        5.50 Ft 
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                            </div>
                          </Col>
                          
                        </Row>
                      </div>
                    </Collapse>
                  </div>
                  <div className="profile-details-accordion-list">
                    <div className="profile-dtls-accordion-head">
                      <div className="left-heading">
                        <h4>Basic Infomation</h4>
                      </div>
                      <div className="toggle-btn">
                        <Button onClick={() => handleAccordianToggle(2)}>
                          {activeaccordionIndex == 5 ? (
                            <span className="minus">
                              <HiMinus />
                            </span>
                          ) : (
                            <span className="plus">
                              <FiPlus />
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>

                    <Collapse isOpen={activeaccordionIndex === 2}>
                      <div className="profile-details-accordion-body">
                        <Row>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Name :</span> Aryan SIngh {" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Description :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Birth Place :</span> kolkata {" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Birth Time :</span> 17:57 {" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>No Of Child :</span> 0{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Children Living With Me :</span> No{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>TalKing Head :</span> N/A{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Gender :</span> female{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Marital Status :</span> unmarried{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Age :</span> Jan 8, 2002 (22 yrs){" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Residence :</span> Mumbai,Maharashtra,India{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Height :</span> 6.00 Ft{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Residence Status :</span> N/A{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span> Weight :</span> 58 Kg{" "}
                              </h4>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Collapse>
                  </div>
                  <div className="profile-details-accordion-list">
                    <div className="profile-dtls-accordion-head">
                      <div className="left-heading">
                        <h4>Residance Infomation</h4>
                      </div>
                      <div className="toggle-btn">
                        <Button onClick={() => handleAccordianToggle(3)}>
                          {activeaccordionIndex == 5 ? (
                            <span className="minus">
                              <HiMinus />
                            </span>
                          ) : (
                            <span className="plus">
                              <FiPlus />
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>

                    <Collapse isOpen={activeaccordionIndex === 3}>
                      <div className="profile-details-accordion-body">
                        <Row>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Looking For :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Complexion :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>MotherTongue :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>MotherTongue :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Religion :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Caste :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Education :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Annual Income :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Country :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Residance Status :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Age Preference :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Gender :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Height :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span> Marital Status :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Collapse>
                  </div>
                </Col>
              </Row>
            </div>
          </OffcanvasBody>
        </Offcanvas>
      </div>
    </Wrapper>
  );
};

export default MatchReport;
