import PropTypes from 'prop-types';
import { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
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
    <Modal className="p-0 my-modal" show={true} onHide={onClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'white' }}>
          Farm Staff List of {cooperative.name}{' '}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center mb-3">
          <div className="d-flex ms-auto me-auto">
            <h2 className="ms-5" style={{ color: 'white' }}>
              {' '}
              Farm Staff Detail
            </h2>
          </div>
          <Button
            style={{
              boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
              backgroundColor: '#DEE2FF',
              border: '0px',
              color: 'black',
            }}
            variant="primary"
            onClick={handleAddFarmStaffClick}
          >
            Add Farm Staff
          </Button>
        </div>
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
                    <td className='d-flex gap-3'>
                      <Button
                        style={{
                          boxShadow:
                            '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
                          backgroundColor: '#DEE2FF',
                          border: '0px',
                          color: 'black',
                        }}
                        onClick={() => handleFarmStaffUpdateClick(staff)}
                      >
                        Update
                      </Button>
                      <Button
                        style={{
                          boxShadow:
                            '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
                          backgroundColor: '#DEE2FF',
                          border: '0px',
                          color: 'black',
                        }}
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
      </Modal.Body>
      <Modal.Footer>{/* Footer içeriği */}</Modal.Footer>
    </Modal>
  );
};

FarmStaffDetail.propTypes = {
  cooperative: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FarmStaffDetail;
