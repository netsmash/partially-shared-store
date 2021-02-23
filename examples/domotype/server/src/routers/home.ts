import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { HomeModel, UserModel } from '../models';

const router = Router();

router.get('/', async (request: Request, response: Response) => {
  const homes = await HomeModel.find({ users: { $in: [request.user._id] } });
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

router.patch('/:id', async (request: Request, response: Response) => {
  const home = await HomeModel.findById(request.params.id);
  if (!home || !home.hasUser(request.user._id)) {
    return response.status(404).send({ error: 'Home not found' });
  }

  switch (request.body.operation) {
    case 'addUser':
      const userId = Types.ObjectId.createFromHexString(request.body.userId);
      if (home.hasUser(userId)) {
        return response.status(422).send({ error: `User already in` });
      }
      const user = await UserModel.findById(userId);
      if (!user) {
        return response.status(404).send({ error: 'User not found' });
      }
      home.users.push(userId);
      await home.save();
      break;
    default:
      return response
        .status(422)
        .send({ error: `Operation ${request.body.operation} undefined.` });
  }

  return response.status(200).send(home.serialize());
});

export { router };
