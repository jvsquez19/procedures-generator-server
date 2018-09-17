'use strict';
module.exports = function(app) {
  var gameServer = require('./controller');
  //var CONSTANTS = require('../CONSTANTS')
  // todoList Routes
  app.route('/connect')
  .post(gameServer.connect)

  app.route("/getTables")
  .get(gameServer.getTables)

  app.route("/getSchemas")
  .get(gameServer.getSchemas)

  app.route("/generateProcedure")
  .post(gameServer.generateProcedure)

  app.route("/executeProcedure")
  .post(gameServer.executeProcedure)

  app.route("/createProcedure")
  .post(gameServer.executeCreateProcedure)
};