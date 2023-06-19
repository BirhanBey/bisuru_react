import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const UpdateCoopStaff = ({ coopStaff, onClose }) => {
  const [editedCoopStaff, setEditedCoopStaff] = useState(coopStaff);
  const token = localStorage.getItem('token');
  const coopstaff = coopStaff;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCoopStaff((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/coopstaffs/${coopstaff.id}`,
        editedCoopStaff,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClose(); // Modalı kapat

      // Güncellenmiş verileri tabloya yansıt
    } catch (error) {
      console.error('Request Error:', error);
      // Handle error
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
                value={editedCoopStaff.name}
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
                value={editedCoopStaff.surname}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={editedCoopStaff.address}
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
                value={editedCoopStaff.phoneNumber}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Status:
              <input
                type="checkbox"
                name="status"
                checked={editedCoopStaff.status}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Date of Birth:
              <input
                type="text"
                name="dateOfBirth"
                value={editedCoopStaff.dateOfBirth}
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
                value={editedCoopStaff.identityNumber}
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
                value={editedCoopStaff.placeOfBirth}
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

UpdateCoopStaff.propTypes = {
    coopStaff: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};


export default UpdateCoopStaff;
