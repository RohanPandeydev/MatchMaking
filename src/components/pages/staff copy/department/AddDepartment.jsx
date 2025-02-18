import React, { useMemo, useState } from "react";
import Wrapper from "../../../layouts/Wrapper";
import Permissions from "./Permission";
import { useEffect } from "react";
import { useFormik } from "formik";
import { DepartmentAdd } from "../../../../helper/ValidationHelper/Validation";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StaffServices from "../../../../services/StaffServices";
import Swal from "sweetalert2";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import updatedPermissions from "./Permission";

const AddDepartment = () => {
  const [checkboxesData, setCheckboxesData] = useState([]);
  const { id: detailsId } = useParams();
  const queryClient = useQueryClient();
  const [id, setId] = useState("");
  const nav = useNavigate();
  const initialValues = {
    name: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: DepartmentAdd,
    onSubmit: (values, action) => {
      handleSubmit(values);
    },
  });

  const { data: departmentDetails, isLoading: isDepartmentLoad } = useQuery(
    ["department-details", id],
    () => StaffServices.departmentsDetails({ id: id }),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const response = data?.data;
        console.log(response);
        formik.setFieldValue("name", response?.name);
        // Map permissions data to the checkboxesData structure
        // Assuming response.permissions contains the permission data
        const responsePermissions = response?.permissions || [];

        // Loop through the initial permissions and set isChecked based on response
        const formattedData = updatedPermissions.map((permission) => {
          const matchingModule = responsePermissions.find(
            (deptPerm) => deptPerm.parent === permission.parent
          );

          return {
            ...permission,
            isChecked: !!matchingModule, // Set parent isChecked if matching module is found
            children: permission.children.map((child) => {
              const matchingChild = matchingModule?.children.find(
                (childPerm) => childPerm.name === child.name
              );

              return {
                ...child,
                isChecked: matchingChild
                  ? matchingChild.methods.some((method) => method.isChecked)
                  : false, // Set child's isChecked based on the methods
                methods: child.methods.map((method) => {
                  const matchingMethod = matchingChild?.methods.find(
                    (methodPerm) => methodPerm.value === method.value
                  );

                  return {
                    ...method,
                    isChecked: matchingMethod
                      ? matchingMethod.isChecked
                      : false, // Set method's isChecked based on response
                  };
                }),
              };
            }),
          };
        });

        // Log the updated permissions to verify the structure
        console.log(formattedData);

        // console.log(checkboxesData, "checkboxesData");

        // Set the checkboxesData data
        setCheckboxesData(formattedData);
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
  useEffect(() => {
    try {
      const decodeId = detailsId && atob(detailsId);

      detailsId && setId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [detailsId]);

  const handleSubmit = (data) => {
    const permissions = checkboxesData
      .filter((item) => item.isChecked) // Filter parents that are checked
      .map((item) => ({
        parent: item.parent,
        children: item.children
          .filter((child) => child.isChecked) // Filter children that are checked
          .map((child) => ({
            name: child.name,
            id: child.id,
            feature: child.feature,
            link: child.link,
            methods: child.methods.filter((method) => method.isChecked), // Filter methods that are checked
          })),
      }))
      .filter((item) => item.children.length > 0); // Remove parents with no checked children

    const sendData = {
      name: data?.name,
      permissions: JSON.stringify(permissions),
    };
    if (detailsId) {
      sendData.id = id;
      UpdatedDepartment?.mutate(sendData);
      return;
    }
    // console.log(permissions)
    AddDepartment.mutate(sendData);
  };

  // useEffect(() => {
  //   const formattedData = Permissions?.map((elem) => ({
  //     id: elem?.rolePermissionName,
  //     label: elem?.rolePermissionName,
  //     isChecked: false,
  //     children: elem?.roleAccess?.map((each) => ({
  //       id: `${elem.rolePermissionName}-${each}`,
  //       label: each,
  //       isChecked: false,
  //       name: each.toUpperCase(),
  //     })),
  //   }));
  //   !detailsId && setCheckboxesData(formattedData);
  // }, [Permissions,detailsId]);
  useEffect(() => {
    setCheckboxesData(updatedPermissions);
  }, [updatedPermissions, detailsId]);

  // const handleChange = (e) => {
  //   let data = checkboxesData;
  //   let newData = data.map((row) => {
  //     if (row.label === e.target.name) {
  //       row.isChecked = e.target.checked;
  //       row.children = row.children.map((row2) => {
  //         row2.isChecked = e.target.checked;
  //         return row2;
  //       });
  //     }
  //     return row;
  //   });
  //   setCheckboxesData(() => newData);
  // };
  // const handleChangePermissions = (e, name, cname) => {
  //   let data = checkboxesData;

  //   let newData = data.map((row) => {
  //     if (row.label === name) {
  //       let allcheck = [];
  //       let isReadUnchecked = cname === "read" && !e.target.checked;

  //       row.children = row.children.map((row2) => {
  //         // If read is unchecked, uncheck all
  //         if (isReadUnchecked) {
  //           row2.isChecked = false;
  //         } else {
  //           // Otherwise, update the clicked checkbox
  //           if (row2.label === cname) {
  //             row2.isChecked = e.target.checked;
  //           }
  //           // If any other permission is checked, ensure read is checked
  //           if (cname !== "read" && e.target.checked) {
  //             row.children.find((c) => c.label === "read").isChecked = true;
  //           }
  //         }

  //         // Collect all checked statuses
  //         if (row2.isChecked) {
  //           allcheck.push(true);
  //         }
  //         return row2;
  //       });

  //       // Set the main row's isChecked based on children's statuses
  //       row.isChecked = allcheck.length > 0;
  //     }
  //     return row;
  //   });

  //   setCheckboxesData(() => newData);
  // };
  const handleBack = () => {
    queryClient.refetchQueries(["department-list", 1]);
    nav("/department");
  };
  const handleChange = (e, parentIndex) => {
    const isChecked = e.target.checked;
    const updatedCheckboxes = [...checkboxesData];

    // Update the parent checkbox and all child checkboxesData and their methods
    updatedCheckboxes[parentIndex].isChecked = isChecked;
    updatedCheckboxes[parentIndex].children.forEach((child) => {
      child.methods.forEach((method) => {
        method.isChecked = isChecked; // Check/uncheck all methods based on parent
      });
      child.isChecked = isChecked; // Check/uncheck child checkbox
    });

    setCheckboxesData(updatedCheckboxes);
  };

  const handleChangePermissions = (e, parentIndex, childIndex, methodIndex) => {
    const isChecked = e.target.checked;
    const updatedCheckboxes = [...checkboxesData];
    const currentChild = updatedCheckboxes[parentIndex].children[childIndex];

    // Update the specific method checkbox
    currentChild.methods[methodIndex].isChecked = isChecked;

    // Find the index of the "View" method
    const viewMethodIndex = currentChild.methods.findIndex(
      (method) => method.value === "view" || method.value === "read"
    );

    // Check if any of Create, Update, or Delete is checked
    const createChecked = currentChild.methods.find(
      (method) => method.value === "create"
    )?.isChecked;
    const updateChecked = currentChild.methods.find(
      (method) => method.value === "update"
    )?.isChecked;
    const deleteChecked = currentChild.methods.find(
      (method) => method.value === "delete"
    )?.isChecked;

    // If any of the specific methods are checked, check the "View" method
    if (createChecked || updateChecked || deleteChecked) {
      currentChild.methods[viewMethodIndex].isChecked = true; // Check "View"
    } else {
      currentChild.methods[viewMethodIndex].isChecked = true; // Optional: uncheck "View" if none are checked
    }

    // Check if the child checkbox should be checked (if any method is checked)
    const anyMethodChecked = currentChild.methods.some(
      (method) => method.isChecked
    );
    currentChild.isChecked = anyMethodChecked;

    // Update parent checkbox state
    const parentChecked = updatedCheckboxes[parentIndex].children.some(
      (child) => child.isChecked
    );
    updatedCheckboxes[parentIndex].isChecked = parentChecked;

    setCheckboxesData(updatedCheckboxes);
  };

  const AddDepartment = useMutation(
    (data) => StaffServices.addDepartment(data),
    {
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
  const UpdatedDepartment = useMutation(
    (data) => StaffServices.departmentUpdate(data),
    {
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
  return (
    <Wrapper>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6" className="mb-2">
            <FormGroup className="common-formgroup">
              <Label> Department Name *</Label>
              <Input
                className={
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
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
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </FormGroup>
          </Col>
          <Col md="12" className="mb-2">
            <div className="department-checkbox-wrapper mt-4">
              {/* {checkboxesData &&
                checkboxesData.map((item) => (
                  <div className="form-check mb-4" key={item.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={item.label}
                      id={item.id}
                      onChange={handleChange}
                      checked={item.isChecked}
                    />
                    <label className="form-check-label" htmlFor={item.id}>
                      {item.label}
                    </label>
                    <div className="d-flex align-items-center">
                      {item.children.map((row) => (
                        <div className="form-check mt-2 me-4" key={row.id}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name={row.label}
                            id={row.id}
                            onChange={(e) =>
                              handleChangePermissions(e, item.label, row.label)
                            }
                            checked={row.isChecked}
                          />
                          <label className="form-check-label" htmlFor={row.id}>
                            {row.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))} */}
              {checkboxesData && (
                <div className="department-checkbox-wrap">
                  {checkboxesData.map((item, parentIndex) => (
                    <div className="department-checkbox-box mb-4" key={parentIndex}>
                      {/* Parent Checkbox */}
                      <div className="department-parent-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name={item.parent}
                          id={`parent-${parentIndex}`}
                          onChange={(e) => handleChange(e, parentIndex)}
                          checked={item.isChecked || false}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`parent-${parentIndex}`}
                        >
                          {item.parent}
                        </label>
                      </div>
                      {/* Children (Sub-items) and Methods */}
                      <div className="department-sub-checkbox-wrap row">
                        {item.children.map((child, childIndex) => (
                          <div key={child.id} className="col-12 col-md-6 col-lg-4 mb-3">
                            <div className="department-sub-checkbox-list ">
                              {/* Child Checkbox */}
                              <div className="department-sub-checkbox-heading">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name={child.name}
                                  id={`child-${child.id}`}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const updatedCheckboxes = [...checkboxesData];

                                    // Check/uncheck all methods based on child checkbox
                                    updatedCheckboxes[parentIndex].children[
                                      childIndex
                                    ].methods.forEach((method) => {
                                      method.isChecked = isChecked;
                                    });

                                    // Update child checkbox state
                                    updatedCheckboxes[parentIndex].children[
                                      childIndex
                                    ].isChecked = isChecked;

                                    // Update parent checkbox state
                                    const parentChecked = updatedCheckboxes[
                                      parentIndex
                                    ].children.some((c) => c.isChecked);
                                    updatedCheckboxes[parentIndex].isChecked =
                                      parentChecked;

                                    setCheckboxesData(updatedCheckboxes);
                                  }}
                                  checked={child.isChecked || false}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`child-${child.id}`}
                                >
                                  {child.name}
                                </label>
                              </div>
                              {/* Methods as Checkboxes */}
                              <ul className="department-sub-children-wrap">
                                {child.methods.map((method, methodIndex) => (
                                  <li
                                    className="department-sub-children-list"
                                    key={`${child.id}-${method.value}`}
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name={method.label}
                                      id={`${child.id}-${method.value}`}
                                      onChange={(e) =>
                                        handleChangePermissions(
                                          e,
                                          parentIndex,
                                          childIndex,
                                          methodIndex
                                        )
                                      }
                                      checked={method.isChecked || false}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={`${child.id}-${method.value}`}
                                    >
                                      {method.label}
                                    </label>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>
          <Col md="12" className="mb-2">
            <FormGroup className="common-formgroup">
              <Button
                className="btn btn-style1 px-4 py-2"
                type="submit"
                disabled={
                  AddDepartment?.isLoading || UpdatedDepartment?.isLoading
                }
              >
                {AddDepartment?.isLoading || UpdatedDepartment?.isLoading ? (
                  <ButtonLoader />
                ) : (
                  "Save"
                )}
              </Button>

              <Button
                disabled={
                  AddDepartment?.isLoading || UpdatedDepartment?.isLoading
                }
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

export default AddDepartment;
