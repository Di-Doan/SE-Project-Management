import React from "react";
import Modal from "react-bootstrap/Modal";
import "./Modal.css"

function CourseModal({ setModal, modal, course }) {
    const handleClose = () => setModal(false);
  return (
    <Modal
      
      show={modal}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Current Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {course ?course.filter(filtered=> filtered.status == 1).map(item=> (<div className="modal-box"> 
          <div className="modal-course">
            {item.name}
          </div>
          <div>{item.code}</div>
        </div>)) : null}
      </Modal.Body>
    </Modal>
  );
}

export default CourseModal;
