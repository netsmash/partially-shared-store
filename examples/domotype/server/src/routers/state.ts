import { Router, Request, Response } from "express";
import { StateModel } from "../models";

const router = Router();

router.get("/:id", async (request: Request, response: Response) => {
  const state = await StateModel.findById(request.params.id);
  if (!state) {
    return response.status(404).send({ error: "State not found" });
  }
  return response.status(200).send(state.serialize());
});

export { router };
