import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Homepage from "../components/Homepage";
import DoctorForm from "../components/DoctorForm";
import PatientForm from "../components/PatientForm";
import HospitalForm from "../components/HostpitalForm";
import "../styles/body.scss";
import PatientData from "../components/PatientData";
import PatientGrid from "../components/PatientGrid";
import DoctorGrid from "../components/DoctorGrid";

function RouterPage() {
  return (
    <div className="body">
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/doctor" exact>
          <DoctorForm />
        </Route>
        <Route path="/patient" exact>
          <PatientForm />
        </Route>
        <Route path="/hospital" exact>
          <HospitalForm />
        </Route>
        <Route path="/patient-data" exact>
          <PatientData />
        </Route>
        <Route path="/patient-view" exact>
          <PatientGrid />
        </Route>
        <Route path="/doctor-view" exact>
          <DoctorGrid />
        </Route>
      </Switch>
    </div>
  );
}

export default RouterPage;
