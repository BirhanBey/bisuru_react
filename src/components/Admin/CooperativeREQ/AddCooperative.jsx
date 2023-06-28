import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap';
import axios from 'axios';

const AddCooperative = ({ onSubmit, coop, onClose }) => {
  const [addedCooperative, setAddedCooperative] = useState({});
  const token = localStorage.getItem('token');
  console.log(coop);
  useEffect(() => {
    setAddedCooperative({ ['coops_id']: coop });
  }, [coop]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
  
    setAddedCooperative((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  
    if (value === '') {
      setAddedCooperative((prevState) => ({
        ...prevState,
        [name]: '',
      }));
    }
  };
  

  const handleStatusChange = (event) => {
    const newStatus = parseInt(event.target.value, 10);
    setAddedCooperative((prevAdmin) => ({
      ...prevAdmin,
      status: newStatus,
    }));
  };

  const handleSubmit = async () => {
    console.log(addedCooperative);
    const cleanedCooperative = Object.keys(addedCooperative).reduce((obj, key) => {
      if (addedCooperative[key] !== '') {
        obj[key] = addedCooperative[key];
      }
      return obj;
    }, {});
  
    console.log(cleanedCooperative);
    try {
      const response = await axios.post(
        `https://s3.syntradeveloper.be/bisurularavel/api/cooperatives`,
        addedCooperative,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
    <Modal className="my-modal" show={true} onHide={onClose}>
      <Modal.Header style={{ color: 'white' }} closeButton>
        <Modal.Title>Add Cooperative</Modal.Title>
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
              value={addedCooperative.name}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Founded"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="founded"
              placeholder="Founded"
              value={addedCooperative.founded}
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
              value={addedCooperative.address}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Field"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="field"
              placeholder="Field"
              value={addedCooperative.field}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="License No"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="licenseNo"
              placeholder="License No"
              value={addedCooperative.licenseNo}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Status"
            className="mb-3"
          >
            <Form.Select
              value={addedCooperative.status}
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
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddCooperative.propTypes = {
  onClose: PropTypes.func.isRequired,
  coop: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default AddCooperative;
