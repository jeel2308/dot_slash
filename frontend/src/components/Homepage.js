import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
const Homepage = () => (
  <Jumbotron>
    <Container>
      <h1>Some Text</h1>
      <h3>Some description</h3>
      <Button>I am a Patient</Button>
      <Button>I am a Doctor</Button>
    </Container>
  </Jumbotron>
);

export default Homepage;
