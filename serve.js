const http = require('http');
const get_project_info = require('./spider/project_info');
get_project_info('vue-colorful-background').then(info => {
  console.log(info);
});

http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text-plain' });
  response.end();
}).listen(8080);