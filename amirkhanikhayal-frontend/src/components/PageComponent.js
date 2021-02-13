import React from 'react'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Markup } from 'interweave';
import NavComponent from './NavComponent';
import {
    useParams
} from "react-router-dom";
import LoadingSmall from './LoadingSmall';

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
                setLoading(false);
            });
    }, [setHtml, page, setToggle, setLoading]);
    return (
        <>
            <div className="wrapper">
                <NavComponent page={page} setHtml={setHtml} setLoading={setLoading} pages={pages} toggle={toggle} setToggle={setToggle} />
                {toggle && window.innerWidth <= 768 ?
                    null
                    :
                    <div id="content" className="m-4">

                        <div className="container-fluid mb-5">
                            {!toggle ?
                                <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={() => setToggle(t => !t)}>
                                    <FontAwesomeIcon icon={toggle ? faToggleOn : faToggleOff} />
                                     Show Index
                                </button>
                                :
                                null
                            }
                        </div>
                        {loading ? <LoadingSmall /> : <Markup content={html} />}
                    </div>
                }

            </div>
        </>
    )
}

export default PageComponent
