import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Formik } from 'formik';
import { Form, DropZone, Input, Textarea, SubmitBtn } from 'react-formik-ui';

let encodedCover = "";

async function SubmitBook(data) {
    const authid = data.authorId;
    const title = data.bookTitle;
    const blurb = data.bookBlurb;
    const cover = encodedCover;
    let bookid = 0;
    bookid = await axios.post('http://localhost:9000/addbook', {
        authid: authid,
        title: title,
        blurb: blurb,
        cover: cover
      }).then(function (response) {
        console.log(cover);
        alert("Your book has been created! Please add a chapter so that we can display it :)");
        window.location.replace('/book?id=' + response.data.insertId);
      });
};

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            const x = btoa(fileReader.result);
          encodedCover = x;
          console.log(encodedCover);
        }
        fileReader.onerror = (error) => {
          console.log(error);
        }
    })
}

function PageNewBook() {
    const isLogged = useSelector(state => state.isLogged);
    const userid = useSelector(state => state.userid);
    const username = useSelector(state => state.username);

    if(isLogged) {
    return(
        <div className="newBookForm">
            <h4>Author: {username}</h4>
            <Formik
                initialValues={{
                    authorId: userid,
                    bookTitle: "",
                    bookBlurb: "",
                    bookCover: {}
                }}
            onSubmit={
                data => (
                    SubmitBook(data)
                )
            }
            >
            <Form styling='structure'>

            <Input
                name='bookTitle'
                className='newBookTitle'
                label="Title"
                autocomplete="off"
                placeholder='Enter the title'
                required={true}
                size='50'
                value=''
            />

            <Textarea
                name='bookBlurb'
                className='bewBookBlurb'
                label='Write a blurb'
                required={true}
                placeholder='Enter a short blurb to sell readers on your book!'
                cols='50'
                rows='5'
            />

            <DropZone
                name='bookCover'
                label='Cover upload'
                placeholder='Upload your cover image (.JPEG and .PNG only, ideal dimensions: 800px w, 1200px h). Maximum file size: 3MB'
                accept="image/png, image/jpeg, image/jpg"
                multiple={false}
                required={true}
                maxSize={3145728}
                onDropRejected={() => {
                    alert("File Rejected! Please upload a suitable file.")
                }}
                onDropAccepted={(acceptedFiles) => getBase64(acceptedFiles[0])}
            >

            </DropZone>

            <br />

            <SubmitBtn className='newBookBtn' text="Submit"/>

            </Form>
            </Formik>
        </div>
    )} else {
        window.location.replace("/")
    }
}

export default PageNewBook
