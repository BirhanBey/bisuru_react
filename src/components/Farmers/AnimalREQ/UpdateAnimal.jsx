import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const UpdateAnimal = ({ onSubmit, animal, onClose }) => {
  const [editedAnimal, setEditedAnimal] = useState(animal);
  const token = localStorage.getItem('token');
  // const coopstaff = coopStaff;

  const handleAnimalInputChange = (event) => {
    const { name, value } = event.target;
    setEditedAnimal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
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

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Animal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>
              Farmer Id:
              <input
                type="text"
                name="farmer_id"
                value={editedAnimal.farmer_id}
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
                value={editedAnimal.farms_id}
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

          <div>
            <label>
              Lactation:
              <input
                type="checkbox"
                name="lactaionStatus"
                value={editedAnimal.lactaionStatus}
                onChange={handleAnimalInputChange}
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

UpdateAnimal.propTypes = {
  animal: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UpdateAnimal;
