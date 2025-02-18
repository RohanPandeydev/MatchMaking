import React from 'react'
import LocalPagination from '../../../../utils/LocalPagination'
import Loader from '../../../../utils/Loader/Loader';
import parse from 'html-react-parser'
import { Button, Col, Row } from 'reactstrap'
import { FaTrashAlt } from 'react-icons/fa'
import ButtonLoader from '../../../../utils/Loader/ButtonLoader';
import NoActiveDataFound from '../../../../utils/NoActiveDataFound';
import { LiaEditSolid } from 'react-icons/lia'
import { IsAccessibleMethod } from '../../../../guard/Rbac';
import PermissionSets from '../../../../guard/Method';
const TemplateListing = ({ handleEdit, deleteCampaignTemplate, TemplateList, isLoad, handleDelete, currentPage, pageSize, handlePageChange }) => {
    return (
        <>
            <Row>
                {
                    isLoad ? <Loader /> : TemplateList?.data?.results?.length == 0 ? <NoActiveDataFound msg={"No Data Found"} /> : TemplateList?.data?.results?.map((each) => {
                        return <>

                            <Col xs="12" md="6" lg="4" xxl="3" className='mb-3'>
                                <div className='saved-sms-email-template-list'>
                                    <h4>{each?.title || "N/A"}</h4>
                                    <p>{each?.body && parse(each?.body) || "N/A"}</p>
                                    <div className='edit-del-btn-wrap'>
                                        <ul>
                                            <IsAccessibleMethod
                                                method={Object.keys(PermissionSets.Campign.Campaign_Template.Update)[0]}
                                                route={window.location.pathname}

                                            >
                                                <li>
                                                    <Button className='edit-btn blue-btn' onClick={(e) => handleEdit(e, each?.id, each)}><LiaEditSolid /></Button>
                                                </li>
                                            </IsAccessibleMethod>
                                            <IsAccessibleMethod
                                                method={Object.keys(PermissionSets.Campign.Campaign_Template.Delete)[0]}
                                                route={window.location.pathname}

                                            >
                                                <li>
                                                    <Button className='del-btn btn-outline-style1' disabled={deleteCampaignTemplate.isLoading} onClick={() => handleDelete(each?.id)}>{deleteCampaignTemplate.isLoading ? <ButtonLoader /> : <FaTrashAlt />}</Button>
                                                </li>
                                            </IsAccessibleMethod>
                                        </ul>
                                    </div>

                                </div>
                            </Col>


                        </>
                    })
                }
            </Row>




            {!isLoad && <LocalPagination
                count={TemplateList?.data?.count || []}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />}

        </>
    )
}

export default TemplateListing