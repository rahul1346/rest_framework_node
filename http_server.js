'use strict';

var http = require("http"); 
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		if (typeof(handle[request.url]) === 'function') {
			var pathname = url.parse(request.url).pathname; 
			console.log("Request for " + pathname + " received."); 
			route(handle, pathname, response, request);
		} 
		else {
			response.writeHead(404, {
      			'Content-Type': 'application/json' 
    			});

	    	response.write(JSON.stringify({msg: 'page not found'}));
	    	response.end();
		}
	}	

  	http.createServer(onRequest).listen(8888);
  	console.log("Server has started.");
}

exports.start = start;