import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";


function DeleteModal({ post, isModalOpen, toggleModal, setPosts }) {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { getAccessTokenSilently} = useAuth0();
    const [deleteError, setDeleteError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState();

    const handleDelete = async (postId) => {
        const token = await getAccessTokenSilently();
        console.log(`deleting post ${postId}`);
        axios.delete(`${serverUrl}/postsrouter/${postId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                if (response.status === 200) {
                    toggleModal(false);
                    setPosts(posts => posts.filter((post, index, arr) => post.id !== postId));
                }
            })
            .catch(err => setDeleteError(`${err.name}: ${err.message}`))
    }

    return (
        <div>
            {post&&            <Modal centered={true} isOpen={isModalOpen} toggle={()=> {toggleModal(t=>!t); setDeleteError(null)}}>
                <ModalHeader toggle={()=> toggleModal(t=>!t)}>Delete Post</ModalHeader>
                <ModalBody>
                    <h5>Are you sure you want to delete this post?:</h5>
                    <p>Title: {post.title}</p>
                    <p>Author: {post.author.Name}</p>
                    <p>Posted At: {post.createdAt}</p>
                    <br/>
                    {deleteError &&
                            <div class="alert alert-danger mt-2">
                                <span>{deleteError}</span>
                            </div>}
                    <button className="btn btn-danger ml-2" onClick={()=> handleDelete(post.id)}><FontAwesomeIcon icon={faTrash} style={{marginRight:"5px"}}/>Delete Post</button>
                    <button className="btn btn-secondary ml-2" onClick={()=> toggleModal(t=>!t)}><FontAwesomeIcon icon={faTimes} style={{marginRight:"5px"}}/>Cancel </button>
                </ModalBody>
            </Modal>}

        </div>
    )
}

export default DeleteModal
