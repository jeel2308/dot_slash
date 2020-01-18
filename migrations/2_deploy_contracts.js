const Doctors = artifacts.require("DoctorManagement");
const Patients = artifacts.require("PatientManagement");
const SafeMath = artifacts.require("SafeMath");
const Main = artifacts.require("MedicalReport");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, Doctors);
  deployer.deploy(Doctors);
  deployer.link(SafeMath, Patients);
  deployer.deploy(Patients);
  deployer.link(Doctors, Main);
  deployer.link(Patients, Main);
  deployer.deploy(Main);
};
