import React, { useEffect, useState } from "react";
import Wrapper from "../../../layouts/Wrapper";
import Swal from "sweetalert2";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import BridenGroomServices from "../../../../services/BridenGroomServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Pagination from "../../../../utils/Pagination";
import parse from "html-react-parser";
import NoActiveDataFound from "../../../../utils/NoActiveDataFound";
import Organization from "../../../../assets/images/organization-avatar-img.jpg";
import { Button, Col, FormGroup, Input, Row, Table } from "reactstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoImagesOutline } from "react-icons/io5";
import compareObjects from "../../../../utils/KeyName";
import PermissionSets from "../../../../guard/Method";
const RequestList = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  // Extract initial page from query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;

  const [pageNumber, setPageNumber] = useState(initialPage);
  const { data, isLoadingData } = useQuery(
    ["requestlist", pageNumber],
    () => {
      return BridenGroomServices.getBridenGroomRequestList(
        `?page=${pageNumber}`
      );
    },
    {
      onSuccess: (data) => {},
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
  const handleChangeStatus = (id, flag) => {
    Swal.fire({
      title:
        flag == 2
          ? "Are you sure you want to approve request"
          : "Are you sure you want to reject request",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      allowOutsideClick: false,
      closeOnClickOutside: false,
    }).then((result) => {
      if (result.isConfirmed) {
        updateRequestLogStatus.mutate({ id: id, action_flag: flag });
      }
    });
  };
  const updateRequestLogStatus = useMutation(
    (formdata) => BridenGroomServices.updateRequestLog(formdata),

    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully ",
          icon: "success",
        });
        queryClient.refetchQueries("requestlist");

        return;
      },
      onError: (err) => {
        console.log(err.response?.data?.username, "dsfhsdf");
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.username[0] || err?.message,
          icon: "error",
        });
        return;
      },
    }
  );

  useEffect(() => {
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
        deleteRequestLog.mutate({ id: id });
      }
    });
  };
  const deleteRequestLog = useMutation(
    (formdata) => {
      return BridenGroomServices.deleteBridenGroomRequestLog(formdata);
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          title: "Successfull",
          text: "Deleted",
          icon: "success",
        });
        // queryClient.invalidateQueries("subscription-organization");
        queryClient.refetchQueries("requestlist");
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
  return (
    <Wrapper>
      <div className="send-requests-wrapper">
        {isLoadingData ? (
          <Loader />
        ) : data?.data?.data?.results?.length == 0 ? (
          <NoActiveDataFound msg={"No edit request found"} />
        ) : (
          data?.data?.results?.map((each) => {
            // each = each?.brideandgroom;
            return (
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
                        <img
                          className="img-fluid"
                          src={
                            each?.tenant?.image_url
                              ? `${each?.tenant?.image_url}`
                              : Organization
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
                          xl="2"
                          xxl="2"
                          className="mb-3 mb-xxl-0"
                        >
                          <div className="profile-name-wrap">
                            <h3> {each?.tenant?.name || ""}</h3>
                            {/* <h5>NMGH245903</h5> */}
                          </div>
                        </Col>

                        <Col
                          md="12"
                          lg="12"
                          xl="10"
                          xxl="10"
                          className="mb-3 mb-xxl-0"
                        >
                          <div className="profile-contact-wrap">
                            <div className="changes-request-by">
                              <div className="request-profile-img">
                                <img
                                  className="img-fluid"
                                  src={
                                    each?.brideandgroom?.photos?.length > 0
                                      ? `${each?.brideandgroom?.photos[0]?.upload_url}`
                                      : Organization
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="request-profile-name">
                                <h5>
                                  {" "}
                                  {each?.brideandgroom?.user?.first_name ||
                                    ""}{" "}
                                  {each?.brideandgroom?.user?.last_name || ""}
                                </h5>
                              </div>
                            </div>
                            <div className="admin-requests-table">
                              <Table responsive>
                                <tbody>
                                  {parse(
                                    compareObjects(
                                      each?.change_message,
                                      each?.brideandgroom
                                    )
                                  )}

                                  {/* <tr>
                                    <td>
                                      <div className="name">Occupation</div>{" "}
                                    </td>
                                    <td>
                                      <div className="change">Teacher</div>
                                    </td>
                                    <td>
                                      <div className="changes">
                                        Civil Engineer
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="name">Birth time</div>{" "}
                                    </td>
                                    <td>
                                      <div className="change">
                                        1999-09-03T07:36:00Z
                                      </div>
                                    </td>
                                    <td>
                                      <div className="changes">13:06</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="name">Occupation</div>{" "}
                                    </td>
                                    <td>
                                      <div className="change">Teacher</div>
                                    </td>
                                    <td>
                                      <div className="changes">
                                        Civil Engineer
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="name">Birth time</div>{" "}
                                    </td>
                                    <td>
                                      <div className="change">
                                        1999-09-03T07:36:00Z
                                      </div>
                                    </td>
                                    <td>
                                      <div className="changes">13:06</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="name">Occupation</div>{" "}
                                    </td>
                                    <td>
                                      <div className="change">Teacher</div>
                                    </td>
                                    <td>
                                      <div className="changes">
                                        Civil Engineer
                                      </div>
                                    </td>
                                  </tr> */}
                                </tbody>
                              </Table>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div className="profile-button-wrap">
                    <ul>
                      {each?.action_flag != 1 ? (
                        <li>
                          <span
                            className={
                              "btn " +
                              (each?.action_flag === 2
                                ? "green-btn active"
                                : "btn-outline-style1 active")
                            }
                          >
                            {each?.action_flag == 2 ? "APPROVED" : "REJECTED"}
                          </span>
                        </li>
                      ) : (
                        <>
                         
                            <li>
                              <Button
                                className="btn green-btn"
                                onClick={() => handleChangeStatus(each?.id, 2)}
                                disabled={updateRequestLogStatus?.isLoading}
                              >
                                {updateRequestLogStatus?.isLoading ? (
                                  <ButtonLoader />
                                ) : (
                                  "APPROVE"
                                )}
                              </Button>
                            </li>
                            <li>
                              <Button
                                disabled={updateRequestLogStatus?.isLoading}
                                onClick={() => handleChangeStatus(each?.id, 3)}
                                className="btn yellow-btn"
                              >
                                {updateRequestLogStatus?.isLoading ? (
                                  <ButtonLoader />
                                ) : (
                                  "REJECT"
                                )}
                              </Button>
                            </li>
                        
                        </>
                      )}
                     
                        <li>
                          <Button
                            className="btn btn-outline-style1"
                            onClick={() => handleDelete(each?.id)}
                          >
                            {" "}
                            <RiDeleteBin6Line />{" "}
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
                        <img className="img-fluid" src={Organization} alt="" />
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
                                xl="4"
                                xxl="3"
                                className="mb-3 mb-xxl-0"
                            >
                                <div className="profile-name-wrap">
                                    <h3>Praveen Bommannavar</h3>
                                    <h5>NMGH245903</h5>
                                
                                </div>
                            </Col>
                        
                            <Col md="12" lg="12" xl="8" xxl="9" className="mb-3 mb-xxl-0">
                                <div className="profile-contact-wrap">
                                    <div className="changes-request-by">
                                        <div className="request-profile-img">
                                         <img className="img-fluid" src={Organization} alt="" />
                                        </div>
                                        <div className="request-profile-name">
                                            <h5>Praveen Bommannavar</h5>
                                        </div>
                                    </div>
                                    <div className="admin-requests-table">
                                        <Table responsive>
                                            <tbody>
                                                <tr>
                                                    <td><div className="name">Birth time</div> </td>
                                                    <td><div className="change">1999-09-03T07:36:00Z</div></td>
                                                    <td><div className="changes">13:06</div></td>
                                                </tr>
                                                <tr>
                                                    <td><div className="name">Occupation</div> </td>
                                                    <td><div className="change">Teacher</div></td>
                                                    <td><div className="changes">Civil Engineer</div></td>
                                                </tr>
                                                
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                                
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="profile-button-wrap">
                <ul>
                    <li>
                        <Button className="btn green-btn">
                            APPROVE
                        </Button>
                    </li>
                    <li>
                        <Button className="btn yellow-btn">
                            REJECT
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
                        <img className="img-fluid" src={Organization} alt="" />
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
                                xl="4"
                                xxl="3"
                                className="mb-3 mb-xxl-0"
                            >
                                <div className="profile-name-wrap">
                                    <h3>Praveen Bommannavar</h3>
                                    <h5>NMGH245903</h5>
                                
                                </div>
                            </Col>
                        
                            <Col md="12" lg="12" xl="8" xxl="9" className="mb-3 mb-xxl-0">
                                <div className="profile-contact-wrap">
                                    <div className="changes-request-by">
                                        <div className="request-profile-img">
                                         <img className="img-fluid" src={Organization} alt="" />
                                        </div>
                                        <div className="request-profile-name">
                                            <h5>Praveen Bommannavar</h5>
                                        </div>
                                    </div>
                                    <div className="admin-requests-table">
                                        <Table responsive>
                                            <tbody>
                                                <tr>
                                                    <td><div className="name">Birth time</div> </td>
                                                    <td><div className="change">1999-09-03T07:36:00Z</div></td>
                                                    <td><div className="changes">13:06</div></td>
                                                </tr>
                                                <tr>
                                                    <td><div className="name">Occupation</div> </td>
                                                    <td><div className="change">Teacher</div></td>
                                                    <td><div className="changes">Civil Engineer</div></td>
                                                </tr>
                                                <tr>
                                                    <td><div className="name">Birth time</div> </td>
                                                    <td><div className="change">1999-09-03T07:36:00Z</div></td>
                                                    <td><div className="changes">13:06</div></td>
                                                </tr>
                                                <tr>
                                                    <td><div className="name">Occupation</div> </td>
                                                    <td><div className="change">Teacher</div></td>
                                                    <td><div className="changes">Civil Engineer</div></td>
                                                </tr>
                                                
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                                
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="profile-button-wrap">
                <ul>
                    <li>
                        <Button className="btn green-btn">
                            APPROVE
                        </Button>
                    </li>
                    <li>
                        <Button className="btn yellow-btn">
                            REJECT
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
        </div>  */}
      </div>
    </Wrapper>
  );
};

export default RequestList;
