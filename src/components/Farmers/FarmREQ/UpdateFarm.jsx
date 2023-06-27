import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button, Form, FloatingLabel  } from 'react-bootstrap';
import axios from 'axios';

const UpdateFarm = ({ onSubmit, farm, onClose }) => {
  const [editedFarm, setEditedFarm] = useState(farm);
  const token = localStorage.getItem('token');
  // const coopstaff = coopStaff;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedFarm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    const newStatus = parseInt(selectedStatus, 10);
    setEditedFarm((prevFarm) => ({
      ...prevFarm,
      status: newStatus,
    }));

    const updatedFarm = {
      ...editedFarm,
      status: newStatus,
    };
    onSubmit(updatedFarm);

    console.log('handleStatusChange çalıştı');
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `https://s3.syntradeveloper.be/bisurularavel/api/farms/${farm.id}`,
        editedFarm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onClose(); // Modalı kapat

      if (response.status === 200) {
        onSubmit('OK');
      } else {
        onSubmit(response);
      }
    } catch (error) {
      console.error('Request Error:', error);
      // Handle error
    }
  };

  return (
    <Modal className="my-modal" show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'white' }}>Update Farm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Address"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="address"
              placeholder="Address"
              value={editedFarm.address}
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
              value={editedFarm.phoneNumber}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Latitude"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="latitude"
              placeholder="Latitude"
              value={editedFarm.latitude}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Longitude"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="longitude"
              placeholder="Longitude"
              value={editedFarm.longitude}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Surface Area"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="surfaceArea"
              placeholder="Surface Area"
              value={editedFarm.surfaceArea}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="City"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="placeOfBirth"
              placeholder="City"
              value={editedFarm.placeOfBirth}
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
              value={editedFarm.identityNumber}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Status"
            className="mb-3"
          >
            <Form.Select
              value={editedFarm.status}
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

UpdateFarm.propTypes = {
  farm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UpdateFarm;
