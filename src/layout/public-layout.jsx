import React from 'react'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <div>
        {/* Add your public layout components here, such as a header or footer */}
        <Outlet />
    </div>
  )
}

export default PublicLayout