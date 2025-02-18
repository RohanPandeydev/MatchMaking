import React, { useState } from "react";
import Wrapper from "../../../layouts/Wrapper";
import DataTable from "../DataTable";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../utils/Loader/Loader";
import NoImageFound from "../../../../utils/NoImageFound";
import { useQuery } from "@tanstack/react-query";
import MasterServices from "../../../../services/MasterServices";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import Swal from "sweetalert2";
import getValueBetweenMasterAndAdd from "../../../../utils/UrlParserDropdown";
import { IsAccessibleMethod } from "../../../../guard/Rbac";
import PermissionSets from "../../../../guard/Method";
import { Button, Col, FormGroup, Input, Label, Row, Table } from "reactstrap";

import { FaEdit, FaTrash } from "react-icons/fa";
import useDeleteMasterContent from "../../../../helper/DeleteMasterContent";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import useUpdateContent from "../../../../helper/UpdateMasterContent";
import { RiDeleteBin6Line } from "react-icons/ri";
import useFetchMasterSectionData from "../../../../helper/MasterSection";

const ResidenceStatuses = () => {
  const url = getValueBetweenMasterAndAdd(window.location.href);
  const nav = useNavigate();
  const deleteMutation = useDeleteMasterContent("all-lang-list-residance-status");
  const updateMutation = useUpdateContent("all-lang-list-residance-status");

  const residenceStatuses = [
    { id: 1, name: "Citizen", value: "Citizen".replace(/ /g, "_") },
    {
      id: 2,
      name: "Permanent Resident",
      value: "Permanent_Resident".replace(/ /g, "_"),
    },
    {
      id: 3,
      name: "Temporary Resident",
      value: "Temporary_Resident".replace(/ /g, "_"),
    },
    { id: 4, name: "Student Visa", value: "Student_Visa".replace(/ /g, "_") },
    { id: 5, name: "Work Visa", value: "Work_Visa".replace(/ /g, "_") },
    { id: 6, name: "Refugee", value: "Refugee".replace(/ /g, "_") },
    { id: 7, name: "Asylum Seeker", value: "Asylum_Seeker".replace(/ /g, "_") },
    { id: 8, name: "Visitor", value: "Visitor".replace(/ /g, "_") },
    { id: 9, name: "Diplomat", value: "Diplomat".replace(/ /g, "_") },
    { id: 10, name: "Undocumented", value: "Undocumented".replace(/ /g, "_") },
  ];
  const columns = [
    {
      name: "Sl No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Residence status",
      selector: (row) => row.name,
      sortable: true, // Enable sorting for this column
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
                onClick={() => nav("/master/residencestatus/add/" + btoa(row?.id))}
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


                    handleDelete(row?.id)
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
                  {updateMutation?.isLoading ? (
                    <ButtonLoader />
                  ) : (
                    <Input type="switch" checked={!row?.is_disabled} />
                  )}
                </FormGroup>
              </Button>
            </IsAccessibleMethod>
          </div>
        </>
      ),
    },
    // {
    //   name: "Value",
    //   selector: (row) => row.value,
    // },
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
  }
  const handleNav = () => {
    nav("/master/residencestatus/add");
  };
  // const { data, isLoading } = useQuery(
  //   ["all-lang-list-residance-status"],
  //   () => MasterServices.List(`category__name=${url}`),
  //   {
  //     enabled: !!url,
  //     refetchOnWindowFocus: false,
  //     select: (data) => {
  //       return data?.data;
  //       // console.log("Languages API Data", data?.data); // Debugging log
  //     },
  //     onError: (err) => {
  //       console.error("Error fetching languages", err?.message); // Debugging log
  //       if (err?.response?.status === 401) {
  //         ValidateAuthenticationKey(
  //           err?.response?.status,
  //           "Your login session has expired. Please log in again."
  //         );
  //         return;
  //       }
  //       Swal.fire({
  //         title: "Error",
  //         text: err?.response?.data?.message || err?.message,
  //         icon: "error",
  //       });
  //     },
  //   }
  // );


  const [search, setSearch] = useState("")
  const handleSearch = (e) => {
    setSearch(e?.target?.value)
  }

  const { data, isLoading } = useFetchMasterSectionData(url, "all-lang-list-residance-status", search)


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
          data={data}
          pageSize={10}
          count={data?.length}
        />
      )}
    </Wrapper>
  );
};

export default ResidenceStatuses;
