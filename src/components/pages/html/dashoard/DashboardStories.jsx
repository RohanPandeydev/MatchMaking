import React, { useState } from 'react'
import Wrapper from '../../../layouts/Wrapper'
import Slider from 'react-slick';
import profileUser from "../../../../assets/images/no-images-available.jpg";
import storiesImg from "../../../../assets/images/bride-and-groom-list-img1.jpg";
import storiesImg2 from "../../../../assets/images/about-right-img1.jpg";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody } from 'reactstrap';
import { IoClose } from 'react-icons/io5';
import { HiDotsVertical } from 'react-icons/hi';

const DashboardStories = () => {
    let StoriesList = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
    
        responsive: [
          {
            breakpoint: 1299,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      };

      let StoriesModel = {
        dots: true,
        arrows: false,
        infinite: false,
        autoplay: true,
        pauseOnHover:true,
        autoplaySpeed: 8000,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 1250,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
    // stories modal
    const [toggleStories, setToggleStories] = useState(false);
    const handleStories = () => setToggleStories(!toggleStories);

    // 
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Wrapper>
      <div className="stories-wrap">
        <Slider {...StoriesList}>
            <div className="stories-lsd-items">
                <div className="stories-img-wrap" onClick={handleStories}>
                    <div className="stories-img">
                        <img className='img-fluid' src={storiesImg} alt="" />
                    </div>
                    <div className="profile-img">
                        <img className='img-fluid' src={profileUser} alt="" />
                    </div>
                    <div className="profile-name">
                        <h4>Rajkumar Saha</h4>
                    </div>
                </div>
            </div>
            <div className="stories-lsd-items">
                <div className="stories-img-wrap" onClick={handleStories}>
                    <div className="stories-img">
                        <img className='img-fluid' src={storiesImg} alt="" />
                    </div>
                    <div className="profile-img">
                        <img className='img-fluid' src={profileUser} alt="" />
                    </div>
                    <div className="profile-name">
                        <h4>Rajkumar Saha</h4>
                    </div>
                </div>
            </div>
            <div className="stories-lsd-items">
                <div className="stories-img-wrap" onClick={handleStories}>
                    <div className="stories-img">
                        <img className='img-fluid' src={storiesImg} alt="" />
                    </div>
                    <div className="profile-img">
                        <img className='img-fluid' src={profileUser} alt="" />
                    </div>
                    <div className="profile-name">
                        <h4>Rajkumar Saha</h4>
                    </div>
                </div>
            </div>
            <div className="stories-lsd-items">
                <div className="stories-img-wrap" onClick={handleStories}>
                    <div className="stories-img">
                        <img className='img-fluid' src={storiesImg} alt="" />
                    </div>
                    <div className="profile-img">
                        <img className='img-fluid' src={profileUser} alt="" />
                    </div>
                    <div className="profile-name">
                        <h4>Rajkumar Saha</h4>
                    </div>
                </div>
            </div>
            <div className="stories-lsd-items">
                <div className="stories-img-wrap" onClick={handleStories}>
                    <div className="stories-img">
                        <img className='img-fluid' src={storiesImg} alt="" />
                    </div>
                    <div className="profile-img">
                        <img className='img-fluid' src={profileUser} alt="" />
                    </div>
                    <div className="profile-name">
                        <h4>Rajkumar Saha</h4>
                    </div>
                </div>
            </div>
            <div className="stories-lsd-items">
                <div className="stories-img-wrap" onClick={handleStories}>
                    <div className="stories-img">
                        <img className='img-fluid' src={storiesImg} alt="" />
                    </div>
                    <div className="profile-img">
                        <img className='img-fluid' src={profileUser} alt="" />
                    </div>
                    <div className="profile-name">
                        <h4>Rajkumar Saha</h4>
                    </div>
                </div>
            </div>
        </Slider>
      </div>

        {/* Add New Ticket modal */}
        <Modal size="md" centered className="common-modal stories-modal" isOpen={toggleStories} toggle={handleStories}>
            <Button className="close-btn" onClick={handleStories}><IoClose /></Button>
            <ModalBody>
                <div className="stories-modal-slider-wrap">
                    <div className="stories-modal-user-profile">
                        <div className="profile-img">
                            <img className='img-fluid' src={profileUser} alt="" />
                        </div>
                        <div className="profile-name-code">
                            <h4>Rajkumar Saha</h4>
                            <h5><span className='member-code'>ABCD</span></h5>
                        </div>
                    </div>
                    <div className="stories-dropdown-wrap">
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle caret><HiDotsVertical /></DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Some Action</DropdownItem>
                                <DropdownItem>Delete</DropdownItem>
                                <DropdownItem>Archive</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <Slider {...StoriesModel}>
                        <div className="stories-lsd-items">
                            <img className='img-fluid' src={storiesImg} alt="" />
                        </div>
                        <div className="stories-lsd-items">
                            <img className='img-fluid' src={storiesImg} alt="" />
                        </div>
                        <div className="stories-lsd-items">
                            <img className='img-fluid' src={storiesImg} alt="" />
                        </div>
                    </Slider>
                </div>
            </ModalBody>
        </Modal>
    </Wrapper>
  )
}

export default DashboardStories
