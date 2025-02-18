import { useState } from "react";
import { Button, Col, Input, Row } from "reactstrap";
import { IoClose } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SubscriptionServices from "../../../services/SubscriptionServices";
import Wrapper from "../../layouts/Wrapper";
import NoActiveDataFound from "../../../utils/NoActiveDataFound";
import Slider from "react-slick";
import ValidateAuthenticationKey from "../../../utils/ValidationAuthenticationKey";
import Swal from "sweetalert2";

const Customer = () => {
  const nav = useNavigate();
  // const [showForm, setShowForm] = useState(false);
  const [isActive, setIsActive] = useState(0);

  const handleNav = () => {
    // setShowForm(true);
    nav("/subscription/customer/form/");
  };

  const { data, isLoading: isLoadingData } = useQuery(
    ["subscription-customer"],
    () => SubscriptionServices.getSubscriptionCustomerList(),
    {
      onSuccess: (data) => {
        // console.log('data', data?.data)
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

  let Subscription = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Wrapper>
        <div className="common-db-head mb-4">
          <Row className="align-items-center">
            <Col md="6">
              <h4>Subscription</h4>
            </Col>
            <Col md="6" className="text-end">
              <Button className="btn btn-style1" onClick={handleNav}>
                + Add Subscription
              </Button>
            </Col>
          </Row>
        </div>
        <div className="subscription-pricing-wrap">
          {!isLoadingData && data?.data?.length == 0 ? (
            <NoActiveDataFound msg={"No subscription available"} />
          ) : (
            <Row>
              <Col xs="3" md="3" xxl="2">
                <div className="subscription-left-wrap">
                  <div className="cost-row"></div>
                  <div className="compare-item-row">
                    <h4>Unlimited Calls & Contact Sharing</h4>
                  </div>
                  <div className="compare-item-row">
                    <h4>Search & Filters</h4>
                  </div>
                  <div className="compare-item-row">
                    <h4>Spotlights</h4>
                  </div>
                  <div className="compare-item-row">
                    <h4>Contact Views</h4>
                  </div>
                  <div className="compare-item-row">
                    <h4>Call Experts & Get Guidance</h4>
                  </div>
                  <div className="subscription-btn-wrap"></div>
                </div>
              </Col>
              <Col xs="9" md="9" xxl="10" className="mb-5">
                <Slider {...Subscription}>
                  {!isLoadingData &&
                    data?.data?.map((row, index) => {
                      index = index + 1;
                      return (
                        <div
                          key={index}
                          className={
                            isActive == index
                              ? "subscription-items active"
                              : "subscription-items"
                          }
                          onClick={() => setIsActive(index)}
                        >
                          <div className="subscription-list-wrap">
                            <div className="cost-row">
                              <Input
                                className="mb-3"
                                type="radio"
                                checked={isActive == index}
                              />
                              <h4 className="subscription-price">
                                <span>{row?.name}</span>
                              </h4>
                            </div>
                            <div className="compare-item-row">
                              <h4>
                                {row?.call_contact_share ? (
                                  <IoMdCheckmark />
                                ) : (
                                  <IoClose />
                                )}
                              </h4>
                            </div>
                            <div className="compare-item-row">
                              <h4>
                                {row?.search_and_filter ? (
                                  <IoMdCheckmark />
                                ) : (
                                  <IoClose />
                                )}
                              </h4>
                            </div>
                            <div className="compare-item-row">
                              <h4>{row?.spotlight}</h4>
                            </div>
                            <div className="compare-item-row">
                              <h4>{row?.contact_views}</h4>
                            </div>
                            <div className="compare-item-row">
                              <h4>
                                {row?.expert_guidance ? (
                                  <IoMdCheckmark />
                                ) : (
                                  <IoClose />
                                )}
                              </h4>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </Slider>
              </Col>

              {isActive > 0 ? (
                <Col xs="12" md="12" xxl="12" className="mb-5">
                  <div className="subscription-plans">
                    <Row>
                      {data.data[isActive - 1]?.plans.map((row, index) => {
                        return (
                          <Col key={index} xs="4" md="6" xxl="3">
                            <div className="plans-card">
                              <h4 className="plans-name">
                                {data.data[isActive - 1]?.name}
                              </h4>
                              <p className="plans-duration">{row?.name}</p>
                              <p className="price">{row?.amount} CA$</p>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </Col>
              ) : null}
            </Row>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Customer;
