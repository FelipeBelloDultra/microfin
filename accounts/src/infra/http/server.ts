import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import { Router } from "./routes";

import { env } from "../../config";
import { AppError } from "../../core/errors/app-error";

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
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          error: {
            status_code: err.statusCode,
            message: err.message,
            errors: err.errors,
          },
        });
      }

      return res.status(500).json({
        error: {
          status_code: 500,
          message: err.message,
          errors: {},
        },
      });
    });
  }
}
