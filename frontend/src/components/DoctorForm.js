import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/DoctorForm.scss";
import { Container } from "react-bootstrap";

import Web3 from "web3";

import DoctorManagement from "../abis/DoctorManagement.json";
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
  const networkData = DoctorManagement.networks[networkID];
  if (networkData) {
    var DoctorContract = new web3.eth.Contract(
      DoctorManagement.abi,
      networkData.address
    );
  }
  return {
    DoctorContract,
    accounts
  };
})().then(val => {
  contract = val;
});

const SignUp = ({ errors, touched, handleSubmit, isSubmitting, values }) => (
  <Container className="form" style={{ fontSize: "11px" }}>
    <Form onSubmit={handleSubmit} className="login-form">
      <h3 style={{ textAlign: "center", margin: "1.5rem", fontSize: "3rem" }}>
        Doctor Registration
      </h3>
      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="dname" className="form__label">
            Doctor Name
          </label>
          <Field
            type="id"
            name="dname"
            placeholder="Doctor Name"
            className="form__input"
          />
          {touched.dname && errors.dname && (
            <div className="form__error">{errors.dname}</div>
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
          <label htmlFor="specialization" className="form__label">
            Specialization
          </label>
          <Field
            type="text"
            name="specialization"
            placeholder="Specialization"
            className="form__input"
          />
          {touched.specialization && errors.specialization && (
            <div className="form__error">{errors.specialization}</div>
          )}
        </div>
        <div className="form__wrapper">
          <label htmlFor="experience_yrs" className="form__label">
            Experience Years
          </label>
          <Field
            type="text"
            name="experience_yrs"
            placeholder="Experience Years"
            className="form__input"
          />
          {touched.experience_yrs && errors.experience_yrs && (
            <div className="form__error">{errors.experience_yrs}</div>
          )}
        </div>
      </div>

      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="fee" className="form__label">
            Fee
          </label>
          <Field
            type="text"
            name="fee"
            placeholder="Fee"
            className="form__input"
          />
          {touched.fee && errors.fee && (
            <div className="form__error">{errors.fee}</div>
          )}
        </div>
        <div className="form__wrapper">
          <label htmlFor="recurring_fee" className="form__label">
            Recurring Fee
          </label>
          <Field
            type="text"
            name="r_fee"
            placeholder=" Recurring Fee"
            className="form__input"
          />
          {touched.r_fee && errors.r_fee && (
            <div className="form__error">{errors.r_fee}</div>
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

const FormikEnhance = withFormik({
  mapPropsToValues: ({
    dname,
    phone,
    email,
    experience_yrs,
    specialization,
    fee,
    r_fee
  }) => {
    return {
      dname: dname || "",
      phone: phone || "",
      email: email || "",
      experience_yrs: experience_yrs || "",
      specialization: specialization || "",
      fee: fee || "",
      r_fee: r_fee || ""
    };
  },
  validationSchema: Yup.object().shape({
    dname: Yup.string().required("Name is required."),
    phone: Yup.string().required("Phone is required."),
    email: Yup.string()
      .required("Email is required.")
      .email("Email has to be valide."),
    experience_yrs: Yup.number().required("Experience Year is required."),
    specialization: Yup.string().required("Enter your specialization field."),
    fee: Yup.number()
      .required("It is required.")
      .positive("It has to be positive"),
    r_fee: Yup.number()
      .required("It is required.")
      .positive("It has to be positive")
  }),
  handleSubmit: (
    values,
    { resetForm, setSubmitting, setErrors, ...formikBag }
  ) => {
    // formikBag.props.registerUser(values, formikBag.props.history);
    console.log(values);
    const {
      dname,
      phone,
      email,
      experience_yrs,
      specialization,
      fee,
      r_fee
    } = values;
    contract.DoctorContract.methods
      .add_doc(
        dname,
        phone,
        email,
        specialization,
        experience_yrs,
        6,
        fee,
        r_fee
      )
      .send({ from: contract.accounts })
      .then(receipt => {
        console.log("done");
      })
      .catch(e => {
        console.log(e);
      });
    resetForm();
    setSubmitting(false);
  }
})(SignUp);

export default FormikEnhance;
