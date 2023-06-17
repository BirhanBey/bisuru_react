import React, { useEffect, useState } from 'react';
import { Table, Dropdown  } from 'react-bootstrap';
import axios from 'axios';

const CoopStaffController = () => {
  const [allCoopStaff, setAllCoopStaff] = useState([]);
  let token = localStorage.getItem('token');
    console.log(allCoopStaff);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/coopstaffs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllCoopStaff(response.data);
      } catch (error) {
        console.error('Request Error:', error);
      }
    };

    fetchData();
  }, [token]);

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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allCoopStaff.map((coopstaff) => (
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

export default CoopStaffController;