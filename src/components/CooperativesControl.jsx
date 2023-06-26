import React, { useEffect, useState } from 'react';
import { Table, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import CoopStaffDetail from './Cooperatives/CoopStaffREQ/CoopStaffDetail'; // Eğer CoopStaffDetail bileşeni başka bir dosyada bulunuyorsa import edin
import FarmerDetail from './Cooperatives/FarmersREQ/FarmerDetail';
import FarmDetail from './Cooperatives/FarmsREQ/FarmDetail';
import FarmStaffDetail from './Cooperatives/FarmStaffREQ/FarmStaffDetail';
import AnimalDetail from './Cooperatives/AnimalsREQ/AnimalDetail';

const CooperativesControl = () => {
  const [allCooperatives, setAllCooperatives] = useState([]);
  const [showCoopStaffDetail, setShowCoopStaffDetail] = useState(false); // Yeni bileşenin açılıp açılmayacağını kontrol etmek için bir durum kullanın
  const [selectedCooperative, setSelectedCooperative] = useState(null); // Seçilen kooperatifin bilgilerini saklamak için bir durum kullanın
  const [showFarmersDetail, setShowFarmersDetail] = useState(false);
  const [showFarmsDetail, setShowFarmsDetail] = useState(false);
  const [showFarmStaffDetail, setShowFarmStaffDetail] = useState(false);
  const [showAnimalsDetail, setShowAnimalsDetail] = useState(false);
  let token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://s3.syntradeveloper.be/bisurularavel/api/cooperatives',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllCooperatives(response.data);
      } catch (error) {
        console.error('Request Error:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleCoopStaffClick = (cooperative) => {
    setSelectedCooperative(cooperative); // Seçilen kooperatifin bilgilerini ayarla
    setShowCoopStaffDetail(!showCoopStaffDetail); // "Cooperative Staff" seçeneğine tıklandığında yeni bileşeni aç/kapat
  };

  const handleFarmersClick = (cooperative) => {
    setSelectedCooperative(cooperative); // Seçilen kooperatifin bilgilerini ayarla
    setShowFarmersDetail(!showFarmersDetail); // "Farmers" seçeneğine tıklandığında yeni bileşeni aç/kapat
  };

  const handleFarmsClick = (cooperative) => {
    setSelectedCooperative(cooperative); // Seçilen kooperatifin bilgilerini ayarla
    setShowFarmsDetail(!showFarmsDetail); // "Farms" seçeneğine tıklandığında yeni bileşeni aç/kapat
  };
  const handleFarmStaffClick = (cooperative) => {
    setSelectedCooperative(cooperative); // Seçilen kooperatifin bilgilerini ayarla
    setShowFarmStaffDetail(!showFarmStaffDetail); // "Farms" seçeneğine tıklandığında yeni bileşeni aç/kapat
  };
  const handleAnimalsClick = (cooperative) => {
    setSelectedCooperative(cooperative); // Seçilen kooperatifin bilgilerini ayarla
    setShowAnimalsDetail(!showAnimalsDetail); // "Farms" seçeneğine tıklandığında yeni bileşeni aç/kapat
  };

  const handleClose = () => {
    setShowCoopStaffDetail(false);
    setShowFarmersDetail(false);
    setShowFarmsDetail(false);
    setShowFarmStaffDetail(false);
    setShowAnimalsDetail(false);
  };
  return (
    <div>
      <h1>Cooperatives Panel</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Address</th>
            <th>Status</th>
            <th>Field</th>
            <th>Founded</th>
            <th>License Number</th>
          </tr>
        </thead>
        <tbody>
          {allCooperatives.map((cooperative) => (
            <React.Fragment key={cooperative.id}>
              <tr>
                <td>{cooperative.id}</td>
                <td>{cooperative.name}</td>
                <td>{cooperative.address}</td>
                <td>{cooperative.status ? 'Active' : 'Inactive'}</td>
                <td>{cooperative.field}</td>
                <td>{cooperative.founded}</td>
                <td>{cooperative.licenseNo}</td>

                <td colSpan="7">
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      View Details
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleCoopStaffClick(cooperative)}
                      >
                        Cooperative Staff
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleFarmersClick(cooperative)}
                      >
                        Farmers
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleFarmsClick(cooperative)}
                      >
                        Farms
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleFarmStaffClick(cooperative)}
                      >
                        Farm Staff
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleAnimalsClick(cooperative)}
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
      {showCoopStaffDetail && selectedCooperative && (
        <CoopStaffDetail
          cooperative={selectedCooperative}
          onClose={handleClose}
        />
      )}
      {showFarmersDetail && selectedCooperative && (
        <FarmerDetail cooperative={selectedCooperative} onClose={handleClose} />
      )}
      {showFarmsDetail && selectedCooperative && (
        <FarmDetail cooperative={selectedCooperative} onClose={handleClose} />
      )}
      {showFarmStaffDetail && selectedCooperative && (
        <FarmStaffDetail
          cooperative={selectedCooperative}
          onClose={handleClose}
        />
      )}
      {showAnimalsDetail && selectedCooperative && (
        <AnimalDetail
          cooperative={selectedCooperative}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default CooperativesControl;
