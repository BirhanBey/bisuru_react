import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Spinner } from 'react-bootstrap';
import axios from 'axios';
import FarmStaffDetail from './Farms/FarmStaffREQ/FarmStaffDetail';
import AnimalDetail from './Farms/AnimalREQ/AnimalDetail';

const FarmController = () => {
  const [allFarms, setAllFarms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [showFarmStaffDetail, setShowFarmStaffDetail] = useState(false);
  const [showAnimalsDetail, setShowAnimalsDetail] = useState(false);
  let token = localStorage.getItem('token');
  // console.log(allFarms);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://s3.syntradeveloper.be/bisurularavel/api/farms',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllFarms(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Request Error:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleFarmStaffClick = (farm) => {
    setSelectedFarm(farm);
    setShowFarmStaffDetail(!showFarmStaffDetail);
  };
  const handleAnimalsClick = (farm) => {
    setSelectedFarm(farm);
    setShowAnimalsDetail(!showAnimalsDetail);
  };

  const handleClose = () => {
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
        Farm Panel
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
              <th>Farmer_id</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Status</th>
              <th>Surface Area</th>
              <th>Identity Number</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {allFarms.map((farm) => (
              <React.Fragment key={farm.id}>
                <tr>
                  <td>{farm.id}</td>
                  <td>{farm.farmers_id}</td>
                  <td>{farm.address}</td>
                  <td>{farm.phoneNumber}</td>
                  <td>{farm.latitude}</td>
                  <td>{farm.longitude}</td>
                  <td>{farm.status ? 'Active' : 'Inactive'}</td>
                  <td>{farm.surfaceArea}</td>
                  <td>{farm.identityNumber}</td>

                  <td colSpan="7">
                    <Dropdown>
                      <Dropdown.Toggle
                        style={{
                          boxShadow:
                            '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
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
                        <Dropdown.Item
                          onClick={() => handleFarmStaffClick(farm)}
                        >
                          Farm Staff
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleAnimalsClick(farm)}>
                          Animals
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr></tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      )}
      {showFarmStaffDetail && selectedFarm && (
        <FarmStaffDetail farm={selectedFarm} onClose={handleClose} />
      )}
      {showAnimalsDetail && selectedFarm && (
        <AnimalDetail farm={selectedFarm} onClose={handleClose} />
      )}
    </div>
  );
};

export default FarmController;
