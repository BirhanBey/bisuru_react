import './App.css';
import { useState } from 'react';
import LogoutModal from './components/LogoutModal';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import CooperativesControl from './components/CooperativesControl';
import AdminControl from './components/AdminControl';
import FarmerController from './components/FarmerController';
import FarmController from './components/FarmController';
import FarmStaffController from './components/FarmStaffController';
import CoopStaffControl from './components/CoopStaffControl';
import AnimalController from './components/AnimalController';
import logo from './assets/1.png';

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
      <Navbar className="d-flex rounded p-3 top-bar">
        <div className="d-flex w-100 inner-top-bar">
          <Navbar.Brand className="ms-4">
            <Image src={logo} alt="logo" style={{ width: '150px' }} />
          </Navbar.Brand>
          <div
            className="d-flex flex-row ms-auto me-auto mt-1"
            style={{ backgroundColor: '#cbc0d3' }}
          >
            <p
              className="ms-auto me-auto"
              style={{
                backgroundColor: '#cbc0d3',
                fontSize: '25px',
                color: 'white',
                textShadow: ' 1px 5px 5px #f1f1f1',
                whiteSpace: 'nowrap',
              }}
            >
              BiSuru Admin Panel
            </p>
          </div>
          <div className="d-flex mt-2">
            <div className="d-flex">
              <b className="ms-5" style={{ backgroundColor: '#cbc0d3' }}>
                {' '}
                Welcome:{' '}
              </b>{' '}
              <i className="me-3" style={{ backgroundColor: '#cbc0d3' }}>
                {' '}
                {userInfo}{' '}
              </i>
            </div>
            <LogoutModal token={token} />
          </div>
        </div>
      </Navbar>

      <Container className="m-0 w-100 d-flex flex-row gap-4">
        <div className="d-flex flex-row gap-4">
          <div className="sidebar">
            <Nav className="flex-column p-4 rounded mt-4 side-bar gap-2">
              <Nav.Link
                className="mt-4 nav-item"
                active={activePage === 'admin'}
                onClick={() => handlePageChange('admin')}
                style={{
                  fontSize: '18px',
                  color: 'white',
                  textShadow: '1px 1px 0 #969696',
                  borderRadius: '10px',       
                  transition: "0.5s"         
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#DEE2FF';
                  e.target.style.boxShadow = '4px 3px 2px 0px rgba(130, 106, 106, 0.75)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#cbc0d3';
                  e.target.style.boxShadow = 'none';
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
                  textShadow: '1px 1px 0 #969696',
                  borderRadius: '10px',
                  transition: "0.5s"         
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#DEE2FF';
                  e.target.style.boxShadow = '4px 3px 2px 0px rgba(130, 106, 106, 0.75)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#cbc0d3';
                  e.target.style.boxShadow = 'none';
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
                  textShadow: '1px 1px 0 #969696',
                  borderRadius: '10px',                
                  transition: "0.5s"         
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#DEE2FF';
                  e.target.style.boxShadow = '4px 3px 2px 0px rgba(130, 106, 106, 0.75)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#cbc0d3';
                  e.target.style.boxShadow = 'none';
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
                  textShadow: '1px 1px 0 #969696',
                  borderRadius: '10px',                
                  transition: "0.5s"         
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#DEE2FF';
                  e.target.style.boxShadow = '4px 3px 2px 0px rgba(130, 106, 106, 0.75)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#cbc0d3';
                  e.target.style.boxShadow = 'none';
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
                  textShadow: '1px 1px 0 #969696',
                  borderRadius: '10px',                
                  transition: "0.5s"         
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#DEE2FF';
                  e.target.style.boxShadow = '4px 3px 2px 0px rgba(130, 106, 106, 0.75)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#cbc0d3';
                  e.target.style.boxShadow = 'none';
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
                  textShadow: '1px 1px 0 #969696',
                  borderRadius: '10px',                
                  transition: "0.5s"         
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#DEE2FF';
                  e.target.style.boxShadow = '4px 3px 2px 0px rgba(130, 106, 106, 0.75)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#cbc0d3';
                  e.target.style.boxShadow = 'none';
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
                  textShadow: '1px 1px 0 #969696',
                  borderRadius: '10px',                
                  transition: "0.5s"         
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#DEE2FF';
                  e.target.style.boxShadow = '4px 3px 2px 0px rgba(130, 106, 106, 0.75)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#cbc0d3';
                  e.target.style.boxShadow = 'none';
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
