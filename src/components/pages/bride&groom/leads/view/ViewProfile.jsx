import React, { useEffect, useState } from "react";
import Wrapper from "../../../../layouts/Wrapper";
import {
  Form,
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink,
} from "reactstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  AiOutlineDislike,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineLike,
} from "react-icons/ai";
import { LiaUserTimesSolid } from "react-icons/lia";
import { GiHumanTarget, GiQueenCrown } from "react-icons/gi";
import { FiPlus } from "react-icons/fi";
import { VscFilter } from "react-icons/vsc";
import profileUser from "../../../../../assets/images/no-images-available.jpg";
import whatsappIcon from "../../../../../assets/images/whatsapp-icon.svg";
import { LuMailOpen, LuView } from "react-icons/lu";
import { IoCallOutline, IoClose, IoImagesOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiMessageDetail } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
import ViewProfileFilter from "./ViewProfileFilter";
import BridenGroomServices from "../../../../../services/BridenGroomServices";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../../../utils/Loader/Loader";
import NoImageFound from "../../../../../utils/NoImageFound";
import moment from "moment/moment";
import config from "../../../../../../config";
import Pagination from "../../../../../utils/Pagination";
import ProfilesDetailsAdd from "../profile/ProfilesDetailsAdd";
import { GrFormView, GrUpdate } from "react-icons/gr";
import { TbDetails } from "react-icons/tb";
import { FaFlag } from "react-icons/fa";
import ValidateAuthenticationKey from "../../../../../utils/ValidationAuthenticationKey";
import classnames from "classnames";
import { values } from "lodash";

const ViewProfile = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [currentInd, setCurrentInd] = useState("0");
  const location = useLocation();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  // Extract initial page from query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialTabValue = queryParams.get("tab");
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [tabValue, setTabValue] = useState("");
  const [activeTab, setActiveTab] = useState(initialTabValue || "All");
  const tabs = [
    {
      id: 1,
      value: {},
      name: "All",
    },
    {
      id: 2,
      value: { is_approve: 0 },
      name: "Leads",
    },
    {
      id: 3,
      value: { is_approve: 1 },
      name: "Approved",
    },
    {
      id: 4,
      value: { is_premium: 1 },
      name: "Premium",
    },
    {
      id: 5,
      value: { is_premium: 0 },
      name: "Non Premium",
    },
    {
      id: 6,
      value: { is_deleted: 1 },
      name: "Archived",
    },
  ];
  const clearQueryParams = () => {
    navigate({
      pathname: location.pathname, // Keeps the current path
      search: "", // Clears all query parameters
    });
  };
  // Function to convert tabValue object to query string
const convertToQueryString = (params) => {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};


  const { data, isLoading: isLoadingData } = useQuery(
    ["bridengroomdata", pageNumber, tabValue],
    () =>
      BridenGroomServices.getBridenGroomAlls( `?page=${pageNumber}&${convertToQueryString(tabValue)}`),
    {
      onSuccess: (data) => {
        const total = Math.ceil(data?.data?.count / 10);
        setTotalPages(total);
      },
      onError: (err) => {
        if (err?.response?.status == 401) {
          ValidateAuthenticationKey(
            err?.response?.status,
            "Your login session has expired. Please log in again."
          );
          return;
        }
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );

  const handleCurrentActiveIndex = (index) => {
    // If the clicked index is the same as the currently opened one, close it
    if (currentInd === index) {
      setCurrentInd(null);
    } else {
      // Otherwise, open the clicked index
      setCurrentInd(index);
    }
  };

  useEffect(() => {
    setPageNumber(initialPage);
  }, [initialPage]);

  const handleNav = () => {
    navigate("/bridengroom/customer/add");
  };

  // update modal

  const [updateModal, setModalUpdate] = useState(false);
  const toggle = () => setModalUpdate(!updateModal);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // resetTimer()
        deleteBridenGroom.mutate({ id: id });
      }
    });
  };
  const deleteBridenGroom = useMutation(
    (formdata) => {
      return BridenGroomServices.deleteBridenGroom(formdata);
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          title: "Successfull",
          text: "Deleted",
          icon: "success",
        });
        // queryClient.invalidateQueries("subscription-organization");
        queryClient.refetchQueries(["bridengroomdata", pageNumber]);
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
        // alert(err?.response?.data?.error || err?.message);
      },
    }
  );

  // Function to toggle between tabs
  const toggleTab = (tab, value, name) => {
    if (activeTab !== name) {
      setTabValue(value);
      setPageNumber(1);
      queryParams.set("tab", name);
      queryParams.set("page", 1);
      navigate(`${location.pathname}?${queryParams.toString()}`);
      setActiveTab(name);
    }
  };

  return (
    <>
      <Wrapper>
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
                      <Button className="btn btn-style1" onClick={handleNav}>
                        {" "}
                        Add <FiPlus />
                      </Button>
                    </li>
                    <li className="filter-btn-wrap">
                      <Button
                        className="btn btn-outline-style1"
                        onClick={() => setToggleFilter(!toggleFilter)}
                      >
                        Filter <VscFilter />
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {toggleFilter && <ViewProfileFilter />}
            <div className="view-profile-tab-wrap">
              <Nav tabs>
                {tabs?.map((ele) => {
                  return (
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === ele?.name,
                        })}
                        onClick={() =>
                          toggleTab(ele?.id, ele?.value, ele?.name)
                        }
                      >
                        {ele?.name}
                      </NavLink>
                    </NavItem>
                  );
                })}
              </Nav>
              {/* <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <p>Content for Tab 1</p>
                </TabPane>
                <TabPane tabId="2">
                  <p>Content for Tab 2</p>
                </TabPane>
                <TabPane tabId="3">
                  <p>Content for Tab 2</p>
                </TabPane>
                <TabPane tabId="4">
                  <p>Content for Tab 2</p>
                </TabPane>
              </TabContent> */}
            </div>

            <div className="view-profile-wrap">
              {isLoadingData ? (
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
                                  <Link
                                    to={
                                      "/bridengroom/customer/" +
                                      btoa(each?.id)
                                    }
                                  >
                                    <h3>
                                      {each?.user?.first_name || ""}{" "}
                                      {each?.user?.last_name || ""}
                                      {each?.is_premium && (
                                  <span
                                    className="premium-tag"
                                    style={{
                                      color: "#ea8c21",
                                      fontSize: "20px",
                                    }}
                                  >
                                    {" "}
                                    <GiQueenCrown />
                                  </span>
                                )}
                                    </h3>

                                    <h5>
                                      {/* {each?.lead_create_by?.account_type=="franchise" && `Lead By Franchise ${each?.lead_create_by?.user?.email}(${each?.lead_create_by?.name})`   } */}
                                      {/* {each?.user?.first_name || ""}
                                      {index}
                                      {index + 1} */}
                                    </h5>
                                  </Link>
                                  {each?.lead_create_by?.account_type ==
                                  "org" ? (
                                    <Button className="btn orange-btn me-2 mb-2">
                                      {each?.lead_create_by?.domain_name ||
                                        each?.lead_create_by?.host}
                                    </Button>
                                  ) : each?.lead_create_by?.account_type ==
                                    "franchise" ? (
                                    <Button className="btn orange-btn me-2 mb-2">
                                      {each?.lead_create_by?.name
                                        ? [
                                            each.lead_create_by.name,
                                            " ",
                                            <FaFlag key="flag" />,
                                          ]
                                        : "N/A"}
                                    </Button>
                                  ) : null}
                                  <Button className="btn blue-btn me-2 mb-2">
                                    Match Report
                                  </Button>
                                  {/* <Button className="btn green-btn me-2 mb-2"> */}
                                  <a
                                    className="btn green-btn me-2 mb-2"
                                    target="_sb"
                                    href={`https://wa.me/${each?.phone}`}
                                  >
                                    <img
                                      className="img-fluid"
                                      src={whatsappIcon}
                                      alt=""
                                    />
                                    Message
                                  </a>
                                  {/* </Button> */}
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
                                    <span>Marital Status :</span>{" "}
                                    {each?.marital_status || ""}
                                  </p>
                                  <p>
                                    <span>Religion :</span>{" "}
                                    {each?.religion || ""}
                                  </p>
                                  <p>
                                    <span>Location :</span>{" "}
                                    {each?.country || ""}
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
                                        <a href={`mailto:${each?.user?.email}`}>
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
                                        <a
                                          href={`tel:${each?.phone_code}${each?.phone}`}
                                        >
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
                              <Col
                                md="12"
                                lg="12"
                                xl="6"
                                xxl="4"
                                className="mb-3"
                              >
                                <div className="profile-info-list">
                                  <h4>
                                    <span>Next Followup :</span> N/A{" "}
                                  </h4>
                                </div>
                              </Col>
                              <Col
                                md="12"
                                lg="12"
                                xl="6"
                                xxl="4"
                                className="mb-3"
                              >
                                <div className="profile-info-list">
                                  <h4>
                                    <span>Registered On: </span>{" "}
                                    {moment(each?.createdAt).format("ll")}
                                  </h4>
                                </div>
                              </Col>
                              <Col
                                md="12"
                                lg="12"
                                xl="6"
                                xxl="4"
                                className="mb-3"
                              >
                                <div className="profile-info-list">
                                  <h4>
                                    <span>Assigned To : </span> Not Assigned{" "}
                                  </h4>
                                </div>
                              </Col>
                              <Col
                                md="12"
                                lg="12"
                                xl="6"
                                xxl="4"
                                className="mb-3"
                              >
                                <div className="profile-info-list">
                                  <h4>
                                    <span>Plan Name : </span> N/A{" "}
                                  </h4>
                                </div>
                              </Col>
                              <Col
                                md="12"
                                lg="12"
                                xl="6"
                                xxl="4"
                                className="mb-3"
                              >
                                <div className="profile-info-list">
                                  <h4>
                                    <span>Plan Activated On: </span> N/A{" "}
                                  </h4>
                                </div>
                              </Col>
                              <Col
                                md="12"
                                lg="12"
                                xl="6"
                                xxl="4"
                                className="mb-3"
                              >
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
                              <Button
                                className="btn btn-outline-style1"
                                onClick={() => handleDelete(each?.id)}
                              >
                                {" "}
                                <RiDeleteBin6Line />{" "}
                              </Button>
                            </li>
                            <li>
                              <Button
                                className="btn orange-btn"
                                onClick={() =>
                                  navigate(
                                    "/bridengroom/customer/" +
                                      btoa(each?.id)
                                  )
                                }
                              >
                                {" "}
                                <AiOutlineEye />{" "}
                              </Button>
                            </li>

                            <li>
                              <Button
                                type="click"
                                className="btn green-btn"
                                // onClick={() => toggle()}
                              >
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
              )}
            </div>

            {!isLoadingData && data?.data?.results?.length > 0 && (
              <Pagination count={data?.data?.count} pageSize={10} />
            )}
          </div>
        }
      </Wrapper>
      <Modal
        size="lg"
        className="common-modal"
        isOpen={updateModal}
        toggle={toggle}
      >
        <Button className="close-btn" onClick={toggle}>
          <IoClose />
        </Button>
        <ModalBody>
          <div className="modal-heading">
            <h4>Update Details</h4>
          </div>
          <Row>
            <Col xl="12">
              <FormGroup className="common-formgroup">
                <Label> Name </Label>
                <Input id="" name="" placeholder="Name" type="text" />
              </FormGroup>
            </Col>
            <Col xl="6">
              <FormGroup className="common-formgroup">
                <Label> Email </Label>
                <Input id="" name="" placeholder="Email" type="email" />
              </FormGroup>
            </Col>
            <Col xl="6">
              <FormGroup className="common-formgroup">
                <Label> Phone </Label>
                <Input id="" name="" placeholder="Phone" type="text" />
              </FormGroup>
            </Col>
            <Col xl="12">
              <FormGroup className="common-formgroup">
                <Label> Marital Status </Label>
                <ul className="common-radio-btn mt-3">
                  <li>
                    <Input
                      id="MaritalStatusUnmarried"
                      name="MaritalStatus"
                      type="radio"
                    />
                    <Label for="MaritalStatusUnmarried"> Unmarried </Label>
                  </li>
                  <li>
                    <Input
                      id="MaritalStatusWidow"
                      name="MaritalStatus"
                      type="radio"
                    />
                    <Label for="MaritalStatusWidow"> Widow/Widower </Label>
                  </li>
                  <li>
                    <Input
                      id="MaritalStatusDivorcee"
                      name="MaritalStatus"
                      type="radio"
                    />
                    <Label for="MaritalStatusDivorcee"> Divorcee </Label>
                  </li>
                </ul>
              </FormGroup>
            </Col>
            <Col xl="6">
              <FormGroup className="common-formgroup">
                <Label> Religion </Label>
                <Input id="exampleSelect" name="select" type="select">
                  <option>Hinduism</option>
                  <option>Sikhism</option>
                  <option>Christianity</option>
                  <option>Buddhism</option>
                </Input>
              </FormGroup>
            </Col>
            <Col xl="6">
              <FormGroup className="common-formgroup">
                <Label> Location </Label>
                <Input id="exampleSelect" name="select" type="select">
                  <option>Australia</option>
                  <option>USA</option>
                  <option>India</option>
                </Input>
              </FormGroup>
            </Col>
            <Col xl="12">
              <FormGroup className="common-formgroup">
                <Button className="btn-style1 px-4"> Update </Button>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewProfile;
