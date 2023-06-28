import PropTypes from 'prop-types';
import { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import UpdateFarmer from './UpdateFarmer';
import DeleteFarmer from './DeleteFarmer';
import AddFarmer from './AddFarmer'; // Ekledik
import { CoopDataRefresh } from '../../../functions/CoopDataRefresh';

const FarmersDetail = ({ cooperative, onClose }) => {
  console.log(cooperative.cooperative_staffs);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false); // Ekledik
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [farmerData, setFarmerData] = useState(cooperative.farmers);

  let token = localStorage.getItem('token');
  console.log(cooperative);
  const handleFarmerUpdateClick = (farmers) => {
    setSelectedFarmer(farmers);
    setUpdateModalOpen(true);
  };

  const handleDeleteClick = (farmers) => {
    setSelectedFarmer(farmers);
    setDeleteModalOpen(true);
  };

  const handleAddFarmerClick = () => {
    // Ekledik
    setAddModalOpen(true);
  };

  const handleFarmersUpdate = (updatedCooperative) => {
    const farmers = cooperative.farmers;
    const updatedFarmersList = farmers.map((farmer) => {
      if (farmer.id === updatedCooperative.id) {
        return updatedCooperative;
      }
      return farmer;
    });
    setFarmerData((prevState) => ({
      ...prevState,
      farmers: updatedFarmersList,
    }));
  };

  const handleFarmerAdd = async (newFarmer) => {
    try {
      const response = await axios.post(
        'https://s3.syntradeveloper.be/bisurularavel/api/farmers/',
        newFarmer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const addedFarmer = response.data;

      // Yeni iş birimi personelini tabloya ekleme
      setFarmerData((prevState) => ({
        ...prevState,
        farmers: [...prevState.farmers, addedFarmer],
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
        //response.data.farmers.map((farmer) => console.log(farmer));
        setFarmerData(response.farmers);
        console.log(cooperative);
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
          Farmers List of {cooperative.name}{' '}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center mb-3">
          <div className="d-flex ms-auto me-auto">
            <h2 style={{ color: 'white' }} className="ms-5">
              {' '}
              Farmers Detail
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
            onClick={handleAddFarmerClick}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#afa99f';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#DEE2FF';
              e.target.style.color = 'black';
            }}
          >
            Add Farmer
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {farmerData.map((farmer) => (
              <tr id={farmer.id} key={farmer.id}>
                <td>{farmer.id}</td>
                <td>{farmer.cooperatives_id}</td>
                <td>{farmer.name}</td>
                <td>{farmer.surname}</td>
                <td>{farmer.address}</td>
                <td>{farmer.phoneNumber}</td>
                <td>{farmer.status ? 'Active' : 'Inactive'}</td>
                <td>{farmer.dateOfBirth}</td>
                <td>{farmer.identityNumber}</td>
                <td>{farmer.placeOfBirth}</td>
                <td className="d-flex gap-3">
                  <Button
                    style={{
                      boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
                      backgroundColor: '#DEE2FF',
                      border: '0px',
                      color: 'black',
                    }}
                    onClick={() => handleFarmerUpdateClick(farmer)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#afa99f';
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#DEE2FF';
                      e.target.style.color = 'black';
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    style={{
                      boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
                      backgroundColor: '#DEE2FF',
                      border: '0px',
                      color: 'black',
                    }}
                    onClick={() => handleDeleteClick(farmer.id)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'orangered';
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#DEE2FF';
                      e.target.style.color = 'orangered';
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isUpdateModalOpen && (
          <UpdateFarmer
            farmer={selectedFarmer}
            onClose={() => setUpdateModalOpen(false)}
            onSubmit={handleModalSubmit}
            onFarmerUpdate={handleFarmersUpdate}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteFarmer
            onSubmit={handleModalSubmit}
            farmer={selectedFarmer}
            onClose={closeModal}
          />
        )}
        {isAddModalOpen && ( // Ekledik
          <AddFarmer
            onSubmit={handleModalSubmit}
            coopID={cooperative.id}
            farmer={selectedFarmer}
            onClose={() => setAddModalOpen(false)}
            onFarmerAdd={handleFarmerAdd}
          />
        )}
      </Modal.Body>
      <Modal.Footer>{/* Footer içeriği */}</Modal.Footer>
    </Modal>
  );
};

FarmersDetail.propTypes = {
  cooperative: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FarmersDetail;
