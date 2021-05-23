import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import PageHome from './PageHome';
import PageAbout from './PageAbout';
import PageNewBook from './PageNewBook';

function PageRouter() {
    return (
        <div>
            <Router>
                <Switch>
                <Route exact path="/">
                    <PageHome />
                </Route>
                <Route path="/about">
                    <PageAbout />
                </Route>
                <Route path="/newbook">
                    <PageNewBook />
                </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default PageRouter;
