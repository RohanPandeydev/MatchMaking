import React, { useEffect, useState } from 'react'
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Modal, ModalBody, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'
import profileUser from "../../../../assets/images/no-images-available.jpg";
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import classnames from 'classnames';
import Wrapper from '../../../layouts/Wrapper';
import customContext from '../../../../contexts/Context';
import { useLocation, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import SmsCampaignSetup from './SmsCampaignSetup';
import EmailCampaignSetup from './EmailCampaignSetup';
import CampaignBrideandgroomModel from './CampaignBrideandgroomModel';
import config from '../../../../../config';
import ValidateAuthenticationKey from '../../../../utils/ValidationAuthenticationKey';
import BridenGroomServices from '../../../../services/BridenGroomServices';
import CampaignServices from '../../../../services/CampaignServices';
import { IsAccessibleMethod } from '../../../../guard/Rbac';
import PermissionSets from '../../../../guard/Method';


const CampaignSetup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialTabValue = queryParams.get("tab");
    const [tabValue, setTabValue] = useState(initialTabValue || 'email');
    const [activeTab, setActiveTab] = useState('email');
    const [toggleBrideGroomModel, setToggleBrideGroomModel] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10
    const [checkboxList, setCheckBoxList] = useState([]);
    const [isSelectAll, setIsSelectedAll] = useState(false)
    const [currentSelectedTab, setCurrentSelectedTab] = useState("brideandgroom")
    const tabList = [
        {
            id: 1,
            value: "brideandgroom",
            name: "Bride and Groom",

        },
        {
            id: 2,
            value: "franchise",
            name: "Franchise",

        },
        {
            id: 3,
            value: "organization",
            name: "Organization",

        },
    ]


    const handleCurrentActiveTab = (e, tab) => {
        setCurrentSelectedTab(tab)
        setCheckBoxList([])
        setIsSelectedAll(false)
        setCurrentPage(1)
    }



    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleSelectAll = (e) => {
        setIsSelectedAll(e.target.checked)
    }
    const tabs = [{
        id: 1,
        name: "Send Email",
        value: "email"
    }, {
        id: 2,
        name: "Send SMS",
        value: "sms"
    }]

    const toggleTab = (tab, value, name) => {
        if (activeTab !== name) {
            queryParams.set("tab", value);
            navigate(`${location.pathname}?${queryParams.toString()}`);
            setActiveTab(name);
            setTabValue(value)
            setCheckBoxList([])
            setCurrentPage(1)
            handleCloseBrideandGroomModel()
            setIsSelectedAll(false)

        }
    };

    // Select Bride Groom modal
    const handleOpenBrideandGroomModel = () => {
        setToggleBrideGroomModel(true)
    };

    const handleCloseBrideandGroomModel = () => {
        setToggleBrideGroomModel(false)

    }




    useEffect(() => {
        if (initialTabValue) {
            const findValue = tabs?.find((each) => {
                return each?.value == tabValue
            })
            setActiveTab(findValue?.name)


        }
    }, [tabValue])




    const handleCheckedUser = (e, id, data) => {
        const isChecked = e.target.checked;

        if (isChecked) {
            // Add to checkedUsers array if checked
            setCheckBoxList((prev) => [...prev, { data: data, id: id }]);
        } else {
            // Remove from checkedUsers array if unchecked
            setCheckBoxList((prev) =>
                prev.filter((user) => user.id !== id)
            );
        }
    };





    const { data, isLoading } = useQuery(
        ["listing-campaign", currentPage, currentSelectedTab],
        () => {
            let queryParams = `?page=${currentPage}&page_size=${pageSize}`;

            if (currentSelectedTab == "brideandgroom") {
                return CampaignServices.getBrideandGroomList(queryParams)
            }
            else if (currentSelectedTab == "franchise") {
                return CampaignServices.getFranchiseMemberList(queryParams)
            }
            else if (currentSelectedTab == "organization") {
                return CampaignServices.getOrganizationMemberList(queryParams)
            }
            return [];

        },
        {
            enabled: !!currentSelectedTab,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
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






    const handleRemoveChecked = (e, id) => {
        const filterOut = checkboxList?.filter((each) => {
            return each.id != id
        })
        setCheckBoxList(filterOut)
    }
    return (
        <Wrapper>
            <div className='campaign-page-wrapper email-templete-wrapper'>
                <div className='campaign-radio-wrap '>
                    <ul className='common-radio-btn justify-content-end'>
                        {
                            tabList?.map((each) => {
                                return <li onClick={(e) => handleCurrentActiveTab(e, each.value)} >
                                    <Input
                                        id={each?.value}
                                        value={each?.value}
                                        name={each?.value}
                                        checked={currentSelectedTab == each.value}
                                        type="radio"
                                    />
                                    <Label for={each?.value}> {each?.name} </Label>
                                </li>
                            })
                        }

                        {/* <li>
                            <Input
                                id="franchise"
                                value={"male"}
                                name="Gender"
                                type="radio"
                            />
                            <Label for="franchise"> Franchise </Label>
                        </li>
                        <li>
                            <Input
                                id="organization"
                                value={"male"}
                                name="Gender"
                                type="radio"
                            />
                            <Label for="organization"> Organization </Label>
                        </li> */}
                    </ul>
                </div>
                <div className='campaign-tab-wrap'>
                    <Nav tabs>
                        {tabs?.map((ele) => {
                            return (
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            active: tabValue === ele?.value,
                                        })}
                                        onClick={() =>
                                            toggleTab(ele?.id, ele?.value, ele?.name)
                                        }
                                    >
                                        {ele?.name}
                                    </NavLink>
                                </NavItem>
                            );
                        })}
                    </Nav>
                </div>
                <div className='email-templete-inner-wrap'>
                    <TabContent activeTab={tabValue}>

                        <TabPane tabId="email">
                            <div className='common-db-head mb-4'>

                                <Row>
                                    <div className='col-12 col-md-4'>
                                        <div className='select-bride-groom-dropdown'>
                                            <Button className='btn btn-style1' onClick={handleOpenBrideandGroomModel}>Select {currentSelectedTab}</Button>
                                        </div>
                                    </div>
                                </Row>
                            </div>
                            <div className='campaing-bride-groom-wrap campaing-bride-groom-selectd-wrap'>
                                <Row>

                                    {checkboxList?.map((each) => {
                                        const ids = each?.id
                                        // console.log(each,"each")
                                        each = each?.data;
                                        let src;
                                        console.log(each, "each")
                                        if (currentSelectedTab == "brideandgroom" && each?.photos?.length) {
                                            src = `${config.apiUrl}${each.photos[0].upload_url}`
                                        } else if ((currentSelectedTab == "organization" || currentSelectedTab == "franchise") && each?.image_url) {
                                            src = each?.image_url
                                        }
                                        else {
                                            src = profileUser
                                        }
                                        return <Col xs="12" md="4" lg="2" className='mb-3'>
                                            <div className="select-bride-groom-list">
                                                <Label for="Religion">
                                                    <div className='bng-img'><img
                                                        className="img-fluid"
                                                        src={
                                                            src
                                                        }
                                                        alt=""
                                                    /></div>
                                                    <div className='bng-details'><p>{currentSelectedTab == "brideandgroom" ? each?.user?.first_name || "" : each?.owner_name || ""}{" "}
                                                        {currentSelectedTab == "brideandgroom" && each?.user?.last_name || ""}</p> <span> {each?.code || "N/A"}</span></div>
                                                </Label>
                                                <Button className='close-btn' onClick={(e) => handleRemoveChecked(e, ids)}><IoCloseOutline /></Button>
                                            </div>
                                        </Col>

                                    })}

                                </Row>
                            </div>
                            <EmailCampaignSetup currentSelectedTab={currentSelectedTab} isSelectAll={isSelectAll} checkboxList={checkboxList} setCurrentPage={setCurrentPage} setCheckBoxList={setCheckBoxList} />

                        </TabPane>
                        <TabPane tabId="sms">
                            <div className='common-db-head mb-4'>

                                <Row>
                                    <div className='col-12 col-md-4'>
                                        <div className='select-bride-groom-dropdown'>
                                            <Button className='btn btn-style1' onClick={handleOpenBrideandGroomModel}>Select {currentSelectedTab}</Button>
                                        </div>
                                    </div>
                                </Row>
                            </div>
                            <div className='campaing-bride-groom-wrap campaing-bride-groom-selectd-wrap'>
                                <Row>

                                    {checkboxList?.map((each) => {
                                        const ids = each?.id
                                        // console.log(each,"each")
                                        each = each?.data;
                                        let src;
                                        console.log(each, "each")
                                        if (currentSelectedTab == "brideandgroom" && each?.photos?.length) {
                                            src = `${config.apiUrl}${each.photos[0].upload_url}`
                                        } else if ((currentSelectedTab == "organization" || currentSelectedTab == "franchise") && each?.image_url) {
                                            src = each?.image_url
                                        }
                                        else {
                                            src = profileUser
                                        }
                                        return <Col xs="12" md="4" lg="2" className='mb-3'>
                                            <div className="select-bride-groom-list">
                                                <Label for="Religion">
                                                    <div className='bng-img'><img src={src} alt="" /></div>
                                                    <div className='bng-details'><p>{currentSelectedTab == "brideandgroom" ? each?.user?.first_name || "" : each?.owner_name || ""}{" "}
                                                        {currentSelectedTab == "brideandgroom" && each?.user?.last_name || ""}</p> <span> {each?.code || "N/A"}</span></div>
                                                </Label>
                                                <Button className='close-btn' onClick={(e) => handleRemoveChecked(e, ids)}><IoCloseOutline /></Button>
                                            </div>
                                        </Col>

                                    })}

                                </Row>
                            </div>



                            <SmsCampaignSetup currentSelectedTab={currentSelectedTab} isSelectAll={isSelectAll} checkboxList={checkboxList} setCurrentPage={setCurrentPage} setCheckBoxList={setCheckBoxList} />
                        </TabPane>
                    </TabContent>
                </div>
            </div>

            {/* View Bride and Groom modal */}
            <CampaignBrideandgroomModel currentSelectedTab={currentSelectedTab} handleSelectAll={handleSelectAll} isSelectAll={isSelectAll} handleCloseBrideandGroomModel={handleCloseBrideandGroomModel} toggleBrideGroomModel={toggleBrideGroomModel} pageSize={pageSize}
                currentPage={currentPage}
                List={data}

                onPageChange={handlePageChange} checkboxList={checkboxList} handleOpenBrideandGroomModel={handleOpenBrideandGroomModel} handleCheckedUser={handleCheckedUser} isLoading={isLoading} />

        </Wrapper>
    )
}

export default CampaignSetup
