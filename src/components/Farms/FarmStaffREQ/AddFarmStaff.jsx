import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';

const AddFarmStaff = ({ onSubmit, farmID, onClose }) => {
  const [addedFarmStaff, setAddedFarmStaff] = useState('');
  console.log(addedFarmStaff);
  const token = localStorage.getItem('token');


  useEffect(() => {
    setAddedFarmStaff({ ['farms_id']: farmID });
  }, [farmID]);

  const handleFarmStaffInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    setAddedFarmStaff((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleStatusChange = (eventKey) => {
    const newStatus = parseInt(eventKey, 10); // Seçilen değeri tamsayıya çeviriyoruz
    setAddedFarmStaff((prevFarm) => ({
      ...prevFarm,
      status: newStatus,
    }));
  };


  const handleFarmStaffSubmit = async () => {
    // console.log(addedFarmStaff);
    try {
      const response = await axios.post(
        `https://s3.syntradeveloper.be/bisurularavel/api/farmstaff`,
        addedFarmStaff,
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
        <Modal.Title>Add Farm Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>
              Farm Id:
              <input
                type="text"
                name="farms_id"
                value={addedFarmStaff.farms_id}
                onChange={handleFarmStaffInputChange}
                disabled
              />
            </label>
          </div>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={addedFarmStaff.name}
                onChange={handleFarmStaffInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Surname:
              <input
                type="text"
                name="surname"
                value={addedFarmStaff.surname}
                onChange={handleFarmStaffInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Department:
              <input
                type="text"
                name="address"
                value={addedFarmStaff.department}
                onChange={handleFarmStaffInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={addedFarmStaff.phoneNumber}
                onChange={handleFarmStaffInputChange}
              />
            </label>
          </div>

          <div>
            <label>
              Date of Birth:
              <input
                type="date"
                name="dateOfBirth"
                value={addedFarmStaff.dateOfBirth}
                onChange={handleFarmStaffInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Marital Status:
              <input
                type="text"
                name="maritalStatus"
                value={addedFarmStaff.maritalStatus}
                onChange={handleFarmStaffInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Education:
              <input
                type="text"
                name="education"
                value={addedFarmStaff.education}
                onChange={handleFarmStaffInputChange}
              />
            </label>
          </div>
          <div className="d-flex">
            <label>Status:</label>
            <Dropdown onSelect={handleStatusChange}>
              <Dropdown.Toggle variant="secondary" id="status-dropdown">
                {addedFarmStaff.status === 1 ? 'Active' : 'Inactive'}
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
        <Button variant="primary" onClick={handleFarmStaffSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddFarmStaff.propTypes = {
  onClose: PropTypes.func.isRequired,
  farmID: propTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default AddFarmStaff;
