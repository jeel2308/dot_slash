import React from "react";
import { Card } from "react-bootstrap";
import "./../styles/PatientGrid.scss";

function DoctorGrid() {
  return (
    <div className="card-canvas">
      <Card border="primary" style={{ width: "18rem" }} className="card-node">
        <Card.Header>Mr.Node MCU</Card.Header>
        <Card.Body>
          <Card.Title>Doctor:</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DoctorGrid;
