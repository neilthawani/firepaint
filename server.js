var liveServer = require("live-server");

var params = {
	open: false,
	ignore: "node_modules",
	file: "*", // TODO: set this for 404
	wait: 0,
	logLevel: 2,
	port: 8080
};

liveServer.start(params);
