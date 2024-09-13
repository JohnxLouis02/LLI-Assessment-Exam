import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd'
import Regbg from "../assets/register_bg.jpg"
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
	const navigate = useNavigate()
	const onFinish = async (values) => {
		const { email, password, c_password } = values

		// Basic password matching validation
		if (password !== c_password) {
			message.error('Passwords do not match!')
			return
		}

		try {
			//  POST request to the backend to register the user
			const response = await axios.post('http://localhost:3000/register', {
				email,
				password,
			})

			if (response.data.success) {
				message.success('Registration successful! Redirecting to login page...')
				navigate('/login') 
			} else {
				message.error(response.data.message || 'Registration failed!')
			}
		} catch (error) {
			message.error('An error occurred. Please try again.')
			console.log('Registration error:', error)
		}
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div className="h-screen bg-gray-300 flex justify-center items-center">
			<div className="flex justify-center items-center gap-10 bg-white p-10 rounded-md shadow-md">
				<div>
					<img src={Regbg} alt="teachers" className="w-[600px] h-[400px] bg-cover" />
				</div>
				<div className="border p-6 rounded-md w-[400px]">
					<h1 className="font-bold text-center text-xl">
						Register to Faculty Profile{' '}
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
						<p className="font-medium mb-3">Let's Create your Account</p>
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

						<Form.Item
							label="Confirm Password"
							name="c_password"
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
								Already have an Account?{' '}
								<Link to="/login" className="hover:underline font-semibold">
									Login here
								</Link>
							</p>
						</div>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default Register
