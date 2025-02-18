import React from 'react'
import { NavLink, Button, Modal, ModalBody, Nav, NavItem, Row, TabContent, TabPane, Label, FormGroup, Input } from "reactstrap";
import useFetchMasterData from '../helper/FetchMasterContent'
import config from '../../config'
import { IoClose } from "react-icons/io5";
import classnames from "classnames";

import Editor from './Editor';
import ListingCommentModule from './ListingCommentModule';
import ButtonLoader from './Loader/ButtonLoader';

const CommentModule = ({isFromMemberPanel, date, AddCommentTab, loggedInUserId, pageNumber, limit, toggleAddCommentTab, toggleViewAddComment, handleViewAddComment, handleResetDateFilter, setTextErr, text, textErr, setText, handleEditorChange, handleSubmit, CommentModuleApi, UpdateComment, editId, handleEditComment, tenant=false, handleDeleteComment,brideandgroom=false }) => {

    // Activity Listing 
    const { data, isLoading } = useFetchMasterData(config.masterList[18], "all-commentactivity-list", '')

    return (
        <>
            <Modal size="xl" className="common-modal add-comment-modal" isOpen={toggleViewAddComment} toggle={handleViewAddComment}>
                <Button className="close-btn" onClick={handleViewAddComment}><IoClose /></Button>
                <ModalBody>
                    <div className="modal-heading">
                        <h4>Add Comment</h4>
                    </div>
                    <div className="add-comment-wrap">
                        <Nav tabs className="add-comment-tab mb-3">
                            <NavItem>
                                <NavLink
                                    className={classnames({
                                        active: AddCommentTab == 0,
                                    })}
                                    onClick={() => toggleAddCommentTab(0, false)}
                                >
                                    <span className="icon"> </span> {date}
                                </NavLink>
                            </NavItem>

                            {
                                !isLoading && data?.map((each, index) => {
                                    index = index + 1
                                    return <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active: AddCommentTab == each?.id,
                                            })}
                                            onClick={() => toggleAddCommentTab(each?.id)}
                                        >
                                            <span className="icon">  {each?.image && (
                                                <img
                                                    src={each?.image}
                                                    alt={each?.name}
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        marginRight: '10px',
                                                        objectFit: 'cover',
                                                        borderRadius: '50%',
                                                    }}
                                                />
                                            )}</span> {each?.name}
                                        </NavLink>
                                    </NavItem>

                                })
                            }


                        </Nav>
                        <TabContent activeTab={AddCommentTab}>
                            {
                                AddCommentTab == 0 ? <TabPane tabId={0} ><ListingCommentModule  isFromMemberPanel={isFromMemberPanel} handleEditComment={handleEditComment} handleDeleteComment={handleDeleteComment} AddCommentTab={AddCommentTab} loggedInUserId={loggedInUserId} date={date} tenant={tenant} brideandgroom={brideandgroom} isDate={true} query="key" /> </TabPane> :

                                    <TabPane tabId={AddCommentTab}>
                                        <div className="activities-form-wrap">
                                            <FormGroup className="common-formgroup">

                                                <Editor
                                                    text={text}
                                                    setText={setText}
                                                    handleEditorChange={handleEditorChange}
                                                />
                                            </FormGroup>



                                            {textErr && <p className="text-danger">{textErr}</p>}
                                        </div>
                                        <Button onClick={handleSubmit} disabled={CommentModuleApi?.isLoading || UpdateComment?.isLoading} className="btn btn-style1">{CommentModuleApi?.isLoading || UpdateComment?.isLoading ? <ButtonLoader /> : editId ? "Update Comment" : "Add Comment"}</Button>
                                    </TabPane>



                            }
                        </TabContent>


                    </div>
                </ModalBody>
            </Modal >
        </>
    )
}

export default CommentModule