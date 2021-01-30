import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingMedical, faSearch, faSpinner, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Markup } from 'interweave';
import { useAuth0 } from "@auth0/auth0-react";


function Home(props) {

    const [toggle, setToggle] = useState(true);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState({ id: 1, subpageId: null, HTML: "" });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [searchFromClick, setSteachFromClick] = useState("");
    const [searchResults, setSearchResults] = useState({ pages: [], subpages: [] });
    const {isAuthenticated} = useAuth0();

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
                if (window.innerWidth <= 768) {
                    setToggle(toggle => !toggle);
                }
            })
            .catch(error => {
                setLoading(false);
            });
    }, [currentPage.id, currentPage.subpageId]);

    useEffect(() => {
        if (searchFromClick !== "") {
            axios.get(`http://localhost:3000/pagerouter/search`, { params: { params: searchFromClick } })
                .then(response => {
                    console.log(response);
                    // setCurrentPage(c => { return { ...c, HTML: response.data } });
                    setLoading(false);
                    setSearchResults(response.data);
                    // if (window.innerWidth <= 768) {
                    //     setToggle(toggle => !toggle);
                    // }
                })
                .catch(error => {
                    setLoading(false);
                });
        }
    }, [searchFromClick])



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
                                    <a href="#/" onClick={() => setCurrentPage({ ...currentPage, id: page.id, subpageId: subpage.id })}>{subpage.Title}</a>
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

    const searchResultsPages = searchResults.pages.map(page => {
        return (<li key={page.id}>
            <a onClick={() => setCurrentPage({ ...currentPage, id: page.id, subpageId: null })}> {page.Title}</a>
        </li>)
    });

    const searchResultsSubpages = searchResults.subpages.map(page => {
        return (<li key={page.id}>
            <a onClick={() => setCurrentPage({ ...currentPage, id: page.PageId, subpageId: page.id })}> {page.Title}</a>
        </li>)
    });




    return (
        <div className="wrapper">
            <nav id="sidebar" className={toggle ? "" : "active"}>
                <div className="sidebar-header" >
                    {toggle ? <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={() => setToggle(t => !t)}>
                        <FontAwesomeIcon icon={toggle ? faToggleOn : faToggleOff} />
                            Hide Index
                        </button> : null}
                </div>
                <div className="input-group" style={{ marginLeft: "35px" }}>
                    <div className="form-outline">
                        <input type="search" className="form-control" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => setSteachFromClick(search)}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>

                <>
                    <ul>
                        {
                            searchResultsPages
                        }
                        {
                            searchResultsSubpages
                        }
                    </ul>
                </>

                <ul className="lisst-unstyled components">
                    <p>Index</p>
                    {pageContent}
                </ul>
            </nav>
            {toggle && window.innerWidth <= 768 ?
                null
                :
                <div id="content">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            {!toggle ?
                                <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={() => setToggle(t => !t)}>
                                    <FontAwesomeIcon icon={toggle ? faToggleOn : faToggleOff} />
                                     Show Index
                                </button>
                                :
                                null
                            }

                        </div>
                    </nav>

                    <br />

                    <Markup content={currentPage.HTML} />


                </div>
            }

        </div>
    );
}

export default Home;