import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Row, Table } from "reactstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { VscFilter } from "react-icons/vsc";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../../../layouts/Wrapper";
import AddFranchise from "./AddFranchise";
import MemberServices from "../../../../services/MemberServices";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../../utils/Loader/Loader";
import Pagination from "../../../../utils/Pagination";
import { FiPlus } from "react-icons/fi";
import { TbFilterPause } from "react-icons/tb";
import { LiaEdit } from "react-icons/lia";
import Organization from "../../../../assets/images/organization-avatar-img.jpg";
import config from "../../../../../config";
import Swal from "sweetalert2";
import { TiTick } from "react-icons/ti";
import { TbXboxXFilled } from "react-icons/tb";
import { FaAppStoreIos, FaEye } from "react-icons/fa";
import countries from "../../../../utils/CountryList";
import NoImageFound from "../../../../utils/NoImageFound";
import { FcAndroidOs } from "react-icons/fc";
import { SiPostman } from "react-icons/si";

const ViewFranchise = () => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract initial page from query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const queryClient = useQueryClient();

  const [pageNumber, setPageNumber] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");

  const handleNav = () => {
    // setShowForm(true);
    // clearQueryParams();
    navigate("/member/franchise/add");
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
        deleteFranchise.mutate(id);
      }
    });
  };
  const handleStatusChange = (id, active) => {
    Swal.fire({
      title: active
        ? "Are you sure want to Deactive franchise"
        : "Are you sure want to Active franchise",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // resetTimer()
        statusChangeFranchise.mutate({ id, is_active: !active });
      }
    });
  };

  const deleteFranchise = useMutation(
    (formdata) => {
      return MemberServices.deleteFranchise(formdata);
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
        // queryClient.invalidateQueries("subscription-organization");
        queryClient.refetchQueries("member-franchise");
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
  const statusChangeFranchise = useMutation(
    (formdata) => {
      return MemberServices.statusChangeUserFranchise(formdata);
    },
    {
      onSuccess: (data) => {
        // console.log("Data after submission organization", data?.data);
        // alert("Created Successfully")
        Swal.fire({
          title: "Successfull",
          text: "Successfully Updated",
          icon: "success",
        });
        // queryClient.invalidateQueries("subscription-organization");
        queryClient.refetchQueries("member-franchise");
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

  const {
    data: franchiseList,
    isLoading: isLoadedFranchiseList,
    isError,
    error,
    refetch,
  } = useQuery(
    ["member-franchise", pageNumber, countryName, stateName, cityName],
    () => {
      // Dynamically build the query string
      let queryParams = `?page=${pageNumber}`;
      if (countryName) queryParams += `&country=${countryName}`;
      if (stateName) queryParams += `&state=${stateName}`;
      if (cityName) queryParams += `&city=${cityName}`;

      return MemberServices.getFranchiseMemberList(queryParams);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log("Data Franchise ", data?.data);
        const total = Math.ceil(data?.data?.count / 10);
        setTotalPages(total);
        // StorageData.setData(data?.data?.data?.users);
      },
      onError: (err) => {
        console.log(err?.message);
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
    setPageNumber(() => initialPage);
    // queryParams.set("page", pageNumber);
    // navigate({
    //   pathname: location.pathname,
    //   search: queryParams.toString(),
    // });
  }, [initialPage]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleCountryChange = (e) => {
    setCityName("");
    setStateName("");
    setPageNumber(1);
    queryParams.set("page", 1);
    setCountryName(e.target.value);
  };

  const handleStateChange = (e) => {
    setCityName("");
    setPageNumber(1);
    queryParams.set("page", 1);

    setStateName(e.target.value);
  };
  const handleCityName = (e) => {
    setCityName(e.target.value);
    queryParams.set("page", 1);
    setPageNumber(1);
  };
  const stateList = useMemo(() => {
    if (!countryName) return [];
    const tempArr = [...countries];
    const stateOfCountry = countryName
      ? tempArr.find((each) => each.name == countryName)
      : [];
    return stateOfCountry.states;
  }, [countryName]);

  const cityList = useMemo(() => {
    if (!stateName) return [];
    const tempArr = [...stateList];
    const cityOfCountry = stateName
      ? tempArr.find((each) => each?.name == stateName)
      : [];
    return cityOfCountry.cities;
  }, [stateName]);

  const handleResetFilter=()=>{
    setCityName("")
    setStateName("")
    setCountryName("")
    setPageNumber(1);
    queryParams.set("page", 1);

  }
  return (
    <>
      <Wrapper>
        {isLoadedFranchiseList ? (
          <Loader />
        ) : (
          <div className="member-view-wrapper">
            <div className="common-db-head mb-4">
              <Row className="align-items-center">
                {!showForm && (
                  <Col md="6">
                    <FormGroup className="mb-0 mb-sm-0">
                      <Input id="select-all" type="checkbox" />
                      <Label for="select-all">Select All</Label>
                    </FormGroup>
                  </Col>
                )}
                {!showForm && (
                  <Col md="6" className="text-end">
                    <Button
                      className="btn btn-style1 mb-2 ms-2"
                      onClick={handleNav}
                    >
                      Add +
                    </Button>
                    <Button
                        className="btn btn-style1 mb-2 ms-2"
                        onClick={handleResetFilter}
                      >
                     Reset
                      </Button>

                    <li className="select-staff-dropdown">
                      <Input
                        id=""
                        type="select"
                        value={countryName}
                        onChange={handleCountryChange}
                      >
                        <option value={""}>Select Country</option>
                        {countries?.map((each) => {
                          return (
                            <option value={each?.name}>
                              {each?.name || ""}
                            </option>
                          );
                        })}
                      </Input>
                    </li>

                    <li className="select-staff-dropdown">
                      <Input
                        id=""
                        name="state"
                        type="select"
                        value={stateName}
                        onChange={handleStateChange}
                      >
                        <option value={""}>Select State</option>
                        {stateList?.map((each) => {
                          return (
                            <option value={each?.name}>{each?.name}</option>
                          );
                        })}
                      </Input>
                    </li>

                    <li className="select-staff-dropdown">
                      <Input
                        id=""
                        name="city"
                        type="select"
                        value={cityName}
                        onChange={handleCityName}
                      >
                        <option value={""}>Select City</option>
                        {cityList?.map((each) => {
                          return <option value={each}>{each}</option>;
                        })}
                      </Input>
                    </li>
                    {/* <Button className="btn btn-outline-style1 mb-2 ms-2">
                        Filter <VscFilter />
                      </Button> */}
                  </Col>
                )}
              </Row>
            </div>
            {franchiseList?.data?.results?.length == 0 ? (
              <NoImageFound />
            ) : (
              <div className="common-table">
                <Table responsive>
                  <thead>
                    <tr>
                      <th></th>

                      <th>Name</th>
                      <th>Email</th>
                      <th>Apps</th>
                      <th>Phone Number</th>
                      <th>Country</th>
                      <th>State</th>
                      <th>City</th>
                      <th>Address</th>
                      <th>Registration Number</th>
                      <th>Verification Number</th>
                      <th>Subscription</th>

                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                    <tr>
                      <br />
                    </tr>
                  </thead>
                  <tbody>
                    {franchiseList?.data?.results?.map((each) => {
                      return (
                        <tr>
                          <td>
                            <FormGroup className="mb-0 mb-sm-0">
                              <Input id="select-all" type="checkbox" />
                            </FormGroup>
                          </td>
                          <td>
                            <div className="member-avatar online">
                              <img
                                className="img-fluid"
                                src={
                                  (each?.image_url && `${each?.image_url}`) ||
                                  Organization
                                }
                                alt=""
                              />
                            </div>
                            {each?.name || ""}
                          </td>

                          <td>{each?.user?.email || ""}</td>
                          <td>
                            {each?.apps && JSON.parse(each?.apps)?.android && (
                              <FcAndroidOs />
                            )}
                            {each?.apps && JSON.parse(each?.apps)?.ios && (
                              <p>
                                {" "}
                                <FaAppStoreIos />
                              </p>
                            )}
                            {each?.apps && JSON.parse(each?.apps)?.api && (
                              <p>
                                <SiPostman />
                              </p>
                            )}
                          </td>
                          <td>{each?.phone || ""}</td>
                          <td>{each?.country || ""}</td>
                          <td>{each?.state || ""}</td>
                          <td>{each?.city || ""}</td>
                          <td>{each?.address || ""}</td>
                          <td>{each?.verification_num || ""}</td>
                          <td>{each?.registration_num || ""}</td>
                          <td>
                            {each?.subscription?.name || ""} (
                            {each?.subscription?.cost || "0"} ca$)
                          </td>
                          <td>
                            <NavLink
                              to={"/member/franchise/details/" + btoa(each?.id)}
                            >
                              <Button className="dark-blue-btn tb-edit">
                                <FaEye />
                              </Button>
                            </NavLink>
                          </td>
                          <td>
                            <NavLink to={"/member/franchise/" + btoa(each?.id)}>
                              <Button className="dark-blue-btn tb-edit">
                                <LiaEdit />
                              </Button>
                            </NavLink>
                          </td>
                          <td>
                            <Button
                              className="btn-outline-style1 tb-del"
                              onClick={() => handleDelete(each?.id)}
                            >
                              <RiDeleteBin6Line />
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="btn-outline-style1 tb-del"
                              onClick={() =>
                                handleStatusChange(
                                  each?.user?.id,
                                  each?.user?.is_active
                                )
                              }
                            >
                              {each?.user?.is_active ? (
                                <TiTick />
                              ) : (
                                <TbXboxXFilled />
                              )}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                    {/* <tr>
                      <td>
                        <FormGroup className="mb-0 mb-sm-0">
                          <Input id="select-all" type="checkbox" />
                        </FormGroup>
                      </td>
                      <td>
                        <div className="member-avatar online">
                          <img
                            className="img-fluid"
                            src={Organization}
                            alt=""
                          />
                        </div>
                        Praveen Bommannavar
                      </td>
                      <td>praveen@gmail.com</td>
                      <td>+1 12356 24569</td>
                      <td>Canada</td>
                      <td>Gold Plan</td>
                      <td>www.matrimony.com</td>
                      <td>
                        <Button className="dark-blue-btn tb-edit">
                          <LiaEdit />
                        </Button>
                      </td>
                      <td>
                        <Button className="btn-outline-style1 tb-del">
                          <RiDeleteBin6Line />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FormGroup className="mb-0 mb-sm-0">
                          <Input id="select-all" type="checkbox" />
                        </FormGroup>
                      </td>
                      <td>
                        <div className="member-avatar online">
                          <img
                            className="img-fluid"
                            src={Organization}
                            alt=""
                          />
                        </div>
                        Praveen Bommannavar
                      </td>
                      <td>praveen@gmail.com</td>
                      <td>+1 12356 24569</td>
                      <td>Canada</td>
                      <td>Gold Plan</td>
                      <td>www.matrimony.com</td>
                      <td>
                        <Button className="dark-blue-btn tb-edit">
                          <LiaEdit />
                        </Button>
                      </td>
                      <td>
                        <Button className="btn-outline-style1 tb-del">
                          <RiDeleteBin6Line />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FormGroup className="mb-0 mb-sm-0">
                          <Input id="select-all" type="checkbox" />
                        </FormGroup>
                      </td>
                      <td>
                        <div className="member-avatar offline">
                          <img
                            className="img-fluid"
                            src={Organization}
                            alt=""
                          />
                        </div>
                        Praveen Bommannavar
                      </td>
                      <td>praveen@gmail.com</td>
                      <td>+1 12356 24569</td>
                      <td>Canada</td>
                      <td>Gold Plan</td>
                      <td>www.matrimony.com</td>
                      <td>
                        <Button className="dark-blue-btn tb-edit">
                          <LiaEdit />
                        </Button>
                      </td>
                      <td>
                        <Button className="btn-outline-style1 tb-del">
                          <RiDeleteBin6Line />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FormGroup className="mb-0 mb-sm-0">
                          <Input id="select-all" type="checkbox" />
                        </FormGroup>
                      </td>
                      <td>
                        <div className="member-avatar offline">
                          <img
                            className="img-fluid"
                            src={Organization}
                            alt=""
                          />
                        </div>
                        Praveen Bommannavar
                      </td>
                      <td>praveen@gmail.com</td>
                      <td>+1 12356 24569</td>
                      <td>Canada</td>
                      <td>Gold Plan</td>
                      <td>www.matrimony.com</td>
                      <td>
                        <Button className="dark-blue-btn tb-edit">
                          <LiaEdit />
                        </Button>
                      </td>
                      <td>
                        <Button className="btn-outline-style1 tb-del">
                          <RiDeleteBin6Line />
                        </Button>
                      </td>

                    </tr>
                    <tr>
                      <td>
                        <FormGroup className="mb-0 mb-sm-0">
                          <Input id="select-all" type="checkbox" />
                        </FormGroup>
                      </td>
                      <td>
                        <div className="member-avatar online">
                          <img
                            className="img-fluid"
                            src={Organization}
                            alt=""
                          />
                        </div>
                        Praveen Bommannavar
                      </td>
                      <td>praveen@gmail.com</td>
                      <td>+1 12356 24569</td>
                      <td>Canada</td>
                      <td>Gold Plan</td>
                      <td>www.matrimony.com</td>
                      <td>
                        <Button className="dark-blue-btn tb-edit">
                          <LiaEdit />
                        </Button>
                      </td>
                      <td>
                        <Button className="btn-outline-style1 tb-del">
                          <RiDeleteBin6Line />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FormGroup className="mb-0 mb-sm-0">
                          <Input id="select-all" type="checkbox" />
                        </FormGroup>
                      </td>
                      <td>
                        <div className="member-avatar online">
                          <img
                            className="img-fluid"
                            src={Organization}
                            alt=""
                          />
                        </div>
                        Praveen Bommannavar
                      </td>
                      <td>praveen@gmail.com</td>
                      <td>+1 12356 24569</td>
                      <td>Canada</td>
                      <td>Gold Plan</td>
                      <td>www.matrimony.com</td>
                      <td>
                        <Button className="dark-blue-btn tb-edit">
                          <LiaEdit />
                        </Button>
                      </td>
                      <td>
                        <Button className="btn-outline-style1 tb-del">
                          <RiDeleteBin6Line />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FormGroup className="mb-0 mb-sm-0">
                          <Input id="select-all" type="checkbox" />
                        </FormGroup>
                      </td>
                      <td>
                        <div className="member-avatar online">
                          <img
                            className="img-fluid"
                            src={Organization}
                            alt=""
                          />
                        </div>
                        Praveen Bommannavar
                      </td>
                      <td>praveen@gmail.com</td>
                      <td>+1 12356 24569</td>
                      <td>Canada</td>
                      <td>Gold Plan</td>
                      <td>www.matrimony.com</td>
                      <td>
                        <Button className="dark-blue-btn tb-edit">
                          <LiaEdit />
                        </Button>
                      </td>
                      <td>
                        <Button className="btn-outline-style1 tb-del">
                          <RiDeleteBin6Line />
                        </Button>
                      </td>
                    </tr> */}
                  </tbody>
                </Table>
              </div>
            )}
            {/* <div className="pagination-wrap">
                <ul>
                  <li className="prev">
                    <button>Prev</button>
                  </li>
                  <li className="active">
                    <button>1</button>
                  </li>
                  <li>
                    <button>2</button>
                  </li>
                  <li>
                    <button>3</button>
                  </li>
                  <li>...</li>
                  <li>
                    <button>10</button>
                  </li>
                  <li className="next">
                    <button>Next</button>
                  </li>
                </ul>
              </div> */}
            {!isLoadedFranchiseList && (
              <Pagination count={franchiseList?.data?.count} pageSize={10} />
            )}
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default ViewFranchise;
