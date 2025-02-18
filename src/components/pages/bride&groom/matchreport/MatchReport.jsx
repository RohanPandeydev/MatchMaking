import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Nav,
  NavItem,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Progress,
  Row,
  NavLink as NavLinkReact,
  TabContent,
  TabPane,
  Collapse,
  Table,
} from "reactstrap";
import profileUser from "../../../../assets/images/no-images-available.jpg";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FiMail, FiPlus } from "react-icons/fi";
import { LiaStarOfLifeSolid } from "react-icons/lia";
import { GrLocationPin } from "react-icons/gr";
import { AiOutlineEye } from "react-icons/ai";
import { LuMailOpen } from "react-icons/lu";
import classnames from "classnames";
import { HiMinus } from "react-icons/hi";
import Wrapper from "../../../layouts/Wrapper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BridenGroomServices from "../../../../services/BridenGroomServices";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import { useQuery } from "@tanstack/react-query";
import MatchedProfileListing from "./MatchedProfileListing";
import OffCanvas from "./OffCanvas";
import Swal from "sweetalert2";
import Loader from "../../../../utils/Loader/Loader";
import config from "../../../../../config";
import moment from "moment";
import calculateAgeByDateOfBirth from "../../../../utils/CalculateAge";
import ReceiverListing from "./ReceiverListing";
import SenderListing from "./SenderListing";
import PermissionSets from "../../../../guard/Method";
import { IsAccessibleMethodBMSPage } from "../../../../guard/Rbac";

const MatchReport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [matchedUserData, setMatchedUserData] = useState({});
  const [brideandgroomData, setBrideandGroom] = useState({});
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const [myId, setMyId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [tabFilter, setTabFilter] = useState("")

  // Extract initial page from query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialLimit = useMemo(
    () => parseInt(queryParams.get("limit")) || 10,
    [parseInt(queryParams.get("limit"))]
  );
  const [pageNumber, setPageNumber] = useState(initialPage);

  const handleOffCanvas = (e, data) => {
    setMatchedUserData(data);
    setIsOpen(!isOpen);
  };
  const handleClose = (e, data) => {
    setMatchedUserData({});
    setIsOpen(false);

  };
  const tabs = [
    {
      id: 1,

      name: "Profile Match",
    },
    {
      id: 2,
      feature: "sender__id",
      name: "Send Request",
    },
    {
      id: 3,
      feature: "receiver__id",

      name: "Received Request",
    },
  ];
  const toggleTab = (tab, name, feature) => {
    if (activeTab !== tab) {

      setTabFilter(`${feature}=${myId}`)
      setActiveTab(tab);
      setPageNumber(1);
      queryParams.set("page", 1);
      queryParams.set("limit", limit);
      navigate(`${location.pathname}?${queryParams.toString()}`);
    }
  };
  const [activeaccordionIndex, setActiveAccordianIndex] = useState(1);
  // const { id } = useParams();

  const handleAccordianToggle = (accordionIndex) => {
    if (activeaccordionIndex === accordionIndex) {
      setActiveAccordianIndex(null); // Close if already open
    } else {
      setActiveAccordianIndex(accordionIndex); // Open the clicked one
    }
  };
  const {
    data: matchProfileListing,
    isLoading: isLoadMatchProfileListing,
    isError,
    error,
    refetch,
  } = useQuery(
    ["match-report-bride-n-groom", pageNumber, myId],
    () => {
      // Dynamically build the query string
      let queryParams = `${myId}/?page=${pageNumber}&page_size=${initialLimit}`;

      return BridenGroomServices.getMatchedBridenGroom(queryParams);
    },
    {
      enabled: !!myId,
      refetchOnWindowFocus: false,
      select: (data) => {
        // console.log("Data Match Report ", data?.data);
        return data?.data;
        // const total = Math.ceil(data?.data?.count / 10);
        // setTotalPages(total);
        // StorageData.setData(data?.data?.data?.users);
      },
      onError: (err) => {
        console.log(err?.message);
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
  const {
    data: SenderList,
    isLoading: isLoadSender,
  } = useQuery(
    ["match-report-send-request", pageNumber, myId],
    () => {
      // Build the query string dynamically
      let queryParams = `?page=${pageNumber}&page_size=${initialLimit}&sender__id=${myId}`;


      return BridenGroomServices.getSender_ReceiverMatchReport(queryParams);
    },
    {
      enabled: !!myId,
      refetchOnWindowFocus: false,
      select: (data) => data?.data,
      onError: (err) => {
        console.log(err?.message);
        if (err?.response?.status === 401) {
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
  const {
    data: ReceiverProfiles,
    isLoading: isLoadReceiverProfiles,
  } = useQuery(
    ["match-report-receiver-request", pageNumber, myId],
    () => {
      // Build the query string dynamically
      let queryParams = `?page=${pageNumber}&page_size=${initialLimit}&receiver__id=${myId}`;


      return BridenGroomServices.getSender_ReceiverMatchReport(queryParams);
    },
    {
      enabled: !!myId,
      refetchOnWindowFocus: false,
      select: (data) => data?.data,
      onError: (err) => {
        console.log(err?.message);
        if (err?.response?.status === 401) {
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


  useEffect(() => {
    // console.log("Page Number",initialPage)
    setPageNumber(() => initialPage);
  }, [initialPage]);

  useEffect(() => {
    try {
      const decodeId = id && atob(id);
      console.log("decodeId", !!id, id);

      id && setMyId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [id]);

  const { data: brideandgroomDetails, isLoading: isLoadDetails } = useQuery(
    ["bridengroomdatabyid-details", myId],
    () => {
      return BridenGroomServices.getBridenGroomDetailsById({ id: myId });
    },
    {
      enabled: !!myId,
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.data;
      },
      onError: (err) => {
        console.log(err?.message);
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

  return (
    <Wrapper>
      <IsAccessibleMethodBMSPage
        method={Object.keys(PermissionSets.bridengroom.bridengroomListing.MatchReport)[0]}
        route={"/bridengroom/customer"}
        name={"MatchReport"}

      >
        <div className="match-report-wrapper">
          <div className="match-report-profile-wrap mb-4">
            <Row>
              <Col xs="12" lg="2" className="mb-2 mb-lg-0">
                <div className="match-report-profile-img">
                  <img
                    className="img-fluid"
                    src={
                      brideandgroomDetails?.photos?.length > 0
                        ? `${config.apiUrl}${brideandgroomDetails?.photos[0]?.upload_url}`
                        : profileUser
                    }
                    alt=""
                  />
                </div>
              </Col>
              {isLoadDetails ? (
                <Loader />
              ) : (
                <Col xs="12" lg="10">
                  <div className="match-report-profile-details">
                    <Row>
                      <Col xs="12" md="6" lg="4" xl="3" className="mb-3">
                        <div className="match-report-profile-dtls-list">
                          <div className="icon">
                            <FaUser />
                          </div>
                          <div className="details">
                            {(brideandgroomDetails &&
                              brideandgroomDetails?.user?.first_name) ||
                              ""}{" "}
                            {(brideandgroomDetails &&
                              brideandgroomDetails?.user?.last_name) ||
                              ""}{" "}
                            <br /> ID:{" "}
                            {brideandgroomDetails && brideandgroomDetails?.code}
                          </div>
                        </div>
                      </Col>
                      <Col xs="12" md="6" lg="4" xl="3" className="mb-3">
                        <div className="match-report-profile-dtls-list">
                          <div className="icon">
                            <MdDateRange />
                          </div>
                          <div className="details">
                            {" "}
                            {brideandgroomDetails &&
                              brideandgroomDetails?.date_of_birth &&
                              moment(brideandgroomDetails?.date_of_birth).format(
                                "ll"
                              )}{" "}
                            {brideandgroomDetails &&
                              brideandgroomDetails?.date_of_birth &&
                              `(${calculateAgeByDateOfBirth(
                                brideandgroomDetails?.date_of_birth
                              )} yrs)`}
                          </div>
                        </div>
                      </Col>
                      <Col xs="12" md="6" lg="4" xl="3" className="mb-3">
                        <div className="match-report-profile-dtls-list">
                          <div className="icon">
                            <FaUsers />
                          </div>
                          <div className="details">
                            {" "}
                            {(brideandgroomDetails &&
                              brideandgroomDetails?.marital_status?.replace(
                                "_",
                                " "
                              )) ||
                              ""}
                          </div>
                        </div>
                      </Col>
                      <Col xs="12" md="6" lg="4" xl="3" className="mb-3">
                        <div className="match-report-profile-dtls-list">
                          <div className="icon">
                            <IoCallOutline />
                          </div>
                          <div className="details">
                            {brideandgroomDetails &&
                              brideandgroomDetails?.phone_code && (
                                <a
                                  href={`tel:${brideandgroomDetails?.phone_code}${brideandgroomDetails?.phone}`}
                                >
                                  {brideandgroomDetails?.phone_code}{" "}
                                  {brideandgroomDetails?.phone}
                                </a>
                              )}
                          </div>
                        </div>
                      </Col>
                      <Col xs="12" md="6" lg="4" xl="3" className="mb-3">
                        <div className="match-report-profile-dtls-list">
                          <div className="icon">
                            <FiMail />
                          </div>
                          <div className="details">
                            {brideandgroomDetails &&
                              brideandgroomDetails?.user?.email && (
                                <a
                                  href={`mailto:${brideandgroomDetails?.user?.email}`}
                                >
                                  {brideandgroomDetails?.user?.email || ""}
                                </a>
                              )}
                          </div>
                        </div>
                      </Col>
                      <Col xs="12" md="6" lg="4" xl="3" className="mb-3">
                        <div className="match-report-profile-dtls-list">
                          <div className="icon">
                            <LiaStarOfLifeSolid />
                          </div>
                          <div className="details">
                            {" "}
                            {(brideandgroomDetails &&
                              brideandgroomDetails?.religion &&
                              brideandgroomDetails?.religion) ||
                              ""}
                          </div>
                        </div>
                      </Col>
                      <Col xs="12" md="6" lg="4" xl="3" className="mb-3">
                        <div className="match-report-profile-dtls-list">
                          <div className="icon">
                            <GrLocationPin />
                          </div>
                          <div className="details">
                            {(brideandgroomDetails &&
                              brideandgroomDetails?.city &&
                              brideandgroomDetails?.city) ||
                              ""}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" lg="4" xl="3" className="mb-3">
                        <div className="match-profile-count-wrap">
                          <div className="info">
                            <h4>Profile Match</h4>
                          </div>
                          <div className="count">{!isLoadMatchProfileListing && matchProfileListing?.count}</div>
                        </div>
                      </Col>
                      <Col xs="12" lg="4" xl="3" className="mb-3">
                        <div className="match-profile-count-wrap">
                          <div className="info">
                            <h4>Send Request</h4>
                          </div>
                          <div className="count">{!isLoadSender && SenderList?.count}</div>
                        </div>
                      </Col>
                      <Col xs="12" lg="4" xl="3" className="mb-3">
                        <div className="match-profile-count-wrap">
                          <div className="info">
                            <h4>Received Request</h4>
                          </div>
                          <div className="count">{!isLoadReceiverProfiles && ReceiverProfiles?.count}</div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              )}
            </Row>
          </div>

          <div className="common-db-head mb-4">
            <div className="align-items-center row">
              <div className="col-md-6">
                <h4>Match Report</h4>
              </div>
            </div>
          </div>

          <div className="view-profile-tab-wrap match-profile-tab-wrap mb-3">
            <Nav tabs>
              {tabs?.map((ele) => {
                return (
                  <NavItem>
                    <NavLinkReact
                      className={classnames({
                        active: activeTab === ele?.id,
                      })}
                      onClick={() => toggleTab(ele?.id, ele?.name, ele?.feature)}
                    >
                      {ele?.name}
                    </NavLinkReact>
                  </NavItem>
                );
              })}
            </Nav>
          </div>
          <TabContent activeTab={activeTab}>
            <TabPane tabId={1}>

              {isLoadMatchProfileListing ? (
                <Loader />
              ) : (
                <MatchedProfileListing
                  matchProfileListing={matchProfileListing}
                  handleOffCanvas={handleOffCanvas}
                  initialLimit={initialLimit}
                />
              )}
            </TabPane>
            <TabPane tabId={2}>
              {isLoadSender ? (
                <Loader />
              ) : (
                <SenderListing
                  matchProfileListing={SenderList}
                  handleOffCanvas={handleOffCanvas}
                  initialLimit={initialLimit}
                  currentTab={activeTab}
                />
              )}

            </TabPane>
            <TabPane tabId={3}>
              {isLoadReceiverProfiles ? (
                <Loader />
              ) : (
                <ReceiverListing
                  matchProfileListing={ReceiverProfiles}
                  handleOffCanvas={handleOffCanvas}
                  initialLimit={initialLimit}
                  currentTab={activeTab}

                />
              )}
            </TabPane>
          </TabContent>
        </div>
      </IsAccessibleMethodBMSPage>

      <div>
        <OffCanvas
          isOpen={isOpen}
          brideandgroomDetails={brideandgroomDetails}
          isLoadDetails={isLoadDetails}
          matchedUserData={matchedUserData}
          handleOffCanvas={handleOffCanvas}
          activeaccordionIndex={activeaccordionIndex}
          handleAccordianToggle={handleAccordianToggle}
          handleClose={handleClose}
        />
      </div>
    </Wrapper>
  );
};

export default MatchReport;
