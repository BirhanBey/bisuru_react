import PropTypes from 'prop-types';
import { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import UpdateCoopStaff from './UpdateCoopStaff';
import DeleteCoopStaff from './DeleteCoopStaff';
import AddCoopStaff from './AddCoopStaff';

const CoopStaffDetail = ({ cooperative, onClose }) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedCoopStaff, setSelectedCoopStaff] = useState(null);
  const [coopData, setCoopData] = useState(cooperative.cooperative_staffs);
  let token = localStorage.getItem('token');
  console.log(cooperative);
  const handleUpdateClick = (coopstaff) => {
    setSelectedCoopStaff(coopstaff);
    setUpdateModalOpen(true);
  };

  const handleDeleteClick = (coopstaff) => {
    setSelectedCoopStaff(coopstaff);
    setDeleteModalOpen(true);
  };

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  const handleCoopStaffUpdate = (updatedCooperative) => {
    const staffs = cooperative.cooperative_staffs;
    const updatedCoopStaffList = staffs.map((coopstaff) => {
      if (coopstaff.id === updatedCooperative.id) {
        return updatedCooperative;
      }
      return coopstaff;
    });
    setCoopData((prevState) => ({
      ...prevState,
      cooperative_staffs: updatedCoopStaffList,
    }));
  };
  const handleCoopStaffAdd = async (newCoopStaff) => {
    try {
      const response = await axios.post(
        'https://s3.syntradeveloper.be/bisurularavel/api/coopstaffs/',
        newCoopStaff,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const addedCoopStaff = response.data;

      // Yeni iş birimi personelini tabloya ekleme
      setCoopData((prevState) => ({
        ...prevState,
        cooperative_staffs: [...prevState.cooperative_staffs, addedCoopStaff],
      }));

      onClose();
    } catch (error) {
      console.error('Request Error:', error);
    }
  };

  const closeModal = () => {
    setDeleteModalOpen(false);
  };
  const handleModalSubmit = async (data) => {
    if (data == 'OK') {
      try {
        const response = await axios.get(
          `https://s3.syntradeveloper.be/bisurularavel/api/cooperative/${cooperative.id}/staff`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCoopData(response.data.cooperative_staffs);
      } catch (error) {
        console.error('Request Error:', error);
      }
    } else {
      console.error(data);
    }
    closeModal();
  };
  return (
    <Modal className="p-0 my-modal" show={true} onHide={onClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title style={{color:"white"}}>Staff List of {cooperative.name} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center mb-3">
          <div className="d-flex ms-auto me-auto">
            <h2 className="ms-5">{cooperative.name} Staff Detail</h2>
          </div>
          <Button
            style={{
              boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
              backgroundColor: '#DEE2FF',
              border: '0px',
              color: 'white',
            }}
            variant="primary"
            onClick={handleAddClick}
          >
            Add Staff
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>cooperatives_id</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Date of Birth</th>
              <th>Identity Number</th>
              <th>Place of Birth</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {coopData.map((coopstaff) => (
              <tr id={coopstaff.id} key={coopstaff.id}>
                <td>{coopstaff.id}</td>
                <td>{coopstaff.cooperatives_id}</td>
                <td>{coopstaff.name}</td>
                <td>{coopstaff.surname}</td>
                <td>{coopstaff.address}</td>
                <td>{coopstaff.phoneNumber}</td>
                <td>{coopstaff.status ? 'Active' : 'Inactive'}</td>
                <td>{coopstaff.dateOfBirth}</td>
                <td>{coopstaff.identityNumber}</td>
                <td>{coopstaff.placeOfBirth}</td>
                <td>
                  <Button onClick={() => handleUpdateClick(coopstaff)}>
                    Update
                  </Button>
                  <Button onClick={() => handleDeleteClick(coopstaff.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isUpdateModalOpen && (
          <UpdateCoopStaff
            coopStaff={selectedCoopStaff}
            onClose={() => setUpdateModalOpen(false)}
            onSubmit={handleModalSubmit}
            onCoopStaffUpdate={handleCoopStaffUpdate}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteCoopStaff
            onSubmit={handleModalSubmit}
            coopStaff={selectedCoopStaff}
            onClose={closeModal}
          />
        )}
        {isAddModalOpen && ( // Ekledik
          <AddCoopStaff
            onSubmit={handleModalSubmit}
            coopID={cooperative.id}
            coopStaff={selectedCoopStaff}
            onClose={() => setAddModalOpen(false)}
            onCoopStaffAdd={handleCoopStaffAdd}
          />
        )}
      </Modal.Body>
      <Modal.Footer>{/* Footer içeriği */}</Modal.Footer>
    </Modal>
  );
};

CoopStaffDetail.propTypes = {
  cooperative: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CoopStaffDetail;
