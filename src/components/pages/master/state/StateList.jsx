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
import { FaEdit, FaTrash } from "react-icons/fa";

import { Col, FormGroup, Input, Label, Row, Table } from "reactstrap";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import { RiDeleteBin6Line } from "react-icons/ri";
import Pagination from "../../../../utils/Pagination";
import { BiReset } from "react-icons/bi";

const StateList = () => {
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
    nav("/master/state/add");
  };
  const columns = [
    {
      name: "Sl No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.country?.name,
      sortable: true,
    },
    {
      name: "State ",
      selector: (row) => row.name,
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
                onClick={() => nav("/master/state/add/" + btoa(row?.id))}
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
  const updateMutation = useMutation(
    (formdata) => MasterServices.getUpdateState(formdata),
    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully ",
          icon: "success",
        });

        queryClient.refetchQueries("all-state-list");
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


  const [search, setSearch] = useState("")
  const [countrySearch, setCountrySearch] = useState("")
  const handleReset = () => {
    setPageNumber(1);
    queryParams.set("page", 1);
    setSearch("")
    setCountrySearch("")
  }
  const handleSearch = (e) => {
    setPageNumber(1);
    queryParams.set("page", 1);
    setSearch(e?.target?.value)
  }
  const handleSearchCountry = (e) => {
    setPageNumber(1);
    queryParams.set("page", 1);
    setCountrySearch(e?.target?.value)
  }
  const { data, isLoading } = useQuery(
    ["all-state-list", search, countrySearch, pageNumber],
    () => {
      let queryParams = [];

      // Add conditions for query parameters
      if (search) queryParams.push(`search=${search}`);
      if (countrySearch) queryParams.push(`country__name=${countrySearch}`);
      if (pageNumber) queryParams.push(`page=${pageNumber}`);
      if (limit) queryParams.push(`page_size=${limit}`);
      // Join query parameters with '&'
      const queryString = queryParams.length ? `?${queryParams.join('&')}` : "";
      return MasterServices.getStateList(queryString)
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
    (formdata) => MasterServices.getDeleteState(formdata),
    {
      onSuccess: () => {
        Swal.fire({
          title: "Successful",
          text: "Deleted",
          icon: "success",
        });

        queryClient.refetchQueries("all-state-list");
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
    ["all-country-list-dropdown-member-master"],
    () => MasterServices.getCountryList(),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.data;
        // console.log("Languages API Data", data?.data); // Debugging log
      },
      onError: (err) => {
        console.error("Error fetching languages", err?.message); // Debugging log

        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );
  useEffect(() => {
    setPageNumber(initialPage)
  }, [initialPage])
  return (
    <Wrapper>
      <div className="common-db-head mb-4">
        <div className="align-items-center row">
          <div className="d-inline-flex col-md-7 col-lg-6">
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
                <Button className="btn btn-style1" onClick={handleReset}>
                  {" "}
                  <BiReset />
                </Button>
              </li>
            </ul>

          </div>         <IsAccessibleMethod
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
      ) : data?.results?.length == 0 ? (
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

export default StateList;
