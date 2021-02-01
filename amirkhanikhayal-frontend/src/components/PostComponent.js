import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import useAdminStatus from '../hooks/useAdminStatus'

function PostComponent({ post, setPosts, setDeletePost, toggleEditModal, toggleDeleteModal, setEditPost }) {

    const isAdmin = useAdminStatus();

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
            <div className='video-container'><iframe title="rickroll" className='responsive-iframe' src="https://www.youtube.com/embed/LLnXRqsBl3k" allowfullscreen="true" frameborder="0" allow=" accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe></div>
            <p style={{ whiteSpace: "pre-wrap" }}>{post.text}</p>
            <br />
            <div class="media">
                <div class="media-left">
                    <img src={post.author.image} class="media-object mr-3" style={{width:"80px"}} alt="author"/>
                </div>
                    <div class="media-body">
                        <h5 class="media-heading">Posted by: {post.author.Name}</h5>
                        <p>Posted on <i>{post.createdAt}</i></p>
                    </div>
                </div>

            </div>
    )
}

export default PostComponent
