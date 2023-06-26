import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
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
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={addedAdmin.name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Surname:
              <input
                type="text"
                name="surname"
                value={addedAdmin.surname}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              E-mail:
              <input
                type="email"
                name="email"
                value={addedAdmin.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="text"
                name="password"
                value={addedAdmin.password}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Password Confirm:
              <input
                type="text"
                name="password_confirmation"
                value={addedAdmin.password_confirmation}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Phone Number:
              <input
                type="text"
                name="phone_number"
                value={addedAdmin.phone_number}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className='d-flex'>
            <label>Status:</label>
            <Dropdown onSelect={handleStatusChange}>
              <Dropdown.Toggle variant="secondary" id="status-dropdown">
                {addedAdmin.status === 1 ? 'Active' : 'Inactive'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">Active</Dropdown.Item>
                <Dropdown.Item eventKey="0">Inactive</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <label>
              Image:
              <input
                type="file"
                name="image"
                value={addedAdmin.image}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </form>
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
