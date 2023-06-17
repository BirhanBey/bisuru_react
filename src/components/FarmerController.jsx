import React, { useEffect, useState } from 'react';
import { Table, Dropdown  } from 'react-bootstrap';
import axios from 'axios';

const FarmerController = () => {
  const [allFarmers, setAllFarmers] = useState([]);
  let token = localStorage.getItem('token');
    console.log(allFarmers);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/farmers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllFarmers(response.data);
      } catch (error) {
        console.error('Request Error:', error);
      }
    };

    fetchData();
  }, [token]);

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
                      <Dropdown.Item>Farms</Dropdown.Item>
                      
                      {/* Diğer özelliklerinizi burada listeye ekleyebilirsin */}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
              <tr>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FarmerController;