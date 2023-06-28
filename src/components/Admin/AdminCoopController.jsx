import React, { useEffect, useState } from 'react';
import { Table, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import AddCooperative from './CooperativeREQ/AddCooperative';
import UpdateCooperative from './CooperativeREQ/UpdateCooperative';
import DeleteCooperative from './CooperativeREQ/DeleteCooperative';

const AdminCoopControl = () => {
  const [allCooperatives, setAllCooperatives] = useState([]);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddCoopModalOpen, setAddCoopModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [selectedCooperative, setSelectedCooperative] = useState(null); 
  console.log(allCooperatives);
  let token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://s3.syntradeveloper.be/bisurularavel/api/cooperatives',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllCooperatives(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Request Error:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleUpdateCoopClick = (coop) => {
    setSelectedCooperative(coop);
    setUpdateModalOpen(true);
  };

  const handleDeleteCoopClick = (coop) => {
    setSelectedCooperative(coop);
    setDeleteModalOpen(true);
  };

  const handleAddCoopClick = () => {
    setAddCoopModalOpen(true);
  };

  const closeModal = () => {
    setDeleteModalOpen(false);
  };

  const handleCooperativeUpdate = (updatedCoop) => {
    const coops = coops;
    const updatedCoopList = coops.map((coop) => {
      if (coop.id === updatedCoop.id) {
        return updatedCoop;
      }
      return coop;
    });
    setAllCooperatives((prevState) => ({
      ...prevState,
      cooperatives: updatedCoopList,
    }));
  };

  const handleCoopAdd = async (newCoop) => {
    try {
      const response = await axios.post(
        'https://s3.syntradeveloper.be/bisurularavel/api/cooperatives/',
        newCoop,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const addedCoop = response.data;

      setAllCooperatives((prevState) => ({
        ...prevState,
        coops: [...prevState.coops, addedCoop],
      }));


   } catch (error) {
      console.error('Request Error:', error);
    }
  };

  const handleModalSubmit = async (data) => {
    if (data == 'OK') {
      try {
        const response = await axios.get(
          `https://s3.syntradeveloper.be/bisurularavel/api/cooperatives`,
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
    } else {
      console.error(data);
    }
    closeModal();
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex">
          <h1
            style={{
              color: 'white',
              textShadow: ' 1px 3px 5px #f1f1f1',
              fontSize: '32px',
            }}
          >
            Cooperatives Control
          </h1>
        </div>
        <Button
          style={{
            boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
            backgroundColor: '#DEE2FF',
            border: '0px',
            color: 'black',
          }}
          variant="primary"
          onClick={handleAddCoopClick}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#afa99f';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#DEE2FF';
            e.target.style.color = 'black';
          }}
        >
          Add Cooperative
        </Button>
      </div>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '15vh',
            color: 'white',
          }}
        >
          <Spinner animation="border" size="xxl" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Field</th>
              <th>Founded</th>
              <th>License Number</th>
              <th>Status</th>
              <th>Update / Delete</th>
            </tr>
          </thead>
          <tbody>
            {allCooperatives.map((cooperative) => (
              <React.Fragment key={cooperative.id}>
                <tr>
                  <td>{cooperative.id}</td>
                  <td>{cooperative.name}</td>
                  <td>{cooperative.address}</td>
                  <td>{cooperative.field}</td>
                  <td>{cooperative.founded}</td>
                  <td>{cooperative.licenseNo}</td>
                  <td>{cooperative.status ? 'Active' : 'Inactive'}</td>
                  <td className="d-flex gap-2">
                    <Button
                      style={{
                        boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
                        backgroundColor: '#DEE2FF',
                        border: '0px',
                        color: 'black',
                      }}
                      onClick={() => handleUpdateCoopClick(cooperative)}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#afa99f';
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#DEE2FF';
                        e.target.style.color = 'black';
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      style={{
                        boxShadow: '5px 3px 2px 0px rgba(130, 106, 106, 0.75)',
                        backgroundColor: '#DEE2FF',
                        border: '0px',
                        color: 'orangered',
                      }}
                      onClick={() => handleDeleteCoopClick(cooperative.id)}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'orangered';
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#DEE2FF';
                        e.target.style.color = 'orangered';
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      )}
      {isUpdateModalOpen && (
        <UpdateCooperative
          coop={selectedCooperative}
          onClose={() => setUpdateModalOpen(false)}
          onSubmit={handleModalSubmit}
          onCoopStaffUpdate={handleCooperativeUpdate}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteCooperative
          onSubmit={handleModalSubmit}
          coop={selectedCooperative}
          onClose={closeModal}
        />
      )}
      {isAddCoopModalOpen && (
        <AddCooperative
          onSubmit={handleModalSubmit}
          // adminID={admin.id}
          coop={selectedCooperative}
          onClose={() => setAddCoopModalOpen(false)}
          onCoopAdd={handleCoopAdd}
        />
      )}
    </div>
  );
};

export default AdminCoopControl;
