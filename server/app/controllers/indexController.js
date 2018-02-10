'use strict';

const nconf = require('nconf');

module.exports = () => {
    let controller = {};


    controller.index = (req, res) => {


        // Resolve brand first
        return res.render('index', {

            domain: nconf.get('OO_DOMAIN')
        });



    };

    return controller;
};
