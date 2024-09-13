import React, { useRef } from 'react'
import { Button, Modal } from 'antd'
import { FaPrint } from 'react-icons/fa'
import ReactToPrint from 'react-to-print'
import PrintTemplate from './PrintTemplate'

const Facultyprint = ({ faculty }) => {
	const componentRef = useRef()

	return (
		<div>

			<ReactToPrint
				trigger={() => (
					<Button className="new-min" icon={<FaPrint />}>
						<span className="ml-0 text-base sm:hidden md:block">
							Faculty Report
						</span>
					</Button>
				)}
				content={() => componentRef.current}
			/>
			<div className="hidden print:block bg-white" ref={componentRef}>
				<PrintTemplate faculty={faculty} />
			</div>

      {/* <Modal>
        
      </Modal> */}
		</div>
	)
}

export default Facultyprint
