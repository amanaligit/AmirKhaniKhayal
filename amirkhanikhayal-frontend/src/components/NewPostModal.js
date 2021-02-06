import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPray } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import LoadingSmall from "./LoadingSmall";

function NewPostModal({ isModalOpen, toggleModal, setPosts }) {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { getAccessTokenSilently } = useAuth0();
    const { register, handleSubmit, errors, reset } = useForm();
    const { user } = useAuth0();
    const [postError, setPostError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPostError(null);
    }, [isModalOpen]);

    const onSubmit = async data => {
        console.log(data);
        setPostError(null);
        setLoading(true);
        const formData = new FormData();
        for (let index = 0; index < data.images.length; index++) {
            const element = data.images[index];
            formData.append('images', element);
        }
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('image', user.picture);
        formData.append('text', data.text);
        formData.append('title', data.title);
        const token = await getAccessTokenSilently();
        axios.post(`${serverUrl}/postsrouter/`, formData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then(response => {
                if (response.status === 200) {
                    setLoading(false);
                    setPosts(posts => [response.data, ...posts]);
                    reset();
                    toggleModal(false);
                }
            }).catch(err => {
                setLoading(false);
                setPostError(`${err.name}: ${err.message}`);
            })

    };

    return (
        <div>

            <Modal centered={true} isOpen={isModalOpen} toggle={() => toggleModal(t => !t)}>
                <ModalHeader toggle={() => toggleModal(t => !t)}>New Post</ModalHeader>
                <ModalBody>
                    {loading ?
                        <LoadingSmall />
                        :
                        <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                            {/* register your input into the hook by invoking the "register" function */}
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input name="title" className={errors.title ? "is-invalid form-control" : "form-control"} ref={register({ required: true })} />
                                {errors.title &&
                                    <div className="alert alert-danger mt-2">
                                        <span>Title is required</span>
                                    </div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">Text</label>
                                <textarea type="text-area" name="text" className={errors.text ? "is-invalid form-control" : "form-control"} style={{ height: "30rem" }} ref={register({ required: true })} />
                                {errors.text &&
                                    <div className="alert alert-danger mt-2">
                                        <span>This field is required</span>
                                    </div>
                                }

                            </div>
                            <label htmlFor="input1">Upload Images: </label>
                            <input type="file" name="images" id="images" className="form-control-file mb-3" multiple ref={register()} />
                            {/* include validation with required or other standard HTML validation rules */}

                            {/* errors will return when field validation fails  */}


                            <button type="submit" className="btn btn-primary center" ><FontAwesomeIcon icon={faPaperPlane} />Submit Post</button>

                            {postError &&
                                <div className="alert alert-danger mt-2">
                                    <span>{postError}</span>
                                </div>}
                        </form>
                    }

                </ModalBody>
            </Modal>

        </div>
    )
}

export default NewPostModal
