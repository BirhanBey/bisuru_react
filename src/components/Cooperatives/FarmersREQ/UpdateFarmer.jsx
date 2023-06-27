import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

const UpdateFarmer = ({ onSubmit, farmer, onClose }) => {
  const [editedFarmer, setEditedFarmer] = useState(farmer);
  const token = localStorage.getItem('token');
  // const coopstaff = coopStaff;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedFarmer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    const newStatus = parseInt(selectedStatus, 10);
    setEditedFarmer((prevFramer) => ({
      ...prevFramer,
      status: newStatus,
    }));
  
    const updatedAdmin = {
      ...editedFarmer,
      status: newStatus,
    };
    onSubmit(updatedAdmin); 
  
    console.log('handleStatusChange çalıştı'); 
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `https://s3.syntradeveloper.be/bisurularavel/api/farmers/${farmer.id}`,
        editedFarmer,
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
        <Modal.Title style={{ color: 'white' }}>Update Farmer</Modal.Title>
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
              value={editedFarmer.name}
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
              value={editedFarmer.surname}
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
              value={editedFarmer.address}
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
              name="phone_number"
              placeholder="Phone Number"
              value={editedFarmer.phone_number}
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
              value={editedFarmer.dateOfBirth}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Identity Number"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="identityNumber"
              placeholder="Identity Number"
              value={editedFarmer.identityNumber}
              onChange={handleInputChange}
            />
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
              value={editedFarmer.placeOfBirth}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Status"
            className="mb-3"
          >
            <Form.Select
              value={editedFarmer.status}
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

UpdateFarmer.propTypes = {
  farmer: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UpdateFarmer;
