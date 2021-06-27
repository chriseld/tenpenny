import React, { useState, Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditorComponent = () => <Editor />

let book;
let cover;
let blurb;
let userid;
let authid;
let authname;
let chapters;
let chapternumber;

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
        console.log(response);
  });
}

async function getChapterNumber(id) {
    await axios.get('http://localhost:9000/getnextchapterbybookid?id=' + id, {
    }).then(function (response) {
        console.log(response);
        chapternumber = response.data[0].nextchapter;
  });
}

function LoggedIn() {
    const { search } = useLocation();
    const values = queryString.parse(search);

    const [chapter, setChapter] = useState(false);

    const handleCloseChapter = () => setChapter(false);
    const handleShowChapter = () => setChapter(true);

    const isLogged = useSelector(state => state.isLogged);
    userid = useSelector(state => state.userid);

    getBook(values.id);
    getChapters(values.id);
    getChapterNumber(values.id);

        return(
            <>
            <Container>
                <Row>
                    <Col xs={2}>
                        <Card Style="width: 200px;">
                            <Card.Img id="coverImg" variant="top" />
                            <div id="authorname"></div>
                        </Card>

                        <Card id="authorpanel" Style="width: 200px; align-items: center;">
                            <a id="editbook">Edit Book</a>
                            <br />
                            <a id="addchapter" onClick={handleShowChapter}>Add Chapter</a>
                        </Card>

                        <Card id="chapters" Style="width: 200px; align-items: center;" />
                    </Col>
                    <Col xs={1} />
                    <Col xs={9}>
                        <div id="content" />
                    </Col>
                </Row>
            </Container>

            <Modal show={chapter} onHide={handleCloseChapter}>
            <Modal.Header Style="background-color: #d7d7d7">
                <Modal.Title>Chapter {chapternumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>modal content!</p>
            </Modal.Body>
            <Modal.Footer Style="background-color: #d7d7d7">
            <Button variant="secondary" onClick={handleCloseChapter}>
                Close
            </Button>
            </Modal.Footer>
            </Modal>

            </>
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
