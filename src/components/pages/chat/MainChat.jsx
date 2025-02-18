import React, { useEffect, useMemo } from 'react'
import Wrapper from '../../layouts/Wrapper'
import UserChatProfile from './UserChatProfile'
import UserChatList from './UserChatList'
import UserChatSearch from './UserChatSearch'
import UserChatDetails from './UserChatDetails'
import { Button, NavLink, Nav, NavItem } from 'reactstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import classnames from "classnames";
import StorageData from '../../../helper/storagehelper/StorageData'
import ShareDataServices from '../../../services/ShareDataServices'
import ChatServices from '../../../services/ChatServices'
import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import ValidateAuthenticationKey from '../../../utils/ValidationAuthenticationKey'
import customContext from '../../../contexts/Context'
import Loader from '../../../utils/Loader/Loader'
import WebSocketcustomContext from '../../../contexts/WebSocketContext'
import bodyImg from '../../../assets/images/login-couple-img.png'

const MainChat = () => {
    const loggedInUserDetails = StorageData.getUserData()
    const { setChatDetails, userData } = customContext()
    const { socketUserListing, setSocketUserListing, socketContext } = WebSocketcustomContext()
    const [search, setSearch] = useState("")

    const { id } = useParams()
    const [myId, setMyId] = useState("")
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get("page")) || 1;
    const initialTabValue = queryParams.get("tab");
    const [activeChatUser, setActiveUserChat] = useState("")
    // const [shareType, setShareType] = useState("")
    // const [userChatDetails,setUserChatDetails]=useState(false)
    const initialLimit = useMemo(
        () => parseInt(queryParams.get("limit")) || 10,
        [parseInt(queryParams.get("limit"))]
    );
    const [activeTab, setActiveTab] = useState(initialTabValue || "Organization");
    const [tabValue, setTabValue] = useState("");
    const [myRoomId, setMyRoomId] = useState("")

    const tabs = [
        {
            id: 1,
            value: "org",
            name: "Organization",
        },
        {
            id: 2,
            value: "franchise",
            name: "Franchise",
        },

    ];

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const toggleTab = (tab, value, name) => {
        if (activeTab !== name) {
            setTabValue(value);
            setActiveUserChat("")
            setMyRoomId("")
            setSearch("")
            const currentUrl = new URL(window.location.href);
            // const queryParams = currentUrl.search; // Get existing query parameters, if any

            // Construct the new path while preserving query parameters
            queryParams.set("tab", name);
            navigate(`/chat?${queryParams.toString()}`);
            // const newPath = `/chat${queryParams}`;
            // navigate(newPath);

            setActiveTab(name);
        }
    };


    useEffect(() => {
        try {
            const decodeId = id && atob(id);
            // id && setMyId(() => decodeId || "");
            id && setActiveUserChat(() => decodeId || "");
        } catch (error) {
            // console.error("Error decoding user ID:", error.message);
            // Handle the error gracefully, e.g., display an error message to the user
        }
    }, [id]);


    useEffect(() => {
        if (activeTab) {
            const findValue = tabs.find((each) => each?.name == activeTab)
            setTabValue(findValue?.value)
        }
    }, [activeTab])

    const handleClickUserChat = (e, id, data) => {
        // setMyId(id);
        setActiveUserChat(() => id);
        // setChatDetails(() => data)
        // setUserChatDetails(each)
        const currentUrl = new URL(window.location.href);
        const queryParams = currentUrl.search; // Get existing query parameters, if any

        // Construct the new path while preserving query parameters
        const newPath = `/chat/${btoa(id)}${queryParams}`;
        navigate(newPath);
    };

    const {
        data: userList,
        isLoading: isUserLoad,
        isError,
        error,
        refetch,
    } = useQuery(
        ["chat-user-listing", tabValue, search],
        () => {

            let queryParams = [];

            if (tabValue) {
                queryParams.push('account_type=' + tabValue);
            }
            if (search) {
                queryParams.push('search=' + search);
            }

            const formattedQueryParams = queryParams.length ? '?' + queryParams.join('&') : '';


            return ChatServices.chatUserListing(formattedQueryParams)
        },
        {
            enabled: !!tabValue,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                // console.log("DataOrganization", data?.data);
                // StorageData.setData(data?.data?.data?.users);
                // setSocketUserListing(() => data?.data)
                if (data?.data) {
                    const sortedData = data.data
                        .slice() // Create a shallow copy to avoid mutating the original array
                        .sort((a, b) => {
                            // Handle null `last_message` by placing them at the bottom
                            if (!a.last_message?.created_at) return 1;
                            if (!b.last_message?.created_at) return -1;
            
                            // Sort by `created_at` in descending order
                            const dateA = new Date(a.last_message.created_at);
                            const dateB = new Date(b.last_message.created_at);
                            return dateB - dateA;
                        });
            
                        setSocketUserListing(sortedData);
                }
                // return data?.data;
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


    // console.log(socket,"=========")

    useEffect(() => {
        setSocketUserListing(userList?.data)
    }, [isUserLoad])

    return (
        <Wrapper>
            <section className='chat-system-body'>

                <div className="chat-system-wrapper">
                    <div className='chat-stm-sidebar'>
                        <div className='chat-member-tab-wrap'>
                            <div className='chat-member-tab-inner-wrap'>

                                <Nav tabs>
                                    {tabs?.map((ele) => {
                                        return (
                                            <NavItem key={ele?.id || ele?.name}>
                                                <NavLink
                                                    className={classnames("chat-member-tab-btn", {
                                                        active: activeTab === ele?.name,
                                                    })}
                                                    onClick={() => toggleTab(ele?.id, ele?.value, ele?.name)}
                                                >
                                                    {ele?.name}
                                                </NavLink>
                                            </NavItem>
                                        );
                                    })}
                                </Nav>
                            </div>
                        </div>
                        <div className='chat-sidebar-head'>
                            <UserChatProfile loggedInUserDetails={loggedInUserDetails} />
                            <UserChatSearch handleSearch={handleSearch} search={search} />
                        </div>
                        {isUserLoad ? <Loader /> : <UserChatList  isUserLoad={isUserLoad}activeChatUser={activeChatUser} handleClickUserChat={handleClickUserChat} userList={userList} />}
                    </div>
                    <div className='chat-stm-body'>
                        {socketContext?.isConnected && activeChatUser ?
                            <> {isUserLoad ? <Loader /> : <UserChatDetails myId={activeChatUser} activeChatUser={activeChatUser} myRoomId={myRoomId} setMyRoomId={setMyRoomId} tabValue={tabValue} />}
                            </> : <div className='chat-start-screen-wrap'>
                                <div className='chat-start-message-wrap'>
                                    <div className='logo'>
                                        <img className='img-fluid' src={bodyImg} alt="" />
                                    </div>
                                    <h4>Start a Converstation</h4>
                                </div>
                            </div>}
                    </div>
                </div>
            </section>
        </Wrapper>
    )
}

export default MainChat