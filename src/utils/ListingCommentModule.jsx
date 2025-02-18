import React, { useRef, useCallback, useEffect } from 'react'
import { FiEdit, FiPlus } from 'react-icons/fi'
import { IoCallOutline } from 'react-icons/io5'
import { RiDeleteBinLine } from 'react-icons/ri'
import userCatImg from '../assets/images/avatar-img.jpg'
import { Button } from 'reactstrap'
import NoActiveDataFound from './NoActiveDataFound'
import moment from 'moment'
import parse from 'html-react-parser'
import Loader from './Loader/Loader'
import StaffServices from '../services/StaffServices'
import { useInfiniteQuery } from '@tanstack/react-query'
import ValidateAuthenticationKey from './ValidationAuthenticationKey'
import ButtonLoader from './Loader/ButtonLoader'

const ListingCommentModule = ({ isFromMemberPanel = true, handleDeleteComment, handleEditComment, AddCommentTab, loggedInUserId, date, tenant = false, brideandgroom = false, isDate = false, query }) => {

    console.log(loggedInUserId, date, tenant, isDate, query, "loggedInUserId, date, tenant, isDate, query")
    const observerTarget = useRef(null)

    const fetchComments = async ({ pageParam = 1 }) => {
        let query = `?page=${pageParam}&page_size=2`
        // query += loggedInUserId ? `&masterstaff=${loggedInUserId}` : ""
        query += tenant ? `&tenant=${tenant}` : ""
        query += brideandgroom ? `&masterbrideandgroom=${brideandgroom}` : ""
        query += isDate ? `&created_at__date=${date}` : ""

        return StaffServices.commentList(query)
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        isLoading,
    } = useInfiniteQuery(
        ["comment-listing", loggedInUserId, date, tenant, isDate, query]
        ,
        fetchComments,
        {
            getNextPageParam: (lastPage, pages) => {
                const nextPage = pages.length + 1
                return nextPage <= Math.ceil(lastPage.data.count / 2) ? nextPage : undefined
            },
            refetchOnWindowFocus: false,
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
    )

    const handleObserver = useCallback((entries) => {
        const [target] = entries
        if (target.isIntersecting && hasNextPage) {
            fetchNextPage()
        }
    }, [fetchNextPage, hasNextPage])

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        })
        if (observerTarget.current) {
            observer.observe(observerTarget.current)
        }
        return () => observer.disconnect()
    }, [handleObserver])

    const getRoleDescription = (each) => {

        if (each?.masterstaff) {
            const firstName = each.masterstaff?.user?.first_name || "";
            const code = each.masterstaff?.code || "";
            return `${firstName} (${code})`;
        }
        if (!isFromMemberPanel && each?.tenantstaff) {
            const staffName = each.tenantstaff?.user?.first_name || "";
            const staffCode = each.tenantstaff?.code || "";
            const tenantName = each.tenant?.user?.first_name || "";
            const host = each.tenant?.host || "";
            const accountType = each.tenant?.account_type === "org" ? "Organization" : "Franchise";
            return `${staffName} (${staffCode}) ${tenantName} (${host} ${accountType} Staff)`;
        }
        if (!isFromMemberPanel && each?.tenant) {
            const tenantName = each.tenant?.user?.first_name || "";
            const host = each.tenant?.host || "";
            const accountType = each.tenant?.account_type === "org" ? "Organization" : "Franchise";
            return `${tenantName} (${host} ${accountType} Admin)`;
        }

        if (each?.is_admin) {
            return "Super Admin";
        }
        return "";
    };

    return (
        <>
            <div className="view-comment-inner-wrap">
                <div className="view-comment-wrap">
                    <ul>
                        {isLoading ? (
                            ""
                        ) : data?.pages[0]?.data?.results?.length === 0 ? (
                            <NoActiveDataFound msg={"No Comment Found"} />
                        ) : (
                            data?.pages.map((page, i) => (
                                <React.Fragment key={i}>
                                    {page.data.results.map((each) => {
                                        const roleDescription = getRoleDescription(each);


                                        return <li key={each.id}>
                                            <div className="view-comment-list">
                                                <div className='user-img'>
                                                    {each?.image ? (
                                                        <img
                                                            className='img-fluid'
                                                            src={each?.image}
                                                            alt={each?.name}
                                                        />
                                                    ) : <img
                                                        className='img-fluid'
                                                        src={userCatImg}
                                                        alt={each?.name}

                                                    />}

                                                </div>
                                                <div className='comment-right-wrap'>
                                                    <h4>


                                                        {
                                                            roleDescription
                                                        }



                                                        <span>{moment(each?.created_at).isSame(moment(each?.updated_at), 'day')
                                                            ? moment(each?.created_at).format("ll")
                                                            : moment(each?.updated_at).format("ll")}
                                                            <span>
                                                                {moment(each?.created_at).isSame(each?.updated_at)
                                                                    ? moment(each?.created_at).local().format("hh:mm A")
                                                                    : moment(each?.updated_at).local().format("hh:mm A") + " (Edited)"}
                                                            </span></span></h4>
                                                    <h6><img className='img-fluid' style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        marginRight: '10px',
                                                        objectFit: 'cover',
                                                        borderRadius: '50%',
                                                    }} src={each?.categoryoption?.image && each?.categoryoption?.image} /> {each?.categoryoption?.name} </h6>
                                                    {each?.content && parse(each?.content)}
                                                </div>

                                                {/*  */}
                                                {/* <h5>
                                                    {moment(each?.created_at).isSame(moment(each?.updated_at), 'day')
                                                        ? moment(each?.created_at).format("ll")
                                                        : moment(each?.updated_at).format("ll")}
                                                    <span>
                                                        {moment(each?.created_at).isSame(each?.updated_at)
                                                            ? moment(each?.created_at).local().format("hh:mm A")
                                                            : moment(each?.updated_at).local().format("hh:mm A") + " (Edited)"}
                                                    </span>
                                                </h5>
                                                <h4>{each?.content && parse(each?.content)}</h4>

                                                <p><div className="log-user">  {each?.image && (
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
                                                )}{
                                                        each?.is_admin ? "Admin" : `${each?.masterstaff?.user?.first_name || null}(${each?.masterstaff?.code || null}) `
                                                    }</div></p> */}

                                            </div>
                                            {/* <div className="member-created-date-title">
                                                <img className='img-fluid' src={each?.categoryoption?.image && each?.categoryoption?.image} />
                                            </div> */}

                                            {<div className="edit-del-btn">
                                                {moment(each?.created_at).isSame(moment(), 'day') && <Button className="btn light-green-btn" onClick={() => handleEditComment(each,)}><FiEdit /></Button>}
                                                {moment(each?.created_at).isSame(moment(), 'day') && <Button onClick={() => handleDeleteComment(each?.id)} className="btn  btn-outline-style1"><RiDeleteBinLine /></Button>}
                                            </div>}
                                        </li>
                                    }
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </ul>
                </div>
            </div>
            {isFetchingNextPage && <Loader />}
            <div ref={observerTarget} />
        </>
    )
}

export default ListingCommentModule

