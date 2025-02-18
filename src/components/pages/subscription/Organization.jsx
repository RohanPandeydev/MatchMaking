import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import { IoClose } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Wrapper from "../../layouts/Wrapper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OrganizationAdd from "./OrganizationAdd";
import SubscriptionServices from "../../../services/SubscriptionServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ValidateAuthenticationKey from "../../../utils/ValidationAuthenticationKey";
import Loader from "../../../utils/Loader/Loader";
import NoImageFound from "../../../utils/NoImageFound";
import Slider from "react-slick";
import { TiTick } from "react-icons/ti";
import Swal from "sweetalert2";
import NoActiveDataFound from "../../../utils/NoActiveDataFound";
import config from "../../../../config";
import paymentplaceholder from "../../../assets/images/paymentplaceholder.png";
import { IsAccessibleMethod } from "../../../guard/Rbac";
import PermissionSets from "../../../guard/Method";

const Organization = () => {
  const [showForm, setShowForm] = useState(false);
  const nav = useNavigate();
  const { id: editId } = useParams();
  const [subscriber_type, setSubscriberType] = useState("org");
  const queryClient = useQueryClient();

  const [id, setId] = useState("");

  const location = useLocation();

  // Extract initial page from query parameters
  const queryParams = new URLSearchParams(location.search);

  const clearQueryParams = () => {
    nav({
      pathname: location.pathname, // Keeps the current path
      search: "", // Clears all query parameters
    });
  };

  const handleNav = () => {
    // setShowForm(true);
    // clearQueryParams()
    nav("/subscription/organization/form");
  };
  const handleEditData = (id) => {
    nav("/subscription/organization/form/" + btoa(id));
    setId(btoa(id));
  };

  const {
    data: organizationList,
    isLoading: isLoadedOrganizationList,
    isError,
    error,
    refetch,
  } = useQuery(
    ["subscription-organization"],
    () =>
      SubscriptionServices.getSubscriptionOrganizationList(
        `?subscriber_type=${subscriber_type}`
      ),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        console.log("DataOrganization", data?.data);
        // StorageData.setData(data?.data?.data?.users);
        return data?.data;
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
        deleteOrganizationPkg.mutate({ id: id });
      }
    });
  };
  const deleteOrganizationPkg = useMutation(
    (formdata) => {
      return SubscriptionServices.subscriptionDeleteOrganizationPkg(formdata);
    },
    {
      onSuccess: (data) => {
        // console.log("Data after submission organization", data?.data);
        // alert("Created Successfully")
        Swal.fire({
          title: "Successfull",
          text: "Deleted",
          icon: "success",
        });
        setShowForm(false);
        // queryClient.invalidateQueries("subscription-organization");
        queryClient.refetchQueries("subscription-organization");
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

  useEffect(() => {
    try {
      // console.log("decodeId", !!editId, editId);
      const decodeId = editId && atob(editId);
      editId && setShowForm(true);

      editId && setId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [editId]);

  return (
    <>
      <Wrapper>
        {isLoadedOrganizationList ? (
          <Loader />
        ) : (
          <>
            <div className="common-db-head mb-4">
              <Row className="align-items-center">
                <Col md="6">
                  <h4>Subscription</h4>
                </Col>
                <IsAccessibleMethod
                  method={Object.keys(PermissionSets.subscription.Subscription.Create)[0]}
                  route={window.location.pathname}

                >
                  <Col md="6" className="text-end">
                    <Button className="btn btn-style1" onClick={handleNav}>
                      Add +
                    </Button>
                  </Col>
                </IsAccessibleMethod>
              </Row>
            </div>
            <div className="subscription-pricing-wrap">
              {organizationList?.length == 0 ? (
                <NoActiveDataFound msg={"No subscription available"} />
              ) : (
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
                      <Slider {...Subscription}>
                        {organizationList?.map((each) => {
                          const parsedDescription = each?.currency && JSON.parse(each.currency?.description);
                          let symbol = parsedDescription?.symbol || null;
                          return (
                            <div className="subscription-items">
                              <div className="subscription-list-wrap">
                                <div className="cost-row">
                                  <span className="pricing-discount">{each?.discount || 0} {each?.dis_type == "percentage" ? "%" : "flat"}</span>
                                  <h3 className="subscription-name pro-lite">
                                    <span>{each?.name || ""}</span>
                                  </h3>
                                  <h4 className="subscription-price">
                                    {symbol || ""} {each?.cost || 0}
                                  </h4>
                                  <h5 className="cuntry-name">{each?.country?.name && (each?.country?.name)}</h5>
                                </div>
                                <div className="compare-item-row">
                                  <h4>{each?.no_of_data || 0}</h4>
                                </div>
                                <div className="compare-item-row">
                                  <h4>{each?.no_of_subscription || 0}</h4>
                                </div>
                                <div className="compare-item-row">
                                  <h4 className="text-capitalize d-inline-flex flex-wrap justify-content-center">
                                    {(each?.payment_gateway?.length &&
                                      each?.payment_gateway?.map((elem) => {
                                        return (
                                          <>
                                            {" "}
                                            <img
                                              src={
                                                (elem?.logo_img &&
                                                  `${config.apiUrl}${elem?.logo_img}`) ||
                                                paymentplaceholder
                                              }
                                              className="img-fluid pay-method-img"
                                            />{" "}
                                          </>
                                        );
                                      })) ||
                                      ""}
                                  </h4>
                                </div>
                                <div className="compare-item-row">
                                  <h4>
                                    {each?.domain_setup ? (
                                      <IoMdCheckmark />
                                    ) : (
                                      <IoClose />
                                    )}
                                  </h4>
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
                                    <IsAccessibleMethod
                                      method={Object.keys(PermissionSets.subscription.Subscription.Update)[0]}
                                      route={window.location.pathname}

                                    >
                                      <li className="subc-edit">
                                        <Button
                                          className="subc-edit-btn"
                                          onClick={() =>
                                            handleEditData(each?.id)
                                          }
                                        >
                                          <FiEdit />
                                        </Button>
                                      </li>
                                    </IsAccessibleMethod>
                                    <IsAccessibleMethod
                                      method={Object.keys(PermissionSets.subscription.Subscription.Delete)[0]}
                                      route={window.location.pathname}

                                    >
                                      <li className="subc-del">
                                        <Button
                                          disabled={
                                            deleteOrganizationPkg?.isLoading
                                          }
                                          className="subc-del-btn"
                                          onClick={() => handleDelete(each?.id)}
                                        >
                                          {" "}
                                          <RiDeleteBin6Line />
                                        </Button>
                                      </li>
                                    </IsAccessibleMethod>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {/* <div className="subscription-items">
                          <div className="subscription-list-wrap">
                              <div className="cost-row">
                                  <h3 className="subscription-name pro"><span>Pro </span></h3>
                                  <h4 className="subscription-price">40.00 ca$</h4>
                              </div>
                              <div className="compare-item-row">
                                  <h4>20,000</h4>
                              </div>
                              <div className="compare-item-row">
                                  <h4>18</h4>
                              </div>
                              <div className="compare-item-row">
                                  <h4>paytm</h4>
                              </div>
                              <div className="compare-item-row">
                                  <h4> <IoMdCheckmark /></h4>
                              </div>
                              <div className="subscription-btn-wrap">
                                  <ul className="pricing-button">
                                      <li className="subc-add">
                                          <Button className="subc-add-btn"> <span className="text">Add Subscription</span> <span className="icon"><GoPlus /></span></Button>
                                      </li>
                                      <li className="subc-edit">
                                          <Button className="subc-edit-btn"><FiEdit /></Button>
                                      </li>
                                      <li className="subc-del">
                                          <Button className="subc-del-btn"> <RiDeleteBin6Line /></Button>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                      <div className="subscription-items">
                          <div className="subscription-list-wrap">
                              <div className="cost-row">
                                  <h3 className="subscription-name pro-max"><span>Pro Max</span></h3>
                                  <h4 className="subscription-price">40.00 ca$</h4>
                              </div>
                              <div className="compare-item-row">
                                  <h4>30,000</h4>
                              </div>
                              <div className="compare-item-row">
                                  <h4>35</h4>
                              </div>
                              <div className="compare-item-row">
                                  <h4>paytm</h4>
                              </div>
                              <div className="compare-item-row">
                                  <h4> <IoMdCheckmark /></h4>
                              </div>
                              <div className="subscription-btn-wrap">
                                  <ul className="pricing-button">
                                      <li className="subc-add">
                                          <Button className="subc-add-btn"> <span className="text">Add Subscription</span> <span className="icon"><GoPlus /></span></Button>
                                      </li>
                                      <li className="subc-edit">
                                          <Button className="subc-edit-btn"><FiEdit /></Button>
                                      </li>
                                      <li className="subc-del">
                                          <Button className="subc-del-btn"> <RiDeleteBin6Line /></Button>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                      <div className="subscription-items">
                          <div className="subscription-list-wrap">
                              <div className="cost-row">
                                  <h3 className="subscription-name pro-max"><span>Pro Max</span></h3>
                                  <h4 className="subscription-price">40.00 ca$</h4>
                              </div>
                              <div className="compare-item-row">
                                  <h4>30,000</h4>
                              </div>
                              <div className="compare-item-row">
                                  <h4>35</h4>
                              </div>
                              <div className="compare-item-row">
                                  <h4>paytm</h4>
                              </div>
                              <div className="compare-item-row">
                                  <h4> <IoMdCheckmark /></h4>
                              </div>
                              <div className="subscription-btn-wrap">
                                  <ul className="pricing-button">
                                      <li className="subc-add">
                                          <Button className="subc-add-btn"> <span className="text">Add Subscription</span> <span className="icon"><GoPlus /></span></Button>
                                      </li>
                                      <li className="subc-edit">
                                          <Button className="subc-edit-btn"><FiEdit /></Button>
                                      </li>
                                      <li className="subc-del">
                                          <Button className="subc-del-btn"> <RiDeleteBin6Line /></Button>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div> */}
                      </Slider>
                    </Col>
                  }
                </Row>
              )}
            </div>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Organization;
