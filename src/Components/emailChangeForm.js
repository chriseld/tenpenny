import axios from 'axios';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import store from './store';
import { RegisterForm } from './RegisterForm';

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

function updateUseremail(email) {
    return {
        type: 'getUseremail',
        payload: email
    }
}

async function UpdateEmail(values, id) {
    const email = values.email;
    store.dispatch(updateUseremail(email));
    alert("Your email has been changed!")
    const updateEmail = await axios.get('http://localhost:9000/updateuseremail?email=' + email + '&id=' + id);
}

const initialValues = {
    email: ""
};

const EmailChangeForm = () => {

    const currentEmail = useSelector(state => state.useremail);
    const userid = useSelector(state => state.userid);

    return(
        <>
        <p>Current email: {currentEmail}</p>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, {resetForm}) => {
            UpdateEmail(values, userid);
            resetForm();
          }}
        >
          {(formik) => {
            const { errors, touched, isValid, dirty } = formik;
            return (
              <div className="container">
                <Form>
                  <div className="form-row">
                    <label htmlFor="email">New Email: </label>
                    <Field
                      type="email"
                      name="email"
                      id="newEmail"
                      className={
                        errors.email && touched.email ? "input-error" : null
                      }
                      validate={validateEmail}
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

export default EmailChangeForm;