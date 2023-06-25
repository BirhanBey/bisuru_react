import React, { useEffect, useState } from 'react';
import { Table, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import FarmDetail from './Farmers/FarmREQ/FarmDetail';
import FarmStaffDetail from './Farmers/FarmStaffREQ/FarmStaffDetail';
import AnimalDetail from './Farmers/AnimalREQ/AnimalDetail';

const FarmerControl = () => {
  const [allFarmers, setAllFarmers] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null); // Seçilen kooperatifin bilgilerini saklamak için bir durum kullanın
  const [showFarmsDetail, setShowFarmsDetail] = useState(false);
  const [showFarmStaffDetail, setShowFarmStaffDetail] = useState(false);
  const [showAnimalsDetail, setShowAnimalsDetail] = useState(false);
  let token = localStorage.getItem('token');
// console.log(selectedFarmer);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://s3.syntradeveloper.be/bisurularavel/api/farmers',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllFarmers(response.data);
      } catch (error) {
        console.error('Request Error:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleFarmsClick = (farmer) => {
    setSelectedFarmer(farmer); // Seçilen kooperatifin bilgilerini ayarla
    setShowFarmsDetail(!showFarmsDetail); // "Farms" seçeneğine tıklandığında yeni bileşeni aç/kapat
  };
  const handleFarmStaffClick = (farmer) => {
    setSelectedFarmer(farmer); // Seçilen kooperatifin bilgilerini ayarla
    setShowFarmStaffDetail(!showFarmStaffDetail); // "Farms" seçeneğine tıklandığında yeni bileşeni aç/kapat
  };
  const handleAnimalsClick = (farmer) => {
    setSelectedFarmer(farmer); // Seçilen kooperatifin bilgilerini ayarla
    setShowAnimalsDetail(!showAnimalsDetail); // "Farms" seçeneğine tıklandığında yeni bileşeni aç/kapat
  };

  const handleClose = () => {
    setShowFarmsDetail(false);
    setShowFarmStaffDetail(false);
    setShowAnimalsDetail(false);
  };
  return (
    <div>
      <h1>Farmer Panel</h1>
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
          {allFarmers.map((farmer) => (
            <React.Fragment key={farmer.id}>
              <tr>
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

                <td colSpan="7">
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      View Details
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {/* <Dropdown.Item
                        onClick={() => handleFarmersClick(farmer)}
                      >
                        Farmers
                      </Dropdown.Item> */}
                      <Dropdown.Item
                        onClick={() => handleFarmsClick(farmer)}
                      >
                        Farms
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleFarmStaffClick(farmer)}
                      >
                        Farm Staff
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleAnimalsClick(farmer)}
                      >
                        Animals
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>


      {showFarmsDetail && selectedFarmer && (
        <FarmDetail farmer={selectedFarmer} onClose={handleClose} />
      )}
      {showFarmStaffDetail && selectedFarmer && (
        <FarmStaffDetail
          farmer={selectedFarmer}
          onClose={handleClose}
        />
      )}
      {showAnimalsDetail && selectedFarmer && (
        <AnimalDetail
          farmer={selectedFarmer}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default FarmerControl;
