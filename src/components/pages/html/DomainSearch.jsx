import React, { useState } from 'react'
import Wrapper from '../../layouts/Wrapper'
// import Organization from "../../../assets/images/organization-avatar-img.jpg";
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import Swal from 'sweetalert2'
import successicon from '../../../assets/images/domain-connect-success-icon.png'
import { FiPlus } from 'react-icons/fi'
// import { TbFilterPause } from 'react-icons/tb'
import { LiaEdit } from 'react-icons/lia'
// import { RiDeleteBin6Line } from 'react-icons/ri'

const DomainSearch = () => {
    const [showRecdForm, setShowRecdForm] = useState(false);

    const handleShowRecdForm = () => {
        setShowRecdForm(!showRecdForm);
    }

   const handleDomain=()=>{
    Swal.fire({
        html: `<h4>Your Domain <br> Has Been Successfully Pointed</h4>`,
        customClass: "domain-connect-wrapper",
        iconHtml: `<img src=${successicon}>`,
      });
  
   }

  return (
    <Wrapper>
      <div className="saas-body domain-search-wrapper">
        <div className="saas-body-inner">
            <div className="head mb-4">
                <div className="name">
                    <h4>Supermatrimonial.Com</h4>
                </div>
                <div className="ip">
                    <span>192.0.2.1</span>
                </div>
            </div>
            <div className="dm-search-wrap">
                <Form>
                    <Row>
                        <Col xs="12">
                            <h5>Enter your domain name</h5>
                        </Col>
                        <Col xs="12" lg="9" xl="10">
                            <FormGroup className="common-formgroup">
                                <Input id="" name="" placeholder="Enter your domain name" type="text" />
                            </FormGroup>
                        </Col>
                        <Col xs="12" lg="3" xl="2">
                            <Button className="btn btn-style1 px-4 py-2"  onClick={handleDomain}> Connect </Button>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div className='dm-search-content'>
                <div className="common-db-head mb-4">
                    <Row>
                        <Col xl="6" lg="8" className='p-0'>
                            <div className="head mb-2">
                                <div className="name">
                                    <h4>Supermatrimonial.Com</h4>
                                </div>
                                <span className="btn green-btn rounded-0 px-2 py-0 active">Active</span>
                                <span className="btn orange-btn rounded-0 px-2 py-0 active">Pending</span>
                                <p>Review,add,edit DNS records. Edit is go into effect once saved.</p>
                            </div>
                        </Col>
                        <Col xl="6" lg="4" className="text-end">
                            <Button className="btn btn-style1 mb-2 ms-2" onClick={handleShowRecdForm} >Add Records <FiPlus /></Button>
                        </Col>
                    </Row>
                </div>
                <div className={showRecdForm ? 'dm-search-form show' : 'dm-search-form hide'}>
                    <Form className='dm-search-form'>
                        <Row>
                            <Col xxl="2" xl="3" lg="4" md="6">
                                <FormGroup>
                                    <Label for="exampleSelect">Select</Label>
                                    <Input
                                        id="exampleSelect"
                                        name="select"
                                        type="select"
                                        className='form-select'
                                    >
                                        <option>A</option>
                                        <option>CNAME</option>
                                        <option>HTTPS</option>
                                        <option>MX</option>
                                        <option>PTR</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xl="3" lg="4" md="6">
                                <FormGroup>
                                    <Label for="name">Name <span>*</span></Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder='Use @ for roort'
                                    >
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xl="3" lg="4" md="6">
                                <FormGroup>
                                    <Label for="name">IPv4 address <span>*</span></Label>
                                    <Input
                                        id="ipv4"
                                        name="ipv4"
                                        type="text"
                                        // placeholder='E.g.mx1.example.com'
                                    >
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xl="3" lg="4" md="6">
                                <FormGroup>
                                    <Label for="name">Mail Server <span>*</span></Label>
                                    <Input
                                        id="mail-server"
                                        name="mail-server"
                                        type="text"
                                        placeholder='E.g.mx1.example.com'
                                    >
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xxl="1" xl="2" lg="4" md="6">
                                <FormGroup>
                                    <Label for="name">TTL</Label>
                                    <Input
                                        id="ttl"
                                        name="ttl"
                                        type="text"
                                        // placeholder='E.g.mx1.example.com'
                                        value="Auto"
                                    >
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xl="2" lg="4" md="6">
                                <FormGroup>
                                    <Label for="name">Priority<span>*</span></Label>
                                    <Input
                                        id="mail-server"
                                        name="mail-server"
                                        type="text"
                                        placeholder='0-65535'
                                    >
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg="12">
                                <FormGroup className="common-formgroup d-flex gap-2 justify-content-end">
                                    <Button className="btn btn-outline-style1 px-4 py-2" type="submit">
                                        Cancel
                                    </Button>
                                    <Button className="btn btn-style1 px-4 py-2" type="submit">
                                        Save
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <Table responsive className="saas-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Content</th>
                            <th>Proxy Status</th>
                            <th>TTL</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>A</td>
                            <td>supermatrimonial.com</td>
                            <td>13.232.98.210</td>
                            <td>DNS Only</td>
                            <td>Auto</td>
                            <td><Button className="edit-icon-btn"><LiaEdit /></Button></td>
                        </tr>
                        <tr>
                            <td>CNAME</td>
                            <td>*</td>
                            <td>supermatrimonial.com</td>
                            <td>DNS Only</td>
                            <td>Auto</td>
                            <td><Button className="edit-icon-btn"><LiaEdit /></Button></td>
                        </tr>
                        <tr>
                            <td>CNAME</td>
                            <td>www</td>
                            <td>supermatrimonial.com</td>
                            <td>DNS Only</td>
                            <td>Auto</td>
                            <td><Button className="edit-icon-btn"><LiaEdit /></Button></td>
                        </tr>
                        <tr>
                            <td>TXT</td>
                            <td>_aci-chadklc.api</td>
                            <td>"Qxjdksdbjkutysakjckc"</td>
                            <td>DNS Only</td>
                            <td>Auto</td>
                            <td><Button className="edit-icon-btn"><LiaEdit /></Button></td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div className='dm-search-content'>
                <div className="common-db-head mb-4">
                    <Row>
                        <Col md="6" className='p-0'>
                            <div className="head mb-2">
                                <div className="name">
                                    <h4>Cloudflare Nameservers</h4>
                                </div>
                                <p>Every DNS zone on Cloudflare is assigned a set of  Cloudflare-branded nameservers</p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Table responsive className="saas-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>NS</td>
                            <td>cloe.ns.cloudflare.com</td>
                        </tr>
                        <tr>
                            <td>NS</td>
                            <td>norman.ns.cloudflare.com</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
      </div>

      
    </Wrapper>
  )
}

export default DomainSearch
