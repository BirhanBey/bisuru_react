import React, { useEffect, useState } from 'react';
import { Table, Dropdown  } from 'react-bootstrap';
import axios from 'axios';

const AnimalController = () => {
  const [allAnimal, setAllAnimal] = useState([]);
  let token = localStorage.getItem('token');
    console.log(allAnimal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/https://s3.syntradeveloper.be/bisurularavel/api/animals', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllAnimal(response.data);
      } catch (error) {
        console.error('Request Error:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
<div>
      <h1>Animal Panel</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Farms Id</th>
            <th>Earing Number</th>
            <th>Date of Birth</th>
            <th>Last Birth Giving</th>
            <th>Number of Births</th>
            <th>Lactation Status</th>

          </tr>
        </thead>
        <tbody>
          {allAnimal.map((animal) => (
            <React.Fragment key={animal.id}>
              <tr>
                <td>{animal.id}</td>
                <td>{animal.farms_id}</td>
                <td>{animal.earing_number}</td>
                <td>{animal.dateOfBirth}</td>
                <td>{animal.dateOfLastBirthGiving}</td>
                <td>{animal.birthNummber}</td>
                <td>{animal.lactationStatus ? 'Active' : 'Inactive'}</td>


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

export default AnimalController;