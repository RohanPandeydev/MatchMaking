import React from 'react'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import Pagination from '../../../../utils/Pagination'
import Loader from '../../../../utils/Loader/Loader'
import NoActiveDataFound from '../../../../utils/NoActiveDataFound'
import moment from 'moment'
import { IsAccessibleMethod } from '../../../../guard/Rbac'
import PermissionSets from '../../../../guard/Method'
import parse from 'html-react-parser'
const ListingComment = ({ isReportList = false, isSuperUser, loggedInUserId, isCommentLoaded, commentListing, limit, handleDelete, handleEdit }) => {
    return (
        <>

            {
                isCommentLoaded ? <Loader /> : commentListing?.data?.results?.length == 0 ? <NoActiveDataFound msg={"No Comment Found"} /> : <ul> {commentListing?.data?.results?.map((each) => {

                    return <li>
                        <div className="staff-comment">
                            <div className="date-edit-del-wrap">

                                <div className="date">
                                    <h4>{
                                        each?.is_admin ? "Admin" : `${each?.masterstaff?.user?.first_name || null}(${each?.masterstaff?.code || null}) `
                                    }</h4>
                                    <h5>
                                        {moment(each?.created_at).isSame(moment(each?.updated_at), 'day')
                                            ? moment(each?.created_at).format("ll")
                                            : moment(each?.updated_at).format("ll")}
                                        <span>
                                            {moment(each?.created_at).isSame(each?.updated_at)
                                                ? moment(each?.created_at).local().format("hh:mm A")
                                                : moment(each?.updated_at).local().format("hh:mm A") + " (Edited)"}
                                        </span>
                                    </h5>
                                    <img className='img-fluid' src={each?.categoryoption?.image && each?.categoryoption?.image} />
                                </div>
                                {!isReportList && <div className="edit-del-btn">
                                    <IsAccessibleMethod
                                        pathname={window.location.pathname}

                                        methodName={
                                            PermissionSets.staff?.
                                                Comment?.Update
                                        }>



                                        {moment(each?.created_at).isSame(moment(), 'day') && <Button className="btn light-green-btn" onClick={() => handleEdit(each)}><FiEdit /></Button>}
                                    </IsAccessibleMethod>
                                    <IsAccessibleMethod
                                        pathname={window.location.pathname}

                                        methodName={
                                            PermissionSets.staff?.
                                                Comment?.Delete
                                        }>
                                        {moment(each?.created_at).isSame(moment(), 'day') && <Button onClick={() => handleDelete(each?.id)} className="btn  btn-outline-style1"><RiDeleteBinLine /></Button>}
                                    </IsAccessibleMethod>
                                </div>}
                            </div>
                            <p>{each?.content && parse(each?.content)}</p>
                        </div>
                    </li>
                })}
                </ul>
            }



            {!isCommentLoaded && commentListing?.data?.results?.length > 0 && (
                <Pagination count={commentListing?.data?.count} pageSize={limit} />
            )}
        </>
    )
}

export default ListingComment