import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { Input, InputGroup, InputGroupText } from 'reactstrap'

const UserChatSearch = ({ handleSearch, search }) => {
  return (
    <div className='chat-search-wrap'>
      <InputGroup>
        <InputGroupText>
          <IoSearchOutline />
        </InputGroupText>
        <Input placeholder="username" value={search} onChange={handleSearch} />
      </InputGroup>
    </div>
  )
}

export default UserChatSearch