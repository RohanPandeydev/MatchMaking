import React from 'react'
import Wrapper from '../../layouts/Wrapper'
import { Button, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { VscFilter } from 'react-icons/vsc'
import { LiaEdit } from 'react-icons/lia'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Organization from "../../../assets/images/organization-avatar-img.jpg";

const TableViewAdmin = () => {
  return (
    <Wrapper>
        <div className="member-view-wrapper">
            <div className="common-db-head mb-4">
                <Row className="align-items-center">
                    <Col md="6">
                        <FormGroup className="mb-0 mb-sm-0">
                            <Input id="select-all" type="checkbox" />
                            <Label for="select-all">Select All</Label>
                        </FormGroup>
                    </Col>
                    <Col md="6" className="text-end">
                        <Button className="btn btn-style1 mb-2 ms-2" >Add +</Button>
                        <Button className="btn btn-outline-style1 mb-2 ms-2">
                        Filter <VscFilter />
                        </Button>
                    </Col>
                </Row>
            </div>
            <div className="common-table">
                <Table responsive>
                    <thead>
                        <tr>
                            <th></th>
                            <th>
                            Name
                            </th>
                            <th>
                            Email
                            </th>
                            <th>
                            Phone Number
                            </th>
                            <th>
                            Address
                            </th>
                            <th>
                            Subscription
                            </th>
                            <th>
                            Domain Name 
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
                                <div className="member-avatar online">
                                    <img className="img-fluid" src={Organization} alt="" />
                                </div>
                                Praveen Bommannavar
                            </td>
                            <td>
                            praveen@gmail.com
                            </td>
                            <td>
                            +1 12356 24569
                            </td>
                            <td>
                            Canada
                            </td>
                            <td>
                            Gold Plan
                            </td>
                            <td>
                            www.matrimony.com
                            </td>
                            <td>
                                <Button className="dark-blue-btn tb-edit"><LiaEdit /></Button>
                            </td>
                            <td>
                                <Button className="btn-outline-style1 tb-del"><RiDeleteBin6Line /></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormGroup className="mb-0 mb-sm-0">
                                    <Input id="select-all" type="checkbox" />
                                </FormGroup>
                            </td>
                            <td>
                                <div className="member-avatar online">
                                    <img className="img-fluid" src={Organization} alt="" />
                                </div>
                                Praveen Bommannavar
                            </td>
                            <td>
                            praveen@gmail.com
                            </td>
                            <td>
                            +1 12356 24569
                            </td>
                            <td>
                            Canada
                            </td>
                            <td>
                            Gold Plan
                            </td>
                            <td>
                            www.matrimony.com
                            </td>
                            <td>
                                <Button className="dark-blue-btn tb-edit"><LiaEdit /></Button>
                            </td>
                            <td>
                                <Button className="btn-outline-style1 tb-del"><RiDeleteBin6Line /></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormGroup className="mb-0 mb-sm-0">
                                    <Input id="select-all" type="checkbox" />
                                </FormGroup>
                            </td>
                            <td>
                                <div className="member-avatar offline">
                                    <img className="img-fluid" src={Organization} alt="" />
                                </div>
                                Praveen Bommannavar
                            </td>
                            <td>
                            praveen@gmail.com
                            </td>
                            <td>
                            +1 12356 24569
                            </td>
                            <td>
                            Canada
                            </td>
                            <td>
                            Gold Plan
                            </td>
                            <td>
                            www.matrimony.com
                            </td>
                            <td>
                                <Button className="dark-blue-btn tb-edit"><LiaEdit /></Button>
                            </td>
                            <td>
                                <Button className="btn-outline-style1 tb-del"><RiDeleteBin6Line /></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormGroup className="mb-0 mb-sm-0">
                                    <Input id="select-all" type="checkbox" />
                                </FormGroup>
                            </td>
                            <td>
                                <div className="member-avatar offline">
                                    <img className="img-fluid" src={Organization} alt="" />
                                </div>
                                Praveen Bommannavar
                            </td>
                            <td>
                            praveen@gmail.com
                            </td>
                            <td>
                            +1 12356 24569
                            </td>
                            <td>
                            Canada
                            </td>
                            <td>
                            Gold Plan
                            </td>
                            <td>
                            www.matrimony.com
                            </td>
                            <td>
                                <Button className="dark-blue-btn tb-edit"><LiaEdit /></Button>
                            </td>
                            <td>
                                <Button className="btn-outline-style1 tb-del"><RiDeleteBin6Line /></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormGroup className="mb-0 mb-sm-0">
                                    <Input id="select-all" type="checkbox" />
                                </FormGroup>
                            </td>
                            <td>
                                <div className="member-avatar online">
                                    <img className="img-fluid" src={Organization} alt="" />
                                </div>
                                Praveen Bommannavar
                            </td>
                            <td>
                            praveen@gmail.com
                            </td>
                            <td>
                            +1 12356 24569
                            </td>
                            <td>
                            Canada
                            </td>
                            <td>
                            Gold Plan
                            </td>
                            <td>
                            www.matrimony.com
                            </td>
                            <td>
                                <Button className="dark-blue-btn tb-edit"><LiaEdit /></Button>
                            </td>
                            <td>
                                <Button className="btn-outline-style1 tb-del"><RiDeleteBin6Line /></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormGroup className="mb-0 mb-sm-0">
                                    <Input id="select-all" type="checkbox" />
                                </FormGroup>
                            </td>
                            <td>
                                <div className="member-avatar online">
                                    <img className="img-fluid" src={Organization} alt="" />
                                </div>
                                Praveen Bommannavar
                            </td>
                            <td>
                            praveen@gmail.com
                            </td>
                            <td>
                            +1 12356 24569
                            </td>
                            <td>
                            Canada
                            </td>
                            <td>
                            Gold Plan
                            </td>
                            <td>
                            www.matrimony.com
                            </td>
                            <td>
                                <Button className="dark-blue-btn tb-edit"><LiaEdit /></Button>
                            </td>
                            <td>
                                <Button className="btn-outline-style1 tb-del"><RiDeleteBin6Line /></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormGroup className="mb-0 mb-sm-0">
                                    <Input id="select-all" type="checkbox" />
                                </FormGroup>
                            </td>
                            <td>
                                <div className="member-avatar online">
                                    <img className="img-fluid" src={Organization} alt="" />
                                </div>
                                Praveen Bommannavar
                            </td>
                            <td>
                            praveen@gmail.com
                            </td>
                            <td>
                            +1 12356 24569
                            </td>
                            <td>
                            Canada
                            </td>
                            <td>
                            Gold Plan
                            </td>
                            <td>
                            www.matrimony.com
                            </td>
                            <td>
                                <Button className="dark-blue-btn tb-edit"><LiaEdit /></Button>
                            </td>
                            <td>
                                <Button className="btn-outline-style1 tb-del"><RiDeleteBin6Line /></Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="pagination-wrap">
                <ul>
                    <li className="prev">
                        <button>Prev</button>
                    </li>
                    <li className="active">
                        <button>1</button>
                    </li>
                    <li>
                        <button>2</button>
                    </li>
                    <li>
                        <button>3</button>
                    </li>
                    <li>...</li>
                    <li>
                        <button>10</button>
                    </li>
                    <li className="next">
                        <button>Next</button>
                    </li>
                </ul>
            </div>

        </div>
    </Wrapper>
  )
}

export default TableViewAdmin
