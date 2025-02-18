import React, { useEffect, useState } from "react";
import { Form,Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Table } from "reactstrap";
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
import Organization from "../../../../assets/images/organization-avatar-img.jpg";

const DeleteProfileRequest = () => {
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
                    <li className="assign-staff-btn">
                        <Button className="btn btn-style1 text-light">All (312) </Button>
                    </li>
                    
                    </ul>
                </div>
                <div className="profile-headright">
                    <ul>
                    
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

            <div className="common-table profile-del-request-table">
                <Table responsive>
                    
                    <tbody>
                        
                        <tr>
                            <td>
                                <span className="btn-style1 req-count">01</span>
                            </td>
                            <td>
                                <div className="member-avatar">
                                    <img className="img-fluid" src={Organization} alt=""/> 
                                </div>
                                NMGH245903
                            </td>
                            <td>
                                <div className="name">
                                    <strong>Praveen Bommannavar</strong>
                                </div>
                            </td>
                            <td>
                                <div className="email">
                                    <p><LuMailOpen /> praveen@gmail.com</p>
                                </div>
                            </td>
                            <td>
                                <div className="phone">
                                    <p><IoCallOutline /> +1 9568 2356</p>
                                </div>
                            </td>
                            <td>
                                <Button className="btn btn-outline-style1"><RiDeleteBin6Line /></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="btn-style1 req-count">02</span>
                            </td>
                            <td>
                                <div className="member-avatar">
                                    <img className="img-fluid" src={Organization} alt=""/> 
                                </div>
                                NMGH245903
                            </td>
                            <td>
                                <div className="name">
                                    <strong>Praveen Bommannavar</strong>
                                </div>
                            </td>
                            <td>
                                <div className="email">
                                    <p><LuMailOpen /> NMB413105803@nrimb.com</p>
                                </div>
                            </td>
                            <td>
                                <div className="phone">
                                    <p><IoCallOutline /> +1 9568 2356</p>
                                </div>
                            </td>
                            <td>
                                <Button className="btn btn-outline-style1">Deleted</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="btn-style1 req-count">03</span>
                            </td>
                            <td>
                                <div className="member-avatar">
                                    <img className="img-fluid" src={Organization} alt=""/> 
                                </div>
                                NMGH245903
                            </td>
                            <td>
                                <div className="name">
                                    <strong>Praveen Bommannavar</strong>
                                </div>
                            </td>
                            <td>
                                <div className="email">
                                    <p><LuMailOpen /> praveen@gmail.com</p>
                                </div>
                            </td>
                            <td>
                                <div className="phone">
                                    <p><IoCallOutline /> +1 9568 2356</p>
                                </div>
                            </td>
                            <td>
                                <Button className="btn btn-outline-style1"><RiDeleteBin6Line /></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="btn-style1 req-count">04</span>
                            </td>
                            <td>
                                <div className="member-avatar">
                                    <img className="img-fluid" src={Organization} alt=""/> 
                                </div>
                                NMGH245903
                            </td>
                            <td>
                                <div className="name">
                                    <strong>Praveen Bommannavar</strong>
                                </div>
                            </td>
                            <td>
                                <div className="email">
                                    <p><LuMailOpen /> praveen@gmail.com</p>
                                </div>
                            </td>
                            <td>
                                <div className="phone">
                                    <p><IoCallOutline /> +1 9568 2356</p>
                                </div>
                            </td>
                            <td>
                                <Button className="btn btn-outline-style1"><RiDeleteBin6Line /></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="btn-style1 req-count">05</span>
                            </td>
                            <td>
                                <div className="member-avatar">
                                    <img className="img-fluid" src={Organization} alt=""/> 
                                </div>
                                NMGH245903
                            </td>
                            <td>
                                <div className="name">
                                    <strong>Praveen Bommannavar</strong>
                                </div>
                            </td>
                            <td>
                                <div className="email">
                                    <p><LuMailOpen /> praveen@gmail.com</p>
                                </div>
                            </td>
                            <td>
                                <div className="phone">
                                    <p><IoCallOutline /> +1 9568 2356</p>
                                </div>
                            </td>
                            <td>
                                <Button className="btn btn-outline-style1">Deleted</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="btn-style1 req-count">06</span>
                            </td>
                            <td>
                                <div className="member-avatar">
                                    <img className="img-fluid" src={Organization} alt=""/> 
                                </div>
                                NMGH245903
                            </td>
                            <td>
                                <div className="name">
                                    <strong>Praveen Bommannavar</strong>
                                </div>
                            </td>
                            <td>
                                <div className="email">
                                    <p><LuMailOpen /> praveen@gmail.com</p>
                                </div>
                            </td>
                            <td>
                                <div className="phone">
                                    <p><IoCallOutline /> +1 9568 2356</p>
                                </div>
                            </td>
                            <td>
                                <Button className="btn btn-outline-style1">Deleted</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="btn-style1 req-count">07</span>
                            </td>
                            <td>
                                <div className="member-avatar">
                                    <img className="img-fluid" src={Organization} alt=""/> 
                                </div>
                                NMGH245903
                            </td>
                            <td>
                                <div className="name">
                                    <strong>Praveen Bommannavar</strong>
                                </div>
                            </td>
                            <td>
                                <div className="email">
                                    <p><LuMailOpen /> praveen@gmail.com</p>
                                </div>
                            </td>
                            <td>
                                <div className="phone">
                                    <p><IoCallOutline /> +1 9568 2356</p>
                                </div>
                            </td>
                            <td>
                                <Button className="btn btn-outline-style1">Deleted</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>

    </div>
    }
    </>
  )
}

export default DeleteProfileRequest
