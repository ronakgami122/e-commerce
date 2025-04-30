import React from 'react'
import withAuth from '../hoc/with-auth'
import { Outlet } from 'react-router-dom'

// Simply apply the HOC to Outlet component
const AuthLayout = withAuth(Outlet)

export default AuthLayout