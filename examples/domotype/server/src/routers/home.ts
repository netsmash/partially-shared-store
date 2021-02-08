import { Router, Request, Response } from 'express';
import { HomeModel } from '../models';

const router = Router();

router.get('/', async (request: Request, response: Response) => {
  // TODO: filter by user
  const homes = await HomeModel.find({});
  const serializedHomes = await Promise.all(
    homes.map((home) => home.serialize()),
  );
  return response.status(200).send(serializedHomes);
});

router.post('/', async (request: Request, response: Response) => {
  const home = new HomeModel({
    name: request.body.name,
    devices: [],
    users: [request.user._id],
  });
  await home.save();

  return response.status(201).send(await home.serialize());
});

router.get('/:id', async (request: Request, response: Response) => {
  const home = await HomeModel.findById(request.params.id);
  if (!home) {
    return response.status(404).send({ error: 'Home not found' });
  }
  return response.status(200).send(home.serialize());
});

export { router };
