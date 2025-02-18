import React from 'react'
import Wrapper from '../../layouts/Wrapper'
import { Button, Col, Row, Table } from 'reactstrap'
import { LiaEdit } from 'react-icons/lia'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Organization from "../../../assets/images/organization-avatar-img.jpg";

const SaasDashboard = () => {
  return (
    <Wrapper>
      <div className="sass-dashboard-wrapper">
        <Row className="mb-5">
            <Col lg="4" xxl="3" className="mb-4">
                <div className="sass-db-card-list">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 25 33.246">
                            <g id="noun-ring-6758108" transform="translate(-16.523 -5.477)">
                                <path id="Path_13773" data-name="Path 13773" d="M41.522,18.044c0-.006,0-4.953,0-4.959C41.5,11.3,40.036,9.577,37.51,8.364c-5.29-2.542-8.3-2.875-8.426-2.888-.263,0-3.152.311-8.555,2.888-2.446,1.174-3.9,2.85-4,4.631v5.044c-.05,1.8,1.339,3.3,3.71,4.062-2.386.763-3.767,2.264-3.71,4.06v5.076c.1,1.749,1.556,3.425,4,4.6,5.412,2.576,8.283,2.886,8.555,2.888.125-.013,3.136-.346,8.426-2.888,2.526-1.213,3.989-2.934,4.014-4.73V26.159c.012-1.912-1.383-3.293-3.718-4.062,2.361-.758,3.757-2.253,3.716-4.056ZM21.032,9.416a29.275,29.275,0,0,1,7.991-2.771A29.137,29.137,0,0,1,37,9.416c2.081,1,3.334,2.377,3.352,3.678v2.315a9.041,9.041,0,0,0-2.847-2.049c-5.392-2.573-8.288-2.879-8.544-2.878-.125.013-3.136.335-8.439,2.878A8.968,8.968,0,0,0,17.688,15.4V13.027c.074-1.311,1.292-2.628,3.343-3.613Zm8.17,8.57a.713.713,0,1,1,0-1.426A.713.713,0,1,1,29.2,17.986Zm-.178,1.165A4.3,4.3,0,0,1,32.9,21.567a7.682,7.682,0,0,0-3.872,1.311,7.637,7.637,0,0,0-3.872-1.311,4.3,4.3,0,0,1,3.872-2.415Zm11.317,6.661c.175,1.4-1.071,2.888-3.333,3.977a.583.583,0,1,0,.506,1.052,9.016,9.016,0,0,0,2.843-2.04v2.3c-.018,1.308-1.27,2.687-3.352,3.686a29.157,29.157,0,0,1-7.981,2.771,29.237,29.237,0,0,1-7.991-2.771c-2.051-.984-3.268-2.3-3.341-3.579V28.8a8.992,8.992,0,0,0,2.843,2.04c5.294,2.542,8.306,2.866,8.431,2.878a22.1,22.1,0,0,0,6.273-1.862.583.583,0,0,0-.448-1.076,24.834,24.834,0,0,1-5.767,1.771,28.96,28.96,0,0,1-7.985-2.761c-2.032-.977-3.282-2.326-3.344-3.581-.088-1.521,1.386-2.733,3.858-3.244a13.1,13.1,0,0,1,2.056-.251,5.253,5.253,0,0,0-.048.681,5.36,5.36,0,0,0,1.365,3.575.584.584,0,0,0,.871-.777,4.175,4.175,0,0,1-1.008-3.484A6.074,6.074,0,0,1,28.6,24.037a.579.579,0,0,0,.424.179.6.6,0,0,0,.419-.176,6.106,6.106,0,0,1,3.817-1.332,4.248,4.248,0,0,1,.061.685,4.194,4.194,0,0,1-1.069,2.8.587.587,0,0,0,.435.971.576.576,0,0,0,.435-.2,5.363,5.363,0,0,0,1.365-3.575,5.234,5.234,0,0,0-.048-.681,13.075,13.075,0,0,1,2.056.251c2.24.454,3.677,1.518,3.843,2.848Zm-3.85-4.572a12.974,12.974,0,0,1-2.348.277A5.458,5.458,0,0,0,30.8,18.282a1.888,1.888,0,1,0-3.489-1.009,1.838,1.838,0,0,0,.249.914,5.459,5.459,0,0,0-3.652,3.328c-2.449.019-6.379-1.122-6.215-3.457.045-1.316,1.264-2.646,3.341-3.649a29.014,29.014,0,0,1,7.991-2.761A28.863,28.863,0,0,1,37,14.409c2.055.992,3.308,2.355,3.353,3.646.044,1.466-1.438,2.685-3.868,3.182Z"/>
                            </g>
                        </svg>
                    </div>
                    <div className="info-head">
                        <h4>Number of Bride And Groom</h4>
                        <h3>500</h3>
                    </div>
                </div>
            </Col>
            <Col lg="4" xxl="3" className="mb-4">
                <div className="sass-db-card-list">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 28.521 27.002">
                            <g id="Group_13796" data-name="Group 13796" transform="translate(0.2 0.2)">
                                <path id="Path_13776" data-name="Path 13776" d="M35.051,26.945H16.067a4.569,4.569,0,0,0,0,9.138h5.355v6.151L18.05,38.862a2.2,2.2,0,0,0-3.109,0,2.207,2.207,0,0,0,0,3.113l6.588,6.585a.366.366,0,0,0,.258.107h14.67a.365.365,0,0,0,.365-.365V38.986a2.2,2.2,0,0,0-4.032-1.212,2.2,2.2,0,0,0-3.39-.344,2.248,2.248,0,0,0-.281.343,2.2,2.2,0,0,0-3.3-.426V36.083h9.231a4.574,4.574,0,0,0,4.57-4.567v0A4.574,4.574,0,0,0,35.051,26.945Zm-8.8,11a1.471,1.471,0,0,1,2.509,1.039.365.365,0,0,0,.73,0,1.47,1.47,0,0,1,2.94,0,.365.365,0,0,0,.73,0,1.468,1.468,0,1,1,2.936,0v8.949H34.8v-2.13a.365.365,0,1,0-.73,0v2.13H21.939l-6.48-6.477a1.475,1.475,0,0,1,0-2.08,1.5,1.5,0,0,1,2.076,0l4,4a.365.365,0,0,0,.623-.258V30.681a1.468,1.468,0,1,1,2.936,0v8.306a.365.365,0,0,0,.73,0A1.471,1.471,0,0,1,26.246,37.948Zm12.645-6.432a3.843,3.843,0,0,1-3.84,3.836H25.819V30.681a2.2,2.2,0,0,0-4.4,0v4.672H16.067a3.838,3.838,0,0,1,0-7.677H35.051a3.843,3.843,0,0,1,3.84,3.837Z" transform="translate(-11.5 -22.064)"  strokeWidth="0.4"/>
                                <path id="Path_13777" data-name="Path 13777" d="M19.7,37.5h-.455a2.012,2.012,0,0,1-1.189-3.634.365.365,0,0,0-.433-.588,2.742,2.742,0,0,0,1.622,4.952H19.7a.365.365,0,1,0,0-.73Z" transform="translate(-14.674 -26.041)"  strokeWidth="0.4"/>
                                <path id="Path_13778" data-name="Path 13778" d="M30.276,44.965h-.411a.365.365,0,0,0,0,.73h.411a.365.365,0,1,0,0-.73Z" transform="translate(-22.926 -33.503)"  strokeWidth="0.4"/>
                                <path id="Path_13779" data-name="Path 13779" d="M43.727,15.3a.365.365,0,0,0,.365-.365v-.994a.365.365,0,1,0-.73,0v.994A.365.365,0,0,0,43.727,15.3Z" transform="translate(-31.725 -13.579)"  strokeWidth="0.4"/>
                                <path id="Path_13780" data-name="Path 13780" d="M54.324,19.93a.364.364,0,0,0,.258-.107l.7-.7a.365.365,0,1,0-.516-.516l-.7.7a.365.365,0,0,0,.258.623Z" transform="translate(-38.452 -16.7)"  strokeWidth="0.4"/>
                                <path id="Path_13781" data-name="Path 13781" d="M31.84,20.284a.365.365,0,1,0,.516-.516l-.7-.7a.365.365,0,0,0-.516.516Z" transform="translate(-23.897 -16.993)"  strokeWidth="0.4"/>
                                <path id="Path_13782" data-name="Path 13782" d="M73.677,72.03a.365.365,0,0,0,.365-.365v-.542a.365.365,0,0,0-.73,0v.542A.365.365,0,0,0,73.677,72.03Z" transform="translate(-50.738 -49.875)"  strokeWidth="0.4"/>
                            </g>
                        </svg>
                    </div>
                    <div className="info-head">
                        <h4>Number of Subscription </h4>
                        <h3>200</h3>
                    </div>
                </div>
            </Col>
        </Row>

        <div className="saas-body mb-5">
            <div className="common-db-head mb-2">
                <Row className="align-items-center">
                    <Col md="6">
                        <h4>Bride And Groom List </h4>
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

        <div className="saas-body">
            <div className="common-db-head mb-2">
                <Row className="align-items-center">
                    <Col md="6">
                        <h4>Subscription </h4>
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


      </div>
    </Wrapper>
  )
}

export default SaasDashboard
