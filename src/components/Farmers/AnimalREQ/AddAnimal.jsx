import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';

const AddAnimal = ({ onSubmit, farmerID, onClose }) => {
  const [addedAnimal, setAddedAnimal] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    setAddedAnimal({ ['farmer_id']: farmerID });
  }, [farmerID]);

  const handleAnimalInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    setAddedAnimal((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleStatusChange = (eventKey) => {
    const newStatus = parseInt(eventKey, 10); // Seçilen değeri tamsayıya çeviriyoruz
    setAddedAnimal((prevFarm) => ({
      ...prevFarm,
      status: newStatus,
    }));
  };

  const handleAnimalSubmit = async () => {
    try {
      const response = await axios.post(
        `https://s3.syntradeveloper.be/bisurularavel/api/animals`,
        addedAnimal,
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
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Animal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>
              Farmer Id:
              <input
                type="text"
                name="farmer_id"
                value={addedAnimal.farmer_id}
                onChange={handleAnimalInputChange}
                disabled
              />
            </label>
          </div>
          <div>
            <label>
              Farm Id:
              <input
                type="text"
                name="farms_id"
                value={addedAnimal.farms_id}
                onChange={handleAnimalInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Earing Number:
              <input
                type="text"
                name="earing_number"
                value={addedAnimal.earing_number}
                onChange={handleAnimalInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Date of Birth:
              <input
                type="text"
                name="dateOfBirth"
                value={addedAnimal.dateOfBirth}
                onChange={handleAnimalInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Last Birth:
              <input
                type="text"
                name="dateOfLastBirthGiving"
                value={addedAnimal.dateOfLastBirthGiving}
                onChange={handleAnimalInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Birth Number:
              <input
                type="text"
                name="birthNummber"
                value={addedAnimal.birthNummber}
                onChange={handleAnimalInputChange}
              />
            </label>
          </div>
          <div className="d-flex">
            <label>Status:</label>
            <Dropdown onSelect={handleStatusChange}>
              <Dropdown.Toggle variant="secondary" id="status-dropdown">
                {addedAnimal.status === 1 ? 'Active' : 'Inactive'}
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
        <Button variant="primary" onClick={handleAnimalSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddAnimal.propTypes = {
  onClose: PropTypes.func.isRequired,
  farmerID: propTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default AddAnimal;
