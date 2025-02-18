import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "../../../layouts/Wrapper";
import DataTable from "../DataTable";
import countries from "../../../../utils/CountryList";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { FiPlus } from "react-icons/fi";
import getValueBetweenMasterAndAdd from "../../../../utils/UrlParserDropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MasterServices from "../../../../services/MasterServices";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import Swal from "sweetalert2";
import Loader from "../../../../utils/Loader/Loader";
import NoImageFound from "../../../../utils/NoImageFound";
import { IsAccessibleMethod } from "../../../../guard/Rbac";
import PermissionSets from "../../../../guard/Method";
import { Col, FormGroup, Input, Label, Row, Table } from "reactstrap";

import { FaEdit, FaTrash } from "react-icons/fa";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import { RiDeleteBin6Line } from "react-icons/ri";
import Pagination from "../../../../utils/Pagination";
import { BiReset } from "react-icons/bi";
const CityList = () => {
  const url = getValueBetweenMasterAndAdd(window.location.href);
  const nav = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialLimit = useMemo(
    () => parseInt(queryParams.get("limit")) || 20,
    [parseInt(queryParams.get("limit"))]
  );
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit || 20);

  const queryClient = useQueryClient();

  const handleNav = () => {
    nav("/master/city/add");
  };
  const columns = [
    {
      name: "Sl No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.country?.name,
      sortable: true,
    },
    {
      name: "State ",
      selector: (row) => row.state?.name,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          {" "}
          <div className="master-action-btn-wrap">
            <IsAccessibleMethod
              method={Object.keys(PermissionSets.master.Master.Update)[0]}
              route={window.location.pathname}

            >
              <Button
                className="btn green-btn"
                onClick={() => nav("/master/city/add/" + btoa(row?.id))}
              >
                {" "}
                <FaEdit />{" "}
              </Button>
            </IsAccessibleMethod>
            <IsAccessibleMethod
              method={Object.keys(PermissionSets.master.Master.Delete)[0]}
              route={window.location.pathname}

            >
              <Button
                disabled={deleteMutation?.isLoading}
                className="btn btn-outline-style1"
                onClick={
                  () => {
                    handleDelete(row?.id);
                  } // Pass formdata here
                }
              >
                {" "}
                {deleteMutation?.isLoading ? <ButtonLoader /> : <RiDeleteBin6Line />}
              </Button>
            </IsAccessibleMethod>
            <IsAccessibleMethod
              method={Object.keys(PermissionSets.master.Master.Status)[0]}
              route={window.location.pathname}

            >
              <Button
                disabled={updateMutation?.isLoading}
                className="master-switch-btn"
                onClick={
                  () => {
                    handleStatus(!row?.is_disabled, row?.id);
                  } // Pass formdata here
                }
              >
                <FormGroup switch>
                  <Input type="switch" checked={!row?.is_disabled} />
                </FormGroup>
              </Button>
            </IsAccessibleMethod>
          </div>
        </>
      ),
    },
  ];



  const [search, setSearch] = useState("")
  const [countrySearch, setCountrySearch] = useState("")
  const [stateSearch, setStateSearch] = useState("")

  const handleSearch = (e) => {
    setPageNumber(1);
    queryParams.set("page", 1);
    setSearch(e?.target?.value)

  }
  const handleSearchCountry = (e) => {
    setStateSearch("")
    setPageNumber(1);
    queryParams.set("page", 1);
    setCountrySearch(e?.target?.value)

  }
  const handleSearchState = (e) => {
    setPageNumber(1);
    queryParams.set("page", 1);
    setStateSearch(e?.target?.value)

  }
  const { data, isLoading } = useQuery(
    ["all-city-list", countrySearch, stateSearch, search, pageNumber],
    () => {
      let queryParams = [];

      // Dynamically build query parameters
      if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
      if (countrySearch) queryParams.push(`country__name=${encodeURIComponent(countrySearch)}`);
      if (stateSearch) queryParams.push(`state__name=${encodeURIComponent(stateSearch)}`);
      if (pageNumber) queryParams.push(`page=${pageNumber}`);
      if (limit) queryParams.push(`page_size=${limit}`);

      // Join query parameters with '&'
      const queryString = queryParams.length ? `?${queryParams.join('&')}` : "";
      console.log(queryString, "queryString")
      return MasterServices.getCityList(queryString)
    },
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.data;
        // console.log("Languages API Data", data?.data); // Debugging log
      },
      onError: (err) => {
        console.error("Error fetching languages", err?.message); // Debugging log
        if (err?.response?.status === 401) {
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
  const deleteMutation = useMutation(
    (formdata) => MasterServices.getDeleteCity(formdata),
    {
      onSuccess: () => {
        Swal.fire({
          title: "Successful",
          text: "Deleted",
          icon: "success",
        });

        queryClient.refetchQueries("all-city-list");
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
      },
    }
  );
  const updateMutation = useMutation(
    (formdata) => MasterServices.getUpdateCity(formdata),
    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully ",
          icon: "success",
        });

        queryClient.refetchQueries("all-city-list");
        return;
      },
      onError: (err) => {
        console.log(err.response?.data?.username, "dsfhsdf");
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.iso3[0] || err?.message,
          icon: "error",
        });
        return;
      },
    }
  );
  const handleStatus = (status, id) => {
    Swal.fire({
      title: status
        ? `Are you sure you want to disable  data?`
        : `Are you sure you want to enable  data?`,
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

        updateMutation.mutate({ is_disabled: status, id: id });
      }
    });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete data?",
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

        deleteMutation.mutate({ id: id });
      }
    });
  };

  const { data: countryList, isLoading: isCountryLoad } = useQuery(
    ["all-country-list-dropdown-member-org-master"],
    () => MasterServices.getCountryList(),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.data;
        // console.log("Languages API Data", data?.data); // Debugging log
      },
      onError: (err) => {
        console.error("Error fetching languages", err?.message); // Debugging log
        if (err?.response?.status === 401) {
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
  const { data: stateListDropdown, isLoading: isLoadState } = useQuery(
    ["all-state-list-member-org-master", countrySearch],
    () =>
      MasterServices.getStateListByCountryWithFilter(
        `?country__name=${countrySearch}`
      ),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.data;
        // console.log("Languages API Data", data?.data); // Debugging log
      },
      onError: (err) => {
        console.error("Error fetching languages", err?.message); // Debugging log
        if (err?.response?.status === 401) {
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

  const handleReset = () => {
    setPageNumber(1);
    queryParams.set("page", 1);
    setSearch("")
    setStateSearch("")
    setCountrySearch("")
  }



  useEffect(() => {
    setPageNumber(initialPage)
  }, [initialPage])
  return (
    <Wrapper>
      <div className="common-db-head mb-4">
        <div className="align-items-center row">
          <div className="d-inline-flex col-md-7 col-lg-6 gap-2">
            <ul className="master-head-wrap align-items-center">
              <li>
                <div className="master-head-search-wrap">
                  <div className="master-search-wrap">
                    <Input name="search" placeholder="Search..." type="search" onChange={handleSearch} value={search} />
                  </div>
                </div>
              </li>
              <li>
                <div className="select-country-state-wrap">
                  <FormGroup className="common-formgroup">
                    <Input
                      id=""
                      type="select"
                      value={countrySearch}
                      onChange={handleSearchCountry}
                      disabled={isCountryLoad}
                    >
                      <option value={""}>Select Country</option>
                      {isCountryLoad ? (
                        <ButtonLoader />
                      ) : (
                        countryList?.length > 0 &&
                        countryList.map((country) => (
                          <option
                            key={country?.name}
                            value={country?.name || ""}
                          >
                            {country?.name || ""}
                          </option>
                        ))
                      )}
                    </Input>
                  </FormGroup>
                </div>
              </li>
              <li>
                <div className="select-country-state-wrap">
                  <FormGroup className="common-formgroup">
                    <Input
                      id=""
                      name="state"
                      type="select"
                      value={stateSearch}
                      onChange={handleSearchState}
                      disabled={!!!countrySearch || isLoadState}
                    >
                      <option value={""}>Select State</option>
                      {isLoadState ? (
                        <ButtonLoader />
                      ) : (
                        stateListDropdown?.length > 0 &&
                        stateListDropdown?.map((each) => {
                          return (
                            <option value={each?.name}>
                              {each?.name || ""}
                            </option>
                          );
                        })
                      )}
                    </Input>
                  </FormGroup>
                </div>
              </li>
              <li>
                <Button className="btn btn-style1" onClick={handleReset}>
                  {" "}
                  <BiReset />
                </Button>
              </li>
            </ul>


          </div>             <IsAccessibleMethod
            method={Object.keys(PermissionSets.master.Master.Create)[0]}
            route={window.location.pathname}

          >
            <div className="text-end col-md-6">
              <Button className="btn btn-style1" onClick={handleNav}>
                {" "}
                Add <FiPlus />
              </Button>
            </div>
          </IsAccessibleMethod>

        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : data?.length == 0 ? (
        <NoImageFound />
      ) : (
        <DataTable
          columns={columns}
          data={data?.results}
          pageSize={limit}
          count={data?.count}
        />
      )}
      {!isLoading && data?.results?.length > 0 && (
        <Pagination count={data?.count} pageSize={limit} />
      )}
    </Wrapper>
  );
};

export default CityList;
