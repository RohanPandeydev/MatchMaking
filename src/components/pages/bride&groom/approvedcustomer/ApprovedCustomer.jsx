import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Row } from "reactstrap";
import {
  IoCallOutline,
  IoImagesOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuMailOpen } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { FaFlag, FaRegComments } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import profileUser from "../../../../assets/images/no-images-available.jpg";
import { TbDetails, TbGenderFemale, TbGenderMale } from "react-icons/tb";
import Wrapper from "../../../layouts/Wrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BridenGroomServices from "../../../../services/BridenGroomServices";
import Pagination from "../../../../utils/Pagination";
import config from "../../../../../config";
import moment from "moment";
import Loader from "../../../../utils/Loader/Loader";
import NoImageFound from "../../../../utils/NoImageFound";
import Swal from "sweetalert2";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import { GiQueenCrown } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";

const ApprovedCustomer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Extract initial page from query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [currentInd, setCurrentInd] = useState("0");
  const [bridengroomId, setBrideGroomId] = useState("");
  const { data, isLoading: isLoadingData } = useQuery(
    ["bridengroomdata-listing-approve-customer", pageNumber],
    () =>
      BridenGroomServices.getBridenGroomAlls(
        `?page=${pageNumber}&is_approve=${1}`
      ),
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
  useEffect(() => {
    // Keep pageNumber and pageValue in sync
    // queryParams.set("page", pageNumber);
    // navigate({
    //   pathname: location.pathname,
    //   search: queryParams.toString(),
    // });
    setBrideGroomId("")
    setCurrentInd("0")
    setPageNumber(initialPage);
  }, [initialPage]);

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
        queryClient.refetchQueries([
          "bridengroomdata-listing-approve-customer",
          pageNumber,
        ]);
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

  const handleCurrentActiveIndex = (index, idx) => {
    setBrideGroomId(idx);
    // If the clicked index is the same as the currently opened one, close it
    if (currentInd === index) {
      setCurrentInd(null);
    } else {
      // Otherwise, open the clicked index
      setCurrentInd(index);
    }
  };

  const { data: shareData, isLoading: isShareDataLoad } = useQuery(
    ["bride-groom-data-shared", bridengroomId],
    () =>
      BridenGroomServices.getBridenGroomShareDataById(
        `?brideandgroom=${bridengroomId}`
      ),
    {
      enabled: !!bridengroomId,
      select: (data) => {
        const franchises = data?.data?.results?.filter(
          (each) => each?.tenant?.account_type == "franchise"
        );
        const organizations = data?.data?.results?.filter(
          (each) => each?.tenant?.account_type == "org"
        );
        return {
          franchise: franchises,
          organization: organizations,
        };
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


  return (
    <Wrapper>
      <div className="approved-customer-wrapper">
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
                          xxl="3"
                          className="mb-3 mb-xxl-0"
                        >
                          <div className="profile-name-wrap">
                            <Link
                              to={
                                "/bridengroom/approved/customer/details/" +
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
                            </Link>
                            {each?.lead_create_by?.account_type == "org" ? (
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
                            <h5>
                              {(each?.amount && "C$ " + each?.amount) || "Ca$ 0"}
                            </h5>
                            <div className="interest mt-4">
                              <span className="interest-name">Interest </span>{" "}
                              <span
                                className={
                                  each?.interest_type
                                    ? "interest-color text-capitalize " +
                                      each?.interest_type
                                    : "interest-color orange"
                                }
                              >
                                {each?.interest_type || ""}
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col
                          md="12"
                          lg="12"
                          xl="6"
                          xxl="3"
                          className="mb-3 mb-xxl-0"
                        >
                          <div className="profile-contact-wrap">
                            <div className="contact-list">
                              <div className="icon">
                                {each?.gender == "male" ? (
                                  <TbGenderMale />
                                ) : (
                                  <TbGenderFemale />
                                )}
                              </div>
                              <div className="info">
                                <p>{each?.gender || ""}</p>
                              </div>
                            </div>
                            <div className="contact-list">
                              <div className="icon">
                                <IoLocationOutline />
                              </div>
                              <div className="info">
                                <p> {each?.country || ""}</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col
                          md="12"
                          lg="12"
                          xl="6"
                          xxl="3"
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
                        <Col
                          md="12"
                          lg="12"
                          xl="6"
                          xxl="3"
                          className="mb-3 mb-xxl-0"
                        >
                          <div className="profile-status-wrap">
                            <p>
                              <span>Registerd On :</span>{" "}
                              {moment(each?.createdAt).format("ll")}
                            </p>
                            <p>
                              <span>Next Followup Date :</span> N/A
                            </p>
                            <p>
                              <span>Approved Date :</span>      {moment(each?.updatedAt).format("lll")}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="profile-details-bottom">
                      {!isShareDataLoad &&
                      shareData?.franchise?.length == 0 &&
                      shareData?.organization.length == 0 ? (
                        <p>Data not shared with any organization/franchise</p>
                      ) : (
                        <>
                          {!isShareDataLoad &&
                            shareData?.franchise?.length > 0 && (
                              <div className="profile-org-franchise-wrap border-0 pt-0">
                                <div className="profile-org-franchise-title">
                                  <h4>Franchise</h4>
                                </div>
                                <div className="profile-org-franchise-list-wrap">
                                  <ul>
                                    {!isShareDataLoad &&
                                      shareData?.franchise?.map((each) => {
                                        return (
                                          <li>{each?.tenant?.name || ""}</li>
                                        );
                                      })}
                                  </ul>
                                </div>
                              </div>
                            )}
                          {!isShareDataLoad &&
                            shareData?.organization.length > 0 && (
                              <div className="profile-org-franchise-wrap border-top-0">
                                <div className="profile-org-franchise-title">
                                  <h4>Organization</h4>
                                </div>
                                <div className="profile-org-franchise-list-wrap">
                                  <ul>
                                    {!isShareDataLoad &&
                                      shareData?.organization?.map((each) => {
                                        return (
                                          <li>{each?.tenant?.name || ""}</li>
                                        );
                                      })}
                                  </ul>
                                </div>
                              </div>
                            )}
                        </>
                      )}
                      {/* {!isShareDataLoad && shareData?.franchise?.length > 0 && (
                        <div className="profile-org-franchise-wrap">
                          <div className="profile-org-franchise-title">
                            <h4>Franchise</h4>
                          </div>
                          <div className="profile-org-franchise-list-wrap">
                            <ul>
                              {!isShareDataLoad &&
                                shareData?.franchise?.map((each) => {
                                  return <li>{each?.tenant?.name || ""}</li>;
                                })}
                            </ul>
                          </div>
                        </div>
                      )}
                      {!isShareDataLoad &&
                        shareData?.organization.length > 0 && (
                          <div className="profile-org-franchise-wrap border-top-0">
                            <div className="profile-org-franchise-title">
                              <h4>Organization</h4>
                            </div>
                            <div className="profile-org-franchise-list-wrap">
                              <ul>
                                {!isShareDataLoad &&
                                  shareData?.organization?.map((each) => {
                                    return <li>{each?.tenant?.name || ""}</li>;
                                  })}
                              </ul>
                            </div>
                          </div>
                        )} */}
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
                              "/bridengroom/approved/customer/details/" +
                                btoa(each?.id)
                            )
                          }
                        >
                          {" "}
                          <AiOutlineEye />{" "}
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="profile-toggle-button">
                  <Button
                    className="profile-toggle-btn"
                    onClick={() => handleCurrentActiveIndex(index, each?.id)}
                  >
                    <IoIosArrowDown />
                  </Button>
                </div>
              </div>
            );
          })
        )}

        {/* <div className="view-profile-list">
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
                    xxl="3"
                    className="mb-3 mb-xxl-0"
                  >
                    <div className="profile-name-wrap">
                      <h3>Praveen Bommannavar</h3>
                      <h5>NMGH245903</h5>
                      <div className="interest mt-4">
                        <span className="interest-name">Interest </span>{" "}
                        <span className="interest-color orange">Orange</span>
                      </div>
                    </div>
                  </Col>
                  <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                    <div className="profile-contact-wrap">
                      <div className="contact-list">
                        <div className="icon">
                          <TbGenderFemale />
                        </div>
                        <div className="info">
                          <p>Male</p>
                        </div>
                      </div>
                      <div className="contact-list">
                        <div className="icon">
                          <IoLocationOutline />
                        </div>
                        <div className="info">
                          <p>Aland Islands</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                    <div className="profile-contact-wrap">
                      <div className="contact-list">
                        <div className="icon">
                          <LuMailOpen />
                        </div>
                        <div className="info">
                          <p>
                            <a href="mailto:praveen@gmail.com">
                              praveen@gmail.com
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
                            <a href="tel:+1 9568 2356">+1 9568 2356</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                    <div className="profile-status-wrap">
                      <p>
                        <span>Registerd On :</span> June 16, 2021 12:28 AM
                      </p>
                      <p>
                        <span>Next Followup Date :</span> N/A
                      </p>
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
              </ul>
            </div>
          </div>
        </div> */}
        {/* <div className="view-profile-list">
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
                                <Col md="12" lg="12" xl="12" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-name-wrap">
                                        <h3>Praveen Bommannavar</h3>
                                        <h5>NMGH245903</h5>
                                        <div className="interest mt-4">
                                            <span className="interest-name">Interest </span> <span className="interest-color blue">Blue</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-contact-wrap">
                                        <div className="contact-list">
                                            <div className="icon">
                                                <TbGenderFemale />
                                            </div>
                                            <div className="info">
                                                <p>Male</p>
                                            </div>
                                        </div>
                                        <div className="contact-list">
                                            <div className="icon">
                                                <IoLocationOutline />
                                            </div>
                                            <div className="info">
                                                <p>Aland Islands</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
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
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-status-wrap">
                                        <p><span>Registerd On :</span> June 16, 2021 12:28 AM</p>
                                        <p><span>Next Followup Date :</span> N/A</p>
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
                
            </div>
            <div className="view-profile-list">
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
                                <Col md="12" lg="12" xl="12" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-name-wrap">
                                        <h3>Praveen Bommannavar</h3>
                                        <h5>NMGH245903</h5>
                                        <div className="interest mt-4">
                                            <span className="interest-name">Interest </span> <span className="interest-color red">Red</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-contact-wrap">
                                        <div className="contact-list">
                                            <div className="icon">
                                                <TbGenderFemale />
                                            </div>
                                            <div className="info">
                                                <p>Male</p>
                                            </div>
                                        </div>
                                        <div className="contact-list">
                                            <div className="icon">
                                                <IoLocationOutline />
                                            </div>
                                            <div className="info">
                                                <p>Aland Islands</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
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
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-status-wrap">
                                        <p><span>Registerd On :</span> June 16, 2021 12:28 AM</p>
                                        <p><span>Next Followup Date :</span> N/A</p>
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
                
            </div>
            <div className="view-profile-list">
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
                                <Col md="12" lg="12" xl="12" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-name-wrap">
                                        <h3>Praveen Bommannavar</h3>
                                        <h5>NMGH245903</h5>
                                        <div className="interest mt-4">
                                            <span className="interest-name">Interest </span> <span className="interest-color green">Green</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-contact-wrap">
                                        <div className="contact-list">
                                            <div className="icon">
                                                <TbGenderFemale />
                                            </div>
                                            <div className="info">
                                                <p>Male</p>
                                            </div>
                                        </div>
                                        <div className="contact-list">
                                            <div className="icon">
                                                <IoLocationOutline />
                                            </div>
                                            <div className="info">
                                                <p>Aland Islands</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
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
                                <Col md="12" lg="12" xl="6" xxl="3" className="mb-3 mb-xxl-0">
                                    <div className="profile-status-wrap">
                                        <p><span>Registerd On :</span> June 16, 2021 12:28 AM</p>
                                        <p><span>Next Followup Date :</span> N/A</p>
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
                
            </div> */}
        {!isLoadingData && data?.data?.results?.length > 0 && (
          <Pagination count={data?.data?.count} pageSize={10} />
        )}
      </div>
    </Wrapper>
  );
};

export default ApprovedCustomer;
