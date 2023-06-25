import PropTypes from 'prop-types';
import { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
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
    <>
      <div className="d-flex justify-content-between">
        <h2 className="ms-5"> Farmers Detail</h2>
        <button className="btn btn-danger" onClick={onClose}>
          X
        </button>
      </div>
      <Button variant="primary" onClick={handleAddFarmerClick}>
        Add Farmer
      </Button>
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
              <td>
                <Button onClick={() => handleFarmerUpdateClick(farmer)}>
                  Update
                </Button>
                <Button onClick={() => handleDeleteClick(farmer.id)}>
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
    </>
  );
};

FarmersDetail.propTypes = {
  cooperative: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FarmersDetail;
