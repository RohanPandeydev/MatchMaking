import React, { useState } from 'react'
import Wrapper from '../../../layouts/Wrapper'
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Modal, ModalBody, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'
import profileUser from "../../../../assets/images/no-images-available.jpg";
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import classnames from 'classnames';
const Campaign = () => {
    const [activeTab, setActiveTab] = useState('1');
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
        setActiveTab(tab);
        }
    };
    // Select Bride Groom modal
    const [toggleSelectBrideGroom, setSelectBrideGroom] = useState(false);
    const handleSelectBrideGroom = () => setSelectBrideGroom(!toggleSelectBrideGroom);

  return (
    <Wrapper>
      <div className='campaign-page-wrapper'>
        <div className='campaign-tab-wrap'>
            <Nav tabs>
                <NavItem>
                    <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => toggleTab('1')}
            >
                        Send Email
                    </NavLink>
                </NavItem>
                <NavItem>
                <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => toggleTab('2')}
          >
                        Send SMS
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                <div className='common-db-head mb-4'>
                    <Row>
                        <div className='col-12 col-md-4'>
                            <div className='select-bride-groom-dropdown'>
                                <Button className='btn btn-style1' onClick={handleSelectBrideGroom}>Select Bride and Groom</Button>
                            </div>
                        </div>
                    </Row>
                </div>
                <div className='campaing-bride-groom-wrap campaing-bride-groom-selectd-wrap'>
                    <Row>
                        <Col xs="12" md="4" lg="2" className='mb-3'>
                            <div className="select-bride-groom-list">
                                <Label for="Religion"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                                <Button className='close-btn'><IoCloseOutline /></Button>
                            </div>
                        </Col>
                        <Col xs="12" md="4" lg="2" className='mb-3'>
                            <div className="select-bride-groom-list">
                                <Label for="Religion"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                                <Button className='close-btn'><IoCloseOutline /></Button>
                            </div>
                        </Col>
                        <Col xs="12" md="4" lg="2" className='mb-3'>
                            <div className="select-bride-groom-list">
                                <Label for="Religion"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                                <Button className='close-btn'><IoCloseOutline /></Button>
                            </div>
                        </Col>
                        <Col xs="12" md="4" lg="2" className='mb-3'>
                            <div className="select-bride-groom-list">
                                <Label for="Religion"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                                <Button className='close-btn'><IoCloseOutline /></Button>
                            </div>
                        </Col>
                        <Col xs="12" md="4" lg="2" className='mb-3'>
                            <div className="select-bride-groom-list">
                                <Label for="Religion"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                                <Button className='close-btn'><IoCloseOutline /></Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='campaign-body-wrap'>
                    <FormGroup className='common-formgroup'>
                        <Label for="exampleEmail">
                            Message
                        </Label>
                        <Input
                        id=""
                        name=""
                        rows="8"
                        placeholder="with a placeholder"
                        type="textarea"
                        />
                        
                    </FormGroup>
                    <FormGroup className='common-formgroup text-end'>
                        <Button className='btn btn-style1'>Send</Button>
                    </FormGroup>
                </div>
            </TabPane>
            <TabPane tabId="2">
                <div className='common-db-head mb-4'>
                    <Row>
                        <div className='col-12 col-md-4'>
                            <div className='select-bride-groom-dropdown'>
                                <Button className='btn btn-style1' onClick={handleSelectBrideGroom}>Select Bride and Groom</Button>
                            </div>
                        </div>
                    </Row>
                </div>
                <div className='campaing-bride-groom-wrap campaing-bride-groom-selectd-wrap'>
                    <Row>
                        <Col xs="12" md="4" lg="2" className='mb-3'>
                            <div className="select-bride-groom-list">
                                <Label for="Religion"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                                <Button className='close-btn'><IoCloseOutline /></Button>
                            </div>
                        </Col>
                        <Col xs="12" md="4" lg="2" className='mb-3'>
                            <div className="select-bride-groom-list">
                                <Label for="Religion"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                                <Button className='close-btn'><IoCloseOutline /></Button>
                            </div>
                        </Col>
                        <Col xs="12" md="4" lg="2" className='mb-3'>
                            <div className="select-bride-groom-list">
                                <Label for="Religion"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                                <Button className='close-btn'><IoCloseOutline /></Button>
                            </div>
                        </Col>
                        <Col xs="12" md="4" lg="2" className='mb-3'>
                            <div className="select-bride-groom-list">
                                <Label for="Religion"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                                <Button className='close-btn'><IoCloseOutline /></Button>
                            </div>
                        </Col>
                        <Col xs="12" md="4" lg="2" className='mb-3'>
                            <div className="select-bride-groom-list">
                                <Label for="Religion"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                                <Button className='close-btn'><IoCloseOutline /></Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='campaign-body-wrap'>
                    <FormGroup className='common-formgroup'>
                        <Label for="exampleEmail">
                            Message
                        </Label>
                        <Input
                        id=""
                        name=""
                        rows="8"
                        placeholder="with a placeholder"
                        type="textarea"
                        />
                        
                    </FormGroup>
                    <FormGroup className='common-formgroup text-end'>
                        <Button className='btn btn-style1'>Send</Button>
                    </FormGroup>
                </div>
            </TabPane>
        </TabContent>
        
      </div>

      {/* View Tickets modal */}
    <Modal size="lg" className="common-modal campaing-modal" isOpen={toggleSelectBrideGroom} toggle={handleSelectBrideGroom}>
        <Button className="close-btn" onClick={handleSelectBrideGroom}><IoClose /></Button>
        <ModalBody>
            <div className="modal-heading">
                <h4>Select Bride and Groom</h4>
            </div>
            <div className='campaing-bride-groom-wrap'>
                <Row>
                    <Col md="6" lg="4" className='mb-3'>
                        <div className="select-bride-groom-list">
                            <FormGroup className="mb-0">
                                <Input id="Religion" type="checkbox" />
                                <Label for="Religion"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                            </FormGroup>
                        </div>
                    </Col>
                    <Col md="6" lg="4" className='mb-3'>
                        <div className="select-bride-groom-list">
                            <FormGroup className="mb-0">
                                <Input id="Religion1" type="checkbox" />
                                <Label for="Religion1"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                            </FormGroup>
                        </div>
                    </Col>
                    <Col md="6" lg="4" className='mb-3'>
                        <div className="select-bride-groom-list">
                            <FormGroup className="mb-0">
                                <Input id="Religion2" type="checkbox" />
                                <Label for="Religion2"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                            </FormGroup>
                        </div>
                    </Col>
                    <Col md="6" lg="4" className='mb-3'>
                        <div className="select-bride-groom-list">
                            <FormGroup className="mb-0">
                                <Input id="Religion3" type="checkbox" />
                                <Label for="Religion3"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                            </FormGroup>
                        </div>
                    </Col>
                    <Col md="6" lg="4" className='mb-3'>
                        <div className="select-bride-groom-list">
                            <FormGroup className="mb-0">
                                <Input id="Religion4" type="checkbox" />
                                <Label for="Religion4"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                            </FormGroup>
                        </div>
                    </Col>
                    <Col md="6" lg="4" className='mb-3'>
                        <div className="select-bride-groom-list">
                            <FormGroup className="mb-0">
                                <Input id="Religion5" type="checkbox" />
                                <Label for="Religion5"> 
                                    <div className='bng-img'><img src={profileUser} alt="" /></div> 
                                    <div className='bng-details'><p>Rohan Kumar</p> <span>SMBD231D6</span></div>
                                </Label>
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="ticket-form">
                <FormGroup className="common-formgroup mb-0 text-end">
                    <Button className="btn btn-outline-style1 px-4 py-2 mb-2 me-2" onClick={handleSelectBrideGroom}>Saved</Button>
                </FormGroup>
            </div>
        </ModalBody>
    </Modal>
    </Wrapper>
  )
}

export default Campaign
