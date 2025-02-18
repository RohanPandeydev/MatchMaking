import { BiCheckDouble } from "react-icons/bi";
import { GoVideo } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineAudiotrack, MdOutlineInsertPhoto } from "react-icons/md";

const renderLastMessage = (lastMessage, loggedInUserSocketId) => {
    if (!lastMessage) return null;

    const { sender, is_read, content_type, content } = lastMessage;

    return (
        <>
            {sender === loggedInUserSocketId && (
                <span className={is_read ? "seen" : "read"}>
                    <BiCheckDouble />&nbsp;
                </span>
            )}
            {content_type === "text" ? (
                <span>{content}</span>
            ) : content_type === "image" ? (
                <span><MdOutlineInsertPhoto /> Image</span>
            ) : content_type === "audio" ? (
                <span><MdOutlineAudiotrack /> Audio</span>
            ) : content_type === "video" ? (
                <span><GoVideo /> Video</span>
            ) : content_type === "document" ? (
                <span><IoDocumentTextOutline /> Document</span>
            ) : (
                <span>Unknown Content</span>
            )}
        </>
    );
};

export default renderLastMessage;