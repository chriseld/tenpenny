import React from 'react'

function PageAbout() {
    return (
        <div id="aboutContent">
            <h3>TENPENNY</h3>
            <h4>A CMS for hosting serialized stories.</h4>
            <p>Created by Chris Eld</p>
            <br />
            <p>Made using React, React-Redux, React-Quill, and a Node.js backend with a MySQL database, this CMS was made with much love and many expletives in order to enhance my knowledge or React and related technologies.</p>
            <p>As a writer, I wanted to create something that combined my passions, and this is the result.</p>
            <hr />
            <p>If you like this project, check out my <a href="https://chriseld.com/portfollio" target="_blank">Portfolio</a>, as well as <a href="https://chriseld.com/" target="_blank">my personal website</a>!</p>
        </div>
    )
}

export default PageAbout
