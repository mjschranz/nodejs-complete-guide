const http = require("http");

function rqListener(req, res) {
  console.log(req.url, req.method, req.headers);

  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html>
      <head><title>My First Page</tile></head>
      <body><h1>Helo from my Node.js Server!</h1></body>
    </html>
  `);
  res.end();
}

const server = http.createServer(rqListener);

server.listen(process.env.NODEJS_PORT || 3000);