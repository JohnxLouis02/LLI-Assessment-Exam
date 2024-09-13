import React from 'react'
import { Tag, Table } from 'antd'
import './Print.css'

const PrintTemplate = ({ faculty }) => {
	// Function to get tag color based on value and type
	const getTagColor = (value, type) => {
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

	// Function to calculate age from birthday
	const calculateAge = (birthday) => {
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

	// Function to format birthday
	const formatBirthday = (birthday) => {
		if (!birthday) return 'No Birthday'

		const date = new Date(birthday)
		const options = { month: 'long', day: 'numeric', year: 'numeric' }
		return date.toLocaleDateString('en-US', options)
	}

	// Get current date and format it
	const getCurrentDate = () => {
		const today = new Date()
		const options = { month: 'long', day: 'numeric', year: 'numeric' }
		return today.toLocaleDateString('en-US', options)
	}

	// Slice the data to include only the last 8 entries
	const lastEightFaculty = faculty.slice(-8)

	// Define columns for the Table
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <span>{text || 'No Name'}</span>,
		},
		{
			title: 'College & Status',
			key: 'collegeStatus',
			render: (text, record) => (
				<div className='flex'>
					<Tag color={getTagColor(record.college, 'department')}>
						<span>{record.college || 'No College'}</span>
					</Tag>
					<Tag color={getTagColor(record.status, 'status')}>
						<span className='text-sm'>{record.status || 'No Status'}</span>
					</Tag>
				</div>
			),
		},
		{
			title: 'Academic Status',
			dataIndex: 'academicStatus',
			key: 'academicStatus',
			render: (text) => <span>{text || 'No Position'}</span>,
		},
		{
			title: 'Birthday',
			dataIndex: 'birthday',
			key: 'birthday',
			render: (text) => <span>{formatBirthday(text)}</span>,
		},
		{
			title: 'Age',
			key: 'age',
			render: (text, record) => (
				<span>
					{record.birthday
						? `${calculateAge(record.birthday)} years old`
						: 'No Age'}
				</span>
			),
		},
		{
			title: 'Gender',
			dataIndex: 'gender',
			key: 'gender',
			render: (text) => <span>{text || 'No Gender'}</span>,
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
			render: (text) => <span>{text || 'No Address'}</span>,
		},
	]

	return (
		<div>
			{lastEightFaculty.length === 0 ? (
				<p>No faculty data available</p>
			) : (
				<div className=" print_style">
					<div className="pb-4 mt-2 p-2">
						<header className="font-bold text-xl">Faculty Report</header>
						<div className="flex justify-between">
							<div className="font-medium text-sm">
								University Faculty Management System
							</div>
                            <p className='text-sm'> <span className='font-medium'>Date Printed:</span> {getCurrentDate()}</p>
						</div>
						
					</div>
					<div className="border">
						<Table
							dataSource={lastEightFaculty}
							columns={columns}
							pagination={false}
							rowKey="id" // Assuming each faculty has a unique 'id' field
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export default PrintTemplate
