import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Spinner } from 'react-bootstrap';
import axios from 'axios';

const AnimalController = () => {
  const [allAnimal, setAllAnimal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let token = localStorage.getItem('token');
  console.log(allAnimal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://s3.syntradeveloper.be/bisurularavel/api/animals',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setAllAnimal(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Request Error:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h1
        style={{
          color: 'white',
          textShadow: ' 1px 3px 5px #f1f1f1',
          fontSize: '32px',
        }}
      >
        Animal Panel
      </h1>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh',
            color: 'white',
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
              <th>Farms Id</th>
              <th>Earing Number</th>
              <th>Date of Birth</th>
              <th>Last Birth Giving</th>
              <th>Number of Births</th>
              <th>Lactation Status</th>
              <th>Control</th>
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
                        <Dropdown.Item>Next Feature</Dropdown.Item>
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
    </div>
  );
};

export default AnimalController;
