import PropTypes from 'prop-types';
import { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import UpdateFarm from './UpdateFarm';
import { FarmDataRefresh } from '../../../functions/FarmDataRefresh';

const FarmDetail = ({ farmer, onClose }) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [farmData, setFarmData] = useState(farmer.farms);

  const handleFarmUpdateClick = (farms) => {
    setSelectedFarm(farms);
    setUpdateModalOpen(true);
  };

  const handleFarmUpdate = (updatedFarmer) => {
    const farms = farmer.farms;
    const updatedFarmsList = farms.map((farm) => {
      if (farm.id === updatedFarmer.id) {
        return updatedFarmer;
      }
      return farm;
    });
    setFarmData((prevState) => ({
      ...prevState,
      farms: updatedFarmsList,
    }));
  };

  const handleModalSubmit = async (data) => {
    if (data == 'OK') {
      try {
        const response = await FarmDataRefresh(farmer);
        //response.data.farmers.map((farmer) => console.log(farmer));
        setFarmData(response.farms);
        // console.log(farmer);
      } catch (error) {
        console.error('Request Error:', error);
      }
    } else {
      console.error(data);
    }
  };

  return (
    <Modal className="p-0 my-modal" show={true} onHide={onClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'white' }}>
          Farms List of Farmer {farmer.name}{' '}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <h2 className="ms-5" style={{ color: 'white' }}>
            {' '}
            Farm Detail
          </h2>
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
            {farmData.map((farm) => (
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
                  <Button
                    style={{
                      boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
                      backgroundColor: '#DEE2FF',
                      border: '0px',
                      color: 'black',
                    }}
                    onClick={() => handleFarmUpdateClick(farm)}
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
                </td>
              </tr>
            ))}
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
      </Modal.Body>
      <Modal.Footer>{/* Footer içeriği */}</Modal.Footer>
    </Modal>
  );
};

FarmDetail.propTypes = {
  farmer: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FarmDetail;
