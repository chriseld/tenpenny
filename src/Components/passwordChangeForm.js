import axios from 'axios';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import store from './store';

async function validatePassword(value) {
    let error;
    if(!value) {
        error = 'Password required'
    } else if(value.length > 25 || value.length < 6) {
        error = 'Password must be between 6 and 25 characters';
    }

    return error;
}

function validateConfirm(value) {
    let error;
    if(!value) {
        error = 'Passwords must match';
    } else if(value.length > 25 || value.length < 6) {
        error = 'Password must be between 6 and 25 characters';
    }
    return error;
}

async function UpdatePassword(values, id) {
    const password = values.newPassword;
    const passwordConfirm = values.passwordConfirm;
    const userid = id;
    if(password === passwordConfirm) {
        alert("Your password has been changed!")
        const updateEmail = await axios.get('http://localhost:9000/updateuserpassword?password=' + password + '&id=' + userid);
    } else {
        alert('Passwords must match');
    }
    
}

const PasswordChangeForm = () => {

    const userid = useSelector(state => state.userid);

    const initialValues = {
        newPassword: "",
        passwordConfirm: ""
    };

    return(
        <>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, {resetForm}) => {
            UpdatePassword(values, userid);
            resetForm();
          }}
        >
          {(formik) => {
            const { errors, touched, isValid, dirty } = formik;
            return (
              <div className="container">
                <Form>
                <div className="form-row">
                    <label htmlFor="password">New password: </label>
                    <Field
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className={
                        errors.password && touched.password ? "input-error" : null
                    }
                    validate={validatePassword}
                />
                <br />
                <ErrorMessage
                  name="newPassword"
                  component="span"
                  className="error"
                />
                </div>
                <br />
                <div className="form-row">
                    <label htmlFor="password">Confirm password: </label>
                    <Field
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    className={
                        errors.password && touched.password ? "input-error" : null
                    }
                    validate={validateConfirm}
                />
                <br />
                <ErrorMessage
                  name="passwordConfirm"
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
                    Submit
                  </button>
                </Form>
              </div>
            );
          }}
        </Formik>
        </>
    )
}

export default PasswordChangeForm;