import React from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  InputGroup,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";
import logo from "../../assets/images/logo.png";
import user from "../../assets/images/avatar-img.jpg";
import { FaRegFileAlt, FaRegUser } from "react-icons/fa";
import {
  IoDocumentTextOutline,
  IoSearchOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  HiOutlineCreditCard,
  HiOutlineUserAdd,
  HiOutlineUsers,
} from "react-icons/hi";
import { LuLogOut, LuMessageSquare, LuUserX2 } from "react-icons/lu";
import { BsBasket, BsSpeedometer2 } from "react-icons/bs";
import {
  FiChevronRight,
  FiCreditCard,
  FiInfo,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { CgMenuRightAlt, CgRing } from "react-icons/cg";
import { FaRegFolderClosed } from "react-icons/fa6";
import { MdOutlineSubscriptions } from "react-icons/md";
import { ImTree } from "react-icons/im";
import { RiPlayList2Line } from "react-icons/ri";
import customContext from "../../contexts/Context";
import StorageData from "../../helper/storagehelper/StorageData";
import Swal from "sweetalert2";
import WebSocketcustomContext from "../../contexts/WebSocketContext";

const Header = ({ handleToggleMenu }) => {
  const { userData, token } = customContext();
  const { socketContext } = WebSocketcustomContext();
  const handleLogout = () => {
    StorageData.removeData();
    Swal.fire({
      title: "Successfull",
      text: "Logout Successfully",
      icon: "success",
    });
    (token && socketContext.disconnectWebSocket ) && socketContext.disconnectWebSocket()
    setTimeout(() => {
      window.location.replace("/login");
    }, 100);
    return;
  };

  // console.log(loggedInUserDetails,userData)
  return (
    <>
      <header className="header-wrapper">
        <Container fluid>
          <Row>
            <Col xs="12">
              <div className="navbar justify-content-between">
                <div className="logo-hamburger-menu">
                  <div className="logo-wrap">
                    <Link to="/">
                      <img className="img-fluid" src={logo} alt="" />
                    </Link>
                  </div>
                  <div className="hamburger-menu">
                    <Button
                      className="hamburger-tigger"
                      onClick={handleToggleMenu}
                    >
                      <CgMenuRightAlt />
                    </Button>
                  </div>
                </div>
                <div className="header-right-wrap">
                  <ul>
                    <li>
                      <div className="head-search-wrap">
                        <form>
                          <InputGroup>
                            <InputGroupText>
                              <Button>
                                <IoSearchOutline />
                              </Button>
                            </InputGroupText>
                            <Input type="search" placeholder="Search" />
                          </InputGroup>
                        </form>
                      </div>
                    </li>
                    <li>
                      <div className="mail-wrap">
                        <Link to="/">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            strokeWidth="0"
                            stroke="currentColor"
                            fill="currentColor"
                            width="1em"
                            height="1em"
                            viewBox="0 0 27.197 21.682"
                          >
                            <g id="mail" transform="translate(1.361 1)">
                              <path
                                id="Path"
                                d="M2.448,0H22.028a2.461,2.461,0,0,1,2.448,2.46V17.222a2.461,2.461,0,0,1-2.448,2.46H2.448A2.461,2.461,0,0,1,0,17.222V2.46A2.461,2.461,0,0,1,2.448,0Z"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                              />
                              <path
                                id="Path-2"
                                data-name="Path"
                                d="M24.476,0,12.238,6.834,0,0"
                                transform="translate(0 2.46)"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <UncontrolledDropdown
                        setActiveFromChild
                        className="notifications-dropdown"
                      >
                        <DropdownToggle caret className="nav-link" tag="a">
                          <div className="notifications-wrap">
                            {/* <IoMdNotificationsOutline /> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              strokeWidth="0"
                              stroke="currentColor"
                              fill="currentColor"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24.443 26.626"
                            >
                              <g
                                id="Group_379"
                                data-name="Group 379"
                                transform="translate(1.25 1.25)"
                              >
                                <path
                                  id="Path"
                                  d="M18.285,7.314a7.314,7.314,0,1,0-14.628,0C3.657,15.847,0,18.285,0,18.285H21.942s-3.657-2.438-3.657-10.971"
                                  transform="translate(0 0)"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeMiterlimit="10"
                                  strokeWidth="2.5"
                                />
                                <path
                                  id="Path-2"
                                  data-name="Path"
                                  d="M4.218,0A2.438,2.438,0,0,1,2.109,1.216,2.438,2.438,0,0,1,0,0"
                                  transform="translate(8.862 23.16)"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeMiterlimit="10"
                                  strokeWidth="2"
                                />
                              </g>
                            </svg>
                            <span className="count">6</span>
                          </div>
                        </DropdownToggle>
                        <DropdownMenu>
                          <ul>
                            <li>
                              <h6 className="dropdown-header mb-2">
                                You have 5 notifications
                              </h6>
                            </li>
                            <li>
                              <DropdownItem tag="a">
                                {" "}
                                <HiOutlineUserAdd className="text-success" />{" "}
                                New user registered
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a">
                                {" "}
                                <LuUserX2 className="text-danger" /> User
                                deleted
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a">
                                <BsBasket className="text-info" /> New client
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a">
                                <BsSpeedometer2 className="text-warning" />{" "}
                                Server overloaded
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li>
                      <UncontrolledDropdown
                        setActiveFromChild
                        className="user-dropdown"
                      >
                        <DropdownToggle caret className="nav-link" tag="a">
                          <div className="user-info-wrap">
                            <div className="user-info">
                              <h4>{userData?.username || ""}</h4>
                              <p>Available</p>
                            </div>
                            <div className="avatar">
                              <img className="img-fluid" src={user} alt="" />
                            </div>
                          </div>
                        </DropdownToggle>
                        <DropdownMenu>
                          <ul>
                            <li>
                              <h6 className="dropdown-header mb-2">Settings</h6>
                            </li>
                            <li>
                              <DropdownItem href="#" tag="a">
                                {" "}
                                <FaRegUser /> Profile
                              </DropdownItem>
                              {/* <Link className='dropdown-item' to={"/profile"}><FaRegUser />Profile</Link> */}
                            </li>
                            <li>
                              {/* <DropdownItem href="#" tag="a"> <IoSettingsOutline /> Settings</DropdownItem> */}
                              <Link className="dropdown-item">
                                <IoSettingsOutline /> Settings
                              </Link>
                            </li>

                            <li className="border-top" onClick={handleLogout}>
                              <DropdownItem>
                                <CiLogout /> Logout
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default Header;
