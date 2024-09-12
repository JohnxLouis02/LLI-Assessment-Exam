import React from 'react'
import {Routes, Route} from "react-router-dom"
import Login from '../pages/login'
import Register from '../pages/register'
import Errorpage from '../pages/Errorpage'
import Dashboard from '../pages/dashboard'


const Pages = () => {
  return (
		<div>
			<Routes>
				<Route path="/" element={<Login />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route path="/dashboard" element={<Dashboard />}></Route>
				<Route path="*" element={<Errorpage />} />
			</Routes>
		</div>
	)
}

export default Pages