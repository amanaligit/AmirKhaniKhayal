/**
 * Required External Modules and Interfaces
 */

const express = require("express");
const { checkJwt, checkPermissions } = require("../authz/check-jwt");

/**
 * Router Definition
 */

const postsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET messages/

postsRouter.get("/public-message", (req, res) => {
    const message = {
    message: "The API doesn't require an access token to share this message.",
  };
    res.status(200).send(message);
});

postsRouter.get("/protected-message", checkJwt, (req, res) => {
    console.log(req.user);
    const message = {
        message: "The API successfully validated your access token.",
    };
    res.status(200).send(message);
});

postsRouter.get("/role-based-message", checkJwt, checkPermissions, (req, res) => {

    const message = {
        message: "The API successfully validated your access token and role.",
      };
    res.status(200).send(message);
});

module.exports = postsRouter;
