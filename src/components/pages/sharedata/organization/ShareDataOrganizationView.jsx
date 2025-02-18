import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "../../../layouts/Wrapper";
import { Button, Col, FormGroup, Input, Row, Table } from "reactstrap";
import { LuPackageCheck, LuSearch } from "react-icons/lu";
import ShowMembershipImg from "../../../../assets/images/show-membership-img.png";
import Organization from "../../../../assets/images/organization-avatar-img.jpg";
import profileUser from "../../../../assets/images/no-images-available.jpg";
import { VscFilter } from "react-icons/vsc";
import { HiOutlineShare } from "react-icons/hi";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import Select from "react-select";
import { useMutation, useQuery } from "@tanstack/react-query";
import BridenGroomServices from "../../../../services/BridenGroomServices";
import { useLocation, useNavigate } from "react-router-dom";
import ShareDataServices from "../../../../services/ShareDataServices";
import Swal from "sweetalert2";
import Loader from "../../../../utils/Loader/Loader";
import NoImageFound from "../../../../utils/NoImageFound";
import PaymentMethodImg from "../../../../assets/images/stripe-img.png";

import config from "../../../../../config";
import SubscriptionServices from "../../../../services/SubscriptionServices";
import { values } from "lodash";
import Pagination from "../../../../utils/Pagination";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import { IoMdCheckmark, IoMdShareAlt } from "react-icons/io";
import { SlGlobe } from "react-icons/sl";
import { GiQueenCrown } from "react-icons/gi";
import { TbDatabase } from "react-icons/tb";
import { MdCreditCard } from "react-icons/md";
import paymentplaceholder from "../../../../assets/images/paymentplaceholder.png";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import PermissionSets from "../../../../guard/Method";
import { IsAccessibleMethod, IsAccessibleMethodBMS } from "../../../../guard/Rbac";
import customContext from "../../../../contexts/Context";

const ShareDataOrganizationView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract initial page from query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const [orgData, setOrgData] = useState("");
  const [err, setErr] = useState({});

  const [pageNumber, setPageNumber] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const initialLimit = useMemo(
    () => parseInt(queryParams.get("limit")) || 10,
    [parseInt(queryParams.get("limit"))]
  );
  const [limit, setLimit] = useState(initialLimit || 10);
  const { loggedInStaffId } = customContext()

  const {
    data: organizationList,
    isLoading: isLoadedOrganizationList,
    isError,
    error,
    refetch,
  } = useQuery(
    ["share-data-organization"],

    () => {
      let queryParams = ""
      queryParams += loggedInStaffId ? 'staff=' + loggedInStaffId : ''
     return ShareDataServices.getOrganizationList(queryParams)
    },
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        // console.log("DataOrganization", data?.data);
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

  const { data, isLoading: isLoadingData } = useQuery(
    [
      "bridengroomdata-listing-share-data",
      pageNumber,
      orgData?.value ? orgData?.value : "",
      limit,
    ],
    () =>
      ShareDataServices.getShareDataGroomList(
        `?page=${pageNumber}&page_size=${limit}&is_approve=${1}${orgData?.value ? "&tenant=" + orgData.value : ""
        }`
      ),
    {
      onSuccess: (data) => {
        const total = Math.ceil(data?.data?.count / 10);
        setTotalPages(total);
      },
      onError: (err) => {
        console.log(err.message);
        if (err?.response?.status === 401) {
          ValidateAuthenticationKey(
            err?.response?.status,
            "Your login session has expired. Please log in again."
          );
        } else {
          return false;
        }
      },
    }
  );

  const [checkboxList, setCheckBoxList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleOrgChange = (e) => {
    setOrgData(e);
  };

  const handleCheckedUser = (e, id) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // Add to checkedUsers array if checked
      setCheckBoxList((prev) => [
        ...prev,
        { tenant: orgData?.value, brideandgroom: id },
      ]);
    } else {
      // Remove from checkedUsers array if unchecked
      setCheckBoxList((prev) =>
        prev.filter((user) => user.brideandgroom !== id)
      );
    }
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      const allCheckedUsers = data?.data?.results
        ?.filter((ele) => ele?.share_count == 0)
        .map((each) => ({
          tenant: orgData?.value,
          brideandgroom: each.id,
        }));
      setCheckBoxList(allCheckedUsers);
    } else {
      setCheckBoxList([]);
    }
  };

  const handleUpdate = () => {
    console.log(orgData);
    if (!orgData || orgData?.value == "") {
      setErr({ ...err, org: "Please select Organization First" });
      return;
    }
    if (checkboxList?.length == 0) {
      return;
    }
    setErr({});
    // console.log("checkboxList",checkboxList)
    let sendData = checkboxList?.map((each) => {
      return {
        tenant: orgData?.value,
        brideandgroom: each?.brideandgroom,
      };
    });
   
    // console.log(sendData)
    mutation.mutate(sendData);
    // console.log(checkboxList, orgData);
  };

  const mutation = useMutation(
    (formdata) => ShareDataServices.ShareDataCreate(formdata),

    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Data shared successfully ",
          icon: "success",
        });
        setCheckBoxList([]);
        setOrgData({
          value: "",
          label: "Please select Organization",
          data: {},
          balance: "",
        });
        setSelectAll(false);

        // alert("Logged In Successfully");

        return;
      },
      onError: (err) => {
        let msg = err?.message;
        if (err?.response?.data?.errors) {
          msg = "Insufficient Balance";
        } else if (err.response?.data?.length > 0) {
          msg = "This combination already exist";
        }
        Swal.fire({
          title: "Error",
          text: msg,
          icon: "error",
        });
        return;
      },
    }
  );
  
  useEffect(() => {
    // console.log("Page Number",initialPage)
    setPageNumber(() => initialPage);
  }, [initialPage]);
  const handleLimit = (e) => {
    let value = e?.target?.value || 10;
    console.log(value);
    // Update the 'limit' query parameter in the URL
    queryParams.set("limit", value);
    setPageNumber(1);
    queryParams.set("page", 1);

    // Set the limit state
    setLimit(value);

    // Navigate to the updated URL with the new 'limit' query parameter
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };
  const ShareData = PermissionSets.sharedata.ShareData
  const keys = Object.keys(ShareData);
  const shareKeys = Object.keys(ShareData.Share);

  return (
    <Wrapper>
      <div className="sharedata-view-wrapper">
        <div className="data-search-wrap mb-4">
          <div className="name">
            <h4>Organization Name</h4>
          </div>
          <div className="search-wrap">
            <div className="search-input">
              {/* <Input name="search" placeholder="Search..." type="search" /> */}
              {!isLoadedOrganizationList && (
                <Select
                  value={orgData}
                  onChange={handleOrgChange}
                  options={[
                    {
                      value: "",
                      label: "Please select Organization",
                      data: "",
                    },
                    ...organizationList?.map((each) => {
                      return {
                        value: each?.id,
                        label: `${each?.name} (${each?.host})`,
                        data: each?.subscription,
                        balance: each?.balance,
                      };
                    }),
                  ]}
                  placeholder="Select Organization"
                  name="organizationdropdown"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  style={{ width: "100% !important" }}
                />
              )}
              {err?.org && <p className="text-danger">{err?.org}</p>}
            </div>
            {/* <div className="search-btn">
                    <Button className="btn-style1"> <LuSearch /> </Button>
                </div> */}
          </div>
        </div>
        <Row>
          {orgData?.data && Object.keys(orgData?.data).length > 0 && (
            <Col xl="8" className="offset-xl-2 mb-4">
              <div className="show-membership-name">
                <img src={ShowMembershipImg} alt="" />
                <span>
                  {orgData?.data &&
                    Object.keys(orgData?.data).length > 0 &&
                    "This Organization " +
                    (orgData?.data?.name || "") +
                    " Membership"}
                </span>
              </div>
            </Col>
          )}
        </Row>
        {orgData?.data && Object.keys(orgData?.data || {})?.length > 0 && (
          <Row className="mb-5">
            <Col xs="12" md="6" lg="4" xxl="3" className="mb-3">
              <div className="choose-membership-list">
                <div className="icon">
                  <GiQueenCrown />
                </div>
                <div className="membership-info">
                  <h4>Membership Name</h4>
                  <h3>{orgData?.data?.name || ""}</h3>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6" lg="4" xxl="3" className="mb-3">
              <div className="choose-membership-list">
                <div className="icon">
                  <TbDatabase />
                </div>
                <div className="membership-info">
                  <h4>Price </h4>
                  <h3> Ca$ {orgData?.data?.cost || 0}</h3>
                </div>
              </div>
            </Col>

            <Col xs="12" md="6" lg="4" xxl="3" className="mb-3">
              <div className="choose-membership-list">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    strokeWidth="0"
                    stroke="currentColor"
                    fill="currentColor"
                    width="1em"
                    height="1em"
                    viewBox="0 0 88.552 66.807"
                  >
                    <g
                      id="Group_14676"
                      data-name="Group 14676"
                      transform="translate(-5.724 -16.594)"
                    >
                      <path
                        id="Path_13812"
                        data-name="Path 13812"
                        d="M90.844,51.57l-31.1-8.484a4.712,4.712,0,0,0-5.754,5.754L62.47,79.945a4.686,4.686,0,0,0,8.184,1.7l4.238-5.3a1.536,1.536,0,0,1,1.133-.582,1.516,1.516,0,0,1,1.191.457l3.012,3.012a4.8,4.8,0,0,0,6.629,0l3.273-3.273a4.692,4.692,0,0,0,0-6.629l-3.012-3.012a1.567,1.567,0,0,1,.129-2.324l5.3-4.238a4.719,4.719,0,0,0-1.7-8.184Zm-.258,5.746-5.293,4.238a4.7,4.7,0,0,0-1.754,3.4c-.332,2.77,2.77,4.816,4.379,6.59a1.565,1.565,0,0,1,0,2.211l-3.273,3.273a1.6,1.6,0,0,1-2.211,0l-3.016-3.012a4.72,4.72,0,0,0-6.977.387L68.2,79.7a1.571,1.571,0,0,1-2.727-.566l-8.484-31.1a1.537,1.537,0,0,1,.4-1.516,1.612,1.612,0,0,1,1.516-.4l31.1,8.484a1.57,1.57,0,0,1,.566,2.727Z"
                      />
                      <path
                        id="Path_13813"
                        data-name="Path 13813"
                        d="M66.855,32.188l-1.531,6.059a1.563,1.563,0,0,0,3.031.766l1.531-6.059A1.563,1.563,0,0,0,66.855,32.188Z"
                      />
                      <path
                        id="Path_13814"
                        data-name="Path 13814"
                        d="M56.75,30.715a1.559,1.559,0,0,0-1.074,1.93l1.707,6.012a1.561,1.561,0,1,0,3-.852L58.68,31.793a1.565,1.565,0,0,0-1.93-1.078Z"
                      />
                      <path
                        id="Path_13815"
                        data-name="Path 13815"
                        d="M77.266,36.484,72.91,40.968a1.564,1.564,0,0,0,2.242,2.18l4.355-4.484a1.562,1.562,0,0,0-2.242-2.176Z"
                      />
                      <path
                        id="Path_13816"
                        data-name="Path 13816"
                        d="M27.426,60.344c.262-.062,26.129.043,26.031,0a1.563,1.563,0,0,0,0-3.125H27.426c-24.777-1.023-24.8-36.469,0-37.5H71.3c13.793-.242,23.164,15.367,16.551,27.461a1.563,1.563,0,0,0,.656,2.109c3.223,1.656,4.742-8.727,4.6-10.82A21.868,21.868,0,0,0,71.3,16.594H27.423c-28.922,1.2-28.941,42.547,0,43.75Z"
                      />
                      <path
                        id="Path_13817"
                        data-name="Path 13817"
                        d="M18.57,41.137l4.688,4.688a1.565,1.565,0,0,0,2.211,0L36.406,34.887A1.564,1.564,0,0,0,34.2,32.676l-9.832,9.832-3.582-3.582a1.564,1.564,0,0,0-2.211,2.211Z"
                      />
                      <path
                        id="Path_13818"
                        data-name="Path 13818"
                        d="M11.863,38.469A15.643,15.643,0,0,0,27.488,54.094c20.73-.859,20.723-30.4,0-31.25A15.643,15.643,0,0,0,11.863,38.469Zm28.125,0a12.517,12.517,0,0,1-12.5,12.5c-16.582-.687-16.578-24.316,0-25A12.517,12.517,0,0,1,39.988,38.469Z"
                      />
                    </g>
                  </svg>
                </div>
                <div className="membership-info">
                  <h4>No. Of Subscription </h4>
                  <h3>{orgData?.data?.no_of_subscription || 0}/0</h3>
                </div>
              </div>
            </Col>
            {/* Pending dynamic value */}
            {/* <Col xs="12" md="6" lg="4" xxl="3" className="mb-3">
              <div className="choose-membership-list">
                <div className="icon">
                  <LuPackageCheck />
                </div>
                <div className="membership-info">
                  <h4>No. Of Subscription used </h4>
                  <h3>0</h3>
                </div>
              </div>
            </Col> */}
            <Col xs="12" md="6" lg="4" xxl="3" className="mb-3">
              <div className="choose-membership-list">
                <div className="icon">
                  <MdCreditCard />
                </div>
                <div className="membership-info">
                  <h4>Payment Method </h4>
                  {/* <h3><img className="pay-method-img" src={PaymentMethodImg} alt="" /><img className="pay-method-img" src={PaymentMethodImg} alt="" /></h3> */}
                  {(orgData?.data?.payment_gateway?.length &&
                    orgData?.data?.payment_gateway?.map((elem) => {
                      return (
                        <img
                          src={
                            (elem?.logo_img &&
                              `${config.apiUrl}${elem?.logo_img}`) ||
                            paymentplaceholder
                          }
                          className="pay-method-img"
                        />
                      );
                    })) ||
                    ""}
                </div>
              </div>
            </Col>
            <Col xs="12" md="6" lg="4" xxl="3" className="mb-3">
              <div className="choose-membership-list">
                <div className="icon">
                  <SlGlobe />
                </div>
                <div className="membership-info">
                  <h4>Domain Setup </h4>
                  <h3>
                    {" "}
                    {orgData?.data?.domain_setup ? (
                      <IoMdCheckmark />
                    ) : (
                      <IoClose />
                    )}
                  </h3>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6" lg="4" xxl="3" className="mb-3">
              <div className="choose-membership-list">
                <div className="icon">
                  <TbDatabase />
                </div>
                <div className="membership-info">
                  <h4>Remaining Balance </h4>
                  <h3> Ca$ {orgData?.balance || 0}</h3>
                </div>
              </div>
            </Col>
          </Row>
        )}
        <div className="common-db-head mb-4">
          <Row className="align-items-center">
            <Col md="6" className="d-inline-flex">
              <Button className="btn orange-btn mb-2 me-2">
                <span>Filter</span> <VscFilter />
              </Button>
              {/* <Button className="btn green-btn mb-2 me-2">
                <span>Share</span> <HiOutlineShare />
              </Button> */}
              <Input
                className=""
                id=""
                name="selectMulti"
                value={limit}
                onChange={(e) => handleLimit(e)}
                type="select"
              >
                <option value={10}>10</option>
                <option value={15}> 15</option>
                <option value={20}> 20</option>
                <option value={25}> 25</option>
                <option value={30}> 30</option>
                <option value={100}> 100</option>
              </Input>
            </Col>
            <Col md="6" className="text-end">
              <IsAccessibleMethodBMS
                method={shareKeys.find(key => key === "allData")}
                route={window.location.pathname}
                name={keys.find(key => key === "Share")}

              >
                <Button
                  className="btn green-btn mb-2 me-2"
                  type="click"
                  onClick={handleUpdate}
                  disabled={checkboxList?.length > 0 ? false : true}
                >
                  <span>Share</span> <HiOutlineShare />
                </Button>
              </IsAccessibleMethodBMS>
            </Col>
          </Row>
        </div>

        {isLoadingData ? (
          <Loader />
        ) : data?.data?.results?.length == 0 ? (
          <NoImageFound />
        ) : (
          <div className="common-table">
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <FormGroup className="mb-0 mb-sm-0">
                      <Input
                        checked={selectAll}
                        onChange={handleSelectAll}
                        id="select-all"
                        type="checkbox"
                      />
                    </FormGroup>
                  </th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Occupation</th>
                  {/* <th>Education</th> */}
                  {/* <th>Subscription</th>
                  <th>Domain Name</th> */}
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <br />
                </tr>
              </thead>
              <tbody>
                {data?.data?.results?.map((each, index) => {
                  const isChecked = checkboxList.some(
                    (user) => user.brideandgroom === each.id
                  );

                  return (
                    <tr>
                      {each?.share_count == 0 && orgData?.value ? (
                        <td>
                          <FormGroup className="mb-0 mb-sm-0">
                            <Input
                              id="select-all"
                              type="checkbox"
                              checked={isChecked}
                              onClick={(e) => handleCheckedUser(e, each?.id)}
                            />
                          </FormGroup>
                        </td>
                      ) : (
                        <td></td>
                      )}
                      <td>
                        <div className="member-avatar online">
                          <img
                            className="img-fluid"
                            src={
                              each?.photos?.length > 0
                                ? `${config.apiUrl}${each?.photos[0]?.upload_url}`
                                : profileUser
                            }
                            alt=""
                          />
                        </div>
                        {each?.user?.first_name || ""}{" "}
                        {each?.user?.last_name || ""}
                        {each?.is_premium && (
                          <span
                            className="premium-tag"
                            style={{ color: "#ea8c21", fontSize: "16px" }}
                          >
                            {" "}
                            <GiQueenCrown />
                          </span>
                        )}
                      </td>
                      <td>{(each?.amount && "C$ " + each?.amount) || ""}</td>
                      <td>{each?.user?.email || ""}</td>
                      <td>
                        {each?.phone_code} {each?.phone}
                      </td>
                      <td>
                        {each?.country || ""} ,{each?.state || ""},{" "}
                        {each?.city || ""}
                      </td>
                      <td>{each?.occupation || ""}</td>
                      {/* <td>{each?.education || ""}</td> */}
                      {each?.share_count == 0 && orgData?.value ? (
                        <td>
                          <IsAccessibleMethodBMS
                            method={shareKeys.find(key => key === "allData")}
                            route={window.location.pathname}
                            name={keys.find(key => key === "Share")}

                          >
                            <Button
                              className="dark-blue-btn tb-edit"
                              onClick={() => {
                               
                               return mutation.mutate([
                                  {
                                    tenant: orgData?.value,
                                    brideandgroom: each?.id,
                                  },
                                ])
                              }
                              }
                            >
                              <IoMdShareAlt />
                            </Button>
                          </IsAccessibleMethodBMS>
                        </td>
                      ) : (
                        <td></td>
                      )}
                      {/* <td>
                        <Button className="btn-outline-style1 tb-del">
                          <RiDeleteBin6Line />
                        </Button>
                      </td> */}
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
                      <img className="img-fluid" src={Organization} alt="" />
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
                {/* <tr>
                  <td>
                    <FormGroup className="mb-0 mb-sm-0">
                      <Input id="select-all" type="checkbox" />
                    </FormGroup>
                  </td>
                  <td>
                    <div className="member-avatar offline">
                      <img className="img-fluid" src={Organization} alt="" />
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
                      <img className="img-fluid" src={Organization} alt="" />
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
                      <img className="img-fluid" src={Organization} alt="" />
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
                      <img className="img-fluid" src={Organization} alt="" />
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
                      <img className="img-fluid" src={Organization} alt="" />
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
        {!isLoadingData && (
          <Pagination count={data?.data?.count} pageSize={limit} />
        )}
      </div>
    </Wrapper>
  );
};

export default ShareDataOrganizationView;
