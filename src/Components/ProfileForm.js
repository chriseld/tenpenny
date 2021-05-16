import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import { useSelector } from 'react-redux';
import EmailChangeForm from './emailChangeForm';
import PasswordChangeForm from './passwordChangeForm';

const ProfileForm = () => {
    
    const isLogged = useSelector(state => state.isLogged);

    const username = useSelector(state => state.username);

    // if(isLogged) {
    //     return ThanksDisplay(username);
    // } else {
    //     return ProfileDisplay();
    // };

    return(
        <>
        <h4>Change email address:</h4>
        <EmailChangeForm />
        <hr />
        <h4>Change password:</h4>
        <PasswordChangeForm />
        </>
    )
  
};

export { ProfileForm }