import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';

const UpdateFarm = ({ onSubmit, farm, onClose }) => {
  const [editedFarm, setEditedFarm] = useState(farm);
  const token = localStorage.getItem('token');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedFarm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStatusChange = (eventKey) => {
    const newStatus = parseInt(eventKey, 10); 
    setEditedFarm((prevFarm) => ({
      ...prevFarm,
      status: newStatus,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `https://s3.syntradeveloper.be/bisurularavel/api/farms/${farm.id}`,
        editedFarm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      onClose(); // Modalı kapat
  
      if (response.status === 200) {
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
        <Modal.Title>Update Farm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={editedFarm.address}
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
                value={editedFarm.phoneNumber}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Latitude:
              <input
                type="text"
                name="latitude"
                value={editedFarm.latitude}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
            Longitude:
              <input
                type="text"
                name="longitude"
                value={editedFarm.longitude}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Surface Area:
              <input
                type="text"
                name="surfaceArea"
                value={editedFarm.surfaceArea}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={editedFarm.city}
                onChange={handleInputChange}
                disabled
              />
            </label>
          </div>
          <div>
            <label>
              Identity Number:
              <input
                type="text"
                name="identityNumber"
                value={editedFarm.identityNumber}
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
                value={editedFarm.placeOfBirth}
                onChange={handleInputChange}
                disabled
              />
            </label>
          </div>
          <div className="d-flex">
            <label>Status:</label>
            <Dropdown onSelect={handleStatusChange}>
              <Dropdown.Toggle variant="secondary" id="status-dropdown">
                {editedFarm.status === 1 ? 'Active' : 'Inactive'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">Active</Dropdown.Item>
                <Dropdown.Item eventKey="0">Inactive</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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

UpdateFarm.propTypes = {
    farm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};


export default UpdateFarm;
