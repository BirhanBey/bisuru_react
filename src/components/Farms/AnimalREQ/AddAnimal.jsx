import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';

const AddAnimal = ({ onSubmit, farmID, onClose }) => {
  const [addedAnimal, setAddedAnimal] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    setAddedAnimal({ ['farms_id']: farmID });
  }, [farmID]);

  const handleAnimalInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    setAddedAnimal((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    const newStatus = parseInt(selectedStatus, 10);
    setAddedAnimal((prevAnimal) => ({
      ...prevAnimal,
      status: newStatus,
    }));

    console.log('handleStatusChange çalıştı');
  };

  const handleAnimalSubmit = async () => {
    try {
      const response = await axios.post(
        `https://s3.syntradeveloper.be/bisurularavel/api/animals`,
        addedAnimal,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      onClose();

      if (response.status === 201) {
        onSubmit('OK');
      } else {
        onSubmit(response);
      }
    } catch (error) {
      console.error('Request Error:', error);
    }
  };

  return (
    <Modal className="p-0 my-modal" show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'white' }}>Add Animal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Farm ID"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="farms_id"
              placeholder="Farm ID"
              value={addedAnimal.farms_id}
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
              value={addedAnimal.earing_number}
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
              value={addedAnimal.dateOfBirth}
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
              value={addedAnimal.dateOfLastBirthGiving}
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
              value={addedAnimal.birthNummber}
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
              value={addedAnimal.lactaionStatus}
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
        <Button variant="primary" onClick={handleAnimalSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddAnimal.propTypes = {
  onClose: PropTypes.func.isRequired,
  farmID: propTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default AddAnimal;
