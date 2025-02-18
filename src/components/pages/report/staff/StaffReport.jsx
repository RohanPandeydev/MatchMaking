import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { VscFilter } from 'react-icons/vsc'
import { LiaEdit } from 'react-icons/lia'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Organization from "../../../../assets/images/organization-avatar-img.jpg";
import Wrapper from '../../../layouts/Wrapper'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import StaffServices from '../../../../services/StaffServices'
import ValidateAuthenticationKey from '../../../../utils/ValidationAuthenticationKey'
import Swal from 'sweetalert2'
import NoActiveDataFound from '../../../../utils/NoActiveDataFound'
import staffimg from "../../../../assets/images/no-images-available.jpg";
import config from '../../../../../config'
import Pagination from '../../../../utils/Pagination'
import Loader from '../../../../utils/Loader/Loader'
import { TfiCommentAlt } from "react-icons/tfi";

import { FaUsersViewfinder } from 'react-icons/fa6'

const StaffReport = () => {
    const nav = useNavigate();
    const location = useLocation();
    // Extract initial page from query parameters
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get("page")) || 1;
    const initialLimit = useMemo(
        () => parseInt(queryParams.get("limit")) || 10,
        [parseInt(queryParams.get("limit"))]
    );
    const [pageNumber, setPageNumber] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit || 10);
    const queryClient = useQueryClient();
    const { data: staffList, isLoading: isStaffLoad } = useQuery(
        ["staff-list-report-section", pageNumber],
        () => StaffServices.staffList(`?page=${pageNumber}&page_size=${limit}`),
        {
            refetchOnWindowFocus: false,
            select: (data) => {
                console.log("Data Franchise ", data?.data);
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

    useEffect(() => {
        setPageNumber(initialPage)
    }, [initialPage])

    return (
        <Wrapper>
            <div className="member-view-wrapper">
                <div className="common-db-head mb-4">
                    <Row className="align-items-center">
                        <Col md="6">
                            <FormGroup className="mb-0 mb-sm-0">
                                <Input id="select-all" type="checkbox" />
                                <Label for="select-all">Select All</Label>
                            </FormGroup>
                        </Col>
                        <Col md="6" className="text-end">
                            <Button className="btn btn-style1 mb-2 ms-2" >Add +</Button>
                            <Button className="btn btn-outline-style1 mb-2 ms-2">
                                Filter <VscFilter />
                            </Button>
                        </Col>
                    </Row>
                </div>
                {isStaffLoad ? (
                    <Loader />
                ) : staffList?.data?.results?.length == 0 ? (
                    <NoActiveDataFound msg="No Staff Found" />
                ) : <div className="common-table">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th></th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Phone Number
                                </th>
                                <th>
                                    Department
                                </th>

                                <th>

                                </th>

                            </tr>
                            <tr><br /></tr>
                        </thead>
                        <tbody>
                            {
                                staffList?.data?.results?.map((each) => {
                                    return <tr>
                                        {/* <td>
                        <FormGroup className="mb-0 mb-sm-0">
                            <Input id="select-all" type="checkbox" />
                        </FormGroup>
                    </td> */}
                                        <td>
                                            <div className="member-avatar online">
                                                <img className="img-fluid" src={
                                                    (each?.image_url &&
                                                        config?.apiUrl + each?.image_url) ||
                                                    staffimg
                                                } alt="" />
                                            </div>
                                        </td>
                                        <td>
                                            {each?.user?.first_name || "N/A"}{" "}
                                            {each?.user?.last_name || "N/A"}
                                            <p>({each?.code || "N/A"})</p>
                                        </td>
                                        <td>
                                            {each?.user?.email || "N/A"}
                                        </td>
                                        <td>
                                            {each?.phone_code} {each?.phone || "N/A"}
                                        </td>
                                        <td>
                                            {each?.department?.name}(
                                            {each?.department?.is_deleted
                                                ? "Inactive"
                                                : "Active"}
                                            )
                                        </td>

                                        <td>
                                            <Link to={"/report/staffreport/" + btoa(each?.id)} className="dark-blue-btn tb-edit"><TfiCommentAlt  /></Link>
                                        </td>

                                    </tr>
                                })

                            }



                        </tbody>
                    </Table>
                </div>}

                {!isStaffLoad && staffList?.data?.results?.length > 0 && (
                    <Pagination count={staffList?.data?.count} pageSize={initialLimit} />
                )}

            </div>
        </Wrapper>
    )
}

export default StaffReport
