// src/views/external-api.js

import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Loading from "./loading";
import { useForm } from "react-hook-form";
import PostComponent from "./PostComponent";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal"
import NewPostModal from "./NewPostModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import LoadingSmall from "./LoadingSmall";

const Posts = () => {

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postError, setPostError] = useState(null);
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false);
  const [deletePost, setDeletePost] = useState(null);
  const [isEditModalOpen, toggleEditModal] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [isNewPostModalOpen, toggleNewPostModal] = useState(false);
  const [loadingError, setLoadingError] = useState(null);


  useEffect(() => {
    axios.get(`${serverUrl}/postsrouter/`)
      .then(response => {
        setPostsLoading(false);
        setPosts(response.data);
      })
      .catch(err => {
        setPostsLoading(false);
        setLoadingError(`${err.name}: ${err.message}`);
      })
  }, [serverUrl])


  return (
    <div className="container">
      {isAuthenticated &&
        <>
          <button className="btn btn-primary btn-lg mt-5 mb-2" onClick={() => toggleNewPostModal(true)}><FontAwesomeIcon icon={faPencilAlt} />New Post</button>
          <DeleteModal isModalOpen={isDeleteModalOpen} toggleModal={toggleDeleteModal} post={deletePost} setPosts={setPosts} />
          <EditModal isModalOpen={isEditModalOpen} toggleModal={toggleEditModal} post={editPost} setPosts={setPosts} />
          <NewPostModal isModalOpen={isNewPostModalOpen} toggleModal={toggleNewPostModal} setPosts={setPosts} />
        </>}

      <h1>Posts</h1>
      { loadingError && <div class="alert alert-danger mt-2">
        <span>{loadingError}</span>
      </div>}
      { postsLoading ? <LoadingSmall /> : (
        <>
          {posts.map(post => <PostComponent key={post.id} post={post} setPosts={setPosts} setDeletePost={setDeletePost} toggleDeleteModal={toggleDeleteModal} toggleEditModal={toggleEditModal} setEditPost={setEditPost} />)}
        </>
      )}
    </div>
  );
};

export default Posts;
