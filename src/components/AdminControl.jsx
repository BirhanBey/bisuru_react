import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const AdminControl = () => {
  const [allAdmins, setAllAdmins] = useState([]);
  console.log(allAdmins);
  let userInfo = localStorage.getItem('userInfo');
  console.log(userInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admins');
        setAllAdmins(response.data);
      } catch (error) {
        console.error('Request Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminControl;
