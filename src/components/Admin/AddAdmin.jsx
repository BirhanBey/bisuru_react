import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap';
import axios from 'axios';

const AddAdmin = ({ onSubmit, adminID, onClose }) => {
  const [addedAdmin, setAddedAdmin] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    setAddedAdmin({ ['admins_id']: adminID });
  }, [adminID]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;

    if (!value) {
      console.log('Empty field:', name);
      throw new Error('This field is required.');
    }

    setAddedAdmin((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleStatusChange = (eventKey) => {
    const newStatus = parseInt(eventKey, 10);
    setAddedAdmin((prevAdmin) => ({
      ...prevAdmin,
      status: newStatus,
    }));
  };

  const handleSubmit = async () => {
    console.log(addedAdmin);
    try {
      const response = await axios.post(
        `https://s3.syntradeveloper.be/bisurularavel/api/register`,
        addedAdmin,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      <Modal.Header style={{ color: 'white' }} closeButton>
        <Modal.Title>Add Admin</Modal.Title>
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
              value={addedAdmin.name}
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
              value={addedAdmin.surname}
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
              value={addedAdmin.email}
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
              value={addedAdmin.password}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Password Confirm"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="password_confirmation"
              placeholder="Password Confirm"
              value={addedAdmin.password_confirmation}
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
              value={addedAdmin.phone_number}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Status"
            className="mb-3"
          >
            <Form.Select
              value={addedAdmin.status}
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

AddAdmin.propTypes = {
  onClose: PropTypes.func.isRequired,
  adminID: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default AddAdmin;
