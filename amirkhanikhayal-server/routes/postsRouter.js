/**
 * Required External Modules and Interfaces
 */

const express = require("express");
const { checkJwt, checkPermissions } = require("../authz/check-jwt");
const bodyParser = require('body-parser');

/**
 * Router Definition
 */

const postsRouter = express.Router();
postsRouter.use(bodyParser.json());
const models = require('../models');
var createError = require('http-errors');
const { response } = require('../app');
const Sequelize = require('sequelize');


const User = models.User;
const Post = models.Post;
/**
 * Controller Definitions
 */

// GET messages/

postsRouter.route("/")
    .get((req, res) => {
        Post.findAll({order: [['createdAt', 'DESC']]})
            .then(posts => {
                promises = posts.map(async post => {
                    let author = await post.getUser();
                    author = author.toJSON();
                    return { title: post.title, text: post.text, author }
                })
                Promise.all(promises)
                    .then(result => {
                        res.status(200).send(result);
                    })
            })
    })
    .post(checkJwt, checkPermissions,(req, res) => {
        User.findOne({ where: { sub: req.user.sub } })
            .then(async user => {
                if (!user) {
                    user = await User.create({ sub: req.user.sub, email: req.body.email, Name: req.body.name, image: req.body.image });
                }
                Post.create({ title: req.body.title, text: req.body.text, UserId: user.id })
                    .then(async post => {
                        let author = await post.getUser();
                        author = author.toJSON();
                        res.status(200).send({ title: post.title, text: post.text, author })
                    }
                    )
            })
    })
// .post(checkJwt, checkPermissions, (req, res) => {
//     User.findOne({ where: { sub: req.user.sub } })
//         .then(async user => {
//             if (!user) {
//                 user = await User.create({sub: req.user.sub, email: req.body.email, Name: req.body.name, image: req.body.image});
//             }
//             Post.create({title: req.body.title, text: req.body.text, UserId: user.id})
//             .then(result=>
//                 res.status(200).send(result)
//             )
//         })
// })

// postsRouter.get("/protected-message", checkJwt, (req, res) => {
//     console.log(req.user);
//     const message = {
//         message: "The API successfully validated your access token.",
//     };
//     res.status(200).send(message);
// });

// postsRouter.get("/role-based-message", checkJwt, checkPermissions, (req, res) => {

//     const message = {
//         message: "The API successfully validated your access token and role.",
//     };
//     res.status(200).send(message);
// });

module.exports = postsRouter;
