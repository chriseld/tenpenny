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

import ReactQuill, {Quill} from "react-quill";
import 'react-quill/dist/quill.snow.css';

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
let currentchapter;
let quillValue;
let idchapters;
let chaptertitle;
let chaptertext;

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
            } else {
                document.getElementById("authorpanel").style = "display: none";
                
            }
            if(authid === userid && idchapters) {
                document.getElementById("editchapterbtn").style = "display: block";
            } else {
                document.getElementById("editchapterbtn").style = "display: none";
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
            <a href="#" key={item.chapternumber} onClick={ () => displayText(item.chaptertitle, item.chaptertext, item.idchapters, item.chapternumber) }>{item.chapternumber} - {item.chaptertitle}</a>
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

function displayText(title, text, id, chapter) {
    idchapters = id;
    title = new Buffer.from(title).toString();
    text = new Buffer.from(text).toString();
    document.getElementById("content").innerHTML = text;

    currentchapter = chapter;

    chaptertitle = title;
    chaptertext = text;
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

async function SubmitNewChapter() {

    const rawText = quillValue;
    console.log(rawText);
    const rawTitle = document.getElementById("newChapterTitle").value;
    const cleanTitle = escapeHtml(rawTitle);
    const cleanText = rawText;

    await axios.post('http://localhost:9000/addnewchapter?bookid=' + bookid + '&chapternum=' + chapternumber, {
        chaptertitle: cleanTitle,
        chaptertext: cleanText
      }).then(function (response) {
        alert("Your chapter has been created!");
        window.location.reload();
      });
}

async function SubmitEditedChapter() {

    const rawText = quillValue;
    console.log(rawText);
    const rawTitle = document.getElementById("editChapterTitle").value;
    const cleanTitle = escapeHtml(rawTitle);
    const cleanText = rawText;

    await axios.post('http://localhost:9000/editchapter?idchapters=' + idchapters, {
        chaptertitle: cleanTitle,
        chaptertext: cleanText
      }).then(function (response) {
        alert("Your edits have been made!");
        window.location.reload();
      });
}

function OnLoad() {
    const { search } = useLocation();
    const values = queryString.parse(search);

    const [chapter, setChapter] = useState(false);
    const [editchapter, setEditChapter] = useState(false);
    
    const handleCloseChapter = () => setChapter(false);
    const handleShowChapter = () => setChapter(true);

    const handleCloseEditChapter = () => setEditChapter(false);
    const handleShowEditChapter = () => setEditChapter(true);

    const [convertedText, setConvertedText] = useState("");

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
                    <a id="editchapterbtn" onClick={handleShowEditChapter}>Edit Chapter</a>
                    <div id="content" />
                </Col>
            </Row>
        </Container>

        <Modal size="lg" show={chapter} onHide={handleCloseChapter}>
                <Modal.Header Style="background-color: #d7d7d7">
                    <Modal.Title>Chapter <span id="newChapterNum">{chapternumber}</span></Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <input type="text" name="newChapterTitle" id="newChapterTitle" size="80" autoComplete="off" placeholder="Chapter Title" />
                <br />
                <br />
                <ReactQuill
                    id="newChapterText"
                    name="newChapterText"
                    theme='snow'
                    value={convertedText}
                    onChange={(value)=>{quillValue=value}}
                    style={{minHeight: '300px'}}
                    placeholder="Chapter text here..."
                />
                <div id="bookid" hidden>{bookid}</div>
            </Modal.Body>
            <Modal.Footer Style="background-color: #d7d7d7">
                <Button variant="secondary" onClick={SubmitNewChapter}>
                    Submit
                </Button>
                <Button variant="secondary" onClick={handleCloseChapter}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal size="lg" show={editchapter} onHide={handleCloseEditChapter}>
                <Modal.Header Style="background-color: #d7d7d7">
                    <Modal.Title>Edit Chapter <span id="editChapterNum">{currentchapter}</span></Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <input type="text" name="editChapterTitle" id="editChapterTitle" size="80" defaultValue={chaptertitle} />
                <br />
                <br />
                <ReactQuill
                    id="editChapterText"
                    name="editChapterText"
                    theme='snow'
                    value={chaptertext}
                    onChange={(value)=>{quillValue=value}}
                    style={{minHeight: '300px'}}
                />
                <div id="bookid" hidden>{bookid}</div>
            </Modal.Body>
            <Modal.Footer Style="background-color: #d7d7d7">
                <Button variant="secondary" onClick={SubmitEditedChapter}>
                    Submit
                </Button>
                <Button variant="secondary" onClick={handleCloseEditChapter}>
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
