import * as restify from "restify";
import { commandBot } from "./internal/initialize";
const path = require("path");
import "isomorphic-fetch";


const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`\nBot Started, ${server.name} listening to ${server.url}`);
});

server.post("/api/messages", async (req, res) => {
  await commandBot.requestHandler(req, res).catch((err) => {
    // Error message including "412" means it is waiting for user's consent, which is a normal process of SSO, sholdn't throw this error.
    if (!err.message.includes("412") && !err.message.includes("401") ) {
        throw err;
    }
  });
});

server.get(
  "/auth-*.html",
  restify.plugins.serveStatic({
      directory: path.join(__dirname, "public"),
  })
);