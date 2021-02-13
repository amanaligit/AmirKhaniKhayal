import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faSearch, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Link } from 'react-router-dom';

function NavComponent({ setHtml, page: currentPage, setLoading, pages, toggle, setToggle }) {
    const [search, setSearch] = useState("");
    const [searchFromClick, setSeachFromClick] = useState("");
    const [searchResults, setSearchResults] = useState(null);

    const searchResultsPages = searchResults && searchResults.pages.map(page => {
        return (<li key={page.id}>
            <Link to={`/content/${page.id}`}> {page.Title} </Link>
        </li>)
    });

    const searchResultsSubpages = searchResults && searchResults.subpages.map(page => {
        return (<li key={page.id}>
            <Link to={`/content/${page.PageId}/${page.id}`}> {page.Title} </Link>
        </li>)
    });
    const pageContent = pages.map(page => {
        return (
            <li className={page.id === parseInt(currentPage.id) ? "active" : undefined} key={page.id}>
                {page.subpages.length ?
                    <React.Fragment>
                        <div className="pagediv ">
                            <Link to={`/content/${page.id}`} className=" d-inline-block"> {page.Title}   </Link>
                            <FontAwesomeIcon icon={faAngleDown} href={`#menu${page.id}`}
                                data-toggle="collapse"
                                className="float-right mr-3 mt-3 dropdown-toggle" style={{ cursor: "pointer" }} />
                        </div>

                        <ul className={`collapse ${page.id === parseInt(currentPage.id) && "show"} list-unstyled`} id={`menu${page.id}`} key={page.id}>
                            {page.subpages.map(subpage => {
                                return (<li key={subpage.id}>
                                    <Link to={`/content/${page.id}/${subpage.id}`}> {page.Title} </Link>
                                </li>)
                            })}
                        </ul>
                    </React.Fragment>
                    :
                    <Link to={`/content/${page.id}`}> {page.Title} </Link>

                }
            </li>

        )
    });


    useEffect(() => {
        if (searchFromClick !== "") {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/pagerouter/search`, { params: { params: searchFromClick } })
                .then(response => {
                    console.log(response.data);
                    setSearchResults(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [searchFromClick])

    return (
        <>
            <nav id="sidebar" className={toggle ? "" : "active"}>
                <div className="sidebar-header" >
                    {toggle ? <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={() => setToggle(t => !t)}>
                        <FontAwesomeIcon icon={toggle ? faToggleOn : faToggleOff} />
                            Hide Index
                        </button> : null}
                </div>
                <div className="input-group" style={{ marginLeft: "35px" }}>
                    <div className="form-outline">
                        <input type="search" className="form-control" value={search} onChange={e => { setSearchResults(null); setSearch(e.target.value); }} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => setSeachFromClick(search)}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                {searchResults && searchResults.pages.length === 0 && searchResults.subpages.length === 0 &&
                    <span>No search resuts</span>
                }
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
        </>
    )
}

export default NavComponent
