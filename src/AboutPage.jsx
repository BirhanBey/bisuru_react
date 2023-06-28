import { Image } from 'react-bootstrap';
import front from './assets/4.jpg';

const AboutPage = () => {
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
      <div className="mp-title-bg mt-4 d-flex flex-column p-4  me-auto ms-auto mb-3">
        <h2 className="text-center body-title">
          Cooperative Management System: Growing with Innovation and
          Collaboration Agriculture of the Future
        </h2>
        <div className="mx-5 ">
          <p>
            My name is Birhan Yörükoğlu. In 2018, I graduated from Ege
            University, Department of Agricultural Engineering with a Master`s
            degree. My experience and passion in the agricultural sector led me
            to work as a quality control engineer for a cooperative. This
            cooperative was an organization collaborating with more than 3000
            producer partners.
          </p>
          <p>
            During my four years as a quality control engineer, I worked to
            ensure that all producer partners of the cooperative produce their
            products to the highest quality standards. I regularly visited
            farms, observed production processes and conducted analyzes to
            improve the quality and productivity of agricultural products. In
            addition, I evaluated the compliance of the manufacturers with the
            certification processes and organized trainings when necessary.
          </p>
          <p>
            After my education, I developed my own application to increase the
            use of technology and software in the agricultural sector. This
            application aims to ensure that all information belonging to the
            employees and members of the cooperative can be monitored and
            managed on a single platform. It also aims to help improve the herds
            of low-equity and technologically inadequate members by creating
            future projections of the amount of products procured from the
            cooperative`s members.
          </p>
          <p>
            While creating this project, I personally experienced the needs in
            the agricultural sector and therefore I understand the importance of
            the project very well. My aim is to help farmers make their
            businesses more efficient and sustainable by promoting the use of
            technology in the agricultural sector
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
