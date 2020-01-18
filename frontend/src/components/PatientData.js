import React, { Component } from "react";
import { Tab, Row, Col, ListGroup } from "react-bootstrap";
import "../styles/PatientData.scss";

class PatientData extends Component {
  state = {
    date: "18-01-2020",
    disease: "Dengue",
    medicine: "Perasitamol",
    remark: "Nothing",
    doctor: "Dr. Batra"
  };

  //   componentDidMount() {
  //     //fetch the data and display
  //   }

  render() {
    const { date, disease, medicine, remark, doctor } = this.state;
    return (
      <div className="data">
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={4}>
              <ListGroup>
                <ListGroup.Item action href="#link1">
                  Date
                </ListGroup.Item>
                <ListGroup.Item action href="#link2">
                  Disease
                </ListGroup.Item>
                <ListGroup.Item action href="#link3">
                  Medicines
                </ListGroup.Item>
                <ListGroup.Item action href="#link4">
                  Remarks
                </ListGroup.Item>
                <ListGroup.Item action href="#link5">
                  Doctor
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={8} className="info">
              <Tab.Content>
                <Tab.Pane eventKey="#link1">{date}</Tab.Pane>
                <Tab.Pane eventKey="#link2">{disease}</Tab.Pane>
                <Tab.Pane eventKey="#link3">{medicine}</Tab.Pane>
                <Tab.Pane eventKey="#link4">{remark}</Tab.Pane>
                <Tab.Pane eventKey="#link5">{doctor}</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default PatientData;
