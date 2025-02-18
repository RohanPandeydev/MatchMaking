import React from 'react'
import Wrapper from '../../layouts/Wrapper'
import { Button, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { FiPlus } from 'react-icons/fi'
import Pagination from '../../../utils/Pagination'

const StaffContactDetailRequest = () => {
  return (
    <Wrapper>
        <div className="common-db-head all-staff-head mb-3">
            <Row>
                <Col xs="12" lg="6">
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
                        <li className="alarm-btn">
                            <Button className="btn btn-outline-style1">
                                <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 26.362 26.362">
                                    <g id="noun-expired-1241402" transform="translate(-2.576 -2.576)">
                                        <path id="Path_13434" data-name="Path 13434" d="M32.716,18.19H31.049v6.936H26.5v1.667h6.216Z" transform="translate(-17.276 -11.275)"/>
                                        <path id="Path_13435" data-name="Path 13435" d="M26.188,16.635a11.9,11.9,0,1,0-9.553,9.553,6.827,6.827,0,1,0,9.553-9.553ZM14.481,24.718A10.237,10.237,0,1,1,24.718,14.481a10.362,10.362,0,0,1-.072,1.273,6.824,6.824,0,0,0-8.892,8.892A10.354,10.354,0,0,1,14.481,24.718ZM22.1,27.263a5.163,5.163,0,1,1,5.163-5.16,5.163,5.163,0,0,1-5.163,5.16Z" transform="translate(0)"/>
                                        <rect id="Rectangle_4124" data-name="Rectangle 4124" width="1.667" height="5.21" transform="translate(21.269 18.524)"/>
                                        <rect id="Rectangle_4125" data-name="Rectangle 4125" width="1.667" height="1.598" transform="translate(21.269 24.359)"/>
                                    </g>
                                </svg>
                            </Button>
                        </li>
                        <li>
                            <Input id="" name="" type="select">
                                <option>All (871) </option>
                                <option>Pending List (473)</option>
                                <option>Approved List   (0)</option>
                                <option>Expired List (398)</option>
                            </Input>
                        </li>
                    </ul>
                </Col>
                <Col xs="12" lg="6">
                    <ul className="common-head-list justify-content-lg-end">
                        <li>
                            <Input id="" name="" type="select">
                                <option>Contact Detail Request</option>
                                <option>Contact Detail Request</option>
                                <option>Contact Detail Request</option>
                            </Input>
                        </li>                        
                    </ul>
                </Col>
            </Row>
        </div>

        <div className="common-table">
            <Table responsive>
                <thead>
                    <tr>
                        <th>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" /> 
                            </FormGroup>
                        </th>
                        <th>Request Status</th>
                        <th>
                        Tickets ID
                        </th>
                        <th>
                        Member Name
                        </th>
                        <th>
                        Staff Name
                        </th>
                        <th>
                        Requested On
                        </th>
                        <th>
                        Approved On
                        </th>                            
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </td>
                        <td>
                            <span className="btn green-btn rounded-0 px-2 py-0 text-dark text-uppercase">Pending</span>
                        </td>
                        <td>
                        NMGH245903
                        </td>
                        <td>
                        Ravideep singh
                        </td>
                        <td>
                        vishal crm
                        </td>
                        <td>
                        October 24, 2016 01:10 PM
                        </td>
                        <td>
                        N/A
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </td>
                        <td>
                            <span className="btn btn-outline-style1 rounded-0 px-2 py-0 text-dark text-uppercase">Expired</span>
                        </td>
                        <td>
                        NMGH245903
                        </td>
                        <td>
                        Ravideep singh
                        </td>
                        <td>
                        vishal crm
                        </td>
                        <td>
                        October 24, 2016 01:10 PM
                        </td>
                        <td>
                        N/A
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </td>
                        <td>
                            <span className="btn btn-outline-style1 rounded-0 px-2 py-0 text-dark text-uppercase">Expired</span>
                        </td>
                        <td>
                        NMGH245903
                        </td>
                        <td>
                        Ravideep singh
                        </td>
                        <td>
                        vishal crm
                        </td>
                        <td>
                        October 24, 2016 01:10 PM
                        </td>
                        <td>
                        N/A
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </td>
                        <td>
                            <span className="btn green-btn rounded-0 px-2 py-0 text-dark text-uppercase">Pending</span>
                        </td>
                        <td>
                        NMGH245903
                        </td>
                        <td>
                        Ravideep singh
                        </td>
                        <td>
                        vishal crm
                        </td>
                        <td>
                        October 24, 2016 01:10 PM
                        </td>
                        <td>
                        N/A
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </td>
                        <td>
                            <span className="btn green-btn rounded-0 px-2 py-0 text-dark text-uppercase">Pending</span>
                        </td>
                        <td>
                        NMGH245903
                        </td>
                        <td>
                        Ravideep singh
                        </td>
                        <td>
                        vishal crm
                        </td>
                        <td>
                        October 24, 2016 01:10 PM
                        </td>
                        <td>
                        N/A
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </td>
                        <td>
                            <span className="btn green-btn rounded-0 px-2 py-0 text-dark text-uppercase">Pending</span>
                        </td>
                        <td>
                        NMGH245903
                        </td>
                        <td>
                        Ravideep singh
                        </td>
                        <td>
                        vishal crm
                        </td>
                        <td>
                        October 24, 2016 01:10 PM
                        </td>
                        <td>
                        N/A
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </td>
                        <td>
                            <span className="btn btn-outline-style1 rounded-0 px-2 py-0 text-dark text-uppercase">Expired</span>
                        </td>
                        <td>
                        NMGH245903
                        </td>
                        <td>
                        Ravideep singh
                        </td>
                        <td>
                        vishal crm
                        </td>
                        <td>
                        October 24, 2016 01:10 PM
                        </td>
                        <td>
                        N/A
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </td>
                        <td>
                            <span className="btn btn-outline-style1 rounded-0 px-2 py-0 text-dark text-uppercase">Expired</span>
                        </td>
                        <td>
                        NMGH245903
                        </td>
                        <td>
                        Ravideep singh
                        </td>
                        <td>
                        vishal crm
                        </td>
                        <td>
                        October 24, 2016 01:10 PM
                        </td>
                        <td>
                        N/A
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </td>
                        <td>
                            <span className="btn green-btn rounded-0 px-2 py-0 text-dark text-uppercase">Pending</span>
                        </td>
                        <td>
                        NMGH245903
                        </td>
                        <td>
                        Ravideep singh
                        </td>
                        <td>
                        vishal crm
                        </td>
                        <td>
                        October 24, 2016 01:10 PM
                        </td>
                        <td>
                        N/A
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                            </FormGroup>
                        </td>
                        <td>
                            <span className="btn green-btn rounded-0 px-2 py-0 text-dark text-uppercase">Pending</span>
                        </td>
                        <td>
                        NMGH245903
                        </td>
                        <td>
                        Ravideep singh
                        </td>
                        <td>
                        vishal crm
                        </td>
                        <td>
                        October 24, 2016 01:10 PM
                        </td>
                        <td>
                        N/A
                        </td>
                    </tr>
                    
                </tbody>
            </Table>
        </div>

        <Pagination count={20} pageSize={10}/>

    </Wrapper>
  )
}

export default StaffContactDetailRequest
