import PropTypes from 'prop-types';
import { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import UpdateFarm from './UpdateFarm';
import DeleteFarm from './DeleteFarm';
import AddFarm from './AddFarm'; // Ekledik
import { CoopDataRefresh } from '../../../functions/CoopDataRefresh';

const FarmDetail = ({ cooperative, onClose }) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false); // Ekledik
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [farmData, setFarmData] = useState(cooperative.farmers);

  let token = localStorage.getItem('token');
  //   console.log(farmData);
  const handleFarmUpdateClick = (farms) => {
    setSelectedFarm(farms);
    setUpdateModalOpen(true);
  };

  const handleFarmDeleteClick = (farms) => {
    setSelectedFarm(farms);
    setDeleteModalOpen(true);
  };

  const handleAddFarmClick = () => {
    // Ekledik
    setAddModalOpen(true);
  };

  const handleFarmUpdate = (updatedCooperative) => {
    const farms = cooperative.farms;
    const updatedFarmsList = farms.map((farm) => {
      if (farm.id === updatedCooperative.id) {
        return updatedCooperative;
      }
      return farm;
    });
    setFarmData((prevState) => ({
      ...prevState,
      farms: updatedFarmsList,
    }));
  };

  const handleFarmAdd = async (newFarm) => {
    try {
      const response = await axios.post(
        'https://s3.syntradeveloper.be/bisurularavel/api/farms/',
        newFarm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const addedFarm = response.data;

      // Yeni iş birimi personelini tabloya ekleme
      setFarmData((prevState) => ({
        ...prevState,
        farms: [...prevState.farms, addedFarm],
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
        setFarmData(response.farmers);
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
    <Modal className="p-0" show={true} onHide={onClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Farms List of {cooperative.name} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-around mb-3">
          <div className="d-flex justify-content-between">
            <h2 className="ms-5"> Farm Detail</h2>
          </div>
          <Button variant="primary" onClick={handleAddFarmClick}>
            Add Farm
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Cooperative id</th>
              <th>Farmer id</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Surface Area</th>
              <th>City</th>
              <th>Identity Number</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {farmData.map((farmer) =>
              farmer.farms.map((farm) => (
                <tr id={farm.id} key={farm.id}>
                  <td>{farm.id}</td>
                  <td>{farm.cooperatives_id}</td>
                  <td>{farm.farmers_id}</td>
                  <td>{farm.address}</td>
                  <td>{farm.phoneNumber}</td>
                  <td>{farm.latitude}</td>
                  <td>{farm.longitude}</td>
                  <td>{farm.surfaceArea}</td>
                  <td>{farm.placeOfBirth}</td>
                  <td>{farm.identityNumber}</td>
                  <td>{farm.status ? 'Active' : 'Inactive'}</td>
                  <td>
                    <Button onClick={() => handleFarmUpdateClick(farm)}>
                      Update
                    </Button>
                    <Button onClick={() => handleFarmDeleteClick(farm.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        {isUpdateModalOpen && (
          <UpdateFarm
            farm={selectedFarm}
            onClose={() => setUpdateModalOpen(false)}
            onSubmit={handleModalSubmit}
            onFarmUpdate={handleFarmUpdate}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteFarm
            onSubmit={handleModalSubmit}
            farm={selectedFarm}
            onClose={closeModal}
          />
        )}
        {isAddModalOpen && ( // Ekledik
          <AddFarm
            onSubmit={handleModalSubmit}
            coopID={cooperative.id}
            farm={selectedFarm}
            onClose={() => setAddModalOpen(false)}
            onFarmAdd={handleFarmAdd}
          />
        )}
      </Modal.Body>
      <Modal.Footer>{/* Footer içeriği */}</Modal.Footer>
    </Modal>
  );
};

FarmDetail.propTypes = {
  cooperative: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FarmDetail;
