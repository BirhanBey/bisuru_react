import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import UpdateAdmin from './Admin/UpdateAdmin';
import DeleteAdmin from './Admin/DeleteAdmin';
import AddAdmin from './Admin/AddAdmin';
import SetUserType from './Admin/SetUserType';

const AdminControl = () => {
  const [allAdmins, setAllAdmins] = useState([]);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddAdminModalOpen, setAddAdminModalOpen] = useState(false);
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
      <div className='d-flex justify-content-between mb-3'>
        <h1>Admin Panel</h1>
        <Button variant="primary" onClick={handleAddClick}>
          Add Staff
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
              <td>{admin.roles.length > 0 ? admin.roles[0].title : ''}</td>
              <td>
                <Button onClick={() => handleUpdateClick(admin)}>Update</Button>
                <Button onClick={() => handleDeleteClick(admin.id)}>
                  Delete
                </Button>
              </td>
              <td>
                <Button onClick={() => handleSetUserTypeClick(admin)}>Set User Type</Button>
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
    </div>
  );
};

export default AdminControl;
