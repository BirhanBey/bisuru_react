import PropTypes from 'prop-types';
import axios from 'axios';
import { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import UpdateAnimal from './UpdateAnimal';
import AddAnimal from './AddAnimal';
import DeleteAnimal from './DeleteAnimal';
import { AnimalDataRefresh } from '../../../functions/AnimalDataRefresh';

const AnimalDetail = ({ farmer, onClose }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [farmData, setFarmData] = useState(farmer.farms);
  let token = localStorage.getItem('token;')

console.log(farmData);

const handleAnimalUpdateClick = (farmsStaff) => {
  setSelectedAnimal(farmsStaff);
  setUpdateModalOpen(true);
};

const handleAnimalDeleteClick = (farmsStaff) => {
  setSelectedAnimal(farmsStaff);
  setDeleteModalOpen(true);
};

const handleAddAnimalClick = () => {
  setAddModalOpen(true);
};
  const handleAnimalUpdate = (updatedFarmer) => {
    const farms = farmer.farms;
    const updatedFarmsList = farms.map((farm) => {
      if (farm.id === updatedFarmer.id) {
        return updatedFarmer;
      }
      return farm;
    });
    setFarmData((prevState) => ({
      ...prevState,
      farms: updatedFarmsList,
    }));
    
  };

  const handleAnimalAdd = async (newAnimal) => {
    try {
      const response = await axios.post(
        'https://s3.syntradeveloper.be/bisurularavel/api/farmstaff/',
        newAnimal,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const addedAnimal = response.data;

      // Yeni iş birimi personelini tabloya ekleme
      setFarmData((prevState) => ({
        ...prevState,
        Animal: [...prevState.farmsStaff, addedAnimal],
      }));

      onClose(); // Modalı kapat
    } catch (error) {
      console.error('Request Error:', error);
      // Handle error
    }
  };

  const closeModal = () => {
    setDeleteModalOpen(false);
  };

  const handleModalSubmit = async (data) => {
    if (data == 'OK') {
      try {
        const response = await AnimalDataRefresh(farmer);
        //response.data.farmers.map((farmer) => console.log(farmer));
        setFarmData(response.farms);
        // console.log(farmer);
      } catch (error) {
        console.error('Request Error:', error);
      }
    } else {
      console.error(data);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2 className="ms-5"> Animal Detail</h2>
        <button className="btn btn-danger" onClick={onClose}>
          X
        </button>
      </div>
      <Button variant="primary" onClick={handleAddAnimalClick}>
        Add Animal
      </Button>      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Farm id</th>
            <th>Earing Number</th>
            <th>Date of Birth</th>
            <th>Date of Last Birth Giving</th>
            <th>Number of Births</th>
            <th>Lactaion Status</th>
          </tr>
        </thead>
        <tbody>
          {farmData.map((farm) =>
            farm.animals.map((animal) =>
              
                <tr id={animal.id} key={animal.id}>
                  <td>{animal.id}</td>
                  <td>{animal.farms_id}</td>
                  <td>{animal.earing_number}</td>
                  <td>{animal.dateOfBirth}</td>
                  <td>{animal.dateOfLastBirthGiving}</td>
                  <td>{animal.birthNummber}</td>
                  <td>{animal.lactaionStatus}</td>
                  <td>
                    <Button onClick={() => handleAnimalUpdateClick(animal.id)}>
                      Update
                    </Button>
                    <Button onClick={() => handleAnimalDeleteClick(animal.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              
            )
          )}
        </tbody>
      </Table>
      {isUpdateModalOpen && (
        <UpdateAnimal
          animal={selectedAnimal}
          onClose={() => setUpdateModalOpen(false)}
          onSubmit={handleModalSubmit}
          onAnimalUpdate={handleAnimalUpdate}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteAnimal
          onSubmit={handleModalSubmit}
          animal={selectedAnimal}
          onClose={closeModal}
        />
      )}
      {isAddModalOpen && ( // Ekledik
        <AddAnimal
          onSubmit={handleModalSubmit}
          farmerID={farmer.id}
          animal={selectedAnimal}
          onClose={() => setAddModalOpen(false)}
          onAnimalAdd={handleAnimalAdd}
        />
      )}
    </>
  );
};

AnimalDetail.propTypes = {
  farmer: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AnimalDetail;
