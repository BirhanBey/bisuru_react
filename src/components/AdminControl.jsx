import { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import UpdateAdmin from './Admin/UpdateAdmin';
import DeleteAdmin from './Admin/DeleteAdmin';
import AddAdmin from './Admin/AddAdmin';
import SetUserType from './Admin/SetUserType';
import SetAuthArea from './Admin/SetAuthArea';
import AdminCoopController from './Admin/AdminCoopController';

const AdminControl = () => {
  const [allAdmins, setAllAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const [isAuthAreaModalOpen, setAuthAreaModalOpen] = useState(false);
  const [isSetUserTypeModalOpen, setSetUserTypeModalOpen] = useState(false);
  const [isCooperativeVisible, setCooperativeVisible] = useState(false); // Add state for cooperative visibility

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  let token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://s3.syntradeveloper.be/bisurularavel/api/admins'
        );
        setAllAdmins(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Request Error:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateClick = (admin) => {
    setSelectedAdmin(admin);
    setUpdateModalOpen(true);
  };

  const handleDeleteClick = (admin) => {
    setSelectedAdmin(admin);
    setDeleteModalOpen(true);
  };

  const handleAddClick = () => {
    setAddAdminModalOpen(true);
  };

  const handleSetUserTypeClick = (admin) => {
    setSelectedAdmin(admin);
    setSetUserTypeModalOpen(true);
  };

  const handleSetAuthAreaClick = (area) => {
    setSelectedAdmin(area);
    setAuthAreaModalOpen(true);
  };

  const closeModal = () => {
    setDeleteModalOpen(false);
  };

  const handleAdminUpdate = (updatedAdmin) => {
    const admins = admins;
    const updatedAdminsList = admins.map((admin) => {
      if (admin.id === updatedAdmin.id) {
        return updatedAdmin;
      }
      return admin;
    });
    setAllAdmins((prevState) => ({
      ...prevState,
      admins: updatedAdminsList,
    }));
  };
  const handleAdminAdd = async (newAdmin) => {
    try {
      const response = await axios.post(
        'https://s3.syntradeveloper.be/bisurularavel/api/admins/',
        newAdmin,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const addedAdmin = response.data;

      setAllAdmins((prevState) => ({
        ...prevState,
        admins: [...prevState.admins, addedAdmin],
      }));

      // onClose();
    } catch (error) {
      console.error('Request Error:', error);
    }
  };

  const handleModalSubmit = async (data) => {
    if (data == 'OK') {
      try {
        const response = await axios.get(
          `https://s3.syntradeveloper.be/bisurularavel/api/admins`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllAdmins(response.data);
      } catch (error) {
        console.error('Request Error:', error);
      }
    } else {
      console.error(data);
    }
    closeModal();
  };

  const handleCooperativeToggle = () => {
    setCooperativeVisible((prevState) => !prevState);
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2
          style={{
            color: 'white',
            textShadow: '1px 3px 0 #969696, 1px 5px 5px #f1f1f1',
          }}
        >
          Admin Panel
        </h2>
        <Button
          variant="primary"
          onClick={handleAddClick}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#afa99f';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#DEE2FF';
            e.target.style.color = 'black';
          }}
          style={{
            boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
            backgroundColor: '#DEE2FF',
            border: '0px',
            color: 'black',
          }}
        >
          Add Admin
        </Button>
      </div>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
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
              <th>Name</th>
              <th>Surname</th>
              <th>E-mail</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Image</th>
              <th>Title</th>
              <th>Authorization Area</th>
              <th>Update / Delete</th>
            </tr>
          </thead>
          <tbody>
            {allAdmins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.surname}</td>
                <td>{admin.email}</td>
                <td>{admin.phone_number}</td>
                <td>{admin.status}</td>
                <td>{admin.image}</td>
                <td>
                  {!admin.roles[0] ? (
                    <Button
                      style={{
                        width: '130px',
                        boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
                        backgroundColor: '#DEE2FF',
                        border: '0px',
                        color: 'black',
                      }}
                      onClick={() => handleSetUserTypeClick(admin)}
                    >
                      Set User Type
                    </Button>
                  ) : admin.roles.length > 0 ? (
                    admin.roles[0].title
                  ) : (
                    ''
                  )}
                </td>
                <td>
                  <Button
                    style={{
                      width: '130px',
                      boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
                      backgroundColor: '#DEE2FF',
                      border: '0px',
                      color: 'black',
                    }}
                    onClick={() => handleSetAuthAreaClick(admin)}
                  >
                    Set Auth Area
                  </Button>
                  {/* {!admin.roles[0] ? (
                  <Button
                    style={{ width: '130px' }}
                    onClick={() => handleSetAuthAreaClick(admin)}
                  >
                    Set Auth Area
                  </Button>
                ) : (
                  ''
                )} */}
                </td>
                <td className="d-flex gap-2">
                  <Button
                    style={{
                      boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
                      backgroundColor: '#DEE2FF',
                      border: '0px',
                      color: 'black',
                    }}
                    onClick={() => handleUpdateClick(admin)}
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
                      boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
                      backgroundColor: '#DEE2FF',
                      border: '0px',
                      color: 'orangered',
                    }}
                    onClick={() => handleDeleteClick(admin.id)}
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
            ))}
          </tbody>
        </Table>
      )}
      <hr className="mt-5" />

      <div className="d-flex justify-content-between mb-3">
        <Button
          className="ms-auto me-auto"
          onClick={handleCooperativeToggle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#afa99f';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#072c7c';
          }}
          style={{
            boxShadow: '5px 5px 2px 0px rgba(130, 106, 106, 0.75)',
            backgroundColor: '#072c7c',
            border: '0px',
            color: 'white',
          }}
        >
          {isCooperativeVisible ? 'Hide Cooperatives' : 'Show Cooperatives'}
        </Button>
      </div>

      {isUpdateModalOpen && (
        <UpdateAdmin
          admin={selectedAdmin}
          onClose={() => setUpdateModalOpen(false)}
          onSubmit={handleModalSubmit}
          onCoopStaffUpdate={handleAdminUpdate}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteAdmin
          onSubmit={handleModalSubmit}
          admin={selectedAdmin}
          onClose={closeModal}
        />
      )}
      {isAddAdminModalOpen && (
        <AddAdmin
          onSubmit={handleModalSubmit}
          // adminID={admin.id}
          admin={selectedAdmin}
          onClose={() => setAddAdminModalOpen(false)}
          onCoopStaffAdd={handleAdminAdd}
        />
      )}
      {isSetUserTypeModalOpen && (
        <SetUserType
          onSubmit={handleModalSubmit}
          // adminID={admin.id}
          admin={selectedAdmin}
          onClose={() => setSetUserTypeModalOpen(false)}
          onCoopStaffAdd={handleAdminAdd}
        />
      )}
      {isAuthAreaModalOpen && (
        <SetAuthArea
          onSubmit={handleModalSubmit}
          // adminID={admin.id}
          admin={selectedAdmin}
          onClose={() => setAuthAreaModalOpen(false)}
          onCoopStaffAdd={handleAdminAdd}
        />
      )}
      {isCooperativeVisible && <AdminCoopController />}
    </div>
  );
};

export default AdminControl;
