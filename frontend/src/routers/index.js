import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

function RouterPage() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" exact></Route>
      </Switch>
    </div>
  );
}

export default RouterPage;
