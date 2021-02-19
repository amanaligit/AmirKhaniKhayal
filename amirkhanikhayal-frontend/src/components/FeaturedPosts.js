import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
    Card, CardImg,
    CardTitle, CardSubtitle, CardHeader
} from 'reactstrap';
import Dotdotdot from 'react-dotdotdot';




function FeaturedPosts() {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const [posts, setPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(null);

    useEffect(() => {
        axios.get(`${serverUrl}/postsrouter/`, { params: { featured: "true" } })
            .then(response => {
                setPostsLoading(false);
                setPosts(response.data);
            })
            .catch(err => {
                setPostsLoading(false);
                setLoadingError(`${err.name}: ${err.message}`);
            })
    }, [serverUrl])


    var postsCards = posts.map(post => {
        return (
            <Card className={` mr-3 p-3 col-md-3 col-12 col-sm-6`} key={post.id} style={{ maxHeight: "36rem", width: "100%" }} >
                <CardHeader >
                    {post.images &&
                        <CardImg className="mb-1" width="100%" src={`${process.env.REACT_APP_SERVER_URL}/uploads/images/${post.images.split("|")[0]}`} alt="Card image cap" />
                    }
                    {post.ytlinks && !post.images &&
                        <div className="video-container">
                            <iframe className="responsive-iframe" src={`https://www.youtube.com/embed/${post.ytlinks.split(" ")[0]}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                        </div>
                    }
                </CardHeader>
                <CardTitle tag="h3" className="text-center mt-2">{post.title}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">By {post.author.Name}, on {post.createdAt}</CardSubtitle>
                <Dotdotdot clamp="auto" tagName="p" useNativeClamp={true}>
                    {post.text}
                </Dotdotdot>
                <button className="btn btn-primary btn-lg">Read Full Text</button>
            </Card >
        )
    }
    )



    return (
        <div>
            <div class="d-flex flex-row flex-nowrap overflow-auto">
                {postsCards}
            </div>
        </div>

    )
}

export default FeaturedPosts
