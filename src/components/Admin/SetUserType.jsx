import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const SetUserType = ({ admin, onClose, onSubmit }) => {
  const [userTypes, setUserTypes] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState('');
  let token = localStorage.getItem('token');
  console.log(admin);

  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const response = await axios.get(
          'https://s3.syntradeveloper.be/bisurularavel/api/adminroles',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserTypes(response.data.data);
      } catch (error) {
        console.error('Request Error:', error);
      }
    };

    fetchUserTypes();
  }, [token]);

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        'https://s3.syntradeveloper.be/bisurularavel/api/adminuserroles',
        {
          admins_id: admin.id,
          admin_roles_id: selectedUserType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSubmit('OK');
      onClose();
    } catch (error) {
      console.error('Request Error:', error);
      onSubmit(error);
    }
  };

  return (
    <Modal className='my-modal' show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{color: "white"}}>Set User Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label style={{color: "white"}}>User Type:</Form.Label>
          <Form.Control
            as="select"
            value={selectedUserType}
            onChange={handleUserTypeChange}
          >
            <option value="">Select User Type</option>
            {userTypes.map((userType) => (
              <option key={userType.id} value={userType.id}>
                {userType.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
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

SetUserType.propTypes = {
  onClose: PropTypes.func.isRequired,
  admin: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
};

export default SetUserType;
