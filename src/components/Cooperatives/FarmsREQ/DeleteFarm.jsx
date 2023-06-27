import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteFarm = ({ onSubmit, farm, onClose }) => {
  let token = localStorage.getItem('token');
console.log(farm);
  const handleFarmDelete = async () => {
    try {
      const response = await axios.delete(
        `https://s3.syntradeveloper.be/bisurularavel/api/farms/${farm}`,
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
    <Modal className="my-modal" show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'white' }}>Delete Farm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: 'white' }}>Are you sure you want to delete this farm?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleFarmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteFarm.propTypes = {
  farm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  // onCoopStaffDelete: PropTypes.func.isRequired,
};

export default DeleteFarm;
