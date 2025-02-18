import React, { useMemo, useState } from "react";
import Wrapper from "../../../layouts/Wrapper";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import staffimg from "../../../../assets/images/no-images-available.jpg";
import { LiaEdit } from "react-icons/lia";
import { CgLogOut } from "react-icons/cg";
import { LuUser } from "react-icons/lu";
import Pagination from "../../../../utils/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StaffServices from "../../../../services/StaffServices";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import Swal from "sweetalert2";
import NoActiveDataFound from "../../../../utils/NoActiveDataFound";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import { FaTrash } from "react-icons/fa6";
import moment from "moment/moment";
import Loader from "../../../../utils/Loader/Loader";
import { update } from "lodash";
import config from "../../../../../config";
import { IsAccessibleMethod } from "../../../../guard/Rbac";
import PermissionSets from "../../../../guard/Method";
import { useEffect } from "react";

const StaffList = () => {
  const nav = useNavigate();
  const location = useLocation();
  // Extract initial page from query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialLimit = useMemo(
    () => parseInt(queryParams.get("limit")) || 10,
    [parseInt(queryParams.get("limit"))]
  );
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit || 10);
  const queryClient = useQueryClient();
  const { data: staffList, isLoading: isStaffLoad } = useQuery(
    ["staff-list", pageNumber],
    () => StaffServices.staffList(`?page=${pageNumber}&page_size=${limit}`),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        console.log("Data Franchise ", data?.data);
        // StorageData.setData(data?.data?.data?.users);
        return data;
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // resetTimer()
        // console.log("dddd", checkboxList);
        const sendData = {
          id: id,
        };

        DeleteStaff.mutate(sendData);
      }
    });
  };
  const handleUserStatus = (id, status) => {
    Swal.fire({
      title: `Are you sure you want ${
        status == true ? "Active" : "Deactive"
      } staff`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // resetTimer()
        // console.log("dddd", checkboxList);
        const sendData = {
          id: id,
          is_active: status,
        };

        UpdateStaff.mutate(sendData);
      }
    });
  };

  const DeleteStaff = useMutation((data) => StaffServices.deleteStaff(data), {
    onSuccess: (data) => {
      // console.log("Data after submission organization", data?.data);
      // alert("Created Successfully")
      Swal.fire({
        title: "Successfull",
        text: "Deleted Successfully ",
        icon: "success",
      });
      queryClient.refetchQueries(["staff-list", pageNumber]);
    },
    onError: (err) => {
      console.log("Error response data:", err.response?.data);

      // Check for specific error messages or provide a generic message
      const msg =
        err.response?.data?.name ||
        "An unexpected error occurred. Please try again.";

      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
      });

      return;
    },
  });
  const UpdateStaff = useMutation((data) => StaffServices.staffUpdate(data), {
    onSuccess: (data) => {
      // console.log("Data after submission organization", data?.data);
      // alert("Created Successfully")
      Swal.fire({
        title: "Successfull",
        text: "Staff Updated Successfully ",
        icon: "success",
      });
      queryClient.refetchQueries(["staff-list", pageNumber]);
    },
    onError: (err) => {
      console.log("Error response data:", err.response?.data);

      // Check for specific error messages or provide a generic message
      const msg =
        err.response?.data?.name ||
        "An unexpected error occurred. Please try again.";

      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
      });

      return;
    },
  });

  const handleNav = (id) => {
    if (id) {
      nav("/staff/form/" + btoa(id));
      return;
    }
    nav("/staff/form");
  };

  useEffect(() => {
    setPageNumber(initialPage);
  }, [initialPage]);
  return (
    <Wrapper>
      <div className="common-db-head all-staff-head mb-3">
        <Row>
          <Col xs="12" lg="6" className="mb-3 mb-lg-0">
            {/* <ul className="common-head-list">
                        <li>
                            <FormGroup className="mb-0 mb-sm-0">
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
                    </ul> */}
          </Col>
          <Col xs="12" lg="6">
            <ul className="common-head-list justify-content-lg-end">
              <li>
                <Input id="" name="" type="select">
                  <option>Select Interest</option>
                  <option>Active</option>
                  <option>Deactive</option>
                  {/* <option>Featured (0)</option>
                                <option>All (374)</option> */}
                </Input>
              </li>
              <IsAccessibleMethod
                method={Object.keys(PermissionSets.staff.StaffList.Create)[0]}
                route={window.location.pathname}
              >
                <li>
                  <Button
                    className="btn btn-style1"
                    onClick={() => handleNav(false)}
                  >
                    Add <FiPlus />
                  </Button>
                </li>
              </IsAccessibleMethod>
            </ul>
          </Col>
        </Row>
      </div>
      {isStaffLoad ? (
        <Loader />
      ) : staffList?.data?.results?.length == 0 ? (
        <NoActiveDataFound msg="No Staff Found" />
      ) : (
        staffList?.data?.results?.map((each) => {
          return (
            <div className="staff-list">
              <div className="staff-head">
                <div className="staff-checkbox">
                  <FormGroup className="mb-0 mb-sm-0">
                    <Input id="select-all" type="checkbox" />
                  </FormGroup>
                </div>
                <div className="staff-head-dtls">
                  <div className="staff-head-info-wrap">
                    <div className="staff-img">
                      <img
                        className="img-fluid"
                        src={
                          (each?.image_url &&
                            config?.apiUrl + each?.image_url) ||
                          staffimg
                        }
                        alt=""
                      />
                    </div>
                    <div className="staff-info">
                      <h4>
                        {each?.user?.first_name || "N/A"}{" "}
                        {each?.user?.last_name || "N/A"}
                      </h4>
                      <p>({each?.code || "N/A"})</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="staff-details-wrap">
                <Row>
                  <Col xs="12" lg="8" xl="9" xxl="9">
                    <Row>
                      <Col xl="6" className="mb-4">
                        <div className="staff-details-list-wrap">
                          <div className="staff-details-list">
                            <div className="name">First Name:</div>
                            <div className="info">
                              {each?.user?.first_name || "N/A"}
                            </div>
                          </div>
                          <div className="staff-details-list">
                            <div className="name">Last Name:</div>
                            <div className="info">
                              {each?.user?.last_name || "N/A"}
                            </div>
                          </div>
                          <div className="staff-details-list">
                            <div className="name">Email:</div>
                            <div className="info">
                              {each?.user?.email || "N/A"}
                            </div>
                          </div>
                          {/* <div className="staff-details-list">
                            <div className="name">Email For Password:</div>
                            <div className="info">test5@example.com</div>
                          </div> */}
                          <div className="staff-details-list">
                            <div className="name">Mobile:</div>
                            <div className="info">
                              {each?.phone_code} {each?.phone || "N/A"}
                            </div>
                          </div>
                          <div className="staff-details-list">
                            <div className="name">Join On:</div>
                            <div className="info">
                              {moment(each?.createdAt).format("lll")}
                            </div>
                          </div>

                          <div className="staff-details-list">
                            <div className="name">Role:</div>
                            <div className="info">
                              {each?.role?.name || ""}({each?.role?.code})
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xl="6" className="mb-4">
                        <div className="staff-details-list-wrap ">
                          <h4>
                            Permission Set :{" "}
                            <span>
                              {each?.permission?.name}({each?.permission?.code})
                            </span>
                          </h4>
                          {each?.permission?.content?.length > 0 &&
                            each?.permission?.content?.map((module) => {
                              console.log(module, "---");
                              return (
                                <div className="staff-details-list right">
                                  <div className="name">
                                    {module?.parent || "N/A"}
                                  </div>
                                  <div className="info">
                                    <div className="staff-subscription-write">
                                      {module?.methods?.length > 0
                                        ? module.methods.map((method) => {
                                            return (
                                              <div className="permission-box">
                                                <p className="child-permission">
                                                  {method?.name}
                                                </p>
                                                <ul>
                                                  {method.method?.map(
                                                    (each, index) => {
                                                      return (
                                                        <li>{`${
                                                          index + 1
                                                        }. ${each} `}</li>
                                                      );
                                                    }
                                                  )}
                                                </ul>
                                              </div>
                                            );
                                          })
                                        : module?.children?.map((child) => (
                                            <div className="staff-subscription-write">
                                              <p className="">
                                                {child?.child}
                                              </p>
                                              {child?.methods?.length > 0 &&
                                                child?.methods?.map(
                                                  (method) => {
                                                    return (
                                                      <div className="permission-box">
                                                        <p className="child-permission">
                                                          {method?.name}
                                                        </p>
                                                        <ul>
                                                          {method.method?.map(
                                                            (each, index) => {
                                                              return (
                                                                <li>{`${
                                                                  index + 1
                                                                }. ${each} `}</li>
                                                              );
                                                            }
                                                          )}
                                                        </ul>
                                                      </div>
                                                    );
                                                  }
                                                )}
                                            </div>
                                          ))}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}

                          {/* <div className="staff-details-list">
                            <div className="name">Credit:</div>
                            <div className="info">100</div>
                          </div>
                          <div className="staff-details-list">
                            <div className="name">Staff Time:</div>
                            <div className="info">1</div>
                          </div>

                          <div className="staff-details-list">
                            <div className="name">Last Logout:</div>
                            <div className="info">August 25, 2021 11:29 AM</div>
                          </div>
                          <div className="staff-details-list">
                            <div className="name">Assign To Manager:</div>
                            <div className="info">N/A</div>
                          </div> */}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="12" lg="4" xl="3" xxl="3">
                    <div className="staff-right-btn">
                      <ul>
                        <IsAccessibleMethod
                          method={
                            Object.keys(
                              PermissionSets.staff.StaffList.Delete
                            )[0]
                          }
                          route={window.location.pathname}
                        >
                          <li>
                            <Button
                              className="btn btn-outline-style1"
                              onClick={() => handleDelete(each?.id)}
                            >
                              <RiDeleteBin6Line /> <span>Delete</span>
                            </Button>
                          </li>
                        </IsAccessibleMethod>
                        <IsAccessibleMethod
                          method={
                            Object.keys(
                              PermissionSets.staff.StaffList.AccountStatus
                            )[0]
                          }
                          route={window.location.pathname}
                        >
                          <li>
                            <Button
                              disabled={UpdateStaff?.isLoading}
                              className={
                                !each?.user?.is_active
                                  ? "btn green-btn"
                                  : "btn btn-outline-style1"
                              }
                              onClick={() =>
                                handleUserStatus(
                                  each?.id,
                                  !each?.user?.is_active
                                )
                              }
                            >
                              {UpdateStaff?.isLoading ? (
                                <ButtonLoader />
                              ) : each?.user?.is_active ? (
                                <>
                                  <CgLogOut /> <span>Deactive</span>
                                </>
                              ) : (
                                <>
                                  <AiOutlineLike /> <span>Active</span>
                                </>
                              )}
                            </Button>
                          </li>
                        </IsAccessibleMethod>
                        <IsAccessibleMethod
                          method={
                            Object.keys(
                              PermissionSets.staff.StaffList.Update
                            )[0]
                          }
                          route={window.location.pathname}
                        >
                          <li>
                            <Button
                              className="btn blue-btn"
                              onClick={() => handleNav(each?.id)}
                            >
                              <LiaEdit /> <span> Edit Staff </span>
                            </Button>
                          </li>
                        </IsAccessibleMethod>

                        <li>
                          <Button className="btn orange-btn">
                            <LuUser /> <span>View Details</span>
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          );
        })
      )}

      {/* <div className="staff-list">
            <div className="staff-head">
                <div className="staff-checkbox">
                    <FormGroup className="mb-0 mb-sm-0">
                        <Input id="select-all" type="checkbox" />
                    </FormGroup>
                </div>
                <div className="staff-head-dtls">
                    <div className="staff-head-info-wrap">
                        <div className="staff-img">
                            <img className="img-fluid" src={staffimg} alt="" />
                        </div>
                        <div className="staff-info">
                            <h4>Praveen Bommannavar</h4>
                            <p>(Manager)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="staff-details-wrap">
                <Row>
                    <Col xs="12" lg="8" xl="9" xxl="9">
                        <Row>
                            <Col xl="6" className="mb-4">
                                <div className="staff-details-list-wrap">
                                    <div className="staff-details-list">
                                        <div className="name">
                                            Email: 
                                        </div>
                                        <div className="info">
                                            test5@example.com
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Email For Password: 
                                        </div>
                                        <div className="info">
                                        test5@example.com
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Mobile: 
                                        </div>
                                        <div className="info">
                                        9999999999
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Mobile For Password:
                                        </div>
                                        <div className="info">
                                        9999999999
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Extension:
                                        </div>
                                        <div className="info">
                                        1
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Is Online:
                                        </div>
                                        <div className="info">
                                        172.68.79.150
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xl="6" className="mb-4">
                                <div className="staff-details-list-wrap">
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Password: 
                                        </div>
                                        <div className="info">
                                        123456
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Credit: 
                                        </div>
                                        <div className="info">
                                        100
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Staff Time: 
                                        </div>
                                        <div className="info">
                                        1
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Join On:
                                        </div>
                                        <div className="info">
                                        May 11, 2021 05:59 AM
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Last Logout:
                                        </div>
                                        <div className="info">
                                        August 25, 2021 11:29 AM
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Assign To Manager: 
                                        </div>
                                        <div className="info">
                                        N/A
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" lg="4" xl="3" xxl="3">
                        <div className="staff-right-btn">
                            <ul>
                                <li>
                                    <Button className="btn green-btn">
                                        <AiOutlineLike /> <span>Approved</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button className="btn blue-btn">
                                        <LiaEdit /> <span> Edit Staff Role</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button className="btn btn-outline-style1">
                                        <CgLogOut /> <span>Forcibly Log Out</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button className="btn orange-btn">
                                        <LuUser /> <span>View Members</span>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

        <div className="staff-list">
            <div className="staff-head">
                <div className="staff-checkbox">
                    <FormGroup className="mb-0 mb-sm-0">
                        <Input id="select-all" type="checkbox" />
                    </FormGroup>
                </div>
                <div className="staff-head-dtls">
                    <div className="staff-head-info-wrap">
                        <div className="staff-img">
                            <img className="img-fluid" src={staffimg} alt="" />
                        </div>
                        <div className="staff-info">
                            <h4>Praveen Bommannavar</h4>
                            <p>(Manager)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="staff-details-wrap">
                <Row>
                    <Col xs="12" lg="8" xl="9" xxl="9">
                        <Row>
                            <Col xl="6" className="mb-4">
                                <div className="staff-details-list-wrap">
                                    <div className="staff-details-list">
                                        <div className="name">
                                            Email: 
                                        </div>
                                        <div className="info">
                                            test5@example.com
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Email For Password: 
                                        </div>
                                        <div className="info">
                                        test5@example.com
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Mobile: 
                                        </div>
                                        <div className="info">
                                        9999999999
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Mobile For Password:
                                        </div>
                                        <div className="info">
                                        9999999999
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Extension:
                                        </div>
                                        <div className="info">
                                        1
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Is Online:
                                        </div>
                                        <div className="info">
                                        172.68.79.150
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xl="6" className="mb-4">
                                <div className="staff-details-list-wrap">
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Password: 
                                        </div>
                                        <div className="info">
                                        123456
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Credit: 
                                        </div>
                                        <div className="info">
                                        100
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Staff Time: 
                                        </div>
                                        <div className="info">
                                        1
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Join On:
                                        </div>
                                        <div className="info">
                                        May 11, 2021 05:59 AM
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Last Logout:
                                        </div>
                                        <div className="info">
                                        August 25, 2021 11:29 AM
                                        </div>
                                    </div>
                                    <div className="staff-details-list">
                                        <div className="name">
                                        Assign To Manager: 
                                        </div>
                                        <div className="info">
                                        N/A
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" lg="4" xl="3" xxl="3">
                        <div className="staff-right-btn">
                            <ul>
                                <li>
                                    <Button className="btn green-btn">
                                        <AiOutlineLike /> <span>Approved</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button className="btn blue-btn">
                                        <LiaEdit /> <span> Edit Staff Role</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button className="btn btn-outline-style1">
                                        <CgLogOut /> <span>Forcibly Log Out</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button className="btn orange-btn">
                                        <LuUser /> <span>View Members</span>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </div> */}

      {!isStaffLoad && staffList?.data?.results?.length > 0 && (
        <Pagination count={staffList?.data?.count} pageSize={initialLimit} />
      )}
    </Wrapper>
  );
};

export default StaffList;
