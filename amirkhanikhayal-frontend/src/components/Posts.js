// src/views/external-api.js

import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Loading from "./loading";
import { useForm } from "react-hook-form";
import PostComponent from "./PostComponent";

const Posts = () => {

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postError, setPostError] = useState(null);

  

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    data.name = user.name;
    data.email = user.email;
    data.image = user.picture;
    const token = await getAccessTokenSilently();
    axios.post(`${serverUrl}/postsrouter/`, data, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      if (response.status === 200) {
        setPosts(posts => [response.data, ...posts]);
      }
      else{
        setPostError(response.data)
      }
    }).catch(err => setPostError(`${err.name}: ${err.message}`))

  };

  useEffect(() => {
    axios.get(`${serverUrl}/postsrouter/`)
      .then(response => {
        setPostsLoading(false);
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
        setPostsLoading(false);
      })
  }, [serverUrl])


  return (
    <div className="container-fluid">
      <h1>Posts</h1>

      {isAuthenticated &&
        <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <div className="form-group">
            <label htmlFor="male">Title</label>
            <input name="title" className="form-control" ref={register({ required: true })} />
            {errors.title &&
              <div class="alert alert-danger mt-2">
                <span>Title is required</span>
              </div>
            }
          </div>
          <div className="form-group">
            <label htmlFor="male">Text</label>
            <textarea type="text-area" name="text" className={errors.exampleRequired ? "is-invalid form-control" : "form-control"} style={{ height: "200px" }} ref={register({ required: true })} />
            {errors.text &&
              <div class="alert alert-danger mt-2">
                <span>This field is required</span>
              </div>
            }

          </div>

          {/* include validation with required or other standard HTML validation rules */}

          {/* errors will return when field validation fails  */}


          <input type="submit" className="btn btn-primary center" />
          {postError &&
            <div class="alert alert-danger mt-2">
              <span>{postError}</span>
            </div>}
        </form>}



      { postsLoading ? <Loading /> : (
        <>
          {/* <h6 className="muted">Result</h6>
          <pre className=" text-light bg-dark p-4" >
            {JSON.stringify(posts, null, 1)}
          </pre> */}
          {posts.map(post=><PostComponent key={post.id} post={post} setPosts={setPosts}/>)}
        </>
      )}
    </div>
  );
};

export default Posts;
