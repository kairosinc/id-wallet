import { client } from './config';
import render from './render';

const routing = (server) => {
  server.get("/configs", (req, res) => {
    res.json(client);
  });

  server.get("*", (req, res) => {
    res.send(render());
  });
}

export default routing;
