import React, { useState } from 'react'
import { Button, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import classnames from 'classnames';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { GuidelinesEmail, GuidelinesSms } from '../../../../utils/JSON/GuideLines';
import EmailTemplate from './EmailTemplate';
import SmsTemplate from './SmsTemplate';
import Wrapper from '../../../layouts/Wrapper';
const SmsEmailTemplate = () => {
       const location = useLocation();
        const navigate = useNavigate();
        const queryParams = new URLSearchParams(location.search);
        const initialPage = parseInt(queryParams.get("page")) || 1;
        const initialTabValue = queryParams.get("tab");
        const [tabValue, setTabValue] = useState(initialTabValue || 'email');
        const [activeTab, setActiveTab] = useState('email');
        const [guidelines, setGuidelines] = useState(GuidelinesEmail);
        const toggleTab = (tab, value, name) => {
            if (activeTab !== name) {
                queryParams.set("tab", value);
                setGuidelines(value == "email" ? GuidelinesEmail : GuidelinesSms)
                navigate(`${location.pathname}?${queryParams.toString()}`);
                setActiveTab(name);
                setTabValue(value)
            }
        };
    
        const tabs = [{
            id: 1,
            name: "Send Email",
            value: "email"
        }, {
            id: 2,
            name: "Send SMS",
            value: "sms"
        }]
    
        useEffect(() => {
            if (initialTabValue) {
                const findValue = tabs?.find((each) => {
                    return each?.value == tabValue
                })
                setGuidelines(initialTabValue == "email" ? GuidelinesEmail : GuidelinesSms)
                setActiveTab(findValue?.name)
    
            }
        }, [tabValue])
    
  return (
    <Wrapper>
    <div className='email-templete-wrapper'>
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
            <Row>
               <Col xs="12" md="12" lg="12" className='mb-3'>
               
            {
                            tabValue == "email" ? <EmailTemplate /> : tabValue == "sms" ? <SmsTemplate /> : null

                        }
                        </Col>   

               
             
            </Row>
        </div>
    </div>
</Wrapper>
  )
}

export default SmsEmailTemplate