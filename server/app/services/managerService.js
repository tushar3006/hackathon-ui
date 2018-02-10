'use strict';

let requestHelper = require('../helpers/requestHelper');
let apiConstants = require('../../config/apiConstants');


const create = (req, app) => {

    let model = app.db.connections[0].models['brand_setting'];
    return Promise.resolve(model.find({ brandId: req.body.brandData.brandId }))
        .then((result) => {


            if (!Object.keys(result).length)
                return Promise.resolve(model.create(req.body.brandData));
            else {
                return Promise.resolve(model.update({ brandId: req.body.brandData.brandId }, req.body.brandData));
            }
        })
        .then((res) => {
            return Promise.resolve(model.find({ brandId: req.body.brandData.brandId }))
        })
        .catch((err) => {
            req.log.info(err);
            return Promise.reject(err);
        })
};


const brandSettings = (req, app) => {

    let model = app.db.connections[0].models['brand_setting'];

    return Promise.resolve(model.find({ brandId: req.query.brandId }))
        .then((res) => {
            if (!res.length)
                return Promise.resolve(model.find({ brandId: -1 }));
            else
                return Promise.resolve(res);

        })
        .catch((err) => {
            return Promise.reject(err);
        })

}


module.exports = {
    create,
    brandSettings
};
