import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/DoctorForm.scss";
import { Container } from "react-bootstrap";

const SignUp = ({ errors, touched, handleSubmit, isSubmitting, values }) => (
  <Container className="form" style={{ fontSize: "11px" }}>
    <Form onSubmit={handleSubmit} className="login-form">
      <h3 style={{ textAlign: "center", margin: "1.5rem", fontSize: "3rem" }}>
        Hospital Registration
      </h3>
      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="hname" className="form__label">
            Hospital Name
          </label>
          <Field
            type="id"
            name="hname"
            placeholder="Doctor Name"
            className="form__input"
          />
          {touched.hname && errors.hname && (
            <div className="form__error">{errors.hname}</div>
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
            Hospital Email
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
          <label htmlFor="established_since" className="form__label">
            Established Year
          </label>
          <Field
            type="text"
            name="established_since"
            placeholder="Established Year"
            className="form__input"
          />
          {touched.established_since && errors.established_since && (
            <div className="form__error">{errors.established_since}</div>
          )}
        </div>
        <div className="form__wrapper">
          <label htmlFor="total_doctors" className="form__label">
            Total Doctor
          </label>
          <Field
            type="text"
            name="total_doctors"
            placeholder="Total No. of Doctors"
            className="form__input"
          />
          {touched.total_doctors && errors.total_doctors && (
            <div className="form__error">{errors.total_doctors}</div>
          )}
        </div>
      </div>

      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="address" className="form__label">
            Address
          </label>
          <Field
            name="h_address"
            as="textarea"
            className="form__input"
            placeholder="Hospital Address"
            style={{ height: "8rem", resize: "none" }}
          />
          {touched.h_address && errors.h_address && (
            <div className="form__error">{errors.h_address}</div>
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
    hname,
    phone,
    email,
    h_address,
    established_since,
    total_doctors
  }) => {
    return {
      hname: hname || "",
      phone: phone || "",
      email: email || "",
      h_address: h_address || "",
      established_since: established_since || "",
      total_doctors: total_doctors || ""
    };
  },
  validationSchema: Yup.object().shape({
    hname: Yup.string().required("Hospital name is required."),
    phone: Yup.string().required("Phone is required."),
    email: Yup.string()
      .required("Email is required.")
      .email("Hospital Email has to be valide."),
    h_address: Yup.string()
      .required("Enter Hostpital address.")
      .max(200, "Address is less then 200 char."),
    established_since: Yup.number()
      .required("Plaease enter Established year.")
      .positive("It has to be positive"),
    total_doctors: Yup.number()
      .required("Total number is required.")
      .positive("It has to be positive")
  }),
  handleSubmit: (
    values,
    { resetForm, setSubmitting, setErrors, ...formikBag }
  ) => {
    // formikBag.props.registerUser(values, formikBag.props.history);
    console.log(values);
    resetForm();
    setSubmitting(false);
  }
})(SignUp);

export default FormikEnhance;
