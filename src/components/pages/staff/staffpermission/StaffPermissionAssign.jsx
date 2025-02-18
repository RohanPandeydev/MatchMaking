import React, { useMemo, useState } from "react";
import Wrapper from "../../../layouts/Wrapper";
import Permissions from "../staffpermission/Permission";
import { useEffect } from "react";
import { useFormik } from "formik";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StaffServices from "../../../../services/StaffServices";
import Swal from "sweetalert2";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import Select from 'react-select';
import StaffPermission from "./StaffPermission";
import { StaffPermissionAdd } from "../../../../helper/ValidationHelper/Validation";
import { IsAccessibleMethod } from "../../../../guard/Rbac";
import PermissionSets from "../../../../guard/Method";

const StaffPermissionAssign = () => {
    const { id: detailsId } = useParams();
    const queryClient = useQueryClient();
    const [id, setId] = useState("");
    const [staff, setStaffList] = useState(false)
    const [staffErr, setStaffListErr] = useState("")
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const nav = useNavigate();

    const initialValues = {
        name: ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: StaffPermissionAdd,
        onSubmit: (values, action) => {
            // console.log(values)
            handleSubmit(values);
        },
    });





    const transformPermissions = (selectedPermissions) => {
        const transformedData = selectedPermissions.reduce((acc, { parent, feature, method, details, link }) => {
            // Check if parent exists in accumulator
            let parentGroup = acc.find(item => item.parent === parent);
            // console.log(parent,"parent",link)
            if (!parentGroup) {
                parentGroup = { parent, children: [], methods: [] };
                acc.push(parentGroup);
            }

            // If feature is not provided, treat as a direct method
            if (!feature) {
                parentGroup.methods.push({
                    name: method,
                    method: Object.keys(details), // Extract keys like 'create' or 'update'

                });
                parentGroup.link = link
                console.log(parentGroup, "Parent Group")
            } else {
                // Check if child exists under the parent
                let childGroup = parentGroup.children.find(item => item.child === feature);
                if (!childGroup) {
                    childGroup = { child: feature, link: link, methods: [] };
                    parentGroup.children.push(childGroup);
                }

                // Add the method to the child group
                childGroup.methods.push({
                    name: method,
                    method: Object.keys(details), // Extract keys like 'create' or 'update'
                });
            }

            return acc;
        }, []);

        return transformedData;
    };

    const handleSubmit = (data) => {
        // console.log(selectedPermissions,"selectedPermissions")
        const transformedData = transformPermissions(selectedPermissions)
        console.log(transformedData);

        console.log(selectedPermissions, data, "123456")

        const sendData = {
            name: data.name,
            content: JSON.stringify(transformedData)
        }
        AddPermissionStaff.mutate(sendData);
    };


    const handleBack = () => {
        queryClient.refetchQueries(["permission-list", 1]);
        nav("/permissionassign");
    };


    const AddPermissionStaff = useMutation(
        (data) => StaffServices.addPermission(data),
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

    return (
        <Wrapper>
            <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col md="6" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label>  Name *</Label>
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
                        <StaffPermission selectedPermissions={selectedPermissions} setSelectedPermissions={setSelectedPermissions} />
                    </Col>

                    <Col md="12" className="mb-2">

                        <FormGroup className="common-formgroup">
                            <IsAccessibleMethod
                                method={Object.keys(PermissionSets.staff.PermissionModule.Create)[0]}
                                route={window.location.pathname}

                            >
                                <Button
                                    className="btn btn-style1 px-4 py-2"
                                    type="submit"
                                    disabled={
                                        AddPermissionStaff?.isLoading
                                    }
                                >
                                    {AddPermissionStaff?.isLoading ? (
                                        <ButtonLoader />
                                    ) : (
                                        "Save"
                                    )}
                                </Button>
                            </IsAccessibleMethod>


                            <Button
                                disabled={
                                    AddPermissionStaff?.isLoading
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


export default StaffPermissionAssign