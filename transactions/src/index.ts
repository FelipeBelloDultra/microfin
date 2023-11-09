import { createServer } from "node:http";

createServer((req, res) => {
  res.write("Hello, world! I am inside the transaction microservice");
  res.end();
}).listen(3000);
