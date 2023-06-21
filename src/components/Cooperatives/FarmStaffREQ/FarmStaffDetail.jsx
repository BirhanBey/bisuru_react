import PropTypes from 'prop-types';
import { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import UpdateFarmStaff from './UpdateFarmStaff';
import DeleteFarmStaff from './DeleteFarmStaff';
import AddFarmStaff from './AddFarmStaff'; // Ekledik
import { CoopDataRefresh } from '../../../functions/CoopDataRefresh';

const FarmStaffDetail = ({ cooperative, onClose }) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false); // Ekledik
  const [selectedFarmStaff, setSelectedFarmStaff] = useState(null);
  const [farmStaffData, setFarmStaffData] = useState(cooperative.farmers);
  console.log(cooperative);

  let token = localStorage.getItem('token');

  console.log(farmStaffData.farmers);

  const handleFarmStaffUpdateClick = (farmsStaff) => {
    setSelectedFarmStaff(farmsStaff);
    setUpdateModalOpen(true);
    console.log('elma');
  };

  const handleFarmStaffDeleteClick = (farmsStaff) => {
    setSelectedFarmStaff(farmsStaff);
    console.log(farmsStaff);
    setDeleteModalOpen(true);
  };

  const handleAddFarmStaffClick = () => {
    // Ekledik
    setAddModalOpen(true);
  };

  const handleFarmStaffUpdate = (updatedCooperative) => {
    const farmstaff = cooperative.farmstaff;
    const updatedFarmStaffList = farmstaff.map((farmstaff) => {
      if (farmstaff.id === updatedCooperative.id) {
        return updatedCooperative;
      }
      return farmstaff;
    });
    setFarmStaffData((prevState) => ({
      ...prevState,
      farmsStaff: updatedFarmStaffList,
    }));
  };

  const handleFarmStaffAdd = async (newFarmStaff) => {
    try {
      const response = await axios.post(
        'https://s3.syntradeveloper.be/bisurularavel/api/farmstaff/',
        newFarmStaff,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const addedFarmStaff = response.data;

      // Yeni iş birimi personelini tabloya ekleme
      setFarmStaffData((prevState) => ({
        ...prevState,
        farmsStaff: [...prevState.farmsStaff, addedFarmStaff],
      }));

      onClose(); // Modalı kapat
    } catch (error) {
      console.error('Request Error:', error);
      // Handle error
    }
  };

  const closeModal = () => {
    setDeleteModalOpen(false);
  };
  const handleModalSubmit = async (data) => {
    if (data == 'OK') {
      try {
        const response = await CoopDataRefresh(cooperative.id);
        setFarmStaffData(response.farmers);
        console.log(response);
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
        <h2 className="ms-5"> Farm Staff Detail</h2>
        <button className="btn btn-danger" onClick={onClose}>
          X
        </button>
      </div>
      <Button variant="primary" onClick={handleAddFarmStaffClick}>
        Add Farm Staff
      </Button>{' '}
      {/* Ekledik */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            {/* <th>Cooperative id</th> */}
            <th>Farm id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Department</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
            <th>Marital Status</th>
            <th>Education</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {farmStaffData.map((farmer) =>
            farmer.farms.map((fstaff) =>
              fstaff.farmstaff.map((staff) => (
                <tr id={staff.id} key={staff.id}>
                  <td>{staff.id}</td>
                  {/* <td>{staff.cooperatives_id}</td> */}
                  <td>{staff.farms_id}</td>
                  <td>{staff.name}</td>
                  <td>{staff.surname}</td>
                  <td>{staff.department}</td>
                  <td>{staff.phoneNumber}</td>
                  <td>{staff.dateOfBirth}</td>
                  <td>{staff.maritalStatus}</td>
                  <td>{staff.education}</td>
                  <td>{staff.status ? 'Active' : 'Inactive'}</td>
                  <td>
                    <Button onClick={() => handleFarmStaffUpdateClick(staff)}>
                      Update
                    </Button>
                    <Button
                      onClick={() => handleFarmStaffDeleteClick(staff.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </Table>
      {isUpdateModalOpen && (
        <UpdateFarmStaff
          farmsStaff={selectedFarmStaff}
          onClose={() => setUpdateModalOpen(false)}
          onSubmit={handleModalSubmit}
          onFarmUpdate={handleFarmStaffUpdate}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteFarmStaff
          onSubmit={handleModalSubmit}
          farmStaff={selectedFarmStaff}
          onClose={closeModal}
        />
      )}
      {isAddModalOpen && ( // Ekledik
        <AddFarmStaff
          onSubmit={handleModalSubmit}
          coopID={cooperative.id}
          farmStaff={selectedFarmStaff}
          onClose={() => setAddModalOpen(false)}
          onFarmAdd={handleFarmStaffAdd}
        />
      )}
    </>
  );
};

FarmStaffDetail.propTypes = {
  cooperative: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FarmStaffDetail;
