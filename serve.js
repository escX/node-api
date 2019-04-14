const http = require('http');
const handle_request = require('./handle_request');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'application/json'});
  handle_request(request).then(info => {
    response.end(JSON.stringify(info));
  }).catch(() => {
    response.end();
  });
}).listen(8080);