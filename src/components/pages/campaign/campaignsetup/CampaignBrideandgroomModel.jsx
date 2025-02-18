import React from 'react'
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Modal, ModalBody, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import profileUser from "../../../../assets/images/no-images-available.jpg";
import LocalPagination from '../../../../utils/LocalPagination';
import ButtonLoader from '../../../../utils/Loader/ButtonLoader';
import Loader from '../../../../utils/Loader/Loader';
import NoActiveDataFound from '../../../../utils/NoActiveDataFound';
import config from '../../../../../config';

const CampaignBrideandgroomModel = ({ currentSelectedTab, isSelectAll, handleSelectAll, pageSize, isLoading, List, currentPage, onPageChange, handleOpenBrideandGroomModel, toggleBrideGroomModel, handleCloseBrideandGroomModel, checkboxList, handleCheckedUser }) => {
    return (
        <> <Modal size="lg" className="common-modal campaing-modal" isOpen={toggleBrideGroomModel} toggle={handleOpenBrideandGroomModel}>
            <Button className="close-btn" onClick={handleCloseBrideandGroomModel}><IoClose /></Button>
            <ModalBody>
                <div className="modal-heading">
                    <h4>Select Bride and Groom</h4>
                </div>
                <FormGroup className="mb-2 mb-md-2">
                    <Input id="select-all" type="checkbox" checked={isSelectAll} onClick={handleSelectAll} /> <Label htmlFor='select-all'>Select All</Label>
                </FormGroup>
                <div className='campaing-bride-groom-wrap'>
                    {isSelectAll ? <p>You have seleted all</p> : <Row>
                        {
                            isLoading ? <Loader /> : List?.data?.count == 0 ? <NoActiveDataFound msg={"No data Found"} /> : List?.data?.results?.map((each) => {
                                const ids = each?.id
                                // each = each?.brideandgroom;
                                const isChecked = checkboxList.some(
                                    (user) => user.id === ids
                                );
                                // console.log(each, "currentSelectedTab")
                                let src;
                                if (currentSelectedTab == "brideandgroom" && each?.photos?.length) {
                                    src = `${config.apiUrl}${each.photos[0].upload_url}`
                                } else if ((currentSelectedTab == "organization" || currentSelectedTab == "franchise") && each?.image_url) {
                                    src = each?.image_url
                                }
                                else{
                                    src =profileUser
                                }
                                return <Col md="6" lg="4" className='mb-3'>
                                    <div className="select-bride-groom-list">
                                        <FormGroup className="mb-0">
                                            <Input id={each.id} type="checkbox" checked={isChecked}
                                                onClick={(e) => handleCheckedUser(e, ids, each)} />
                                            <Label htmlFor={each.id}>
                                                <div className='bng-img'><img
                                                    className="img-fluid"
                                                    src={src}
                                                    alt=""
                                                /></div>
                                                <div className='bng-details'><p>{currentSelectedTab == "brideandgroom" ? each?.user?.first_name || "" : each?.owner_name || ""}{" "}
                                                    {currentSelectedTab == "brideandgroom" && each?.user?.last_name || ""}</p>
                                                    <h6>{each?.user?.email || ""}{" "}</h6>
                                                    <span> {each?.code || "N/A"}</span>
                                                </div>
                                            </Label>
                                        </FormGroup>
                                    </div>
                                </Col>

                            })
                        }


                    </Row>}
                </div>
                <div className="ticket-form">
                    <FormGroup className="common-formgroup mb-0 text-end">
                        <Button type='submit' className="btn btn-outline-style1 px-4 py-2 mb-2 me-2" onClick={handleCloseBrideandGroomModel}>Close</Button>
                    </FormGroup>
                </div>

                {!isSelectAll && !isLoading && <LocalPagination
                    count={List?.data?.count || []}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                />}
            </ModalBody>
        </Modal></>
    )
}

export default CampaignBrideandgroomModel