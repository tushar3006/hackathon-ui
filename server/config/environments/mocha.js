'use strict';

let nconf = require('nconf');

nconf.set('db', {
	username: 'user',
	password: 'pass',
	dbName: 'order_service_test',
	host: 'localhost',
	port: '3306',
	dropTable: true
});