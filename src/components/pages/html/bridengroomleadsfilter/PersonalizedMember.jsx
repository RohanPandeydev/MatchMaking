import React, { useEffect, useState } from "react";
import { Form,Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineDislike, AiOutlineEdit, AiOutlineLike } from "react-icons/ai";
import { LiaUserTimesSolid } from "react-icons/lia";
import { GiHumanTarget } from "react-icons/gi";
import { FiPlus } from "react-icons/fi";
import { VscFilter } from "react-icons/vsc";
import profileUser from "../../../../assets/images/no-images-available.jpg";
import whatsappIcon from "../../../../assets/images/whatsapp-icon.svg";
import { LuMailOpen } from "react-icons/lu";
import { IoCallOutline, IoClose, IoImagesOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import {  Link, useLocation, useNavigate} from "react-router-dom";
import { BiMessageDetail } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
import Wrapper from "../../../layouts/Wrapper";
import ViewProfileFilter from "../../bride&groom/leads/view/ViewProfileFilter";
import Pagination from "../../../../utils/Pagination";

const PersonalizedMember = () => {
    const [toggleFilter, setToggleFilter] = useState(false);
    const [currentInd, setCurrentInd] = useState("0");
    const[addClassTwo,setAddClassTwo]=useState(false)
    const[addClassThree ,setAddClassThree]=useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const [showForm,setShowForm]=useState(false)
    const handleCurrentActiveIndex = (index) => {
        // If the clicked index is the same as the currently opened one, close it
        if (currentInd === index) {
          setCurrentInd(null);
        } else {
          // Otherwise, open the clicked index
          setCurrentInd(index);
        }
      };
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

        {toggleFilter && <ViewProfileFilter />}
        
        <div className="view-profile-wrap">
                {/* {isLoadingData ? (
                <Loader />
                ) : data?.data?.results?.length == 0 ? (
                <NoImageFound />
                ) : (
                data?.data?.results?.map((each, index) => {
                    return (
                    <div
                        className={
                        currentInd === index
                            ? "view-profile-list open"
                            : "view-profile-list"
                        }
                    >
                        <div className="view-profile-content">
                        <div className="profile-img-wrap">
                            <div className="checkbox">
                            <FormGroup>
                                <Input id="select-all" type="checkbox" />
                            </FormGroup>
                            </div>
                            <div className="profile-img-box online">
                            <div className="profile-img">
                                <img
                                className="img-fluid"
                                src={
                                    each?.photos?.length > 0
                                    ? `${config.apiUrl}${each?.photos[0]?.upload_url}`
                                    : profileUser
                                }
                                alt=""
                                />
                                <div className="profile-hover">
                                <Link to="/">
                                    <IoImagesOutline />
                                </Link>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="profile-details-wrap">
                            <div className="profile-details-top">
                            <Row>
                                <Col
                                md="12"
                                lg="12"
                                xl="12"
                                xxl="4"
                                className="mb-3 mb-xxl-0"
                                >
                                <div className="profile-name-wrap">
                                    <h3>
                                    {each?.user?.first_name || ""}{" "}
                                    {each?.user?.last_name || ""}
                                    </h3>
                                    <h5>NMGH245903</h5>
                                    <Button className="btn orange-btn me-2 mb-2">
                                    nrimb.com
                                    </Button>
                                    <Button className="btn blue-btn me-2 mb-2">
                                    Match Report
                                    </Button>
                                    <Button className="btn green-btn me-2 mb-2">
                                    {" "}
                                    <img
                                        className="img-fluid"
                                        src={whatsappIcon}
                                        alt=""
                                    />{" "}
                                    Message
                                    </Button>
                                    <Button className="btn purple-btn me-2 mb-2">
                                    Personalized
                                    </Button>
                                </div>
                                </Col>

                                <Col
                                md="12"
                                lg="12"
                                xl="6"
                                xxl="4"
                                className="mb-3 mb-xxl-0"
                                >
                                <div className="profile-status-wrap">
                                    <p>
                                    <span>Status :</span> N/A
                                    </p>
                                    <p>
                                    <span>Marital Status :</span> Unmarried
                                    </p>
                                    <p>
                                    <span>Religion :</span> {each?.religion || ""}
                                    </p>
                                    <p>
                                    <span>Location :</span> {each?.country || ""}
                                    </p>
                                </div>
                                </Col>
                                <Col
                                md="12"
                                lg="12"
                                xl="6"
                                xxl="4"
                                className="mb-3 mb-xxl-0"
                                >
                                <div className="profile-contact-wrap">
                                    <div className="contact-list">
                                    <div className="icon">
                                        <LuMailOpen />
                                    </div>
                                    <div className="info">
                                        <p>
                                        <a href="mailto:praveen@gmail.com">
                                            {each?.user?.email || ""}
                                        </a>
                                        </p>
                                    </div>
                                    </div>
                                    <div className="contact-list">
                                    <div className="icon">
                                        <IoCallOutline />
                                    </div>
                                    <div className="info">
                                        <p>
                                        <a href="tel:+1 9568 2356">
                                            {each?.phone_code} {each?.phone}
                                        </a>
                                        </p>
                                    </div>
                                    </div>
                                </div>
                                </Col>
                            </Row>
                            </div>
                            <div className="profile-details-bottom">
                            <Row>
                                <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                                <div className="profile-info-list">
                                    <h4>
                                    <span>Next Followup :</span> N/A{" "}
                                    </h4>
                                </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                                <div className="profile-info-list">
                                    <h4>
                                    <span>Registered On: </span>{" "}
                                    {moment(each?.createdAt).format("ll")}
                                    </h4>
                                </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                                <div className="profile-info-list">
                                    <h4>
                                    <span>Assigned To : </span> Not Assigned{" "}
                                    </h4>
                                </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                                <div className="profile-info-list">
                                    <h4>
                                    <span>Plan Name : </span> N/A{" "}
                                    </h4>
                                </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                                <div className="profile-info-list">
                                    <h4>
                                    <span>Plan Activated On: </span> N/A{" "}
                                    </h4>
                                </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                                <div className="profile-info-list">
                                    <h4>
                                    <span>Plan Expired On: </span> N/A{" "}
                                    </h4>
                                </div>
                                </Col>
                            </Row>
                            </div>
                        </div>
                        <div className="profile-button-wrap">
                            <ul>
                            <li>
                                <Button className="btn dark-blue-btn">
                                {" "}
                                <FiPlus />
                                </Button>
                            </li>
                            <li>
                                <Button className="btn yellow-btn">
                                {" "}
                                <FaRegComments />
                                </Button>
                            </li>
                            <li>
                                <Button className="btn light-green-btn">
                                {" "}
                                <AiOutlineEdit />{" "}
                                </Button>
                            </li>
                            <li>
                                <Button className="btn blue-btn">
                                {" "}
                                <BiMessageDetail />{" "}
                                </Button>
                            </li>
                            <li>
                                <Button className="btn btn-outline-style1">
                                {" "}
                                <RiDeleteBin6Line />{" "}
                                </Button>
                            </li>
                            <li>
                                <Button type="click" className="btn green-btn" onClick={()=>toggle()}>
                                {" "}
                                <GrUpdate />{" "}
                                </Button>
                            </li>
                            </ul>
                        </div>
                        </div>
                        <div className="profile-toggle-button">
                        <Button
                            className="profile-toggle-btn"
                            onClick={() => handleCurrentActiveIndex(index)}
                        >
                            <IoIosArrowDown />
                        </Button>
                        </div>
                    </div>
                    );
                })
                )} */}

                <div className={addClassTwo?"view-profile-list open":"view-profile-list"}>
                    <div className="view-profile-content">
                    <div className="profile-img-wrap">
                        <div className="checkbox">
                        <FormGroup>
                            <Input id="select-all" type="checkbox" />
                        </FormGroup>
                        </div>
                        <div className="profile-img-box online">
                        <div className="profile-img">
                            <img className="img-fluid" src={profileUser} alt="" />
                            <div className="profile-hover">
                            <Link to="/"><IoImagesOutline /></Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="profile-details-wrap">
                        <div className="profile-details-top">
                        <Row>
                            <Col md="12" lg="12" xl="12" xxl="4" className="mb-3 mb-xxl-0">
                            <div className="profile-name-wrap">
                                <h3>Praveen Bommannavar</h3>
                                <h5>NMGH245903</h5>
                                <Button className="btn orange-btn me-2 mb-2">nrimb.com</Button>
                                <Button className="btn blue-btn me-2 mb-2">Match Report</Button>
                                <Button className="btn green-btn me-2 mb-2"> <img className="img-fluid" src={whatsappIcon} alt="" /> Message</Button>
                                <Button className="btn purple-btn me-2 mb-2">Personalized</Button>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3 mb-xxl-0">
                            <div className="profile-status-wrap">
                                <p><span>Status :</span> N/A</p>
                                <p><span>Marital Status :</span> Unmarried</p>
                                <p><span>Religion :</span> Christian</p>
                                <p><span>Location :</span> Canada</p>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3 mb-xxl-0">
                            <div className="profile-contact-wrap">
                                <div className="contact-list">
                                <div className="icon">
                                    <LuMailOpen />
                                </div>
                                <div className="info">
                                    <p><a href="mailto:praveen@gmail.com">praveen@gmail.com</a></p>
                                </div>
                                </div>
                                <div className="contact-list">
                                <div className="icon">
                                    <IoCallOutline />
                                </div>
                                <div className="info">
                                    <p><a href="tel:+1 9568 2356">+1 9568 2356</a></p>
                                </div>
                                </div>
                            </div>
                            </Col>
                        </Row>
                        </div>
                        <div className="profile-details-bottom">
                        <Row>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Next Followup :</span> N/A </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Registered On: </span> December 8, 2021 12:15 PM </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Assigned To : </span> Not Assigned </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Plan Name : </span> N/A </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Plan Activated On: </span> N/A </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Plan Expired On: </span> N/A </h4>
                            </div>
                            </Col>
                        </Row>
                        </div>
                    </div>
                    <div className="profile-button-wrap">
                        <ul>
                        <li>
                            <Button className="btn dark-blue-btn"> <FiPlus /></Button>
                        </li>
                        <li>
                            <Button className="btn yellow-btn"> <FaRegComments /></Button>
                        </li>
                        <li>
                            <Button className="btn light-green-btn"> <AiOutlineEdit /> </Button>
                        </li>
                        <li>
                            <Button className="btn blue-btn"> <BiMessageDetail /> </Button>
                        </li>
                        <li>
                            <Button className="btn btn-outline-style1"> <RiDeleteBin6Line /> </Button>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div className="profile-toggle-button">
                    <Button className="profile-toggle-btn" onClick={()=>setAddClassTwo(!addClassTwo)}><IoIosArrowDown /></Button>
                    </div>
                </div>

                <div className={addClassThree?"view-profile-list open":"view-profile-list"}>
                    <div className="view-profile-content">
                    <div className="profile-img-wrap">
                        <div className="checkbox">
                        <FormGroup>
                            <Input id="select-all" type="checkbox" />
                        </FormGroup>
                        </div>
                        <div className="profile-img-box online">
                        <div className="profile-img">
                            <img className="img-fluid" src={profileUser} alt="" />
                            <div className="profile-hover">
                            <Link to="/"><IoImagesOutline /></Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="profile-details-wrap">
                        <div className="profile-details-top">
                        <Row>
                            <Col md="12" lg="12" xl="12" xxl="4" className="mb-3 mb-xxl-0">
                            <div className="profile-name-wrap">
                                <h3>Praveen Bommannavar</h3>
                                <h5>NMGH245903</h5>
                                <Button className="btn orange-btn me-2 mb-2">nrimb.com</Button>
                                <Button className="btn blue-btn me-2 mb-2">Match Report</Button>
                                <Button className="btn green-btn me-2 mb-2"> <img className="img-fluid" src={whatsappIcon} alt="" /> Message</Button>
                                <Button className="btn purple-btn me-2 mb-2">Personalized</Button>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3 mb-xxl-0">
                            <div className="profile-status-wrap">
                                <p><span>Status :</span> N/A</p>
                                <p><span>Marital Status :</span> Unmarried</p>
                                <p><span>Religion :</span> Christian</p>
                                <p><span>Location :</span> Canada</p>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3 mb-xxl-0">
                            <div className="profile-contact-wrap">
                                <div className="contact-list">
                                <div className="icon">
                                    <LuMailOpen />
                                </div>
                                <div className="info">
                                    <p><a href="mailto:praveen@gmail.com">praveen@gmail.com</a></p>
                                </div>
                                </div>
                                <div className="contact-list">
                                <div className="icon">
                                    <IoCallOutline />
                                </div>
                                <div className="info">
                                    <p><a href="tel:+1 9568 2356">+1 9568 2356</a></p>
                                </div>
                                </div>
                            </div>
                            </Col>
                        </Row>
                        </div>
                        <div className="profile-details-bottom">
                        <Row>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Next Followup :</span> N/A </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Registered On: </span> December 8, 2021 12:15 PM </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Assigned To : </span> Not Assigned </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Plan Name : </span> N/A </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Plan Activated On: </span> N/A </h4>
                            </div>
                            </Col>
                            <Col md="12" lg="12" xl="6" xxl="4" className="mb-3">
                            <div className="profile-info-list">
                                <h4><span>Plan Expired On: </span> N/A </h4>
                            </div>
                            </Col>
                        </Row>
                        </div>
                    </div>
                    <div className="profile-button-wrap">
                        <ul>
                        <li>
                            <Button className="btn dark-blue-btn"> <FiPlus /></Button>
                        </li>
                        <li>
                            <Button className="btn yellow-btn"> <FaRegComments /></Button>
                        </li>
                        <li>
                            <Button className="btn light-green-btn"> <AiOutlineEdit /> </Button>
                        </li>
                        <li>
                            <Button className="btn blue-btn"> <BiMessageDetail /> </Button>
                        </li>
                        <li>
                            <Button className="btn btn-outline-style1"> <RiDeleteBin6Line /> </Button>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div className="profile-toggle-button">
                    <Button className="profile-toggle-btn" onClick={()=>setAddClassThree(!addClassThree)}><IoIosArrowDown /></Button>
                    </div>
                </div>
        </div>

   

    </div>
    }
    
    </>
  )
}

export default PersonalizedMember
