const express = require('express');
const http = require('http');

const app = express();
app.get('/', (request, response) => {
  response.send('Server is running');
});

function keepAlive() {
  const server = http.createServer(app);
  server.listen(3000, () => {
    console.log(`App available on http://localhost:3000`);
  });
}

module.exports.keepAlive = keepAlive;