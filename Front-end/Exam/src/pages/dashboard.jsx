import React, { useState } from 'react'
import { Card, Tag, Modal, Avatar } from 'antd'
import { FaUserCircle } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'

const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		college: 'BSIT',
		status: 'Full-Time',
		gender: 'Male',
		academicStatus: 'PhD',
		birthday: '1991-05-15',
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		college: 'BSIS',
		status: 'Part-Time',
		gender: 'Male',
		birthday: '1981-08-22',
		academicStatus: 'Master’s',
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sydney No. 1 Lake Park',
		college: 'BLIS',
		status: 'Full-Time',
		gender: 'Male',
		birthday: '1981-08-22',
		academicStatus: 'Bachelor’s',
	},
	{
		key: '4',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
		college: 'BSIT',
		status: 'Part-Time',
		gender: 'Male',
		birthday: '1981-08-22',
		academicStatus: 'Master’s',
	},
]

const Dashboard = () => {
	const [selectedFaculty, setSelectedFaculty] = useState(null)

	const openModal = (faculty) => {
		setSelectedFaculty(faculty)
	}

	const closeModal = () => {
		setSelectedFaculty(null)
	}

	function getTagColor(value, type) {
		switch (type) {
			case 'department':
				switch (value) {
					case 'BSIT':
						return 'blue'
					case 'BLIS':
						return 'gold'
					case 'BSIS':
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

	return (
		<div className="min-h-screen mt-1 p-2 flex justify-center">
			<div className="p-4 max-w-3xl flex-1 border rounded-md shadow">
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
					<div className="flex border justify-center items-center gap-2 p-2">
						<div className="flex flex-col text-center">
							<div className="text-sm">
								Hello, <span> User</span>
							</div>
							<small className="text-gray-600 font-semibold">Admin</small>
						</div>
						<button className="border p-2 rounded-full h-fit flex items-center gap-1">
							{/* <span>logout</span> */}
							<MdLogout />
						</button>
					</div>
				</div>

				{/* Body */}
				<div className="pt-3 p-2 mt-10">
					<p className="font-medium mb-3 ">List of Faculty</p>
					{data.length === 0 ? (
						<div className="text-center text-gray-500 h-64 rounded-md border-2 flex justify-center items-center">
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
										maxWidth: '300px',
									}}
									onClick={() => openModal(item)} // Open modal on card click
									className="shadow-sm "
								>
									<div className="gap-4">
										<div className="flex gap-4">
											<div>
												{/* Use FaUserCircle as the default icon */}
												<Avatar
													icon={<FaUserCircle />}
													className="h-14 w-14  rounded-full border-gray-200 border dark:border-none self-center sm:self-start"
													style={{ fontSize: '60px' }}
												/>
											</div>
											<div className="">
												<p className="font-bold mt-2">{item.name}</p>
												<Tag color={getTagColor(item.college, 'department')}>
													<small>{item.college || 'No College'}</small>
												</Tag>
												<Tag color={getTagColor(item.status, 'status')}>
													<small>{item.status || 'No Status'}</small>
												</Tag>
											</div>
										</div>
										<div>
											<div className="flex text-xs pt-2">
												<div className="flex gap-1 flex-row">
													<p className="font-medium">Academic Status:</p>{' '}
													<span>
														{item.academicStatus || 'No Academic Status'}
													</span>
												</div>
											</div>
											<p>
												<small>
													<span className="font-medium">Birthday:</span>{' '}
													{item.birthday}
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
				footer={null}
			>
				{selectedFaculty && (
					<div>
						<div className="flex">
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
								<h3 className="text-lg pb-1 pt-3 ">Personal Information</h3>
								<div className="flex flex-col gap-1 text-base">
									<p>
										<span className="font-medium">Academic Status: </span>
										{selectedFaculty.academicStatus || 'No Position'}
									</p>
									<p>
										<span className="font-medium">Gender: </span>
										{selectedFaculty.gender}
									</p>

									<p>
										<span className="font-medium">Birthday: </span>
										{selectedFaculty.birthday}
									</p>
									<p>
										<span className="font-medium">Address: </span>
										{selectedFaculty.address}
									</p>
								</div>
							</div>
						</div>
						{/* Additional details */}
					</div>
				)}
			</Modal>
		</div>
	)
}

export default Dashboard
