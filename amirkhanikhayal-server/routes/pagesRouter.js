const models = require('../models');
const Page = models.Pages;
var createError = require('http-errors');
const SubPage = models.SubPages;
const bodyParser = require('body-parser');
const express = require('express');
const { response } = require('../app');
const Sequelize = require('sequelize');
pagesRouter = express.Router()
pagesRouter.use(bodyParser.json());


pagesRouter.route('/')
    .get((req, res, next) => {
        Page.findAll({ order: [['Order', 'ASC']], attributes: ["Title", "id", "Order"], where: { Text: { [Op.like]: `%${req.query.search}%` } } })
            .then(pages => {
                var promises = pages.map(async page => {
                    let page_js = {};
                    page_js.Title = page.Title;
                    page_js.id = page.id;
                    page_js.subpages = await page.getSubPages({ attributes: ["Title", "id", "Order"], order: [['Order', 'ASC']] });
                    return page_js;
                });
                Promise.all(promises).then((response) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json(response);
                }, (err) => next(err))
                    .catch((err) => next(err));

            });
    })

pagesRouter.route('/search')
    .get((req, res, next) => {
        Page.findAll({ order: [['Order', 'ASC']], attributes: ["Title", "id", "Order"], where: { Text: { [Sequelize.Op.iLike]: `%${req.query.params}%` } } })
            .then(pages => {
                let response = { pages };
                SubPage.findAll({ order: [['Order', 'ASC']], attributes: ["Title", "id", "Order"], where: { Text: { [Sequelize.Op.iLike]: `%${req.query.params}%` } } })
                    .then(subpages => {
                        response.subpages = subpages;
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json(response);
                    }, (err) => next(err))
                    .catch((err) => next(err));
            }, (err) => next(err))
            .catch((err) => next(err));
    })




module.exports = pagesRouter;