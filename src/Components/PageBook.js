import React, { useState, useEffect, Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {render} from 'react-dom';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
let isLogged;
let book;
let bookid;
let cover;
let blurb;
let userid;
let authid;
let authname;
let chapters = [];
let chapternumber;

async function getBook(id) {
    book = await axios.get('http://localhost:9000/getbookbyid?id=' + id, {
        }).then(function (response) {
            cover = new Buffer.from(response.data[0].cover.data).toString();
            cover = atob(cover);
            document.getElementById("coverImg").src = cover;
            if(document.getElementById("content").innerHTML === "") {
                blurb = response.data[0].blurb;
                document.getElementById("content").innerHTML = blurb;
            }
            authid = response.data[0].idauthor;
            document.getElementById("authid").innerHTML = authid;
            authname = response.data[0].username;
            document.getElementById("authorname").innerHTML = "by: " + authname;
            if(authid === userid) {
                document.getElementById("authorpanel").style = "display: block";
            }
      });
}

function GetChapters(id) {
    const [data, setData] = useState({ chapters: [] });
   
    useEffect(() => {
      const fetchData = async () => {
        const chapters = await axios(
            'http://localhost:9000/getchaptersbybookid?id=' + id,
        );
        setData(chapters.data);
        console.log(chapters.data)
      };
   
      fetchData();
    }, []);

   if(data[0]) {
    return (
      <>
        {data.map(item => (
            <a href="#" key={item.chapternumber} onClick={ () => displayText(item.chaptertext) }>{item.chapternumber} - {item.chaptertitle}</a>
        ))}
      </>
    )};
  }

async function getChapterNumber(id) {
    await axios.get('http://localhost:9000/getnextchapterbybookid?id=' + id, {
    }).then(function (response) {
        chapternumber = response.data[0].nextchapter;
  });
}

function displayText(text) {
        text = new Buffer.from(text).toString();
        document.getElementById("content").innerHTML = text;
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

async function submitNewChapter() {

    const rawText = document.getElementById("newChapterText").value;
    const rawTitle = document.getElementById("newChapterTitle").value;
    const cleanTitle = escapeHtml(rawTitle);
    const cleanText = escapeHtml(rawText);

    await axios.post('http://localhost:9000/addnewchapter?bookid=' + bookid + '&chapternum=' + chapternumber, {
        chaptertitle: cleanTitle,
        chaptertext: cleanText
      }).then(function (response) {
        alert("Your chapter has been created!");
        window.location.reload();
      });
}

function OnLoad() {
    const { search } = useLocation();
    const values = queryString.parse(search);

    const [chapter, setChapter] = useState(false);
    
    const handleCloseChapter = () => setChapter(false);
    const handleShowChapter = () => setChapter(true);

    isLogged = useSelector(state => state.isLogged);
    userid = useSelector(state => state.userid);
    bookid = values.id;

    getBook(values.id);
    const chapterslist = GetChapters(values.id);
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
                        {/* <a id="editbook">Edit Book</a> */}
                        {/* <br /> */}
                        <a id="addchapter" onClick={handleShowChapter}>Add Chapter</a>
                    </Card>

                    <Card id="chapters" Style="width: 200px; align-items: center;">{chapterslist}</Card>
                </Col>
                <Col xs={1} />
                <Col xs={9}>
                    <div id="content" />
                </Col>
            </Row>
        </Container>

        <Modal size="lg" show={chapter} onHide={handleCloseChapter}>
                <Modal.Header Style="background-color: #d7d7d7">
                    <Modal.Title>Chapter <span id="newChapterNum">{chapternumber}</span></Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <input type="text" name="newChapterTitle" id="newChapterTitle" size="80" placeholder="Chapter Title" />
                <br />
                <br />
                <textarea id="newChapterText" name="newChapterText" rows="25" cols="105" resize="none" placeholder="Chapter Text" />
                <div id="bookid" hidden>{bookid}</div>
            </Modal.Body>
            <Modal.Footer Style="background-color: #d7d7d7">
                <Button variant="secondary" onClick={submitNewChapter}>
                    Submit
                </Button>
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
            <OnLoad />
            <div id="authid" Style="display: none;"></div>
        </>
    )
}

export default PageBook
