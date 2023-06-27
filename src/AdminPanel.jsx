import './App.css';
import { useState } from 'react';
import LogoutModal from './components/LogoutModal';
import { Navbar, Nav, Container } from 'react-bootstrap';
import CooperativesControl from './components/CooperativesControl';
import AdminControl from './components/AdminControl';
import FarmerController from './components/FarmerController';
import FarmController from './components/FarmController';
import FarmStaffController from './components/FarmStaffController';
import CoopStaffControl from './components/CoopStaffControl';
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
    <div className="main-panel">
      <Navbar className="d-flex w-100 rounded p-3 top-bar">
        <div className="d-flex w-100 inner-top-bar">
          <Navbar.Brand
            className="ms-4"
            style={{
              backgroundColor: '#cbc0d3',
              fontSize: '30px',
              color: 'white',
              textShadow: ' 1px 5px 5px #f1f1f1',
            }}
          >
            BiSuru Admin Panel
          </Navbar.Brand>
          <p
            className="w-100 ms-auto me-auto mt-2"
            style={{ backgroundColor: '#cbc0d3' }}
          >
            <b style={{ backgroundColor: '#cbc0d3' }}> Welcome </b>{' '}
            <i style={{ backgroundColor: '#cbc0d3' }}> {userInfo} </i>
          </p>
          <LogoutModal token={token} />
        </div>
      </Navbar>

      <Container className="m-0 w-100 d-flex flex-row gap-4">
        <div className="d-flex flex-row gap-4">
          <div className="sidebar">
            <Nav className="flex-column p-4 rounded mt-4 side-bar">
              <Nav.Link
                className="mt-4 nav-item"
                active={activePage === 'admin'}
                onClick={() => handlePageChange('admin')}
                style={{
                  fontSize: '18px',
                  color: 'white',
                  textShadow: '1px 3px 0 #969696',
                }}
              >
                Admin
              </Nav.Link>
              <Nav.Link
                active={activePage === 'cooperatives'}
                onClick={() => handlePageChange('cooperatives')}
                style={{
                  fontSize: '18px',
                  color: 'white',
                  textShadow: '1px 3px 0 #969696',
                }}
              >
                Cooperatives
              </Nav.Link>
              <Nav.Link
                active={activePage === 'cooperativesstaff'}
                onClick={() => handlePageChange('cooperativesstaff')}
                style={{
                  fontSize: '18px',
                  color: 'white',
                  textShadow: '1px 3px 0 #969696',
                }}
              >
                Cooperatives Staff
              </Nav.Link>
              <Nav.Link
                active={activePage === 'farmers'}
                onClick={() => handlePageChange('farmers')}
                style={{
                  fontSize: '18px',
                  color: 'white',
                  textShadow: '1px 3px 0 #969696',
                }}
              >
                Farmers
              </Nav.Link>
              <Nav.Link
                active={activePage === 'farms'}
                onClick={() => handlePageChange('farms')}
                style={{
                  fontSize: '18px',
                  color: 'white',
                  textShadow: '1px 3px 0 #969696',
                }}
              >
                Farms
              </Nav.Link>
              <Nav.Link
                active={activePage === 'farmsstaff'}
                onClick={() => handlePageChange('farmsstaff')}
                style={{
                  fontSize: '18px',
                  color: 'white',
                  textShadow: '1px 3px 0 #969696',
                }}
              >
                Farms Staff
              </Nav.Link>
              <Nav.Link
                className="mb-5"
                active={activePage === 'animals'}
                onClick={() => handlePageChange('animals')}
                style={{
                  fontSize: '18px',
                  color: 'white',
                  textShadow: '1px 3px 0 #969696',
                }}
              >
                Animals
              </Nav.Link>
            </Nav>
          </div>
          <div className="content ms-2 w-100 mt-4">
            {userInfo === 'SuperUser' && activePage === 'admin' && (
              <AdminControl />
            )}

            {(userInfo === 'Cooperative' || userInfo === 'SuperUser') &&
              activePage === 'cooperatives' && <CooperativesControl />}

            {(userInfo === 'CooperativeStaff' ||
              userInfo === 'Cooperative' ||
              userInfo === 'SuperUser') &&
              activePage === 'cooperativesstaff' && <CoopStaffControl />}

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
