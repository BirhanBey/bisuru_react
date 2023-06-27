import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

const UpdateFarmStaff = ({ onSubmit, farmStaff, onClose }) => {
  const [editedFarmStaff, setEditedFarmStaff] = useState(farmStaff);
  const token = localStorage.getItem('token');
  console.log(farmStaff);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedFarmStaff((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    const newStatus = parseInt(selectedStatus, 10);
    setEditedFarmStaff((prevFarmStaff) => ({
      ...prevFarmStaff,
      status: newStatus,
    }));

    const updatedFarmStaff = {
      ...editedFarmStaff,
      status: newStatus,
    };
    onSubmit(updatedFarmStaff);

    console.log('handleStatusChange çalıştı');
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `https://s3.syntradeveloper.be/bisurularavel/api/farmstaff/${farmStaff.id}`,
        editedFarmStaff,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onClose();

      if (response.status === 200) {
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
        <Modal.Title style={{ color: 'white' }}>Update Farm Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Farm ID"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="farms_id"
              placeholder="Farm ID"
              value={editedFarmStaff.farms_id}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={editedFarmStaff.name}
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
              value={editedFarmStaff.surname}
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
              value={editedFarmStaff.department}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Phone Number"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={editedFarmStaff.phoneNumber}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Education"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="education"
              placeholder="Education"
              value={editedFarmStaff.education}
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
              value={editedFarmStaff.maritalStatus}
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
              value={editedFarmStaff.dateOfBirth}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Status"
            className="mb-3"
          >
            <Form.Select
              value={editedFarmStaff.status}
              name="status"
              onChange={handleStatusChange}
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </Form.Select>
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

UpdateFarmStaff.propTypes = {
  farmStaff: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UpdateFarmStaff;
