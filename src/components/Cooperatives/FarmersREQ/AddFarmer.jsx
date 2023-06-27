import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';

const AddFarmer = ({ onSubmit, coopID, onClose }) => {
  const [addedFarmer, setAddedFarmer] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    setAddedFarmer({ ['cooperatives_id']: coopID });
  }, [coopID]);
  // console.log(addedFarmer);

  const handleFarmerInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    setAddedFarmer((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleStatusChange = (eventKey) => {
    const newStatus = parseInt(eventKey, 10); // Seçilen değeri tamsayıya çeviriyoruz
    setAddedFarmer((prevFarm) => ({
      ...prevFarm,
      status: newStatus,
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
      onClose();

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
    <Modal className="my-modal" show={true} onHide={onClose}>
      <Modal.Header style={{ color: 'white' }} closeButton>
        <Modal.Title>Add Farmer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={addedFarmer.name}
              onChange={handleFarmerInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Surname"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="surname"
              placeholder="Surname"
              value={addedFarmer.surname}
              onChange={handleFarmerInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Address"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="address"
              placeholder="Address"
              value={addedFarmer.address}
              onChange={handleFarmerInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Phone Number"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={addedFarmer.phone_number}
              onChange={handleFarmerInputChange}
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
              value={addedFarmer.dateOfBirth}
              onChange={handleFarmerInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Identity Number"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="identityNumber"
              placeholder="Identity Number"
              value={addedFarmer.identityNumber}
              onChange={handleFarmerInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Place of Birth"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="placeOfBirth"
              placeholder="Place of Birth"
              value={addedFarmer.placeOfBirth}
              onChange={handleFarmerInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Status"
            className="mb-3"
          >
            <Form.Select
              value={addedFarmer.status}
              name="status"
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
