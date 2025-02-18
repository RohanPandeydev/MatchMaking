import React from "react";
import { IoClose } from "react-icons/io5";
import {
  Button,
  Col,
  Collapse,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import { useFormik } from "formik";
import { each, initial } from "lodash";
import { useEffect } from "react";
import StaffServices from "../../../../services/StaffServices";
import Loader from "../../../../utils/Loader/Loader";
import NoActiveDataFound from "../../../../utils/NoActiveDataFound";
import { useQuery } from "@tanstack/react-query";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import { AssignModelValidation } from "../../../../helper/ValidationHelper/Validation";
import DuplicateData from "./DuplicateData";
import Select from 'react-select';
import config from "../../../../../config";
import customContext from "../../../../contexts/Context";
import Swal from "sweetalert2";
import StorageData from "../../../../helper/storagehelper/StorageData";

const AssignModel = ({
  handleAssignModel,
  toggleAssignModel,
  handleCloseAssignModel,
  AssignBrideandgroomMutation,
  brideandgroom,
  duplicateDataList,
  setDuplicateData, setBrideAndGroomId, setCheckBoxList, isFromMember,
  teamExecutive, setTeamExecutive,
  teamExecutiveErr, setTeamExecutiveErr,
  teamHead, setTeamHead,
  teamHeadErr, setTeamHeadErr



}) => {
  const initialValues = {
    brideandgroom: "",
    staff: "",
    department: ""
  };

  let userData = StorageData.getUserData()


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: AssignModelValidation,
    onSubmit: (values) => {
      // console.log(values, "Submit");
      handleSubmit(values);
    },
  });

  const handleSubmit = (data) => {
    console.log("Form data submitted:", JSON.parse(JSON.stringify(data)));

    if (brideandgroom?.length == 0) {
      Swal.fire({
        title: "Error",
        text: "Please try again later",
        icon: "error",
      });
      handleCloseAssignModel();
      return;
    }
    if (!teamHead || teamHead?.length == 0) {
      // console.log("Head")
      setTeamHeadErr("Team head required")
      return

    }
    // if (!teamExecutive || teamExecutive?.length == 0) {
    //   setTeamExecutiveErr("Team executive required")
    //   return

    // }
    let staffIds = []
    if (teamExecutive?.value) {

      staffIds = teamExecutive?.value

    } else {

      staffIds = teamHead?.value

    }



    let sendObj = brideandgroom?.map((each) => {
      return {
        brideandgroom: each?.id,
        staff: Number(data?.staff),
      }
    })

    if (isFromMember) {
      sendObj = brideandgroom?.map((each) => {
        return {
          tenant: each?.id,
          staff: Number(staffIds),
        }
      })

      AssignBrideandgroomMutation.mutate(sendObj);
      return

    }
    sendObj = brideandgroom?.map((each) => {
      return {
        brideandgroom: each?.id,
        staff: Number(staffIds),
      }
    })

    // console.log("staffIds", sendObj)

    AssignBrideandgroomMutation.mutate(sendObj);
    formik.resetForm()
  };




  const handleRemoveDuplicate = () => {
    const filterOut = brideandgroom?.filter((each) => {
      return !duplicateDataList?.some((ele) => ele?.data?.id == each?.id);
    });
    // console.log(filterOut, "filterOut")
    formik.setFieldValue("brideandgroom", filterOut)
    // filterOut?.length == 0 ? :handleCloseShareDataModel()
    setBrideAndGroomId(filterOut);
    setDuplicateData([]);
    if (filterOut?.length == 0) {
      handleCloseAssignModel()
      formik.setFieldValue("staff", '')
      setCheckBoxList([])


    }




  }
  useEffect(() => {
    if (brideandgroom.length) {
      formik.setFieldValue("brideandgroom", brideandgroom);
      return;
    }

    return;
  }, [brideandgroom?.length]);



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

  const handleTeamHead = (data) => {
    if (!!userData?.department?.id) return
    setTeamHead(data)
    setTeamExecutive(false)
    setTeamHeadErr("")
  }


  const handleTeamExecutive = (data) => {

    setTeamExecutive(data)
    setTeamExecutiveErr("")
  }



  const customFormikHandleChange = (e) => {
    if (!!userData?.department?.id) return
    setTeamExecutive(false)
    setTeamHead(false)
    setTeamHeadErr("")
    formik.handleChange(e)
  }
  const { data: staffHeadList, isLoading: isStaffHeadLoad } = useQuery(
    ["staff-list-pagination-teamhead-brideandgroom", formik.values.department],
    () => {
      let queryParams = ""
      // queryParams += "?group__isnull=" + true
      queryParams += "?role__code=" + config.staffRoleTeamLeader
      queryParams += formik.values.department ? "&sw=" + formik.values.department : ""
      return StaffServices.staffListWithoutPagination(queryParams)
    },
    {
      enabled: !!formik.values.department && !!config.staffRoleTeamLeader,
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

  // console.log(teamHead, " teamHead")
  const { data: staffListExecutive, isLoading: isStaffExecutiveLoad } = useQuery(
    ["staff-list-pagination-executive-brideandgroom", formik.values.department, teamHead?.groupId],
    () => {
      let queryParams = [];
      if (teamHead?.value) {
        queryParams.push(`group=${teamHead.groupId}`);
      }
      if (config.staffRoleExecutive) {
        queryParams.push(`role__code=${config.staffRoleExecutive}`);
      }
      if (formik.values.department) {
        queryParams.push(`department=${formik.values.department}`);
      }
      let finalParams = queryParams.length ? `?${queryParams.join("&")}` : "";
      return StaffServices.staffListWithoutPagination(finalParams)
    },
    {
      enabled: !!formik.values.department && !!config.staffRoleExecutive && !!teamHead.groupId,
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








  // console.log(userData, teamHead, "userData123456789")

  useEffect(() => {

    if (!toggleAssignModel) {
      formik.setFieldValue("staff", "")
      return

    }
  }, [toggleAssignModel])

  // console.log(userData,"123456987")

  useEffect(() => {
    // console.log(userData, "userData123456")
    if (userData?.department && userData?.department?.id) {
      formik.setFieldValue("department", userData?.department?.id)
      if (userData?.role?.code == config.staffRoleTeamLeader) {
        setTeamHead({
          label: [
            userData?.first_name,
            userData?.last_name,
            userData?.role ? `(${userData.role.name} ${userData.role.code})` : null,
            userData?.group ? `(${userData.group.name} ${userData.group.code})` : null
          ]
            .filter(Boolean) // Removes null/undefined values
            .join(" ") || "",
          value: userData?.staffId,
          groupId: userData?.group?.id

        })
      }


    }

  }, [userData?.department?.code, toggleAssignModel])








  return (
    <Modal
      size="xl"
      className="common-modal"
      isOpen={toggleAssignModel}
      toggle={handleAssignModel}
    >
      <Button className="close-btn" onClick={handleCloseAssignModel}>
        <IoClose />
      </Button>
      {duplicateDataList?.length ? <DuplicateData duplicateDataList={duplicateDataList} brideandgroom={brideandgroom} handleRemoveDuplicate={handleRemoveDuplicate} /> : <form onSubmit={formik.handleSubmit}>

        <ModalBody>

          <Row className="mt-2">
            <Col md="6">
              <FormGroup className="common-formgroup">
                <Label> Department * </Label>
                <Input
                  id=""

                  name="department"
                  type="select"
                  value={formik.values.department}
                  onChange={customFormikHandleChange}
                  disabled={isDepartmentLoad || !!userData?.department?.id}
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
                <Label> Share to Team Head   </Label>
                {isStaffHeadLoad ? (
                  <ButtonLoader />
                ) : (
                  staffHeadList?.length == 0 ? <p>No Team leader  found</p> : <Select
                    value={teamHead}
                    onChange={handleTeamHead}
                    isDisabled={!!!formik.values.department || !!staffHeadList?.length == 0 || !!userData?.department?.id}
                    options={
                      staffHeadList?.length == 0
                        ? [{ label: "No team head", value: "" }]
                        : staffHeadList.map((staff) => ({
                          label: [
                            staff.user?.first_name,
                            staff.user?.last_name,
                            staff?.role ? `(${staff.role.name} ${staff.role.code})` : null,
                            staff?.group ? `(${staff.group.name} ${staff.group.code})` : null
                          ]
                            .filter(Boolean) // Removes null/undefined values
                            .join(" ") || "",
                          value: staff?.id || "",
                          groupId: staff?.group?.id
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
            <Col md="6">
              <FormGroup className="common-formgroup">
                <Label>  Share to  Team Executive (optional)  </Label>
                {isStaffExecutiveLoad ? (
                  <ButtonLoader />
                ) : staffListExecutive?.length == 0 ? <p>No Executive   found</p> : <Select
                  value={teamExecutive}
                  onChange={handleTeamExecutive}
                  // isMulti={true}
                  isDisabled={!!!formik.values.department || !!!teamHead.value}
                  options={

                    [{ label: "Please select executive", value: "" }, ...staffListExecutive?.length == 0 ? { label: "No team executive found", value: "" } :
                      staffListExecutive.map((staff) => {
                        return {
                          label: `${staff.user?.first_name} ${staff.user?.last_name} (${staff?.role?.name} ${staff?.role?.code})` || "",
                          value: staff?.id || "",
                        }
                      }

                      )]}

                />}

                {teamExecutiveErr && (
                  <div className="text-danger">
                    {teamExecutiveErr}
                  </div>
                )}
              </FormGroup>
            </Col>
            {/* <Col xs="12" md="12" lg="12">
                <FormGroup className="common-formgroup">
                  <Label>Relationship manager</Label>
                  <Input
                    name="staff"
                    placeholder="|"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.staff}
                    className={
                      formik.touched.staff && formik.errors.staff
                        ? "is-invalid"
                        : ""
                    }
                    type="select"
                  >
                    <option value="">Please Select relationship manager</option>
                    {!isStaffLoad &&
                      staffList?.map((each, index) => (
                        <option key={index} value={each?.id}>
                          {each?.user?.first_name || ""}
                          {each?.user?.last_name}
                        </option>
                      ))}
                  </Input>
                  {formik.touched.staff && formik.errors.staff && (
                    <p className="text-danger">{formik.errors.staff}</p>
                  )}
                </FormGroup>
              </Col> */}

            <Col xs="12" md="12" lg="12" className="text-end">
              {duplicateDataList?.length == brideandgroom?.length ? <Button type="click" onClick={handleCloseAssignModel}>Close</Button> : <Button className="btn btn-style1" type="submit">
                {AssignBrideandgroomMutation?.isLoading ? (
                  <ButtonLoader />
                ) : (
                  "Save"
                )}
              </Button>}
            </Col>
          </Row>

        </ModalBody>
      </form>}

    </Modal>
  );
};

export default AssignModel;
