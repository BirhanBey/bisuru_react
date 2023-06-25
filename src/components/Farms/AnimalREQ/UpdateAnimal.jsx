import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';

const UpdateAnimal = ({ onSubmit, animal, onClose }) => {
  const [editedAnimal, setEditedAnimal] = useState(animal);
  const token = localStorage.getItem('token');
  console.log(animal);
  const handleAnimalInputChange = (event) => {
    const { name, value } = event.target;
    setEditedAnimal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAnimalSubmit = async () => {
    try {
      const response = await axios.put(
        `https://s3.syntradeveloper.be/bisurularavel/api/animals/${animal}`,
        editedAnimal,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onClose();

      if (response.status === 200) {
        onSubmit('OK');
      } else {
        onSubmit(response);
      }
    } catch (error) {
      console.error('Request Error:', error);
    }
  };

  const handleStatusChange = (eventKey) => {
    const newStatus = parseInt(eventKey, 10);
    setEditedAnimal((prevFarm) => ({
      ...prevFarm,
      status: newStatus,
    }));
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
              Farm Id:
              <input
                type="text"
                name="farms_id"
                value={editedAnimal.farm_id}
                onChange={handleAnimalInputChange}
                disabled
              />
            </label>
          </div>
          <div>
            <label>
              Earing Number:
              <input
                type="text"
                name="earing_number"
                value={editedAnimal.earing_number}
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
                value={editedAnimal.dateOfBirth}
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
                value={editedAnimal.dateOfLastBirthGiving}
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
                value={editedAnimal.birthNummber}
                onChange={handleAnimalInputChange}
              />
            </label>
          </div>

          <div className="d-flex">
            <label>Status:</label>
            <Dropdown onSelect={handleStatusChange}>
              <Dropdown.Toggle variant="secondary" id="status-dropdown">
                {editedAnimal.status === 1 ? 'Active' : 'Inactive'}
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

UpdateAnimal.propTypes = {
  animal: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UpdateAnimal;
