import React, { useEffect, useState } from 'react';
import { Table, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import AnimalDetail from './FarmStaff/AnimalREQ/AnimalDetail';

const FarmStaffControl = () => {
  const [allFarms, setAllFarms] = useState([]);
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
      } catch (error) {
        console.error('Request Error:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleAnimalsClick = (farmer) => {
    setSelectedFarmStaff(farmer); // Seçilen kooperatifin bilgilerini ayarla
    setShowAnimalsDetail(!showAnimalsDetail); // "Farms" seçeneğine tıklandığında yeni bileşeni aç/kapat
  };

  const handleClose = () => {
    setShowAnimalsDetail(false);
  };
  return (
    <div>
      <h1>Farm Staff Panel</h1>
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
                  {/* Not: farm.address olarak güncellendi */}
                  <td>{staff.phoneNumber}</td>
                  <td>{staff.dateOfBirth}</td>
                  <td>{staff.education}</td>
                  <td>{staff.status ? 'Active' : 'Inactive'}</td>
                  <td colSpan="7">
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        View Details
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleAnimalsClick(farm)}>
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
      {showAnimalsDetail && selectedFarmStaff && (
        <AnimalDetail farm={selectedFarmStaff} onClose={handleClose} />
      )}
    </div>
  );
};

export default FarmStaffControl;
