import React from "react";
import { IoClose } from "react-icons/io5";
import {
  Button,
  Col,
  Collapse,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import ButtonLoader from "../../../../../utils/Loader/ButtonLoader";
const VerifyModel = ({
  handleVerifyValue,
  setToggleVerifyModel,
  toggleVerifyModel,
  handleVerifyModel,
  updateVerifyUser,
  handleCloseModel,
  formik,
  isPremium,
  setIsPremium,
  isToggle,
}) => {
  const colorCode = ["green", "orange", "blue", "red"];
  return (
    <Modal
      size="lg"
      className="common-modal"
      isOpen={toggleVerifyModel}
      toggle={handleVerifyModel}
    >
      <form onSubmit={formik.handleSubmit}>
        <Button className="close-btn" onClick={handleCloseModel}>
          <IoClose />
        </Button>
        <ModalBody>
          {
            <>
              <div className="modal-heading">
                <h4>Interest</h4>
              </div>
              {colorCode?.map((each) => {
                return (
                  <Button
                    className={`verify-${each}  px-3 py-2 me-2 mb-2 ${
                      formik.values.colorCode == each ? "active" : ""
                    }`}
                    //   onClick={() => handleVerifyValue(each)}
                    disabled={updateVerifyUser?.isLoading}
                    onClick={() => handleVerifyValue(each)}
                    type="button"
                    name="colorCode"
                  >
                    <span className="text-capitalize">{each}</span>
                  </Button>
                );
              })}
              {formik.touched.colorCode && (
                <p className="text-danger">{formik.errors.colorCode}</p>
              )}
            </>
          }

          { (
            <Row className="mt-2">
              <Col xs="12" md="12" lg="12">
                <FormGroup className="common-formgroup">
                  <Label> Amount </Label>
                  <Input
                    id=""
                    name="amount"
                    value={formik.values.amount}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="|"
                    type="text"
                  />{" "}
                </FormGroup>
                {formik.touched.amount && (
                  <p className="text-danger">{formik.errors.amount}</p>
                )}
              </Col>
              <Col xs="12" md="12" lg="12">
                <FormGroup>
                  <Input
                    id="Is_Premium"
                    name="ispremium"
                    placeholder="|"
                    checked={isPremium}
                    onClick={() => setIsPremium(!isPremium)}
                    type="checkbox"
                  />
                  <Label for="Is_Premium" className="mb-0">
                    Is Premium
                  </Label>
                </FormGroup>
              </Col>
              <Col xs="12" md="12" lg="12" className="text-end">
                <Button
                  className="btn btn-style1"
                  type="submit"
                  disabled={
                    !!!formik.values.colorCode && updateVerifyUser?.isLoading
                  }
                >
                  {updateVerifyUser?.isLoading ? <ButtonLoader /> : "Save"}
                </Button>
              </Col>
            </Row>
          )}
        </ModalBody>
      </form>
    </Modal>
  );
};

export default VerifyModel;
