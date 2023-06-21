import './App.css';
import { useState } from 'react';
import LogoutModal from './components/LogoutModal';
import { Navbar, Nav, Container } from 'react-bootstrap';
import CooperativesControl from './components/CooperativesControl';
import AdminControl from './components/AdminControl';
import FarmerController from './components/Cooperatives/FarmersREQ/FarmerController';
import FarmController from './components/Cooperatives/FarmsREQ/FarmController';
import FarmStaffController from './components/Cooperatives/FarmStaffREQ/FarmStaffController';
import CoopStaffController from './components/Cooperatives/CoopStaffREQ/CoopStaffController';
import AnimalController from './components/AnimalController';

function AdminPanel() {
  const userInfo = localStorage.getItem('userInfo');
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('userData');
  console.log(userInfo);
  console.log(userData);
  const [activePage, setActivePage] = useState(userInfo);

  const handlePageChange = (pageName) => {
    setActivePage(pageName);
  };

  return (
    <div>
      <Navbar className="d-flex w-100" bg="light">
        <div className="d-flex w-100">
          <Navbar.Brand>BiSuru Admin Panel</Navbar.Brand>
          <p className="w-100 ms-auto me-auto">
            <b> Welcome </b> <i> {userInfo} </i>
          </p>
          <LogoutModal token={token} />
        </div>
      </Navbar>
      <Container className="">
        <div className="d-flex flex-row gap-4">
          <div className="sidebar w-25">
            <Nav className="flex-column bg-light mt-2">
              <Nav.Link
                active={activePage === 'admin'}
                onClick={() => handlePageChange('admin')}
              >
                Admin
              </Nav.Link>
              <Nav.Link
                active={activePage === 'cooperatives'}
                onClick={() => handlePageChange('cooperatives')}
              >
                Cooperatives
              </Nav.Link>
              <Nav.Link
                active={activePage === 'cooperativesstaff'}
                onClick={() => handlePageChange('cooperativesstaff')}
              >
                Cooperatives Staff
              </Nav.Link>
              <Nav.Link
                active={activePage === 'farmers'}
                onClick={() => handlePageChange('farmers')}
              >
                Farmers
              </Nav.Link>
              <Nav.Link
                active={activePage === 'farms'}
                onClick={() => handlePageChange('farms')}
              >
                Farms
              </Nav.Link>
              <Nav.Link
                active={activePage === 'farmsstaff'}
                onClick={() => handlePageChange('farmsstaff')}
              >
                Farms Staff
              </Nav.Link>
              <Nav.Link
                active={activePage === 'animals'}
                onClick={() => handlePageChange('animals')}
              >
                Animals
              </Nav.Link>
            </Nav>
          </div>
          <div className="content ms-2 w-75">
            {userInfo === 'SuperUser' && activePage === 'admin' && (
              <AdminControl />
            )}

            {(userInfo === 'Cooperative' || userInfo === 'SuperUser') &&
              activePage === 'cooperatives' && <CooperativesControl />}

            {(userInfo === 'CooperativeStaff' ||
              userInfo === 'Cooperative' ||
              userInfo === 'SuperUser') &&
              activePage === 'cooperativesstaff' && <CoopStaffController />}

            {(userInfo === 'CooperativeStaff' ||
              userInfo === 'Farmer' ||
              userInfo === 'Cooperative' ||
              userInfo === 'SuperUser') &&
              activePage === 'farmers' && <FarmerController />}

            {(userInfo === 'CooperativeStaff' ||
              userInfo === 'Farm' ||
              userInfo === 'Farmer' ||
              userInfo === 'Cooperative' ||
              userInfo === 'SuperUser') &&
              activePage === 'farms' && <FarmController />}

            {(userInfo === 'CooperativeStaff' ||
              userInfo === 'FarmStaff' ||
              userInfo === 'Farm' ||
              userInfo === 'Farmer' ||
              userInfo === 'Cooperative' ||
              userInfo === 'SuperUser') &&
              activePage === 'farmsstaff' && <FarmStaffController />}

            {(userInfo === 'CooperativeStaff' ||
              userInfo === 'FarmStaff' ||
              userInfo === 'Farm' ||
              userInfo === 'Farmer' ||
              userInfo === 'Cooperative' ||
              userInfo === 'SuperUser') &&
              activePage === 'animals' && <AnimalController />}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AdminPanel;
