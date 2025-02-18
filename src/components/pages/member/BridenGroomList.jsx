import React from "react";
import Pagination from "../../../utils/Pagination";
import Loader from "../../../utils/Loader/Loader";
import NoImageFound from "../../../utils/NoImageFound";
import config from "../../../../config";
import {
  IoCallOutline,
  IoImagesOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { Button, Col, FormGroup, Row } from "reactstrap";
import { GiQueenCrown } from "react-icons/gi";
import { FaFlag, FaRegComments } from "react-icons/fa";
import { TbGenderFemale, TbGenderMale } from "react-icons/tb";
import moment from "moment";
import { LuMailOpen } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import profileUser from "../../../assets/images/no-images-available.jpg";
import { Link } from "react-router-dom";

const BridenGroomList = ({ isLoadingData, data, navigate, handleDelete }) => {
  return (
    <>
      {" "}
      {isLoadingData ? (
        <Loader />
      ) : data?.data?.results?.length == 0 ? (
        <NoImageFound />
      ) : (
        data?.data?.results?.map((each, index) => {
          each = each?.brideandgroom;
          return (
            <div className={"view-profile-list"}>
              <div className="view-profile-content">
                <div className="profile-img-wrap">
                  <div className="checkbox"></div>
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
                              each?.is_approve?    "/bridengroom/customer/" +
                              btoa(each?.id) +
                              "?details=" +
                              btoa("approve"):"/bridengroom/customer/" +
                                            btoa(each?.id) +
                                            "?details=" +
                                            btoa("leads")
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
                            {(each?.amount && "C$ " + each?.amount) || ""}
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
                  </ul>
                </div>
              </div>
            </div>
          );
        })
      )}
      {!isLoadingData && data?.data?.results?.length > 0 && (
        <Pagination count={data?.data?.count} pageSize={10} />
      )}
    </>
  );
};

export default BridenGroomList;
