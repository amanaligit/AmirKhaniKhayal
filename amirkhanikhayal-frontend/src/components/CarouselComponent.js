import React from 'react'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import { useState } from 'react';

function CarouselComponent() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const items = [1];

    const imgStyle = { width: "100%", height: "100%" }
    return (
        <div>
            <div id="slides" className="carousel slide" data-ride="carousel">
                <ul className="carousel-indicators">
                    <li data-target="#slides" data-slide-to="0" className="active"></li>
                    <li data-target="#slides" data-slide-to="1"></li>
                    {/* <li data-target="#slides" data-slide-to="2"></li> */}
                </ul>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="images/808899-lpxcbaxxue-1464349248.png" alt="" className="img-fluid" style={imgStyle} alt="" />
                        <div className="carousel-caption">
                            <h1 className="display-2" style={{ fontSize: "500%", textTransform: "uppercase", textShadow: "3px 3px 10px black" }}>AmirKhaniKhayal</h1>
                            <h3 style={{ textShadow: "3px 3px 10px black" }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, itaque.</h3>
                            <button type="button" className="btn btn-outline-light btn-lg m-2" style={{ textShadow: "1px 1px 3px black" }}>
                                VIEW DEMO
                            </button>
                            <button type="button" className="btn btn-primary btn-lg m-2">
                                Get Started
                             </button>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row justify-content-center">
                            <img src="images/pexels-andrew-neel-2312369.png" className="img-fluid" style={imgStyle} alt="" />
                        </div>
                        <div className="carousel-caption">
                            <h1 className="display-2" style={{ fontSize: "500%", textTransform: "uppercase", textShadow: "3px 3px 10px black" }}>Online Classes</h1>
                            <h3 style={{ textShadow: "3px 3px 10px black" }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, itaque.</h3>
                            <button type="button" className="btn btn-outline-light btn-lg m-2" style={{ textShadow: "1px 1px 3px black" }}>
                                Learn More
                            </button>
                            <button type="button" className="btn btn-primary btn-lg m-2">
                                Register
                             </button>
                        </div>
                    </div>
                    {/* <div className="carousel-item">
                        <img src="img/background3.png" alt="" />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default CarouselComponent
