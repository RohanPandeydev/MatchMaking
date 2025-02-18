import React, { useRef, useCallback } from "react";
import { BiCheckDouble } from "react-icons/bi";
import WebSocketcustomContext from "../../../contexts/WebSocketContext";
import { useEffect } from "react";
import { useState } from "react";
import customContext from "../../../contexts/Context";
import moment from "moment/moment";
import ValidateAuthenticationKey from "../../../utils/ValidationAuthenticationKey";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";
import ChatServices from "../../../services/ChatServices";
import { string } from "yup";
import renderContentByType from "../../../helper/ContentRenderChat";

const MessageListing = ({ roomId, isLoadUserChatDetails, myId }) => {
    const { socketContext, setSocketUserListing, socketUserListing } = WebSocketcustomContext();

    const { userData } = customContext();
    const [chatMessages, setChatMessages] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const observerRef = useRef();
    const scrollContainerRef = useRef(null);
    const prevScrollHeightRef = useRef(0);
    const processedMessagesRef = useRef(new Set()); // Track processed message IDs
    const loadingRef = useRef(false); // Add this to prevent multiple simultaneous loads

    const {
        data: chatData,
        isLoading: isUserChatLoad,
        isFetchingNextPage,
    } = useQuery(
        ["chat-user-details-message", myId, pageNumber, roomId],  // Added roomId to query key
        () => {
            let queryParams = `?page=${pageNumber}&page_size=${20}`;
            queryParams += `&room=${roomId}`;
            return ChatServices.fetchUserChat(queryParams);
        },
        {
            enabled: !!roomId && isLoadUserChatDetails,
            refetchOnWindowFocus: false,
            select: (data) => {
                return { ...data?.data, results: data?.data?.results?.slice().reverse() };
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

    // Preserve scroll position
    const preserveScroll = useCallback(() => {
        if (scrollContainerRef.current && !isFirstLoad) {
            const newScrollHeight = scrollContainerRef.current.scrollHeight;
            const scrollDiff = newScrollHeight - prevScrollHeightRef.current;
            scrollContainerRef.current.scrollTop += scrollDiff;
        }
        prevScrollHeightRef.current = scrollContainerRef.current?.scrollHeight || 0;
    }, [isFirstLoad]);

    const scrollToBottom = useCallback(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop =
                scrollContainerRef.current.scrollHeight;
        }
    }, []);

    // Reset state when room changes
    useEffect(() => {
        setPageNumber(1);
        setChatMessages([]);
        setIsFirstLoad(true);
        setHasMore(true);
        processedMessagesRef.current.clear();
    }, [roomId]);

    // Last message observer
    const lastMessageRef = useCallback(
        (node) => {
            if (isUserChatLoad || isFirstLoad) return; // Avoid triggering during first load
            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    prevScrollHeightRef.current = scrollContainerRef.current?.scrollHeight || 0;
                    setPageNumber((prev) => prev + 1);
                }
            });

            if (node) observerRef.current.observe(node);
        },
        [isUserChatLoad, hasMore, isFirstLoad]
    );
    // Handle new socket messages
    useEffect(() => {
        const messages = socketContext?.messages;
        const handleNewMessage = () => {
            if (!messages) return; // Skip if messages is null or undefined

            let shouldAddMessage = false;

            shouldAddMessage =
                roomId == String(messages?.room);


            // console.log(shouldAddMessage, "shouldAddMessage");
            // console.log("chatMessages", chatMessages);

            if (shouldAddMessage) {
                messages.id && processedMessagesRef.current.add(messages.id);

                // console.log("Before Switch", messages, messages.event_type);

                switch (messages.event_type) {
                    case "read_message":
                        console.log("In read_message", messages, messages.event_type);

                        // if (messages.id) {
                        //     // Update specific message as read
                        //     setChatMessages((prev) =>
                        //         prev.map((each) =>
                        //             each.id === messages.id
                        //                 ? { ...each, is_read: true }
                        //                 : each
                        //         )
                        //     );
                        // } else if (messages.sender && messages.receiver) {
                        //     console.log("In read_message else", messages, messages.event_type);

                        //     // Update based on sender and receiver if no ID is provided
                        //     setChatMessages((prev) =>
                        //         prev.map((each) => { return { ...each, is_read: true } }

                        //         )
                        //     );
                        // } else {
                        //     console.warn("read_message event is missing both id and sender/receiver context", messages);
                        // }

                        setChatMessages((prev) =>
                            prev.map((each) => {
                                return { ...each, is_read: true };
                            })
                        );
                        break;


                    case "send_message":
                        // console.warn("messages", messages);
                        setChatMessages((prev) => {
                            const messageExists = prev.some((msg) => msg.id === messages.id);
                            if (messageExists) return prev;
                            return [...prev, messages];
                        });


                        break;

                    default:
                        console.warn("Unhandled event type:", messages.event_type);
                }



                setTimeout(scrollToBottom, 100);
            }
        };

        handleNewMessage()



    }, [socketContext?.messages]);

    // Handle chat data updates
    // useEffect(() => {
    //     if (chatData?.results?.length) {
    //         const newMessages = chatData.results.filter(
    //             (msg) => !processedMessagesRef.current.has(msg.id)
    //         );

    //         newMessages.forEach((msg) => processedMessagesRef.current.add(msg.id));

    //         if (isFirstLoad) {
    //             setChatMessages(newMessages);
    //             setIsFirstLoad(false);
    //             setTimeout(scrollToBottom, 100); // Focus on last message after initial load
    //         } else {
    //             setChatMessages((prev) => [...newMessages, ...prev]);
    //             setTimeout(preserveScroll, 100); // Preserve scroll position on subsequent loads
    //         }

    //         setHasMore(chatData.results.length === 10);
    //     } else if (!isUserChatLoad && chatData?.results?.length === 0) {
    //         setHasMore(false);
    //     }
    // }, [chatData?.results, isUserChatLoad]);

    // Handle scroll events for pagination
    useEffect(() => {
        const handleScroll = () => {
            const container = scrollContainerRef.current;
            if (!container || loadingRef.current || !hasMore || isFirstLoad) return;

            // Check if we're near the top of the container
            if (container.scrollTop < 100) {
                loadingRef.current = true;
                prevScrollHeightRef.current = container.scrollHeight;
                setPageNumber((prev) => prev + 1);
            }
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, [hasMore, isFirstLoad]);





    useEffect(() => {
        if (!chatData) return;

        const handleChatDataUpdate = () => {
            if (chatData?.results?.length) {
                if (isFirstLoad) {
                    setChatMessages(chatData.results);
                    setIsFirstLoad(false);
                    setTimeout(scrollToBottom, 100);
                } else {
                    setChatMessages(prevMessages => {
                        // Create a Map of existing messages by ID
                        const existingMessagesMap = new Map(
                            prevMessages.map(msg => [msg.id, msg])
                        );

                        // Add new messages that don't exist in the current state
                        chatData.results.forEach(newMsg => {
                            if (!existingMessagesMap.has(newMsg.id)) {
                                existingMessagesMap.set(newMsg.id, newMsg);
                            }
                        });

                        // Convert back to array and sort by creation time if needed
                        return Array.from(existingMessagesMap.values());
                    });
                    setTimeout(preserveScroll, 100);
                }

                setHasMore(chatData.results.length === 10);
                loadingRef.current = false;
            } else if (!isUserChatLoad && chatData?.results?.length === 0) {
                setHasMore(false);
                loadingRef.current = false;
            }
        };

        handleChatDataUpdate();
    }, [chatData, isUserChatLoad, roomId]);



    useEffect(() => {
        // socketContext.markMessageAsRead({
        //     sender: myId,
        //     receiver: roomId,
        // });
        setSocketUserListing((currnt) => {
            return currnt.map((row) => {
                if (row?.user?.id == roomId) {
                    if (row?.last_message?.sender == roomId) {
                        row.last_message.is_read = true
                    }
                    return row;
                }
                return row;
            });
        });

    }, [roomId])


    const handleMediaUpload = (e) => {
        if (e?.target?.files?.length == 0) return

    }


    const fileUpload = useMutation((formdata) => {
        return
    })

    useEffect(() => {
        if (!userData?.id || !roomId) return
        // console.log("markMessageAsRead", roomId, userData?.id)
        socketContext.markMessageAsRead({
            sender: userData?.id,
            receiver: String(roomId),
            room:String(roomId)
        });
        console.log("markMessageAsRead", roomId, userData?.id)
        setSocketUserListing((currnt) => {
            return currnt.map((row) => {
                if (row?.user?.id == roomId) {
                    if (row?.last_message?.sender == roomId) {
                        row.last_message.is_read = true
                    }
                    return row;
                }
                return row;
            });
        });

    }, [roomId])


    useEffect(() => {
        if (!userData?.id || !roomId) return

        if (socketContext?.messages?.event_type == "send_message") {
            console.log(socketContext?.messages, userData?.id, "InSide Message Listing")
            if (String(socketContext?.messages?.sender) !== String(userData?.id)  ) {
                if (String(roomId) === String(socketContext?.messages?.room)) {
                    socketContext.markMessageAsRead({
                        sender: userData?.id,
                        receiver: String(roomId),
                        room:String(roomId)
                    });
                    const results = (socketUserListing || []).map((row) => {
                        if (String(row?.user?.id) === String(socketContext?.messages?.room)) {
                            row.last_message.is_read = true
                            return row;
                        }
                        return row;
                    });
                    setSocketUserListing(() => results);
                }
            }
        }

    }, [socketContext?.messages])

    return (
        <React.Fragment>
            <div
                className="message-body-wrap"
                id="rightWrapTwo"
                ref={scrollContainerRef}
            >
                {/* Loading indicator */}
                {isUserChatLoad && (
                    <div className="text-center p-4">Loading messages...</div>
                )}

                {/* No messages indicator */}
                {!isUserChatLoad && chatMessages.length === 0 && (
                    <div className="text-center p-4">No messages found</div>
                )}

                {/* Load more messages indicator */}
                {!isUserChatLoad && hasMore && (
                    <div ref={lastMessageRef} className="text-center p-2 text-gray-500">
                        {isFetchingNextPage ? "Loading more..." : "Scroll for more"}
                    </div>
                )}

                {/* No more messages indicator */}
                {!isUserChatLoad && !hasMore && chatMessages.length > 0 && (
                    <div className="text-center p-2 text-gray-500">
                        No more messages to load
                    </div>
                )}

                {/* Messages */}
                {chatMessages?.map((each, index) => {
                    if (!(each.sender == roomId)) {
                        return (
                            <div key={each.id || index} className="sender-message-wrap">
                                <div className="sender-message">
                                    {renderContentByType(each)}
                                    {/* <div className="message-text">{each?.content}</div>
                                    <div className="meassage-time">
                                        {each?.created_at &&
                                            moment(each?.created_at).format("LT")}
                                    </div> */}
                                    <div className="meassage-time">
                                        {each?.created_at && moment(each?.created_at).format("LT")}
                                        <span className={each?.is_read ? "seen" : "read"}>
                                            <BiCheckDouble />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div key={each.id || index} className="receiver-message-wrap">
                                <div className="receiver-message">
                                    {renderContentByType(each)}
                                    <div className="meassage-time">
                                    {each?.created_at && moment(each?.created_at).format("LT")}
                                        </div>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </React.Fragment>
    );
};

export default MessageListing;