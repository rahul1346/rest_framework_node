'use strict';

//var querystring = require("querystring"), 
		var	 fs = require("fs"),
	 formidable = require("formidable"),
	 	   util = require('util'),
	 	request = require('request'),
	 jsonObject = null,
	   jsonFile = null;



function start(response) {
console.log("Request handler 'start' was called.");

var body =  '<html>'+
			'<head>'+
			'<meta http-equiv="Content-Type" '+
		    'content="text/html; charset=UTF-8" />'+
			'</head>'+
			'<body>'+
			'<form action="/upload" enctype="multipart/form-data" '+ 
			'method="post">'+
			'<input type="file" name="upload" multiple="multiple">'+ 
			'<input type="submit" value="Upload file" />'+
			'</form>'+
			'</body>'+
			'</html>';

			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(body);
			response.end();
}
 
 function upload(response, request) {
	console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm();
	console.log("about to parse");
	
	form.parse(request, function(error, fields, files){
		response.writeHead(200, {'content-type': 'application/json'});
		response.write('received upload:\n\n');
	});

	form.on('file', function(field, file) {
		console.log(jsonFile);
		if (file.type == 'application/json') {
			jsonObject = JSON.parse(fs.readFileSync(file.path, 'utf8'));
			console.log(jsonObject);
			jsonFile = file.path;
		} else { console.log('wrong file');}
	});
}

function update(response, request) {
	console.log("Request handler 'update' was called." + request);
	response.writeHead(200, {"Content-Type": "application/json"});

	var json = JSON.parse(fs.readFileSync('./tmp/obj.json'));
	json.newValue = "Testing";

	fs.writeFileSync("./tmp/obj.json", JSON.stringify(json));



	response.writeHead(200, {'content-type': 'application/json'});
	response.write('received upload:\n\n' + jsonObject);
}

function destroy(response, request) {
	console.log("Request handler 'delete' was called.");
	response.writeHead(200, {"Content-Type": "application/json"});

	var json = JSON.parse(fs.readFileSync('./tmp/obj.json'));
	delete json.newValue;

	fs.writeFileSync("./tmp/obj.json", JSON.stringify(json));
}


function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type": "application/json"});
	fs.createReadStream("./tmp/obj.json").pipe(response);
}

exports.start = start;
exports.update = update;
exports.upload = upload;
exports.destroy = destroy;
exports.show = show;
