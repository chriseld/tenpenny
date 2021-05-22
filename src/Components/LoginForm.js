import {React } from "react";
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';

import store from '../Components/store';

import jwt_decode from "jwt-decode";

// import { decode } from './JWTModule';

const jwt = require('jsonwebtoken');

async function validateLoginEmail(value) {
    let error;

    if(!value) {
        error = 'Must provide an email address'
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }

    return error
}

async function validateLoginPassword(value) {
    let error;

    if(!value) {
        error = 'Must provide a password'
    }

    return error
}

function stateLogin() {
    return {
        type: 'LOG_IN'
    }
}

function getUsername(user) {
    return {
        type: 'getUsername',
        payload: user
    }
}

function getUserid(user) {
    return {
        type: 'getUserid',
        payload: user
    }
}

function getUseremail(user) {
    return {
        type: 'getUseremail',
        payload: user
    }
}

function getUserrole(user) {
    return {
        type: 'getUserrole',
        payload: user
    }
}

function getLogin(user) {
  return {
      type: 'getLogin',
      payload: user
  }
}

async function loginUser(values) {

    const email = values.email;
    const password = values.password;
    let user = "";

    const token = await axios.get('http://localhost:9000/getuserbyemail?email=' + email);
    if(token.data !== "User not found"){
      user = jwt_decode(token.data);
    } else {
      user = "";
    }

    if(token.data !== "User not found") {
        const validated = await axios.get('http://localhost:9000/passwordcompare?password=' + password + '&hash=' + user.userpwd);
        if(validated.data === true) {
            const logit = await axios.get('http://localhost:9000/loginuser?idusers=' + user.userid);
            store.dispatch(stateLogin());
            store.dispatch(getLogin(true));
            store.dispatch(getUsername(user.username));
            store.dispatch(getUserid(user.userid));
            store.dispatch(getUseremail(user.useremail));
            store.dispatch(getUserrole(user.userrole));

            localStorage.setItem("userToken", token.data);

        } else {
            alert("Email or password invalid");
        }
    } else {
        alert("Email or password invalid");
    }
}

function checkRememberState() {
    if(localStorage.getItem("email")) {
        return true;
    } else {
        return false;
    }
};

const initialValues = {
  email: localStorage.getItem("email") || "",
  password: "",
  remember: checkRememberState()
};

const LoginDisplay = () => {
    return (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
    
            if(values.remember === true) {
                localStorage.setItem("email", values.email);
            } else {
                localStorage.removeItem("email");
            }
    
            loginUser(values);
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
                      validate={validateLoginEmail}
                    />
                    <br />
                    <ErrorMessage name="email" component="span" className="error" />
                  </div>
                      <br />
                  <div className="form-row">
                    <label htmlFor="password">Password: </label>
                    <Field
                      type="password"
                      name="password"
                      id="loginPassword"
                      className={
                        errors.password && touched.password ? "input-error" : null
                      }
                      validate={validateLoginPassword}
                    />
                    <br />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="error"
                    />
                  </div>
                      <br />
                
                    <label>
                        Remember my email: 
                        <Field type="checkbox" name="remember" />
                    </label>
    
                    <br />
    
                  <button
                    type="submit"
                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                    disabled={!(dirty && isValid)}
                  >
                    Sign In
                  </button>
                </Form>
              </div>
            );
          }}
        </Formik>
      );
}

const ThanksDisplay = (username) => {
    
    return(
        <h3>Thank you for logging in, {username}</h3>
    )
}

const LoginForm = () => {
    
    const isLogged = useSelector(state => state.isLogged);

    const username = useSelector(state => state.username);

    if(isLogged) {
        return ThanksDisplay(username);
    } else {
        return LoginDisplay();
    };
  
};

export { LoginForm }
