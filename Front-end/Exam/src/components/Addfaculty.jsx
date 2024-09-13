import React, { useState } from 'react'
import { Button, Modal, Form, Input, Select, DatePicker, Avatar,Radio } from 'antd'
import { IoMdAdd } from 'react-icons/io'
import { FaUserCircle } from 'react-icons/fa'
import axios from 'axios'

const { Option } = Select

const AddFaculty = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const handleSubmit = async (values) => {

		try {
			// Make a POST request using Axios to add the faculty
			const response = await axios.post('http://localhost:3000/addFaculty', {
				name: values.name,
				college: values.college,
				status: values.status,
				academicStatus: values.academicStatus,
				birthday: values.birthday, // Format the date correctly
				gender: values.gender,
				address: values.address || '', // Optional field
			})

			if (response.data.success) {
				console.log('Faculty added successfully:', response.data.message)
				closeModal() // Close modal after submission
				 window.location.reload()
			} else {
				console.error('Failed to add faculty:', response.data.message)
			}
		} catch (error) {
			console.error('Error submitting faculty details:', error)
		}
	}


	return (
		<div className="flex justify-end">
			<Button type="primary" onClick={openModal}>
				<span className="text-xl">
					<IoMdAdd />
				</span>
				Add Faculty
			</Button>

			<Modal
				open={isModalOpen}
				onCancel={closeModal}
				footer={null}
				title={<div className="text-center">Add Faculty</div>}
			>
				<Form
					layout="horizontal"
					onFinish={handleSubmit}
					wrapperCol={{ span: 50 }}
					className="mt-4"
				>
					<Form.Item
						name="name"
						label="Name"
						rules={[
							{ required: true, message: 'Please enter the faculty name!' },
						]}
					>
						<Input placeholder="Enter faculty name" />
					</Form.Item>

					<Form.Item
						name="college"
						label="College"
						rules={[{ required: true, message: 'Please select the college!' }]}
					>
						<Select placeholder="Select college">
							<Option value="CON">College of Nursing</Option>
							<Option value="COE">College of Engineering</Option>
							<Option value="CICT">
								College of Information and Communications Technology
							</Option>
							{/* Add more options as needed */}
						</Select>
					</Form.Item>

					<Form.Item
						name="status"
						label="Employment Status"
						rules={[
							{
								required: true,
								message: 'Please select Employment Status',
							},
						]}
					>
						<Radio.Group buttonStyle="solid">
							<Radio.Button value="Full-Time">Full-Time</Radio.Button>
							<Radio.Button value="Part-Time">Part-Time</Radio.Button>
							<Radio.Button value="Contractual">Contractual</Radio.Button>
						</Radio.Group>
					</Form.Item>

					<Form.Item
						name="academicStatus"
						label="Academic Status"
						rules={[{ required: true, message: 'Please select the college!' }]}
					>
						<Select placeholder="Select college">
							<Option value="Under Graduate">Under Graduate</Option>
							<Option value="Batchelor's Degree">Bachelor's Degree</Option>
							<Option value="Master's Degree">Master's Degree</Option>
							<Option value="Doctoral">Doctoral</Option>
						</Select>
					</Form.Item>

					<Form.Item
						name="birthday"
						label="Birthday"
						rules={[{ required: true, message: 'Please select the birthday!' }]}
					>
						<Input
							className="w-full p-2 border border-gray-300 rounded "
							type="date"
						/>
					</Form.Item>
					<Form.Item
						name="gender"
						label="Gender"
						rules={[
							{
								required: true,
								message: 'Please select Employment Status',
							},
						]}
					>
						<Radio.Group buttonStyle="solid">
							<Radio.Button value="Male">Male</Radio.Button>
							<Radio.Button value="Female">Female</Radio.Button>
							<Radio.Button value="Other">Other</Radio.Button>
						</Radio.Group>
					</Form.Item>

					<Form.Item name="address" label="Address">
						<Input.TextArea placeholder="Enter address" rows={3} />
					</Form.Item>

					<Form.Item className="flex justify-end mb-0">
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}

export default AddFaculty
