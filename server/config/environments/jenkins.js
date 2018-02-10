'use strict';

let nconf = require('nconf');

nconf.set('db', {
	username: 'jenkins',
	password: 'jenkins',
	dbName: 'db',
	host: '172.17.0.1',
	port: '3306',
	dropTable: true
});

nconf.set('DB_TYPE', 'SQL');
nconf.set('ID_CHARACTERS', '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
nconf.set('ID_LENGTH', '6');
nconf.set('DEFAULT_PAGE_SIZE', '5');
nconf.set('QUERY_FIELDS','orderId,brandId,outletId,customerId,sourceId,orderTypeId,status,isTestOrder,isPreorder');