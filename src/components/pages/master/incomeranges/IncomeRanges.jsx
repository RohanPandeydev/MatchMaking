import React, { useState } from "react";
import Wrapper from "../../../layouts/Wrapper";
import DataTable from "../DataTable";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import Swal from "sweetalert2";
import MasterServices from "../../../../services/MasterServices";
import getValueBetweenMasterAndAdd from "../../../../utils/UrlParserDropdown";
import Loader from "../../../../utils/Loader/Loader";
import NoImageFound from "../../../../utils/NoImageFound";
import { IsAccessibleMethod } from "../../../../guard/Rbac";
import PermissionSets from "../../../../guard/Method";
import { FaEdit, FaTrash } from "react-icons/fa";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import useDeleteMasterContent from "../../../../helper/DeleteMasterContent";
import useUpdateContent from "../../../../helper/UpdateMasterContent";
import { RiDeleteBin6Line } from "react-icons/ri";
import useFetchMasterSectionData from "../../../../helper/MasterSection";
import Select from 'react-select';

const IncomeRanges = () => {
  const url = getValueBetweenMasterAndAdd(window.location.href);
  const [search, setSearch] = useState({ currency: "", min: "", max: "" })
  const [currency, setCurrency] = useState({ label: "please select currency", value: "" })
  const [errors, setErrors] = useState({});


  const nav = useNavigate();
  const deleteMutation = useDeleteMasterContent("all-lang-list-income-range");
  const updateMutation = useUpdateContent("all-lang-list-income-range");

  const columns = [
    {
      name: "Sl No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Start Range",
      selector: (row) => row.name,
      sortable: true, // Enable sorting for this column
    },
    {
      name: "End Range",
      selector: (row) => JSON.parse(row.description)?.endRange,
      sortable: true, // Enable sorting for this column
    },
    {
      name: "Currency",
      selector: (row) => `${JSON.parse(row.description)?.currency && JSON.parse(row.description)?.currency} (${JSON.parse(row.description)?.symbol && JSON.parse(row.description)?.symbol})` || "N/A",
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
                onClick={() => nav("/master/incomeranges/add/" + btoa(row?.id))}
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
  const handleNav = () => {
    nav("/master/incomeranges/add");
  };
  const handleSearch = (e) => {
    const name = e.target.name; // 'min' or 'max'
    const value = e.target.value;

    // Update search state
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name != "currency") {
      // Validate input (only numeric values allowed)
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Only numeric values are allowed.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  const handleSelectCurrency = (e) => {
    // console.log(e, "e-->")

    const prevValue = { ...search }
    prevValue.currency = e?.value
    setSearch(prevValue)
    setCurrency(e)

  }

  const { data, isLoading } = useQuery(
    ["all-lang-list-income-range" || "default-key", search?.currency, search?.max, search?.min], // Using a default key if none is provided
    () => {
      let queryParams = `category__name=${url}&ordering=created_at`
      return MasterServices.List(queryParams)
    },
    {
      enabled: !!url,
      refetchOnWindowFocus: false,
      select: (data) => {
        const parseResponse = data?.data?.filter((each) => {
          const parseDesc = JSON.parse(each?.description);
          const startRange = parseDesc?.startRange ? parseFloat(parseDesc?.startRange) : null;
          const endRange = parseDesc?.endRange ? parseFloat(parseDesc?.endRange) : null;
          const currency = parseDesc?.currency;

          // Filter logic based on querySearch
          const isMinValid = search.min ? startRange <= parseFloat(search.min) : true;
          const isMaxValid = search.max ? endRange >= parseFloat(search.max) : true;
          const isCurrencyValid = search.currency ? currency === search.currency : true;

          // Return true if all conditions are met
          return isMinValid && isMaxValid && isCurrencyValid;
        });

        console.log(parseResponse)
        return { data: parseResponse }


      }, // Extract the required data directly
      onError: (err) => {
        console.error("Error fetching data:", err?.message);

        // Handle 401 error specifically
        if (err?.response?.status === 401) {
          ValidateAuthenticationKey(
            err?.response?.status,
            "Your login session has expired. Please log in again."
          );
          return;
        }

        // Show a generic error message for other errors
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );

  const { data: currencyList, isLoading: isLoadCurrency } = useFetchMasterSectionData('currency', "all-currency-list-incomde range-currency")

  return (
    <Wrapper>
      <div className="common-db-head mb-4">
        <div className="align-items-center row">
          <div className="d-inline-flex col-md-7 col-lg-6 gap-2">
            <div className="master-head-search-wrap">
              <div className="master-search-wrap">
                {isLoadCurrency ? <ButtonLoader /> : <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isDisabled={isLoadCurrency}
                  isLoading={isLoadCurrency}
                  onChange={handleSelectCurrency}
                  placeholder="Select currency"
                  value={currency}
                  isSearchable={true}
                  defaultValue={"please selet currency"}
                  name=""
                  options={[
                    { label: "please select currency", value: "" }, // Default option,
                    ...currencyList?.map((each) => {
                      const description = each?.description ? JSON.parse(each.description) : {};
                      const symbol = description?.symbol || "";

                      return {
                        label: `${each?.name} (${symbol})`,
                        value: each?.name,
                        country: each?.name,
                        symbol: symbol,
                      };
                    })
                  ]}
                />}
              </div>
            </div>
            <div className="master-head-search-wrap">
              <div className="master-search-wrap">
                <Input name="min" placeholder="Min Range..." type="search" onChange={handleSearch} value={search?.min} />
              </div>
              {errors?.min && <span className="error-message text-danger">{errors.min}</span>}
            </div>
            <div className="master-head-search-wrap">
              <div className="master-search-wrap">
                <Input name="max" placeholder="Max Range..." type="search" onChange={handleSearch} value={search?.max} />
              </div>
              {errors?.max && <span className="error-message text-danger">{errors.max}</span>}
            </div>
          </div>
          <IsAccessibleMethod
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
      ) : data?.data?.length == 0 ? (
        <NoImageFound />
      ) : (
        <DataTable
          columns={columns}
          data={data?.data}
          pageSize={10}
          count={data?.data?.length}
        />
      )}
    </Wrapper>
  );
};

export default IncomeRanges;
