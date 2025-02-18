import React, { useEffect, useState } from "react";
import { Form,Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineDislike, AiOutlineEdit, AiOutlineLike } from "react-icons/ai";
import { LiaUserTimesSolid } from "react-icons/lia";
import { GiHumanTarget } from "react-icons/gi";
import { FiPlus } from "react-icons/fi";
import { VscFilter } from "react-icons/vsc";
import Wrapper from "../../../layouts/Wrapper";
import ViewProfileFilter from "../../bride&groom/leads/view/ViewProfileFilter";
import Pagination from "../../../../utils/Pagination";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TbListSearch } from "react-icons/tb";

const MemberAdvanceSearch = () => {
    const [toggleFilter, setToggleFilter] = useState(false);
    
    
  return (
    <>
    {
    <div className="view-profile-wrapper">
        <div className="view-profile-head">
            <div className="d-flex flex-wrap">
                <div className="profile-headleft">
                    <ul>
                    <li className="select-all">
                        <FormGroup>
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
                    <li className="suspended-member-btn">
                        <Button className="btn orange-btn">
                        <LiaUserTimesSolid />
                        </Button>
                    </li>
                    <li className="personalized-btn">
                        <Button className="btn blue-btn">
                        <GiHumanTarget />
                        </Button>
                    </li>
                    <li className="select-staff-dropdown">
                        <Input id="" name="" type="select">
                        <option>Select Staff</option>
                        <option>1</option>
                        <option>2</option>
                        </Input>
                    </li>
                    <li className="assign-staff-btn">
                        <Button className="btn green-btn">Assign Staff </Button>
                    </li>
                    <li className="unassign-staff-btn">
                        <Button className="btn btn-outline-style1">
                        Unassigned Staff{" "}
                        </Button>
                    </li>
                    <li className="active-member-dropdown">
                        <Input id="" name="" type="select">
                        <option>Active (124044)</option>
                        <option>Paid (168)</option>
                        <option>Featured (0)</option>
                        <option>All (374)</option>
                        </Input>
                    </li>
                    <li>
                        <Button className="btn purple-btn"><TbListSearch /> Member Advance Search</Button>
                    </li>
                    </ul>
                </div>
                <div className="profile-headright">
                    <ul>
                    <li className="add-btn-wrap">
                        <Button className="btn btn-style1" >
                        {" "}
                        Add <FiPlus />
                        </Button>
                    </li>
                    <li className="filter-btn-wrap">
                        <Button
                        className="btn btn-outline-style1"
                        onClick={() => setToggleFilter(!toggleFilter)}
                        >
                        {" "}
                        Filter <VscFilter />
                        </Button>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="member-advance-accordion-wrap">
            <Row>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Name </Label>
                        <Input
                        id=""
                        name="name"
                        placeholder="Name"
                        type="text"
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Email </Label>
                        <Input
                        id=""
                        name="email"
                        placeholder="email"
                        type="text"
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Phone </Label>
                        <Input
                        id=""
                        name=""
                        placeholder="Phone"
                        type="text"
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Matri ID </Label>
                        <Input
                        id=""
                        name=""
                        placeholder="Matri ID"
                        type="text"
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Country </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Country 1
                            </option>
                            <option>
                            Country 2
                            </option>
                            <option>
                            Country 3
                            </option>
                            <option>
                            Country 4
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> State </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            State 1
                            </option>
                            <option>
                            State 2
                            </option>
                            <option>
                            State 3
                            </option>
                            <option>
                            State 4
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> City </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            City 1
                            </option>
                            <option>
                            City 2
                            </option>
                            <option>
                            City 3
                            </option>
                            <option>
                            City 4
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Assigned to </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Assigned to 1
                            </option>
                            <option>
                            Assigned to 2
                            </option>
                            <option>
                            Assigned to 3
                            </option>
                            <option>
                            Assigned to 4
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Registered from i.e  </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <Input
                                id="RegisteredFromAndroid"
                                name="RegisteredFrom"
                                type="radio"
                                />
                                <Label for="RegisteredFromAndroid"> Android </Label>
                            </li>
                            <li>
                                <Input
                                id="RegisteredFromIOS"
                                name="RegisteredFrom"
                                type="radio"
                                />
                                <Label for="RegisteredFromIOS">  IOS  </Label>
                            </li>
                            
                        </ul>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Profile Created  </Label>
                        <ul className="common-radio-btn mt-3">
                            <li>
                                <FormGroup check>
                                    <Input type="checkbox" />
                                    {' '}
                                    <Label check>
                                    admin
                                    </Label>
                                </FormGroup>
                            </li>
                            <li>
                                <FormGroup check>
                                    <Input type="checkbox" />
                                    {' '}
                                    <Label check>
                                    Organization
                                    </Label>
                                </FormGroup>
                            </li>
                            <li>
                                <FormGroup check>
                                    <Input type="checkbox" />
                                    {' '}
                                    <Label check>
                                    Franchise
                                    </Label>
                                </FormGroup>
                            </li>
                        </ul>
                    </FormGroup>
                </Col>                
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Caste </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Caste 1
                            </option>
                            <option>
                            Caste 2
                            </option>
                            <option>
                            Caste 3
                            </option>
                            <option>
                            Caste 4
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Religion </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Religion 1
                            </option>
                            <option>
                            Religion 2
                            </option>
                            <option>
                            Religion 3
                            </option>
                            <option>
                            Religion 4
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Registered on date </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="date"
                            />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Gender </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option> Select Any </option>
                            <option> Male </option>
                            <option> Female </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Marital Status </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Unmarried
                            </option>
                            <option>
                            Widow/Widower
                            </option>
                            <option>
                            Separated
                            </option>
                            <option>
                            Divorcee
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Price Range </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Price Range
                            </option>
                            <option>
                            Price Range
                            </option>
                            <option>
                            Price Range
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Age Range </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            18 - 26 Yrs
                            </option>
                            <option>
                            26 - 28 Yrs
                            </option>
                            <option>
                            28 - 30 Yrs
                            </option>
                            <option>
                            30 - 35 Yrs
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Height Range </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            5ft - 6.5 ft
                            </option>
                            <option>
                            6.5ft - 6.7 ft
                            </option>
                            <option>
                            6.7ft - 6.8 ft
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Mother Tongue </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Mother Tongue
                            </option>
                            <option>
                            Mother Tongue
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Education </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Education
                            </option>
                            <option>
                            Education
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Occupation </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Occupation
                            </option>
                            <option>
                            Occupation
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Family Income </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Family Income
                            </option>
                            <option>
                            Family Income
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Status </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Status
                            </option>
                            <option>
                            Status
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Income </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Income
                            </option>
                            <option>
                            Income
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Family Employment </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Family Employment
                            </option>
                            <option>
                            Family Employment
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Siblings </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Siblings
                            </option>
                            <option>
                            Siblings
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Siblings Status </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Siblings status
                            </option>
                            <option>
                            Siblings status
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Drinking Habit </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Drinking Habit
                            </option>
                            <option>
                            Drinking Habit
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Eating Habit </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Eating Habit
                            </option>
                            <option>
                            Eating Habit
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Assigned to </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Eating Habit
                            </option>
                            <option>
                            Eating Habit
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Price Range </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Price Range
                            </option>
                            <option>
                            Price Range
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Added by </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Added by
                            </option>
                            <option>
                            Added by
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                    <FormGroup className="common-formgroup">
                        <Label> Updated by </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            >
                            <option>
                            Select Any
                            </option>
                            <option>
                            Added by
                            </option>
                            <option>
                            Added by
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
        </div>
        {toggleFilter && <ViewProfileFilter />}

        <div className="view-profile-wrap">
            <div className="member-advance-search-form-wrap">
                <Row>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> Age Range </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                >
                                <option>
                                18 - 26 Yrs
                                </option>
                                <option>
                                26 - 28 Yrs
                                </option>
                                <option>
                                28 - 30 Yrs
                                </option>
                                <option>
                                30 - 35 Yrs
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> Height Range </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                >
                                <option>
                                5ft - 6.5 ft
                                </option>
                                <option>
                                6.5ft - 6.7 ft
                                </option>
                                <option>
                                6.7ft - 6.8 ft
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> Gender* </Label>
                            <ul className="common-radio-btn mt-3">
                                <li>
                                    <Input
                                    id="MaritalStatusUnmarried"
                                    name="MaritalStatus"
                                    type="radio"
                                    />
                                    <Label for="MaritalStatusUnmarried"> Male </Label>
                                </li>
                                <li>
                                    <Input
                                    id="MaritalStatusWidow"
                                    name="MaritalStatus"
                                    type="radio"
                                    />
                                    <Label for="MaritalStatusWidow"> Female </Label>
                                </li>
                            </ul>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> Marital Status </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                >
                                <option>
                                Select Any
                                </option>
                                <option>
                                Unmarried
                                </option>
                                <option>
                                Widow/Widower
                                </option>
                                <option>
                                Separated
                                </option>
                                <option>
                                Divorcee
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> Visa Status </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                >
                                <option>
                                Select Any
                                </option>
                                <option>
                                Citizen
                                </option>
                                <option>
                                Permanent Resident
                                </option>
                                <option>
                                Student Visa
                                </option>
                                <option>
                                Temporary Visa
                                </option>
                                <option>
                                Work permit
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> Religion </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                >
                                <option>
                                Select Any
                                </option>
                                <option>
                                Buddhist
                                </option>
                                <option>
                                Christian
                                </option>
                                <option>
                                Hindu
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> Caste </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                >
                                <option>
                                Select Any
                                </option>
                                <option>
                                Bengali
                                </option>
                                <option>
                                Bengali Brahmin
                                </option>
                                <option>
                                Bhandari
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> Mothertongue </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                >
                                <option>
                                Select Any
                                </option>
                                <option>
                                Bengali
                                </option>
                                <option>
                                Bengali Brahmin
                                </option>
                                <option>
                                Bhandari
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> Education </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                >
                                <option>
                                Select Any
                                </option>
                                <option>
                                1
                                </option>
                                <option>
                                2
                                </option>
                                <option>
                                3
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> Occupation </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                >
                                <option>
                                Select Any
                                </option>
                                <option>
                                1
                                </option>
                                <option>
                                2
                                </option>
                                <option>
                                3
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> Country </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                >
                                <option>
                                Select Any
                                </option>
                                <option>
                                1
                                </option>
                                <option>
                                2
                                </option>
                                <option>
                                3
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> State </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                >
                                <option>
                                Select Any
                                </option>
                                <option>
                                1
                                </option>
                                <option>
                                2
                                </option>
                                <option>
                                3
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> City </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                >
                                <option>
                                Select Any
                                </option>
                                <option>
                                1
                                </option>
                                <option>
                                2
                                </option>
                                <option>
                                3
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> Manglik </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                >
                                <option>
                                Select Any
                                </option>
                                <option>
                                1
                                </option>
                                <option>
                                2
                                </option>
                                <option>
                                3
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> Status </Label>
                            <ul className="common-radio-btn mt-3">
                                <li>
                                    <Input
                                    id="StatusAll"
                                    name="Status"
                                    type="radio"
                                    />
                                    <Label for="StatusAll"> All </Label>
                                </li>
                                <li>
                                    <Input
                                    id="StatusPaid"
                                    name="Status"
                                    type="radio"
                                    />
                                    <Label for="StatusPaid"> Paid </Label>
                                </li>
                                <li>
                                    <Input
                                    id="StatusActive"
                                    name="Status"
                                    type="radio"
                                    />
                                    <Label for="StatusActive"> Active </Label>
                                </li>
                                <li>
                                    <Input
                                    id="StatusInquiry"
                                    name="Status"
                                    type="radio"
                                    />
                                    <Label for="StatusInquiry">  Inquiry </Label>
                                </li>
                                <li>
                                    <Input
                                    id="StatusExpired"
                                    name="Status"
                                    type="radio"
                                    />
                                    <Label for="StatusExpired">  Expired </Label>
                                </li>
                            </ul>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> Photo Setting </Label>
                            <ul className="common-radio-btn mt-3">
                                <li>
                                    <Input
                                    id="PhotoSettingAll"
                                    name="PhotoSetting"
                                    type="radio"
                                    />
                                    <Label for="PhotoSettingAll"> All </Label>
                                </li>
                                <li>
                                    <Input
                                    id="PhotoSettingWithPhoto"
                                    name="PhotoSetting"
                                    type="radio"
                                    />
                                    <Label for="PhotoSettingWithPhoto">  With Photo  </Label>
                                </li>
                                <li>
                                    <Input
                                    id="PhotoSettingWithoutPhoto"
                                    name="PhotoSetting"
                                    type="radio"
                                    />
                                    <Label for="PhotoSettingWithoutPhoto"> Without Photo </Label>
                                </li>
                               
                            </ul>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <Label> Blur Image </Label>
                            <ul className="common-radio-btn mt-3">
                                <li>
                                    <Input
                                    id="BlurImageYes"
                                    name="BlurImage"
                                    type="radio"
                                    />
                                    <Label for="BlurImageYes"> Yes </Label>
                                </li>
                                <li>
                                    <Input
                                    id="BlurImageNo"
                                    name="BlurImage"
                                    type="radio"
                                    />
                                    <Label for="BlurImageNo">  No  </Label>
                                </li>
                               
                            </ul>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="common-formgroup">
                            <div className="add-mobile-number-group">
                                <div className="add-mobile-number-list">
                                    <div className="country-name">
                                        <Label>  Mobile  </Label>
                                    </div>
                                    <div className="enter-mobile-number">
                                        <Label>Phone Number  </Label>
                                    </div>
                                    <div className="mobile-number-name">
                                        <Label>  Select Name  </Label>
                                    </div>
                                    <div className="plus-minus-btn">

                                    </div>
                                </div>
                                <div className="add-mobile-number-list">
                                    <div className="country-name">
                                        <Input
                                            id="exampleSelect"
                                            name="select"
                                            type="select"
                                            >
                                            <option>
                                            +91 India
                                            </option>
                                            <option>
                                            +1 United States
                                            </option>
                                            <option>
                                            +44 United Kingdom
                                            </option>
                                            <option>
                                            +1 Canada
                                            </option>
                                        </Input>
                                    </div>
                                    <div className="enter-mobile-number">
                                        <Input
                                            id="exampleSelect"
                                            name="text"
                                            type="text"
                                            placeholder="Enter Your Phone Number"
                                            >
                                            
                                        </Input>
                                    </div>
                                    <div className="mobile-number-name">
                                        <Input
                                            id="exampleSelect"
                                            name="select"
                                            type="select"
                                            >
                                            <option>
                                            Fathers
                                            </option>
                                            <option>
                                            Mothers
                                            </option>
                                            <option>
                                            Sisters
                                            </option>
                                            <option>
                                            Brother
                                            </option>
                                        </Input>
                                    </div>
                                    <div className="plus-minus-btn">
                                        <Button className="btn-style1"><FaMinus /></Button>
                                    </div>
                                </div>
                                <div className="add-mobile-number-list">
                                    <div className="country-name">
                                        <Input
                                            id="exampleSelect"
                                            name="select"
                                            type="select"
                                            >
                                            <option>
                                            +91 India
                                            </option>
                                            <option>
                                            +1 United States
                                            </option>
                                            <option>
                                            +44 United Kingdom
                                            </option>
                                            <option>
                                            +1 Canada
                                            </option>
                                        </Input>
                                    </div>
                                    <div className="enter-mobile-number">
                                        <Input
                                            id="exampleSelect"
                                            name="text"
                                            type="text"
                                            placeholder="Enter Your Phone Number"
                                            >
                                            
                                        </Input>
                                    </div>
                                    <div className="mobile-number-name">
                                        <Input
                                            id="exampleSelect"
                                            name="select"
                                            type="select"
                                            >
                                            <option>
                                            Fathers
                                            </option>
                                            <option>
                                            Mothers
                                            </option>
                                            <option>
                                            Sisters
                                            </option>
                                            <option>
                                            Brother
                                            </option>
                                        </Input>
                                    </div>
                                    <div className="plus-minus-btn">
                                        <Button className="btn-style1"><FaPlus /></Button>
                                    </div>
                                </div>
                            </div>
                            
                        </FormGroup>
                    </Col>
                    <Col xs="12" lg="12" className="mt-4">
                        <FormGroup className="common-formgroup text-end">
                            <Button className="btn btn-outline-style1 px-5 py-2 btn btn-secondary me-3">Back</Button>
                            <Button className="btn btn-style1 px-5 py-2 btn btn-secondary">Submit</Button>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        </div>

    </div>
    }
    
  </>
  )
}

export default MemberAdvanceSearch
