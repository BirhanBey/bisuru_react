import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';

const AddFarmStaff = ({ onSubmit, farmerID, onClose }) => {
  const [addedFarmStaff, setAddedFarmStaff] = useState('');
  console.log(addedFarmStaff);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setAddedFarmStaff({ ['farmer_id']: farmerID });
  }, [farmerID]);

  const handleFarmStaffInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    setAddedFarmStaff((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleStatusChange = (eventKey) => {
    const newStatus = parseInt(eventKey, 10); // Seçilen değeri tamsayıya çeviriyoruz
    setAddedFarmStaff((prevFarm) => ({
      ...prevFarm,
      status: newStatus,
    }));
  };

  const handleFarmStaffSubmit = async () => {
    console.log(addedFarmStaff);
    try {
      const response = await axios.post(
        `https://s3.syntradeveloper.be/bisurularavel/api/farmstaff`,
        addedFarmStaff,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'Application/json',
            Accept: 'Application/json',
          },
        }
      );

      onClose();

      if (response.status == '201') {
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
        <Modal.Title style={{ color: 'white' }}>Add Farm Staff</Modal.Title>
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
              value={addedFarmStaff.farms_id}
              onChange={handleFarmStaffInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Farmer ID"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="farmer_id"
              placeholder="Farmer ID"
              value={addedFarmStaff.farmer_id}
              onChange={handleFarmStaffInputChange}
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
              value={addedFarmStaff.name}
              onChange={handleFarmStaffInputChange}
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
              value={addedFarmStaff.surname}
              onChange={handleFarmStaffInputChange}
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
              value={addedFarmStaff.department}
              onChange={handleFarmStaffInputChange}
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
              value={addedFarmStaff.phoneNumber}
              onChange={handleFarmStaffInputChange}
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
              value={addedFarmStaff.maritalStatus}
              onChange={handleFarmStaffInputChange}
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
              value={addedFarmStaff.education}
              onChange={handleFarmStaffInputChange}
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
              value={addedFarmStaff.dateOfBirth}
              onChange={handleFarmStaffInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Status"
            className="mb-3"
          >
            <Form.Select
              value={addedFarmStaff.status}
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
        <Button variant="primary" onClick={handleFarmStaffSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddFarmStaff.propTypes = {
  onClose: PropTypes.func.isRequired,
  farmerID: propTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default AddFarmStaff;
