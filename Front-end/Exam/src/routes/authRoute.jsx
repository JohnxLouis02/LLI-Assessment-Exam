import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({ element: Component, ...rest }) => {
	const token = localStorage.getItem('authToken')

	return token ? <Component {...rest} /> : <Navigate to="/login" replace />
}

export default AuthRoute
