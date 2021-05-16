import React from 'react';
import { RegisterForm} from './RegisterForm'

import './modal.css';

function RegisterModal(props) {
    return (
        <div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Register an Account</h4>
                </div>
                <div className="modal-body">
                    <RegisterForm />
                </div>
                <div className="modal-footer">
                    <button className="button" onClick={props.onClose}>close</button>
                </div>
            </div>
        </div>
    )}

export {RegisterModal}
