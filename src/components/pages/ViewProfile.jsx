import React from 'react'
import Wrapper from '../layouts/Wrapper'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { LiaUserTimesSolid } from 'react-icons/lia'
import { GiHumanTarget } from 'react-icons/gi'
import { FiPlus } from 'react-icons/fi'
import { VscFilter } from 'react-icons/vsc'

const ViewProfile = () => {
  return (
    <Wrapper>
        <div className="view-profile-wrapper">
            <div className="view-profile-head">
                <ul>
                    <li>
                        <FormGroup>
                            <Input id="select-all" type="checkbox" />
                            <Label for="select-all">
                                Select All
                            </Label>
                        </FormGroup>
                    </li>
                    <li className="delete-btn">
                        <Button className="btn btn-outline-style1"><RiDeleteBin6Line /></Button>
                    </li>
                    <li>
                        <Button className="btn green-btn"><AiOutlineLike /></Button>
                    </li>
                    <li>
                        <Button className="btn btn-outline-style1"><AiOutlineDislike /></Button>
                    </li>
                    <li className="suspended-member">
                        <Button className="btn orange-btn"><LiaUserTimesSolid /></Button>
                    </li>
                    <li>
                        <Button className="btn blue-btn"><GiHumanTarget /></Button>
                    </li>
                    <li>
                        <Input id="" name="" type="select" >
                            <option>
                                Select No. of children
                            </option>
                            <option>
                                1
                            </option>
                            <option>
                                2
                            </option>
                        </Input>
                    </li>
                    <li>
                        <Button className="btn green-btn">Assign Staff </Button>
                    </li>
                    <li>
                        <Button className="btn btn-outline-style1">Unassigned Staff </Button>
                    </li>
                    <li>
                        <Input id="" name="" type="select" >
                            <option>
                            Active (124044)
                            </option>
                            <option>
                                1
                            </option>
                            <option>
                                2
                            </option>
                        </Input>
                    </li>
                    <li>
                        <Button className="btn btn-style1"> Add <FiPlus /></Button>
                    </li>
                    <li>
                        <Button className="btn btn-outline-style1"> Filter <VscFilter /></Button>
                    </li>
                </ul>
            </div>
        </div>
      
    </Wrapper>
  )
}

export default ViewProfile
