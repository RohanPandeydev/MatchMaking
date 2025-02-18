import React from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";

const PermissionRow = ({ item }) => {
  console.log(item, "item");
  return (
    <>
      <div className="staff-role-list">
        <div className="staff-role-head">
          <Row>
            <Col xs="12" lg="6">
              <div className="staff-role-checkbox">
                <FormGroup className="mb-0 mb-lg-0">
                  {/* <Input id="Marketing" type="checkbox" /> */}
                  <Label htmlFor="Marketing">{item?.parent || ""}</Label>
                </FormGroup>
              </div>
            </Col>
            <Col xs="12" lg="6">
              <div className="staff-role-button">
              
              </div>
            </Col>
          </Row>
        </div>
        <div className="staff-role-details-wrap">
          <Row>
            {item.children ? (
              item.children.map((each) => {
                return (
                  <Col xs="12" lg="6" xl="4" className="mb-4">
                    <div className="staff-details-list-wrap">
                      
                      {each.methods.length > 0 &&
                        each?.methods.map((elem) => {
                          return (
                            <div className="staff-details-list">
                                <div className="name">
                                {each?.name || ""} {elem.label || ""}
                                </div>
                              <div className="info">Yes</div>
                            </div>
                          );
                        })}

                      {/* <div className="staff-details-list">
                                    <div className="name">
                                    View Member:  
                                    </div>
                                    <div className="info">
                                    Own Members
                                    </div>
                                </div>
                                <div className="staff-details-list">
                                    <div className="name">
                                    Edit Member:
                                    </div>
                                    <div className="info">
                                    Own Members
                                    </div>
                                </div>
                                <div className="staff-details-list">
                                    <div className="name">
                                    Add Email Template: 
                                    </div>
                                    <div className="info">
                                    No
                                    </div>
                                </div>
                                <div className="staff-details-list">
                                    <div className="name">
                                    View Contact:
                                    </div>
                                    <div className="info">
                                    No
                                    </div>
                                </div>
                                <div className="staff-details-list">
                                    <div className="name">
                                    Add comment to customer:  
                                    </div>
                                    <div className="info">
                                    Yes
                                    </div>
                                </div>
                                <div className="staff-details-list">
                                    <div className="name">
                                    Manage Appointment:  
                                    </div>
                                    <div className="info">
                                    No
                                    </div>
                                </div>
                                <div className="staff-details-list">
                                    <div className="name">
                                    Manage Attendance:   
                                    </div>
                                    <div className="info">
                                    No
                                    </div>
                                </div>
                                <div className="staff-details-list">
                                    <div className="name">
                                    User To Admin Message: 
                                    </div>
                                    <div className="info">
                                    No
                                    </div>
                                </div>
                                <div className="staff-details-list">
                                    <div className="name">
                                    Manage Blog:  
                                    </div>
                                    <div className="info">
                                    No
                                    </div>
                                </div>
                                <div className="staff-details-list">
                                    <div className="name">
                                    Show Staff Detail:   
                                    </div>
                                    <div className="info">
                                    No
                                    </div>
                                </div>
                                <div className="staff-details-list">
                                    <div className="name">
                                    Credit Limit:  
                                    </div>
                                    <div className="info">
                                    No
                                    </div>
                                </div>
                                <div className="staff-details-list">
                                    <div className="name">
                                    Auto Match:  
                                    </div>
                                    <div className="info">
                                    N/A
                                    </div>
                                </div>
                                <div className="staff-details-list">
                                    <div className="name">
                                    Manage Photos:
                                    </div>
                                    <div className="info">
                                    Own Members
                                    </div>
                                </div>
                                <div className="staff-details-list">
                                    <div className="name">
                                    Manage Video:  
                                    </div>
                                    <div className="info">
                                    Own Members
                                    </div>
                                </div>
                                <div className="staff-details-list">
                                    <div className="name">
                                    Manage Horoscope:
                                    </div>
                                    <div className="info">
                                    Own Members
                                    </div>
                                </div>
                                <div className="staff-details-list">
                                    <div className="name">
                                    Send Express interest and message:  
                                    </div>
                                    <div className="info">
                                    No
                                    </div>
                                </div> */}
                    </div>
                  </Col>
                );
              })
            ) : (
              <Col xs="12" lg="6" xl="4" className="mb-4">
                <div className="staff-details-list-wrap">
                  {item.methods.map((elem) => {
                    return (
                      <div className="staff-details-list">
                        <div className="name">{item.parent||""} {elem?.label || ""}</div>
                        <div className="info">Yes</div>
                      </div>
                    );
                  })}
                </div>
              </Col>
            )}

            {/* <Col xs="12" lg="6" xl="4" className="mb-4">
                        <div className="staff-details-list-wrap">
                            <div className="staff-details-list">
                                <div className="name">
                                View Customer:
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Customer Activity: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Sales Report: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Print Profile:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                View Email:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Amritsar Appointment:  
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Conset Form: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Coupon:  
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Membership Plan:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Email and SMS: 
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Quick Email: 
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Ematch: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Manage Exclusive Member: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Matrimony Data: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Priotity:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Send Whatsapp Message: 
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            
                        </div>
                    </Col>
                    <Col xs="12" lg="6" xl="4" className="mb-4">
                        <div className="staff-details-list-wrap">
                            <div className="staff-details-list">
                                <div className="name">
                                Edit Membership Plan:Manage Succss
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Story:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Delete Member:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Add comment to member:
                                </div>
                                <div className="info">
                                Yes
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Renew Memberhip:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Inactive To Active: 
                                </div>
                                <div className="info">
                                Own Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Active To Inactive: 
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Active To Paid: 
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Paid To Featured:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Suspend Member:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Match Making Mail:
                                </div>
                                <div className="info">
                                No Members
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Ematch Edit:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Site Map:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Review Rating:
                                </div>
                                <div className="info">
                                No
                                </div>
                            </div>
                            <div className="staff-details-list">
                                <div className="name">
                                Personalize Service: 
                                </div>
                                <div className="info">
                                Own
                                </div>
                            </div>
                                                        
                        </div>
                    </Col> */}
          </Row>
        </div>
      </div>
    </>
  );
};

export default PermissionRow;
