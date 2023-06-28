import { Image, Card, Spinner } from 'react-bootstrap';
import front from './assets/4.jpg';
import { useState, useEffect } from 'react';

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="mx-5">
      <div className="mp-title-bg d-flex me-auto ms-auto mb-3">
        <h1 className="me-auto ms-auto my-3 mp-title">
          BiSuru Cooperative Management System
        </h1>
      </div>
      <div className="d-flex me-auto ms-auto p-3 img-bg">
        <Image className="my-image me-auto ms-auto my-3" src={front} />
      </div>
      <div className="mp-title-bg mt-4 d-flex flex-row p-4 me-auto ms-auto mb-3">
        <Card
          className="w-100 mt-auto mb-auto"
          style={{ backgroundColor: 'transparent', border: 'none' }}
        >
          <Card.Body className="ms-auto me-auto">
            <Card.Title style={{ color: 'white' }}>
              Contact Information
            </Card.Title>
            <ul style={{ color: 'white' }}>
              <li>
                <strong>Email: </strong>
                <a
                  style={{ textDecoration: 'none' }}
                  href="mailto:birhanyorukoglu@gmail.com"
                >
                  birhanyorukoglu@gmail.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong>
                <a
                  style={{ textDecoration: 'none' }}
                  href="tel:+32-470-87-9022"
                >
                  +32-470-87-9022
                </a>
              </li>
              <li>
                <strong>Address: </strong>
                Gloriantlaan, Antwerpen, BE 2050
              </li>
            </ul>
          </Card.Body>
        </Card>
        {isLoading ? (
          <div
            style={{
              width: '1100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '450px',
              color: 'white',
            }}
          >
            <Spinner animation="border" size="xl" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10900.630472084444!2d4.3922733022716205!3d51.21943483330395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2sus!4v1687970217993!5m2!1str!2sus"
              width="600"
              height="450"
              style={{ border: '0' }}
              allowfullscreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
