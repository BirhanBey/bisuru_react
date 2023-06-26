import PropTypes from 'prop-types';
import { Table, Modal } from 'react-bootstrap';

const AnimalDetail = ({ cooperative, onClose }) => {
  const farmStaffData = cooperative.farmers;

  return (
    <Modal className="p-0" show={true} onHide={onClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>{cooperative.name} Staff Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <h2 className="ms-5"> Animals Detail</h2>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Farm id</th>
              <th>Earing Number</th>
              <th>Date of Birth</th>
              <th>Date of Last Birth Giving</th>
              <th>Number of Births</th>
              <th>Lactaion Status</th>
            </tr>
          </thead>
          <tbody>
            {farmStaffData.map((farmer) =>
              farmer.farms.map((animals) =>
                animals.animals.map((animal) => (
                  <tr id={animal.id} key={animal.id}>
                    <td>{animal.id}</td>
                    <td>{animal.farms_id}</td>
                    <td>{animal.earing_number}</td>
                    <td>{animal.dateOfBirth}</td>
                    <td>{animal.dateOfLastBirthGiving}</td>
                    <td>{animal.birthNummber}</td>
                    <td>{animal.lactaionStatus}</td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>{/* Footer içeriği */}</Modal.Footer>
    </Modal>
  );
};

AnimalDetail.propTypes = {
  cooperative: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AnimalDetail;
