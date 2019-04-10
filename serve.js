const http = require('http');
const get_project_info = require('./spider/project_info');

http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text-plain' });
    get_project_info.then(info => {
      response.end(info.describe);
    });
}).listen(8080);