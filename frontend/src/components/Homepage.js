import React from "react";
// import Jumbotron from "react-bootstrap/Jumbotron";
// import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
import "../styles/Homepage.scss";
class Homepage extends React.Component {
  handleClick = event => {
    console.log("do something");
  };
  render() {
    return (
      <>
        <div className="container-fluid homepage">
          <h1>Some Text</h1>
          <h3>Some description</h3>
        </div>
        <div className="option">
          <div className="container option__div">
            <h2>Some text</h2>
            <Button className="container__button" onClick={this.handleClick}>
              I am a Patient
            </Button>
          </div>
          <div className="container option__div">
            <h2>Some text</h2>
            <Button className="container__button" onClick={this.handleClick}>
              I am a Doctor
            </Button>
          </div>
        </div>
      </>
    );
  }
}
export default Homepage;
