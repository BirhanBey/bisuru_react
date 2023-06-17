import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const AddCoopStaff = ({ onClose, onCoopStaffAdd }) => {
  const [addedCoopStaff, setAddedCoopStaff] = useState('');
  const token = localStorage.getItem('token');
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    setAddedCoopStaff((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/coopstaffs`,
        addedCoopStaff,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClose(); // Modalı kapat

      // Güncellenmiş verileri tabloya yansıt
      onCoopStaffAdd(addedCoopStaff);
    } catch (error) {
      console.error('Request Error:', error);
      // Handle error
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Cooperative Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={addedCoopStaff.name}
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
                value={addedCoopStaff.surname}
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
                value={addedCoopStaff.address}
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
                value={addedCoopStaff.phoneNumber}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            {/* <label>
              Status:
              <input
                type="checkbox"
                name="status"
                checked={addedCoopStaff.status}
                onChange={handleInputChange}
              />
            </label> */}
          </div>
          <div>
            <label>
              Date of Birth:
              <input
                type="text"
                name="dateOfBirth"
                value={addedCoopStaff.dateOfBirth}
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
                value={addedCoopStaff.identityNumber}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Place of Birth:
              <input
                type="text"
                name="placeOfBirth"
                value={addedCoopStaff.placeOfBirth}
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

AddCoopStaff.propTypes = {
    onCoopStaffAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddCoopStaff;
