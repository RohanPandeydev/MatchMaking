import React from 'react'
import Wrapper from '../../../layouts/Wrapper'
import { Button, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap'

const EmailTemplete = () => {
  return (
    <Wrapper>
      <div className='email-templete-wrapper'>
        <div className='email-templete-inner-wrap'>
            <Row>
                <Col xs="12" md="7">
                    <div className='email-templete-left-wrap'>
                        
                        <FormGroup className='common-formgroup'>
                            <Label for="exampleEmail">
                                Name
                            </Label>
                            <Input
                            id="exampleEmail"
                            name="text"
                            placeholder="with a placeholder"
                            type="text"
                            />
                        </FormGroup>
                        <FormGroup className='common-formgroup'>
                            <Label for="exampleEmail">
                                Name
                            </Label>
                            <Input
                            id="exampleEmail"
                            name="text"
                            placeholder="with a placeholder"
                            type="text"
                            />
                        </FormGroup>
                        <FormGroup className='common-formgroup'>
                            <Label for="exampleEmail">
                                Name
                            </Label>
                            <Input
                            id="exampleEmail"
                            name="text"
                            placeholder="with a placeholder"
                            type="text"
                            />
                        </FormGroup>
                        <FormGroup className='common-formgroup'>
                            <Label for="exampleEmail">
                                Name
                            </Label>
                            <Input
                            id="exampleEmail"
                            name="text"
                            placeholder="with a placeholder"
                            type="text"
                            />
                        </FormGroup>
                        <FormGroup className='common-formgroup'>
                            <Button className='btn btn-style1'>Apply</Button>
                        </FormGroup>
                        
                    </div>
                </Col>
                <Col xs="12" md="5">
                    <div className='email-templete-guidelines-wrap'>
                        <h3>Template Guidelines</h3>
                        <ul>
                            <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab molestias quibusdam eum.</li>
                            <li>Dolor magni, consectetur enim at hic, deserunt maiores nesciunt voluptatibus nisi,</li>
                            <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab molestias quibusdam eum. Dolor magni, consectetur enim at hic, deserunt maiores nesciunt voluptatibus nisi, minima voluptas ex adipisci nulla iure ea?</li>
                            <li>Ab molestias quibusdam eum. Dolor magni, consectetur enim at hic, deserunt maiores</li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </div>
      </div>
    </Wrapper>
  )
}

export default EmailTemplete
