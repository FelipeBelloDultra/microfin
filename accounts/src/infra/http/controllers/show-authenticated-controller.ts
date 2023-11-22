import { Request, Response } from "express";

import { ShowAuthenticated } from "../../../application/use-cases/show-authenticated";

export class ShowAuthenticatedController {
  constructor(private readonly showAuthenticated: ShowAuthenticated) {}

  public async handle(req: Request, res: Response) {
    const { email, id } = req.user;

    const result = await this.showAuthenticated.execute({ email, id });

    return res.json({ data: result }).status(200);
  }
}
