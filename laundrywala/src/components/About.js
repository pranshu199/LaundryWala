import React from "react";
import { Col, Container, Row } from "reactstrap";
const About = () => {
  return (
    <section id="about-us">
      <Container>
        <div className="d-flex justify-content-center mb-4">
          <h2 className="text-title head-title mt-5">About Us</h2>
        </div>
        <Row className="mt-5">
          <Col md={6} className="d-flex justify-content-center">
            {/* <h2 className="mx-4 my-4 ab">LAUNDRYWALA</h2> */}
            <img src={"/img/about.jpg"} alt="" />
          </Col>
          <Col md={6}>
            <p className="text-justify mb-5">
              LaundryWala is an Online Laundry Platform with the latest
              technology in washing, dry cleaning and laundry. Our services
              combine our expertise and experience acquired over a period of
              time to provide you with clean laundry in the shortest possible
              turnaround time. It has partnered up with the top laundry experts
              of the country and provides you with a free Pick-up and Delivery
              for your dirty laundry. With our Website, Mobile App or Hotline
              Number, you can just schedule an order and we will take it from
              there!
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
