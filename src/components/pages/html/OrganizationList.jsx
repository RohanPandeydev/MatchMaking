import React from 'react'
import Wrapper from '../../layouts/Wrapper'
import Organization from "../../../assets/images/organization-avatar-img.jpg";
import { Button, Col, Row, Table } from 'reactstrap'
import { FiPlus } from 'react-icons/fi'
import { TbFilterPause } from 'react-icons/tb'
import { LiaEdit } from 'react-icons/lia'
import { RiDeleteBin6Line } from 'react-icons/ri'


const OrganizationList = () => {
  return (
    <Wrapper>
      <div className="saas-body">
        <div className="common-db-head mb-4">
            <Row className="align-items-center">
                <Col md="6">
                    <h4>Bride And Groom List </h4>
                </Col>
                <Col md="6" className="text-end">
                    <Button className="btn btn-light mb-2 ms-2" >Sort 
                        <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 16.96 16.518">
                            <path id="Path_9431" data-name="Path 9431" d="M20.96,20.206V15.45a1.519,1.519,0,0,0-1.512-1.512H14.692a1.519,1.519,0,0,0-1.512,1.512v4.756a1.519,1.519,0,0,0,1.512,1.512h4.756A1.519,1.519,0,0,0,20.96,20.206Zm-6.876,0V15.45a.594.594,0,0,1,.59-.59H19.43a.594.594,0,0,1,.59.59v4.756a.594.594,0,0,1-.59.59H14.692A.6.6,0,0,1,14.084,20.206Zm3.3-14.877,2.747,2.747a.456.456,0,1,1-.645.645L17.531,6.767v5.826a.461.461,0,1,1-.922,0V6.767L14.656,8.721a.463.463,0,0,1-.664-.645l2.747-2.747a.468.468,0,0,1,.645,0ZM5.512,5.2A1.519,1.519,0,0,0,4,6.712v4.756A1.519,1.519,0,0,0,5.512,12.98h4.756a1.519,1.519,0,0,0,1.512-1.512V6.712A1.519,1.519,0,0,0,10.268,5.2Zm5.365,1.512v4.756a.594.594,0,0,1-.59.59H5.512a.582.582,0,0,1-.59-.59V6.712a.594.594,0,0,1,.59-.59h4.756A.6.6,0,0,1,10.876,6.712Zm-3.3,14.877L4.83,18.842a.456.456,0,0,1,.645-.645l1.954,1.954V14.307a.461.461,0,0,1,.922,0v5.826L10.3,18.178a.456.456,0,0,1,.645.645L8.222,21.589a.468.468,0,0,1-.645,0Z" transform="translate(-4 -5.2)"/>
                        </svg>
                    </Button>
                    <Button className="btn btn-light mb-2 ms-2" >Filter <TbFilterPause /></Button>
                    <Button className="btn btn-style1 mb-2 ms-2" >Add <FiPlus /></Button>
                </Col>
            </Row>
        </div>
        <div className="saas-body-inner">
            <Table responsive className="saas-table">
                <thead>
                    <tr>
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
                        Age
                        </th>
                        <th>
                        Religion
                        </th>
                        <th>
                        caste
                        </th>
                        <th>
                        Height
                        </th>
                        <th>
                        Complexion
                        </th>
                        <th>
                        
                        </th>
                        <th>
                        
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <img className="img-fluid avatar" src={Organization} alt="" />
                            Jhon Joe
                        </td>
                        <td>
                        jhonjoe@Gmail.Com
                        </td>
                        <td>
                        95555 22222
                        </td>
                        <td>
                        32
                        </td>
                        <td>
                        Hindu
                        </td>
                        <td>
                        Brahmins
                        </td>
                        <td>
                        5.6
                        </td>
                        <td>
                        Olive
                        </td>
                        <td>
                            <Button className="edit-icon-btn"><LiaEdit /></Button>
                        </td>
                        <td>
                            <Button className="delete-icon-btn"><RiDeleteBin6Line /></Button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img className="img-fluid avatar" src={Organization} alt="" />
                            Jhon Joe
                        </td>
                        <td>
                        jhonjoe@Gmail.Com
                        </td>
                        <td>
                        95555 22222
                        </td>
                        <td>
                        32
                        </td>
                        <td>
                        Hindu
                        </td>
                        <td>
                        Brahmins
                        </td>
                        <td>
                        5.6
                        </td>
                        <td>
                        Olive
                        </td>
                        <td>
                            <Button className="edit-icon-btn"><LiaEdit /></Button>
                        </td>
                        <td>
                            <Button className="delete-icon-btn"><RiDeleteBin6Line /></Button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img className="img-fluid avatar" src={Organization} alt="" />
                            Jhon Joe
                        </td>
                        <td>
                        jhonjoe@Gmail.Com
                        </td>
                        <td>
                        95555 22222
                        </td>
                        <td>
                        32
                        </td>
                        <td>
                        Hindu
                        </td>
                        <td>
                        Brahmins
                        </td>
                        <td>
                        5.6
                        </td>
                        <td>
                        Olive
                        </td>
                        <td>
                            <Button className="edit-icon-btn"><LiaEdit /></Button>
                        </td>
                        <td>
                            <Button className="delete-icon-btn"><RiDeleteBin6Line /></Button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img className="img-fluid avatar" src={Organization} alt="" />
                            Jhon Joe
                        </td>
                        <td>
                        jhonjoe@Gmail.Com
                        </td>
                        <td>
                        95555 22222
                        </td>
                        <td>
                        32
                        </td>
                        <td>
                        Hindu
                        </td>
                        <td>
                        Brahmins
                        </td>
                        <td>
                        5.6
                        </td>
                        <td>
                        Olive
                        </td>
                        <td>
                            <Button className="edit-icon-btn"><LiaEdit /></Button>
                        </td>
                        <td>
                            <Button className="delete-icon-btn"><RiDeleteBin6Line /></Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
      </div>
    </Wrapper>
  )
}

export default OrganizationList
