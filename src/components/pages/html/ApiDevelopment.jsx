import React, { useState } from "react";
import Wrapper from "../../layouts/Wrapper";
import {
  Button,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Row,
  Table,
  NavLink as NavLinkReact,
  TabContent,
  TabPane,
  Modal,
  ModalBody,
} from "reactstrap";
import { LuCopy } from "react-icons/lu";
import { BsTextWrap } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";
import { SlFolderAlt } from "react-icons/sl";
import classnames from "classnames";
import { IoClose } from "react-icons/io5";

const ApiDevelopment = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const tabs = [
    {
      id: 1,

      name: "Body",
    },
    {
      id: 2,

      name: "Headers (7)",
    },
  ];
  const toggleTab = (tab, name) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // ExampleCodeViewMore modal 
  const [toggleExampleCodeViewMore, setToggleExampleCodeViewMore] = useState(false);
  const handleExampleCodeViewMore = () => setToggleExampleCodeViewMore(!toggleExampleCodeViewMore);

  return (
    <Wrapper>
      <div className="api-main-wrapper">
        <div className="api-left-sidebar-wrap">
          <div className="api-left-menu-wrap">
            <h4>BeFiSc</h4>
            <ul className="api-sidebarnav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="collapse"
                  href="#Kyc_Verification"
                  aria-expanded="false"
                  aria-controls="Kyc_Verification"
                >
                  <span className="menu-icon">
                    <SlFolderAlt />{" "}
                  </span>
                  <span className="menu-title">KYC Verification API </span>
                  <i className="menu-arrow">
                    <FiChevronRight />
                  </i>
                </a>
                <div className="collapse" id="Kyc_Verification">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-bs-toggle="collapse"
                        href="#Pan"
                        aria-expanded="false"
                        aria-controls="Pan"
                      >
                        <span className="menu-icon">
                          <SlFolderAlt />{" "}
                        </span>
                        <span className="menu-title">PAN </span>
                        <i className="menu-arrow">
                          <FiChevronRight />
                        </i>
                      </a>
                      <div className="collapse" id="Pan">
                        <ul className="nav flex-column sub-menu sub-menu-inner">
                          <li className="nav-item">
                            {" "}
                            <a className="nav-link" href="#">
                              sub menu inner
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-bs-toggle="collapse"
                        href="#Pan2"
                        aria-expanded="false"
                        aria-controls="Pan2"
                      >
                        <span className="menu-icon">
                          <SlFolderAlt />{" "}
                        </span>
                        <span className="menu-title">PAN 2</span>
                        <i className="menu-arrow">
                          <FiChevronRight />
                        </i>
                      </a>
                      <div className="collapse" id="Pan2">
                        <ul className="nav flex-column sub-menu sub-menu-inner">
                          <li className="nav-item">
                            {" "}
                            <a className="nav-link" href="#">
                              sub menu inner
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Franchise
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Franchise 2
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Franchise 3
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Franchise 4
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sub 1
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sub 2
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sub 3
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sub 4
                </a>
              </li>
            </ul>
            
          </div>
        </div>
        <div className="api-body-wrapper-wrap">
          <div className="api-inner-wrap">
            <div className="api-card-list">
              <Row className="g-0">
                <Col xs="12" lg="6">
                  <div className="api-details-wrap">
                    <div className="title">
                      <h4>
                        <span>POST</span> Validate PAN
                      </h4>
                    </div>
                    <div className="link-copy">
                      <span>https://validate-pan.befisc.com</span>
                      <Button className="link-copy-btn" title="Copy">
                        <LuCopy />
                      </Button>
                    </div>
                    <h4>Response Codes</h4>
                    <div className="response-table">
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Status Code </th>
                            <th>Billable</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Yes</td>
                            <td>Valid PAN</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Yes</td>
                            <td>Invalid PAN</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Yes</td>
                            <td>Inactive PAN</td>
                          </tr>
                          <tr>
                            <td>401</td>
                            <td>No</td>
                            <td>Authkey missing or invalid</td>
                          </tr>
                          <tr>
                            <td>402</td>
                            <td>No</td>
                            <td>
                              Your account does not have the required privilege
                              to access this API
                            </td>
                          </tr>
                          <tr>
                            <td>403</td>
                            <td>No</td>
                            <td>Request limit exceeded</td>
                          </tr>
                          <tr>
                            <td>301</td>
                            <td>No</td>
                            <td>Parameter Missing</td>
                          </tr>
                          <tr>
                            <td>302</td>
                            <td>No</td>
                            <td>Source down</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <ul>
                      <li>
                        To obtain the outcome for income tax, include the 'it'
                        parameter.
                      </li>
                      <li>
                        To obtain the outcome for income tax, include the 'it'
                        parameter.
                      </li>
                    </ul>
                    <h5>HEADERS</h5>
                    <div className="api-headers-wrap">
                      <div className="api-headers-list">
                        <div className="headers-name">authkey</div>
                        <div className="headers-content">{"<authkey>"}</div>
                      </div>
                      <div className="api-headers-list">
                        <div className="headers-name">authkey</div>
                        <div className="headers-content">{"<authkey>"}</div>
                      </div>
                    </div>
                    <h5>
                      Body <span>raw (json)</span>
                    </h5>
                    <div className="api-body-json-wrap">
                      <div className="api-code-documentation-wrap">
                        <div className="api-code-document-head">
                          <div className="highlighted-code-language-label">
                            json
                          </div>
                          <div className="wrap-copy-btn">
                            <Button
                              className="wrap-line-btn"
                              title="Wrap Lines"
                            >
                              <BsTextWrap />
                            </Button>
                            <Button className="copy-btn" title="Copy">
                              <LuCopy />
                            </Button>
                          </div>
                        </div>
                        <div className="api-code-document-wrap">
                          <pre class="language-json">
                            <code class="language-json highlighted-code__code">
                              <span class="token punctuation">{"{"}</span>
                              <br />
                              <span class="token string-property property">
                                {" "}
                                "pan"
                              </span>
                              <span class="token operator">:</span>
                              <span class="token string">"XXXXXXXXX"</span>
                              <span class="token punctuation">,</span>
                              <br />
                              <span class="token string-property property">
                                {" "}
                                "it"{" "}
                              </span>
                              <span class="token operator">:</span>{" "}
                              <span class="token number">1</span>
                              <span class="token comment"> //optional</span>
                              <br />
                              <span class="token punctuation">{"}"}</span>
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs="12" lg="6">
                  <div className="api-example-wrap">
                    <div className="api-example-request-head">
                      <div className="title">Example Request</div>
                      <div className="example-request-dropdown">
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                          <DropdownToggle caret size="lg">
                            Large Button
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem>Validate PAN</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>

                    <div className="api-code-documentation-wrap mb-4">
                      <div className="api-code-document-head">
                        <div className="highlighted-code-language-label">
                          json
                        </div>
                        <div className="wrap-copy-btn">
                          <Button className="wrap-line-btn" title="Wrap Lines">
                            <BsTextWrap />
                          </Button>
                          <Button className="copy-btn" title="Copy">
                            <LuCopy />
                          </Button>
                        </div>
                      </div>
                      <div className="api-code-document-wrap">
                        <pre class="language-json">
                          <code class="language-json highlighted-code__code">
                            <span class="token punctuation">{"{"}</span>
                            <br />
                            <span class="token string-property property">
                              {" "}
                              "pan"
                            </span>
                            <span class="token operator">:</span>
                            <span class="token string">"XXXXXXXXX"</span>
                            <span class="token punctuation">,</span>
                            <br />
                            <span class="token string-property property">
                              {" "}
                              "it"{" "}
                            </span>
                            <span class="token operator">:</span>{" "}
                            <span class="token number">1</span>
                            <span class="token comment"> //optional</span>
                            <br />
                            <span class="token punctuation">{"}"}</span>
                          </code>
                        </pre>
                      </div>
                    </div>

                    <div className="api-example-request-head">
                      <div className="title">Example Response</div>
                    </div>
                    <div className="api-example-code-tabs-wrap">
                      <Nav tabs>
                          {tabs?.map((ele) => {
                            return (
                              <NavItem>
                                <NavLinkReact
                                  className={classnames({
                                    active: activeTab === ele?.id,
                                  })}
                                  onClick={() => toggleTab(ele?.id, ele?.name)}
                                >
                                  {ele?.name}
                                </NavLinkReact>
                              </NavItem>
                            );
                          })}
                      </Nav>
                    </div>
                    <TabContent activeTab={activeTab}>
                      {/* {tabs?.map((each) => {
                        return <TabPane tabId={each?.id}>{each?.name}</TabPane>;
                      })} */}
                      <TabPane tabId={1}>
                        <div className="api-example-code-tabs-content-wrap">
                          <div className="api-code-documentation-wrap mb-4">
                            <div className="api-code-document-head">
                              <div className="highlighted-code-language-label">
                                json
                              </div>
                              <div className="wrap-copy-btn">
                                <Button
                                  className="wrap-line-btn"
                                  title="Wrap Lines"
                                >
                                  <BsTextWrap />
                                </Button>
                                <Button className="copy-btn" title="Copy">
                                  <LuCopy />
                                </Button>
                              </div>
                            </div>
                            <div className="api-code-document-wrap">
                              <pre class="language-json">
                                <code class="language-json highlighted-code__code">
                                  <span class="token punctuation">{"{"}</span>
                                  <br />
                                  <span class="token string-property property">
                                    {"     "}
                                    "pan"
                                  </span>
                                  <span class="token operator">:</span>
                                  <span class="token string">"XXXXXXXXX"</span>
                                  <span class="token punctuation">,</span>
                                  <br />
                                  <span class="token string-property property">
                                    {" "}
                                    "it"{" "}
                                  </span>
                                  <span class="token operator">:</span>{" "}
                                  <span class="token number">1</span>
                                  <span class="token comment"> //optional</span>
                                  <br />
                                  <span class="token punctuation">{"}"}</span>
                                </code>
                              </pre>
                            </div>
                          </div>
                          <div className="api-example-code-view-more-btn-wrap">
                            <Button className="view-more-btn" onClick={handleExampleCodeViewMore}>View More</Button>
                          </div>
                        </div>
                      </TabPane>
                      <TabPane tabId={2}>
                        <div className="api-headers-tab-wrap">
                          <div className="api-headers-wrap">
                            <div className="api-headers-list">
                              <div className="headers-name">Date</div>
                              <div className="headers-content">Tue, 20 Dec 2022 06:25:56 GMT</div>
                            </div>
                            <div className="api-headers-list">
                              <div className="headers-name">Content-Type</div>
                              <div className="headers-content">application/json</div>
                            </div>
                            <div className="api-headers-list">
                              <div className="headers-name">Content-Length</div>
                              <div className="headers-content">206</div>
                            </div>
                            <div className="api-headers-list">
                              <div className="headers-name">Connection</div>
                              <div className="headers-content">keep-alive</div>
                            </div>
                            <div className="api-headers-list">
                              <div className="headers-name">x-amzn-RequestId</div>
                              <div className="headers-content">6760c11d-4679-461d-899f-73881f1afb09</div>
                            </div>
                            <div className="api-headers-list">
                              <div className="headers-name">x-amz-apigw-id</div>
                              <div className="headers-content">dbpKLEUYBcwFogg=</div>
                            </div>
                            <div className="api-headers-list">
                              <div className="headers-name">X-Amzn-Trace-Id</div>
                              <div className="headers-content">Root=1-63a15574-48fb454e1bdcf6d36df99628;Sampled=0=</div>
                            </div>
                          </div>
                        </div>
                      </TabPane>
                    </TabContent>
                  </div>
                </Col>
              </Row>
            </div>
            {/* 2 Loop */}
            <div className="api-card-list">
              <Row className="g-0">
                <Col xs="12" lg="6">
                  <div className="api-details-wrap">
                    <div className="title">
                      <h4>
                        <span>POST</span> Validate PAN
                      </h4>
                    </div>
                    <div className="link-copy">
                      <span>https://validate-pan.befisc.com</span>
                      <Button className="link-copy-btn" title="Copy">
                        <LuCopy />
                      </Button>
                    </div>
                    <h4>Response Codes</h4>
                    <div className="response-table">
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Status Code </th>
                            <th>Billable</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Yes</td>
                            <td>Valid PAN</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Yes</td>
                            <td>Invalid PAN</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Yes</td>
                            <td>Inactive PAN</td>
                          </tr>
                          <tr>
                            <td>401</td>
                            <td>No</td>
                            <td>Authkey missing or invalid</td>
                          </tr>
                          <tr>
                            <td>402</td>
                            <td>No</td>
                            <td>
                              Your account does not have the required privilege
                              to access this API
                            </td>
                          </tr>
                          <tr>
                            <td>403</td>
                            <td>No</td>
                            <td>Request limit exceeded</td>
                          </tr>
                          <tr>
                            <td>301</td>
                            <td>No</td>
                            <td>Parameter Missing</td>
                          </tr>
                          <tr>
                            <td>302</td>
                            <td>No</td>
                            <td>Source down</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <ul>
                      <li>
                        To obtain the outcome for income tax, include the 'it'
                        parameter.
                      </li>
                      <li>
                        To obtain the outcome for income tax, include the 'it'
                        parameter.
                      </li>
                    </ul>
                    <h5>HEADERS</h5>
                    <div className="api-headers-wrap">
                      <div className="api-headers-list">
                        <div className="headers-name">authkey</div>
                        <div className="headers-content">{"<authkey>"}</div>
                      </div>
                      <div className="api-headers-list">
                        <div className="headers-name">authkey</div>
                        <div className="headers-content">{"<authkey>"}</div>
                      </div>
                    </div>
                    <h5>
                      Body <span>raw (json)</span>
                    </h5>
                    <div className="api-body-json-wrap">
                      <div className="api-code-documentation-wrap">
                        <div className="api-code-document-head">
                          <div className="highlighted-code-language-label">
                            json
                          </div>
                          <div className="wrap-copy-btn">
                            <Button
                              className="wrap-line-btn"
                              title="Wrap Lines"
                            >
                              <BsTextWrap />
                            </Button>
                            <Button className="copy-btn" title="Copy">
                              <LuCopy />
                            </Button>
                          </div>
                        </div>
                        <div className="api-code-document-wrap">
                          <pre class="language-json">
                            <code class="language-json highlighted-code__code">
                              <span class="token punctuation">{"{"}</span>
                              <br />
                              <span class="token string-property property">
                                {" "}
                                "pan"
                              </span>
                              <span class="token operator">:</span>
                              <span class="token string">"XXXXXXXXX"</span>
                              <span class="token punctuation">,</span>
                              <br />
                              <span class="token string-property property">
                                {" "}
                                "it"{" "}
                              </span>
                              <span class="token operator">:</span>{" "}
                              <span class="token number">1</span>
                              <span class="token comment"> //optional</span>
                              <br />
                              <span class="token punctuation">{"}"}</span>
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs="12" lg="6">
                  <div className="api-example-wrap">
                    <div className="api-example-request-head">
                      <div className="title">Example Request</div>
                      <div className="example-request-dropdown">
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                          <DropdownToggle caret size="lg">
                            Large Button
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem>Validate PAN</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>

                    <div className="api-code-documentation-wrap mb-4">
                      <div className="api-code-document-head">
                        <div className="highlighted-code-language-label">
                          json
                        </div>
                        <div className="wrap-copy-btn">
                          <Button className="wrap-line-btn" title="Wrap Lines">
                            <BsTextWrap />
                          </Button>
                          <Button className="copy-btn" title="Copy">
                            <LuCopy />
                          </Button>
                        </div>
                      </div>
                      <div className="api-code-document-wrap">
                        <pre class="language-json">
                          <code class="language-json highlighted-code__code">
                            <span class="token punctuation">{"{"}</span>
                            <br />
                            <span class="token string-property property">
                              {" "}
                              "pan"
                            </span>
                            <span class="token operator">:</span>
                            <span class="token string">"XXXXXXXXX"</span>
                            <span class="token punctuation">,</span>
                            <br />
                            <span class="token string-property property">
                              {" "}
                              "it"{" "}
                            </span>
                            <span class="token operator">:</span>{" "}
                            <span class="token number">1</span>
                            <span class="token comment"> //optional</span>
                            <br />
                            <span class="token punctuation">{"}"}</span>
                          </code>
                        </pre>
                      </div>
                    </div>

                    <div className="api-example-request-head">
                      <div className="title">Example Response</div>
                    </div>
                    <div className="api-example-code-tabs-wrap">
                      <Nav tabs>
                          {tabs?.map((ele) => {
                            return (
                              <NavItem>
                                <NavLinkReact
                                  className={classnames({
                                    active: activeTab === ele?.id,
                                  })}
                                  onClick={() => toggleTab(ele?.id, ele?.name)}
                                >
                                  {ele?.name}
                                </NavLinkReact>
                              </NavItem>
                            );
                          })}
                      </Nav>
                    </div>
                    <TabContent activeTab={activeTab}>
                      {/* {tabs?.map((each) => {
                        return <TabPane tabId={each?.id}>{each?.name}</TabPane>;
                      })} */}
                      <TabPane tabId={1}>
                        <div className="api-example-code-tabs-content-wrap">
                          <div className="api-code-documentation-wrap mb-4">
                            <div className="api-code-document-head">
                              <div className="highlighted-code-language-label">
                                json
                              </div>
                              <div className="wrap-copy-btn">
                                <Button
                                  className="wrap-line-btn"
                                  title="Wrap Lines"
                                >
                                  <BsTextWrap />
                                </Button>
                                <Button className="copy-btn" title="Copy">
                                  <LuCopy />
                                </Button>
                              </div>
                            </div>
                            <div className="api-code-document-wrap">
                              <pre class="language-json">
                                <code class="language-json highlighted-code__code">
                                  <span class="token punctuation">{"{"}</span>
                                  <br />
                                  <span class="token string-property property">
                                    {"     "}
                                    "pan"
                                  </span>
                                  <span class="token operator">:</span>
                                  <span class="token string">"XXXXXXXXX"</span>
                                  <span class="token punctuation">,</span>
                                  <br />
                                  <span class="token string-property property">
                                    {" "}
                                    "it"{" "}
                                  </span>
                                  <span class="token operator">:</span>{" "}
                                  <span class="token number">1</span>
                                  <span class="token comment"> //optional</span>
                                  <br />
                                  <span class="token punctuation">{"}"}</span>
                                </code>
                              </pre>
                            </div>
                          </div>
                          <div className="api-example-code-view-more-btn-wrap">
                            <Button className="view-more-btn" onClick={handleExampleCodeViewMore}>View More</Button>
                          </div>
                        </div>
                      </TabPane>
                      <TabPane tabId={2}>
                        <div className="api-headers-tab-wrap">
                          <div className="api-headers-wrap">
                            <div className="api-headers-list">
                              <div className="headers-name">Date</div>
                              <div className="headers-content">Tue, 20 Dec 2022 06:25:56 GMT</div>
                            </div>
                            <div className="api-headers-list">
                              <div className="headers-name">Content-Type</div>
                              <div className="headers-content">application/json</div>
                            </div>
                            <div className="api-headers-list">
                              <div className="headers-name">Content-Length</div>
                              <div className="headers-content">206</div>
                            </div>
                            <div className="api-headers-list">
                              <div className="headers-name">Connection</div>
                              <div className="headers-content">keep-alive</div>
                            </div>
                            <div className="api-headers-list">
                              <div className="headers-name">x-amzn-RequestId</div>
                              <div className="headers-content">6760c11d-4679-461d-899f-73881f1afb09</div>
                            </div>
                            <div className="api-headers-list">
                              <div className="headers-name">x-amz-apigw-id</div>
                              <div className="headers-content">dbpKLEUYBcwFogg=</div>
                            </div>
                            <div className="api-headers-list">
                              <div className="headers-name">X-Amzn-Trace-Id</div>
                              <div className="headers-content">Root=1-63a15574-48fb454e1bdcf6d36df99628;Sampled=0=</div>
                            </div>
                          </div>
                        </div>
                      </TabPane>
                    </TabContent>
                    
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Ticket modal */}
      <Modal size="lg" className="common-modal example-code-view-modal" isOpen={toggleExampleCodeViewMore} toggle={handleExampleCodeViewMore} centered="true">
        <Button className="close-btn" onClick={handleExampleCodeViewMore}><IoClose /></Button>
        <ModalBody>
            <div className="modal-heading">
              <h4>Example Response</h4>
            </div>
            <div className="example-code-view-modal-body">
              <div className="api-code-documentation-wrap">
                <div className="api-code-document-head">
                  <div className="highlighted-code-language-label">
                    json
                  </div>
                  <div className="wrap-copy-btn">
                    <Button
                      className="wrap-line-btn"
                      title="Wrap Lines"
                    >
                      <BsTextWrap />
                    </Button>
                    <Button className="copy-btn" title="Copy">
                      <LuCopy />
                    </Button>
                  </div>
                </div>
                <div className="api-code-document-wrap">
                  <pre class="language-json">
                    <code class="language-json highlighted-code__code">
                      <span class="token punctuation">{"{"}</span><br/>
                      <span class="token string-property property">&nbsp;&nbsp;&nbsp;"api_category"</span><span class="token operator">:</span> <span class="token string">"KYC"</span><span class="token punctuation">,</span><br/>
                      <span class="token string-property property">&nbsp;&nbsp;&nbsp;"api_name"</span><span class="token operator">:</span> <span class="token string">"PAN Verification (Basic)"</span><span class="token punctuation">,</span><br/>
                      <span class="token string-property property">&nbsp;&nbsp;&nbsp;"billable"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span><br/>
                      <span class="token string-property property">&nbsp;&nbsp;&nbsp;"txn_id"</span><span class="token operator">:</span> <span class="token string">"6254d5b4-1530-4247-a734-743244d6de9f"</span><span class="token punctuation">,</span><br/>
                      <span class="token string-property property">&nbsp;&nbsp;&nbsp;"message"</span><span class="token operator">:</span> <span class="token string">"Success"</span><span class="token punctuation">,</span><br/>
                      <span class="token string-property property">&nbsp;&nbsp;&nbsp;"status"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span><br/>
                      <span class="token string-property property">&nbsp;&nbsp;&nbsp;"result"</span><span class="token operator">:</span> <span class="token punctuation">{"{"}</span><br/>
                        <span class="token string-property property">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"pan_number"</span><span class="token operator">:</span> <span class="token string">"XXXXXXX"</span><span class="token punctuation">,</span><br/>
                        <span class="token string-property property">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"pan_status"</span><span class="token operator">:</span> <span class="token string">"VALID"</span><span class="token punctuation">,</span><br/>
                        <span class="token string-property property">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"user_full_name"</span><span class="token operator">:</span> <span class="token string">"XXXXX XXXXX"</span><span class="token punctuation">,</span><br/>
                        <span class="token string-property property">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"pan_type"</span><span class="token operator">:</span> <span class="token string">"Person"</span><br/>
                      <span class="token punctuation">{"}"}</span><span class="token punctuation">,</span><br/>
                      <span class="token string-property property">&nbsp;&nbsp;&nbsp;"datetime"</span><span class="token operator">:</span> <span class="token string">"2023-02-25 09:49:54.070393"</span><br/>
                    <span class="token punctuation">{"}"}</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
        </ModalBody>
      </Modal>

    </Wrapper>
  );
};

export default ApiDevelopment;
