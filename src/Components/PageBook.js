import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

let book;
let cover;
let blurb;
let userid;
let authid;
let authname;
let chapters;

async function getBook(id) {
    book = await axios.get('http://localhost:9000/getbookbyid?id=' + id, {
        }).then(function (response) {
            cover = new Buffer.from(response.data[0].cover.data).toString();
            cover = atob(cover);
            document.getElementById("coverImg").src = cover;
            blurb = response.data[0].blurb;
            document.getElementById("content").innerHTML = blurb;
            authid = response.data[0].idauthor;
            document.getElementById("authid").innerHTML = authid;
            authname = response.data[0].username;
            document.getElementById("authorname").innerHTML = "by: " + authname;
            if(authid === userid) {
                document.getElementById("authorpanel").style = "display: block";
            } else {
                document.getElementById("authorpanel").style = "display: none";
            }
      });
}

async function getChapters(id) {
    chapters = await axios.get('http://localhost:9000/getchaptersbybookid?id=' + id, {
    }).then(function (response) {
  });
}

function LoggedIn() {
    const { search } = useLocation()
    const values = queryString.parse(search)

    const isLogged = useSelector(state => state.isLogged);
    userid = useSelector(state => state.userid);

    getBook(values.id);
    getChapters(values.id);

        return(
            <Container>
                <Row>
                    <Col xs={3}>
                        <Card Style="width: 200px;">
                            <Card.Img id="coverImg" variant="top" />
                            <div id="authorname"></div>
                        </Card>

                        <Card id="authorpanel" Style="width: 200px; align-items: center;">
                            <Button id="editbook">Edit Book</Button>
                            <Button id="addchapter">Add Chapter</Button>
                        </Card>
                    </Col>
                    <Col xs={9}>
                        <div id="content" />
                    </Col>
                </Row>
            </Container>
        )
    }

function PageBook() {
    return (
        <>
            <div id="authid" Style="display: none;"></div>
            <LoggedIn />
        </>
    )
}

export default PageBook
