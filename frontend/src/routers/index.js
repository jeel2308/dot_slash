import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Homepage from "../components/Homepage";
import "../styles/body.scss";
function RouterPage() {
  return (
    <div className="body">
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
}

export default RouterPage;
