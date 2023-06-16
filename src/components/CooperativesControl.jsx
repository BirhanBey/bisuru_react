import React, { useEffect, useState } from 'react';
import { Table, Dropdown } from 'react-bootstrap';
import axios from 'axios';

const CooperativesControl = () => {
  const [allCooperatives, setAllCooperatives] = useState([]);
  let token = localStorage.getItem('token');
  console.log(allCooperatives);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/cooperatives',
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

  return (
    <div>
      <h1>Cooperatives Control</h1>
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
                      <Dropdown.Item>Coopertive Staff</Dropdown.Item>
                      <Dropdown.Item>Farmers</Dropdown.Item>
                      <Dropdown.Item>Farms</Dropdown.Item>
                      {/* Diğer özelliklerinizi burada listeye ekleyebilirsin */}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
              <tr></tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CooperativesControl;
