import React from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { IoCallOutline } from 'react-icons/io5'
import { LuMailOpen } from 'react-icons/lu'
import { Button, Col, Progress, Row } from 'reactstrap'
import profileUser from "../../../../assets/images/no-images-available.jpg";
import Pagination from '../../../../utils/Pagination'
import NoActiveDataFound from '../../../../utils/NoActiveDataFound'
import config from '../../../../../config'
import SenderRecieverItems from './SenderRecieverItems'

const SenderListing = ({ handleOffCanvas, matchProfileListing, initialLimit, currentTab }) => {

    return (
        <>
            {matchProfileListing?.results?.length == 0 ? <NoActiveDataFound msg={"No matching profile found"} /> : matchProfileListing?.results?.map((each) => {
                each = each?.receiver
                return <SenderRecieverItems handleOffCanvas={handleOffCanvas} each={each} />

            })
            }
            {
                matchProfileListing?.results?.length > 0 && (
                    <Pagination
                        count={matchProfileListing?.count}
                        pageSize={initialLimit}
                    />
                )}
        </>
    )
}

export default SenderListing