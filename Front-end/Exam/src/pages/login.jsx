import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd'
import bg from '../assets/bg_1.jpg'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
	const navigate = useNavigate()
	const onFinish = async (values) => {
		const { email, password } = values 
		try {
			const response = await axios.post('http://localhost:3000/login', {
				email,
				password,
			})

			if (response.data.success) {
				// Generate a 6-digit random token
				const token = Math.floor(100000 + Math.random() * 900000).toString() 

				// Save the token and user data in localStorage
				localStorage.setItem('authToken', token)
				localStorage.setItem('userEmail', email)

				 message.success('Login successful!')
				navigate('/dashboard')
			} else {
				message.error('Login failed. Please check your credentials.')
			}
		} catch (error) {
			message.error('An error occurred during login.')
		}
	}



	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div className="h-screen bg-gray-300 flex justify-center items-center">
			<div className="flex justify-center items-center gap-10 bg-white p-10 rounded-md shadow-md">
				<div>
					<img src={bg} alt="teachers" className="w-[600px] h-auto" />
				</div>
				<div className="border p-6 rounded-md w-[400px]">
					<h1 className="font-bold text-center text-xl">
						Welcome to Faculty Profile{' '}
					</h1>
					<Form
						className="pt-4"
						name="basic"
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						layout="vertical"
					>
						<p className="font-medium mb-3">Sign in to your Account</p>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{
									required: true,
									message: 'Please input your Email!',
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
							]}
						>
							<Input.Password />
						</Form.Item>
						<div className="flex justify-center">
							<Form.Item>
								<Button type="primary" htmlType="submit" className="w-60">
									Submit
								</Button>
							</Form.Item>
						</div>
						<div className="text-center">
							<p>
								Don't have an Account?{' '}
								<Link to="/register" className="hover:underline font-semibold">
									Register here
								</Link>
							</p>
						</div>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default Login
