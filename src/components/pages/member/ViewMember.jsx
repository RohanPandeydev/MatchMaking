import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import { IoClose } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Wrapper from "../../layouts/Wrapper";
import Loader from "../../../utils/Loader/Loader";
import NoImageFound from "../../../utils/NoImageFound";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
const ViewMember = () => {
    const nav=useNavigate()
    const handleNav=()=>{
        nav("/member/franchise/add")

    }
  return (
    <>
      <Wrapper>
        <>
          <div className="common-db-head mb-4">
            <Row className="align-items-center">
              <Col md="6">
                <h4>Subscription</h4>
              </Col>
              <Col md="6" className="text-end">
                <Button className="btn btn-style1" onClick={handleNav}>
                  Add +
                </Button>
              </Col>
            </Row>
          </div>
          <div className="subscription-pricing-wrap">
            <Row>
              <Col xs="3" md="3" xxl="2">
                <div className="subscription-left-wrap">
                  <div className="cost-row"></div>
                  <div className="compare-item-row">
                    <h4>No. Of Data</h4>
                  </div>
                  <div className="compare-item-row">
                    <h4>
                      No. Of <br />
                      Subscription{" "}
                    </h4>
                  </div>
                  <div className="compare-item-row">
                    <h4>Payment Method </h4>
                  </div>
                  <div className="compare-item-row">
                    <h4>Domain Setup </h4>
                  </div>
                  <div className="subscription-btn-wrap"></div>
                </div>
              </Col>
              {
                <Col xs="9" md="9" xxl="10" className="mb-5">
                  <div className="subscription-items">
                    <div className="subscription-list-wrap">
                      <div className="cost-row">
                        <h3 className="subscription-name pro-lite">
                          <span>{""}</span>
                        </h3>
                        <h4 className="subscription-price">{0} ca$</h4>
                      </div>
                      <div className="compare-item-row">
                        <h4>{0}</h4>
                      </div>
                      <div className="compare-item-row">
                        <h4>{0}</h4>
                      </div>
                      <div className="compare-item-row">
                        <h4>{""}</h4>
                      </div>
                      <div className="compare-item-row">
                        <h4></h4>
                      </div>
                      <div className="subscription-btn-wrap">
                        <ul className="pricing-button">
                          {/* <li className="subc-add">
                                    <Button className="subc-add-btn">
                                      {" "}
                                      <span className="text">
                                        Add Subscription
                                      </span>{" "}
                                      <span className="icon">
                                        <GoPlus />
                                      </span>
                                    </Button>
                                  </li> */}
                          <li className="subc-edit">
                            <Button
                              className="subc-edit-btn"
                              // onClick={() => handleEditData(each?.id)}
                            >
                              <FiEdit />
                            </Button>
                          </li>
                          <li className="subc-del">
                            <Button className="subc-del-btn">
                              {" "}
                              <RiDeleteBin6Line />
                            </Button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Col>
              }
            </Row>
          </div>
        </>
      </Wrapper>
    </>
  );
};

export default ViewMember;
