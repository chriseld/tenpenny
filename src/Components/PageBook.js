import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

function LoggedIn() {
    const { search } = useLocation()
    const values = queryString.parse(search)

    const isLogged = useSelector(state => state.isLogged);

    if(isLogged === true) {
        console.log(values) // "top""
        return(
        <p>here. book id = {values.id}</p>
        )
    }
}

function PageBook() {
    return (
        <>
            <LoggedIn />
        </>
    )
}

export default PageBook
