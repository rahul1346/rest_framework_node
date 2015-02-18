'use strict';

var server = require("./http_server");
var router = require("./router");
var requestHandlers = require("./requestHandler");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/update"] = requestHandlers.update;
handle["/delete"] = requestHandlers.destroy;

server.start(router.route, handle);
