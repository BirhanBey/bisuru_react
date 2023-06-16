import React, { useEffect, useState } from 'react';
import { Table, Dropdown  } from 'react-bootstrap';
import axios from 'axios';

const FarmController = () => {
  const [allFarms, setAllFarms] = useState([]);
  let token = localStorage.getItem('token');
    console.log(allFarms);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/farms', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllFarms(response.data);
      } catch (error) {
        console.error('Request Error:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
<div>
      <h1>Farm Control</h1>
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
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      View Details
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Farm Staff</Dropdown.Item>
                      
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

export default FarmController;