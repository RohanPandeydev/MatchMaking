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

const TeamList = () => {
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
  const { data: teamList, isLoading: isTeamLoad } = useQuery(
    ["team-list", pageNumber],
    () => StaffServices.teamList(`?page=${pageNumber}&page_size=${limit}`),
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
      title: `Are you sure you want ${status == true ? "Active" : "Deactive"
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
      queryClient.refetchQueries(["team-list", pageNumber]);
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
      queryClient.refetchQueries(["team-list", pageNumber]);
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
      nav("/team/form/" + btoa(id));
      return;
    }
    nav("/team/form");
  };


  useEffect(() => {
    setPageNumber(initialPage)
  }, [initialPage])
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

              <li>
                <IsAccessibleMethod
                  method={Object.keys(PermissionSets.staff.Team.Create)[0]}
                  route={window.location.pathname}

                >
                  <Button
                    className="btn btn-style1"
                    onClick={() => handleNav(false)}
                  >
                    Add <FiPlus />
                  </Button>
                </IsAccessibleMethod>
              </li>

            </ul>
          </Col>
        </Row>
      </div>
      {isTeamLoad ? (
        <Loader />
      ) : teamList?.data?.results?.length == 0 ? (
        <NoActiveDataFound msg="No Team Found" />
      ) : (
        teamList?.data?.results?.map((each) => {

          return (
            <div className="team-list">
              {/* <div className="staff-head">
                
                
              </div> */}
              <div className="staff-head-dtls">
                <div className="staff-checkbox">
                  <FormGroup className="mb-0 mb-sm-0">
                    <Input id="select-all" type="checkbox" />
                  </FormGroup>
                </div>
                <div className="staff-head-info-wrap">

                  <div className="staff-info">
                    <h5>Team:</h5>
                    <h4>
                      {each?.name || "N/A"}{" "}

                    </h4>
                    <p>({each?.code || "N/A"})</p>
                  </div>
                </div>
                <div className="staff-head-info-wrap">

                  <div className="staff-info">
                    <h5>Departement:</h5>
                    <h4>
                      {each?.department?.name || "N/A"}{" "}

                    </h4>
                    <p>({each?.department?.code || "N/A"})</p>
                  </div>
                </div>
                <div className="staff-head-info-wrap">

                  <div className="staff-info">
                    <h5>Team Head</h5>

                    <div>{
                      each?.staffs?.map((staff) => {
                        const staffName = `${staff.user?.first_name} ${staff.user?.last_name}` || "";
                        const staffRole = `${staff.role?.name} ${staff.role?.code}` || "";
                        if (staff?.role?.code == config.staffRoleExecutive) return false
                        return <div>
                          {
                            staffName
                          }({staffRole})
                        </div>
                      })}</div>
                  </div>
                </div>
                <div className="staff-head-info-wrap">

                  <div className="staff-info">
                    <h5>Team Executive</h5>

                    <div>{
                      each?.staffs?.map((staff) => {
                        const staffName = `${staff.user?.first_name} ${staff.user?.last_name}` || "";
                        const staffRole = `${staff.role?.name} ${staff.role?.code}` || "";
                        if (staff?.role?.code == config.staffRoleTeamLeader) return false
                        return <div>
                          {
                            staffName
                          }({staffRole})
                        </div>
                      })}</div>
                  </div>
                </div>
              </div>

            </div>
          );
        })
      )}

      {/* <div className="team-list">
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

        <div className="team-list">
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

      {!isTeamLoad && teamList?.data?.results?.length > 0 && (
        <Pagination count={teamList?.data?.count} pageSize={initialLimit} />
      )}
    </Wrapper>
  );
};

export default TeamList;
