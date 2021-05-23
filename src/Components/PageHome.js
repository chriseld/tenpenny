import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CardDeck } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import NewBook from '../assets/NewBook.png';

function LoggedIn() {
    const isLogged = useSelector(state => state.isLogged);

    if(isLogged === true) {
        return(
        <Card Style="Width: 200px; background-color: #D7D7D7; box-shadow: 5px 5px 15px 2px rgba(0,0,0,0.69);">
            <Card.Img className="mx-auto" Style="width: 90%; margin-top: 5px; box-shadow: 5px 5px 15px -4px rgba(0,0,0,0.69); border: 1px solid black" variant="top" src={NewBook} />
            <Card.Body>
                <Card.Title>Add New Book</Card.Title>
                <Card.Text>
                    Click below to add a new book!
                </Card.Text>
                <Button variant="primary" href="/newbook">Add Book</Button>
            </Card.Body>
        </Card>
        )
    }
}

function PageHome() {
    return (
        <>
            <CardDeck>
                {LoggedIn()}
            </CardDeck>
        </>
    )
}

export default PageHome
