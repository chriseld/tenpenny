import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { CardDeck } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import NewBook from '../assets/NewBook.png';

let cover;


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

function GetCover(cover) {
    cover = new Buffer.from(cover).toString();
    cover = atob(cover);
    return cover;
}

function GetBlurb(blurb) {
    if(blurb.length > 65) {
        blurb = blurb.substring(0, 65) + "...";
    }
    return dirtyHtml(blurb);
}

function dirtyHtml(safe) {
    return safe
    .replace("&amp;", "&")
    .replace("&lt;", "<")
    .replace("&gt;", ">")
    .replace("&quot;", '"')
    .replace("&#039;", "'");
}

function GetBooks() {
    const [data, setData] = useState({ books: [] });
   
    useEffect(() => {
      const fetchData = async () => {
        const books = await axios(
            'http://localhost:9000/getbooklist',
        );
        setData(books.data);
        console.log(books.data)
      };
   
      fetchData();
    }, []);

   if(data[0]) {
    return (
      <>
        {data.map(item => (
            <Card key={item.idbooks} Style="Width: 200px; background-color: #D7D7D7; box-shadow: 5px 5px 15px 2px rgba(0,0,0,0.69); display: inline-block; margin: 15px;">
                <Card.Img className="text-center mx-auto" Style="margin: 0 25px; border: 1px solid black" variant="top" src={GetCover(item.cover)} />
                <Card.Body>
                    <Card.Title>{dirtyHtml(item.title)}</Card.Title>
                    <Card.Text>
                        <em>by {item.username}</em>
                        <br />
                        {GetBlurb(item.blurb)}
                    </Card.Text>
                    <Button variant="dark" href={"/book?id=" + item.idbooks}>Read Book</Button>
                </Card.Body>
            </Card>
        ))}
      </>
    )};
}

function PageHome() {
    return (
        <>

            {/* <div className="search">
                <p>search bar</p>
            </div> */}

            <CardDeck Style="padding: 15px 25px;">
                {LoggedIn()}
                {GetBooks()}
            </CardDeck>
        </>
    )
}

export default PageHome
