'use strict';

const managerService = require('../services/managerService');



module.exports = (app) => {
    let controller = {};

    controller.updateOrderOnline = (req, res) => {
        managerService.create(req, app)
            .then((response) => {
                res.send(response[0]);
            })
            .catch((err) => {
                res.send(err)
            })
    }

    controller.getBrandSettings = (req, res) => {
        managerService.brandSettings(req, app)
            .then((response) => {

                res.send(response[0]);


            })
            .catch((err) => {
                res.send(err)
            })
    }


    return controller;
};
