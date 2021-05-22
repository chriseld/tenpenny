import React from 'react'
import jwt_decode from "jwt-decode";

import store from './store';

function stateLogin() {
    return {
        type: 'LOG_IN',
        payload: true
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

function CheckForToken() {
    if(localStorage.getItem('userToken')) {
        const JWT = localStorage.getItem('userToken');
        const user = jwt_decode(JWT);
        store.dispatch(stateLogin());
        store.dispatch(getUsername(user.username));
        store.dispatch(getUserid(user.userid));
        store.dispatch(getUseremail(user.useremail));
        store.dispatch(getUserrole(user.userrole));
    }
}

function JWTDecode() {
    return (
        <>
            {CheckForToken()}
        </>
    )
}

export default JWTDecode
