import React from "react";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";

const services = [
  {
    src: require("../images/wash-iron.jpeg"),
    name: "Wash & Iron",
    title:
      "All your regular wear garments will be washed, steam ironed and neatly packed for delivery.",
    link: "/WashAndIron",
  },
  {
    src: require("../images/wash-fold.jpg"),
    name: "Wash & Fold",
    title:
      "Just in case you choose not to use our steam ironing services we will wash and fold them for you.",
    link: "/WashAndFold",
  },
  {
    src: require("../images/iron-fold.jpg"),
    name: "Iron & Fold",
    title:
      "Get back your dirty clothes. Your clothes we will ironed and pressed to look the best for you.",
    link: "/IronAndFold",
  },
  {
    src: require("../images/dry-cleaning.webp"),
    name: "Dry Cleaning",
    title:
      "All your sensitive and special garments will be individually treated for any stains and dry cleaned.",
    link: "/DryCleaning",
  },
  {
    src: require("../images/emergency.jpg"),
    name: "Emergency Service",
    title:
      "You can use our emergency service to receive services easily and quickly in our machines using very safe. ",
    link: "/EmergencyService",
  },
];

const Services = () => {
  return (
    <>
      <section className="pb-5" id="services">
        <Container>
          <div className="d-flex justify-content-center py-3 mt-5">
            <h2 className="text-title head-title">Our Services</h2>
          </div>
          <Row>
            {services.map((service) => (
              <Col
                md={4}
                className="d-flex justify-content-center mt-4"
                key={service.src}
              >
                <Card style={{ width: "20rem" }}>
                  <CardImg className="service-image" src={service.src} top />
                  <CardBody>
                    <CardTitle tag="h3" className="text-danger">
                      {service.name}
                    </CardTitle>
                    <CardText>{service.title}</CardText>

                    <Link to={service.link}>
                      <Button color="primary" className="service-button">
                        <i className="now-ui-icons arrows-1_minimal-right" />
                        <span className="nav-name">Select Service</span>
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Services;
