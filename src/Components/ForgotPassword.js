import React from 'react'
import './modal.css';
import ForgotPasswordForm from './ForgotPasswordForm';


function ForgotPassword(props) {
    return (
        <div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Reset Password</h4>
                </div>
                <div className="modal-body">
                    <ForgotPasswordForm />
                </div>
                <div className="modal-footer">
                    <button className="button" onClick={props.onClose}>close</button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
