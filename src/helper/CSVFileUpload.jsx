import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Button, FormGroup, FormText, Input, Modal, ModalBody } from 'reactstrap'
import CsvDownloader from '../utils/CsvFileDownloader'
import ButtonLoader from '../utils/Loader/ButtonLoader'

const CSVFileUpload = ({ UploadBulkFile,fileName,
    toggleImportCSVModel, setToggleImportCSVModel, handleImportCSVModel, handleCloseImportCSVModel, handleFileChange, handleSubmit, fileState, file
}) => {
    return (
        <>
            <Modal size="lg" className="common-modal new-ticket-modal" isOpen={toggleImportCSVModel} toggle={handleImportCSVModel}>
                <Button className="close-btn" onClick={handleCloseImportCSVModel}><IoClose /></Button>
                <ModalBody>
                    <div className="modal-heading">
                        <h4>Import CSV File</h4>
                    </div>

                    <div className="ticket-form">
                        <FormGroup className="common-formgroup">
                            <Input
                                id="exampleFile"
                                // value={fileState}
                                onChange={handleFileChange}
                                name="file"
                                type="file"
                                accept=".csv"

                            />
                            <FormText>
                                Maximum Size 5MB
                            </FormText>
                            {fileState.fileError && <p className='text-danger'>{fileState.fileError}</p>}

                        </FormGroup>
                        <FormGroup className="common-formgroup">
                            <Button disabled={UploadBulkFile?.isLoading} className="btn btn-outline-style1 px-4 py-2 mb-2 me-2" onClick={handleSubmit} > {UploadBulkFile?.isLoading ? <ButtonLoader /> : "Submit"} </Button>
                            {/* <Button  className="btn green-btn px-4 py-2 mb-2 me-2" onClick={() => CsvDownloader(file,fileName)}> Sample CSV Download </Button> */}
                            <a href={file}  download={true} className="btn green-btn px-4 py-2 mb-2 me-2" > Sample CSV Download </a>
                        </FormGroup>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default CSVFileUpload