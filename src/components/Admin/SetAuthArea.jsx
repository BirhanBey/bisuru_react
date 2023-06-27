import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const SetAuthArea = ({ admin, onClose, onSubmit }) => {
  const [authArea, setAuthArea] = useState([]);
  const [selectedAuthArea, setSelectedAuthArea] = useState('');
  let token = localStorage.getItem('token');
  console.log(admin);
  
  
  useEffect(() => {
      const fetchAuthArea = async () => {
          const UserType = admin.roles[0].title;
      if (UserType === 'Cooperative') {
        try {
          const response = await axios.get(
            'https://s3.syntradeveloper.be/bisurularavel/api/cooperatives',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setAuthArea(response.data);
        } catch (error) {
          console.error('Request Error:', error);
        }
      } else if (UserType === 'SuperUser') {
        try {
          const response = await axios.get(
            'https://s3.syntradeveloper.be/bisurularavel/api/admins',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setAuthArea(response.data);
        } catch (error) {
          console.error('Request Error:', error);
        }
      } else if (UserType === 'Farmer') {
        try {
          const response = await axios.get(
            'https://s3.syntradeveloper.be/bisurularavel/api/farmers',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setAuthArea(response.data);
        } catch (error) {
          console.error('Request Error:', error);
        }
      }
    };

    fetchAuthArea();
  }, [admin.roles.title, token, admin.roles]);

  const handleAuthAreaChange = (event) => {
    setSelectedAuthArea(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        'https://s3.syntradeveloper.be/bisurularavel/api/adminuserroles',
        {
          admins_id: admin.id,
          admin_roles_id: selectedAuthArea,
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
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Set Authorization Area</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Authorization Area:</Form.Label>
          <Form.Control
            as="select"
            value={selectedAuthArea}
            onChange={handleAuthAreaChange}
          >
            <option value="">{admin.roles[0] ? 'Select Authorization Area' : 'Select UserType Firsft'}</option>
            {authArea.map((authArea) => (
              <option key={authArea.id} value={authArea.id}>
                {authArea.name}
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

SetAuthArea.propTypes = {
  onClose: PropTypes.func.isRequired,
  admin: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
};

export default SetAuthArea;
