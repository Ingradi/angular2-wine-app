var restify = require('restify');

var server = restify.createServer({
  name: 'Demo wine app',
  version: '1.0.0'
});

server.get(/\/\/?.*/, restify.serveStatic({
  directory: './dist',
  default: 'index.html'
}));

server.listen(8080, function () {
  console.log('%s running on %s', server.name, server.url);
});
