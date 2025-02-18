import React, { useState } from 'react'
import Wrapper from '../../layouts/Wrapper'
import profileUser from "../../../assets/images/no-images-available.jpg";
import uploadShadow from "../../../assets/images/upload-shadow-img.png";
import { LuMailOpen, LuPlus } from 'react-icons/lu';
import { IoCallOutline, IoClose } from 'react-icons/io5';
import { Button, Col, Collapse, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import { AiOutlineDislike, AiOutlineEdit, AiOutlineLike } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';
import { HiMinus } from 'react-icons/hi';
import Slider from 'react-slick';
import { ImCrop } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
const ProfileDetails = () => {
  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState('closed');
  

  const onEntering = () => setStatus('opening...');
  const onEntered = () => setStatus('opened');
  const onExiting = () => setStatus('Closing...');
  const onExited = () => setStatus('closed');
  const toggle = () => setCollapse(!collapse);

  // update modal
  const [toggleVerifyModel, setToggleVerifyModel] = useState(false);
  const handleVerifyModel = () => setToggleVerifyModel(!toggleVerifyModel);

  var UploadPicturesSlider = {
      dots: false,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1850,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 1250,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };


  // Handle Accordian toggle


  return (
    <Wrapper>
      <div className="profile-details-wrapper">
        <div className="profile-details-sidebar">
          <div className="profile-details-sidebar-innerwrap">

            <div className="profile-dtls-prof-info-wrap">
              <div className="profile-dtls-prof-img offline">
                <div className="prof-img">
                  <img className="img-fluid" src={profileUser} alt="" />
                </div>
              </div>
              <div className="profile-dtls-prof-info">
                <h3>Praveen Bommannavar</h3>
                <h5>NMGH245903</h5>
                <p><LuMailOpen /> <a href="mailto:praveen@gmail.com">praveen@gmail.com</a></p>
                <p><IoCallOutline /> <a href="tel:+1 9568 2356">+1 9568 2356</a></p>
                <Button className="btn btn-outline-style1" onClick={handleVerifyModel}>Click To Verify</Button>
              </div>
            </div>
            <div className="profile-dtls-button-wrap">
              <Button className="blue-btn">Add Ticket</Button>
              <Button className="aqua-btn">View Ticket</Button>
              <Button className="lemon-green-btn">Add Comment</Button>
              <Button className="orange-btn">View Comment</Button>
              <Button className="purple-btn">Approved As Paid</Button>
              <Button className="btn-outline-style1">Send Quick Email </Button>
              <Button className="aqua-btn">Edit Member </Button>
              <Button className="blue-btn">Quick Edit Member </Button>
              <Button className="dark-blue-btn">Match Report </Button>
              <Button className="aqua-btn">Match Making </Button>
              <Button className="lemon-green-btn">Auto Field </Button>
              <Button className="orange-btn">Make Personalized </Button>
              <Button className="btn-outline-style1">Delete </Button>
              <Button className="green-btn">Inactive </Button>
              <Button className="blue-btn">Select Staff </Button>
              <Button className="dark-blue-btn">Assign Staff </Button>
              <Button className="aqua-btn">Unassigned Staff </Button>
            </div>
          
          </div>

        </div>

        <div className="profile-details-body">
            <div className="profile-details-accordion-list">
              <div className="profile-dtls-accordion-head">
                <div className="left-heading">
                  <h4>Uploaded Pictures</h4>
                </div>
                <div className="toggle-btn">
                  <Button className={status} onClick={toggle}>
                  <span className="plus"><FiPlus /></span>
                  <span className="minus"><HiMinus /></span>
                    
                    
                    
                  </Button>
                </div>
              </div>
              
              <Collapse isOpen={collapse}
                onEntering={onEntering}
                onEntered={onEntered}
                onExiting={onExiting}
                onExited={onExited} >
                  <div className="profile-details-accordion-body upload-pictures-wrap">
                    <Slider {...UploadPicturesSlider}>
                      <div className="upload-pictures-items">
                        <div className="upload-image-box">
                          <div className="upload-img">
                            <img className="img-fluid" src={profileUser} alt="" />
                          </div>
                          <Button className="blue-btn edit-btn"><AiOutlineEdit /></Button>
                          <Button className="lemon-green-btn crop-btn"><ImCrop /></Button>
                          <div className="approved-del-btn-wrap">
                            <Button className="orange-btn dislike-btn"><AiOutlineDislike /></Button>
                            <Button className="green-btn like-btn active"><AiOutlineLike /> <span>Approved</span></Button>
                            <Button className="btn-outline-style1 delete-btn"><RiDeleteBin6Line /></Button>
                          </div>
                        </div>
                      </div>
                      <div className="upload-pictures-items">
                        <div className="upload-image-box">
                            <Label htmlFor="upload-image" className="upload-image-choose-file">
                              <div className="add-photo-box">
                                <img className="img-fluid" src={uploadShadow} alt="" />
                              </div>
                              <span className="choose-file-btn"><LuPlus /></span>
                              <Input id="upload-image" type='file' />
                            </Label>
                        </div>
                      </div>
                      <div className="upload-pictures-items">
                        <div className="upload-image-box">
                            <Label htmlFor="upload-image" className="upload-image-choose-file">
                              <div className="add-photo-box">
                                <img className="img-fluid" src={uploadShadow} alt="" />
                              </div>
                              <span className="choose-file-btn"><LuPlus /></span>
                              <Input id="upload-image" type='file' />
                            </Label>
                        </div>
                      </div>
                      <div className="upload-pictures-items">
                        <div className="upload-image-box">
                            <Label htmlFor="upload-image" className="upload-image-choose-file">
                              <div className="add-photo-box">
                                <img className="img-fluid" src={uploadShadow} alt="" />
                              </div>
                              <span className="choose-file-btn"><LuPlus /></span>
                              <Input id="upload-image" type='file' />
                            </Label>
                        </div>
                      </div>
                      <div className="upload-pictures-items">
                        <div className="upload-image-box">
                            <Label htmlFor="upload-image" className="upload-image-choose-file">
                              <div className="add-photo-box">
                                <img className="img-fluid" src={uploadShadow} alt="" />
                              </div>
                              <span className="choose-file-btn"><LuPlus /></span>
                              <Input id="upload-image" type='file' />
                            </Label>
                        </div>
                      </div>
                      <div className="upload-pictures-items">
                        <div className="upload-image-box">
                            <Label htmlFor="upload-image" className="upload-image-choose-file">
                              <div className="add-photo-box">
                                <img className="img-fluid" src={uploadShadow} alt="" />
                              </div>
                              <span className="choose-file-btn"><LuPlus /></span>
                              <Input id="upload-image" type='file' />
                            </Label>
                        </div>
                      </div>

                    </Slider>
                  </div>
              </Collapse>
            </div>
            {/* 2 */}
            <div className="profile-details-accordion-list">
              <div className="profile-dtls-accordion-head">
                <div className="left-heading">
                  <h4>Basic Infomation</h4>
                  <Button className="edit-btn"> <AiOutlineEdit /> Edit All</Button>
                </div>
                <div className="toggle-btn">
                  <Button className={status} onClick={toggle}>
                    <span className="plus"><FiPlus /></span>
                    <span className="minus"><HiMinus /></span>
                  </Button>
                </div>
              </div>
              
              <Collapse isOpen={collapse}
                onEntering={onEntering}
                onEntered={onEntered}
                onExiting={onExiting}
                onExited={onExited} >
                  <div className="profile-details-accordion-body">
                    <Row>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Name</span>
                            <Input id="" name="" type="text" placeholder="|" value="Praveen Bommannavar"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Gender</span>
                            <Input id="" name="" type="text" placeholder="|" value="Male"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Marital Status</span>
                            <Input id="" name="" type="text" placeholder="|" value="Unmarried"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Age</span>
                            <Input id="" name="" type="text" placeholder="|" value="May 21, 1990 (34 Years)"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Residence </span>
                            <Input id="" name="" type="text" placeholder="|" value="Mumbai, Maharashtra, India"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Height </span>
                            <Input id="" name="" type="text" placeholder="|" value="5ft 4in"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Residence Status  </span>
                            <Input id="" name="" type="text" placeholder="|" value="N/A"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Weight  </span>
                            <Input id="" name="" type="text" placeholder="|" value="N/A"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Mother Tongue </span>
                            <Input id="" name="" type="text" placeholder="|" value="English"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Religion </span>
                            <Input id="" name="" type="text" placeholder="|" value="Hindu"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Education </span>
                            <Input id="" name="" type="text" placeholder="|" value="Diploma"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Caste </span>
                            <Input id="" name="" type="text" placeholder="|" value="Caste No Bar"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Education Detail </span>
                            <Input id="" name="" type="text" placeholder="|" value="Diploma"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Employed In </span>
                            <Input id="" name="" type="text" placeholder="|" value="Not Available"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Occupation </span>
                            <Input id="" name="" type="text" placeholder="|" value="Business Analyst"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Annual Income </span>
                            <Input id="" name="" type="text" placeholder="|" value="Not Available"/>
                          </div>
                        </FormGroup>
                      </Col>
                      
                    </Row>
                  </div>
              </Collapse>
            </div>

            {/* 3 */}
            <div className="profile-details-accordion-list">
              <div className="profile-dtls-accordion-head">
                <div className="left-heading">
                  <h4>Partner Preference</h4>
                  <Button className="edit-btn"> <AiOutlineEdit /> Edit All</Button>
                </div>
                <div className="toggle-btn">
                  <Button className={status} onClick={toggle}>
                    <span className="plus"><FiPlus /></span>
                    <span className="minus"><HiMinus /></span>
                  </Button>
                </div>
              </div>
              
              <Collapse isOpen={collapse}
                onEntering={onEntering}
                onEntered={onEntered}
                onExiting={onExiting}
                onExited={onExited} >
                  <div className="profile-details-accordion-body">
                    <Row>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Age Preference </span>
                            <Input id="" name="" type="text" placeholder="|" value="18 Yrs to 85 Yrs"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="6">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Height </span>
                            <Input id="" name="" type="text" placeholder="|" value="Below 4ft to 5ft 6in"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="12">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Looking For </span>
                            <Input id="" name="" type="textarea" placeholder="|" value="Unmarried, Widow/Widower, Separated, Divorcee Wheatish, Very Fair, Fair, Wheatish Brown, Dark "/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="12">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Country Living In </span>
                            <Input id="" name="" type="textarea" placeholder="|" rows="15" value="Afghanistan, Albania, Armenia, Austria, Australia, Aruba, Aland Islands, Azerbaijan, Bosnia And Herzegovina, Bangladesh, Burkina Faso, Bulgaria, Bahrain, Burundi, Brunei, Bolivia, Bonaire, Saint Eustatius And Saba, Brazil, Bahamas, Bhutan, Bouvet Island, Botswana, Belarus, Canada, Democratic Republic Of The Congo, Central African Republic, Ivory Coast, Chile, Cameroon, China, Colombia, Costa Rica, Cuba, Cape Verde, Cyprus, Czech Republic, Germany, Djibouti, Denmark, Dominica, Dominican Republic, Ecuador, Estonia, Egypt, Eritrea, Ethiopia, Finland, Fiji, Micronesia, Faroe Islands, France, Gabon, Grenada, Georgia, French Guiana, Guernsey, Ghana, Greenland, Gambia, Guinea, Guadeloupe, Equatorial Guinea, Greece, Guatemala, Guam, Guinea-Bissau, Guyana, Hong Kong, Honduras, Croatia, Haiti, Hungary, Indonesia, Ireland, Israel, Isle Of Man, British Indian Ocean Territory, Iraq, Iran, Iceland, Italy, Jersey, Jamaica, Jordan, Japan, Kenya, Kyrgyzstan, Cambodia, Kiribati, Comoros, Kuwait, Kazakhstan, Laos, Lebanon, Liechtenstein, Liberia, Lesotho, Lithuania, Luxembourg, Latvia, Libya, Morocco, Monaco, Moldova, Montenegro, Madagascar, Marshall Islands, Macedonia, Mali, Myanmar, Mongolia, Macao, Northern Mariana Islands, Martinique, Mauritania, Montserrat, Mauritius, Maldives, Malawi, Mexico, Malaysia, Mozambique, Namibia, New Caledonia, Niger, Nigeria, Nicaragua, Netherlands, Nepal, Nauru, New Zealand, French Polynesia, El Salvador, Chad, French Southern Territories, East Timor, Kosovo, Mayotte"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="12">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Religion </span>
                            <Input id="" name="" type="text" placeholder="|" value="Hindu, Muslim, Sikh, Jain, Buddhist, Christian, Sikh Amritdhari, No Religion"/>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" xl="12">
                        <FormGroup className="common-formgroup">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Country Living In </span>
                            <Input id="" name="" type="textarea" placeholder="|" rows="15" value="Kamma, Khatri, Kokanastha Brahmin, Kori, Koshti, Kunbi, Kurmi, Kuruba, Leva Patil, Lingayat, Lohana, Maithil Brahmin, Malayalee Namboodiri, Malayalee Variar, Mali, Maharashtrian, Maharashtrian Brahmin, Maheshwari, Maratha, Maruthuvar, Mudaliar Senguntha, Mukulathur, Nadar, Nagar Brahmin, Nair Vaniya, Nagaralu, Padmashali, Patel Desai, Patel Kadva, Patel Leva, Naidu, Padmashali, Patel Desai, Patel Kadva, Patel Leva, Perika, Pillai, Prajapati, Punjabi Brahmin, Reddy, Saraswat Brahmins, Sahu, Scheduled Caste, Sepahia, Setti Balija, Sindhi, Somvanshi, Sonar, Sowrashtra, Sozhiya Vellalar, Sutar, Swarnakar, Thevar, Thiyya, Udayar, Vaidiki Brahmin, Vaishnav, Vaishnav Bhatia, Vaishnav Vania, Varshney, Vanniyakullak Shatriya, Vanniyar, Veerashaiva, Velethadathu Nair, Vellalar, Vellama, Vishwakarma, Viswabrahmin, Vokaliga, Vysya, Yadav, Thevar, Vaniya chettier, Vannar, Shia, Mansuri, Marthoma, Nadar, Syrian, Tonk Kshatriya, Labana, Ramdasia, Ramgharia, Saini, Paya kyun, Nai, Ravidasia, Walia, Sikh, Sunni, Nai, Patel, Prajapati, Rai Sikh Gujarati, Urdu, English, Punjabi, Malayalam, Kannada, French, Garhwali, Garo, Haryanvi, Kakbarak, Kanauji, Kashmiri, Persian, Rajasthani, Russian, Sanskrit, Santhali, Other, Hindi"/>
                          </div>
                        </FormGroup>
                      </Col>
                                            
                    </Row>
                  </div>
              </Collapse>
            </div>

        </div>
      </div>
      
      {/* model */}

      <Modal size="lg" className="common-modal" isOpen={toggleVerifyModel} toggle={handleVerifyModel}>
        <Button className="close-btn" onClick={handleVerifyModel}><IoClose /></Button>
        <ModalBody>
          <div className="modal-heading">
            <h4>Interest</h4>
          </div>
          <Button className="orange px-3 py-2 me-2 mb-2">Orange</Button>
          <Button className="blue px-3 py-2 me-2 mb-2">Blue</Button>
          <Button className="red px-3 py-2 me-2 mb-2">Red</Button>
          <Button className="green px-3 py-2 me-2 mb-2">Green</Button>
        </ModalBody>
      </Modal>

    </Wrapper>

  
  )
}

export default ProfileDetails
