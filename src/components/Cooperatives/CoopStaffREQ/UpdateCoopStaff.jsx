import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

const UpdateCoopStaff = ({ onSubmit, coopStaff, onClose }) => {
  const [editedCoopStaff, setEditedCoopStaff] = useState(coopStaff);
  const token = localStorage.getItem('token');
  const coopstaff = coopStaff;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCoopStaff((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    const newStatus = parseInt(selectedStatus, 10);
    setEditedCoopStaff((prevCoopStaff) => ({
      ...prevCoopStaff,
      status: newStatus,
    }));

    const updatedCoopStaff = {
      ...editedCoopStaff,
      status: newStatus,
    };
    onSubmit(updatedCoopStaff);

    console.log('handleStatusChange çalıştı');
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `https://s3.syntradeveloper.be/bisurularavel/api/coopstaffs/${coopstaff.id}`,
        editedCoopStaff,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClose();

      if (response.status == '200') {
        onSubmit('OK');
      } else {
        onSubmit(response);
      }
    } catch (error) {
      console.error('Request Error:', error);
    }
  };

  return (
    <Modal className="my-modal" show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'white' }}>
          Update Cooperative Staff
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={editedCoopStaff.name}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Surname"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="surname"
              placeholder="Surname"
              value={editedCoopStaff.surname}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Address"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="address"
              placeholder="Address"
              value={editedCoopStaff.address}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Phone Number"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="password"
              placeholder="Phone Number"
              value={editedCoopStaff.password}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Department"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="department"
              placeholder="Department"
              value={editedCoopStaff.department}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Date of Birth"
            className="mb-3"
          >
            <Form.Control
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={editedCoopStaff.dateOfBirth}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Status"
            className="mb-3"
          >
            <Form.Select
              value={editedCoopStaff.status}
              name="status"
              onChange={handleStatusChange}
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Place of Birth"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="placeOfBirth"
              placeholder="Place of Birth"
              value={editedCoopStaff.placeOfBirth}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Marital Status"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="maritalStatus"
              placeholder="Marital Status"
              value={editedCoopStaff.maritalStatus}
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

UpdateCoopStaff.propTypes = {
  coopStaff: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UpdateCoopStaff;
