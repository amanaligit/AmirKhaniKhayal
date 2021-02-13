import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Markup } from 'interweave';
import { useAuth0 } from "@auth0/auth0-react";
import NavComponent from './NavComponent';
import CarouselComponent from './CarouselComponent';


function Home(props) {


    return (
        <>
            <CarouselComponent />
            <div className="container-fluid">
                <div className="row jumbotron">
                    <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10">

                        <p className="lead">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, esse et blanditiis saepe consectetur, in assumenda, quas libero culpa dolor nihil quod temporibus ducimus at ipsa nulla porro itaque autem?
                    </p>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-2">
                        <a href="#"><butt type="button" class="btn btn-outline-secondary">Go to Contents</butt></a>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Home;