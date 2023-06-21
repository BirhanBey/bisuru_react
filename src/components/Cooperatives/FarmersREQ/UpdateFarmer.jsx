import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
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

  const handleSubmit = async () => {
    try {
      const response =await axios.put(
        `https://s3.syntradeveloper.be/bisurularavel/api/farmers/${farmer.id}`,
        editedFarmer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClose(); // Modalı kapat

      // Güncellenmiş verileri tabloya yansıt
      onClose(); // Kapatma işlemini çağır
      if (response.status == '200') {
        onSubmit("OK");
      } else {
        onSubmit(response);
      }
    } catch (error) {
      console.error('Request Error:', error);
      // Handle error
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Farmer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editedFarmer.name}
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
                value={editedFarmer.surname}
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
                value={editedFarmer.address}
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
                value={editedFarmer.phoneNumber}
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
                checked={editedFarmer.status}
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
                value={editedFarmer.dateOfBirth}
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
                value={editedFarmer.identityNumber}
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
                value={editedFarmer.placeOfBirth}
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

UpdateFarmer.propTypes = {
    farmer: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};


export default UpdateFarmer;
