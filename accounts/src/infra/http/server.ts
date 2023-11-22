import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
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
    this.handleErrors();

    this.app.listen(env.http.serverPort, () => {
      console.log(
        `[🚀] - account server started on port ${env.http.serverPort}\n`
      );
    });
  }

  private handleErrors() {
    this.app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
      return res.status(400).json({
        error: {
          message: err.message,
        },
      });
    });
  }
}
