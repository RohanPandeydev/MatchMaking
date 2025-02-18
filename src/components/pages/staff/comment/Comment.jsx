import React, { useMemo, useRef, useState } from 'react'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import ListingComment from './ListingComment'
import Wrapper from '../../../layouts/Wrapper'
import Editor from '../../../../utils/Editor'
import StorageData from '../../../../helper/storagehelper/StorageData'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import StaffServices from '../../../../services/StaffServices'
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom'
import ValidateAuthenticationKey from '../../../../utils/ValidationAuthenticationKey'
import moment from 'moment'
import ButtonLoader from '../../../../utils/Loader/ButtonLoader'
import PermissionSets from '../../../../guard/Method'
import { IsAccessibleMethod } from '../../../../guard/Rbac'
import parse from 'html-react-parser'
import { GrPowerReset } from 'react-icons/gr'
import { useEffect } from 'react'
import useFetchMasterSectionData from '../../../../helper/MasterSection'
import Select from 'react-select';
import useFetchMasterData from '../../../../helper/FetchMasterContent'
import config from '../../../../../config'

const Comment = () => {
    const [text, setText] = useState("");
    const [textErr, setTextErr] = useState("");
    const [editId, setEditId] = useState("")
    const queryClient = useQueryClient()
    const today = moment().format("YYYY-MM-DD");
    const [date, setDate] = useState(today)
    // Pagination
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get("page")) || 1;
    const [pageNumber, setPageNumber] = useState(initialPage);
    // const [img, setImg] = useState(false)
    const initialLimit = useMemo(
        () => parseInt(queryParams.get("limit")) || 10,
        [parseInt(queryParams.get("limit"))]
    );
    const [limit, setLimit] = useState(initialLimit || 10);
    const loggedInUserId = StorageData.getUserData()?.staffId
    const isSuperUser = StorageData.getUserData()?.is_superuser

    const [activityId, setActivityId] = useState({
        label: "Please Select Activity", value: ""
    })


    const handleSelectActivity = (e) => {

        setActivityId(e)
    }








    const handleEditorChange = (e) => {
        setText(e.htmlValue);
    };


    const handleSubmit = () => {
        if (!!!text) {
            setTextErr("Required");
            return;
        }
        if (!activityId?.value) {

            Swal.fire({
                title: "Error",
                text: "Activity required",
                icon: "error",
            });
            return;
        }

        const sendObj = {
            content: text,
            categoryoption: activityId?.value,

            is_admin: false,
            masterstaff: null
        }
        if (loggedInUserId) {
            sendObj.masterstaff = loggedInUserId;
        } else {
            sendObj.is_admin = true;
        }
        if (editId) {
            sendObj.id = editId
            sendObj.categoryoption = activityId?.value,
                UpdateComment?.mutate(sendObj)
            return
        }
        CommentModule.mutate(sendObj)
    }

    const CommentModule = useMutation(
        (formdata) => {
            return StaffServices.addComment(formdata);
        },
        {
            onSuccess: (data) => {
                Swal.fire({
                    title: "Successfull",
                    text: "Comment added ",
                    icon: "success",
                });
                setText("")
                setTextErr("")
                setActivityId({ label: "Please Select Activity", value: "" })
                queryClient.invalidateQueries("comment-listing");
                queryClient.refetchQueries(["comment-listing", pageNumber]);
            },
            onError: (err) => {
                Swal.fire({
                    title: "Error",
                    text: err?.response?.data?.error || err?.message,
                    icon: "error",
                });
                // alert(err?.response?.data?.error || err?.message);
            },
        }
    );
    const UpdateComment = useMutation(
        (formdata) => {
            return StaffServices.updateComment(formdata);
        },
        {
            onSuccess: (data) => {
                Swal.fire({
                    title: "Successfull",
                    text: editId ? "Comment updated" : "Comment added ",
                    icon: "success",
                });
                setEditId("")
                setText("")
                setTextErr("")
                setActivityId({ label: "Please Select Activity", value: "" })
                queryClient.invalidateQueries("comment-listing");
                queryClient.refetchQueries(["comment-listing", pageNumber]);
            },
            onError: (err) => {
                Swal.fire({
                    title: "Error",
                    text: err?.response?.data?.error || err?.message,
                    icon: "error",
                });
                // alert(err?.response?.data?.error || err?.message);
            },
        }
    );
    const CommentDelete = useMutation(
        (formdata) => {
            return StaffServices.deleteComment(formdata);
        },
        {
            onSuccess: (data) => {
                Swal.fire({
                    title: "Successfull",
                    text: "Comment deleted ",
                    icon: "success",
                });

                queryClient.invalidateQueries("comment-listing");
                queryClient.refetchQueries(["comment-listing", pageNumber]);
            },
            onError: (err) => {
                Swal.fire({
                    title: "Error",
                    text: err?.response?.data?.error || err?.message,
                    icon: "error",
                });
                // alert(err?.response?.data?.error || err?.message);
            },
        }
    );

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure you want to delete this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                // resetTimer()
                CommentDelete.mutate({ id: id });
            }
        });

    }

    const handleEdit = (each) => {
        // console.log(each)
        setEditId(each?.id)
        setText(each?.content)


        each?.categoryoption && setActivityId({
            value: each?.categoryoption?.id,
            label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {each?.categoryoption && (
                        <img
                            src={each?.categoryoption?.image}
                            alt={each?.categoryoption?.name}
                            style={{
                                width: '20px',
                                height: '20px',
                                marginRight: '10px',
                                objectFit: 'cover',
                                borderRadius: '50%',
                            }}
                        />
                    )}
                    <span>{each?.categoryoption?.name}</span>
                </div>
            ),
        })

    }
    const { data: commentListing, isLoading: isCommentLoaded } = useQuery(
        ["comment-listing", loggedInUserId, pageNumber, limit, date],
        () => {
            let query = `?page=${pageNumber}&page_size=${limit}&created_at__date=${date}`
            query += loggedInUserId ? `&masterstaff=${loggedInUserId}` : ""
            return StaffServices.commentList(query
            )
        },
        {

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


        setPageNumber(initialPage)
    }, [initialPage])

    const { data, isLoading } = useFetchMasterData(config.masterList[18], "all-commentactivity-list", '')

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
                            {date == today && <div className="staff-comment-form-wrap">
                                <div className="today-date-time">
                                    <h4>{moment().format('ll')}</h4>
                                    <h5>{moment().local().format('hh:mm A')}</h5>
                                </div>
                                {/* <div className="staff-comment-filter">
                                    <ul>
                                        <li>
                                            <FormGroup>
                                                <Input
                                                    id=""
                                                    name="date"
                                                    placeholder=""
                                                    type="date"
                                                />
                                            </FormGroup>
                                        </li>
                                    </ul>
                                </div> */}
                                <div className="staff-comment-area">
                                    <FormGroup className="common-formgroup">
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isDisabled={isLoading}
                                            isLoading={isLoading}
                                            onChange={handleSelectActivity}
                                            value={activityId}
                                            options={data?.map((each) => ({
                                                value: each?.id,
                                                label: (
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        {each?.image && (
                                                            <img
                                                                src={each?.image}
                                                                alt={each?.name}
                                                                style={{
                                                                    width: '20px',
                                                                    height: '20px',
                                                                    marginRight: '10px',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '50%',
                                                                }}
                                                            />
                                                        )}
                                                        <span>{each?.name}</span>
                                                    </div>
                                                ),
                                            }))}
                                        />
                                    </FormGroup>
                                    <FormGroup className="common-formgroup">

                                        <Editor
                                            text={text}
                                            setText={setText}
                                            handleEditorChange={handleEditorChange}
                                        />
                                    </FormGroup>



                                    {textErr && <p className="text-danger">{textErr}</p>}

                                    <div className="add-comment-btn">
                                        <IsAccessibleMethod
                                            methodName={
                                                PermissionSets.staff?.
                                                    Comment?.Create
                                            }
                                            pathname={window.location.pathname}
                                        >   <Button onClick={handleSubmit} disabled={CommentModule?.isLoading || UpdateComment?.isLoading} className="btn btn-style1">{CommentModule?.isLoading || UpdateComment?.isLoading ? <ButtonLoader /> : editId ? "Update Comment" : "Add Comment"}</Button>
                                        </IsAccessibleMethod>
                                    </div>
                                </div>
                            </div>}

                            <div className="comment-inner-wrap">
                                <ListingComment isSuperUser={isSuperUser} loggedInUserId={loggedInUserId} handleEdit={handleEdit} handleDelete={handleDelete} limit={limit} commentListing={commentListing} isCommentLoaded={isCommentLoaded} />
                                {/* <ul>
                            <li>
                                <div className="staff-comment">
                                    <div className="date-edit-del-wrap">
                                        <div className="date">
                                            <h5>24-09-2024 <span> Today 3:33PM</span></h5>
                                        </div>
                                        <div className="edit-del-btn">
                                            <Button className="btn light-green-btn"><FiEdit /></Button>
                                            <Button className="btn btn-outline-style1"><RiDeleteBinLine /></Button>
                                        </div>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad at minus tempora illum quae possimus expedita amet praesentium, tempore sit, delectus modi. Minima esse deleniti voluptate voluptates nemo laudantium assumenda!</p>
                                </div>
                            </li>
                            <li>
                                <div className="staff-comment">
                                    <div className="date-edit-del-wrap">
                                        <div className="date">
                                            <h5>24-09-2024 <span> Today 3:33PM</span></h5>
                                        </div>
                                        <div className="edit-del-btn">
                                            <Button className="btn light-green-btn"><FiEdit /></Button>
                                            <Button className="btn btn-outline-style1"><RiDeleteBinLine /></Button>
                                        </div>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad at minus tempora illum quae possimus expedita amet praesentium, tempore sit, delectus modi. Minima esse deleniti voluptate voluptates nemo laudantium assumenda! Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, tempora perferendis ipsam repellendus provident harum dolores autem dicta veniam sit eum aliquam totam consequatur est accusamus eligendi neque, quam eius!</p>
                                </div>
                            </li>
                            <li>
                                <div className="staff-comment">
                                    <div className="date-edit-del-wrap">
                                        <div className="date">
                                            <h5>24-09-2024 <span> Today 3:33PM</span></h5>
                                        </div>
                                        <div className="edit-del-btn">
                                            <Button className="btn light-green-btn"><FiEdit /></Button>
                                            <Button className="btn btn-outline-style1"><RiDeleteBinLine /></Button>
                                        </div>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad at minus tempora illum quae possimus expedita amet praesentium, tempore sit, delectus modi. Minima esse deleniti voluptate voluptates nemo laudantium assumenda! Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad at minus tempora illum quae possimus expedita amet praesentium, tempore sit, delectus modi. Minima esse deleniti voluptate voluptates nemo laudantium assumenda!</p>
                                </div>
                            </li>
                            <li>
                                <div className="staff-comment">
                                    <div className="date-edit-del-wrap">
                                        <div className="date">
                                            <h5>24-09-2024 <span> Today 3:33PM</span></h5>
                                        </div>
                                        <div className="edit-del-btn">
                                            <Button className="btn light-green-btn"><FiEdit /></Button>
                                            <Button className="btn btn-outline-style1"><RiDeleteBinLine /></Button>
                                        </div>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad at minus tempora illum quae possimus expedita amet praesentium, tempore sit, delectus modi. Minima esse deleniti voluptate voluptates nemo laudantium assumenda! Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, tempora perferendis ipsam repellendus provident harum dolores autem dicta veniam sit eum aliquam totam consequatur est accusamus eligendi neque, quam eius!</p>
                                </div>
                            </li>
                        </ul> */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </Wrapper>
    )
}

export default Comment
