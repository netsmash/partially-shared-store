import { Router, Request, Response } from 'express';
import { WebSocketTicketModel } from '../models';

const router = Router();

router.get('/issue', async (request: Request, response: Response) => {
  const ticket = await WebSocketTicketModel.issue(request.user._id);
  return response.status(200).send(ticket.serialize());
});

export { router };
