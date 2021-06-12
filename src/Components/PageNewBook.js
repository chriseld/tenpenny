import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { Form, DropZone, Input, Textarea, SubmitBtn } from 'react-formik-ui';

function PageNewBook() {
    const maxSize = 5242880;
    return(
        <div className="newBookForm">
            <Formik
                initialValues={{
                    coverFile: []
                }}
            onSubmit={data => (alert(JSON.stringify(data)))}
            >
            <Form styling='structure'>

            <Input
                name='bookTitle'
                className='newBookTitle'
                label="Title"
                placeholder='Enter the title'
                required={true}
                size='50'
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
                placeholder='Upload your cover image (.PNG only, ideal dimensions: 1600px w, 2400px h). Maximum file size: 5MB'
                accept="image/png"
                multiple={false}
                required={true}
                maxSize={maxSize}
                withClearButton='true'
                onDropRejected={() =>{
                    alert("File rejected. Please upload a suitable file.")
                }}
            >

            </DropZone>

            <SubmitBtn className='newBookBtn' text="Submit"/>

            </Form>
            </Formik>
        </div>
    )
}

export default PageNewBook
