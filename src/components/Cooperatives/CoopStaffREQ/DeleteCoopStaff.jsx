import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteCoopStaff = ({ onSubmit, coopStaff, onClose }) => {
  let token = localStorage.getItem('token');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://s3.syntradeveloper.be/bisurularavel/api/coopstaffs/${coopStaff}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      onClose();

      //onCoopStaffDelete(coopStaff); // Silinen veriyi tablodan kaldır
      onClose(); // Kapatma işlemini çağır
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
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Cooperative Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this cooperative staff?</p>
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

DeleteCoopStaff.propTypes = {
  coopStaff: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  // onCoopStaffDelete: PropTypes.func.isRequired,
};

export default DeleteCoopStaff;
