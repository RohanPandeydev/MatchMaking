import React, { useState } from 'react'
import Wrapper from '../../layouts/Wrapper'
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, Row, Table } from 'reactstrap'
import { IoCallOutline, IoClose } from 'react-icons/io5';
import profileUser from "../../../assets/images/no-images-available.jpg";
import { LuMailOpen } from 'react-icons/lu';
import { LiaEdit } from 'react-icons/lia';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsTelephone } from 'react-icons/bs';
import { TbMailOpened } from 'react-icons/tb';

const PopupDesign = () => {
    // Add New Ticket modal
    const [toggleNewTicket, setToggleNewTicket] = useState(false);
    const handleNewTicket = () => setToggleNewTicket(!toggleNewTicket);
    
    // View Tickets modal
    const [toggleViewTickets, setToggleViewTickets] = useState(false);
    const handleViewTickets = () => setToggleViewTickets(!toggleViewTickets);

    // Plan Assignment modal
    const [togglePlanAssignment, setTogglePlanAssignment] = useState(false);
    const handlePlanAssignment = () => setTogglePlanAssignment(!togglePlanAssignment);

    // Plan Assignment 1 modal
    const [togglePlanAssignmentOne, setTogglePlanAssignmentOne] = useState(false);
    const handlePlanAssignmentOne = () => setTogglePlanAssignmentOne(!togglePlanAssignmentOne);
    
    // Add Comment modal
    const [toggleAddComment, setToggleAddComment] = useState(false);
    const handleAddComment = () => setToggleAddComment(!toggleAddComment);

    // View Comment modal
    const [toggleViewAddComment, setToggleViewAddComment] = useState(false);
    const handleViewAddComment = () => setToggleViewAddComment(!toggleViewAddComment);
    
    // Send Quick Email modal SendQuickEmail
    const [toggleSendQuickEmail, setToggleSendQuickEmail] = useState(false);
    const handleSendQuickEmail = () => setToggleSendQuickEmail(!toggleSendQuickEmail);


  return (
    <>
    {/* <Button className="btn green-btn mb-2 me-2" onClick={handleNewTicket}>Add New Ticket</Button> */}
    <Button className="btn yellow-btn  mb-2 me-2" onClick={handleViewTickets}>View Tickets</Button>
    <Button className="btn blue-btn  mb-2 me-2" onClick={handlePlanAssignment}>Plan Assignment</Button>
    <Button className="btn dark-blue-btn  mb-2 me-2" onClick={handlePlanAssignmentOne}>Plan Assignment 1</Button>
    {/* <Button className="btn light-green-btn  mb-2 me-2" onClick={handleAddComment}>Add Comment</Button> */}
    <Button className="btn orange-btn  mb-2 me-2" onClick={handleViewAddComment}>View Comment</Button>
    <Button className="btn aqua-btn  mb-2 me-2" onClick={handleSendQuickEmail}>Send Quick Email </Button>

    {/* Add New Ticket modal */}
    <Modal size="lg" className="common-modal new-ticket-modal" isOpen={toggleNewTicket} toggle={handleNewTicket}>
        <Button className="close-btn" onClick={handleNewTicket}><IoClose /></Button>
        <ModalBody>
            <div className="modal-heading">
            <h4>Add New Ticket</h4>
            </div>
            <div className="ticket-head mb-4">
            <div className="ticket-head-left">
                <div className="ticket-user-icon">
                    <img className="img-fluid" src={profileUser} alt="" />
                </div>
                <div className="ticket-user-info">
                    <h4>Praveen Bommannavar</h4>
                    <h5>NMGH245903</h5>

                    <ul className="tick-user-cont-info mt-4">
                        <li> <LuMailOpen /> <a href="mailto:sss1@gmail.com">sss1@gmail.com</a></li>
                        <li> <IoCallOutline /> <a href="tel:+1 9568 2356">+1 9568 2356</a></li>
                    </ul>
                </div>
            </div>
            <div className="ticket-head-right">
                <Button className="btn btn-light">
                    <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 22.752 23.633">
                        <g id="noun-people-6751180" transform="translate(-7.623 -5.95)">
                            <g id="Group_14007" data-name="Group 14007" transform="translate(7.923 6.25)">
                            <path id="Path_13349" data-name="Path 13349" d="M20.777,10.656a.412.412,0,0,0-.732,0l-.937,1.822-1.822.937a.411.411,0,0,0,0,.731l1.822.937.937,1.822a.412.412,0,0,0,.732,0l.936-1.822,1.822-.937a.41.41,0,0,0,0-.731l-1.822-.937Zm-.366,1.088.63,1.228a.415.415,0,0,0,.179.178l1.227.631-1.227.63a.415.415,0,0,0-.179.178l-.63,1.228-.63-1.228a.421.421,0,0,0-.179-.178l-1.227-.63L19.6,13.15a.421.421,0,0,0,.179-.178Z" transform="translate(-14.657 -9.332)" strokeWidth="0.6" fillRule="evenodd"/>
                            <path id="Path_13350" data-name="Path 13350" d="M63.636,6.473a.412.412,0,0,0-.732,0l-.811,1.58-1.58.811a.412.412,0,0,0,0,.732l1.58.811.811,1.579a.412.412,0,0,0,.732,0l.811-1.579,1.58-.811a.412.412,0,0,0,0-.732l-1.58-.811-.811-1.58ZM63.27,7.561l.506.985a.407.407,0,0,0,.178.178l.986.507-.986.506a.413.413,0,0,0-.178.178l-.506.985-.506-.985a.413.413,0,0,0-.178-.178L61.6,9.231l.986-.507a.407.407,0,0,0,.178-.178Z" transform="translate(-46.505 -6.25)" strokeWidth="0.6" fillRule="evenodd"/>
                            <path id="Path_13351" data-name="Path 13351" d="M45.684,26.507H45.36a.411.411,0,0,0,0,.823h.324v.324a.411.411,0,0,0,.823,0V27.33h.322a.411.411,0,1,0,0-.823h-.322v-.322a.411.411,0,1,0-.823,0Z" transform="translate(-35.203 -20.634)" strokeWidth="0.6" fillRule="evenodd"/>
                            <path id="Path_13352" data-name="Path 13352" d="M8.334,52.911h21.33a.411.411,0,0,0,.411-.411V50.077A3.7,3.7,0,0,0,26.812,46.4a4.427,4.427,0,1,0-5,.005A3.7,3.7,0,0,0,19,48.38,3.7,3.7,0,0,0,16.147,46.4a4.427,4.427,0,1,0-5,.005,3.7,3.7,0,0,0-3.226,3.671V52.5a.411.411,0,0,0,.411.411Zm10.254-2.835v2.012H8.746V50.076A2.88,2.88,0,0,1,11.625,47.2h4.084a2.88,2.88,0,0,1,2.879,2.879Zm10.665,0v2.012H19.411V50.076A2.88,2.88,0,0,1,22.29,47.2h4.084a2.88,2.88,0,0,1,2.879,2.879ZM13.644,39.143a3.605,3.605,0,1,1-3.605,3.605A3.607,3.607,0,0,1,13.644,39.143Zm10.665,0A3.605,3.605,0,1,1,20.7,42.748,3.607,3.607,0,0,1,24.31,39.143Z" transform="translate(-7.923 -29.878)" strokeWidth="0.6" fillRule="evenodd"/>
                            <path id="Path_13353" data-name="Path 13353" d="M35.925,9.773H35.6a.411.411,0,0,0,0,.823h.322v.323a.411.411,0,1,0,.823,0V10.6h.324a.411.411,0,0,0,0-.823h-.324V9.45a.411.411,0,0,0-.823,0Z" transform="translate(-28.014 -8.305)" strokeWidth="0.6" fillRule="evenodd"/>
                            <path id="Path_13354" data-name="Path 13354" d="M51.262,15.351h-.324a.411.411,0,0,0,0,.823h.324V16.5a.411.411,0,1,0,.823,0v-.323h.322a.411.411,0,0,0,0-.823h-.322v-.323a.411.411,0,1,0-.823,0Z" transform="translate(-39.312 -12.414)" strokeWidth="0.6" fillRule="evenodd"/>
                            </g>
                        </g>
                    </svg>
                        Not Assigned
                </Button>
            </div>
            </div>
            <div className="ticket-form">
                <FormGroup className="common-formgroup">
                    <Input id="" name="" type="textarea" placeholder="Enter your ticket" rows="5"/>
                </FormGroup>
                <FormGroup className="common-formgroup">
                    <Button className="btn green-btn px-4 py-2 mb-2 me-2">Save Ticket</Button>
                    <Button className="btn yellow-btn px-4 py-2 mb-2 me-2">View  Ticket</Button>
                </FormGroup>
            </div>
        </ModalBody>
    </Modal>

    {/* View Tickets modal */}
    <Modal size="lg" className="common-modal new-ticket-modal" isOpen={toggleViewTickets} toggle={handleViewTickets}>
        <Button className="close-btn" onClick={handleViewTickets}><IoClose /></Button>
        <ModalBody>
            <div className="modal-heading">
            <h4>View Member Tickets</h4>
            </div>
            <div className="ticket-head mb-4">
            <div className="ticket-head-left">
                <div className="ticket-user-icon">
                    <img className="img-fluid" src={profileUser} alt="" />
                </div>
                <div className="ticket-user-info">
                    <h4>Praveen Bommannavar</h4>
                    <h5>NMGH245903</h5>

                    <ul className="tick-user-cont-info mt-4">
                        <li> <LuMailOpen /> <a href="mailto:sss1@gmail.com">sss1@gmail.com</a></li>
                        <li> <IoCallOutline /> <a href="tel:+1 9568 2356">+1 9568 2356</a></li>
                    </ul>
                </div>
            </div>
            <div className="ticket-head-right">
                <Button className="btn btn-light">
                    <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 22.752 23.633">
                        <g id="noun-people-6751180" transform="translate(-7.623 -5.95)">
                            <g id="Group_14007" data-name="Group 14007" transform="translate(7.923 6.25)">
                            <path id="Path_13349" data-name="Path 13349" d="M20.777,10.656a.412.412,0,0,0-.732,0l-.937,1.822-1.822.937a.411.411,0,0,0,0,.731l1.822.937.937,1.822a.412.412,0,0,0,.732,0l.936-1.822,1.822-.937a.41.41,0,0,0,0-.731l-1.822-.937Zm-.366,1.088.63,1.228a.415.415,0,0,0,.179.178l1.227.631-1.227.63a.415.415,0,0,0-.179.178l-.63,1.228-.63-1.228a.421.421,0,0,0-.179-.178l-1.227-.63L19.6,13.15a.421.421,0,0,0,.179-.178Z" transform="translate(-14.657 -9.332)" strokeWidth="0.6" fillRule="evenodd"/>
                            <path id="Path_13350" data-name="Path 13350" d="M63.636,6.473a.412.412,0,0,0-.732,0l-.811,1.58-1.58.811a.412.412,0,0,0,0,.732l1.58.811.811,1.579a.412.412,0,0,0,.732,0l.811-1.579,1.58-.811a.412.412,0,0,0,0-.732l-1.58-.811-.811-1.58ZM63.27,7.561l.506.985a.407.407,0,0,0,.178.178l.986.507-.986.506a.413.413,0,0,0-.178.178l-.506.985-.506-.985a.413.413,0,0,0-.178-.178L61.6,9.231l.986-.507a.407.407,0,0,0,.178-.178Z" transform="translate(-46.505 -6.25)" strokeWidth="0.6" fillRule="evenodd"/>
                            <path id="Path_13351" data-name="Path 13351" d="M45.684,26.507H45.36a.411.411,0,0,0,0,.823h.324v.324a.411.411,0,0,0,.823,0V27.33h.322a.411.411,0,1,0,0-.823h-.322v-.322a.411.411,0,1,0-.823,0Z" transform="translate(-35.203 -20.634)" strokeWidth="0.6" fillRule="evenodd"/>
                            <path id="Path_13352" data-name="Path 13352" d="M8.334,52.911h21.33a.411.411,0,0,0,.411-.411V50.077A3.7,3.7,0,0,0,26.812,46.4a4.427,4.427,0,1,0-5,.005A3.7,3.7,0,0,0,19,48.38,3.7,3.7,0,0,0,16.147,46.4a4.427,4.427,0,1,0-5,.005,3.7,3.7,0,0,0-3.226,3.671V52.5a.411.411,0,0,0,.411.411Zm10.254-2.835v2.012H8.746V50.076A2.88,2.88,0,0,1,11.625,47.2h4.084a2.88,2.88,0,0,1,2.879,2.879Zm10.665,0v2.012H19.411V50.076A2.88,2.88,0,0,1,22.29,47.2h4.084a2.88,2.88,0,0,1,2.879,2.879ZM13.644,39.143a3.605,3.605,0,1,1-3.605,3.605A3.607,3.607,0,0,1,13.644,39.143Zm10.665,0A3.605,3.605,0,1,1,20.7,42.748,3.607,3.607,0,0,1,24.31,39.143Z" transform="translate(-7.923 -29.878)" strokeWidth="0.6" fillRule="evenodd"/>
                            <path id="Path_13353" data-name="Path 13353" d="M35.925,9.773H35.6a.411.411,0,0,0,0,.823h.322v.323a.411.411,0,1,0,.823,0V10.6h.324a.411.411,0,0,0,0-.823h-.324V9.45a.411.411,0,0,0-.823,0Z" transform="translate(-28.014 -8.305)" strokeWidth="0.6" fillRule="evenodd"/>
                            <path id="Path_13354" data-name="Path 13354" d="M51.262,15.351h-.324a.411.411,0,0,0,0,.823h.324V16.5a.411.411,0,1,0,.823,0v-.323h.322a.411.411,0,0,0,0-.823h-.322v-.323a.411.411,0,1,0-.823,0Z" transform="translate(-39.312 -12.414)" strokeWidth="0.6" fillRule="evenodd"/>
                            </g>
                        </g>
                    </svg>
                        Not Assigned
                </Button>
            </div>
            </div>

            <div className="common-table">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>
                                Tickets ID
                            </th>
                            <th>
                                Tickets Details
                            </th>
                            <th>
                                Status
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
                                I245903
                            </td>
                            <td>
                            Simply Dummy Text
                            </td>
                            <td>
                             <span className="btn green-btn rounded-0 px-2 py-0 text-dark text-uppercase">Pending</span>
                            </td>
                            <td>
                                <Button className="light-green-btn tb-edit"><LiaEdit /></Button>
                            </td>
                            <td>
                                <Button className="btn-outline-style1 tb-del"><RiDeleteBin6Line /></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                I245903
                            </td>
                            <td>
                            Simply Dummy Text
                            </td>
                            <td>
                             <span className="btn blue-btn rounded-0 px-2 py-0 text-dark text-uppercase">Pending</span>
                            </td>
                            <td>
                                <Button className="light-green-btn tb-edit"><LiaEdit /></Button>
                            </td>
                            <td>
                                <Button className="btn-outline-style1 tb-del"><RiDeleteBin6Line /></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                I245903
                            </td>
                            <td>
                            Simply Dummy Text
                            </td>
                            <td>
                             <span className="btn blue-btn rounded-0 px-2 py-0 text-dark text-uppercase">Pending</span>
                            </td>
                            <td>
                                <Button className="light-green-btn tb-edit"><LiaEdit /></Button>
                            </td>
                            <td>
                                <Button className="btn-outline-style1 tb-del"><RiDeleteBin6Line /></Button>
                            </td>
                        </tr>
                                            
                    </tbody>
                </Table>
            </div>

            <div className="ticket-form">
                <FormGroup className="common-formgroup">
                    <Button className="btn green-btn px-4 py-2 mb-2 me-2" onClick={handleNewTicket}>Add Ticket</Button>
                </FormGroup>
            </div>
        </ModalBody>
    </Modal>

    {/* Plan Assignment modal */}
    <Modal size="xl" className="common-modal plan-assignment-modal" isOpen={togglePlanAssignment} toggle={handlePlanAssignment}>
        <Button className="close-btn" onClick={handlePlanAssignment}><IoClose /></Button>
        <ModalBody>
            <div className="modal-heading">
                <h4>Plan Assignment</h4>
            </div>
            <div className="plan-assignment-head mb-4">
                <Row>
                    <Col xs="12" lg="4" className="mb-3 mb-lg-0">
                        <div className="plan-assignment-user">
                            <div className="plan-user-icon">
                                <img className="img-fluid" src={profileUser} alt="" />
                            </div>
                            <div className="plan-user-info">
                                <h4>Praveen Bommannavar</h4>
                                <h5>NMGH245903</h5>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" lg="4" className="mb-3 mb-lg-0">
                        <div className="plan-assignment-contact-wrap">
                            <div class="contact-list">
                                <div class="icon">
                                    <TbMailOpened />
                                </div>
                                <div class="info">
                                    <p><a href="mailto:test789787@gmail.com">test789787@gmail.com</a></p>
                                </div>
                            </div>
                            <div class="contact-list">
                                <div class="icon">
                                    <BsTelephone />
                                </div>
                                <div class="info">
                                    <p><a href="tel:+1 9568 2356">+1 9568 2356</a></p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" lg="4" className="mb-3 mb-lg-0">
                        <div className="plan-assignment-location">
                            <p><span>Location :</span> Canada</p>
                            <p><span>Registered On :</span> November 25, 2019 12:24 PM</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="plan-assignment-form-wrap">
                <Row>
                    <Col xs="12" md="6" lg="4">
                        <FormGroup className="common-formgroup">
                            <Label> Looking For * </Label>
                            <Input id="" name="" type="select" >
                                <option>
                                Select Plan
                                </option>
                                <option>
                                    1
                                </option>
                                <option>
                                    2
                                </option>
                            </Input>
                        </FormGroup>
                        <FormGroup className="common-formgroup">
                            <Label> Payment Mode </Label>
                            <Input id="" name="" type="select" >
                                <option>
                                Select Payment Mode
                                </option>
                                <option>
                                    1
                                </option>
                                <option>
                                    2
                                </option>
                            </Input>
                        </FormGroup>
                        <FormGroup className="common-formgroup">
                            <Label> Activation Date </Label>
                            <Input id="" name="" type="select" >
                                <option>
                                10-07-2024
                                </option>
                                <option>
                                    1
                                </option>
                                <option>
                                    2
                                </option>
                            </Input>
                        </FormGroup>
                        <Row>
                            <Col xs="12" lg="6">
                                <FormGroup className="common-formgroup">
                                    <Label> Allow Video </Label>
                                    <ul className="common-radio-btn mt-2">
                                        <li>
                                            <Input
                                                id="AllowVideoYes"
                                                name="AllowVideo"
                                                type="radio"
                                            />
                                            <Label for="AllowVideoYes"> Yes </Label>
                                        </li>
                                        <li>
                                            <Input
                                                id="AllowVideoNo"
                                                name="AllowVideo"
                                                type="radio"
                                            />
                                            <Label for="AllowVideoNo"> No </Label>
                                        </li>
                                    </ul>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6">
                                <FormGroup className="common-formgroup">
                                    <Label> Allow Chat </Label>
                                    <ul className="common-radio-btn mt-2">
                                        <li>
                                            <Input
                                                id="AllowChatYes"
                                                name="AllowChat"
                                                type="radio"
                                            />
                                            <Label for="AllowChatYes"> Yes </Label>
                                        </li>
                                        <li>
                                            <Input
                                                id="AllowChatNo"
                                                name="AllowChat"
                                                type="radio"
                                            />
                                            <Label for="AllowChatNo"> No </Label>
                                        </li>
                                    </ul>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup className="common-formgroup">
                            <Label> Bank Details / Card Details </Label>
                            <Input id="" name="" type="text" placeholder="|"/>
                        </FormGroup>
                        <FormGroup className="common-formgroup">
                            <Label> Note </Label>
                            <Input id="" name="" type="text" placeholder="Enter Payment Note"/>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="8">
                        <Row>
                            <Col xs="12" lg="6">
                                <FormGroup className="common-formgroup">
                                    <Label> Duration in Days </Label>
                                    <Input id="" name="" type="text" placeholder="" value="90"/>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6">
                                <FormGroup className="common-formgroup">
                                    <Label> No of Contacts </Label>
                                    <Input id="" name="" type="text" placeholder="" value="100"/>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6">
                                <FormGroup className="common-formgroup">
                                    <Label> No of Message </Label>
                                    <Input id="" name="" type="text" placeholder="" value="100"/>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6">
                                <FormGroup className="common-formgroup">
                                    <Label> No of View Profile </Label>
                                    <Input id="" name="" type="text" placeholder="" value="200"/>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6">
                                <FormGroup className="common-formgroup">
                                    <Label> Currency </Label>
                                    <Input id="" name="" type="select" >
                                        <option>
                                        INR
                                        </option>
                                        <option>
                                            CAD
                                        </option>
                                        <option>
                                            USD
                                        </option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6">
                                <FormGroup className="common-formgroup">
                                    <Label> Plan Amount </Label>
                                    <Input id="" name="" type="text" placeholder="" value="149"/>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6">
                                <FormGroup className="common-formgroup">
                                    <Label>Amount Paid</Label>
                                    <Input id="" name="" type="text" placeholder="" value="169"/>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6">
                                <FormGroup className="common-formgroup">
                                    <Label>Discount</Label>
                                    <Input id="" name="" type="text" placeholder="" value="90"/>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6">
                                <FormGroup className="common-formgroup">
                                    <Label> Amount Remaining  </Label>
                                    <Input id="" name="" type="text" placeholder="|" value="0"/>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6">
                                <FormGroup className="common-formgroup">
                                    <Label> HST Tax (%) </Label>
                                    <Input id="" name="" type="text" placeholder="|" value="15"/>
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <div className="expiry-date">
                                    <p><span>Expiry Date :</span> 2024-10-08</p>
                                </div>
                            </Col>
                            <Col xs="12">
                                <FormGroup className="common-formgroup text-end">
                                    <Button className="btn btn-outline-style1 px-4 text-dark">Submit</Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </ModalBody>
    </Modal>

    {/* Plan Assignment modal 1 */}
    <Modal size="xl" className="common-modal plan-assignment-modal" isOpen={togglePlanAssignmentOne} toggle={handlePlanAssignmentOne}>
        <Button className="close-btn" onClick={handlePlanAssignmentOne}><IoClose /></Button>
        <ModalBody>
            <div className="modal-heading">
                <h4>Plan Assignment</h4>
            </div>
            <div className="plan-assignment-head mb-4">
                <Row>
                    <Col xs="12" lg="4" className="mb-3 mb-lg-0">
                        <div className="plan-assignment-user">
                            <div className="plan-user-icon">
                                <img className="img-fluid" src={profileUser} alt="" />
                            </div>
                            <div className="plan-user-info">
                                <h4>Praveen Bommannavar</h4>
                                <h5>NMGH245903</h5>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" lg="4" className="mb-3 mb-lg-0">
                        <div className="plan-assignment-contact-wrap">
                            <div class="contact-list">
                                <div class="icon">
                                    <TbMailOpened />
                                </div>
                                <div class="info">
                                    <p><a href="mailto:test789787@gmail.com">test789787@gmail.com</a></p>
                                </div>
                            </div>
                            <div class="contact-list">
                                <div class="icon">
                                    <BsTelephone />
                                </div>
                                <div class="info">
                                    <p><a href="tel:+1 9568 2356">+1 9568 2356</a></p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" lg="4" className="mb-3 mb-lg-0">
                        <div className="plan-assignment-location">
                            <p><span>Location :</span> Canada</p>
                            <p><span>Registered On :</span> November 25, 2019 12:24 PM</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="plan-assignment-form-wrap">
                <Row>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> Looking For * </Label>
                            <Input id="" name="" type="select" >
                                <option>
                                Diamond Plus ($  149 )
                                </option>
                                <option>
                                    1
                                </option>
                                <option>
                                    2
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> Duration in Days </Label>
                            <Input id="" name="" type="text" placeholder="" value="90"/>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> No of Contacts </Label>
                            <Input id="" name="" type="text" placeholder="" value="100"/>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> Payment Mode </Label>
                            <Input id="" name="" type="select" >
                                <option>
                                Select Payment Mode
                                </option>
                                <option>
                                    1
                                </option>
                                <option>
                                    2
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> No of Message </Label>
                            <Input id="" name="" type="text" placeholder="" value="100"/>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> No of View Profile </Label>
                            <Input id="" name="" type="text" placeholder="" value="200"/>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> Activation Date </Label>
                            <Input id="" name="" type="select" >
                                <option>
                                10-07-2024
                                </option>
                                <option>
                                    1
                                </option>
                                <option>
                                    2
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> Currency </Label>
                            <Input id="" name="" type="select" >
                                <option>
                                INR
                                </option>
                                <option>
                                    1
                                </option>
                                <option>
                                    2
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> Plan Amount </Label>
                            <Input id="" name="" type="text" placeholder="" value="149"/>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <Row>
                            <Col xs="12" lg="6">
                                <FormGroup className="common-formgroup">
                                    <Label> Allow Video </Label>
                                    <ul className="common-radio-btn mt-2">
                                        <li>
                                            <Input
                                                id="AllowVideoYes"
                                                name="AllowVideo"
                                                type="radio"
                                            />
                                            <Label for="AllowVideoYes"> Yes </Label>
                                        </li>
                                        <li>
                                            <Input
                                                id="AllowVideoNo"
                                                name="AllowVideo"
                                                type="radio"
                                            />
                                            <Label for="AllowVideoNo"> No </Label>
                                        </li>
                                    </ul>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6">
                                <FormGroup className="common-formgroup">
                                    <Label> Allow Chat </Label>
                                    <ul className="common-radio-btn mt-2">
                                        <li>
                                            <Input
                                                id="AllowChatYes"
                                                name="AllowChat"
                                                type="radio"
                                            />
                                            <Label for="AllowChatYes"> Yes </Label>
                                        </li>
                                        <li>
                                            <Input
                                                id="AllowChatNo"
                                                name="AllowChat"
                                                type="radio"
                                            />
                                            <Label for="AllowChatNo"> No </Label>
                                        </li>
                                    </ul>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label>Amount Paid</Label>
                            <Input id="" name="" type="text" placeholder="" value="169"/>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label>Discount</Label>
                            <Input id="" name="" type="text" placeholder="" value="90"/>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> Bank Details / Card Details </Label>
                            <Input id="" name="" type="text" placeholder="|"/>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> Amount Remaining  </Label>
                            <Input id="" name="" type="text" placeholder="|" value="0"/>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> HST Tax (%) </Label>
                            <Input id="" name="" type="text" placeholder="|" value="15"/>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="4" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> Note </Label>
                            <Input id="" name="" type="text" placeholder="Enter Payment Note"/>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6" lg="4">
                        <div className="expiry-date">
                            <p><span>Expiry Date :</span> 2024-10-08</p>
                        </div>
                    </Col>
                    <Col xs="12" md="6" lg="4">
                        <FormGroup className="common-formgroup text-end">
                            <Button className="btn btn-outline-style1 px-4 text-dark">Submit</Button>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        </ModalBody>
    </Modal>

    {/* Add Comment modal */}
    <Modal size="lg" className="common-modal new-ticket-modal" isOpen={toggleAddComment} toggle={handleAddComment}>
        <Button className="close-btn" onClick={handleAddComment}><IoClose /></Button>
        <ModalBody>
            <div className="modal-heading">
            <h4>Add Comment</h4>
            </div>
            <div className="ticket-head mb-4">
            <div className="ticket-head-left">
                <div className="ticket-user-icon">
                    <img className="img-fluid" src={profileUser} alt="" />
                </div>
                <div className="ticket-user-info">
                    <h4>Praveen Bommannavar</h4>
                    <h5>NMGH245903</h5>

                    <ul className="tick-user-cont-info mt-4">
                        <li> <LuMailOpen /> <a href="mailto:sss1@gmail.com">sss1@gmail.com</a></li>
                        <li> <IoCallOutline /> <a href="tel:+1 9568 2356">+1 9568 2356</a></li>
                    </ul>
                </div>
            </div>
            <div className="ticket-head-right">
                <Button className="btn btn-light">
                    <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 22.752 23.633">
                        <g id="noun-people-6751180" transform="translate(-7.623 -5.95)">
                            <g id="Group_14007" data-name="Group 14007" transform="translate(7.923 6.25)">
                            <path id="Path_13349" data-name="Path 13349" d="M20.777,10.656a.412.412,0,0,0-.732,0l-.937,1.822-1.822.937a.411.411,0,0,0,0,.731l1.822.937.937,1.822a.412.412,0,0,0,.732,0l.936-1.822,1.822-.937a.41.41,0,0,0,0-.731l-1.822-.937Zm-.366,1.088.63,1.228a.415.415,0,0,0,.179.178l1.227.631-1.227.63a.415.415,0,0,0-.179.178l-.63,1.228-.63-1.228a.421.421,0,0,0-.179-.178l-1.227-.63L19.6,13.15a.421.421,0,0,0,.179-.178Z" transform="translate(-14.657 -9.332)" strokeWidth="0.6" fillRule="evenodd"/>
                            <path id="Path_13350" data-name="Path 13350" d="M63.636,6.473a.412.412,0,0,0-.732,0l-.811,1.58-1.58.811a.412.412,0,0,0,0,.732l1.58.811.811,1.579a.412.412,0,0,0,.732,0l.811-1.579,1.58-.811a.412.412,0,0,0,0-.732l-1.58-.811-.811-1.58ZM63.27,7.561l.506.985a.407.407,0,0,0,.178.178l.986.507-.986.506a.413.413,0,0,0-.178.178l-.506.985-.506-.985a.413.413,0,0,0-.178-.178L61.6,9.231l.986-.507a.407.407,0,0,0,.178-.178Z" transform="translate(-46.505 -6.25)" strokeWidth="0.6" fillRule="evenodd"/>
                            <path id="Path_13351" data-name="Path 13351" d="M45.684,26.507H45.36a.411.411,0,0,0,0,.823h.324v.324a.411.411,0,0,0,.823,0V27.33h.322a.411.411,0,1,0,0-.823h-.322v-.322a.411.411,0,1,0-.823,0Z" transform="translate(-35.203 -20.634)" strokeWidth="0.6" fillRule="evenodd"/>
                            <path id="Path_13352" data-name="Path 13352" d="M8.334,52.911h21.33a.411.411,0,0,0,.411-.411V50.077A3.7,3.7,0,0,0,26.812,46.4a4.427,4.427,0,1,0-5,.005A3.7,3.7,0,0,0,19,48.38,3.7,3.7,0,0,0,16.147,46.4a4.427,4.427,0,1,0-5,.005,3.7,3.7,0,0,0-3.226,3.671V52.5a.411.411,0,0,0,.411.411Zm10.254-2.835v2.012H8.746V50.076A2.88,2.88,0,0,1,11.625,47.2h4.084a2.88,2.88,0,0,1,2.879,2.879Zm10.665,0v2.012H19.411V50.076A2.88,2.88,0,0,1,22.29,47.2h4.084a2.88,2.88,0,0,1,2.879,2.879ZM13.644,39.143a3.605,3.605,0,1,1-3.605,3.605A3.607,3.607,0,0,1,13.644,39.143Zm10.665,0A3.605,3.605,0,1,1,20.7,42.748,3.607,3.607,0,0,1,24.31,39.143Z" transform="translate(-7.923 -29.878)" strokeWidth="0.6" fillRule="evenodd"/>
                            <path id="Path_13353" data-name="Path 13353" d="M35.925,9.773H35.6a.411.411,0,0,0,0,.823h.322v.323a.411.411,0,1,0,.823,0V10.6h.324a.411.411,0,0,0,0-.823h-.324V9.45a.411.411,0,0,0-.823,0Z" transform="translate(-28.014 -8.305)" strokeWidth="0.6" fillRule="evenodd"/>
                            <path id="Path_13354" data-name="Path 13354" d="M51.262,15.351h-.324a.411.411,0,0,0,0,.823h.324V16.5a.411.411,0,1,0,.823,0v-.323h.322a.411.411,0,0,0,0-.823h-.322v-.323a.411.411,0,1,0-.823,0Z" transform="translate(-39.312 -12.414)" strokeWidth="0.6" fillRule="evenodd"/>
                            </g>
                        </g>
                    </svg>
                        Not Assigned
                </Button>
            </div>
            </div>
            <div className="ticket-form">
                <FormGroup className="common-formgroup">
                    <Input id="" name="" type="textarea" placeholder="Enter your ticket" rows="5"/>
                </FormGroup>
                <FormGroup className="common-formgroup">
                    <Label>Next Followup Date</Label>
                    <Input id="" name="" type="date" placeholder="Enter your ticket" rows="5"/>
                </FormGroup>
                <FormGroup className="common-formgroup">
                    <Button className="btn green-btn px-4 py-2 mb-2 me-2">Save Comment</Button>
                    <Button className="btn yellow-btn px-4 py-2 mb-2 me-2">View Comments</Button>
                </FormGroup>
            </div>
        </ModalBody>
    </Modal>

    {/* View Comment modal */}
    <Modal size="lg" className="common-modal new-ticket-modal" isOpen={toggleViewAddComment} toggle={handleViewAddComment}>
        <Button className="close-btn" onClick={handleViewAddComment}><IoClose /></Button>
        <ModalBody>
            <div className="modal-heading">
            <h4>View Comment</h4>
            </div>
            <div className="ticket-head mb-4">
                <div className="ticket-head-left">
                    <div className="ticket-user-icon">
                        <img className="img-fluid" src={profileUser} alt="" />
                    </div>
                    <div className="ticket-user-info">
                        <h4>Praveen Bommannavar</h4>
                        <h5>NMGH245903</h5>

                        <ul className="tick-user-cont-info mt-4">
                            <li> <LuMailOpen /> <a href="mailto:sss1@gmail.com">sss1@gmail.com</a></li>
                            <li> <IoCallOutline /> <a href="tel:+1 9568 2356">+1 9568 2356</a></li>
                        </ul>
                    </div>
                </div>
                <div className="ticket-head-right">
                    <Button className="btn btn-light">
                        <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 22.752 23.633">
                            <g id="noun-people-6751180" transform="translate(-7.623 -5.95)">
                                <g id="Group_14007" data-name="Group 14007" transform="translate(7.923 6.25)">
                                <path id="Path_13349" data-name="Path 13349" d="M20.777,10.656a.412.412,0,0,0-.732,0l-.937,1.822-1.822.937a.411.411,0,0,0,0,.731l1.822.937.937,1.822a.412.412,0,0,0,.732,0l.936-1.822,1.822-.937a.41.41,0,0,0,0-.731l-1.822-.937Zm-.366,1.088.63,1.228a.415.415,0,0,0,.179.178l1.227.631-1.227.63a.415.415,0,0,0-.179.178l-.63,1.228-.63-1.228a.421.421,0,0,0-.179-.178l-1.227-.63L19.6,13.15a.421.421,0,0,0,.179-.178Z" transform="translate(-14.657 -9.332)" strokeWidth="0.6" fillRule="evenodd"/>
                                <path id="Path_13350" data-name="Path 13350" d="M63.636,6.473a.412.412,0,0,0-.732,0l-.811,1.58-1.58.811a.412.412,0,0,0,0,.732l1.58.811.811,1.579a.412.412,0,0,0,.732,0l.811-1.579,1.58-.811a.412.412,0,0,0,0-.732l-1.58-.811-.811-1.58ZM63.27,7.561l.506.985a.407.407,0,0,0,.178.178l.986.507-.986.506a.413.413,0,0,0-.178.178l-.506.985-.506-.985a.413.413,0,0,0-.178-.178L61.6,9.231l.986-.507a.407.407,0,0,0,.178-.178Z" transform="translate(-46.505 -6.25)" strokeWidth="0.6" fillRule="evenodd"/>
                                <path id="Path_13351" data-name="Path 13351" d="M45.684,26.507H45.36a.411.411,0,0,0,0,.823h.324v.324a.411.411,0,0,0,.823,0V27.33h.322a.411.411,0,1,0,0-.823h-.322v-.322a.411.411,0,1,0-.823,0Z" transform="translate(-35.203 -20.634)" strokeWidth="0.6" fillRule="evenodd"/>
                                <path id="Path_13352" data-name="Path 13352" d="M8.334,52.911h21.33a.411.411,0,0,0,.411-.411V50.077A3.7,3.7,0,0,0,26.812,46.4a4.427,4.427,0,1,0-5,.005A3.7,3.7,0,0,0,19,48.38,3.7,3.7,0,0,0,16.147,46.4a4.427,4.427,0,1,0-5,.005,3.7,3.7,0,0,0-3.226,3.671V52.5a.411.411,0,0,0,.411.411Zm10.254-2.835v2.012H8.746V50.076A2.88,2.88,0,0,1,11.625,47.2h4.084a2.88,2.88,0,0,1,2.879,2.879Zm10.665,0v2.012H19.411V50.076A2.88,2.88,0,0,1,22.29,47.2h4.084a2.88,2.88,0,0,1,2.879,2.879ZM13.644,39.143a3.605,3.605,0,1,1-3.605,3.605A3.607,3.607,0,0,1,13.644,39.143Zm10.665,0A3.605,3.605,0,1,1,20.7,42.748,3.607,3.607,0,0,1,24.31,39.143Z" transform="translate(-7.923 -29.878)" strokeWidth="0.6" fillRule="evenodd"/>
                                <path id="Path_13353" data-name="Path 13353" d="M35.925,9.773H35.6a.411.411,0,0,0,0,.823h.322v.323a.411.411,0,1,0,.823,0V10.6h.324a.411.411,0,0,0,0-.823h-.324V9.45a.411.411,0,0,0-.823,0Z" transform="translate(-28.014 -8.305)" strokeWidth="0.6" fillRule="evenodd"/>
                                <path id="Path_13354" data-name="Path 13354" d="M51.262,15.351h-.324a.411.411,0,0,0,0,.823h.324V16.5a.411.411,0,1,0,.823,0v-.323h.322a.411.411,0,0,0,0-.823h-.322v-.323a.411.411,0,1,0-.823,0Z" transform="translate(-39.312 -12.414)" strokeWidth="0.6" fillRule="evenodd"/>
                                </g>
                            </g>
                        </svg>
                            Not Assigned
                    </Button>
                </div>
            </div>
            <div className="view-comment-wrapper">
                <div className="view-comment-head">
                    <h3>Total Comments <span>(3)</span></h3>
                </div>
                <div className="view-comment-wrap">
                    <ul>
                        <li>
                            <div className="view-comment-list">
                                <div className="user-img">
                                    <img className="img-fluid" src={profileUser} alt="" />
                                </div>
                                <div className="comment-right-wrap">
                                    <h4>Praveen Bommannavar <span> 02:38 AM, 18, Oct 2024</span></h4>
                                    <h6>Next Followup Date :October 19, 2024</h6>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem molestias ratione nisi fugiat, neque nesciunt quos alias, quam vero eaque earum ab, placeat necessitatibus excepturi adipisci reiciendis fugit repellendus. Saepe!</p>
                                </div>
                            </div> 
                        </li>
                        <li>
                            <div className="view-comment-list">
                                <div className="user-img">
                                    <img className="img-fluid" src={profileUser} alt="" />
                                </div>
                                <div className="comment-right-wrap">
                                    <h4>Praveen Bommannavar <span> 02:38 AM, 18, Oct 2024</span></h4>
                                    <h6>Next Followup Date :October 19, 2024</h6>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                                </div>
                            </div> 
                        </li>
                        <li>
                            <div className="view-comment-list">
                                <div className="user-img">
                                    <img className="img-fluid" src={profileUser} alt="" />
                                </div>
                                <div className="comment-right-wrap">
                                    <h4>Praveen Bommannavar <span> 02:38 AM, 18, Oct 2024</span></h4>
                                    <h6>Next Followup Date :October 19, 2024</h6>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                                </div>
                            </div> 
                        </li>
                    </ul>
                </div>
            </div>
            <div className="ticket-form">
                <FormGroup className="common-formgroup">
                    <Button className="btn green-btn px-4 py-2 mb-2 me-2">Load more comments</Button>
                    <Button className="btn yellow-btn px-4 py-2 mb-2 me-2" onClick={handleAddComment}>Add Comments</Button>
                </FormGroup>
            </div>
        </ModalBody>
    </Modal>

    {/* Send Quick Email modal */}
    <Modal size="lg" className="common-modal send-quick-email-modal" isOpen={toggleSendQuickEmail} toggle={handleSendQuickEmail}>
        <Button className="close-btn" onClick={handleSendQuickEmail}><IoClose /></Button>
        <ModalBody>
            <div className="modal-heading">
            <h4>Send Quick Email</h4>
            </div>
            <div className="ticket-head mb-4">
                <div className="ticket-head-left">
                    <div className="ticket-user-icon">
                        <img className="img-fluid" src={profileUser} alt="" />
                    </div>
                    <div className="ticket-user-info">
                        <h4>Praveen Bommannavar</h4>
                        <h5>NMGH245903</h5>

                        <ul className="tick-user-cont-info mt-4">
                            <li> <LuMailOpen /> <a href="mailto:sss1@gmail.com">sss1@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
                <div className="ticket-head-right">
                    <Button className="btn btn-style1">
                        Send Manual Email
                    </Button>
                </div>
            </div>
            <div className="send-quick-email-wrap">
                <FormGroup className="common-formgroup">
                    <Label> Select Email Template </Label>
                    <Input id="" name="" type="select" >
                        <option>
                        Select Email Template
                        </option>
                        <option>
                        Membership on hold
                        </option>
                        <option>
                        Valentine day
                        </option>
                        <option>
                        Happy Diwali
                        </option>
                        <option>
                        Delete Member
                        </option>
                    </Input>
                </FormGroup>
            </div>
            <div className="ticket-form">
                <FormGroup className="common-formgroup">
                    <Button className="btn green-btn px-4 py-2 mb-2 me-2">Send Email</Button>
                </FormGroup>
            </div>
        </ModalBody>
    </Modal>

    </>
  )
}



export default PopupDesign
