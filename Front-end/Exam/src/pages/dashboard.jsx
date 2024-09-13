import React, { useState, useEffect } from 'react'
import {
	Card,
	Tag,
	Modal,
	Avatar,
	Button,
	Form,
	Input,
	Select,
	message,
	Popconfirm,
	Radio,
} from 'antd'
import { FaUserCircle } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import AddFaculty from '../components/addFaculty'
import { IoPencil } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import FilesNone from '../assets/FilesNone.png'
import axios from 'axios'
import dayjs from 'dayjs';
import Facultyprint from '../components/facultyprint'


const { Option } = Select

const Dashboard = () => {
	const [data, setData] = useState([]) // Faculty data
	const [selectedFaculty, setSelectedFaculty] = useState(null)
	const [isEditing, setIsEditing] = useState(false)
	const [form] = Form.useForm()
	useEffect(() => {
		axios
			.get('http://localhost:3000/Faculty')
			.then((response) => {
				setData(response.data) // Update the data state with fetched data
			})
			.catch((error) => {
				console.error('Error fetching faculty data:', error)
			})
	}, []) // Run once when the component mounts

	const openModal = (faculty) => {
		setSelectedFaculty(faculty)
		setIsEditing(false) // Set to view mode by default
	}

	const closeModal = () => {
		setSelectedFaculty(null)
	}

	function getTagColor(value, type) {
		switch (type) {
			case 'department':
				switch (value) {
					case 'CICT':
						return 'blue'
					case 'COE':
						return 'gold'
					case 'CON':
						return 'cyan'
					default:
						return 'gray'
				}
			case 'status':
				switch (value) {
					case 'Part-Time':
						return 'magenta'
					case 'Full-Time':
						return 'geekblue'
					default:
						return 'gray'
				}
			default:
				return 'default-color'
		}
	}

	// Utility function to format birthday
		const formatBirthday = (birthday) => {
			if (!birthday) return 'No Birthday'

			const date = new Date(birthday)
			const options = { month: 'long', day: 'numeric', year: 'numeric' }
			return date.toLocaleDateString('en-US', options)
		}

	const calculateAge = (birthday) => {
		if (!birthday) return 'No Age'

		const birthDate = new Date(birthday)
		const today = new Date()
		const age = today.getFullYear() - birthDate.getFullYear()
		const monthDiff = today.getMonth() - birthDate.getMonth()
		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birthDate.getDate())
		) {
			return age - 1
		}
		return age
	}
	const enterEditMode = () => {
		setIsEditing(true)
	}

	// For editing the faculty data
	const handleSave = (values) => {
		axios
			.put(`http://localhost:3000/Faculty/${selectedFaculty.id}`, values)
			.then((response) => {
				// Update the local data state
				setData((prevData) =>
					prevData.map((item) =>
						item.id === selectedFaculty.id ? { ...item, ...values } : item
					)
				)
				message.success('Faculty Data Edited successfully')
				setSelectedFaculty(null)
				setIsEditing(false)
			})
			.catch((error) => {
				console.error('Error updating faculty data:', error)
			})
	}

	// For deleting the faculty data
	const handleDelete = () => {
		axios
			.delete(`http://localhost:3000/Faculty/${selectedFaculty.id}`)
			.then((response) => {
				// Update the local data state
				setData((prevData) =>
					prevData.filter((item) => item.id !== selectedFaculty.id)
				)
				message.success('Faculty Data Deleted successfully')
				setSelectedFaculty(null)
				 window.location.reload()
			})
			.catch((error) => {
				console.error('Error deleting faculty data:', error)
			})
	}

	return (
		<div className="min-h-screen p-4 flex justify-center bg-gray-300">
			<div className="p-4 max-w-4xl flex-1 border rounded-md shadow bg-white">
				{/* Navbar */}
				<div className="flex justify-between gap-5">
					<div className="pb-4 mt-2 p-2">
						<header className="font-bold text-xl">Faculty Profile</header>
						<div className="flex">
							<div className="font-medium text-sm">
								University Faculty Management System
							</div>
						</div>
					</div>
					<div className="flex border justify-center items-center gap-2 h-fit p-2 rounded-md">
						<div className="flex flex-col text-center">
							<div className="text-sm">
								Hello, <span> email</span>
							</div>
							<small className="text-gray-600 font-semibold">Admin</small>
						</div>
						<button className="border p-2 rounded-full h-fit flex items-center gap-1">
							{/* <span>logout</span> */}
							<MdLogout />
						</button>
					</div>
				</div>
				{/* Add Faculty */}
				<div className="mt-2 flex justify-end gap-4">
					<Facultyprint faculty={data}/>
					<AddFaculty  />
				</div>
				{/* Body */}
				<div className="pt-0 p-2 mt-3">
					<p className="font-medium mb-3 ">List of Faculty</p>
					{data.length === 0 ? (
						<div className="text-center text-gray-500 h-64 flex justify-center items-center flex-col">
							<img
								src={FilesNone}
								alt="teachers"
								className="w-[160px] h-auto"
							/>
							<p className="font-medium">No faculty profiles available....</p>
							<small></small>
						</div>
					) : (
						<div className="grid grid-cols-3 gap-4">
							{data.map((item) => (
								<Card
									key={item.key}
									bordered={true}
									style={{
										cursor: 'pointer',
									}}
									onClick={() => openModal(item)} // Open modal on card click
									className="shadow-sm border-2 max-w-[270px] w-[250px] justify-self-center"
								>
									<div className="gap-4">
										<div className="flex gap-0 sm:flex-row flex-col sm:gap-2">
											<div>
												{/* Use FaUserCircle as the default icon */}
												<Avatar
													icon={<FaUserCircle />}
													className="h-14 w-14  rounded-full border-gray-200 border dark:border-none self-center sm:self-start"
													style={{ fontSize: '60px' }}
												/>
											</div>
											<div className="">
												<p className="font-bold mt-2 text-ellipsis text-nowrap overflow-hidden">
													{item.name}
												</p>
												<div className="flex">
													<Tag color={getTagColor(item.college, 'department')}>
														<small>{item.college || 'No College'}</small>
													</Tag>
													<Tag color={getTagColor(item.status, 'status')}>
														<small>{item.status || 'No Status'}</small>
													</Tag>
												</div>
											</div>
										</div>
										<div>
											<div className="flex text-xs pt-2">
												<div className="flex gap-1 flex-row text-[10px]">
													<p className="font-medium">Academic Status:</p>{' '}
													<span>
														{item.academicStatus || 'No Academic Status'}
													</span>
												</div>
											</div>
											<p>
												<small>
													<span className="font-medium">Birthday:</span>{' '}
													{formatBirthday(item.birthday)}
												</small>
											</p>
											<p>
												<small>
													<span className="font-medium">Gender:</span>{' '}
													{item.gender}
												</small>
											</p>
										</div>
									</div>
								</Card>
							))}
						</div>
					)}
				</div>
			</div>

			<Modal
				open={selectedFaculty !== null}
				onCancel={closeModal}
				title={
					<div className="">
						{' '}
						{isEditing ? 'Edit Faculty' : 'Faculty Information'}
					</div>
				}
				footer={[
					<div key="footer">
						<div className="flex justify-end gap-4 pt-3">
							{isEditing ? (
								<Button key="save" type="primary" onClick={() => form.submit()}>
									Save
								</Button>
							) : (
								<>
									<Button key="edit" onClick={enterEditMode}>
										Edit
										<span className="text-base">
											<IoPencil />
										</span>
									</Button>
									<Popconfirm
										title="Delete Faculty"
										description="Are you sure you want to delete this faculty?"
										onConfirm={handleDelete} // Set the onConfirm prop to call handleDelete
									>
										<Button type="primary" danger>
											Delete{' '}
											<span className="text-base">
												<MdDelete />
											</span>
										</Button>
									</Popconfirm>
								</>
							)}
						</div>
					</div>,
				]}
			>
				{selectedFaculty &&
					(isEditing ? (
						<Form
							className="pt-2"
							form={form}
							layout="horizontal"
							initialValues={selectedFaculty}
							onFinish={handleSave}
						>
							<Form.Item
								name="name"
								label="Name"
								rules={[{ message: 'Please enter the faculty name!' }]}
							>
								<Input placeholder="Enter faculty name" />
							</Form.Item>

							<Form.Item
								name="college"
								label="College"
								rules={[{ message: 'Please select the college!' }]}
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
								rules={[{ message: 'Please select the college!' }]}
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
								rules={[{ message: 'Please select your birthday!' }]}
							>
								<Input
									className="w-full p-1 border border-gray-300 rounded bg-white"
									type="date" // Change input type to datetime-local
									value={
										form.getFieldValue('birthday')
											? dayjs(form.getFieldValue('birthday')).format(
													'YYYY-MM-DD'
											  )
											: ''
									}
									onChange={(e) =>
										form.setFieldsValue({ birthday: e.target.value })
									}
								/>
							</Form.Item>
							<Form.Item
								name="gender"
								label="Gender"
								rules={[
									{
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
						</Form>
					) : (
						<div>
							<div className="flex flex-row">
								<div className="flex flex-col justify-center w-28 h-28 rounded-full">
									{/* Profile picture or placeholder */}
									<Avatar
										icon={<FaUserCircle />}
										className="h-20 w-20 rounded-full border-gray-200 border object-cover self-center "
										style={{ fontSize: '85px' }}
									/>
								</div>
								<div className="ml-4 w-72">
									<div className="mt-6">
										<div className="flex flex-row justify-between">
											<span className="font-bold text-2xl">
												{selectedFaculty.name || 'No Name'}
											</span>
										</div>
										<div></div>
										{/* <Editfaculty/> */}
									</div>

									<div className="mt-2 ml-1">
										<Tag
											color={getTagColor(selectedFaculty.college, 'department')}
										>
											<h3>{selectedFaculty.college || 'No College'}</h3>
										</Tag>
										<Tag color={getTagColor(selectedFaculty.status, 'status')}>
											<h3>{selectedFaculty.status || 'No Status'}</h3>
										</Tag>
									</div>
								</div>
							</div>
							<h3 className="text-lg pb-1 font-semibold ">
								Personal Information
							</h3>
							<div className="flex flex-col gap-1 text-base">
								<p>
									<span className="font-medium">Academic Status: </span>
									{selectedFaculty.academicStatus || 'No Position'}
								</p>
								<p>
									<span className="font-medium">Birthday: </span>
									{formatBirthday(selectedFaculty.birthday)}
								</p>
								<p>
									<span className="font-medium">Age: </span>
									{selectedFaculty.birthday
										? `${calculateAge(selectedFaculty.birthday)} years old`
										: 'No Age'}
								</p>

								<p>
									<span className="font-medium">Gender: </span>
									{selectedFaculty.gender}
								</p>

								<p>
									<span className="font-medium">Address: </span>
									{selectedFaculty.address}
								</p>
							</div>
						</div>
					))}
			</Modal>
		</div>
	)
}

export default Dashboard
