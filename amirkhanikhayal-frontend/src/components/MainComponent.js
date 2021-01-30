import React from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Loading from "./loading";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from '../auth/protected-route';
import Profile from './profileComponent';



export default function MainComponent() {

    const { isLoading } = useAuth0();

    if (isLoading) {
        return <Loading />;
    }
    return (
        <div>
            <Header />
            <div>
                <Switch>
                    <Route path="/home" exact component={() => <Home></Home>} />
                    <ProtectedRoute path="/profile" exact component={() => <Profile />} />
                </Switch>
            </div>
            <Footer />
        </div>
    )
}
