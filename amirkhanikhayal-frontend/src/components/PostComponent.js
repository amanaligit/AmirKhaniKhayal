import { faDumpster, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React from 'react'
import Posts from './Posts'
import { useAuth0 } from "@auth0/auth0-react";

function PostComponent({ post, setPosts }) {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    const handleDelete = async (postId) => {
        const token = await getAccessTokenSilently();
        console.log(`deleting post ${postId}`);
        axios.delete(`${serverUrl}/postsrouter/${postId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                if (response.status === 200) {
                    setPosts(posts => posts.filter((post, index, arr) => post.id !== postId));
                }

            })
            .catch(err => console.log(err))
    }
    return (
        <div className=" container mt-3 align-items-center " style={{ borderRadius: "10px", border: "2px solid grey", padding: "20px", }} >
            <h1 style={{ textAlign: "center", fontFamily: "poppins" }} >{post.title}</h1>
            <p>{post.text}</p>
            {isAuthenticated && <button onClick={() => handleDelete(post.id)}>{<FontAwesomeIcon icon={faTrash} />}</button>}
        </div>
    )
}

export default PostComponent
