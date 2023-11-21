import express from "express";
import cors from "cors";

import { Router } from "./routes";

import { env } from "../../config";

export class Server {
  private readonly app: express.Express;

  constructor(routes: Router) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(routes.all());
  }

  public listen() {
    this.app.listen(env.http.serverPort, () => {
      console.log(
        `[🚀] - transaction server started on port ${env.http.serverPort}\n`
      );
    });
  }
}
