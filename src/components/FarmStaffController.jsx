import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Spinner } from 'react-bootstrap';
import axios from 'axios';
import AnimalDetail from './FarmStaff/AnimalREQ/AnimalDetail';

const FarmStaffControl = () => {
  const [allFarms, setAllFarms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFarmStaff, setSelectedFarmStaff] = useState(null); // Seçilen kooperatifin bilgilerini saklamak için bir durum kullanın
  const [showAnimalsDetail, setShowAnimalsDetail] = useState(false);
  let token = localStorage.getItem('token');
  console.log(selectedFarmStaff);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(response);
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

  const handleAnimalsClick = (farmer) => {
    setSelectedFarmStaff(farmer); 
    setShowAnimalsDetail(!showAnimalsDetail); 
  }
  const handleClose = () => {
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
        Farm Staff Panel
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
              <th>Farm Id</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Address</th>
              <th>Department</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Education</th>
              <th>Status</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {allFarms.map((farm) =>
              farm.farmstaff.map((staff) => (
                <React.Fragment key={staff.id}>
                  <tr>
                    <td>{staff.id}</td>
                    <td>{staff.farms_id}</td>
                    <td>{staff.name}</td>
                    <td>{staff.surname}</td>
                    <td>{farm.address}</td>
                    <td>{staff.department}</td>
                    <td>{staff.phoneNumber}</td>
                    <td>{staff.dateOfBirth}</td>
                    <td>{staff.education}</td>
                    <td>{staff.status ? 'Active' : 'Inactive'}</td>
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
                            onClick={() => handleAnimalsClick(farm)}
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

      {showAnimalsDetail && selectedFarmStaff && (
        <AnimalDetail farm={selectedFarmStaff} onClose={handleClose} />
      )}
    </div>
  );
};

export default FarmStaffControl;
