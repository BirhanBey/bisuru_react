import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

const UpdateCooperative = ({ onSubmit, coop, onClose }) => {
  const [editedCooperative, setEditedCooperative] = useState(coop);
  const token = localStorage.getItem('token');
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCooperative((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    const newStatus = parseInt(selectedStatus, 10);
    setEditedCooperative((prevCoop) => ({
      ...prevCoop,
      status: newStatus,
    }));

    const updatedCooperative = {
      ...editedCooperative,
      status: newStatus,
    };
    onSubmit(updatedCooperative);

    console.log('handleStatusChange worked');
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `https://s3.syntradeveloper.be/bisurularavel/api/cooperatives/${coop.id}`,
        editedCooperative,
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
        <Modal.Title style={{ color: 'white' }}>Update Cooperative</Modal.Title>
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
              value={editedCooperative.name}
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
              value={editedCooperative.address}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Field"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="field"
              placeholder="Field"
              value={editedCooperative.field}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Founded"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="founded"
              placeholder="Founded"
              value={editedCooperative.founded}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="License Number"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="licenseNumber"
              placeholder="License Number"
              value={editedCooperative.licenseNumber}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Status"
            className="mb-3"
          >
            <Form.Select
              value={editedCooperative.status}
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

UpdateCooperative.propTypes = {
  coop: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UpdateCooperative;
