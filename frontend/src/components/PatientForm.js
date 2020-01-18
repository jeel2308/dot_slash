import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/DoctorForm.scss";
import { Container } from "react-bootstrap";

const SignUp = ({ errors, touched, handleSubmit, isSubmitting, values }) => (
  <Container className="form" style={{ fontSize: "11px" }}>
    <Form onSubmit={handleSubmit} className="login-form">
      <h3 style={{ textAlign: "center", margin: "1.5rem", fontSize: "3rem" }}>
        Doctor Registration
      </h3>
      <div className="form__side-wrapper">
        <div className="form__wrapper">
          <label htmlFor="dname" className="form__label">
            Patient Name
          </label>
          <Field
            type="id"
            name="dname"
            placeholder="Patient Name"
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
          <label htmlFor="dob" className="form__label">
            dob
          </label>
          <Field
            type="date"
            name="dob"
            placeholder="dob"
            className="form__input"
          />
          {touched.specialization && errors.specialization && (
            <div className="form__error">{errors.specialization}</div>
          )}
        </div>
      </div>
      {/** add select button for gender */}
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
    specialization
  }) => {
    return {
      dname: dname || "",
      phone: phone || "",
      email: email || "",
      experience_yrs: experience_yrs || "",
      specialization: specialization || ""
    };
  },
  validationSchema: Yup.object().shape({
    dname: Yup.string().required("Name is required."),
    phone: Yup.string().required("Phone is required."),
    email: Yup.string()
      .required("Email is required.")
      .email("Email has to be valide."),
    experience_yrs: Yup.number().required("Experience Year is required."),
    specialization: Yup.string().required("Enter your specialization field.")
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
