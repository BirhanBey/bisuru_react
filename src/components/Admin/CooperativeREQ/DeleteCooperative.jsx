import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteCooperative = ({ onSubmit, coop, onClose }) => {
  let token = localStorage.getItem('token');
  console.log(coop);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://s3.syntradeveloper.be/bisurularavel/api/cooperatives/${coop}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      onClose();

      if (response.status == '200') {
        onSubmit('OK');
        console.log(response.statusText);
      } else {
        onSubmit(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal className="my-modal" show={true} onHide={onClose}>
      <Modal.Header style={{ color: 'white' }} closeButton>
        <Modal.Title>Delete Cooperative</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: 'white' }}>
          Are you sure you want to delete this Cooperative?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteCooperative.propTypes = {
  coop: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  // onCoopStaffDelete: PropTypes.func.isRequired,
};

export default DeleteCooperative;
