import React from 'react'
import  { DropdownListingRoute } from '../../utils/DropdownListing'
import { Route } from 'react-router-dom'

const DropwDownRoutes = () => {
  return (
    <>
    {DropdownListingRoute.map((item) => (
        <Route key={item.id} path={item.link} element={item?.component} />
      ))}
      </>
  )
}

export default DropwDownRoutes