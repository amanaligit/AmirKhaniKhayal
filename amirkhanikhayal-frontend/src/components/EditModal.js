import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import { useState } from "react";
import LoadingSmall from "./LoadingSmall";



function EditModal({ post, isModalOpen, toggleModal, setPosts }) {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { getAccessTokenSilently } = useAuth0();
    const { register, handleSubmit, errors } = useForm();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleEdit = async (data) => {
        setLoading(true);
        const token = await getAccessTokenSilently();
        console.log(`Editing post ${post.id}`);
        axios.put(`${serverUrl}/postsrouter/${post.id}`, data, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                if (response.status === 200) {
                    setLoading(false);
                    toggleModal(false);
                    setPosts(posts => posts.map((oldpost) => {
                        if (oldpost.id === post.id) { return { ...oldpost, ...response.data }; }
                        return oldpost;
                    }));
                }
            })
            .catch(err => {
                setLoading(false);
                setError(`${err.name}: ${err.message}`);
            })
    }

    return (
        <div>
            {post && <Modal centered={true} isOpen={isModalOpen} toggle={() => toggleModal(t => !t)}>
                <ModalHeader toggle={() => toggleModal(t => !t)}>Edit Post</ModalHeader>
                <ModalBody>
                    {loading ?
                        <LoadingSmall />
                        :
                        <form className="form-group" onSubmit={handleSubmit(handleEdit)}>
                            {/* register your input into the hook by invoking the "register" function */}
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input defaultValue={post.title} name="title" className={errors.title ? "is-invalid form-control" : "form-control"} ref={register({ required: true })} />
                                {errors.title &&
                                    <div className="alert alert-danger mt-2">
                                        <span>Title is required</span>
                                    </div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">Text</label>
                                <textarea type="text-area" defaultValue={post.text} name="text" className={errors.text ? "is-invalid form-control" : "form-control"} style={{ height: "30rem" }} ref={register({ required: true })} />
                                {errors.text &&
                                    <div className="alert alert-danger mt-2">
                                        <span>This field is required</span>
                                    </div>
                                }

                            </div>
                            <button type="submit" className="btn btn-primary center"><FontAwesomeIcon icon={faPaperPlane}/>Submit</button>
                            {error &&
                                <div class="alert alert-danger mt-2">
                                    <span>{error}</span>
                                </div>}
                        </form>
                    }
                </ModalBody>
            </Modal>}

        </div>
    )
}

export default EditModal
