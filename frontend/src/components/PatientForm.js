import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/DoctorForm.scss";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Web3 from "web3";

import PatientManagement from "../abis/PatientManagement.json";
let contract;
(async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    alert("no ethereum browser detected");
    return;
  }
  const web3 = window.web3;

  var accounts = await web3.eth.getAccounts();
  accounts = accounts[0];

  const networkID = await web3.eth.net.getId();
  const networkData = PatientManagement.networks[networkID];
  if (networkData) {
    var patientContract = new web3.eth.Contract(
      PatientManagement.abi,
      networkData.address
    );
  }
  return {
    patientContract,
    accounts
  };
})().then(val => {
  contract = val;
});

const SignUp = ({ errors, touched, handleSubmit, isSubmitting, values }) => (
  <Container className="form" style={{ fontSize: "11px" }}>
    <Form onSubmit={handleSubmit} className="login-form">
      <h3 style={{ textAlign: "center", margin: "1.5rem", fontSize: "3rem" }}>
        Patient Registration
      </h3>
      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="pname" className="form__label">
            Patient Name
          </label>
          <Field
            type="id"
            name="pname"
            placeholder="Patient Name"
            className="form__input"
          />
          {touched.pname && errors.pname && (
            <div className="form__error">{errors.pname}</div>
          )}
        </div>
      </div>

      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="phone" className="form__label">
            Phone Number
          </label>
          <Field
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="form__input"
          />
          {touched.phone && errors.phone && (
            <div className="form__error">{errors.phone}</div>
          )}
        </div>
        <div className="form__wrapper">
          <label htmlFor="email" className="form__label">
            Email
          </label>
          <Field
            type="text"
            name="email"
            placeholder="Email"
            className="form__input"
          />
          {touched.email && errors.email && (
            <div className="form__error">{errors.email}</div>
          )}
        </div>
      </div>

      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="dob" className="form__label">
            Date of Birth
          </label>
          <Field
            type="date"
            name="dob"
            placeholder="dob"
            className="form__input"
          />
          {touched.dob && errors.dob && (
            <div className="form__error">{errors.dob}</div>
          )}
        </div>

        {/** add select button for gender */}
        <div className="form__wrapper">
          <label htmlFor="gender" className="form__label">
            Gender
          </label>
          <Field
            name="gender"
            as="select"
            className="form__input"
            value={values.gender}
          >
            <option value="" label="Select a complaint type" />
            <option value="Male" label="Male" />
            <option value="Female" label="Female" />
            <option value="Other" label="Other" />
          </Field>
          {errors.gender && touched.gender && (
            <div className="form__error">{errors.gender}</div>
          )}
        </div>
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="login-form__submit"
      >
        Register
      </button>
    </Form>
  </Container>
);

const FormikEnhance = withRouter(
  withFormik({
    mapPropsToValues: ({ pname, phone, email, gender, dob }) => {
      return {
        pname: pname || "",
        phone: phone || "",
        email: email || "",
        gender: gender || "",
        dob: dob || ""
      };
    },
    validationSchema: Yup.object().shape({
      pname: Yup.string().required("Name is required."),
      phone: Yup.string().required("Phone is required."),
      email: Yup.string()
        .required("Email is required.")
        .email("Email has to be valide."),
      gender: Yup.string().required("Enter your gender."),
      dob: Yup.string().required("Date of Birth is required.")
    }),
    handleSubmit: (
      values,
      { resetForm, setSubmitting, setErrors, ...formikBag }
    ) => {
      // formikBag.props.registerUser(values, formikBag.props.history);

      const { dob, pname, gender, email, phone } = values;
      //console.log(typeof dob);
      contract.patientContract.methods
        .add_patient(
          "kjnjdngvkrdngv",
          pname,
          phone,
          email,
          new Date().getTime(),
          gender
        )
        .send({ from: contract.accounts })
        .on("receipt", () => {
          console.log("done");
        });
      resetForm();
      setSubmitting(false);
      formikBag.props.history.push("/patient-data");
    }
  })(SignUp)
);

export default FormikEnhance;
