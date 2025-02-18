import React from 'react'
import Wrapper from '../../layouts/Wrapper'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { FiPlus } from 'react-icons/fi'
import staffimg from "../../../assets/images/no-images-available.jpg";
import { LiaEdit } from 'react-icons/lia'
import { CgLogOut } from 'react-icons/cg'
import { LuUser } from 'react-icons/lu'
import Pagination from '../../../utils/Pagination'

const AllStaff = () => {
  return (
    <Wrapper>
        <div className="common-db-head all-staff-head mb-3">
            <Row>
                <Col xs="12" lg="6" className="mb-3 mb-lg-0">
                    <ul className="common-head-list">
                        <li>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                                <Label for="select-all">Select All</Label>
                            </FormGroup>
                        </li>
                        <li className="delete-btn">
                            <Button className="btn btn-outline-style1">
                                <RiDeleteBin6Line />
                            </Button>
                        </li>
                        <li className="like-btn">
                            <Button className="btn green-btn">
                                <AiOutlineLike />
                            </Button>
                        </li>
                        <li className="dislike-btn">
                            <Button className="btn btn-outline-style1">
                                <AiOutlineDislike />
                            </Button>
                        </li>
                    </ul>
                </Col>
                <Col xs="12" lg="6">
                    <ul className="common-head-list justify-content-lg-end">
                        <li>
                            <Input id="" name="" type="select">
                                <option>Select Interest</option>
                                <option>Paid (168)</option>
                                <option>Featured (0)</option>
                                <option>All (374)</option>
                            </Input>
                        </li>
                        <li>
                            <Button className="btn btn-style1">
                                Add <FiPlus />
                            </Button>
                        </li>
                        
                    </ul>
                </Col>
            </Row>
        </div>
        <div className="staff-list">
            <div className="staff-head">
                <div className="staff-checkbox">
                    <FormGroup className="mb-0 mb-sm-0">
                        <Input id="select-all" type="checkbox" />
                    </FormGroup>
                </div>
                <div className="staff-head-dtls">
                    <div className="staff-head-info-wrap">
                        <div className="staff-img">
                            <img className="img-fluid" src={staffimg} alt="" />
                        </div>
                        <div className="staff-info">
                            <h4>Praveen Bommannavar</h4>
                            <p>(Manager)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="staff-details-wrap">
                <Row>
                    <Col xs="12" lg="8" xl="9" xxl="9">
                        <Row>
                            <Col xl="6" className="mb-4">
                                <div className="staff-details-list-wrap">
                                    <div className="staff-details-list">
                                        <div className="name">
                                            Email: 
                                        </div>
                                        <div className="info">
                                            test5@example.com
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Email For Password: 
                                        </div>
                                        <div className="info">
                                        test5@example.com
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Mobile: 
                                        </div>
                                        <div className="info">
                                        9999999999
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Mobile For Password:
                                        </div>
                                        <div className="info">
                                        9999999999
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Extension:
                                        </div>
                                        <div className="info">
                                        1
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Is Online:
                                        </div>
                                        <div className="info">
                                        172.68.79.150
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xl="6" className="mb-4">
                                <div className="staff-details-list-wrap">
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Password: 
                                        </div>
                                        <div className="info">
                                        123456
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Credit: 
                                        </div>
                                        <div className="info">
                                        100
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Staff Time: 
                                        </div>
                                        <div className="info">
                                        1
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Join On:
                                        </div>
                                        <div className="info">
                                        May 11, 2021 05:59 AM
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Last Logout:
                                        </div>
                                        <div className="info">
                                        August 25, 2021 11:29 AM
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Assign To Manager: 
                                        </div>
                                        <div className="info">
                                        N/A
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" lg="4" xl="3" xxl="3">
                        <div className="staff-right-btn">
                            <ul>
                                <li>
                                    <Button className="btn green-btn">
                                        <AiOutlineLike /> <span>Approved</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button className="btn blue-btn">
                                        <LiaEdit /> <span> Edit Staff Role</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button className="btn btn-outline-style1">
                                        <CgLogOut /> <span>Forcibly Log Out</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button className="btn orange-btn">
                                        <LuUser /> <span>View Members</span>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

        <div className="staff-list">
            <div className="staff-head">
                <div className="staff-checkbox">
                    <FormGroup className="mb-0 mb-sm-0">
                        <Input id="select-all" type="checkbox" />
                    </FormGroup>
                </div>
                <div className="staff-head-dtls">
                    <div className="staff-head-info-wrap">
                        <div className="staff-img">
                            <img className="img-fluid" src={staffimg} alt="" />
                        </div>
                        <div className="staff-info">
                            <h4>Praveen Bommannavar</h4>
                            <p>(Manager)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="staff-details-wrap">
                <Row>
                    <Col xs="12" lg="8" xl="9" xxl="9">
                        <Row>
                            <Col xl="6" className="mb-4">
                                <div className="staff-details-list-wrap">
                                    <div className="staff-details-list">
                                        <div className="name">
                                            Email: 
                                        </div>
                                        <div className="info">
                                            test5@example.com
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Email For Password: 
                                        </div>
                                        <div className="info">
                                        test5@example.com
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Mobile: 
                                        </div>
                                        <div className="info">
                                        9999999999
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Mobile For Password:
                                        </div>
                                        <div className="info">
                                        9999999999
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Extension:
                                        </div>
                                        <div className="info">
                                        1
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Is Online:
                                        </div>
                                        <div className="info">
                                        172.68.79.150
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xl="6" className="mb-4">
                                <div className="staff-details-list-wrap">
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Password: 
                                        </div>
                                        <div className="info">
                                        123456
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Credit: 
                                        </div>
                                        <div className="info">
                                        100
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Staff Time: 
                                        </div>
                                        <div className="info">
                                        1
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Join On:
                                        </div>
                                        <div className="info">
                                        May 11, 2021 05:59 AM
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Last Logout:
                                        </div>
                                        <div className="info">
                                        August 25, 2021 11:29 AM
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Assign To Manager: 
                                        </div>
                                        <div className="info">
                                        N/A
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" lg="4" xl="3" xxl="3">
                        <div className="staff-right-btn">
                            <ul>
                                <li>
                                    <Button className="btn green-btn">
                                        <AiOutlineLike /> <span>Approved</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button className="btn blue-btn">
                                        <LiaEdit /> <span> Edit Staff Role</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button className="btn btn-outline-style1">
                                        <CgLogOut /> <span>Forcibly Log Out</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button className="btn orange-btn">
                                        <LuUser /> <span>View Members</span>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

        <div className="staff-list">
            <div className="staff-head">
                <div className="staff-checkbox">
                    <FormGroup className="mb-0 mb-sm-0">
                        <Input id="select-all" type="checkbox" />
                    </FormGroup>
                </div>
                <div className="staff-head-dtls">
                    <div className="staff-head-info-wrap">
                        <div className="staff-img">
                            <img className="img-fluid" src={staffimg} alt="" />
                        </div>
                        <div className="staff-info">
                            <h4>Praveen Bommannavar</h4>
                            <p>(Manager)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="staff-details-wrap">
                <Row>
                    <Col xs="12" lg="8" xl="9" xxl="9">
                        <Row>
                            <Col xl="6" className="mb-4">
                                <div className="staff-details-list-wrap">
                                    <div className="staff-details-list">
                                        <div className="name">
                                            Email: 
                                        </div>
                                        <div className="info">
                                            test5@example.com
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Email For Password: 
                                        </div>
                                        <div className="info">
                                        test5@example.com
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Mobile: 
                                        </div>
                                        <div className="info">
                                        9999999999
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Mobile For Password:
                                        </div>
                                        <div className="info">
                                        9999999999
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Extension:
                                        </div>
                                        <div className="info">
                                        1
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Is Online:
                                        </div>
                                        <div className="info">
                                        172.68.79.150
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xl="6" className="mb-4">
                                <div className="staff-details-list-wrap">
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Password: 
                                        </div>
                                        <div className="info">
                                        123456
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Credit: 
                                        </div>
                                        <div className="info">
                                        100
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Staff Time: 
                                        </div>
                                        <div className="info">
                                        1
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Join On:
                                        </div>
                                        <div className="info">
                                        May 11, 2021 05:59 AM
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Last Logout:
                                        </div>
                                        <div className="info">
                                        August 25, 2021 11:29 AM
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Assign To Manager: 
                                        </div>
                                        <div className="info">
                                        N/A
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" lg="4" xl="3" xxl="3">
                        <div className="staff-right-btn">
                            <ul>
                                <li>
                                    <Button className="btn green-btn">
                                        <AiOutlineLike /> <span>Approved</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button className="btn blue-btn">
                                        <LiaEdit /> <span> Edit Staff Role</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button className="btn btn-outline-style1">
                                        <CgLogOut /> <span>Forcibly Log Out</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button className="btn orange-btn">
                                        <LuUser /> <span>View Members</span>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

        <Pagination count={20} pageSize={10}/>
        
    </Wrapper>
  )
}

export default AllStaff
