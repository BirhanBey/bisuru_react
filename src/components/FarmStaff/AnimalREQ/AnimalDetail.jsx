import PropTypes from 'prop-types';
import axios from 'axios';
import { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import UpdateAnimal from './UpdateAnimal';
import AddAnimal from './AddAnimal';
import DeleteAnimal from './DeleteAnimal';
import { AnimalDataRefresh } from '../AnimalDataRefresh';

const AnimalDetail = ({ farm, onClose }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [animalData, setAnimalData] = useState(farm);
  let token = localStorage.getItem('token;');

  console.log(animalData.animals);

  const handleAnimalUpdateClick = (animal) => {
    setSelectedAnimal(animal);
    setUpdateModalOpen(true);
  };

  const handleAnimalDeleteClick = (animal) => {
    setSelectedAnimal(animal);
    setDeleteModalOpen(true);
  };

  const handleAddAnimalClick = () => {
    setAddModalOpen(true);
  };
  const handleAnimalUpdate = (updatedFarm) => {
    const animals = farm.animals;
    const updatedFarmsList = animals.map((farm) => {
      if (farm.id === updatedFarm.id) {
        return updatedFarm;
      }
      return farm;
    });
    setAnimalData((prevState) => ({
      ...prevState,
      farms: updatedFarmsList,
    }));
  };

  const handleAnimalAdd = async (newAnimal) => {
    try {
      const response = await axios.post(
        'https://s3.syntradeveloper.be/bisurularavel/api/animals',
        newAnimal,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const addedAnimal = response.data;

      // Yeni iş birimi personelini tabloya ekleme
      setAnimalData((prevState) => ({
        ...prevState,
        animal: [...prevState.animal, addedAnimal],
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
        const response = await AnimalDataRefresh(farm);
        //response.data.farmers.map((farmer) => console.log(farmer));
        setAnimalData(response);
        // console.log(farmer);
      } catch (error) {
        console.error('Request Error:', error);
      }
    } else {
      console.error(data);
    }
  };

  return (
    <Modal className="p-0 my-modal" show={true} onHide={onClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'white' }}>
          Animals List of Farmer {farm.id}{' '}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-around mb-3">
          <div className="d-flex justify-content-between">
            <h2 className="ms-5" style={{ color: 'white' }}>
              {' '}
              Animal Detail
            </h2>
          </div>
          <Button
            style={{
              boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
              backgroundColor: '#DEE2FF',
              border: '0px',
              color: 'black',
            }}
            variant="primary"
            onClick={handleAddAnimalClick}
          >
            Add Animal
          </Button>
        </div>
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
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {animalData.animals.map((animal) => (
              <tr id={animal.id} key={animal.id}>
                <td>{animal.id}</td>
                <td>{animal.farms_id}</td>
                <td>{animal.earing_number}</td>
                <td>{animal.dateOfBirth}</td>
                <td>{animal.dateOfLastBirthGiving}</td>
                <td>{animal.birthNummber}</td>
                <td>{animal.lactaionStatus}</td>
                <td className='d-flex gap-3'>
                  <Button
                    style={{
                      boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
                      backgroundColor: '#DEE2FF',
                      border: '0px',
                      color: 'black',
                    }}
                    onClick={() => handleAnimalUpdateClick(animal.id)}
                  >
                    Update
                  </Button>
                  <Button
                    style={{
                      boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
                      backgroundColor: '#DEE2FF',
                      border: '0px',
                      color: 'black',
                    }}
                    onClick={() => handleAnimalDeleteClick(animal.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isUpdateModalOpen && (
          <UpdateAnimal
            animal={selectedAnimal}
            farmID={farm.id}
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
            farmID={farm.id}
            onClose={() => setAddModalOpen(false)}
            onAnimalAdd={handleAnimalAdd}
          />
        )}
      </Modal.Body>
      <Modal.Footer>{/* Footer içeriği */}</Modal.Footer>
    </Modal>
  );
};

AnimalDetail.propTypes = {
  farm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AnimalDetail;
