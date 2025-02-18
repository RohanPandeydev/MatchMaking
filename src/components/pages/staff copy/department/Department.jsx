import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "../../../layouts/Wrapper";
import { Button, Col, FormGroup, Input, Label, Row, Table } from "reactstrap";
import { VscFilter } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import Organization from "../../../../assets/images/organization-avatar-img.jpg";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import Pagination from "../../../../utils/Pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import StaffServices from "../../../../services/StaffServices";
import Loader from "../../../../utils/Loader/Loader";
import NoActiveDataFound from "../../../../utils/NoActiveDataFound";
import Swal from "sweetalert2";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import { IsAccessibleMethod } from "../../../../guard/Rbac";
import PermissionSets from "../../../../guard/Method";

const Department = () => {
  const location = useLocation();
  const nav = useNavigate();
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
  const { data: departmentList, isLoading: isDepartmentLoad } = useQuery(
    ["department-list", pageNumber],
    () =>
      StaffServices.departmentsList(`?page=${pageNumber}&page_size=${limit}`),
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

        DeleteDepartment.mutate(sendData);
      }
    });
  };
  const DeleteDepartment = useMutation(
    (data) => StaffServices.deleteDepartment(data),
    {
      onSuccess: (data) => {
        // console.log("Data after submission organization", data?.data);
        // alert("Created Successfully")
        Swal.fire({
          title: "Successfull",
          text: "Deleted Successfully ",
          icon: "success",
        });
        queryClient.refetchQueries("department-list");
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
    }
  );

  const handleNav = (id) => {
    console.log(id);

    if (id) {
      nav("/department/form/" + btoa(id));
      return;
    }

    nav("/department/form");
  };

  useEffect(() => {
    // console.log("Page Number",initialPage)
    setPageNumber(() => initialPage);
  }, [initialPage]);
  return (
    <Wrapper>
      <div className="member-view-wrapper">
        <div className="common-db-head mb-4">
          <Row className="align-items-center">
            <Col md="6">
              {/* <FormGroup className="mb-0 mb-sm-0">
                            <Input id="select-all" type="checkbox" />
                            <Label for="select-all">Select All</Label>
                        </FormGroup> */}
            </Col>
            <IsAccessibleMethod
              methodName={PermissionSets?.staff?.Department?.Create}
              pathname={window.location.pathname}
            >
              <Col md="6" className="text-end">
                <Button
                  className="btn btn-style1 mb-2 ms-2"
                  onClick={() => handleNav(false)}
                >
                  Add +
                </Button>
                {/* <Button className="btn btn-outline-style1 mb-2 ms-2">
                        Filter <VscFilter />
                        </Button> */}
              </Col>
            </IsAccessibleMethod>
          </Row>
        </div>
        {isDepartmentLoad ? (
          <Loader />
        ) : (
          <div className="common-table department-table">
            {departmentList?.data?.results?.length == 0 ? (
              <NoActiveDataFound msg="No Data Found" />
            ) : (
              <Table responsive>
                <thead>
                  <tr>
                    <th></th>
                    <th>Code</th>
                    <th>Department Name</th>
                    <th>Department Permission</th>
                    <th></th>
                    <th></th>
                  </tr>
                  <tr>
                    <br />
                  </tr>
                </thead>
                <tbody>
                  {departmentList?.data?.results?.map((each) => {
                    return (
                      <tr>
                        <td>
                          {/* <FormGroup className="mb-0 mb-sm-0">
                                        <Input id="select-all" type="checkbox" />
                                    </FormGroup> */}
                        </td>
                        <td>{each?.code}</td>
                        <td>{each?.name}</td>
                        <td>
                          {each?.permissions?.map((ele) => {
                            return (
                              <p className="department-permission-listing">
                                <strong>{ele?.parent}</strong><br/>
                                {ele?.children?.map((ele) => (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;&nbsp; {ele?.name} - {" "}
                                      {ele?.methods?.map((ele) => (
                                        <span className="child-permission">{ele?.label}</span>
                                      ))}
                                    </span>
                                    <br />
                                  </>
                                ))}
                              </p>
                            );
                          })}
                        </td>
                        <IsAccessibleMethod
                          methodName={PermissionSets?.staff?.Department?.Update}
                          pathname={window.location.pathname}
                        >
                          <td>
                            <Button
                              className="dark-blue-btn tb-edit"
                              onClick={() => handleNav(each?.id)}
                            >
                              <LiaEdit />
                            </Button>
                          </td>
                        </IsAccessibleMethod>
                        <IsAccessibleMethod
                          methodName={PermissionSets?.staff?.Department?.Delete}
                          pathname={window.location.pathname}
                        >
                          <td>
                            <Button
                              className="btn-outline-style1 tb-del"
                              onClick={() => handleDelete(each?.id)}
                            >
                              {DeleteDepartment?.isLoading ? (
                                <ButtonLoader />
                              ) : (
                                <RiDeleteBin6Line />
                              )}
                            </Button>
                          </td>
                        </IsAccessibleMethod>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </div>
        )}
        {!isDepartmentLoad && departmentList?.data?.results?.length > 0 && (
          <Pagination
            count={departmentList?.data?.count}
            pageSize={initialLimit}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default Department;
