const http = require('http');
const handle_request = require('./handle_request');

http.createServer((request, response) => {
  const header = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': 'https://escx.github.io',
    'Vary': 'Origin'
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