import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import useAdminStatus from '../hooks/useAdminStatus'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import { useState } from 'react';
function PostComponent({ post, setPosts, setDeletePost, toggleEditModal, toggleDeleteModal, setEditPost }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const isAdmin = useAdminStatus();
    var images = [];
    if (post.images) {
        images = post.images.split("|");
        images.pop();
    }

    var ytlinks = []
    if (post.ytlinks) {
        ytlinks = post.ytlinks.split(" ");
        ytlinks.pop();
    }
    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }
    const slides = images.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item}

            >
                <div className="row justify-content-center">
                    <img src={`${process.env.REACT_APP_SERVER_URL}/uploads/images/${item}`} alt="post" className="post-img img-fluid" />
                </div>

            </CarouselItem>
        );
    });


    return (
        <div className=" container mt-3 align-items-center " style={{ borderRadius: "10px", border: "2px solid grey", padding: "20px", }} >
            {isAdmin &&
                <div className="row justify-content-end">
                    <button name="Delete Post" onClick={() => {
                        setDeletePost(post);
                        toggleDeleteModal(true);
                    }} className="btn btn-danger mr-3">{<FontAwesomeIcon icon={faTrash} />}Delete Post</button>
                    <button onClick={() => {
                        setEditPost(post);
                        toggleEditModal(true);
                    }} className="btn btn-info mr-3" name="Edit Post">{<FontAwesomeIcon icon={faEdit} />}Edit Post</button>
                </div>
            }
            <h1 style={{ textAlign: "center", fontFamily: "poppins" }} >{post.title}</h1>
            <br></br>
            {images.length > 1 && <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                className="mb-5"
            >
                <CarouselIndicators items={images} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>}
            {images.length === 1 &&
                <img src={`${process.env.REACT_APP_SERVER_URL}/uploads/images/${images[0]}`} alt="post" className="img-fluid mb-5" />
            }
            {ytlinks.length > 0 ? ytlinks.map(link => {
                return (<div className="video-container mt-5 mb-5" key={link}>
                    <iframe className="responsive-iframe" title={link} src={`https://www.youtube.com/embed/${link}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                </div>)
            })
                : null

            }
            <p style={{ whiteSpace: "pre-wrap" }}>{post.text}</p>
            <br />
            <div className="media">
                <div className="media-left">
                    <img src={post.author.image} className="media-object mr-3" style={{ width: "80px" }} alt="author" />
                </div>
                <div className="media-body">
                    <h5 className="media-heading">Posted by: {post.author.Name}</h5>
                    <p>Posted on <i>{post.createdAt}</i></p>
                </div>
            </div>

        </div>
    )
}

export default PostComponent
