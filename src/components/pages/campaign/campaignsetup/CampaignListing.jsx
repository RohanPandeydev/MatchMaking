import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import EmailCampaignListing from './EmailCampaignListing';
import SmsCampaignListing from './SmsCampaignListing';
import customContext from '../../../../contexts/Context';
import Wrapper from '../../../layouts/Wrapper';

const CampaignListing = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialTabValue = queryParams.get("tab");
    const [tabValue, setTabValue] = useState(initialTabValue || 'email');
    const [activeTab, setActiveTab] = useState('email');
    const { loggedInUserTenantId } = customContext()
    const initialPage = parseInt(queryParams.get("page")) || 1;
    const initialLimit = useMemo(
        () => parseInt(queryParams.get("limit")) || 10,
        [parseInt(queryParams.get("limit"))]
    );
    const [pageNumber, setPageNumber] = useState(initialPage);

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
            // queryParams.set("tab", value);
            queryParams.set("page", 1);
            navigate(`${location.pathname}?${queryParams.toString()}`);
            setActiveTab(name);
            setTabValue(value)
            setPageNumber(1);

        }
    };

    useEffect(() => {
        if (initialTabValue) {
            const findValue = tabs?.find((each) => {
                return each?.value == tabValue
            })
            setActiveTab(findValue?.name)

        }
    }, [tabValue])

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
    return (
        <Wrapper>
            <div className='email-templete-wrapper'>
                <div className='campaign-tab-wrap'>
                    <ul className='top-tab'>
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
                    </ul>
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

                            <div className='campaing-bride-groom-wrap campaing-bride-groom-selectd-wrap'>
                                <Row>
                                    <EmailCampaignListing currentSelectedTab={currentSelectedTab} pageNumber={pageNumber} limit={2} setPageNumber={setPageNumber} loggedInUserTenantId={loggedInUserTenantId} />


                                </Row>
                            </div>

                        </TabPane>
                        <TabPane tabId="sms">
                            <SmsCampaignListing currentSelectedTab={currentSelectedTab} pageNumber={pageNumber} limit={2} setPageNumber={setPageNumber} loggedInUserTenantId={loggedInUserTenantId} />
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        </Wrapper>
    )
}

export default CampaignListing