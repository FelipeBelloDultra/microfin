import express from "express";
import cors from "cors";

export class Server {
  private readonly app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  public listen() {
    this.app.listen(3000, () => {
      console.log("[🚀] - transaction server started\n");
    });
  }
}
