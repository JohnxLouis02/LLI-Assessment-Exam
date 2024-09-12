import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import bg from '../assets/bg_1.jpg'

const Register = () => {
    const onFinish = (values) => {
			console.log('Success:', values)
		}
		const onFinishFailed = (errorInfo) => {
			console.log('Failed:', errorInfo)
		}
  return (
		<div className="flex justify-center flex-col items-center h-screen gap-10 sm:flex-row sm:p-0 p-4">
			<div>
				<img src={bg} alt="teachers" className="w-[600px] h-auto" />
			</div>
			<div className="border p-6 rounded-md shadow-md w-[400px]">
				<h1 className="font-bold text-center text-xl">
					Register to your Account{' '}
				</h1>
				<Form
					className="pt-4"
					name="basic"
					// labelCol={{
					// 	span: 8,
					// }}
					// wrapperCol={{
					// 	span: 16,
					// }}

					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					autoComplete="off"
					layout="vertical"
				>
					<p className="font-medium mb-3">Let's setup your Account</p>
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
						name="c-password"
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
				</Form>
			</div>
		</div>
	)
}

export default Register