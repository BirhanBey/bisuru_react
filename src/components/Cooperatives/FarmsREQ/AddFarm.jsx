import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';

const AddFarm = ({ onSubmit, coopID, onClose }) => {
  const [addedFarm, setAddedFarm] = useState('');
  const token = localStorage.getItem('token');
  console.log(addedFarm);
  useEffect(() => {
    setAddedFarm({ ['cooperatives_id']: coopID });
  }, [coopID]);

  const handleFarmInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    setAddedFarm((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleStatusChange = (eventKey) => {
    const newStatus = parseInt(eventKey, 10); // Seçilen değeri tamsayıya çeviriyoruz
    setAddedFarm((prevFarm) => ({
      ...prevFarm,
      status: newStatus,
    }));
  };

  const handleFarmSubmit = async () => {
    // console.log(addedFarm);
    try {
      const response = await axios.post(
        `https://s3.syntradeveloper.be/bisurularavel/api/farms`,
        addedFarm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'Application/json',
            Accept: 'Application/json',
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
      // Handle error
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Farm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>
              Farmer Id:
              <input
                type="text"
                name="farmers_id"
                value={addedFarm.farmers_id}
                onChange={handleFarmInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Cooperative Id:
              <input
                type="text"
                name="cooperatives_id"
                value={addedFarm.cooperatives_id}
                onChange={handleFarmInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={addedFarm.address}
                onChange={handleFarmInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={addedFarm.phoneNumber}
                onChange={handleFarmInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Latitude:
              <input
                type="text"
                name="latitude"
                value={addedFarm.latitude}
                onChange={handleFarmInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Longitude:
              <input
                type="text"
                name="longitude"
                value={addedFarm.longitude}
                onChange={handleFarmInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Surface Area:
              <input
                type="text"
                name="surfaceArea"
                value={addedFarm.surfaceArea}
                onChange={handleFarmInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              City:
              <input
                type="text"
                name="placeOfBirth"
                value={addedFarm.placeOfBirth}
                onChange={handleFarmInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Identity Number:
              <input
                type="text"
                name="identityNumber"
                value={addedFarm.identityNumber}
                onChange={handleFarmInputChange}
              />
            </label>
          </div>
          <div className="d-flex">
            <label>Status:</label>
            <Dropdown onSelect={handleStatusChange}>
              <Dropdown.Toggle variant="secondary" id="status-dropdown">
                {addedFarm.status === 1 ? 'Active' : 'Inactive'}
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
        <Button variant="primary" onClick={handleFarmSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddFarm.propTypes = {
  onClose: PropTypes.func.isRequired,
  coopID: propTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default AddFarm;
