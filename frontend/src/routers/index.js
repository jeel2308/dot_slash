import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Homepage from "../components/Homepage";

function RouterPage() {
  return (
    <div>
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
