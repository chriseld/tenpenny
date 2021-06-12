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
        <Card Style="Width: 200px; background-color: #D7D7D7; box-shadow: 5px 5px 15px 2px rgba(0,0,0,0.69); display: inline-block; margin: 15px;">
            <Card.Img className="text-center mx-auto" Style="margin: 0 25px; border: 1px solid black" variant="top" src={NewBook} />
            <Card.Body>
                <Card.Title>Add New Book</Card.Title>
                <Card.Text>
                    Click below to add a new book!
                </Card.Text>
                <Button variant="dark" href="/newbook">Add Book</Button>
            </Card.Body>
        </Card>
        )
    }
}

function PageHome() {
    return (
        <>

            <div className="search">
                <p>search bar</p>
            </div>

            <CardDeck Style="padding: 15px 25px;">
                {LoggedIn()}
            </CardDeck>
        </>
    )
}

export default PageHome
