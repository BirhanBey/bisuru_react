import PropTypes from 'prop-types';
import { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import UpdateCoopStaff from './UpdateCoopStaff';
import DeleteCoopStaff from './DeleteCoopStaff';
import AddCoopStaff from './AddCoopStaff'; // Ekledik

const CoopStaffDetail = ({ cooperative, onClose }) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false); // Ekledik
  const [selectedCoopStaff, setSelectedCoopStaff] = useState(null);
  const [coopData, setCoopData] = useState(cooperative.cooperative_staffs);
  let token = localStorage.getItem('token');

  const handleUpdateClick = (coopstaff) => {
    setSelectedCoopStaff(coopstaff);
    setUpdateModalOpen(true);
  };

  const handleDeleteClick = (coopstaff) => {
    setSelectedCoopStaff(coopstaff);
    setDeleteModalOpen(true);
  };

  const handleAddClick = () => {
    // Ekledik
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

      onClose(); // Modalı kapat
    } catch (error) {
      console.error('Request Error:', error);
      // Handle error
    }
  };

  // //newfuncts
  // const openModal = () => {
  //   setDeleteModalOpen(true);
  // };

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
    <>
      <div className="d-flex justify-content-between">
        <h2 className="ms-5">{cooperative.name} Staff Detail</h2>
        <button className="btn btn-danger" onClick={onClose}>
          X
        </button>
      </div>
      <Button variant="primary" onClick={handleAddClick}>
        Add Staff
      </Button>{' '}
      {/* Ekledik */}
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
            <th></th>
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
    </>
  );
};

CoopStaffDetail.propTypes = {
  cooperative: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CoopStaffDetail;
