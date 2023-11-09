import { createServer } from "node:http";

createServer((req, res) => {
  res.write("Hello, world! I am inside the account microservice");
  res.end();
}).listen(3000);
