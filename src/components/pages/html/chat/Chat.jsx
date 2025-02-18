import React, { useState } from 'react'
import Wrapper from '../../../layouts/Wrapper'
import profileUser from "../../../../assets/images/no-images-available.jpg";
import largeFavicon from "../../../../assets/images/large-favicon.png";
import StaffProfileUser from "../../../../assets/images/organization-avatar-img.jpg";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupText } from 'reactstrap';
import { HiDotsVertical } from 'react-icons/hi';
import { IoSearchOutline, IoSendSharp } from 'react-icons/io5';
import { GrAttachment } from 'react-icons/gr';
import { BiCheckDouble } from 'react-icons/bi';
import Slider from 'react-slick';

const Chat = () => {
    // 
    const [ChatProfiledropdownOpen, setChatProfileDropdownOpen] = useState(false);
    const ChatProfileToggle = () => setChatProfileDropdownOpen((prevState) => !prevState);

    let ChatMemberSlider = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        
        responsive: [
          {
            breakpoint: 1250,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      };
  return (
    <Wrapper>
        <section className='chat-system-body'>
            
            <div className="chat-system-wrapper">
                <div className='chat-stm-sidebar'>
                    <div className='chat-member-tab-wrap'>
                        <div className='chat-member-tab-inner-wrap'>
                            <ul>
                                <li>
                                    <Button className='chat-member-tab-btn active'>Organization</Button>
                                </li>
                                <li>
                                    <Button className='chat-member-tab-btn'>Franchise</Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='chat-sidebar-head'>
                        <div className='chat-staff-profile-wrap'>
                            <div className='staff-profile-img'>
                                <img className='img-fluid' src={StaffProfileUser} alt="" />
                            </div>
                            <div className='staff-info'>
                                <h4>Staff Name</h4>
                                <h5 className='staff-code'><span>NMGH245903</span></h5>
                            </div>
                        </div>
                        <div className='chat-search-wrap'>
                            <InputGroup>
                                <InputGroupText>
                                    <IoSearchOutline />
                                </InputGroupText>
                                <Input placeholder="username" />
                            </InputGroup>
                        </div>
                    </div>
                    <div className='chat-member-body'>
                        <div className='chat-member-list active'>
                            <div className='member-img'>
                                <img className='img-fluid' src={profileUser} alt="" />
                            </div>
                            <div className='member-name-msg'>
                                <h4>Rohan Kumar </h4>
                                <h5 className='member-code'><span>NMGH245903</span></h5>
                                <div className='last-message'><span className='seen'><BiCheckDouble /></span> Hello</div>
                            </div>
                            <div className='time-msg-count'>
                                <h5>08:05</h5>
                            </div>
                        </div>
                        <div className='chat-member-list'>
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
                        </div>
                        <div className='chat-member-list'>
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
                        </div>
                        <div className='chat-member-list'>
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
                        </div>
                        <div className='chat-member-list'>
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
                        </div>
                        <div className='chat-member-list'>
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
                        </div>
                        <div className='chat-member-list'>
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
                        </div>
                        <div className='chat-member-list'>
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
                        </div>
                        <div className='chat-member-list'>
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
                        </div>
                        <div className='chat-member-list'>
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
                        </div>
                        <div className='chat-member-list'>
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
                        </div>
                        <div className='chat-member-list'>
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
                        </div>
                        <div className='chat-member-list'>
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
                        </div>
                        <div className='chat-member-list'>
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
                        </div>
                        <div className='chat-member-list'>
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
                        </div>
                        <div className='chat-member-list'>
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
                        </div>
                    </div>
                </div>
                <div className='chat-stm-body'>
                    <div className='chat-start-screen-wrap'>
                        <div className='chat-start-message-wrap'>
                            <div className='logo'>
                                <img className='img-fluid' src={largeFavicon} alt="" />
                            </div>
                            <h4>Start a Converstation</h4>
                        </div>
                    </div>
                    {/* header */}
                    <div className='chat-body-head-wrap'>
                        <div className='chat-profile-left'>
                            <div className='chat-profile-wrap'>
                                <div className='prf-img'>
                                    <img className='img-fluid' src={profileUser} alt="" />
                                </div>
                                <div className='profile-details'>
                                    <h4>Praveen Bommannavar</h4>
                                    <h5><span>NMGH245903</span></h5>
                                </div>
                            </div>
                        </div>
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
                    {/* body start */}
                    <div className='message-body-wrap'>
                        <div className='receiver-message-wrap'>
                            <div className='receiver-message'>
                                <div className='message-text'>
                                    Hello
                                </div>
                                <div className='meassage-time'>10:15 </div>
                            </div>
                        </div>
                        <div className='receiver-message-wrap'>
                            <div className='receiver-message'>
                                <div className='message-text'>
                                    Hello
                                </div>
                                <div className='meassage-time'>10:15 </div>
                            </div>
                        </div>
                        <div className='receiver-message-wrap'>
                            <div className='receiver-message'>
                                <div className='message-text'>
                                    Hello
                                </div>
                                <div className='meassage-time'>10:15 </div>
                            </div>
                        </div>
                        <div className='receiver-message-wrap'>
                            <div className='receiver-message'>
                                <div className='message-text'>
                                    Hello
                                </div>
                                <div className='meassage-time'>10:15 </div>
                            </div>
                        </div>
                        <div className='receiver-message-wrap'>
                            <div className='receiver-message'>
                                <div className='message-text'>
                                    Hello
                                </div>
                                <div className='meassage-time'>10:15 </div>
                            </div>
                        </div>

                        <div className='sender-message-wrap'>
                            <div className='sender-message'>
                                <div className='message-text'>
                                    Hi suvendu
                                </div>
                                <div className='meassage-time'>10:15 <span className='seen'><BiCheckDouble /></span></div>
                            </div>
                        </div>
                        <div className='sender-message-wrap'>
                            <div className='sender-message'>
                                <div className='message-text'>
                                    Hi suvendu
                                </div>
                                <div className='meassage-time'>10:15 <span className='seen'><BiCheckDouble /></span></div>
                            </div>
                        </div>
                        <div className='sender-message-wrap'>
                            <div className='sender-message'>
                                <div className='message-text'>
                                    Hi suvendu
                                </div>
                                <div className='meassage-time'>10:15 <span className='seen'><BiCheckDouble /></span></div>
                            </div>
                        </div>

                        <div className='receiver-message-wrap'>
                            <div className='receiver-message'>
                                <div className='message-text'>
                                    Hello
                                </div>
                                <div className='meassage-time'>10:15 </div>
                            </div>
                        </div>
                    </div>
                    {/* body end */}
                    {/* chat footer */}
                    <div className='chat-footer'>
                        <div className='attach-file'>
                            <label className='attach-file-btn'>
                                <span className='icon'>
                                    <GrAttachment />
                                </span>
                                <Input
                                    className='chat-attach-input'
                                    name="chat-attach"
                                    type="file"
                                    />
                            </label>
                        </div>
                        <div className='chat-input'>
                            <Input
                            name="chat_message"
                            placeholder="Type a message here .."
                            type="text"
                            />
                        </div>
                        <div className='send-btn-wrap'>
                            <Button className='send-btn'>
                                <IoSendSharp />
                            </Button>
                        </div>
                    </div>
                    {/* chat footer end */}
                </div>
            </div>
        </section>
    </Wrapper>
  )
}

export default Chat
