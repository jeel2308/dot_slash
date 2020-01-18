import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Homepage from "../components/Homepage";
import DoctorForm from "../components/DoctorForm";

function RouterPage() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/doctor-form" exact>
          <DoctorForm />
        </Route>
      </Switch>
    </div>
  );
}

export default RouterPage;
