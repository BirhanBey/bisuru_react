import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap';
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';

const AddCoopStaff = ({ onSubmit, coopID, onClose }) => {
  const [addedCoopStaff, setAddedCoopStaff] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    setAddedCoopStaff({ ['cooperatives_id']: coopID });
  }, [coopID]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    setAddedCoopStaff((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleStatusChange = (eventKey) => {
    const newStatus = parseInt(eventKey, 10); // Seçilen değeri tamsayıya çeviriyoruz
    setAddedCoopStaff((prevFarm) => ({
      ...prevFarm,
      status: newStatus,
    }));
  };

  const handleSubmit = async () => {
    console.log(addedCoopStaff);
    try {
      const response = await axios.post(
        `https://s3.syntradeveloper.be/bisurularavel/api/coopstaffs`,
        addedCoopStaff,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClose(); // Modalı kapat

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
    <Modal className="my-modal" show={true} onHide={onClose}>
      <Modal.Header style={{ color: 'white' }} closeButton>
        <Modal.Title>Add Cooperative Staff</Modal.Title>
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
              value={addedCoopStaff.name}
              onChange={handleInputChange}
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
              value={addedCoopStaff.surname}
              onChange={handleInputChange}
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
              value={addedCoopStaff.address}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Phone Number"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="password"
              placeholder="Phone Number"
              value={addedCoopStaff.password}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Department"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="department"
              placeholder="Department"
              value={addedCoopStaff.department}
              onChange={handleInputChange}
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
              value={addedCoopStaff.dateOfBirth}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Status"
            className="mb-3"
          >
            <Form.Select
              value={addedCoopStaff.status}
              name="status"
              onChange={handleStatusChange}
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </Form.Select>
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
              value={addedCoopStaff.placeOfBirth}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Marital Status"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="maritalStatus"
              placeholder="Marital Status"
              value={addedCoopStaff.maritalStatus}
              onChange={handleInputChange}
            />
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

AddCoopStaff.propTypes = {
  onClose: PropTypes.func.isRequired,
  coopID: propTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default AddCoopStaff;
