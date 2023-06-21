import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteFarmer = ({ onSubmit, farmer, onClose }) => {
  let token = localStorage.getItem('token');
console.log(farmer);
  const handleFarmerDelete = async () => {
    try {
      const response = await axios.delete(
        `https://s3.syntradeveloper.be/bisurularavel/api/farmers/${farmer}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      onClose();

      onClose(); // Kapatma işlemini çağır
      if (response.status == '200') {
        onSubmit('OK');
        console.log(response.status);
      } else {
        onSubmit(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Farmer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this farmer?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleFarmerDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteFarmer.propTypes = {
  farmer: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  // onCoopStaffDelete: PropTypes.func.isRequired,
};

export default DeleteFarmer;
