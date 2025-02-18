import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../../../layouts/Wrapper";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useFormik } from "formik";
import {
  StaffAdd,
  StaffTeam,
  StaffUpdate,
} from "../../../../helper/ValidationHelper/Validation";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StaffServices from "../../../../services/StaffServices";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import staffimg from "../../../../assets/images/no-images-available.jpg";
import config from "../../../../../config";
import Select from 'react-select';
import LocalPagination from "../../../../utils/LocalPagination";
import NoActiveDataFound from "../../../../utils/NoActiveDataFound";

const AddTeam = () => {
  const nav = useNavigate();
  const { id: detailsId } = useParams();
  const queryClient = useQueryClient();
  const [id, setId] = useState("");
  const [teamExecutive, setTeamExecutive] = useState(false)
  const [teamExecutiveErr, setTeamExecutiveErr] = useState(false)
  const [teamHead, setTeamHead] = useState(false)
  const [teamHeadErr, setTeamHeadErr] = useState("")
  const initialValues = {
    name: "",
    department: "",
  };

  const handleTeamHead = (data) => {
    setTeamHead(data)
    setTeamExecutive(false)

    setTeamHeadErr("")
  }


  const handleTeamExecutive = (data) => {
    setTeamExecutive(data)
    setTeamExecutiveErr("")
  }



  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: StaffTeam,
    onSubmit: (values, action) => {
      handleSubmit(values);
    },
  });


  const { data: departmentList, isLoading: isDepartmentLoad } = useQuery(
    ["department-list-nopagination"],
    () => StaffServices.departmentsListWithoutPagination(),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        // console.log("Data Franchise ", data?.data);
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
  const { data: staffHeadList, isLoading: isStaffHeadLoad } = useQuery(
    ["staff-list-pagination-teamhead", formik.values.department],
    () => {
      let queryParams = ""
      queryParams += "?group__isnull=" + true
      queryParams += "&role__code=" + config.staffRoleTeamLeader
      queryParams += formik.values.department ? "&department=" + formik.values.department : ""
      return StaffServices.staffListWithoutPagination(queryParams)
    },
    {
      enabled: !!formik.values.department,
      refetchOnWindowFocus: false,
      select: (data) => {

        console.log("Data Staff List ", data?.data);


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
  const { data: staffListExecutive, isLoading: isStaffExecutiveLoad } = useQuery(
    ["staff-list-pagination-executive", formik.values.department],
    () => {
      let queryParams = ""
      queryParams += "?group__isnull=" + true
      queryParams += "&role__code=" + config.staffRoleExecutive
      queryParams += formik.values.department ? "&department=" + formik.values.department : ""
      return StaffServices.staffListWithoutPagination(queryParams)
    },
    {
      enabled: !!formik.values.department,
      refetchOnWindowFocus: false,
      select: (data) => {

        console.log("Data Staff List ", data?.data);


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

  const customFormikHandleChange = (e) => {
    setTeamExecutive(false)
    setTeamHead(false)
    setTeamHeadErr("")
    formik.handleChange(e)
  }


  // console.log(staffList,"staffList")


  const AddTeam = useMutation((data) => StaffServices.team(data), {
    onSuccess: (data) => {
      // console.log("Data after submission organization", data?.data);
      // alert("Created Successfully")
      Swal.fire({
        title: "Successfull",
        text: "Created Successfully ",
        icon: "success",
      });
      handleBack();
    },
    onError: (err) => {
      console.log("Error response data:", err.response?.data);

      // Check for specific error messages or provide a generic message
      const msg =
        err.response?.data?.email[0] ||
        "An unexpected error occurred. Please try again.";

      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
      });

      return;
    },
  });
  const UpdateTeam = useMutation((data) => StaffServices.staffUpdateDetails(data), {
    onSuccess: (data) => {
      // console.log("Data after submission organization", data?.data);
      // alert("Created Successfully")
      Swal.fire({
        title: "Successfull",
        text: "Updated  Successfully ",
        icon: "success",
      });
      handleBack();
    },
    onError: (err) => {
      console.log("Error response data:", err.response?.data);

      // Check for specific error messages or provide a generic message
      const msg =
        err.response?.data?.email[0] ||
        "An unexpected error occurred. Please try again.";

      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
      });

      return;
    },
  });
  const handleSubmit = (data) => {
    console.log(data, "123")

    if (!teamHead || teamHead?.length == 0) {
      // console.log("Head")
      setTeamHeadErr("Team head required")
      return

    }
    if (!teamExecutive || teamExecutive?.length == 0) {
      setTeamExecutiveErr("Team executive required")
      return

    }

    const staffIds = [teamHead, ...teamExecutive]?.map((each) => {
      return each?.value
    })


    console.log(staffIds, "staffId")



    const sendObj = {
      name: data?.name,
      department: data?.department,
      staffs: staffIds
    }


    // console.log(data, teamHead, teamExecutive, "Here is submitting obj")


    AddTeam?.mutate(sendObj);
  };

  const handleBack = () => {
    queryClient.refetchQueries(["team-list", 1]);
    nav("/team");
  };

  useEffect(() => {
    try {
      const decodeId = detailsId && atob(detailsId);

      detailsId && setId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [detailsId]);

  return (
    <Wrapper>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6" className="mb-2">
            <FormGroup className="common-formgroup">
              <Label> Name *</Label>
              <Input
                className={
                  formik.touched.name && formik.errors.name
                    ? "is-invalid"
                    : ""
                }
                id=""
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="|"
                type="text"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">
                  {formik.errors.name}
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup className="common-formgroup">
              <Label> Department * </Label>
              <Input
                id=""
                name="department"
                type="select"
                value={formik.values.department}
                onChange={customFormikHandleChange}
                disabled={isDepartmentLoad}
                className={
                  formik.touched.department && formik.errors.department
                    ? "is-invalid"
                    : ""
                }
              >
                <option value={""}>Select Department</option>
                {isDepartmentLoad ? (
                  <ButtonLoader />
                ) : (
                  departmentList?.data?.length > 0 &&
                  departmentList?.data?.map((each) => {
                    return <option value={each?.id}>{each?.name || ""}</option>;
                  })
                )}
              </Input>
              {formik.touched.department && (
                <p className="text-danger">{formik.errors.department}</p>
              )}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup className="common-formgroup">
              <Label> Team Head   </Label>
              {isStaffHeadLoad ? (
                <ButtonLoader />
              ) : (
                staffHeadList?.length == 0 ? <p>No Team leader  found</p> : <Select
                  value={teamHead}
                  onChange={handleTeamHead}
                  disabled={!formik.values.department || !!staffHeadList?.length == 0}
                  options={
                    staffHeadList?.length == 0
                      ? [{ label: "No team head", value: "" }]
                      : staffHeadList.map((staff) => ({
                        label: `${staff.user?.first_name} ${staff.user?.last_name} (${staff?.role?.name} ${staff?.role?.code})` || "",
                        value: staff?.id || "",
                      }))
                  }
                />
              )}

              {teamHeadErr && (
                <div className="text-danger">
                  {teamHeadErr}
                </div>
              )}
            </FormGroup>
          </Col>

          {/* <Col md="6">
            <FormGroup className="common-formgroup">
              <Label>Team Head</Label>
              {isStaffLoad ? (
                <ButtonLoader />
              ) : (
                <div>
                  {staffList?.data?.results?.length == 0 ? (
                    <NoActiveDataFound msg="No Staff Found" />
                  ) :
                    staffList?.data?.results.map((staff) => {
                      const staffId = staff?.id || "";
                      const staffName = `${staff.user?.first_name} ${staff.user?.last_name}` || "";
                      const staffRole = `${staff.role?.name} ${staff.role?.code}` || "";

                      return (
                        <>
                          {staffRole && <div key={staffId} className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`teamHead-${staffId}`}
                              name="teamHead"
                              value={staffId}
                              disabled={!!!formik.values.department}
                              checked={teamHead.includes(staffId)}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                setTeamHead(prevTeamHead =>
                                  isChecked
                                    ? [...prevTeamHead, staffId]
                                    : prevTeamHead.filter(id => id !== staffId)
                                );
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`teamHead-${staffId}`}
                            >
                              {staffName}({staffRole})
                            </label>
                          </div>}
                        </>
                      );
                    })}
                </div>
              )}

              {teamHeadErr && (
                <div className="text-danger">
                  {teamHeadErr}
                </div>
              )}
            </FormGroup>
          </Col> */}

          <Col md="6">
            <FormGroup className="common-formgroup">
              <Label> Team Executive   </Label>
              {isStaffExecutiveLoad ? (
                <ButtonLoader />
              ) : staffListExecutive?.length == 0 ? <p>No Executive   found</p> : <Select
                value={teamExecutive}
                onChange={handleTeamExecutive}
                isMulti={true}
                disabled={!!!formik.values.department || !!!teamHead}
                options={

                  staffListExecutive?.length == 0 ? { label: "No team executive found", value: "" } :
                    staffListExecutive.map((staff) => {
                      return {
                        label: `${staff.user?.first_name} ${staff.user?.last_name} (${staff?.role?.name} ${staff?.role?.code})` || "",
                        value: staff?.id || "",
                      }
                    }

                    )}

              />}

              {teamExecutiveErr && (
                <div className="text-danger">
                  {teamExecutiveErr}
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md="12" className="mb-2">
            <FormGroup className="common-formgroup">
              <Button
                className="btn btn-style1 px-4 py-2"
                type="submit"
                disabled={AddTeam?.isLoading || UpdateTeam?.isLoading}
              >
                {AddTeam?.isLoading ? <ButtonLoader /> : "Save"}
              </Button>

              <Button
                disabled={AddTeam?.isLoading || UpdateTeam?.isLoading}
                className="btn px-4 py-2 mx-2"
                onClick={handleBack}
              >
                Back
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default AddTeam;
