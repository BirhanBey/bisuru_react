import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';

const AddFarmer = ({ onSubmit, coopID, onClose }) => {
  const [addedFarmer, setAddedFarmer] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    setAddedFarmer({ ['cooperatives_id']: coopID });
  }, []);

  const handleFarmerInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    setAddedFarmer((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleFarmerSubmit = async () => {
    console.log(addedFarmer);
    try {
      const response = await axios.post(
        `https://s3.syntradeveloper.be/bisurularavel/api/farmers`,
        addedFarmer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClose(); // Modalı kapat
      // console.log(response.data);
      // Güncellenmiş verileri tabloya yansıt
      onClose(); // Kapatma işlemini çağır
      if (response.status == '201') {
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
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Farmer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={addedFarmer.name}
                onChange={handleFarmerInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Surname:
              <input
                type="text"
                name="surname"
                value={addedFarmer.surname}
                onChange={handleFarmerInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={addedFarmer.address}
                onChange={handleFarmerInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={addedFarmer.phoneNumber}
                onChange={handleFarmerInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Status:
              <input
                type="checkbox"
                name="status"
                checked={addedFarmer.status}
                onChange={handleFarmerInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Date of Birth:
              <input
                type="text"
                name="dateOfBirth"
                value={addedFarmer.dateOfBirth}
                onChange={handleFarmerInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Identity Number:
              <input
                type="text"
                name="identityNumber"
                value={addedFarmer.identityNumber}
                onChange={handleFarmerInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Place of Birth:
              <input
                type="text"
                name="placeOfBirth"
                value={addedFarmer.placeOfBirth}
                onChange={handleFarmerInputChange}
              />
            </label>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleFarmerSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddFarmer.propTypes = {
  onClose: PropTypes.func.isRequired,
  coopID: propTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default AddFarmer;
