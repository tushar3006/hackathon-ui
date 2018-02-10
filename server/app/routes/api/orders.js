'use strict';

let express = require('express');
let router = express.Router();

module.exports = (app) => {
    let ordersController = require('../../controllers/ordersController.js')(app);
    // router.route('/')
    // 	.get(orderController.list)
    // 	.post(bodyChecker, orderController.create);

    // router.route('/:orderId')
    // 	.get(orderController.read)
    // 	.put(bodyChecker, orderController.update)
    // 	.patch(bodyChecker, orderController.patch)
    // 	.delete(orderController.delete);

    router.post('/updateOrderOnline', ordersController.updateOrderOnline);
    router.get('/getBrandSettings', ordersController.getBrandSettings);



    return router;
};
