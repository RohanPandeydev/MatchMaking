import React from 'react'
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Modal, ModalBody, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'
import { IoClose, IoCloseOutline } from 'react-icons/io5';


const SendandDraftModel = ({ handleOpenBrideandGroomModel, toggleBrideGroomModel, handleCloseBrideandGroomModel }) => {
    return (
        <> <Modal size="lg" className="common-modal campaing-modal" isOpen={toggleBrideGroomModel} toggle={handleOpenBrideandGroomModel}>
            <Button className="close-btn" onClick={handleCloseBrideandGroomModel}><IoClose /></Button>
            <ModalBody>
                <div className="modal-heading">
                    <h4>Select Bride and Groom</h4>
                </div>
                <div className='campaing-bride-groom-wrap'>
                    <Row>
                        

                    </Row>
                </div>
                <div className="ticket-form">
                    <FormGroup className="common-formgroup mb-0 text-end">
                        <Button type='submit' className="btn btn-outline-style1 px-4 py-2 mb-2 me-2" onClick={handleCloseBrideandGroomModel}>Close</Button>
                    </FormGroup>
                </div>

              
            </ModalBody>
        </Modal></>
    )
}

export default SendandDraftModel