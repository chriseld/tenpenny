import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

let book;
let cover;
let chapters;

async function getBook(id) {
    book = await axios.get('http://localhost:9000/getbookbyid?id=' + id, {
        }).then(function (response) {
            cover = new Buffer.from(response.data[0].cover.data).toString();
            cover = atob(cover);
            console.log(cover);
            document.getElementById("coverImg").src = cover;
      });
}

async function getChapters(id) {
    chapters = await axios.get('http://localhost:9000/getchaptersbybookid?id=' + id, {
    }).then(function (response) {
    console.log(response.data);
  });
}

function LoggedIn() {
    const { search } = useLocation()
    const values = queryString.parse(search)

    const isLogged = useSelector(state => state.isLogged);

    if(isLogged === true) {
        console.log(values);
        getBook(values.id);
        getChapters(values.id);
        return(
        // <p>here. book id is {values.id}</p>
            <Container>
                <Row>
                    <Col xs={3}>
                        <p>Sidebar</p>
                        <Card>
                            <Card.Img id="coverImg" variant="top" src={"" + cover} />
                        </Card>
                    </Col>
                    <Col xs={9}>
                        <p>main content</p>
                    </Col>
                </Row>
            </Container>
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
