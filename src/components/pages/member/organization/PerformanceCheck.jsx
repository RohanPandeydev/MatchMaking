import React, { useState , PureComponent } from 'react'
import Wrapper from '../../../layouts/Wrapper'
import { Col, FormGroup, Input, Label, Nav, NavItem, Row, NavLink as NavLinkReact, TabContent, TabPane, Button, } from 'reactstrap'
import classnames from "classnames";
import profileUser from "../../../../assets/images/no-images-available.jpg";
import whatsappIcon from "../../../../assets/images/whatsapp-icon.svg";
import { IoCallOutline, IoImagesOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { LuMailOpen } from 'react-icons/lu';
import { FiPlus } from 'react-icons/fi';
import { FaRegComments } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiMessageDetail } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';
import { BarChart, LineChart, Line, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import {   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PerformanceCheck = () => {

    const [activeTab, setActiveTab] = useState(1);
    const tabs = [
        {
          id: 1,
    
          name: "Performance 1",
        },
        {
          id: 2,
    
          name: "Performance 2",
        },
        {
          id: 3,
    
          name: "Performance 3",
        },
      ];
      const toggleTab = (tab, name) => {
        if (activeTab !== tab) {
          setActiveTab(tab);
        }
      };

    // 
    const[addClassTwo,setAddClassTwo]=useState(false)
    const[addClassThree ,setAddClassThree]=useState(false)

    // graph 
    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

      const lineData = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
  return (
    <Wrapper>
      <section className="performance-check-wrapper">

        <div className="common-db-head mb-4">
          <div className="align-items-center row">
            <div className="col-md-6">
              <h4>Organization Performance Report</h4>
            </div>
          </div>
        </div>

        <div className="start-end-date-wrap mb-3">
            <Row>
                <Col xs="12" lg="6" className="">
                    <Row>
                        <Col xs="6">
                            <FormGroup className="common-formgroup">
                                <Label> Start Date </Label>
                                <Input
                                  id=""
                                  name=""
                                  type="date"
                                  placeholder=""
                                  />
                            </FormGroup>
                        </Col>
                        <Col xs="6">
                            <FormGroup className="common-formgroup">
                                <Label> End Date </Label>
                                <Input
                                  id=""
                                  name=""
                                  type="date"
                                  placeholder=""
                                  />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
        <div className="performance-listed-wrap">
            <Row>
                <Col xs="12" sm="6" md="4" lg="3" xl="2" className="mb-3">
                    <div className="performance-list active">
                        <h4>Performance List</h4>
                        <div className="count">
                            10
                        </div>
                    </div>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3"  xl="2" className="mb-3">
                    <div className="performance-list">
                        <h4>Performance List</h4>
                        <div className="count">
                            10
                        </div>
                    </div>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3" xl="2" className="mb-3">
                    <div className="performance-list">
                        <h4>Performance List</h4>
                        <div className="count">
                            10
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        <div className="view-profile-tab-wrap performance-check-child-tab-wrap mb-3">
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
                    {/* <span className="count">3</span> */}
                  </NavLinkReact>
                </NavItem>
              );
            })}
          </Nav>
        </div>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={1}>
                <div className={addClassTwo?"view-profile-list open":"view-profile-list"}>
                    <div className="view-profile-content">
                    <div className="profile-img-wrap">
                        <div className="checkbox">
                        <FormGroup>
                            <Input id="select-all" type="checkbox" />
                        </FormGroup>
                        </div>
                        <div className="profile-img-box online">
                        <div className="profile-img">
                            <img className="img-fluid" src={profileUser} alt="" />
                            <div className="profile-hover">
                            <Link to="/"><IoImagesOutline /></Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="profile-details-wrap">
                        <div className="profile-details-top">
                        <Row>
                            <Col md="12" lg="12" xl="12" xxl="4" className="mb-3 mb-xxl-0">
                            <div className="profile-name-wrap">
                                <h3>Praveen Bommannavar</h3>
                                <h5>NMGH245903</h5>
                                <Button className="btn orange-btn me-2 mb-2">nrimb.com</Button>
                                <Button className="btn blue-btn me-2 mb-2">Match Report</Button>
                                <Button className="btn green-btn me-2 mb-2"> <img className="img-fluid" src={whatsappIcon} alt="" /> Message</Button>
                                <Button className="btn purple-btn me-2 mb-2">Personalized</Button>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3 mb-xxl-0">
                            <div className="profile-status-wrap">
                                <p><span>Status :</span> N/A</p>
                                <p><span>Marital Status :</span> Unmarried</p>
                                <p><span>Religion :</span> Christian</p>
                                <p><span>Location :</span> Canada</p>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3 mb-xxl-0">
                            <div className="profile-contact-wrap">
                                <div className="contact-list">
                                <div className="icon">
                                    <LuMailOpen />
                                </div>
                                <div className="info">
                                    <p><a href="mailto:praveen@gmail.com">praveen@gmail.com</a></p>
                                </div>
                                </div>
                                <div className="contact-list">
                                <div className="icon">
                                    <IoCallOutline />
                                </div>
                                <div className="info">
                                    <p><a href="tel:+1 9568 2356">+1 9568 2356</a></p>
                                </div>
                                </div>
                            </div>
                            </Col>
                        </Row>
                        </div>
                        <div className="profile-details-bottom">
                        <Row>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Next Followup :</span> N/A </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Registered On: </span> December 8, 2021 12:15 PM </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Assigned To : </span> Not Assigned </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Plan Name : </span> N/A </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Plan Activated On: </span> N/A </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Plan Expired On: </span> N/A </h4>
                            </div>
                            </Col>
                        </Row>
                        </div>
                    </div>
                    <div className="profile-button-wrap">
                        <ul>
                        <li>
                            <Button className="btn dark-blue-btn"> <FiPlus /></Button>
                        </li>
                        <li>
                            <Button className="btn yellow-btn"> <FaRegComments /></Button>
                        </li>
                        <li>
                            <Button className="btn light-green-btn"> <AiOutlineEdit /> </Button>
                        </li>
                        <li>
                            <Button className="btn blue-btn"> <BiMessageDetail /> </Button>
                        </li>
                        <li>
                            <Button className="btn btn-outline-style1"> <RiDeleteBin6Line /> </Button>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div className="profile-toggle-button">
                    <Button className="profile-toggle-btn" onClick={()=>setAddClassTwo(!addClassTwo)}><IoIosArrowDown /></Button>
                    </div>
                </div>

                <div className={addClassThree?"view-profile-list open":"view-profile-list"}>
                    <div className="view-profile-content">
                    <div className="profile-img-wrap">
                        <div className="checkbox">
                        <FormGroup>
                            <Input id="select-all" type="checkbox" />
                        </FormGroup>
                        </div>
                        <div className="profile-img-box online">
                        <div className="profile-img">
                            <img className="img-fluid" src={profileUser} alt="" />
                            <div className="profile-hover">
                            <Link to="/"><IoImagesOutline /></Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="profile-details-wrap">
                        <div className="profile-details-top">
                        <Row>
                            <Col md="12" lg="12" xl="12" xxl="4" className="mb-3 mb-xxl-0">
                            <div className="profile-name-wrap">
                                <h3>Praveen Bommannavar</h3>
                                <h5>NMGH245903</h5>
                                <Button className="btn orange-btn me-2 mb-2">nrimb.com</Button>
                                <Button className="btn blue-btn me-2 mb-2">Match Report</Button>
                                <Button className="btn green-btn me-2 mb-2"> <img className="img-fluid" src={whatsappIcon} alt="" /> Message</Button>
                                <Button className="btn purple-btn me-2 mb-2">Personalized</Button>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3 mb-xxl-0">
                            <div className="profile-status-wrap">
                                <p><span>Status :</span> N/A</p>
                                <p><span>Marital Status :</span> Unmarried</p>
                                <p><span>Religion :</span> Christian</p>
                                <p><span>Location :</span> Canada</p>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3 mb-xxl-0">
                            <div className="profile-contact-wrap">
                                <div className="contact-list">
                                <div className="icon">
                                    <LuMailOpen />
                                </div>
                                <div className="info">
                                    <p><a href="mailto:praveen@gmail.com">praveen@gmail.com</a></p>
                                </div>
                                </div>
                                <div className="contact-list">
                                <div className="icon">
                                    <IoCallOutline />
                                </div>
                                <div className="info">
                                    <p><a href="tel:+1 9568 2356">+1 9568 2356</a></p>
                                </div>
                                </div>
                            </div>
                            </Col>
                        </Row>
                        </div>
                        <div className="profile-details-bottom">
                        <Row>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Next Followup :</span> N/A </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Registered On: </span> December 8, 2021 12:15 PM </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Assigned To : </span> Not Assigned </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Plan Name : </span> N/A </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Plan Activated On: </span> N/A </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Plan Expired On: </span> N/A </h4>
                            </div>
                            </Col>
                        </Row>
                        </div>
                    </div>
                    <div className="profile-button-wrap">
                        <ul>
                        <li>
                            <Button className="btn dark-blue-btn"> <FiPlus /></Button>
                        </li>
                        <li>
                            <Button className="btn yellow-btn"> <FaRegComments /></Button>
                        </li>
                        <li>
                            <Button className="btn light-green-btn"> <AiOutlineEdit /> </Button>
                        </li>
                        <li>
                            <Button className="btn blue-btn"> <BiMessageDetail /> </Button>
                        </li>
                        <li>
                            <Button className="btn btn-outline-style1"> <RiDeleteBin6Line /> </Button>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div className="profile-toggle-button">
                    <Button className="profile-toggle-btn" onClick={()=>setAddClassThree(!addClassThree)}><IoIosArrowDown /></Button>
                    </div>
                </div>
          </TabPane>
          <TabPane tabId={2}>
            <div className="performance-graph-wrap">
                <ResponsiveContainer width="100%">
                    <BarChart
                    // width={500}
                    // height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 10,
                        left: 10,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="2 1" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#f8615e" />
                    <YAxis yAxisId="right" orientation="right" stroke="#39C170" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="pv" fill="#f8615e" />
                    <Bar yAxisId="right" dataKey="uv" fill="#39C170" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </TabPane>
          <TabPane tabId={3}>
          <div className="performance-graph-wrap">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    width={500}
                    height={300}
                    data={lineData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
                </div>
          </TabPane>
        </TabContent>
      </section>
    </Wrapper>
  )
}

export default PerformanceCheck
