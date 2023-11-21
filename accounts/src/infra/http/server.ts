import express from "express";
import cors from "cors";

import { env } from "../../config";

import { Router } from "./routes";

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
        `[🚀] - account server started on port ${env.http.serverPort}\n`
      );
    });
  }
}
