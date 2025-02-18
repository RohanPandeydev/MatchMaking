import React from 'react'
import { GrAttachment } from 'react-icons/gr'
import { IoSendSharp } from 'react-icons/io5'
import { Button, Input } from 'reactstrap'
import WebSocketcustomContext from '../../../contexts/WebSocketContext'
import { useState } from 'react'
import customContext from '../../../contexts/Context'
import ButtonLoader from '../../../utils/Loader/ButtonLoader'

const SendMessage = ({ receiverId,handleMediaUpload,mediaUpload,allowedExtensions}) => {
    const { socketContext } = WebSocketcustomContext();

    const { userData } = customContext()
    const [message, setMessage] = useState("")
    const [errors,setErrors]=useState("")
    const handleChangeMessage = (e) => {
        setMessage(e?.target?.value)
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        const sendData = {
            sender: userData?.id,
            room: String(receiverId),
            receiver: String(receiverId),
            content: message,
            content_type:"text",
            event_type: "send_message"
        }

        console.log(sendData,"sendData")

        

        socketContext.sendMessage(sendData)
        setMessage("")
    }


    


    return (
        <>
            {/* chat footer */}
            <form onSubmit={handleSendMessage}>
            <div className='chat-footer'>
             {mediaUpload?<ButtonLoader/>:   <div className='attach-file'>
                    <label className='attach-file-btn'>
                        <span className='icon'>
                            <GrAttachment />
                        </span>
                        <Input
                            className='chat-attach-input'
                            name="chat-attach"
                            type="file"
                            onChange={handleMediaUpload}
                            accept={allowedExtensions}
                        />
                    </label>
                </div>}
               
                    <div className='chat-input'>
                        <Input
                            name="chat_message"
                            value={message}
                            onChange={handleChangeMessage}
                            placeholder="Type a message here .."
                            type="text"
                        />
                    </div>
                    <div className='send-btn-wrap'>
                        <Button className='send-btn' disabled={!!!message} type='submit'>
                            <IoSendSharp />
                        </Button>
                    </div>
            </div>
                </form>
            {/* chat footer end */}
        </>
    )
}

export default SendMessage