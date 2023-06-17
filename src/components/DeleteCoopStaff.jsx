import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteCoopStaff = ({ coopStaff, onClose, onCoopStaffDelete }) => {
  let token = localStorage.getItem('token');
  console.log(token);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/coopstaffs/${coopStaff.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log(response.data);
      onCoopStaffDelete(coopStaff); // Silinen veriyi tablodan kaldır
      onClose(); // Kapatma işlemini çağır
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Cooperative Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this cooperative staff?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCoopStaff;
