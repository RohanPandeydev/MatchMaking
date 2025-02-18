import React, { useState } from 'react'
import MessageListing from './MessageListing'
import SendMessage from './SendMessage'
import profileUser from "../../../assets/images/no-images-available.jpg";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { HiDotsVertical } from 'react-icons/hi';
import config from '../../../../config';
import { useMutation, useQuery } from '@tanstack/react-query';
import ChatServices from '../../../services/ChatServices';
import ValidateAuthenticationKey from '../../../utils/ValidationAuthenticationKey';
import Swal from 'sweetalert2';
import customContext from '../../../contexts/Context';
import StorageData from '../../../helper/storagehelper/StorageData';
import Loader from '../../../utils/Loader/Loader';
import WebSocketcustomContext from '../../../contexts/WebSocketContext';
const UserChatDetails = ({ myId, activeChatUser, tabValue, myRoomId, setMyRoomId }) => {



    // 
    const [ChatProfiledropdownOpen, setChatProfileDropdownOpen] = useState(false);
    const ChatProfileToggle = () => setChatProfileDropdownOpen((prevState) => !prevState);
    const {userData}=customContext()
    const { socketContext } = WebSocketcustomContext();



    const { data: user_ChatDetails, isLoadUserChatDetails } = useQuery(
        ["chat-details", activeChatUser, tabValue],
        () => {
            return ChatServices.chatUserDetails({
                type: tabValue == "org" ? "organizations" : "account/franchise",
                id: activeChatUser
            });
        },
        {

            enabled: !!activeChatUser && !!tabValue,
            refetchOnWindowFocus: false,
            select: (data) => {
                console.log(data.data, "Franchise Details Data");
                // setChatDetails(() => data?.data)
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



    const allowedExtensions = [
        // '.doc', '.docx', '.pdf',
        '.jpg', '.jpeg', '.png'
        // , '.csv', '.xlsx',
        // '.mp4', '.mov', '.wmv', '.flv', '.avi', // Video extensions
        // '.mp3', '.wav', '.aac', '.flac',        // Audio extensions
        // '.ppt', '.pptx'                         // PowerPoint extensions
    ];

    const validateFile = (file) => {
        const MAX_FILE_SIZE_MB = 5;
        const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

        let isValid = true;
        let errorMessage = '';

        const fileNameParts = file.name.split('.');
        const extension = `.${fileNameParts[fileNameParts.length - 1]}`;

        if (!allowedExtensions.includes(extension.toLowerCase())) {
            isValid = false;
            errorMessage = `Invalid file extension: ${extension}`;
        } else if (file.size > MAX_FILE_SIZE_BYTES) {
            isValid = false;
            errorMessage = `File size exceeds ${MAX_FILE_SIZE_MB} MB`;
        }

        return { isValid, errorMessage };
    };

    const CONTENT_TYPE_MAP = {
        text: ["txt", "md"],
        image: ["jpg", "jpeg", "png", "gif", "bmp"],
        audio: ["mp3", "wav", "aac", "flac"],
        video: ["mp4", "mov", "wmv", "flv", "avi"],
        document: ["doc", "docx", "pdf", "csv", "xlsx", "ppt", "pptx"]
    };

    const getContentType = (extension) => {
        for (const [type, extensions] of Object.entries(CONTENT_TYPE_MAP)) {
            if (extensions.includes(extension)) {
                return type;
            }
        }
        return "document"; // Default to document if no match is found
    };

    const handleMediaUpload = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const { isValid, errorMessage } = validateFile(file);
            if (isValid) {
                if (e?.target?.files?.length === 0) return;

                const fileNameParts = file.name.split('.');
                const extension = fileNameParts[fileNameParts.length - 1]?.toLowerCase();
                const contentType = getContentType(extension); // Dynamically determine content type

                const formdata = new FormData();
                formdata.append("sender", userData?.id);
                formdata.append("doc_url", file);
                formdata.append("content_type", contentType); // Use dynamic content type
                formdata.append("room", user_ChatDetails?.user?.id);
                // formdata.append("room", activeTab === "admin" ? "admin" : user_ChatDetails?.brideandgroom?.user?.id);
                formdata.append("event_type", "send_message");

                mediaUpload.mutate(formdata);

                setErrors(''); // Clear errors if upload is valid
            } else {
                // setErrors(errorMessage); // Set validation errors
                Swal.fire({
                    title: "Error",
                    text: errorMessage,
                    icon: "error",
                });
                // alert(errorMessage)
            }
        }
    };
    const mediaUpload = useMutation((formdata) => {
        return ChatServices.chatMediaUpload(formdata)
    }, {
        onSuccess: (data) => {
            console.log(data?.data, "===media Upload")
            // const sendData = {
            //     sender: loggedInUserSocketId,
            //     room: String(receiverId == "admin" ? loggedInUserSocketId : receiverId),
            //     receiver: String(receiverId),
            //     content: message,
            //     content_type: "text",
            //     event_type: "send_message"
            // }

            // delete data?.data?.content
            const sendObj = {
                ...data?.data, event_type: "send_message", receiver: String( user_ChatDetails?.user?.id),
            }
            socketContext.sendMessage(sendObj)

console.log(sendObj,"sendObj========")

        },
        onError: (err) => {
            console.log("Error response data:", err.response?.data);

            // Check for specific error messages or provide a generic message
            const msg =
                err.response?.data?.email[0] ||
                "An unexpected error occurred. Please try again.";

            Swal.fire({
                title: "Error",
                text: msg,
                icon: "error",
            });

            return;
        },
    })




    return (
        <>
            {/* header */}
            <div className='chat-body-head-wrap'>
                {!isLoadUserChatDetails && <div className='chat-profile-left'>
                    <div className='chat-profile-wrap'>
                        <div className='prf-img'>
                            <img className='img-fluid' src={
                                (user_ChatDetails?.image_url &&
                                    `${config.apiUrl}${user_ChatDetails?.image_url}`) ||
                                profileUser
                            } alt="" />
                        </div>
                        <div className='profile-details'>
                            <h4>{user_ChatDetails?.name || ""}</h4>
                            <h5><span>{user_ChatDetails?.code || "N/A"}</span></h5>
                        </div>
                    </div>
                </div>}
                <div className='chat-right-option'>
                    <ul>
                        <li>
                            <Dropdown isOpen={ChatProfiledropdownOpen} toggle={ChatProfileToggle}>
                                <DropdownToggle caret><HiDotsVertical /></DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Some Action</DropdownItem>
                                    <DropdownItem>Delete</DropdownItem>
                                    <DropdownItem>Archive</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </div>
            {/* header end */}
            {<MessageListing roomId={user_ChatDetails?.user?.id} myId={myId}   isLoadUserChatDetails={isLoadUserChatDetails} />}
            <SendMessage allowedExtensions={allowedExtensions} mediaUpload={mediaUpload?.isLoading} handleMediaUpload={handleMediaUpload} receiverId={user_ChatDetails?.user?.id} />

        </>
    )
}

export default UserChatDetails