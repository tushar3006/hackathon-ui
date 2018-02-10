// let mongoose = require('mongoose');
// let connection = mongoose.connect('mongodb://localhost:27017/testDb');
// let brand = require('../models/brand').brand;
// mongoose.model('brand', brand);


// let db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// module.exports = db;



"use strict";

/**
 * Module dependencies.
 */
let mongoose = require("mongoose");
const logger = require("../../config/initializers/logger");
mongoose.Promise = global.Promise;

module.exports.loadModels = (callback) => {
  require("../models/brandSchema");
  logger.info("Loaded models");
  if (callback) callback();
};

const getConfig = () => {
  return {
    db: {
      username: process.env.SHELL_DB_USERNAME,
      password: process.env.SHELL_DB_PASSWORD,
      host: process.env.SHELL_DB_HOST,
      port: process.env.SHELL_DB_PORT,
      dbName: process.env.SHELL_DB_NAME,
      debug: process.env.SHELL_DB_DEBUG === "true"
    }
  };
};

module.exports.connect = (cb) => {
  let db;
  let config = getConfig();
  const dbUri = process.env.DB_CONNECTION_STRING
            .replace("*username*", config.db.username)
            .replace("*password*", config.db.password)
            .replace("*dbname*", config.db.dbName);

  db = mongoose.connect(dbUri, err => {
    // Log Error
    /* istanbul ignore if */
    if (err) {
      logger.error("Could not connect to database!");
      logger.error(err);
    } else {
      // Enabling mongoose debug mode if required
      mongoose.set("debug", config.db.debug);
      this.loadModels();
      mongoRegisterEvents(db);
      logger.info("Connected to database");
      // Call callback FN
      if (cb) cb(db);
    }
  });
};

module.exports.disconnect = (cb) => {
  mongoose.disconnect(err => {
    logger.info("Disconnected from MongoDB.");
    cb(err);
  });
};

let mongoOnConnectionError = (err) => {
  logger.error(`Mongoose  connection error: ${err}`);
};

let mongoOnConnect = () => {
  logger.info("Mongoose connection open to");
};

let mongoOnDisconnect = () => {
  logger.warn("Mongoose connection disconnected");
};

let mongoRegisterEvents = (db) => {
  db.connection.on("connected", mongoOnConnect);

  // If the connection throws an error
  db.connection.on("error", mongoOnConnectionError);

  // When the connection is disconnected
  db.connection.on("disconnected", mongoOnDisconnect);

  // If the Node process ends, close the Mongoose connection
  process.on("SIGINT", () => {
    db.connection.close(() => {
      logger.warn("Mongoose connection disconnected through app termination");
      process.exit(0);
    });
  });
};
