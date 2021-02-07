import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPlus, faTrash, faVideo } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import LoadingSmall from "./LoadingSmall";
import * as yup from 'yup';

function NewPostModal({ isModalOpen, toggleModal, setPosts }) {
    const schema = yup.object({
        text: yup.string().required('Text is required'),
        title: yup.string().required('Title is required'),
        images: yup.mixed().test('fileFormat', '.jpeg, .png, .jpg supported only', (value) => {
            var valid = true;
            for (let index = 0; index < value.length; index++) {
                const element = value[index];
                valid = valid && (['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].indexOf(element.type) !== -1);
            }
            return valid;
        }),
        YTlinks: yup.array().of(
            yup.object({
                link: yup.string()
                    .required('link is required')
                    .test('urlcheck', 'url is invalid', (url) => {
                        return url.indexOf("https://youtu.be/") !== -1
                    })
            })
        )


    });


    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { getAccessTokenSilently } = useAuth0();
    const { register, handleSubmit, errors, reset, formState } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
    const { user } = useAuth0();
    const [postError, setPostError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [numLinks, setNumLinks] = useState(0);

    const { dirtyFields } = formState

    useEffect(() => {
        setPostError(null);
    }, [isModalOpen]);

    const onSubmit = async data => {
        setPostError(null);
        console.log(data);
        setLoading(true);
        const formData = new FormData();
        for (let index = 0; index < data.images.length; index++) {
            const element = data.images[index];
            formData.append('images', element);
        }
        let ytlinks = "";
        data.YTlinks.forEach(element => {
            const video = element.link.split("https://youtu.be/")[1];
            ytlinks = ytlinks.concat(video + " ");
        });
        console.log(ytlinks);
        formData.append('ytlinks', ytlinks);
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
                                <input name="title" className={errors.title ? "is-invalid form-control" : "form-control"} ref={register} />
                                {errors.title &&
                                    <div className="alert alert-danger mt-2">
                                        <span>{errors.title.message}</span>
                                    </div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">Text</label>
                                <textarea type="text-area" name="text" className={errors.text ? "is-invalid form-control" : "form-control"} style={{ height: "30rem" }} ref={register} />
                                {errors.text &&
                                    <div className="alert alert-danger mt-2">
                                        <span>{errors.text.message}</span>
                                    </div>
                                }

                            </div>
                            <label htmlFor="input1">Upload Images: </label>
                            <input type="file" name="images" id="images" className="is-invalid form-control-file mb-3" multiple ref={register} />
                            {errors.images &&
                                <div className="alert alert-danger mt-2">
                                    <span>{errors.images.message}</span>
                                </div>
                            }
                            {[...Array(numLinks).keys()].map(i => (
                                <div key={i}>
                                    <label>YouTube Link: {i + 1} </label>
                                    <input ref={register} name={`YTlinks.${i}.link`} className={`form-control ${dirtyFields.YTlinks?.[i] ? (errors.YTlinks?.[i] ? "is-invalid" : "is-valid") : null}`} />
                                    {errors.YTlinks?.[i] &&
                                        <div className="alert alert-danger mt-2">
                                            <span>{errors.YTlinks?.[i]?.link?.message}</span>
                                        </div>
                                    }
                                </div>
                            ))}
                            <div className="row justify-content-center m-4">
                                <button className="btn btn-danger m-2" type="button" onClick={() => setNumLinks(n => n + 1)} ><FontAwesomeIcon icon={faVideo} /> <FontAwesomeIcon icon={faPlus} /> Add YouTube link</button>
                                {numLinks > 0 && <button className="btn btn-danger m-2" type="button" onClick={() => setNumLinks(n => n - 1)}><FontAwesomeIcon icon={faTrash} />Remove YouTube link</button>}
                            </div>
                            <div className="row justify-content-center">
                                <button type="submit" className="btn btn-primary center" ><FontAwesomeIcon icon={faPaperPlane} />Submit Post</button>
                            </div>

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
