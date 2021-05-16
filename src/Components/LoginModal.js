import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import ForgotPassword from './ForgotPassword';
import './modal.css';

function LoginModal(props) {
    const [ResetPassword, setResetPassword] = useState(false);

    return (
        <div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Login</h4>
                </div>
                <div className="modal-body">
                    <LoginForm />
                    <br />
                    <a href='#' onClick={() => setResetPassword(true)}>I forgot my password</a>
                </div>
                <div className="modal-footer">
                    <button className="button" onClick={props.onClose}>close</button>
                </div>
            </div>

            <ForgotPassword onClose={() => setResetPassword(false)} show={ResetPassword} />
        </div>
    )}

export {LoginModal}
