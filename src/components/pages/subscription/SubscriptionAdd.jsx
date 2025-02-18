import React from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import Wrapper from '../../layouts/Wrapper'

const SubscriptionAdd = () => {
  return (
    <Wrapper>
        <div className="subscription-form-wrap">
            <Form>
                <Row>
                    <Col md="6" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> Plan Name </Label>
                            <Input id="" name="" placeholder="Plan Name" type="text" />
                        </FormGroup>
                    </Col>
                    <Col md="6" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> No. Of Data </Label>
                            <Input id="" name="" placeholder="No. Of Data" type="text" />
                        </FormGroup>
                    </Col>
                    <Col md="6" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> Plan Name </Label>
                            <Input id="" name="" placeholder="Plan Name" type="text" />
                        </FormGroup>
                    </Col>
                    <Col md="6" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label>No. Of  Subscription  </Label>
                            <Input id="" name="" placeholder="No. Of  Subscription" type="text" />
                        </FormGroup>
                    </Col>
                    <Col md="6" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label> Payment Method  </Label>
                            <Input id="" name="" type="select" >
                                <option>
                                Paytm
                                </option>
                                <option>
                                    GPay
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md="6" className="mb-2">
                        <FormGroup className="common-formgroup">
                            <Label>Domain Setup</Label>
                            <Input id="" name="" type="select" >
                                <option>
                                    Yes
                                </option>
                                <option>
                                    No
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup className="common-formgroup">
                            <Button className="btn btn-style1 px-4 py-2"> Submit </Button>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </div>
    </Wrapper>
  )
}

export default SubscriptionAdd
