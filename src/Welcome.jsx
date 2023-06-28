import { Image } from 'react-bootstrap';
import front from './assets/4.jpg';

const Welcome = () => {
  return (
    <div className='mx-5'>
      <div className="mp-title-bg d-flex me-auto ms-auto mb-3">
        <h1 className="me-auto ms-auto my-3 mp-title">
          BiSuru Cooperative Management System
        </h1>
      </div>
      <div className="d-flex me-auto ms-auto p-3 img-bg">
        <Image className="my-image me-auto ms-auto my-3" src={front} />
      </div>
      <div className="mp-title-bg mt-4 d-flex flex-column p-4 me-auto ms-auto mb-3">
        <h2 className="text-center body-title">
          Cooperative Management System: Growing with Innovation and
          Collaboration Agriculture of the Future
        </h2>
        <div className="mx-5">
          <p>
            In today`s rapidly changing agricultural sector, innovative and
            collaborative solutions are needed to increase the productivity of
            farms, to bring farmers together strongly and to achieve common
            goals. The Cooperative Management System, developed for this need,
            is preparing to create a revolution in agriculture.
          </p>
          <p>
            The Cooperative Management System offers the opportunity to collect
            and manage information between farmers, farms, cooperative workers
            and animals on a single central platform. This innovative system
            provides the cooperative`s employees and members with the
            convenience of monitoring and managing animal assets and production
            volumes from a single screen.
          </p>
          <p>
            Thanks to the features provided by the system, future projections of
            the amount of products provided from the members of the cooperative
            can be created. In particular, support is provided for the
            improvement of the herds of the farms of the partners with low
            equity capital and insufficient technological support. The system
            provides the cooperative technical personnel with the opportunity to
            monitor the health status of the animals of the partners, increasing
            the chance of intervention by identifying possible problems. In this
            way, the productivity of farms and animal health can be increased
            with early intervention without waiting for events to occur.
          </p>
          <p>
          Cooperative Management System aims to increase the sustainability and competitive advantage of farms by using the power of cooperation in the agricultural sector. This system, which provides great convenience to both farmers and cooperative workers, encourages the use of technology and innovation in agriculture. The Cooperative Management System, which is under development, will be an important tool for the effective management of agricultural activities and increasing productivity. This system, which has stepped into the agriculture of the future, which grows with innovation and cooperation, will help to build a sustainable and successful future in the agricultural sector by strengthening the cooperatives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
