import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Spinner } from 'react-bootstrap';
import axios from 'axios';
import FarmDetail from './Farmers/FarmREQ/FarmDetail';
import FarmStaffDetail from './Farmers/FarmStaffREQ/FarmStaffDetail';
import AnimalDetail from './Farmers/AnimalREQ/AnimalDetail';

const FarmerControl = () => {
  const [allFarmers, setAllFarmers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFarmer, setSelectedFarmer] = useState(null); 
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
        setIsLoading(false);
      } catch (error) {
        console.error('Request Error:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleFarmsClick = (farmer) => {
    setSelectedFarmer(farmer); 
    setShowFarmsDetail(!showFarmsDetail); 
  };
  const handleFarmStaffClick = (farmer) => {
    setSelectedFarmer(farmer);
    setShowFarmStaffDetail(!showFarmStaffDetail); 
  };
  const handleAnimalsClick = (farmer) => {
    setSelectedFarmer(farmer); 
    setShowAnimalsDetail(!showAnimalsDetail);
  };

  const handleClose = () => {
    setShowFarmsDetail(false);
    setShowFarmStaffDetail(false);
    setShowAnimalsDetail(false);
  };
  return (
    <div>
      <h1
        style={{
          color: 'white',
          textShadow: ' 1px 3px 5px #f1f1f1',
          fontSize: '32px',
        }}
      >
        Farmer Panel
      </h1>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh',  
            color: "white"
          }}
        >
          <Spinner animation="border" size="xl" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
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
            <th>Control</th>
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
                    <Dropdown.Toggle
                      style={{
                        boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
                        backgroundColor: '#cbc0d3',
                        border: '0px',
                        color: 'white',
                      }}
                      variant="secondary"
                      id="dropdown-basic"
                    >
                      View Details
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      style={{
                        backgroundColor: '#cbc0d3',
                        marginTop: '10px',
                      }}
                    >
                      <Dropdown.Item onClick={() => handleFarmsClick(farmer)}>
                        Farms
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleFarmStaffClick(farmer)}
                      >
                        Farm Staff
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAnimalsClick(farmer)}>
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
      )}


      {showFarmsDetail && selectedFarmer && (
        <FarmDetail farmer={selectedFarmer} onClose={handleClose} />
      )}
      {showFarmStaffDetail && selectedFarmer && (
        <FarmStaffDetail farmer={selectedFarmer} onClose={handleClose} />
      )}
      {showAnimalsDetail && selectedFarmer && (
        <AnimalDetail farmer={selectedFarmer} onClose={handleClose} />
      )}
    </div>
  );
};

export default FarmerControl;
