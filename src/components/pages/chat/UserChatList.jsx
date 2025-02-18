import React from 'react'
import { BiCheckDouble } from 'react-icons/bi'
import profileUser from "../../../assets/images/no-images-available.jpg";
import WebSocketcustomContext from '../../../contexts/WebSocketContext';
import moment from 'moment';
import { useEffect } from 'react';
import customContext from '../../../contexts/Context';
import renderLastMessage from '../../../helper/RenderLastMessage';
import { MdMarkChatUnread } from 'react-icons/md';

const UserChatList = ({ userList, activeChatUser, handleClickUserChat,isUserLoad }) => {
    const { socketUserListing, setSocketUserListing, socketContext } = WebSocketcustomContext()
    const { userData } = customContext()
    const messages = socketContext?.messages;

    // console.log(socketUserListing, "pppp")


    // useEffect(() => {

    //     // console.log(data, "==========Data", socketUserListing)
    //     if (socketUserListing?.length == 0) return

    //     const results = (socketUserListing || []).map((row) => {
    //         if (String(row.user.id) === String(messages?.room)) {
    //             return {
    //                 ...row,
    //                 last_message: messages, // Update `last_message` if condition matches
    //             };
    //         }
    //         return row; // Return unchanged row otherwise
    //     });

    //     // console.log("results======", results);

    //     // Update state immutably
    //     setSocketUserListing(results);
    // }, [messages?.id, socketUserListing?.length])



    useEffect(() => {

        if (socketUserListing?.length == 0) return;

        const results = (socketUserListing || []).map((row) => {
            if (String(row?.user?.id) === String(messages?.room)) {
                if (messages.event_type == "read_message") {
                    if (String(userData?.id) == String(messages.receiver) || String(messages?.receiver) == "admin") {
                        console.log("read_message")
                        row.last_message.is_read = true
                    }
                }
                else if (messages.event_type == "send_message") {
                    console.log("send_message")
                    row.last_message = messages
                }
                return row;
            }
            return row;
        });

        setSocketUserListing(() => results);
    }, [messages, socketUserListing?.length]);


    return (
        <div className='chat-member-body'>
            {
              !isUserLoad &&  socketUserListing?.length == 0 ? <p>No Data Found</p> : socketUserListing?.map((each) => {
                    return <div key={each?.id} onClick={(e) => handleClickUserChat(e, each?.id, each)} className={each?.id == activeChatUser ? 'chat-member-list active' : 'chat-member-list'}>
                        <div className='member-img'>
                            <img className='img-fluid' src={each?.image_url && each?.image_url || profileUser} alt="" />
                        </div>
                        <div className='member-name-msg'>
                            <h4>{`${each?.name} (${each?.host})`}</h4>
                            <h5 className='member-code'><span>{each?.code || "SM"}</span></h5>
                            <div className="last-message">
                                {/* {each?.last_message && <div className='last-message'><span className='seen'></span> <p>{each?.last_message?.content}</p></div>} */}

                                <p>
                                    {each?.last_message ? (
                                        <>
                                            {
                                                renderLastMessage(each?.last_message, userData?.id)
                                            }
                                        </>
                                    ) : null}
                                </p>
                            </div>
                        </div>
                     {each?.last_message &&   <div className='time-msg-count'>
                            <h5>
                                {each?.last_message?.created_at &&
                                    moment(each?.last_message?.created_at).format('LT')}
                            </h5>
                            { !each?.last_message?.is_read && String(each?.last_message?.sender) !== String(userData?.id) ? (
                                        <span className="count">
                                            <MdMarkChatUnread />
                                        </span>
                                    ) : null}
                        </div>}
                    </div>
                })
            }

            {/* <div className='chat-member-list'>
                <div className='member-img'>
                    <img className='img-fluid' src={profileUser} alt="" />
                </div>
                <div className='member-name-msg'>
                    <h4>Rohan Kumar </h4>
                    <h5 className='member-code'><span>NMGH245903</span></h5>
                    <div className='last-message'><span className=''><BiCheckDouble /></span> Hello</div>
                </div>
                <div className='time-msg-count'>
                    <h5>08:05</h5>
                    <span className='count'>5</span>
                </div>
            </div> */}

        </div>
    )
}

export default UserChatList