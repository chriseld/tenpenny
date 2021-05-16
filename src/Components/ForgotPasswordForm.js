import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';

function validateForgotPasswordEmail(value) {
    let error;

    if(!value) {
        error = 'Must provide an email address'
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }

    return error;
}

async function UpdateDatabase(values) {
    const res = await axios.get('http://localhost:9000/forgotpassword?email=' + values.email);
    alert(res.data);
}

const initialValues = {
    email: ""
};

function ForgotPasswordForm() {
    return (
        <>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            UpdateDatabase(values);
          }}
        >
          {(formik) => {
            const { errors, touched, isValid, dirty } = formik;
            return (
              <div className="container">
                <Form>
                  <div className="form-row">
                    <label htmlFor="email">Email: </label>
                    <Field
                      type="email"
                      name="email"
                      id="loginEmail"
                      className={
                        errors.email && touched.email ? "input-error" : null
                      }
                      validate={validateForgotPasswordEmail}
                    />
                    <br />
                    <ErrorMessage name="email" component="span" className="error" />
                  </div>
                    <br />
    
                  <button
                    type="submit"
                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                    disabled={!(dirty && isValid)}
                  >
                    Reset Password
                  </button>
                </Form>
              </div>
            );
          }}
        </Formik>
        </>
    )
}

export default ForgotPasswordForm
