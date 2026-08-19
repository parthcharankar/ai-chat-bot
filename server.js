const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const host = 'localhost';
const port = process.env.PORT || 3000;
const pagePath = path.join(__dirname, 'public', 'index.html');

const server = http.createServer((request, response) => {
  if (request.url !== '/' || request.method !== 'GET') {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  fs.readFile(pagePath, (error, page) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Unable to load the page');
      return;
    }

    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(page);
  });
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
