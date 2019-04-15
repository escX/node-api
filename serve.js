const http = require('http');
const handle_request = require('./handle_request');

http.createServer((request, response) => {
  handle_request(request).then(info => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(info));
  }).catch(({code, error}) => {
    response.writeHead(code, {'Content-Type': 'application/json'});
    response.end(JSON.stringify({
      error
    }));
  });
}).listen(8080);