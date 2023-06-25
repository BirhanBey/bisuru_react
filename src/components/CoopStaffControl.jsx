import React, { useEffect, useState } from 'react';
import { Table, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import FarmerDetail from './Cooperatives/FarmersREQ/FarmerDetail';
import FarmDetail from './Cooperatives/FarmsREQ/FarmDetail';
import FarmStaffDetail from './Cooperatives/FarmStaffREQ/FarmStaffDetail';
import AnimalDetail from './Cooperatives/AnimalsREQ/AnimalDetail';

const CoopStaffControl = () => {
  const [allCoopStaff, setAllCoopStaff] = useState([]);
  const [selectedCoopStaff, setSelectedCoopStaff] = useState(null); // Seçilen kooperatifin bilgilerini saklamak için bir durum kullanın
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
        setAllCoopStaff(response.data);
        console.log(response.data.cooperative_staff);
      } catch (error) {
        console.error('Request Error:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleFarmersClick = (coopstaff) => {
    setSelectedCoopStaff(coopstaff); // Seçilen kooperatifin bilgilerini ayarla
    setShowFarmersDetail(!showFarmersDetail); // "Farmers" seçeneğine tıklandığında yeni bileşeni aç/kapat
  };

  const handleFarmsClick = (coopstaff) => {
    setSelectedCoopStaff(coopstaff); // Seçilen kooperatifin bilgilerini ayarla
    setShowFarmsDetail(!showFarmsDetail); // "Farms" seçeneğine tıklandığında yeni bileşeni aç/kapat
  };
  const handleFarmStaffClick = (coopstaff) => {
    setSelectedCoopStaff(coopstaff); // Seçilen kooperatifin bilgilerini ayarla
    setShowFarmStaffDetail(!showFarmStaffDetail); // "Farms" seçeneğine tıklandığında yeni bileşeni aç/kapat
  };
  const handleAnimalsClick = (coopstaff) => {
    setSelectedCoopStaff(coopstaff); // Seçilen kooperatifin bilgilerini ayarla
    setShowAnimalsDetail(!showAnimalsDetail); // "Farms" seçeneğine tıklandığında yeni bileşeni aç/kapat
  };

  const handleClose = () => {
    setShowFarmersDetail(false);
    setShowFarmsDetail(false);
    setShowFarmStaffDetail(false);
    setShowAnimalsDetail(false);
  };
  console.log(allCoopStaff);

  return (
    <div>
      <h1>Cooperative Staff Panel</h1>
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
          </tr>
        </thead>
        <tbody>
        {allCoopStaff.length > 0 && allCoopStaff.map((cooperative) => 
          cooperative.cooperative_staffs && cooperative.cooperative_staffs.map((coopstaff) => (

            <React.Fragment key={coopstaff.id}>
              <tr>
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

                <td colSpan="7">
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      View Details
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
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
          ))
        )}
        </tbody>
      </Table>
      {showFarmersDetail && selectedCoopStaff && (
        <FarmerDetail cooperative={selectedCoopStaff} onClose={handleClose} />
      )}
      {showFarmsDetail && selectedCoopStaff && (
        <FarmDetail cooperative={selectedCoopStaff} onClose={handleClose} />
      )}
      {showFarmStaffDetail && selectedCoopStaff && (
        <FarmStaffDetail cooperative={selectedCoopStaff} onClose={handleClose} />
      )}
      {showAnimalsDetail && selectedCoopStaff && (
        <AnimalDetail cooperative={selectedCoopStaff} onClose={handleClose} />
      )}
    </div>
  );
};

export default CoopStaffControl;
