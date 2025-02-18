import React, { useState } from "react";
import Wrapper from "../../../layouts/Wrapper";
import DataTable from "../DataTable";
import countries from "../../../../utils/CountryList";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { FiPlus } from "react-icons/fi";
import getValueBetweenMasterAndAdd from "../../../../utils/UrlParserDropdown";
import { useQuery } from "@tanstack/react-query";
import MasterServices from "../../../../services/MasterServices";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import Swal from "sweetalert2";
import Loader from "../../../../utils/Loader/Loader";
import NoImageFound from "../../../../utils/NoImageFound";
import { IsAccessibleMethod } from "../../../../guard/Rbac";
import PermissionSets from "../../../../guard/Method";

const Countries = () => {
  const url = getValueBetweenMasterAndAdd(window.location.href);

  const columns = [
    {
      name: "Sl No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "State",
      selector: (row) => JSON.parse(row.description)?.state,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => JSON.parse(row.description)?.city,
      sortable: true,
    },
  ];
  const nav = useNavigate();

  const handleNav = () => {
    nav("/master/countries/add");
  };


  const [search, setSearch] = useState("")
  const handleSearch = (e) => {
    setSearch(e?.target?.value)
  }


  const { data, isLoading } = useQuery(
    ["all-country-list", search],
    () => MasterServices.List(`category__name=${url}&search=${search}`),
    {
      enabled: !!url,
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
  return (
    <Wrapper>
      <div className="common-db-head mb-4">
        <div className="align-items-center row">
          <div className="d-inline-flex col-md-7 col-lg-6">
            <div className="master-head-search-wrap">
              <div className="master-search-wrap">
                <Input name="search" placeholder="Search..." type="search" onChange={handleSearch} value={search} />
              </div>
            </div>
          </div>          <IsAccessibleMethod
            methodName={PermissionSets?.master?.Countries?.Create}
            pathname={window.location.pathname}
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
          data={data}
          pageSize={10}
          count={data?.length}
        />
      )}
    </Wrapper>
  );
};

export default Countries;
