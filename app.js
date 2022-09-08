const http = require("http");
const fs = require("fs");
const writeFileSyncRecursive = require("./utils/writeFileSyncRecursive");

function rqListener(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
        <head><title>My First Page</tile></head></title>
        <body>
          <form action="/message" method="POST">
            <input type="text" name="message">
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `);
    return res.end(); 
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      writeFileSyncRecursive("./files/message.txt", `${parsedBody.split("=")[1]}\n`);
    });
    req.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html>
      <head><title>My First Page</tile></head></title>
      <body><h1>Hello from my Node.js Server!</h1></body>
    </html>
  `);
  res.end();

}

const server = http.createServer(rqListener);

server.listen(process.env.NODEJS_PORT || 3000);