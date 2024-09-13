import React from 'react'
import { Popconfirm,Button } from 'antd'
import { MdDelete } from 'react-icons/md'
const Deletefaculty = () => {
  return (
		<>
			<Popconfirm
				key="delete"
				title="Delete Faculty"
				description="Are you sure you want to delete Faculty?"
				okText="Yes"
				cancelText="No"
			>
				<Button key="delete" type="primary" danger>
					Delete{' '}
					<span className="text-base">
						<MdDelete />
					</span>
				</Button>
			</Popconfirm>
		</>
	)
}

export default Deletefaculty