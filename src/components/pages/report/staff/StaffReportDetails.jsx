import React, { useEffect, useMemo, useState } from 'react'
import Wrapper from '../../../layouts/Wrapper'
import moment from 'moment';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button, Col, FormGroup, Input, Row } from 'reactstrap';
import { GrPowerReset } from 'react-icons/gr';
import ListingComment from '../../staff/comment/ListingComment';
import Swal from 'sweetalert2';
import StaffServices from '../../../../services/StaffServices';
import ValidateAuthenticationKey from '../../../../utils/ValidationAuthenticationKey';
import { IsAccessibleMethod } from '../../../../guard/Rbac';
import Editor from '../../../../utils/Editor';

const StaffReportDetails = () => {
    const { id } = useParams()
    const today = moment().format("YYYY-MM-DD");
    const [date, setDate] = useState(today)
    const [myId, setMyId] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get("page")) || 1;
    const [pageNumber, setPageNumber] = useState(initialPage);

    const initialLimit = useMemo(
        () => parseInt(queryParams.get("limit")) || 10,
        [parseInt(queryParams.get("limit"))]
    );
    const [limit, setLimit] = useState(initialLimit || 10);





    const { data: commentListing, isLoading: isCommentLoaded } = useQuery(
        ["comment-listing-details_staffid", myId, pageNumber, limit, date],
        () => {
            let query = `?page=${pageNumber}&page_size=${limit}&created_at__date=${date}`
            query += myId ? `&masterstaff=${myId}` : ""

            return StaffServices.commentList(query
            )
        },
        {
            enabled: !!myId,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                const total = Math.ceil(data?.data?.count / 10);
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


    const handleDateFilter = (e) => {
        setDate(e?.target?.value)
    }

    const handleResetDateFilter = () => {
        setDate(today)
    }

    useEffect(() => {
        try {
            const decodeId = id && atob(id);
            console.log("decodeId", !!id, id);

            id && setMyId(() => decodeId || "");
        } catch (error) {
            // console.error("Error decoding user ID:", error.message);
            // Handle the error gracefully, e.g., display an error message to the user
        }
    }, [id]);



    return (
        <Wrapper>
            <section className="comment-wrapper">
                <div className="common-db-head mb-4">
                    <Row className="align-items-center">
                        <Col md="6">
                            <h5>Comment</h5>
                        </Col>
                        <Col md="6" className="text-end">
                            <div className="staff-comment-filter">
                                <ul>
                                    <li>

                                        <FormGroup>
                                            <Input
                                                value={date}
                                                onChange={handleDateFilter}
                                                id=""
                                                name="date"
                                                placeholder=""
                                                type="date"
                                                max={today}
                                            />
                                        </FormGroup>


                                    </li>
                                    <li>
                                        <Button className='btn btn-outline-style1' type='click' onClick={handleResetDateFilter}>
                                            <GrPowerReset />
                                        </Button>
                                    </li>
                                </ul>
                            </div>

                        </Col>
                    </Row>
                </div>


                <Row>
                    <Col xs="12" md="10" lg="8" className="offset-md-1 offset-lg-2">
                        <div className="staff-comment-wrap">


                            <div className="comment-inner-wrap">
                                <ListingComment isReportList={true} isSuperUser={false} loggedInUserId={false} handleEdit={false} handleDelete={false} limit={limit} commentListing={commentListing} isCommentLoaded={isCommentLoaded} />

                            </div>
                        </div>
                    </Col>
                </Row>



            </section>


        </Wrapper>
    )
}

export default StaffReportDetails