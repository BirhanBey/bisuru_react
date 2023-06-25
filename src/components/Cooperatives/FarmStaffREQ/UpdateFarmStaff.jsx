import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';

const UpdateFarmStaff = ({ onSubmit, farmsStaff, onClose }) => {
  const [editedFarmStaff, setEditedFarmStaff] = useState(farmsStaff);
  const token = localStorage.getItem('token');
  // const coopstaff = coopStaff;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedFarmStaff((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `https://s3.syntradeveloper.be/bisurularavel/api/farmstaff/${farmsStaff.id}`,
        editedFarmStaff,
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

  const handleStatusChange = (eventKey) => {
    const newStatus = parseInt(eventKey, 10); // Seçilen değeri tamsayıya çeviriyoruz
    setEditedFarmStaff((prevFarm) => ({
      ...prevFarm,
      status: newStatus,
    }));
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Farm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editedFarmStaff.name}
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
                value={editedFarmStaff.surname}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Department:
              <input
                type="text"
                name="Department"
                value={editedFarmStaff.department}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={editedFarmStaff.phoneNumber}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Marital Status:
              <input
                type="text"
                name="maritalStatus"
                value={editedFarmStaff.maritalStatus}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="d-flex">
            <label>Status:</label>
            <Dropdown onSelect={handleStatusChange}>
              <Dropdown.Toggle variant="secondary" id="status-dropdown">
                {editedFarmStaff.status === 1 ? 'Active' : 'Inactive'}
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
                type="text"
                name="dateOfBirth"
                value={editedFarmStaff.dateOfBirth}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Identity Number:
              <input
                type="text"
                name="identityNumber"
                value={editedFarmStaff.identityNumber}
                onChange={handleInputChange}
                disabled
              />
            </label>
          </div>
          <div>
            <label>
              Place of Birth:
              <input
                type="text"
                name="placeOfBirth"
                value={editedFarmStaff.placeOfBirth}
                onChange={handleInputChange}
                disabled
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

UpdateFarmStaff.propTypes = {
  farmsStaff: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UpdateFarmStaff;
