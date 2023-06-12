import './App.css';
import { useState } from 'react';
import LogoutModal from './components/LogoutModal';
import { Navbar, Nav, Container } from 'react-bootstrap';
import CooperativesControl from './components/CooperativesControl';
import AdminControl from './components/AdminControl';

function AdminPanel() {
  const userInfo = localStorage.getItem('userInfo');
  const token = localStorage.getItem('token');
  console.log(userInfo);
  const [activePage, setActivePage] = useState(userInfo);

  const handlePageChange = (pageName) => {
    setActivePage(pageName);
  };

  return (
    <div>
      <Navbar className="d-flex w-100" bg="light">
        <div className="d-flex w-100">
          <Navbar.Brand>BiSuru Admin Panel</Navbar.Brand>
          <LogoutModal token={token} />
        </div>
      </Navbar>
      <Container>
        <div className="d-flex">
          <div className="sidebar">
            <Nav className="flex-column">
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
            </Nav>
          </div>

          <div className="content">
            {userInfo === 'SuperUser' && activePage === 'admin' && (
              <AdminControl />
            )}
            {(userInfo === 'Cooperative' || userInfo === 'SuperUser') &&
              activePage === 'cooperatives' && <CooperativesControl />}
            {(userInfo === 'Farmer' ||
              userInfo === 'Cooperative' ||
              userInfo === 'SuperUser') &&
              activePage === 'farmers' && <h2>Farmers Page</h2>}
            {activePage === 'farms' && <h2>Farms Page</h2>}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AdminPanel;
