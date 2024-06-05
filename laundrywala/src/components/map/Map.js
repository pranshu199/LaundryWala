import React from "react";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";

const Map = () => {
  return (
    <>
      <section className="mb-5 py-5" id="google_map">
        <Container>
          <div className="d-flex justify-content-center mt-5">
            <h2 className="text-title head-title">Google Map</h2>
          </div>
          <Row>
            <Col md={4} className="d-flex justify-content-center mt-4">
              <Card style={{ width: "20rem" }}>
                <iframe
                  title="Toronto"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184552.30943582457!2d-79.37805805!3d43.7182412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON!5e0!3m2!1sen!2sca!4v1717610045682!5m2!1sen!2sca"
                ></iframe>
                <CardBody>
                  <CardTitle tag="h5" className="text-danger">
                    Toronto
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
            <Col md={4} className="d-flex justify-content-center mt-4">
              <Card style={{ width: "20rem" }}>
                <iframe
                  title="Jamal khan"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d369971.4063488845!2d-79.82399077680226!3d43.57735041162244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b469fe76b05b7%3A0x3146cbed75966db!2sMississauga%2C%20ON!5e0!3m2!1sen!2sca!4v1717610163912!5m2!1sen!2sca"
                ></iframe>
                <CardBody>
                  <CardTitle tag="h5" className="text-danger">
                    Missisauga
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
            <Col md={4} className="d-flex justify-content-center mt-4">
              <Card style={{ width: "20rem" }}>
                <iframe
                  title="Missisauga"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91351.2441772107!2d-78.41067043203907!3d44.3155752611426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d58c91b5103a57%3A0x5037b28c72318e0!2sPeterborough%2C%20ON!5e0!3m2!1sen!2sca!4v1717610231640!5m2!1sen!2sca"
                  ></iframe>
                <CardBody>
                  <CardTitle tag="h5" className="text-danger">
                    Peterborough Branch
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
            <Col md={4} className="d-flex justify-content-center mt-4">
              <Card style={{ width: "20rem" }}>
                <iframe
                  title="Sudbury"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d702000.95401346!2d-81.73850321460203!3d46.58345693145158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d2eff36c6f132ed%3A0x668dd5b8879c8cf8!2sGreater%20Sudbury%2C%20ON!5e0!3m2!1sen!2sca!4v1717610398599!5m2!1sen!2sca"
                ></iframe>
                <CardBody>
                  <CardTitle tag="h5" className="text-danger">
                    Sudbury
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
            <Col md={4} className="d-flex justify-content-center mt-4">
              <Card style={{ width: "20rem" }}>
                <iframe
                  title="Ottawa"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d359536.9779464712!2d-76.1298984045457!3d45.25016591564447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce05b25f5113af%3A0x8a6a51e131dd15ed!2sOttawa%2C%20ON!5e0!3m2!1sen!2sca!4v1717610334319!5m2!1sen!2sca"
                ></iframe>
                <CardBody>
                  <CardTitle tag="h5" className="text-danger">
                    Ottawa 
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Map;
