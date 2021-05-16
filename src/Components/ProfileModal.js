import React from 'react';
import { ProfileForm } from './ProfileForm'

import './modal.css';

function ProfileModal(props) {
    return (
        <div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Profile</h4>
                </div>
                <div className="modal-body">
                    <ProfileForm />
                </div>
                <div className="modal-footer">
                    <button className="button" onClick={props.onClose}>close</button>
                </div>
            </div>
        </div>
    )}

export {ProfileModal}