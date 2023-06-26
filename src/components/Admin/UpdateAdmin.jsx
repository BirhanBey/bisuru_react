import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
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

  const handleStatusChange = (eventKey) => {
    const newStatus = parseInt(eventKey, 10); // Seçilen değeri tamsayıya çeviriyoruz
    setEditedAdmin((prevAdmin) => ({
      ...prevAdmin,
      status: newStatus,
    }));
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
      onClose(); // Modalı kapat

      // Güncellenmiş verileri tabloya yansıt
      if (response.status === 200) {
        onSubmit('OK');
      } else {
        onSubmit(response);
      }
    } catch (error) {
      console.error('Request Error:', error);
      // Hata durumunu ele al
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Cooperative Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editedAdmin.name}
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
                value={editedAdmin.surname}
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
                value={editedAdmin.email}
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
                value={editedAdmin.password}
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
                value={editedAdmin.phone_number}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>Status:</label>
            <Dropdown onSelect={handleStatusChange}>
              <Dropdown.Toggle variant="secondary" id="status-dropdown">
                {editedAdmin.status === 1 ? 'Active' : 'Inactive'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">Active</Dropdown.Item>
                <Dropdown.Item eventKey="0">Inactive</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <label>
              Date of Birth:
              <input
                type="file"
                name="image"                
                onChange={handleInputChange}
              />
            </label>
            <span>{editedAdmin.image && editedAdmin.image.name}</span>
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

UpdateAdmin.propTypes = {
  admin: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UpdateAdmin;
