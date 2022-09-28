var StaticServer = require("static-server");
var server = new StaticServer({
  rootPath: "./dist/",
  port: 2000,
});
server.start(function () {
  console.log("Server listening to port", server.port);
});
