import React from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route } from 'react-router-dom';
import Home from './HomeComponent';
import Loading from "./loading";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from '../auth/protected-route';
import Profile from './profileComponent';
import Posts from './Posts';
import PageComponent from './PageComponent';



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
                    <Route exact path="/" component={() => <Home></Home>} />
                    <ProtectedRoute path="/profile" exact component={() => <Profile />} />
                    <Route path="/posts" exact component={Posts} />
                    <Route exact path="/content/:id/" component={PageComponent} />
                    <Route exact path="/content/:id/:subPageId" component={PageComponent} />
                </Switch>
            </div>
            <Footer />
        </div>
    )
}
