// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const authMiddleware = require("/middleware/auth");

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(authMiddleware);


// server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 JSON Server running at http://localhost:${PORT}`);
});
