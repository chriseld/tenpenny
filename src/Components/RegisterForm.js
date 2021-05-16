import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';

async function validateEmail(value) {
    let error;
    if(!value) {
        error = 'Email required'
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    } else if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        const registered = await axios.get('http://localhost:9000/emailcheck?email=' + value);
        if(registered.data === true) {
            error = 'email already in use';
        }
    }
    return error;
}

async function validateUsername(value) {
    let error;
    if(!value) {
        error = 'Username required'
    } else if(value.length > 25 || value.length < 5) {
        error = 'Username must be between 5 and 25 characters'
    } else if(!/^(?=[a-zA-Z0-9]{5,25}$)(?!.*[_.]{2})[^_.].*[^_.]$/i.test(value)) {
        error = 'Username contains invalid characters'
    } else if(/^(?=[a-zA-Z0-9]{5,25}$)(?!.*[_.]{2})[^_.].*[^_.]$/i.test(value)) {
        const registered = await axios.get('http://localhost:9000/usernamecheck?username=' + value);
        if(registered.data === true) {
            error = 'Username already in use';
        }
    }

    return error;
}

async function validatePassword(value) {
    let error;
    if(!value) {
        error = 'Password required'
    } else if(value.length > 25 || value.length < 6) {
        error = 'Password must be between 6 and 25 characters';
    }

    return error;
}

async function registerUser(values) {
    const email = values.email;
    const username = values.username;
    const password = values.password;
    const userRegistered = await axios.get('http://localhost:9000/registeruser?email=' + email + '&username=' + username + '&password=' + password);
    if(userRegistered.data === "Success") {
        await axios.get('http://localhost:9000/mailer?email=' + email + '&subject=Thank you!&html=Thank you for registering, ' + username + '!');
        alert("Thank you for registering! A confirmation will be sent to your email address.");
        window.location.reload();
    } else {
        alert("Something went wrong. Please try again.");
    }
}

const initialValues = {
  email: "",
  username: "",
  password: ""
};

const RegisterForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        registerUser(values);
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
                  id="regEmail"
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                  validate={validateEmail}
                />
                <br />
                <ErrorMessage name="email" component="span" className="error" />
              </div>
                  <br />
                <div className="form-row">
                <label htmlFor="username">Username: </label>
                <Field
                  name="username"
                  id="regUsername"
                  className={
                    errors.username && touched.username ? "input-error" : null
                  }
                  validate={validateUsername}
                />
                <br />
                <ErrorMessage
                  name="username"
                  component="span"
                  className="error"
                />
              </div>
                  <br />
              <div className="form-row">
                <label htmlFor="password">Password: </label>
                <Field
                  type="password"
                  name="password"
                  id="regPassword"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                  validate={validatePassword}
                />
                <br />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </div>
                  <br />
              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Register
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export { RegisterForm }