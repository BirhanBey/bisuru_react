import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
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

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    const newStatus = parseInt(selectedStatus, 10);
    setEditedAnimal((prevAnimal) => ({
      ...prevAnimal,
      status: newStatus,
    }));
  
    const updatedAnimal = {
      ...editedAnimal,
      status: newStatus,
    };
    onSubmit(updatedAnimal); 
  
    console.log('handleStatusChange çalıştı'); 
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
    <Modal className="my-modal" show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'white' }}>Update Animal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Farmer ID"
            className="mb-3"
          >
            <Form.Control
              type="text"
              disabled
              name="farmer_id"
              placeholder="Farmer ID"
              value={editedAnimal.farmer_id}
              onChange={handleAnimalInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Farm ID"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="farms_id"
              placeholder="Farm ID"
              value={editedAnimal.farms_id}
              onChange={handleAnimalInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Earing Number"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="earing_number"
              placeholder="Earing Number"
              value={editedAnimal.earing_number}
              onChange={handleAnimalInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Date of Birth"
            className="mb-3"
          >
            <Form.Control
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={editedAnimal.dateOfBirth}
              onChange={handleAnimalInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Last Birth"
            className="mb-3"
          >
            <Form.Control
              type="date"
              name="dateOfLastBirthGiving"
              placeholder="Last Birth"
              value={editedAnimal.dateOfLastBirthGiving}
              onChange={handleAnimalInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Birth Nummber"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="birthNummber"
              placeholder="Birth Nummber"
              value={editedAnimal.birthNummber}
              onChange={handleAnimalInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Lactation"
            className="mb-3"
          >
            <Form.Select
              name="lactaionStatus"
              placeholder="Lactation"
              value={editedAnimal.lactaionStatus}
              onChange={handleStatusChange}
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </Form.Select>
          </FloatingLabel>
        </Form>
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
