import React from 'react'
import Wrapper from '../../layouts/Wrapper'
import { Button, Col, FormGroup, Input, Row, Table  } from 'reactstrap'
import { LiaEdit } from 'react-icons/lia'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Organization from "../../../assets/images/organization-avatar-img.jpg";
import { IoCallOutline, IoImagesOutline, IoLocationOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const ApprovedCustomerSendRequestTable = () => {
  return (
    <Wrapper>
        <div className="send-requests-wrapper send-requests-org-wrapper">
            <div className="view-profile-list">
                <div className="view-profile-content">
                    <div className="profile-img-wrap">
                        <div className="checkbox">
                            <FormGroup>
                            <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </div>
                        <div className="profile-img-box online">
                            <div className="profile-img">
                            <img className="img-fluid" src={Organization} alt="" />
                            <div className="profile-hover">
                                <Link to="/">
                                <IoImagesOutline />
                                </Link>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-details-wrap">
                        <div className="profile-details-top">
                            <Row>
                                <Col
                                    md="12"
                                    lg="12"
                                    xl="4"
                                    xxl="3"
                                    className="mb-3 mb-xxl-0"
                                >
                                    <div className="profile-name-wrap">
                                        <h3>Praveen Bommannavar</h3>
                                        <h5>NMGH245903</h5>
                                    
                                    </div>
                                </Col>
                            
                                <Col md="12" lg="12" xl="8" xxl="9" className="mb-3 mb-xxl-0">
                                    <div className="profile-contact-wrap">
                                        
                                        <div className="admin-requests-table">
                                            <Table responsive>
                                                <tbody>
                                                    <tr>
                                                        <td><div className="name">Birth time</div> </td>
                                                        <td><div className="change">1999-09-03T07:36:00Z</div></td>
                                                        <td><div className="changes">13:06</div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><div className="name">Occupation</div> </td>
                                                        <td><div className="change">Teacher</div></td>
                                                        <td><div className="changes">Civil Engineer</div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><div className="name">Birth time</div> </td>
                                                        <td><div className="change">1999-09-03T07:36:00Z</div></td>
                                                        <td><div className="changes">13:06</div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><div className="name">Occupation</div> </td>
                                                        <td><div className="change">Teacher</div></td>
                                                        <td><div className="changes">Civil Engineer</div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><div className="name">Birth time</div> </td>
                                                        <td><div className="change">1999-09-03T07:36:00Z</div></td>
                                                        <td><div className="changes">13:06</div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><div className="name">Occupation</div> </td>
                                                        <td><div className="change">Teacher</div></td>
                                                        <td><div className="changes">Civil Engineer</div></td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="profile-button-wrap">
                    <ul>
                        <li>
                            <span className="btn green-btn active">
                                APPROVED
                            </span>
                        </li>
                                                
                    </ul>
                    </div>
                </div>
            </div>
            <div className="view-profile-list">
                <div className="view-profile-content">
                    <div className="profile-img-wrap">
                        <div className="checkbox">
                            <FormGroup>
                            <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </div>
                        <div className="profile-img-box online">
                            <div className="profile-img">
                            <img className="img-fluid" src={Organization} alt="" />
                            <div className="profile-hover">
                                <Link to="/">
                                <IoImagesOutline />
                                </Link>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-details-wrap">
                        <div className="profile-details-top">
                            <Row>
                                <Col
                                    md="12"
                                    lg="12"
                                    xl="4"
                                    xxl="3"
                                    className="mb-3 mb-xxl-0"
                                >
                                    <div className="profile-name-wrap">
                                        <h3>Praveen Bommannavar</h3>
                                        <h5>NMGH245903</h5>
                                    
                                    </div>
                                </Col>
                            
                                <Col md="12" lg="12" xl="8" xxl="9" className="mb-3 mb-xxl-0">
                                    <div className="profile-contact-wrap">
                                        
                                        <div className="admin-requests-table">
                                            <Table responsive>
                                                <tbody>
                                                    <tr>
                                                        <td><div className="name">Birth time</div> </td>
                                                        <td><div className="change">1999-09-03T07:36:00Z</div></td>
                                                        <td><div className="changes">13:06</div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><div className="name">Occupation</div> </td>
                                                        <td><div className="change">Teacher</div></td>
                                                        <td><div className="changes">Civil Engineer</div></td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="profile-button-wrap">
                    <ul>
                        
                        <li>
                            <span className="btn yellow-btn">
                            PENDING
                            </span>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            <div className="view-profile-list">
                <div className="view-profile-content">
                    <div className="profile-img-wrap">
                        <div className="checkbox">
                            <FormGroup>
                            <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </div>
                        <div className="profile-img-box online">
                            <div className="profile-img">
                            <img className="img-fluid" src={Organization} alt="" />
                            <div className="profile-hover">
                                <Link to="/">
                                <IoImagesOutline />
                                </Link>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-details-wrap">
                        <div className="profile-details-top">
                            <Row>
                                <Col
                                    md="12"
                                    lg="12"
                                    xl="4"
                                    xxl="3"
                                    className="mb-3 mb-xxl-0"
                                >
                                    <div className="profile-name-wrap">
                                        <h3>Praveen Bommannavar</h3>
                                        <h5>NMGH245903</h5>
                                    
                                    </div>
                                </Col>
                            
                                <Col md="12" lg="12" xl="8" xxl="9" className="mb-3 mb-xxl-0">
                                    <div className="profile-contact-wrap">
                                        
                                        <div className="admin-requests-table">
                                            <Table responsive>
                                                <tbody>
                                                    <tr>
                                                        <td><div className="name">Birth time</div> </td>
                                                        <td><div className="change">1999-09-03T07:36:00Z</div></td>
                                                        <td><div className="changes">13:06</div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><div className="name">Occupation</div> </td>
                                                        <td><div className="change">Teacher</div></td>
                                                        <td><div className="changes">Civil Engineer</div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><div className="name">Birth time</div> </td>
                                                        <td><div className="change">1999-09-03T07:36:00Z</div></td>
                                                        <td><div className="changes">13:06</div></td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="profile-button-wrap">
                    <ul>
                        <li>
                            <span className="btn btn-outline-style1">
                            REJECTED
                            </span>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="common-table admin-requests-table">
            <Table responsive>
                <thead>
                    <tr>
                        <th>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </th>
                        <th>
                        Name
                        </th>
                        <th>
                        Changes
                        </th>
                        <th>
                        
                        </th>
                        
                        <th>
                        
                        </th>
                    </tr>
                    <tr><br/></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </td>
                        <td>
                            <div className="member-avatar">
                                <img className="img-fluid" src={Organization} alt="" />
                            </div>
                            Praveen Bommannavar
                        </td>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><div className="name">Birth time</div> </td>
                                        <td><div className="change">1999-09-03T07:36:00Z</div></td>
                                        <td><div className="changes">13:06</div></td>
                                    </tr>
                                    <tr>
                                        <td><div className="name">Occupation</div> </td>
                                        <td><div className="change">Teacher</div></td>
                                        <td><div className="changes">Civil Engineer</div></td>
                                    </tr>
                                    <tr>
                                        <td><div className="name">Birth time</div> </td>
                                        <td><div className="change">1999-09-03T07:36:00Z</div></td>
                                        <td><div className="changes">13:06</div></td>
                                    </tr>
                                    <tr>
                                        <td><div className="name">Occupation</div> </td>
                                        <td><div className="change">Teacher</div></td>
                                        <td><div className="changes">Civil Engineer</div></td>
                                    </tr>
                                    <tr>
                                        <td><div className="name">Birth time</div> </td>
                                        <td><div className="change">1999-09-03T07:36:00Z</div></td>
                                        <td><div className="changes">13:06</div></td>
                                    </tr>
                                    <tr>
                                        <td><div className="name">Occupation</div> </td>
                                        <td><div className="change">Teacher</div></td>
                                        <td><div className="changes">Civil Engineer</div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        
                        <td>
                            <Button className="green-btn">APPROVE</Button>
                            <Button className="orange-btn">Pending</Button>
                        </td>
                        
                        <td>
                            <Button className="btn-style1 tb-del"><RiDeleteBin6Line /></Button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </td>
                        <td>
                            <div className="member-avatar">
                                <img className="img-fluid" src={Organization} alt="" />
                            </div>
                            Praveen Bommannavar
                        </td>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><div className="name">Birth time</div> </td>
                                        <td><div className="change">1999-09-03T07:36:00Z</div></td>
                                        <td><div className="changes">13:06</div></td>
                                    </tr>
                                    <tr>
                                        <td><div className="name">Occupation</div> </td>
                                        <td><div className="change">Teacher</div></td>
                                        <td><div className="changes">Civil Engineer</div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        
                        <td>
                            <Button className="green-btn">APPROVE</Button>
                            <Button className="orange-btn">Pending</Button>
                        </td>
                        
                        <td>
                            <Button className="btn-style1 tb-del"><RiDeleteBin6Line /></Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    </Wrapper>
  )
}

export default ApprovedCustomerSendRequestTable
