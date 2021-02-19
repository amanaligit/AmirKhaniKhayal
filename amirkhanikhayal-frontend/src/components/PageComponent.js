import React from 'react'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Markup } from 'interweave';
import NavComponent from './NavComponent';
import {
    useParams
} from "react-router-dom";
import LoadingSmall from './LoadingSmall';
import { parse } from '@fortawesome/fontawesome-svg-core';

function PageComponent() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toggle, setToggle] = useState(true);
    let page = useParams();
    const [html, setHtml] = useState("");



    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/pagerouter`)
            .then(response => {
                setPages(response.data);
                console.log(pages)
            })
            .catch(error => {
                setPages([]);
            })
    }, []);
    useEffect(() => {

        const path = page.subPageId ? `/${page.id}/subpages/${page.subPageId}.html` : `/${page.id}/${page.id}.html`
        setLoading(true);
        axios.get(`${process.env.REACT_APP_SERVER_URL}/pages${path}`)
            .then(response => {
                setHtml(response.data);
                setLoading(false);
                if (window.innerWidth <= 768) {
                    setToggle(toggle => !toggle);
                }
            })
            .catch(error => {
                setHtml("");
                setLoading(false);
            });
    }, [setHtml, page, setToggle, setLoading]);
    return (
        <>
            <div className="wrapper">
                <NavComponent page={page} pages={pages} toggle={toggle} setToggle={setToggle} />
                {toggle && window.innerWidth <= 768 ?
                    null
                    :
                    <div id="content" className="container-fluid ">

                        <div className="container-fluid">
                            {!toggle ?
                                <button type="button" id="sidebarCollapse" className="btn btn-light btn-lg" style={{ borderRadius: "70%", color: "#0e6ec9    " }} onClick={() => setToggle(t => !t)}>
                                    <FontAwesomeIcon size="lg" icon={faArrowCircleRight} className="mr-1" />
                                     Show Index
                                </button>
                                :
                                null
                            }
                        </div>

                        {loading ? <LoadingSmall /> :
                            <div className="ml-3 mr-3">
                                <h1 className="text-center display-5 mb-3 container" style={{ textShadow: "1px 1px 2px" }}>{page.subPageId ? pages[page.id - 1]?.subpages?.[page.subPageId - 1]?.Title : pages[page.id - 1]?.Title} </h1>
                                <Markup content={html} />
                            </div>}
                    </div>
                }

            </div>
        </>
    )
}

export default PageComponent
