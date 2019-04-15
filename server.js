const http = require('http');
const handle_request = require('./handle_request');

http.createServer((request, response) => {
  const header = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS'
  };

  handle_request(request).then(info => {
    response.writeHead(200, header);
    response.end(JSON.stringify(info));
  }).catch(({code, error}) => {
    response.writeHead(code, header);
    response.end(JSON.stringify({
      error
    }));
  });
}).listen(8080);