import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import UpdateAdmin from './Admin/UpdateAdmin';
import DeleteAdmin from './Admin/DeleteAdmin';
import AddAdmin from './Admin/AddAdmin';
import SetUserType from './Admin/SetUserType';
import SetAuthArea from './Admin/SetAuthArea';

const AdminControl = () => {
  const [allAdmins, setAllAdmins] = useState([]);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const [isAuthAreaModalOpen, setAuthAreaModalOpen] = useState(false);
  const [isSetUserTypeModalOpen, setSetUserTypeModalOpen] = useState(false);
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
      } catch (error) {
        console.error('Request Error:', error);
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

  const handleCoopStaffUpdate = (updatedAdmin) => {
    const admins = admins;
    const updatedCoopStaffList = admins.map((admin) => {
      if (admin.id === updatedAdmin.id) {
        return updatedAdmin;
      }
      return admin;
    });
    setAllAdmins((prevState) => ({
      ...prevState,
      cooperative_staffs: updatedCoopStaffList,
    }));
  };
  const handleCoopStaffAdd = async (newAdmin) => {
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

      const addedCoopStaff = response.data;

      setAllAdmins((prevState) => ({
        ...prevState,
        admins: [...prevState.admins, addedCoopStaff],
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
                  onClick={() => handleDeleteClick(admin.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isUpdateModalOpen && (
        <UpdateAdmin
          admin={selectedAdmin}
          onClose={() => setUpdateModalOpen(false)}
          onSubmit={handleModalSubmit}
          onCoopStaffUpdate={handleCoopStaffUpdate}
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
          onCoopStaffAdd={handleCoopStaffAdd}
        />
      )}
      {isSetUserTypeModalOpen && (
        <SetUserType
          onSubmit={handleModalSubmit}
          // adminID={admin.id}
          admin={selectedAdmin}
          onClose={() => setSetUserTypeModalOpen(false)}
          onCoopStaffAdd={handleCoopStaffAdd}
        />
      )}
      {isAuthAreaModalOpen && (
        <SetAuthArea
          onSubmit={handleModalSubmit}
          // adminID={admin.id}
          admin={selectedAdmin}
          onClose={() => setAuthAreaModalOpen(false)}
          onCoopStaffAdd={handleCoopStaffAdd}
        />
      )}
    </div>
  );
};

export default AdminControl;
