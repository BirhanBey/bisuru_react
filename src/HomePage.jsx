import { useState } from 'react';
import { Navbar, Nav, Image, Button } from 'react-bootstrap';
import logo from './assets/1.png';
import Welcome from './Welcome';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import LoginPage from './components/LoginPage';

const HomePage = () => {
  const [activeComponent, setActiveComponent] = useState('welcome');


  const handleNavClick = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    if (activeComponent === 'welcome') {
      return <Welcome />;
    } else if (activeComponent === 'about') {
      return <AboutPage />;
    } else if (activeComponent === 'contact') {
      return <ContactPage />;
    } else if (activeComponent === 'login') {
      return <LoginPage />;
    }
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ minHeight: '100vh', margin: '0px 150px 0px' }}
    >
      <Navbar>
        <Navbar.Brand>
        <Nav.Link onClick={() => handleNavClick('welcome')}>
          <Image className="my-logo" src={logo} alt="Logo" />
              </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="ms-auto me-4">
          <div className="d-flex me-5">
            <Nav.Item>
              <Nav.Link onClick={() => handleNavClick('welcome')}>
                <p className="Nav-item">Home</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => handleNavClick('about')}>
                <p className="Nav-item">About</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => handleNavClick('contact')}>
                <p className="Nav-item">Contact</p>
              </Nav.Link>
            </Nav.Item>
          </div>
          <Nav.Item>
            <Button
              className="btn-login mt-2"
              onClick={() => handleNavClick('login')}
              style={{ backgroundColor: '#afa99f', border: 'none' }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#072c7c')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#afa99f')}
            >
              Login
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar>
      {renderComponent()}
      <footer className="me-auto ms-auto">
        <p>&#169; Birhan 2023</p>
      </footer>
    </div>
  );
};

export default HomePage;
