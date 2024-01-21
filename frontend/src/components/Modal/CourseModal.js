import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './Modal.css';
import { Link } from 'react-router-dom';

function CourseModal({ setModal, modal, courses }) {
	const handleClose = () => setModal(false);
	return (
		<Modal show={modal} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Current Courses</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{courses
					? courses
							.filter((filtered) => filtered.status == 1)
							.map((item) => (
								<div key={item.id} className='modal-box'>
									<Link to={`/courses/${item.id}`}>
										<div className='modal-course'>{item.name}</div>
									</Link>

									<div>{item.code}</div>
								</div>
							))
					: null}
			</Modal.Body>
		</Modal>
	);
}

export default CourseModal;
