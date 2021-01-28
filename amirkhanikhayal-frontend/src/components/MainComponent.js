import React from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';

export default function MainComponent() {
    return (
        <div>
            <Header/>
            <Switch>
              <Route path="/home" component={()=> <Home></Home>} />
              <Redirect to="/home" />
            </Switch>
            <Footer />
        </div>
    )
}
