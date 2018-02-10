'use strict';

let express = require('express');
let router = express.Router();
// You can add some route specific middleware here
// router.use(someMiddleware);

module.exports = (app) => {



	// router.use('/common',ltAuth.verify(), require('./commonRoutes')(app));

	// router.use('/users',ltAuth.verify(), require('./users')(app));

	// router.use('/orders',ltAuth.verify(), require('./orders')(app));

	// router.use('/outlets',ltAuth.verify(), require('./outlet')(app));

	// router.use('/suggestions',ltAuth.verify(), require('./geoLocation')(app));

	// router.use('/menu', ltAuth.verify(),require('./menu')(app));

	// router.use('/cart',ltAuth.verify(), require('./cart')(app));

	// router.use('/payment',ltAuth.verify(), require('./payment')(app));


	
    
	router.use('/orders', require('./orders')(app));
    

	return router;
};
