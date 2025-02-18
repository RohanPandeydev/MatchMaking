import React from 'react'
import StaffProfileUser from "../../../assets/images/organization-avatar-img.jpg";
import config from '../../../../config';

const UserChatProfile = ({ loggedInUserDetails }) => {

    return (
        <div className='chat-staff-profile-wrap'>
            <div className='staff-profile-img'>
                <img className='img-fluid' src={loggedInUserDetails?.staffimage_url ? `${config.apiUrl}${loggedInUserDetails?.staffimage_url}` : StaffProfileUser} alt="" />
            </div>
            <div className='staff-info'>
                <h4>{loggedInUserDetails?.is_superuser ? "Admin" : `${loggedInUserDetails?.first_name || ""}${loggedInUserDetails?.last_name}`} </h4>
                {!loggedInUserDetails?.is_superuser && <h5 className='staff-code'><span>{loggedInUserDetails?.staffCode}</span></h5>}
            </div>
        </div>
    )
}

export default UserChatProfile