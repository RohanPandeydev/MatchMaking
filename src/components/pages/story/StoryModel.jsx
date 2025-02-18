import React from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody } from 'reactstrap';
import profileUser from "../../../assets/images/no-images-available.jpg"; 
import storiesImg from "../../../assets/images/bride-and-groom-list-img1.jpg";
import { IoClose } from 'react-icons/io5';
import { HiDotsVertical } from 'react-icons/hi';
import Slider from 'react-slick';

const StoryModel = ({ handleDelete, story, handleCloseStoryModel, StoriesModel, handleStoryModel, toggleStoriesModel, dropdownOpen, handleToggleDropdown }) => {




    return (
        <>
            <Modal backdrop={false} size="md" centered className="common-modal stories-modal" isOpen={toggleStoriesModel} toggle={handleStoryModel}>
                <Button className="close-btn" onClick={handleCloseStoryModel}><IoClose /></Button>
                <ModalBody >
                    {!story ? "Loading" : <div className="stories-modal-slider-wrap">
                        <div className="stories-modal-user-profile">
                            <div className="profile-img">
                                <img className='img-fluid' src={(story?.photos?.length && story?.photos[0].upload_url) || profileUser} alt="" />
                            </div>
                            <div className="profile-name-code">
                                <h4>{story?.user?.first_name} {story?.user?.last_name}</h4>
                                <h5><span className='member-code'>{story?.code || ""}</span></h5>
                            </div>
                        </div>
                        <div className="stories-dropdown-wrap">
                            <Dropdown isOpen={dropdownOpen} toggle={handleToggleDropdown}>
                                <DropdownToggle caret><HiDotsVertical /></DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Some Action</DropdownItem>
                                    <DropdownItem onClick={(e) => handleDelete(e, story)}> Delete</DropdownItem>
                                    <DropdownItem>Archive</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <Slider {...StoriesModel}>
                            {
                                story?.stories?.map((each) => {
                                    return <div className="stories-lsd-items">
                                        <img className='img-fluid' src={(each?.upload_url) || storiesImg} alt="" />
                                        <p>{story?.message || "  , mn     "}</p>
                                    </div>
                                })
                            }

                      
                        </Slider>
                    </div>}
                </ModalBody>
            </Modal>
        </>
    )
}

export default StoryModel