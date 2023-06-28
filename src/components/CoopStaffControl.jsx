import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Spinner } from 'react-bootstrap';
import axios from 'axios';
import FarmerDetail from './Cooperatives/FarmersREQ/FarmerDetail';
import FarmDetail from './Cooperatives/FarmsREQ/FarmDetail';
import FarmStaffDetail from './Cooperatives/FarmStaffREQ/FarmStaffDetail';
import AnimalDetail from './Cooperatives/AnimalsREQ/AnimalDetail';

const CoopStaffControl = () => {
  const [allCoopStaff, setAllCoopStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCoopStaff, setSelectedCoopStaff] = useState(null); 
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
        setIsLoading(false);
      } catch (error) {
        console.error('Request Error:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleFarmersClick = (coopstaff) => {
    setSelectedCoopStaff(coopstaff); 
    setShowFarmersDetail(!showFarmersDetail); 
  };

  const handleFarmsClick = (coopstaff) => {
    setSelectedCoopStaff(coopstaff);
    setShowFarmsDetail(!showFarmsDetail); 
  };
  const handleFarmStaffClick = (coopstaff) => {
    setSelectedCoopStaff(coopstaff);
    setShowFarmStaffDetail(!showFarmStaffDetail);
  };
  const handleAnimalsClick = (coopstaff) => {
    setSelectedCoopStaff(coopstaff); 
    setShowAnimalsDetail(!showAnimalsDetail);
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
      <h1
        style={{
          color: 'white',
          textShadow: ' 1px 3px 5px #f1f1f1',
          fontSize: '32px', 
        }}
      >
        Cooperative Staff Panel
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
            {allCoopStaff.length > 0 &&
              allCoopStaff.map(
                (cooperative) =>
                  cooperative.cooperative_staffs &&
                  cooperative.cooperative_staffs.map((coopstaff) => (
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
      )}
     
      
      {showFarmersDetail && selectedCoopStaff && (
        <FarmerDetail cooperative={selectedCoopStaff} onClose={handleClose} />
      )}
      {showFarmsDetail && selectedCoopStaff && (
        <FarmDetail cooperative={selectedCoopStaff} onClose={handleClose} />
      )}
      {showFarmStaffDetail && selectedCoopStaff && (
        <FarmStaffDetail
          cooperative={selectedCoopStaff}
          onClose={handleClose}
        />
      )}
      {showAnimalsDetail && selectedCoopStaff && (
        <AnimalDetail cooperative={selectedCoopStaff} onClose={handleClose} />
      )}
    </div>
  );
};

export default CoopStaffControl;
