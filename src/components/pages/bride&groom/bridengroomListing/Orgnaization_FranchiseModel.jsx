import React from 'react'
import { IoClose } from 'react-icons/io5';
import {
    Button,
    Col,
    Collapse,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    Row,
} from "reactstrap";
const Orgnaization_FranchiseModel = ({
    handleOrganizationFranchiseModel,
    org_FranchiseModel, handleCloseOrganizationFranchiseModel, setOrg_FranchsieModel

}) => {
    return (
        <>

            <Modal
                size="lg"
                className="common-modal"
                isOpen={org_FranchiseModel}
                toggle={handleOrganizationFranchiseModel}
            >

                < >
                    <Button className="close-btn" onClick={handleCloseOrganizationFranchiseModel}>
                        <IoClose />
                    </Button>
                    <ModalBody>
                        <Row>


                        </Row >






                    </ModalBody>
                </>
            </Modal>

        </>
    )
}

export default Orgnaization_FranchiseModel