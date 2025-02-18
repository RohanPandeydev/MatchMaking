import React from 'react'
import Wrapper from '../../../layouts/Wrapper'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { FiPlus } from 'react-icons/fi'

const EditStaffDetails = () => {
  return (
    <Wrapper>
        <div className="common-db-head all-staff-head mb-3">
            {/* <Row>
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
            </Row> */}
        </div>
        <div className="staffrole-edit-form-wrap">
            <Row>
                <Col xs="12" lg="12" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Role Name * </Label>
                        <Input
                        id=""
                        name=""
                        placeholder="|"
                        type="text"
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Status </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="ApprovedStatusApproved"
                                name="ApprovedStatus"
                                type="radio"
                                />
                                <Label htmlFor="ApprovedStatusApproved"> APPROVED </Label>
                            </li>
                            <li>
                                <Input
                                id="ApprovedStatusUNApproved"
                                name="ApprovedStatus"
                                type="radio"
                                />
                                <Label htmlFor="ApprovedStatusUNApproved"> UNAPPROVED </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Add Member </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="AddMemberYes"
                                name="AddMember"
                                type="radio"
                                />
                                <Label htmlFor="AddMemberYes"> Yes </Label>
                            </li>
                            <li>
                                <Input
                                id="AddMemberNo"
                                name="AddMember"
                                type="radio"
                                />
                                <Label htmlFor="AddMemberNo"> No </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Delete Member </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="DeleteMemberAllMembers"
                                name="DeleteMember"
                                type="radio"
                                />
                                <Label htmlFor="DeleteMemberAllMembers"> All Members </Label>
                            </li>
                            <li>
                                <Input
                                id="DeleteMemberOwnMembers"
                                name="DeleteMember"
                                type="radio"
                                />
                                <Label htmlFor="DeleteMemberOwnMembers"> Own Members </Label>
                            </li>
                            <li>
                                <Input
                                id="DeleteMemberNo"
                                name="DeleteMember"
                                type="radio"
                                />
                                <Label htmlFor="DeleteMemberNo"> No </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> View Member </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="ViewMemberAllMembers"
                                name="ViewMember"
                                type="radio"
                                />
                                <Label htmlFor="ViewMemberAllMembers"> All Members </Label>
                            </li>
                            <li>
                                <Input
                                id="ViewMemberOwnMembers"
                                name="ViewMember"
                                type="radio"
                                />
                                <Label htmlFor="ViewMemberOwnMembers"> Own Members </Label>
                            </li>
                            
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Edit Member </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="EditMemberAllMembers"
                                name="EditMember"
                                type="radio"
                                />
                                <Label htmlFor="EditMemberAllMembers"> All Members </Label>
                            </li>
                            <li>
                                <Input
                                id="EditMemberOwnMembers"
                                name="EditMember"
                                type="radio"
                                />
                                <Label htmlFor="EditMemberOwnMembers"> Own Members </Label>
                            </li>
                            <li>
                                <Input
                                id="EditMemberNo"
                                name="EditMember"
                                type="radio"
                                />
                                <Label htmlFor="EditMemberNo"> No </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Suspend Member </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="SuspendMemberAllMembers"
                                name="SuspendMember"
                                type="radio"
                                />
                                <Label htmlFor="SuspendMemberAllMembers"> All Members </Label>
                            </li>
                            <li>
                                <Input
                                id="SuspendMemberOwnMembers"
                                name="SuspendMember"
                                type="radio"
                                />
                                <Label htmlFor="SuspendMemberOwnMembers"> Own Members </Label>
                            </li>
                            <li>
                                <Input
                                id="SuspendMemberNo"
                                name="SuspendMember"
                                type="radio"
                                />
                                <Label htmlFor="SuspendMemberNo"> No </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Inactive To Active </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="InactiveToActiveAllMembers"
                                name="InactiveToActive"
                                type="radio"
                                />
                                <Label htmlFor="InactiveToActiveAllMembers"> All Members </Label>
                            </li>
                            <li>
                                <Input
                                id="InactiveToActiveOwnMembers"
                                name="InactiveToActive"
                                type="radio"
                                />
                                <Label htmlFor="InactiveToActiveOwnMembers"> Own Members </Label>
                            </li>
                            <li>
                                <Input
                                id="InactiveToActiveNo"
                                name="InactiveToActive"
                                type="radio"
                                />
                                <Label htmlFor="InactiveToActiveNo"> No </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Active To Inactive </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="ActiveToInactiveAllMembers"
                                name="ActiveToInactive"
                                type="radio"
                                />
                                <Label htmlFor="ActiveToInactiveAllMembers"> All Members </Label>
                            </li>
                            <li>
                                <Input
                                id="ActiveToInactiveOwnMembers"
                                name="ActiveToInactive"
                                type="radio"
                                />
                                <Label htmlFor="ActiveToInactiveOwnMembers"> Own Members </Label>
                            </li>
                            <li>
                                <Input
                                id="ActiveToInactiveNo"
                                name="ActiveToInactive"
                                type="radio"
                                />
                                <Label htmlFor="ActiveToInactiveNo"> No </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Active To Paid </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="ActiveToPaidAllMembers"
                                name="ActiveToPaid"
                                type="radio"
                                />
                                <Label htmlFor="ActiveToPaidAllMembers"> All Members </Label>
                            </li>
                            <li>
                                <Input
                                id="ActiveToPaidOwnMembers"
                                name="ActiveToPaid"
                                type="radio"
                                />
                                <Label htmlFor="ActiveToPaidOwnMembers"> Own Members </Label>
                            </li>
                            <li>
                                <Input
                                id="ActiveToPaidNo"
                                name="ActiveToPaid"
                                type="radio"
                                />
                                <Label htmlFor="ActiveToPaidNo"> No </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Paid To Featured </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="PaidToFeaturedAllMembers"
                                name="PaidToFeatured"
                                type="radio"
                                />
                                <Label htmlFor="PaidToFeaturedAllMembers"> All Members </Label>
                            </li>
                            <li>
                                <Input
                                id="PaidToFeaturedOwnMembers"
                                name="PaidToFeatured"
                                type="radio"
                                />
                                <Label htmlFor="PaidToFeaturedOwnMembers"> Own Members </Label>
                            </li>
                            <li>
                                <Input
                                id="PaidToFeaturedNo"
                                name="PaidToFeatured"
                                type="radio"
                                />
                                <Label htmlFor="PaidToFeaturedNo"> No </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Renew Membership </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="RenewMembershipAllMembers"
                                name="RenewMembership"
                                type="radio"
                                />
                                <Label htmlFor="RenewMembershipAllMembers"> All Members </Label>
                            </li>
                            <li>
                                <Input
                                id="RenewMembershipOwnMembers"
                                name="RenewMembership"
                                type="radio"
                                />
                                <Label htmlFor="RenewMembershipOwnMembers"> Own Members </Label>
                            </li>
                            <li>
                                <Input
                                id="RenewMembershipNo"
                                name="RenewMembership"
                                type="radio"
                                />
                                <Label htmlFor="RenewMembershipNo"> No </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Edit Membership Plan </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="EditMembershipPlanAllMembers"
                                name="EditMembershipPlan"
                                type="radio"
                                />
                                <Label htmlFor="EditMembershipPlanAllMembers"> All Members </Label>
                            </li>
                            <li>
                                <Input
                                id="EditMembershipPlanOwnMembers"
                                name="EditMembershipPlan"
                                type="radio"
                                />
                                <Label htmlFor="EditMembershipPlanOwnMembers"> Own Members </Label>
                            </li>
                            <li>
                                <Input
                                id="EditMembershipPlanNo"
                                name="EditMembershipPlan"
                                type="radio"
                                />
                                <Label htmlFor="EditMembershipPlanNo"> No </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Match Making Mail </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="MatchMakingMailAllMembers"
                                name="MatchMakingMail"
                                type="radio"
                                />
                                <Label htmlFor="MatchMakingMailAllMembers"> All Members </Label>
                            </li>
                            <li>
                                <Input
                                id="MatchMakingMailOwnMembers"
                                name="MatchMakingMail"
                                type="radio"
                                />
                                <Label htmlFor="MatchMakingMailOwnMembers"> Own Members </Label>
                            </li>
                            <li>
                                <Input
                                id="MatchMakingMailNo"
                                name="MatchMakingMail"
                                type="radio"
                                />
                                <Label htmlFor="MatchMakingMailNo"> No </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Auto Match </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="AutoMatchAllMembers"
                                name="AutoMatch"
                                type="radio"
                                />
                                <Label htmlFor="AutoMatchAllMembers"> All Members </Label>
                            </li>
                            <li>
                                <Input
                                id="AutoMatchOwnMembers"
                                name="AutoMatch"
                                type="radio"
                                />
                                <Label htmlFor="AutoMatchOwnMembers"> Own Members </Label>
                            </li>
                            <li>
                                <Input
                                id="AutoMatchNo"
                                name="AutoMatch"
                                type="radio"
                                />
                                <Label htmlFor="AutoMatchNo"> No </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Manage Photos </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="ManagePhotosAllMembers"
                                name="ManagePhotos"
                                type="radio"
                                />
                                <Label htmlFor="ManagePhotosAllMembers"> All Members </Label>
                            </li>
                            <li>
                                <Input
                                id="ManagePhotosOwnMembers"
                                name="ManagePhotos"
                                type="radio"
                                />
                                <Label htmlFor="ManagePhotosOwnMembers"> Own Members </Label>
                            </li>
                            <li>
                                <Input
                                id="ManagePhotosNo"
                                name="ManagePhotos"
                                type="radio"
                                />
                                <Label htmlFor="ManagePhotosNo"> No </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Manage Video </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="ManageVideoAllMembers"
                                name="ManageVideo"
                                type="radio"
                                />
                                <Label htmlFor="ManageVideoAllMembers"> All Members </Label>
                            </li>
                            <li>
                                <Input
                                id="ManageVideoOwnMembers"
                                name="ManageVideo"
                                type="radio"
                                />
                                <Label htmlFor="ManageVideoOwnMembers"> Own Members </Label>
                            </li>
                            <li>
                                <Input
                                id="ManageVideoNo"
                                name="ManageVideo"
                                type="radio"
                                />
                                <Label htmlFor="ManageVideoNo"> No </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Manage Horoscope </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="ManageHoroscopeAllMembers"
                                name="ManageHoroscope"
                                type="radio"
                                />
                                <Label htmlFor="ManageHoroscopeAllMembers"> All Members </Label>
                            </li>
                            <li>
                                <Input
                                id="ManageHoroscopeOwnMembers"
                                name="ManageHoroscope"
                                type="radio"
                                />
                                <Label htmlFor="ManageHoroscopeOwnMembers"> Own Members </Label>
                            </li>
                            <li>
                                <Input
                                id="ManageHoroscopeNo"
                                name="ManageHoroscope"
                                type="radio"
                                />
                                <Label htmlFor="ManageHoroscopeNo"> No </Label>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> View Contact </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="ViewContactYes"
                                name="ViewContact"
                                type="radio"
                                />
                                <Label htmlFor="ViewContactYes"> Yes </Label>
                            </li>
                            <li>
                                <Input
                                id="ViewContactNo"
                                name="ViewContact"
                                type="radio"
                                />
                                <Label htmlFor="ViewContactNo"> No </Label>
                            </li>
                            
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> View Email </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="ViewEmailYes"
                                name="ViewEmail"
                                type="radio"
                                />
                                <Label htmlFor="ViewEmailYes"> Yes </Label>
                            </li>
                            <li>
                                <Input
                                id="ViewEmailNo"
                                name="ViewEmail"
                                type="radio"
                                />
                                <Label htmlFor="ViewEmailNo"> No </Label>
                            </li>
                            
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Send WhatsApp Message </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="SendWhatsAppMessageYes"
                                name="SendWhatsAppMessage"
                                type="radio"
                                />
                                <Label htmlFor="SendWhatsAppMessageYes"> Yes </Label>
                            </li>
                            <li>
                                <Input
                                id="SendWhatsAppMessageNo"
                                name="SendWhatsAppMessage"
                                type="radio"
                                />
                                <Label htmlFor="SendWhatsAppMessageNo"> No </Label>
                            </li>
                            
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Add comment to member </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="AddCommentMemberYes"
                                name="AddCommentMember"
                                type="radio"
                                />
                                <Label htmlFor="AddCommentMemberYes"> Yes </Label>
                            </li>
                            <li>
                                <Input
                                id="AddCommentMemberNo"
                                name="AddCommentMember"
                                type="radio"
                                />
                                <Label htmlFor="AddCommentMemberNo"> No </Label>
                            </li>
                            
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label> Send Express interest and message </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="SendExpressInterestYes"
                                name="SendExpressInterest"
                                type="radio"
                                />
                                <Label htmlFor="SendExpressInterestYes"> Yes </Label>
                            </li>
                            <li>
                                <Input
                                id="SendExpressInterestNo"
                                name="SendExpressInterest"
                                type="radio"
                                />
                                <Label htmlFor="SendExpressInterestNo"> No </Label>
                            </li>
                            
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label>Send Email and SMS</Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="SendEmailSMSYes"
                                name="SendEmailSMS"
                                type="radio"
                                />
                                <Label htmlFor="SendEmailSMSYes"> Yes </Label>
                            </li>
                            <li>
                                <Input
                                id="SendEmailSMSNo"
                                name="SendEmailSMS"
                                type="radio"
                                />
                                <Label htmlFor="SendEmailSMSNo"> No </Label>
                            </li>
                            
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label>Send Quick Email</Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="SendQuickEmailYes"
                                name="SendQuickEmail"
                                type="radio"
                                />
                                <Label htmlFor="SendQuickEmailYes"> Yes </Label>
                            </li>
                            <li>
                                <Input
                                id="SendQuickEmailNo"
                                name="SendQuickEmail"
                                type="radio"
                                />
                                <Label htmlFor="SendQuickEmailNo"> No </Label>
                            </li>
                            
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label>Manage Exclusive Member</Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="ManageExclusiveMemberYes"
                                name="ManageExclusiveMember"
                                type="radio"
                                />
                                <Label htmlFor="ManageExclusiveMemberYes"> Yes </Label>
                            </li>
                            <li>
                                <Input
                                id="ManageExclusiveMemberNo"
                                name="ManageExclusiveMember"
                                type="radio"
                                />
                                <Label htmlFor="ManageExclusiveMemberNo"> No </Label>
                            </li>
                            
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label>Send Ematch </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="SendEmatchYes"
                                name="SendEmatch"
                                type="radio"
                                />
                                <Label htmlFor="SendEmatchYes"> Yes </Label>
                            </li>
                            <li>
                                <Input
                                id="SendEmatchNo"
                                name="SendEmatch"
                                type="radio"
                                />
                                <Label htmlFor="SendEmatchNo"> No </Label>
                            </li>
                            
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label>Ematch Edit </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="EmatchEditYes"
                                name="EmatchEdit"
                                type="radio"
                                />
                                <Label htmlFor="EmatchEditYes"> Yes </Label>
                            </li>
                            <li>
                                <Input
                                id="EmatchEditNo"
                                name="EmatchEdit"
                                type="radio"
                                />
                                <Label htmlFor="EmatchEditNo"> No </Label>
                            </li>
                            
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" xl="4" className="mb-3">
                    <FormGroup className="common-formgroup">
                        <Label>Customer Activity </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="CustomerActivityYes"
                                name="CustomerActivity"
                                type="radio"
                                />
                                <Label htmlFor="CustomerActivityYes"> Yes </Label>
                            </li>
                            <li>
                                <Input
                                id="CustomerActivityNo"
                                name="CustomerActivity"
                                type="radio"
                                />
                                <Label htmlFor="CustomerActivityNo"> No </Label>
                            </li>
                            
                        </ul>
                    </FormGroup>
                </Col>

            </Row>
        </div>
    </Wrapper>
  )
}

export default EditStaffDetails
