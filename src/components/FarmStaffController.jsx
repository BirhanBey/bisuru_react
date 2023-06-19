import React, { useEffect, useState } from 'react';
import { Table, Dropdown  } from 'react-bootstrap';
import axios from 'axios';

const FarmStaffController = () => {
  const [allFarmStaff, setAllFarmStaff] = useState([]);
  let token = localStorage.getItem('token');
    console.log(allFarmStaff);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://s3.syntradeveloper.be/bisurularavel/api/farmstaff', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllFarmStaff(response.data);
      } catch (error) {
        console.error('Request Error:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
<div>
      <h1>Farm Staff Control</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Farms Id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Department</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Marital Status</th>
            <th>Date of Birth</th>
            <th>Education</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allFarmStaff.map((farmstaff) => (
            <React.Fragment key={farmstaff.id}>
              <tr>
                <td>{farmstaff.id}</td>
                <td>{farmstaff.farms_id}</td>
                <td>{farmstaff.name}</td>
                <td>{farmstaff.surname}</td>
                <td>{farmstaff.department}</td>
                <td>{farmstaff.phoneNumber}</td>
                <td>{farmstaff.status ? 'Active' : 'Inactive'}</td>
                <td>{farmstaff.MaritalStatus}</td>
                <td>{farmstaff.dateOfBirth}</td>
                <td>{farmstaff.education}</td>

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

export default FarmStaffController;