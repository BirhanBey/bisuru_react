import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

const UpdateAdmin = ({ onSubmit, admin, onClose }) => {
  const [editedAdmin, setEditedAdmin] = useState(admin);
  const token = localStorage.getItem('token');
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    const newStatus = parseInt(selectedStatus, 10);
    setEditedAdmin((prevAdmin) => ({
      ...prevAdmin,
      status: newStatus,
    }));
  
    const updatedAdmin = {
      ...editedAdmin,
      status: newStatus,
    };
    onSubmit(updatedAdmin); 
  
    console.log('handleStatusChange çalıştı'); 
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `https://s3.syntradeveloper.be/bisurularavel/api/admins/${admin.id}`,
        editedAdmin,
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
        <Modal.Title style={{ color: 'white' }}>Update Admin</Modal.Title>
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
              value={editedAdmin.name}
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
              value={editedAdmin.surname}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="E-mail"
            className="mb-3"
          >
            <Form.Control
              type="email"
              name="email"
              placeholder="E-mail"
              value={editedAdmin.email}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={editedAdmin.password}
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
              value={editedAdmin.phone_number}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Status"
            className="mb-3"
          >
            <Form.Select
              value={editedAdmin.status}
              name="status"
              onChange={handleStatusChange}
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </Form.Select>
          </FloatingLabel>
          <Form.Group className="mb-3">
            <Form.Label>Image:</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleInputChange}
            />
          </Form.Group>
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

UpdateAdmin.propTypes = {
  admin: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UpdateAdmin;
