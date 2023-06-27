import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
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
    <Modal className="my-modal" show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'white' }}>Add Farm</Modal.Title>
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
              name="farmers_id"
              placeholder="Farmer ID"
              value={addedFarm.farmers_id}
              onChange={handleFarmInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Cooperative ID"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="cooperatives_id"
              placeholder="Cooperative ID"
              value={addedFarm.cooperatives_id}
              onChange={handleFarmInputChange}
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
              value={addedFarm.address}
              onChange={handleFarmInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Phone Number"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={addedFarm.phoneNumber}
              onChange={handleFarmInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Latitude"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="latitude"
              placeholder="Latitude"
              value={addedFarm.latitude}
              onChange={handleFarmInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Longitude"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="longitude"
              placeholder="Longitude"
              value={addedFarm.longitude}
              onChange={handleFarmInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Surface Area"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="surfaceArea"
              placeholder="Surface Area"
              value={addedFarm.surfaceArea}
              onChange={handleFarmInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="City"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="placeOfBirth"
              placeholder="City"
              value={addedFarm.placeOfBirth}
              onChange={handleFarmInputChange}
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
              value={addedFarm.identityNumber}
              onChange={handleFarmInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Status"
            className="mb-3"
          >
            <Form.Select
              value={addedFarm.status}
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
