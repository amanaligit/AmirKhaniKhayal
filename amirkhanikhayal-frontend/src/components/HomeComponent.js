import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Markup } from 'interweave';



function Home(props) {

    const [toggle, setToggle] = useState(window.innerWidth <= 760 ? false : true);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState({ id: 1, subpageId: null, HTML: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:3000/pagerouter")
            .then(response => {
                setPages(response.data);
            })
            .catch(error => {
                setPages([]);
            })
    }, []);

    useEffect(() => {
        const path = currentPage.subpageId ? `/${currentPage.id}/subpages/${currentPage.subpageId}.html` : `/${currentPage.id}/${currentPage.id}.html`
        axios.get(`http://localhost:3000/pages${path}`)
            .then(response => {
                // console.log(response);
                setCurrentPage(c => { return { ...c, HTML: response.data } });
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, [currentPage.id, currentPage.subpageId]);




    const pageContent = pages.map(page => {
        return (

                <li className="active" key={page.id}>
                    {page.subpages.length ?
                        <React.Fragment>
                            <a
                                href={`#menu${page.id}`}

                                data-toggle="collapse"
                                aria-expanded="false"
                                className="dropdown-toggle"

                            ><span onClick={() => setCurrentPage({ ...currentPage, id: page.id, subpageId: null })}> {page.Title}</span></a>
                            <ul className="collapse list-unstyled" id={`menu${page.id}`} key={page.id}>
                                {page.subpages.map(subpage => {
                                    return (<li key={subpage.id}>
                                        <a onClick={() => setCurrentPage({ ...currentPage, id: page.id, subpageId: subpage.id })}>{subpage.Title}</a>
                                    </li>)
                                })}
                            </ul>
                        </React.Fragment>
                        :
                        <a><span onClick={() => setCurrentPage({ ...currentPage, id: page.id, subpageId: null })}> {page.Title}</span></a>
                    }
                </li>

        )
    });


    return (
        <div className="wrapper">
            <div>

            </div>
            <nav id="sidebar" className={toggle ? "" : "active"}>
                <div className="sidebar-header">
                    <h3>Bootstrap Slider</h3>
                </div>
                <ul className="lisst-unstyled components">
                    <p>Index</p>
                    {pageContent}
                </ul>
            </nav>

            <div id="content">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">

                        <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={() => setToggle(t => !t)}>
                            <FontAwesomeIcon icon={toggle ? faToggleOn : faToggleOff} />
                            {toggle ? " Hide" : " Show"} Index
                        </button>
                    </div>
                </nav>

                <br />
                <Markup content={currentPage.HTML} />

            </div>
        </div>
    );
}

export default Home;