import React from "react";
import profileUser from "../../../../assets/images/no-images-available.jpg";
import {
  Button,
  Col,
  Collapse,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Progress,
  Row,
  Table,
} from "reactstrap";
import { IoCallOutline } from "react-icons/io5";
import { LuMailOpen } from "react-icons/lu";
import { HiMinus } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import BridenGroomServices from "../../../../services/BridenGroomServices";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import extractTimeFromTimestamp from "../../../../utils/ExtractTime";
import calculateAgeByDateOfBirth from "../../../../utils/CalculateAge";
import Slider from "react-slick";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import config from "../../../../../config";
import isKeyValueMatch, {
  calculateMatchPercentage,
} from "../../../../utils/FindKeyInObj";
import { useMemo } from "react";

const OffCanvas = ({
  isOpen,
  handleOffCanvas,
  activeaccordionIndex,
  handleAccordianToggle,
  isLoadDetails,
  matchedUserData,
  brideandgroomDetails,
  handleClose,
}) => {
  console.log(
    "===",
    isLoadDetails,
    "==",
    matchedUserData,
    "---",
    brideandgroomDetails
  );

  // const [brideandgroomData]

 

  return (
    <div>
      {" "}
      {isLoadDetails ? (
        <ButtonLoader />
      ) : (
        <Offcanvas
          className="view-match-profile-offcanvas-wrapper"
          isOpen={isOpen}
          toggle={handleOffCanvas}
          direction="end"
        >
          <OffcanvasHeader toggle={handleClose}>Match Report</OffcanvasHeader>
          <OffcanvasBody>
            <div className="view-match-profile-details-wrap">
              <Row>
                <Col xs="12" lg="2" className="mb-3">
                  <div className="match-profile-wrap">
                    <div className="match-profile-img">
                      <img
                        className="img-fluid"
                        src={
                          matchedUserData?.photos?.length > 0
                            ? `${matchedUserData?.photos[0]?.upload_url}`
                            : profileUser
                        }
                        alt=""
                      />
                    </div>

                    <h5>
                      <LuMailOpen />{" "}
                      {matchedUserData && matchedUserData?.user?.email && (
                        <a href={`mailto:${matchedUserData?.user?.email}`}>
                          {matchedUserData?.user?.email || ""}
                        </a>
                      )}
                    </h5>
                    <h5>
                      <IoCallOutline />{" "}
                      {matchedUserData && matchedUserData?.phone_code && (
                        <a
                          href={`tel:${matchedUserData?.phone_code}${matchedUserData?.phone}`}
                        >
                          {matchedUserData?.phone_code} {matchedUserData?.phone}
                        </a>
                      )}
                    </h5>
                    <div className="member-code">  {matchedUserData?.code}</div>

                    <div className="match-profile-bar">
                      <Progress value={matchedUserData?.total_score || 0} />
                      <h5>
                        <span>{matchedUserData?.total_score || 0}%</span> Match
                      </h5>
                    </div>
                  </div>
                </Col>
                <Col xs="12" lg="10">
                  {/*Partner Preferance */}
                  {matchedUserData && (
                    <div className="profile-details-accordion-list">
                      <div className="profile-dtls-accordion-head">
                        <div className="left-heading">
                          <h4>Partner Preferance Infomation</h4>
                        </div>
                        <div className="toggle-btn">
                          <Button onClick={() => handleAccordianToggle(1)}>
                            {activeaccordionIndex == 1 ? (
                              <span className="minus">
                                <HiMinus />
                              </span>
                            ) : (
                              <span className="plus">
                                <FiPlus />
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>

                      <Collapse isOpen={activeaccordionIndex === 1}>
                        <div className="profile-details-accordion-body">
                          <Row>
                            <Col xl="6">
                              <div className="view-match-details">
                                <div className="common-table">
                                  <Table responsive>
                                    <thead>
                                      <tr>
                                        <th></th>
                                        <th>Partner </th>
                                        <th>Your Preferance</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>Looking For :</td>
                                        <td>
                                          <span>
                                            {brideandgroomDetails?.looking_for?.replaceAll(
                                              "_",
                                              " "
                                            )}
                                          </span>
                                        </td>
                                        <td>
                                          <span
                                            className={
                                              isKeyValueMatch(
                                                matchedUserData,
                                                "looking_for",
                                                brideandgroomDetails?.looking_for
                                              )
                                                ? "match"
                                                : "unmatch"
                                            }
                                          >
                                            {matchedUserData?.looking_for?.replaceAll(
                                              "_",
                                              " "
                                            ) || ""}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Complexion :</td>
                                        <td>
                                          <span>
                                            {brideandgroomDetails?.partner_complexion?.replaceAll(
                                              "_",
                                              " "
                                            )}
                                          </span>
                                        </td>
                                        <td>
                                          <span
                                            className={
                                              isKeyValueMatch(
                                                matchedUserData,
                                                "complexion",
                                                brideandgroomDetails?.partner_complexion
                                              )
                                                ? "match"
                                                : "unmatch"
                                            }
                                          >
                                            {matchedUserData?.partner_complexion ||
                                              ""}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>MotherTongue :</td>
                                        <td>
                                          <span>
                                            {brideandgroomDetails?.partner_mother_tongue?.replaceAll(
                                              "_",
                                              " "
                                            )}
                                          </span>
                                        </td>
                                        <td>
                                          <span
                                            className={
                                              isKeyValueMatch(
                                                matchedUserData,
                                                "mother_tongue",
                                                brideandgroomDetails?.partner_mother_tongue
                                              )
                                                ? "match"
                                                : "unmatch"
                                            }
                                          >
                                            {matchedUserData?.mother_tongue ||
                                              ""}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Religion :</td>
                                        <td>
                                          <span>
                                            {brideandgroomDetails?.partner_religion?.replaceAll(
                                              "_",
                                              " "
                                            )}
                                          </span>
                                        </td>
                                        <td>
                                          <span
                                            className={
                                              isKeyValueMatch(
                                                matchedUserData,
                                                "religion",
                                                brideandgroomDetails?.partner_religion
                                              )
                                                ? "match"
                                                : "unmatch"
                                            }
                                          >
                                            {matchedUserData?.religion || ""}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Caste :</td>
                                        <td>
                                          <span>
                                            {brideandgroomDetails?.partner_caste?.replaceAll(
                                              "_",
                                              " "
                                            )}
                                          </span>
                                        </td>
                                        <td>
                                          <span
                                            className={
                                              isKeyValueMatch(
                                                matchedUserData,
                                                "caste",
                                                brideandgroomDetails?.partner_caste
                                              )
                                                ? "match"
                                                : "unmatch"
                                            }
                                          >
                                            {matchedUserData?.caste || ""}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Education :</td>
                                        <td>
                                          <span>
                                            {brideandgroomDetails?.partner_education?.replaceAll(
                                              "_",
                                              " "
                                            )}
                                          </span>
                                        </td>
                                        <td>
                                          <span
                                            className={
                                              isKeyValueMatch(
                                                matchedUserData,
                                                "education",
                                                brideandgroomDetails?.partner_education
                                              )
                                                ? "match"
                                                : "unmatch"
                                            }
                                          >
                                            {matchedUserData?.education?.replaceAll(
                                              "_",
                                              " "
                                            ) || ""}
                                          </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                            </Col>
                            <Col xl="6">
                              <div className="view-match-details">
                                <div className="common-table">
                                  <Table responsive>
                                    <thead>
                                      <tr>
                                        <th></th>
                                        <th>Partner </th>
                                        <th>Your Preferance</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>Annual Income :</td>
                                        <td>
                                          <span>
                                            {brideandgroomDetails?.partner_annual_income?.replaceAll(
                                              "_",
                                              " "
                                            )}
                                          </span>
                                        </td>
                                        <td>
                                          <span
                                            className={
                                              isKeyValueMatch(
                                                matchedUserData,

                                                "annual_income",
                                                {
                                                  partner_annual_income_start:
                                                    brideandgroomDetails?.partner_annual_income?.split(
                                                      "-"
                                                    )[0],
                                                  partner_annual_income_end:
                                                    brideandgroomDetails?.partner_annual_income?.split(
                                                      "-"
                                                    )[1],
                                                }
                                              )
                                                ? "match"
                                                : "unmatch"
                                            }
                                          >
                                            {matchedUserData?.annual_income ||
                                              ""}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Country :</td>
                                        <td>
                                          <span>
                                            {brideandgroomDetails?.country?.replaceAll(
                                              "_",
                                              " "
                                            )}
                                          </span>
                                        </td>
                                        <td>
                                          {" "}
                                          <span
                                            className={
                                              isKeyValueMatch(
                                                matchedUserData,
                                                "country",
                                                brideandgroomDetails?.partner_country
                                              )
                                                ? "match"
                                                : "unmatch"
                                            }
                                          >
                                            {matchedUserData?.country?.replaceAll(
                                              "_",
                                              " "
                                            ) || ""}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Residance Status :</td>
                                        <td>
                                          <span>
                                            {brideandgroomDetails?.partner_residence_status?.replaceAll(
                                              "_",
                                              " "
                                            )}
                                          </span>
                                        </td>
                                        <td>
                                          <span
                                            className={
                                              isKeyValueMatch(
                                                matchedUserData,
                                                "residence_status",
                                                brideandgroomDetails?.partner_residence_status
                                              )
                                                ? "match"
                                                : "unmatch"
                                            }
                                          >
                                            {matchedUserData?.residence_status ||
                                              ""}
                                          </span>{" "}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Age Preference :</td>
                                        <td>
                                          {`${brideandgroomDetails?.partner_age_min} Yrs to ${brideandgroomDetails?.partner_age_max} Yrs ` ||
                                            "N/A"}{" "}
                                        </td>
                                        <td>
                                          <span
                                            className={
                                              isKeyValueMatch(
                                                matchedUserData,

                                                "date_of_birth",
                                                {
                                                  partner_age_min:
                                                    brideandgroomDetails?.partner_age_min,
                                                  partner_age_max:
                                                    brideandgroomDetails?.partner_age_max,
                                                }
                                              )
                                                ? "match"
                                                : "unmatch"
                                            }
                                          >
                                            {`${calculateAgeByDateOfBirth(
                                              matchedUserData?.date_of_birth
                                            )} Yrs ` || "N/A"}{" "}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Gender :</td>
                                        <td>
                                          <span>
                                            {brideandgroomDetails?.gender?.replaceAll(
                                              "_",
                                              " "
                                            )}
                                          </span>
                                        </td>
                                        <td>
                                          <span
                                            className={
                                              isKeyValueMatch(
                                                matchedUserData,
                                                "gender",
                                                brideandgroomDetails?.partner_gender
                                              )
                                                ? "match"
                                                : "unmatch"
                                            }
                                          >
                                            {matchedUserData?.gender || ""}
                                          </span>{" "}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Height :</td>
                                        <td>
                                          <span>Height :</span>{" "}
                                          {`${brideandgroomDetails?.partner_hight_min} Ft to ${brideandgroomDetails?.partner_hight_max} Ft ` ||
                                            "N/A"}
                                        </td>
                                        <td>
                                          <span
                                            className={
                                              isKeyValueMatch(
                                                matchedUserData,

                                                "hight",
                                                {
                                                  partner_hight_min:
                                                    brideandgroomDetails?.partner_hight_min,
                                                  partner_hight_max:
                                                    brideandgroomDetails?.partner_hight_max,
                                                }
                                              )
                                                ? "match"
                                                : "unmatch"
                                            }
                                          >
                                            {`${matchedUserData?.hight} Ft` ||
                                              "N/A"}
                                          </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Collapse>
                    </div>
                  )}
                  {/* Basic Details */}
                  {matchedUserData && (
                    <div className="profile-details-accordion-list">
                      <div className="profile-dtls-accordion-head">
                        <div className="left-heading">
                          <h4>Basic Infomation</h4>
                        </div>
                        <div className="toggle-btn">
                          <Button onClick={() => handleAccordianToggle(2)}>
                            {activeaccordionIndex == 2 ? (
                              <span className="minus">
                                <HiMinus />
                              </span>
                            ) : (
                              <span className="plus">
                                <FiPlus />
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>

                      <Collapse isOpen={activeaccordionIndex === 2}>
                        <div className="profile-details-accordion-body">
                          <Row>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Name :</span>{" "}
                                  {`${matchedUserData?.user?.first_name} ${matchedUserData?.user?.last_name}` ||
                                    "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Birth Place :</span>
                                  {matchedUserData?.birth_place || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Birth Time :</span>
                                  {extractTimeFromTimestamp(
                                    matchedUserData?.birth_time
                                  ) || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Gender :</span>{" "}
                                  {matchedUserData?.gender || ""}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Country:</span>{" "}
                                  {matchedUserData?.country || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>State:</span>{" "}
                                  {matchedUserData?.state || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>City:</span>{" "}
                                  {matchedUserData?.city || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Age:</span>{" "}
                                  {`${calculateAgeByDateOfBirth(
                                    matchedUserData?.date_of_birth
                                  )} yrs`}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> No Of Child:</span>{" "}
                                  {String(matchedUserData?.num_of_child) ||
                                    "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Children Living With Me:</span>{" "}
                                  {`${
                                    matchedUserData?.living_with_me
                                      ? "Yes"
                                      : "No"
                                  } ` || " N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> TalKing Head:</span>
                                  {matchedUserData?.taiking_head || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Marital Status:</span>
                                  {matchedUserData?.marital_status || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Height:</span>
                                  {matchedUserData?.hight + " Ft" || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Weight:</span>
                                  {matchedUserData?.weight + " Kg" || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Mother Tongue:</span>
                                  {matchedUserData?.mother_tongue || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Religion:</span>
                                  {matchedUserData?.religion || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Gothra:</span>
                                  {matchedUserData?.gothra || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Manglik:</span>
                                  {matchedUserData?.manglik || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Education:</span>
                                  {matchedUserData?.education || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Education:</span>
                                  {matchedUserData?.education || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Education Detail:</span>
                                  {matchedUserData?.education_details || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Employed In:</span>
                                  {matchedUserData?.employed_in || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Occupation:</span>
                                  {matchedUserData?.occupation || "N/A"}
                                </h4>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Collapse>
                    </div>
                  )}
                  {/* Residence Information */}
                  {matchedUserData && (
                    <div className="profile-details-accordion-list">
                      <div className="profile-dtls-accordion-head">
                        <div className="left-heading">
                          <h4>Residance Infomation</h4>
                        </div>
                        <div className="toggle-btn">
                          <Button onClick={() => handleAccordianToggle(3)}>
                            {activeaccordionIndex == 3 ? (
                              <span className="minus">
                                <HiMinus />
                              </span>
                            ) : (
                              <span className="plus">
                                <FiPlus />
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>

                      <Collapse isOpen={activeaccordionIndex === 3}>
                        <div className="profile-details-accordion-body">
                          <Row>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Country :</span>
                                  {matchedUserData?.country || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>State :</span>
                                  {matchedUserData?.state || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>City :</span>
                                  {matchedUserData?.city || "N/A"}
                                </h4>
                              </div>
                            </Col>

                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Residence Status:</span>{" "}
                                  {matchedUserData?.residence_status || "N/A"}
                                </h4>
                              </div>
                            </Col>

                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Country Code:</span>{" "}
                                  {matchedUserData?.phone_code || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Phone Number:</span>{" "}
                                  {matchedUserData?.phone || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            {/* <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Annual Income :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Phone Number :</span>{" "}
                              </h4>
                            </div>
                          </Col> */}
                          </Row>
                        </div>
                      </Collapse>
                    </div>
                  )}
                  {/* Physical Information */}
                  {matchedUserData && (
                    <div className="profile-details-accordion-list">
                      <div className="profile-dtls-accordion-head">
                        <div className="left-heading">
                          <h4>Physical Infomation</h4>
                        </div>
                        <div className="toggle-btn">
                          <Button onClick={() => handleAccordianToggle(4)}>
                            {activeaccordionIndex == 4 ? (
                              <span className="minus">
                                <HiMinus />
                              </span>
                            ) : (
                              <span className="plus">
                                <FiPlus />
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>

                      <Collapse isOpen={activeaccordionIndex === 4}>
                        <div className="profile-details-accordion-body">
                          <Row>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Height :</span>
                                  {matchedUserData?.hight + " Ft" || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Weight :</span>
                                  {matchedUserData?.weight + "Kg" || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Complexion :</span>
                                  {matchedUserData?.complexion || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Body Type :</span>
                                  {matchedUserData?.body_type || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Smoking :</span>
                                  {matchedUserData?.smoking || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Drinking :</span>
                                  {matchedUserData?.drinking || "N/A"}{" "}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Diet :</span>
                                  {matchedUserData?.diet || "N/A"}
                                </h4>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Collapse>
                    </div>
                  )}
                  {/* Other Information */}
                  {matchedUserData && (
                    <div className="profile-details-accordion-list">
                      <div className="profile-dtls-accordion-head">
                        <div className="left-heading">
                          <h4>Other Infomation</h4>
                        </div>
                        <div className="toggle-btn">
                          <Button onClick={() => handleAccordianToggle(5)}>
                            {activeaccordionIndex == 5 ? (
                              <span className="minus">
                                <HiMinus />
                              </span>
                            ) : (
                              <span className="plus">
                                <FiPlus />
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>

                      <Collapse isOpen={activeaccordionIndex === 5}>
                        <div className="profile-details-accordion-body">
                          <Row>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span>Father Name :</span>{" "}
                                  {matchedUserData?.father_name || "N/A"}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Profile Text :</span>{" "}
                                  {matchedUserData?.profile_text || "N/A"}{" "}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> No of Brothers :</span>{" "}
                                  {String(matchedUserData?.num_of_brother) ||
                                    "N/A"}{" "}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> No of Sisters :</span>{" "}
                                  {String(matchedUserData?.num_of_sister) ||
                                    "N/A"}{" "}
                                </h4>
                              </div>
                            </Col>
                            <Col lg="6" xl="6">
                              <div className="approved-customer-view-info-list">
                                <h4>
                                  <span> Body Type:</span>{" "}
                                  {String(matchedUserData?.body_type) || "N/A"}{" "}
                                </h4>
                              </div>
                            </Col>
                            {/* <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Caste :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Education :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Annual Income :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Country :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Residance Status :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Age Preference :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Gender :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span>Height :</span>{" "}
                              </h4>
                            </div>
                          </Col>
                          <Col lg="6" xl="6">
                            <div className="approved-customer-view-info-list">
                              <h4>
                                <span> Marital Status :</span>{" "}
                              </h4>
                            </div>
                          </Col> */}
                          </Row>
                        </div>
                      </Collapse>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </OffcanvasBody>
        </Offcanvas>
      )}
    </div>
  );
};

export default OffCanvas;
