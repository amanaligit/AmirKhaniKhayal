/**
 * Required External Modules and Interfaces
 */
const express = require("express");
const { checkJwt, checkPermissions } = require("../authz/check-jwt");
const bodyParser = require('body-parser');
const { response, request } = require('../app');
const path = require('path');
const multer = require("multer");
const storage = multer.diskStorage({
    destination: './public/uploads/images/',
    filename: function (req, file, cb) {
        cb(null, file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
})
/**
 * Router Definition
 */

const postsRouter = express.Router();
postsRouter.use(bodyParser.json());
const models = require('../models');
var createError = require('http-errors');
const Sequelize = require('sequelize');
const app = require('../app');


const User = models.User;
const Post = models.Post;
/**
 * Controller Definitions
 */

// GET messages/

postsRouter.route("/")
    .get((req, res) => {
        Post.findAll({ order: [['createdAt', 'DESC']] })
            .then(posts => {
                promises = posts.map(async post => {
                    let author = await post.getUser({ attributes: ["Name", "image"] });
                    author = author.toJSON();
                    return { title: post.title, text: post.text, author, id: post.id, images: post.images, createdAt: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(post.createdAt))) }
                })
                Promise.all(promises)
                    .then(result => {
                        res.status(200).send(result);
                    })
            })
    })
    .post(checkJwt, checkPermissions, upload.array('images', 10), (req, res) => {
        console.log(req.body.post);
        User.findOne({ where: { sub: req.user.sub } })
            .then(async user => {
                if (!user) {
                    user = await User.create({ sub: req.user.sub, email: req.body.email, Name: req.body.name, image: req.body.image, images: images });
                }
                var images = "";
                for (let index = 0; index < req.files.length; index++) {
                    const file = req.files[index];
                    images = images.concat(`${file.filename}|`);
                }

                Post.create({ title: req.body.title, text: req.body.text, UserId: user.id, images: images })
                    .then(async post => {
                        console.log(images);
                        let author = await post.getUser();
                        author = author.toJSON();
                        res.status(200).send({ title: post.title, text: post.text, images: post.images, author, id: post.id, createdAt: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(post.createdAt))) })
                    }
                    )
            })
    })

postsRouter.route('/:postId')
    .delete(checkJwt, checkPermissions, (req, res) => {
        Post.findOne({ where: { id: req.params.postId } })
            .then(post => {
                if (post) {
                    post.destroy()
                        .then(post => {
                            res.status(200).send();
                        })
                }
                else {
                    res.status(404).send();
                }

            })
    })
    .put(checkJwt, checkPermissions, (req, res) => {
        console.log(req.params.postId);
        Post.findOne({ where: { id: req.params.postId } })
            .then(post => {
                if (post) {
                    post.title = req.body.title;
                    post.text = req.body.text;
                    post.save()
                        .then(post => {
                            res.status(200).send(post);
                        })
                }
                else {
                    res.status(404).send(post);
                }

            })
    })


module.exports = postsRouter;
