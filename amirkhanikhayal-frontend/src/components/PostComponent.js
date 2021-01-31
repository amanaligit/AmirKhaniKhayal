import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React from 'react'
import Posts from './Posts'
import { useAuth0 } from "@auth0/auth0-react";

function PostComponent({ post, setPosts, setDeletePost, toggleEditModal, toggleDeleteModal, setEditPost }) {

    const { isAuthenticated } = useAuth0();

    return (
        <div className=" container mt-3 align-items-center " style={{ borderRadius: "10px", border: "2px solid grey", padding: "20px", }} >
            {isAuthenticated &&
                <div className="row justify-content-end">
                    <button name="Delete Post" onClick={() => {
                        setDeletePost(post);
                        toggleDeleteModal(true);
                    }} className="btn btn-danger mr-3">{<FontAwesomeIcon icon={faTrash} />}Delete Post</button>
                     <button  onClick={() => {
                        setEditPost(post);
                        toggleEditModal(true);
                    }} className="btn btn-info mr-3" name="Edit Post">{<FontAwesomeIcon icon={faEdit} />}Edit Post</button>
                </div>
            }
            <h1 style={{ textAlign: "center", fontFamily: "poppins" }} >{post.title}</h1>
            <br></br>
            <p style={{ whiteSpace: "pre-wrap" }}>{post.text}</p>

        </div>
    )
}

export default PostComponent
