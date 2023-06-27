import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteFarmStaff = ({ onSubmit, farmStaff, onClose }) => {
  let token = localStorage.getItem('token');
  console.log(farmStaff);
  const handleFarmStaffDelete = async () => {
    try {
      const response = await axios.delete(
        `https://s3.syntradeveloper.be/bisurularavel/api/farmstaff/${farmStaff}`,
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
    <Modal className="p-0 my-modal" show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'white' }}>Delete Farm Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: 'white' }}>Are you sure you want to delete this farmStaff?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleFarmStaffDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteFarmStaff.propTypes = {
  farmStaff: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  // onCoopStaffDelete: PropTypes.func.isRequired,
};

export default DeleteFarmStaff;
